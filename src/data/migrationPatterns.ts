import type { ComparisonPattern, PatternCategory } from '../types/migration.ts'

export const MIGRATION_PATTERNS: ComparisonPattern[] = [
  // ==========================================
  // 1. Architecture
  // ==========================================
  {
    id: 'standalone-vs-functions',
    title: 'Standalone Components vs Functional Components',
    category: 'architecture',
    angularSnippet: `import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'member';
  avatarUrl?: string;
}

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div class="user-card" [class.is-admin]="user().role === 'admin'">
      <img [src]="user().avatarUrl || '/default-avatar.png'" [alt]="user().name" />
      <div class="details">
        <h3>{{ user().name }}</h3>
        <span class="role-badge">{{ user().role | uppercase }}</span>
      </div>
      <button type="button" (click)="select.emit(user().id)">Select</button>
    </div>
  \`
})
export class UserCardComponent {
  // Signal inputs with type safety
  user = input.required<User>();
  // Modern output signal emitter
  select = output<string>();
}`,
    reactSnippet: `import type { FC, ReactElement } from 'react';

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'member';
  avatarUrl?: string;
}

export interface UserCardProps {
  user: User;
  onSelect: (userId: string) => void;
}

export const UserCard: FC<UserCardProps> = ({ user, onSelect }): ReactElement => {
  const isAdmin = user.role === 'admin';

  return (
    <div className={\`user-card \${isAdmin ? 'is-admin' : ''}\`}>
      <img src={user.avatarUrl || '/default-avatar.png'} alt={user.name} />
      <div className="details">
        <h3>{user.name}</h3>
        <span className="role-badge">{user.role.toUpperCase()}</span>
      </div>
      <button type="button" onClick={() => onSelect(user.id)}>
        Select
      </button>
    </div>
  );
};`,
    explanation:
      'Angular uses class decorators (@Component), metadata objects, and explicit imports arrays with signal inputs/outputs. React functional components are pure TypeScript functions accepting destructured props and returning JSX expressions.',
    solidPrinciple:
      'Single Responsibility Principle (SRP): UI rendering and prop contract isolation without runtime metadata compilation.',
    bestPractices: [
      'In Angular, always enable ChangeDetectionStrategy.OnPush and use signal-based input.required<T>().',
      'In React, declare explicit typed props interfaces and destructure props at function parameter level.',
      'Keep presentational components free from direct service/API mutations.',
    ],
  },
  {
    id: 'container-presentational',
    title: 'Container/Smart Hook Architecture vs Angular Container Service',
    category: 'architecture',
    angularSnippet: `// Container Component (Smart)
@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [UserListComponent, LoadingSpinnerComponent, ErrorBannerComponent],
  template: \`
    @if (userService.isLoading()) {
      <app-loading-spinner />
    } @else if (userService.error(); as err) {
      <app-error-banner [message]="err" (retry)="userService.loadUsers()" />
    } @else {
      <app-user-list
        [users]="userService.filteredUsers()"
        [selectedId]="userService.selectedUserId()"
        (userSelected)="userService.selectUser($event)"
        (userDeleted)="userService.deleteUser($event)"
      />
    }
  \`
})
export class UserManagementComponent implements OnInit {
  protected userService = inject(UserService);

  ngOnInit() {
    this.userService.loadUsers();
  }
}`,
    reactSnippet: `// Presentational Component (Dumb)
export interface UserListProps {
  users: User[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export function UserList({ users, selectedId, onSelect, onDelete }: UserListProps) {
  return (
    <ul className="user-list">
      {users.map(u => (
        <li key={u.id} className={u.id === selectedId ? 'active' : ''}>
          <span>{u.name}</span>
          <button onClick={() => onSelect(u.id)}>View</button>
          <button onClick={() => onDelete(u.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

// Container Component with Custom Hook Orchestration
export function UserManagementContainer() {
  const { users, selectedUserId, isLoading, error, selectUser, deleteUser, reload } = useUsersManager();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorBanner message={error} onRetry={reload} />;

  return (
    <UserList
      users={users}
      selectedId={selectedUserId}
      onSelect={selectUser}
      onDelete={deleteUser}
    />
  );
}`,
    explanation:
      'Separates state orchestration from UI presentation. React encapsulates container business logic within composable custom hooks (e.g., useUsersManager) without adding unnecessary component wrapper DOM nodes.',
    solidPrinciple:
      'Interface Segregation Principle (ISP): Presentational components receive only the minimal data and callbacks required for rendering.',
    bestPractices: [
      'Extract data fetching, sorting, and filtering state into custom React hooks.',
      'Make presentational components easily testable in Storybook by avoiding internal side effects.',
    ],
  },
  {
    id: 'compound-components-ng-content',
    title: 'Compound Components Pattern vs Multi-Slot Content Projection',
    category: 'architecture',
    angularSnippet: `// Angular Multi-Slot Content Projection
@Component({
  selector: 'app-card-layout',
  standalone: true,
  template: \`
    <div class="card-container">
      <header class="card-header">
        <ng-content select="[card-header]">Default Header</ng-content>
      </header>
      <main class="card-body">
        <ng-content select="[card-body]" />
      </main>
      <footer class="card-footer">
        <ng-content select="[card-actions]" />
      </footer>
    </div>
  \`
})
export class CardLayoutComponent {}

// Usage:
// <app-card-layout>
//   <h2 card-header>Project Alpha</h2>
//   <p card-body>Project details and metrics...</p>
//   <button card-actions (click)="approve()">Approve</button>
// </app-card-layout>`,
    reactSnippet: `// React Compound Component Pattern with Context
interface CardContextValue {
  isExpanded: boolean;
  toggle: () => void;
}
const CardContext = createContext<CardContextValue | null>(null);

export function Card({ children, defaultExpanded = true }: { children: ReactNode; defaultExpanded?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  return (
    <CardContext.Provider value={{ isExpanded, toggle: () => setIsExpanded(p => !p) }}>
      <div className="card-container">{children}</div>
    </CardContext.Provider>
  );
}

Card.Header = function CardHeader({ children }: { children: ReactNode }) {
  const ctx = useContext(CardContext);
  return (
    <header className="card-header">
      {children}
      {ctx && <button onClick={ctx.toggle}>{ctx.isExpanded ? 'Collapse' : 'Expand'}</button>}
    </header>
  );
};

Card.Body = function CardBody({ children }: { children: ReactNode }) {
  const ctx = useContext(CardContext);
  if (ctx && !ctx.isExpanded) return null;
  return <main className="card-body">{children}</main>;
};

Card.Actions = function CardActions({ children }: { children: ReactNode }) {
  return <footer className="card-footer">{children}</footer>;
};

// Usage:
// <Card>
//   <Card.Header><h2>Project Alpha</h2></Card.Header>
//   <Card.Body><p>Project details and metrics...</p></Card.Body>
//   <Card.Actions><button onClick={approve}>Approve</button></Card.Actions>
// </Card>`,
    explanation:
      'Angular uses CSS attribute selectors inside <ng-content select="..."> for static multi-slot distribution. React uses Compound Components sharing implicit context state, allowing dynamic child behavior and flexible layout composability.',
    solidPrinciple:
      'Open/Closed Principle (OCP): Compound components can add new sub-components or slots without modifying the parent component implementation.',
    bestPractices: [
      'Use Compound Components in React for flexible UI widgets like Accordions, Modals, Tabs, and Dropdowns.',
      'Attach sub-components to the parent namespace (e.g. Card.Header = ...) for clean, intuitive developer APIs.',
    ],
  },
  {
    id: 'polymorphic-dynamic-components',
    title: 'Polymorphic Components & Dynamic Component Creation',
    category: 'architecture',
    angularSnippet: `// Angular Dynamic Component Creation with ViewContainerRef
@Component({
  selector: 'app-widget-host',
  standalone: true,
  template: \`<ng-template #container />\`
})
export class WidgetHostComponent implements OnInit {
  @Input() widgetType!: 'chart' | 'table' | 'feed';
  @Input() widgetData!: unknown;
  
  private container = viewChild.required('container', { read: ViewContainerRef });
  private registry = inject(WIDGET_REGISTRY_TOKEN);

  ngOnInit() {
    this.container().clear();
    const componentClass = this.registry[this.widgetType];
    if (componentClass) {
      const ref = this.container().createComponent(componentClass);
      ref.setInput('data', this.widgetData);
    }
  }
}`,
    reactSnippet: `// React Polymorphic Component with "as" prop & Dynamic Registry
import type { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react';

// 1. Polymorphic Button / Link / Custom Component
type PolymorphicProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

export function Button<T extends ElementType = 'button'>({
  as,
  children,
  className = '',
  ...restProps
}: PolymorphicProps<T>) {
  const Component = as || 'button';
  return (
    <Component className={\`btn-base \${className}\`} {...restProps}>
      {children}
    </Component>
  );
}

// 2. Dynamic Component Registry Map
const WIDGET_MAP: Record<string, FC<{ data: unknown }>> = {
  chart: ChartWidget,
  table: TableWidget,
  feed: FeedWidget,
};

export function DynamicWidget({ type, data }: { type: string; data: unknown }) {
  const SelectedWidget = WIDGET_MAP[type] || FallbackWidget;
  return <SelectedWidget data={data} />;
}`,
    explanation:
      'Angular dynamically creates component instances at runtime via ViewContainerRef.createComponent() and ComponentRef. React dynamically renders any valid JSX component reference or HTML tag directly using standard JavaScript variables or the polymorphic "as" pattern.',
    solidPrinciple:
      'Liskov Substitution Principle (LSP): Any component conforming to the common prop interface can be substituted at runtime.',
    bestPractices: [
      'Use polymorphic "as" props in design systems to render accessible semantic tags (e.g., render a Button as an <a> tag).',
      'Use typed component dictionary lookup objects in React for dynamic widget systems.',
    ],
  },
  {
    id: 'micro-frontends-module-federation',
    title: 'Microfrontends & Dynamic Module Federation',
    category: 'architecture',
    angularSnippet: `// Angular Router Dynamic Remote Module Federation
import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'analytics',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'https://cdn.example.com/analytics/remoteEntry.js',
        exposedModule: './AnalyticsRoutes'
      }).then(m => m.ANALYTICS_ROUTES)
  },
  {
    path: 'billing',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'https://cdn.example.com/billing/remoteEntry.js',
        exposedModule: './BillingWidget'
      }).then(m => m.BillingWidgetComponent)
  }
];`,
    reactSnippet: `// React Dynamic Module Federation with React.lazy & ErrorBoundary
import { lazy, Suspense, type FC } from 'react';

// Dynamic import function for Webpack / Vite Module Federation
function loadRemoteComponent<T = FC<any>>(remoteName: string, exposedModule: string) {
  return lazy(async () => {
    // Initialises the shared scope and loads remote container
    const container = (window as any)[remoteName];
    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(exposedModule);
    return factory();
  });
}

const RemoteAnalytics = loadRemoteComponent('analyticsApp', './AnalyticsDashboard');

export function AnalyticsPage() {
  return (
    <ErrorBoundary fallback={<div className="mfe-error">Failed to load remote Analytics module.</div>}>
      <Suspense fallback={<div className="mfe-skeleton">Connecting to Microfrontend...</div>}>
        <RemoteAnalytics userId="usr_123" theme="dark" />
      </Suspense>
    </ErrorBoundary>
  );
}`,
    explanation:
      'Angular uses loadRemoteModule helper utilities within route definitions. React leverages React.lazy dynamic module loading wrapped in Suspense and Error Boundary fallbacks for fault-tolerant micro-frontend architectures.',
    solidPrinciple:
      'Dependency Inversion Principle (DIP): Host application depends on abstract federated contracts without bundling remote build dependencies.',
    bestPractices: [
      'Always wrap remote federated components in ErrorBoundaries to prevent one failed remote bundle from crashing the host shell.',
      'Establish version-pinned shared dependencies (React, React-DOM, RxJS) in Module Federation configs.',
    ],
  },

  // ==========================================
  // 2. Templates
  // ==========================================
  {
    id: 'conditional-rendering',
    title: 'Multi-Branch Conditional Rendering (*ngIf vs JSX Expressions)',
    category: 'templates',
    angularSnippet: `<!-- Angular *ngIf with then / else templates -->
<div *ngIf="authState$ | async as state; else unauthenticatedTpl">
  <ng-container *ngIf="state.isAdmin; then adminPanelTpl; else memberPanelTpl"></ng-container>
</div>

<ng-template #adminPanelTpl>
  <app-admin-dashboard [permissions]="permissions()" />
</ng-template>

<ng-template #memberPanelTpl>
  <app-member-view [user]="user()" />
</ng-template>

<ng-template #unauthenticatedTpl>
  <app-login-banner (login)="onLogin()" />
</ng-template>`,
    reactSnippet: `// React Multi-Branch JSX Conditional Rendering
export function DashboardView({ authState, permissions, user, onLogin }: Props) {
  if (!authState.isAuthenticated) {
    return <LoginBanner onLogin={onLogin} />;
  }

  return (
    <div className="dashboard-content">
      {authState.isAdmin ? (
        <AdminDashboard permissions={permissions} />
      ) : (
        <MemberView user={user} />
      )}
    </div>
  );
}`,
    explanation:
      'Angular historically used *ngIf with template references (#tpl) and structural directives. React uses early returns, ternary expressions, or logical guard operators (&&) using standard JavaScript syntax inside JSX.',
    solidPrinciple:
      'Open/Closed Principle (OCP): Standard JavaScript conditionals require no custom template compiler abstractions.',
    bestPractices: [
      'Use guard clauses and early returns for top-level component loading/error states in React.',
      'Be cautious with "count && <Component />" in React: if count is 0, React renders "0". Prefer "count > 0 && <Component />" or boolean casts.',
    ],
  },
  {
    id: 'list-rendering',
    title: 'List Rendering with Identity Tracking (*ngFor vs map + keys)',
    category: 'templates',
    angularSnippet: `<!-- Angular *ngFor with trackBy and template variables -->
<ul class="transaction-list">
  <li *ngFor="let tx of transactions; 
              trackBy: trackByTxId; 
              let idx = index; 
              let isFirst = first; 
              let isEven = even"
      [class.highlight]="isFirst"
      [class.zebra-row]="isEven">
    <span class="tx-num">#{{ idx + 1 }}</span>
    <span class="tx-hash">{{ tx.hash }}</span>
    <span class="tx-amount">{{ tx.amount | currency }}</span>
    <button (click)="inspectTx(tx)">Inspect</button>
  </li>
</ul>

// Component method:
// trackByTxId(index: number, tx: Transaction): string {
//   return tx.id;
// }`,
    reactSnippet: `// React Array.map() with Stable Keys & Index Destructuring
export function TransactionList({ transactions, onInspect }: TransactionListProps) {
  return (
    <ul className="transaction-list">
      {transactions.map((tx, idx) => {
        const isFirst = idx === 0;
        const isEven = idx % 2 === 0;

        return (
          <li
            key={tx.id} // Stable identity key for virtual DOM reconciliation
            className={\`\${isFirst ? 'highlight' : ''} \${isEven ? 'zebra-row' : ''}\`.trim()}
          >
            <span className="tx-num">#{idx + 1}</span>
            <span className="tx-hash">{tx.hash}</span>
            <span className="tx-amount">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tx.amount)}
            </span>
            <button onClick={() => onInspect(tx)}>Inspect</button>
          </li>
        );
      })}
    </ul>
  );
}`,
    explanation:
      'Angular uses *ngFor with a trackBy function callback. React maps arrays directly using Array.prototype.map() and requires a unique, stable "key" prop on the root JSX element of each mapped iteration to guide reconciliation.',
    solidPrinciple:
      'Liskov Substitution Principle (LSP): Any collection item satisfying the contract can be cleanly rendered and reconciled without state corruption.',
    bestPractices: [
      'Never use array indices as React keys if the list can be reordered, inserted, or filtered.',
      'Keep keys unique within their immediate sibling list scope.',
    ],
  },
  {
    id: 'two-way-binding',
    title: 'Two-Way Data Binding vs Controlled Form Components',
    category: 'templates',
    angularSnippet: `<!-- Angular Two-Way Binding [(ngModel)] or [(value)] -->
<div class="search-panel">
  <input
    [(ngModel)]="searchQuery"
    (ngModelChange)="onQueryChanged($event)"
    placeholder="Search catalog..."
  />
  <p>Live Query: {{ searchQuery }}</p>
  <button (click)="searchQuery = ''">Clear</button>
</div>`,
    reactSnippet: `// React Controlled Component with Debounced Synchronizer
export function SearchPanel({ onSearch }: { onSearch: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    onSearch(val);
  };

  return (
    <div className="search-panel">
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search catalog..."
      />
      <p>Live Query: {searchQuery}</p>
      <button onClick={() => setSearchQuery('')}>Clear</button>
    </div>
  );
}`,
    explanation:
      'Angular provides bidirectional two-way binding syntax [(ngModel)] (the "banana in a box"). React enforces unidirectional data flow where state is passed down via the "value" prop and updated via explicit "onChange" event handlers.',
    solidPrinciple:
      'Single Responsibility Principle (SRP): Unidirectional state flow makes state transitions explicit and predictable.',
    bestPractices: [
      'In React, prefer controlled components for inputs that drive dynamic validation or dependent UI updates.',
      'Use uncontrolled inputs with useRef() only for non-interactive forms or heavy performance optimizations.',
    ],
  },
  {
    id: 'template-outlets-render-props',
    title: 'Template Outlets & Context vs Render Props (CaaF)',
    category: 'templates',
    angularSnippet: `<!-- Angular TemplateRef & NgTemplateOutlet with Context -->
@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="grid">
      @for (item of items(); track item.id) {
        <div class="grid-row">
          <ng-container
            *ngTemplateOutlet="rowTemplate(); context: { $implicit: item, index: $index }"
          />
        </div>
      }
    </div>
  \`
})
export class DataGridComponent<T extends { id: string }> {
  items = input.required<T[]>();
  rowTemplate = input.required<TemplateRef<{ $implicit: T; index: number }>>();
}`,
    reactSnippet: `// React Render Props / Children as a Function (CaaF)
export interface DataGridProps<T extends { id: string }> {
  items: T[];
  renderRow: (item: T, index: number) => ReactNode;
}

export function DataGrid<T extends { id: string }>({ items, renderRow }: DataGridProps<T>) {
  return (
    <div className="grid">
      {items.map((item, index) => (
        <div key={item.id} className="grid-row">
          {renderRow(item, index)}
        </div>
      ))}
    </div>
  );
}

// Usage:
// <DataGrid
//   items={users}
//   renderRow={(user, idx) => (
//     <div className="user-custom-cell">
//       <strong>#{idx + 1}</strong>: {user.name} ({user.email})
//     </div>
//   )}
// />`,
    explanation:
      'Angular uses TemplateRef handles with *ngTemplateOutlet and context objects. React implements this pattern naturally through Render Props or Functions as Children, passing parameters directly to custom JSX renderer callbacks.',
    solidPrinciple:
      'Dependency Inversion Principle (DIP): The list component delegates exact row presentation to caller callbacks.',
    bestPractices: [
      'Use Render Props in React for highly customizable generic data widgets (grids, virtual tables, select dropdowns).',
      'Leverage TypeScript generics (<T>) for type-safe render prop signatures.',
    ],
  },

  // ==========================================
  // 3. Control Flow
  // ==========================================
  {
    id: 'modern-control-flow',
    title: 'Modern Control Flow (@if, @for with track, @empty, @switch)',
    category: 'control-flow',
    angularSnippet: `<!-- Angular v17+ Modern Control Flow Syntax -->
@if (status() === 'loading') {
  <app-skeleton-loader />
} @else if (status() === 'error') {
  <div class="error-box">
    <p>Failed to load data: {{ errorMessage() }}</p>
    <button (click)="retry()">Retry</button>
  </div>
} @else {
  @switch (viewMode()) {
    @case ('grid') {
      <div class="grid-view">
        @for (item of items(); track item.sku; let idx = $index; let count = $count) {
          <app-product-card [product]="item" [rank]="idx + 1" />
        } @empty {
          <p class="empty-msg">No products available in this category.</p>
        }
      </div>
    }
    @case ('list') {
      <app-product-table [items]="items()" />
    }
    @default {
      <p>Select a valid view mode.</p>
    }
  }
}`,
    reactSnippet: `// React Declarative Control Flow & Component Mapping
export function ProductCatalog({ status, errorMessage, viewMode, items, onRetry }: CatalogProps) {
  if (status === 'loading') {
    return <SkeletonLoader />;
  }

  if (status === 'error') {
    return (
      <div className="error-box">
        <p>Failed to load data: {errorMessage}</p>
        <button onClick={onRetry}>Retry</button>
      </div>
    );
  }

  return (
    <div className="catalog-container">
      {(() => {
        switch (viewMode) {
          case 'grid':
            if (items.length === 0) {
              return <p className="empty-msg">No products available in this category.</p>;
            }
            return (
              <div className="grid-view">
                {items.map((item, idx) => (
                  <ProductCard key={item.sku} product={item} rank={idx + 1} />
                ))}
              </div>
            );
          case 'list':
            return <ProductTable items={items} />;
          default:
            return <p>Select a valid view mode.</p>;
        }
      })()}
    </div>
  );
}`,
    explanation:
      'Angular v17+ features built-in compiler blocks (@if, @for, @switch, @empty) with required track expressions. React uses native JavaScript conditionals, switch statements, and array mappings inside JSX render functions.',
    solidPrinciple:
      'Single Responsibility Principle (SRP): Display branching is declared natively without requiring extra directive imports.',
    bestPractices: [
      'Use early returns for top-level guard states (loading, error, unauthenticated) in React.',
      'For complex branching in JSX, extract sub-views into small helper components or record lookup maps.',
    ],
  },
  {
    id: 'template-let-declarations',
    title: 'Template Variables (@let block) vs React Render Scope Variables',
    category: 'control-flow',
    angularSnippet: `<!-- Angular v18.1+ @let block variable declarations -->
@if (user$ | async; as user) {
  @let fullName = user.firstName + ' ' + user.lastName;
  @let isVip = user.tier === 'gold' || user.tier === 'platinum';
  @let discountRate = isVip ? 0.20 : 0.05;

  <div class="user-summary">
    <h2>{{ fullName }}</h2>
    <span *ngIf="isVip" class="vip-badge">VIP Member</span>
    <p>Applicable Discount: {{ discountRate * 100 }}%</p>
  </div>
}`,
    reactSnippet: `// React Local Render Scope Variables & Memoization
export function UserSummary({ user }: { user: User }) {
  // Direct JavaScript const declarations in component render body
  const fullName = \`\${user.firstName} \${user.lastName}\`;
  const isVip = user.tier === 'gold' || user.tier === 'platinum';
  const discountRate = isVip ? 0.20 : 0.05;

  return (
    <div className="user-summary">
      <h2>{fullName}</h2>
      {isVip && <span className="vip-badge">VIP Member</span>}
      <p>Applicable Discount: {discountRate * 100}%</p>
    </div>
  );
}`,
    explanation:
      'Angular v18.1 introduced the @let syntax to declare local variables inside template blocks. React naturally allows local let/const declarations in the component function body before returning JSX.',
    solidPrinciple:
      'Single Responsibility Principle (SRP): Intermediate calculations are computed cleanly in local variable scope without modifying component state.',
    bestPractices: [
      'Declare computed formatting variables directly inside the React function body.',
      'Wrap heavy derived calculations with useMemo() only when profiling shows re-render bottlenecks.',
    ],
  },

  // ==========================================
  // 4. Deferred Loading
  // ==========================================
  {
    id: 'deferred-loading-suspense',
    title: 'Deferred Loading (@defer vs React Suspense / lazy)',
    category: 'defer',
    angularSnippet: `<!-- Angular @defer with Multi-Triggers & Prefetching -->
@defer (on viewport; on hover(infoBtn); prefetch on idle) {
  <app-heavy-analytics-chart
    [data]="metricsData()"
    [filters]="selectedFilters()"
  />
} @placeholder (minimum 400ms) {
  <div class="chart-skeleton">
    <div class="shimmer-bar"></div>
    <span>Loading Analytics Preview...</span>
  </div>
} @loading (after 100ms; minimum 600ms) {
  <div class="chart-spinner">
    <app-spinner />
    <span>Loading chart bundle...</span>
  </div>
} @error {
  <div class="chart-error">
    <p>Failed to load analytics module.</p>
    <button (click)="retryLoad()">Retry</button>
  </div>
}

<button #infoBtn type="button">Hover to Prefetch Chart</button>`,
    reactSnippet: `// React Code-Splitting with React.lazy, Suspense, and IntersectionObserver
import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

// Lazy-loaded bundle chunk
const HeavyAnalyticsChart = lazy(() => import('./HeavyAnalyticsChart'));

export function AnalyticsSection({ metricsData, selectedFilters }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: '200px' });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="chart-wrapper">
      {isVisible ? (
        <ErrorBoundary fallback={<p>Failed to load analytics module.</p>}>
          <Suspense fallback={<div className="chart-skeleton">Loading Analytics Preview...</div>}>
            <HeavyAnalyticsChart data={metricsData} filters={selectedFilters} />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <div className="chart-skeleton">Scroll down to load chart...</div>
      )}
    </div>
  );
}`,
    explanation:
      'Angular @defer provides built-in declarative trigger syntax (on viewport, on hover, on idle, on timer) with automated placeholder, loading, and error states. React achieves equivalent code-splitting via React.lazy(), Suspense fallbacks, Error Boundaries, and viewport observer hooks.',
    solidPrinciple:
      'Open/Closed Principle (OCP): Asynchronous code-splitting can surround any component hierarchy without altering child implementation details.',
    bestPractices: [
      'Always wrap React.lazy() components inside an ErrorBoundary to catch network chunk loading errors.',
      'Use rootMargin in viewport observers to preload heavy bundles slightly before the user scrolls them into view.',
    ],
  },
  {
    id: 'nested-suspense-transitions',
    title: 'Nested Streaming Suspense & Concurrent Transitions',
    category: 'defer',
    angularSnippet: `<!-- Angular @defer with Interaction Trigger & Minimum Loading Duration -->
<button #triggerBtn type="button">Load Detailed Audit Logs</button>

@defer (on interaction(triggerBtn)) {
  <app-audit-log-viewer [userId]="selectedUser().id" />
} @placeholder {
  <p class="placeholder-hint">Click the button above to load audit logs.</p>
} @loading (minimum 800ms) {
  <app-skeleton-table [rows]="10" />
} @error {
  <p class="error-text">Unable to fetch audit logs.</p>
}`,
    reactSnippet: `// React Nested Suspense with useTransition & Instant Tab Switching
import { Suspense, useState, useTransition, lazy } from 'react';

const AuditLogViewer = lazy(() => import('./AuditLogViewer'));
const SecuritySettings = lazy(() => import('./SecuritySettings'));

export function UserAdminTabs({ userId }: { userId: string }) {
  const [tab, setTab] = useState<'logs' | 'security'>('logs');
  const [isPending, startTransition] = useTransition();

  const handleTabSwitch = (nextTab: 'logs' | 'security') => {
    startTransition(() => {
      setTab(nextTab); // Non-blocking concurrent transition
    });
  };

  return (
    <div>
      <div className="tab-nav">
        <button onClick={() => handleTabSwitch('logs')}>Logs</button>
        <button onClick={() => handleTabSwitch('security')}>Security</button>
        {isPending && <span className="spinner-indicator">Updating...</span>}
      </div>

      <Suspense fallback={<SkeletonTable rows={10} />}>
        {tab === 'logs' ? (
          <AuditLogViewer userId={userId} />
        ) : (
          <SecuritySettings userId={userId} />
        )}
      </Suspense>
    </div>
  );
}`,
    explanation:
      'Angular enables fine-grained loading minimums with @defer loading parameters. React utilizes useTransition alongside Suspense to keep the previous view interactive while the next lazy tab chunk streams and compiles in the background.',
    solidPrinciple:
      'Single Responsibility Principle (SRP): Transition coordination is decoupled from presentation components.',
    bestPractices: [
      'Use useTransition in React for tab switching and search filtering to prevent jarring fallback flashes.',
      'Provide meaningful skeleton placeholders matching the final layout dimensions.',
    ],
  },

  // ==========================================
  // 5. Directives
  // ==========================================
  {
    id: 'host-directives-hooks',
    title: 'Host Directives Composition vs Custom Composable Hooks',
    category: 'directives',
    angularSnippet: `// Angular Host Directives Composition API
import { Directive, Component, inject } from '@angular/core';
import { CdkTooltip } from '@angular/cdk/tooltip';

@Directive({
  selector: '[appAutofocus]',
  standalone: true
})
export class AutofocusDirective {
  private el = inject(ElementRef);
  ngOnInit() { this.el.nativeElement.focus(); }
}

@Component({
  selector: 'app-action-button',
  standalone: true,
  hostDirectives: [
    {
      directive: CdkTooltip,
      inputs: ['cdkTooltip: tooltipText', 'cdkTooltipPosition: tooltipPos'],
    },
    {
      directive: AutofocusDirective,
    }
  ],
  template: \`<button class="btn"><ng-content /></button>\`
})
export class ActionButtonComponent {}`,
    reactSnippet: `// React Composable Custom Hooks (Prop Getters Pattern)
export function useTooltip(text: string, position: 'top' | 'bottom' = 'top') {
  const [isOpen, setIsOpen] = useState(false);

  const getTriggerProps = () => ({
    onMouseEnter: () => setIsOpen(true),
    onMouseLeave: () => setIsOpen(false),
    onFocus: () => setIsOpen(true),
    onBlur: () => setIsOpen(false),
    'aria-label': text,
    'data-tooltip-pos': position,
  });

  return { isOpen, getTriggerProps };
}

export function ActionButton({ tooltipText, autoFocus, children }: ActionButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isOpen, getTriggerProps } = useTooltip(tooltipText);

  useEffect(() => {
    if (autoFocus) buttonRef.current?.focus();
  }, [autoFocus]);

  return (
    <div className="tooltip-anchor">
      <button ref={buttonRef} className="btn" {...getTriggerProps()}>
        {children}
      </button>
      {isOpen && <div className="tooltip-bubble">{tooltipText}</div>}
    </div>
  );
}`,
    explanation:
      'Angular uses hostDirectives metadata to compose external behaviors onto component hosts. React composes behaviors using custom hooks that return prop getters or spreadable event handler objects.',
    solidPrinciple:
      'Single Responsibility Principle (SRP): Reusable DOM interactions and accessibility handlers are packaged separately from the UI presentation.',
    bestPractices: [
      'Use the Prop Getter pattern in React hooks (e.g. getTriggerProps()) to safely merge user event handlers with hook handlers.',
      'Ensure keyboard accessibility (onFocus/onBlur) alongside mouse events (onMouseEnter/onMouseLeave).',
    ],
  },
  {
    id: 'attribute-directives-dom',
    title: 'DOM Manipulation Directives vs useRef & Click-Outside Hooks',
    category: 'directives',
    angularSnippet: `// Angular Click Outside Directive
@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  private elementRef = inject(ElementRef);
  clickOutside = output<MouseEvent>();

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.clickOutside.emit(event);
    }
  }
}

// Usage:
// <div class="dropdown" (appClickOutside)="closeDropdown()">...</div>`,
    reactSnippet: `// React Custom useClickOutside Hook
export function useClickOutside<T extends HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler]);

  return ref;
}

// Usage:
// export function DropdownMenu({ onClose }: { onClose: () => void }) {
//   const menuRef = useClickOutside<HTMLDivElement>(onClose);
//   return <div ref={menuRef} className="dropdown">...</div>;
// }`,
    explanation:
      'Angular uses @Directive with @HostListener to bind global document listeners and test element containment. React uses custom hooks with useRef and useEffect to register and automatically clean up event listeners.',
    solidPrinciple:
      'Single Responsibility Principle (SRP): Global listener lifecycle registration is strictly encapsulated in a reusable hook.',
    bestPractices: [
      'Always clean up document event listeners in the useEffect return teardown function.',
      'Support both mousedown and touchstart for consistent mobile and desktop UX.',
    ],
  },
  {
    id: 'structural-directives-gates',
    title: 'Structural Directives vs Declarative Permission Gates',
    category: 'directives',
    angularSnippet: `// Angular Structural Directive (*appHasRole)
@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective {
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  private authService = inject(AuthService);

  @Input() set appHasRole(requiredRole: string) {
    this.viewContainer.clear();
    if (this.authService.hasRole(requiredRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}

// Usage:
// <button *appHasRole="'admin'" (click)="deleteDatabase()">Purge DB</button>`,
    reactSnippet: `// React Declarative Permission Gate Component
export interface PermissionGateProps {
  role: string | string[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function PermissionGate({ role, children, fallback = null }: PermissionGateProps) {
  const { user } = useAuth();

  const requiredRoles = Array.isArray(role) ? role : [role];
  const hasPermission = user && requiredRoles.includes(user.role);

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Usage:
// <PermissionGate role="admin" fallback={<p>Admin permissions required.</p>}>
//   <button onClick={deleteDatabase}>Purge DB</button>
// </PermissionGate>`,
    explanation:
      'Angular structural directives (*directive) control the instantiation of embedded views in the ViewContainerRef. React implements permission guards as wrapper components (PermissionGate) using conditional rendering of children.',
    solidPrinciple:
      'Open/Closed Principle (OCP): Application features can be protected declaratively without modifying internal feature logic.',
    bestPractices: [
      'Provide an optional fallback prop in permission components to display custom access-denied notices.',
      'Use a centralized authentication hook (useAuth) to evaluate role matrices consistently.',
    ],
  },

  // ==========================================
  // 6. Reactivity & State
  // ==========================================
  {
    id: 'state-signals',
    title: 'Reactive State Primitives (Signals vs useState / useReducer)',
    category: 'reactivity',
    angularSnippet: `import { signal, computed, effect } from '@angular/core';

// Angular Signal State Management
export class ShoppingCartState {
  // Read/write signal
  items = signal<CartItem[]>([]);
  
  // Derived computed signal
  totalPrice = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  
  // Method updating state immutably
  addItem(newItem: CartItem) {
    this.items.update(current => {
      const idx = current.findIndex(i => i.id === newItem.id);
      if (idx >= 0) {
        return current.map((i, index) =>
          index === idx ? { ...i, quantity: i.quantity + newItem.quantity } : i
        );
      }
      return [...current, newItem];
    });
  }
}`,
    reactSnippet: `import { useReducer, useMemo } from 'react';

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR' };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const idx = state.findIndex(i => i.id === action.payload.id);
      if (idx >= 0) {
        return state.map((item, index) =>
          index === idx ? { ...item, quantity: item.quantity + action.payload.quantity } : item
        );
      }
      return [...state, action.payload];
    }
    case 'REMOVE_ITEM':
      return state.filter(i => i.id !== action.payload);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function useShoppingCart(initialItems: CartItem[] = []) {
  const [items, dispatch] = useReducer(cartReducer, initialItems);

  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  return { items, totalPrice, dispatch };
}`,
    explanation:
      'Angular Signals use getter functions count() and mutable .set()/.update() scheduling granular DOM updates. React uses useState for primitives or useReducer for complex multi-action state machines, scheduling full component re-renders.',
    solidPrinciple:
      'Single Responsibility Principle (SRP): State transition logic in reducers is pure and isolated from UI side effects.',
    bestPractices: [
      'In React, use useReducer when state transitions depend on previous state or involve multiple related fields.',
      'Keep state immutable: never directly mutate arrays or objects in React state setters.',
    ],
  },
  {
    id: 'advanced-signals-linked-resource',
    title: 'Advanced Reactivity (linkedSignal / resource vs React 19 Actions & TanStack)',
    category: 'reactivity',
    angularSnippet: `// Angular 19 linkedSignal and httpResource
import { Component, signal, linkedSignal, resource, httpResource } from '@angular/core';

@Component({ ... })
export class ProductEditorComponent {
  // Source signal
  selectedProductId = signal<string>('prod_01');

  // linkedSignal resets automatically whenever selectedProductId changes
  quantity = linkedSignal({
    source: this.selectedProductId,
    computation: () => 1 // Reset to default 1 on product switch
  });

  // Angular 19 Declarative Data Resource
  productResource = httpResource<Product>(() => \`/api/products/\${this.selectedProductId()}\`);
  
  updateQuantity(val: number) {
    this.quantity.set(val);
  }
}`,
    reactSnippet: `// React 19 useActionState & TanStack Query
import { useActionState, useOptimistic } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function ProductEditor({ productId }: { productId: string }) {
  const queryClient = useQueryClient();

  // Declarative query resource
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetch(\`/api/products/\${productId}\`).then(r => r.json()),
  });

  // React 19 Server Action State
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const qty = Number(formData.get('quantity'));
      await saveQuantity(productId, qty);
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
      return { success: true };
    },
    { success: false }
  );

  return (
    <form action={formAction}>
      <h3>{product?.name}</h3>
      <input name="quantity" defaultValue={1} key={productId} />
      <button type="submit" disabled={isPending}>Save</button>
    </form>
  );
}`,
    explanation:
      'Angular 19 introduces linkedSignal for auto-resetting dependent signals and httpResource for declarative fetches. React 19 integrates useActionState and useOptimistic for async mutations, while TanStack Query manages caching and background synchronization.',
    solidPrinciple:
      'Single Responsibility Principle (SRP): Declarative resource fetching is decoupled from manual imperative useEffect orchestration.',
    bestPractices: [
      'In React, use key={productId} on inputs to automatically reset local input state when switching target entity IDs.',
      'Use TanStack Query or React 19 Actions instead of writing boilerplate useEffect fetch loops.',
    ],
  },
  {
    id: 'computed-vs-usememo',
    title: 'Derived State (computed() vs useMemo & Compiler)',
    category: 'reactivity',
    angularSnippet: `// Angular Computed Signal
export class AnalyticsComponent {
  users = signal<User[]>([]);
  filterText = signal('');
  sortBy = signal<'name' | 'activity'>('name');

  // Automatically tracks users, filterText, and sortBy signals at runtime
  filteredUsers = computed(() => {
    const q = this.filterText().toLowerCase();
    const list = this.users().filter(u => u.name.toLowerCase().includes(q));
    
    return list.sort((a, b) => {
      if (this.sortBy() === 'activity') return b.lastActive - a.lastActive;
      return a.name.localeCompare(b.name);
    });
  });
}`,
    reactSnippet: `// React useMemo with Dependency Array
export function AnalyticsDashboard({ users }: { users: User[] }) {
  const [filterText, setFilterText] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'activity'>('name');

  // Explicit dependency array ensures recomputation only when inputs mutate
  const filteredUsers = useMemo(() => {
    const q = filterText.toLowerCase();
    const list = users.filter(u => u.name.toLowerCase().includes(q));

    return list.sort((a, b) => {
      if (sortBy === 'activity') return b.lastActive - a.lastActive;
      return a.name.localeCompare(b.name);
    });
  }, [users, filterText, sortBy]);

  return (
    <div>
      <input value={filterText} onChange={e => setFilterText(e.target.value)} />
      <UserTable data={filteredUsers} />
    </div>
  );
}`,
    explanation:
      'Angular computed() dynamically tracks accessed signals during execution with zero explicit dependency list. React useMemo caches results based on an explicit dependency array (or via the automated React 19 Compiler).',
    solidPrinciple:
      'Single Responsibility Principle (SRP): Pure computations have zero mutation side effects and produce identical outputs for identical inputs.',
    bestPractices: [
      'Avoid placing side effects (API calls, logging) inside React useMemo or Angular computed().',
      'Ensure every value referenced inside the useMemo callback is included in the dependency array.',
    ],
  },
  {
    id: 'effects-synchronization',
    title: 'Reactive Side Effects (effect() vs useEffect / useEffectEvent)',
    category: 'reactivity',
    angularSnippet: `// Angular effect() with cleanup function
@Component({ ... })
export class LocalStorageSyncComponent {
  userTheme = signal<'light' | 'dark'>('dark');

  constructor() {
    effect((onCleanup) => {
      const theme = this.userTheme();
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('app-theme', theme);

      onCleanup(() => {
        // Cleanup on effect re-execution or component destruction
        console.log('Tearing down theme synchronization');
      });
    });
  }
}`,
    reactSnippet: `// React useEffect with Cleanup & Separation of Events
export function ThemeSynchronizer({ theme, onThemeApplied }: ThemeProps) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);

    // Synchronous execution callback
    onThemeApplied?.(theme);

    return () => {
      // Teardown before next effect execution or on unmount
      document.documentElement.removeAttribute('data-theme');
    };
  }, [theme, onThemeApplied]);

  return null;
}`,
    explanation:
      'Angular effect() runs within an injection context and tracks signal reads. React useEffect executes after DOM paint and handles synchronization with external browser APIs (DOM, WebSockets, LocalStorage) with cleanup teardown functions.',
    solidPrinciple:
      'Single Responsibility Principle (SRP): External system synchronization is cleanly decoupled from rendering JSX.',
    bestPractices: [
      'Do not use useEffect to calculate derived state; compute derived values directly during render or with useMemo.',
      'Always return a cleanup function when establishing timers, event listeners, or network streams.',
    ],
  },
  {
    id: 'props-inputs-model',
    title: 'Passing Props (@Input / input() / model() vs Typed Props)',
    category: 'reactivity',
    angularSnippet: `// Angular input() and model() Two-Way Signal Binding
@Component({
  selector: 'app-counter-widget',
  standalone: true,
  template: \`
    <div class="counter">
      <p>{{ label() }}: {{ count() }}</p>
      <button (click)="increment()">+{{ step() }}</button>
    </div>
  \`
})
export class CounterWidgetComponent {
  // Required input signal
  label = input.required<string>();
  // Optional input with fallback default
  step = input(1);
  // Two-way model signal (supports [(count)]="myCount" in parent)
  count = model<number>(0);

  increment() {
    this.count.update(c => c + this.step());
  }
}`,
    reactSnippet: `// React Props Interface with Callback Synchronization
export interface CounterWidgetProps {
  label: string;
  step?: number;
  count: number;
  onCountChange: (newCount: number) => void;
}

export function CounterWidget({
  label,
  step = 1,
  count,
  onCountChange,
}: CounterWidgetProps) {
  const handleIncrement = () => {
    onCountChange(count + step);
  };

  return (
    <div className="counter">
      <p>{label}: {count}</p>
      <button onClick={handleIncrement}>+{step}</button>
    </div>
  );
}`,
    explanation:
      'Angular uses input() for read-only props and model() for bidirectional two-way binding signals. React uses strict unidirectional props contracts: a value prop (e.g. count) paired with an explicit event callback prop (e.g. onCountChange).',
    solidPrinciple:
      'Interface Segregation Principle (ISP): Explicit props contracts define the minimal interface for component consumers.',
    bestPractices: [
      'In React, name event callback props using the "on[Event]" convention (e.g., onCountChange, onSelectUser).',
      'Set sensible default values for optional props during parameter destructuring.',
    ],
  },
  {
    id: 'events-outputs',
    title: 'Custom Event Emitting (output() vs Callback Props)',
    category: 'reactivity',
    angularSnippet: `// Angular output() and outputFromObservable()
export class UserTableComponent {
  private deleteTrigger$ = new Subject<string>();

  // Standard output signal
  selectUser = output<User>();
  // RxJS stream bridge output
  userDeleted = outputFromObservable(this.deleteTrigger$.pipe(
    debounceTime(200)
  ));

  onRowClick(user: User) {
    this.selectUser.emit(user);
  }

  onDeleteClick(userId: string) {
    this.deleteTrigger$.next(userId);
  }
}`,
    reactSnippet: `// React Strongly-Typed Event Callback Props
export interface UserTableProps {
  users: User[];
  onSelectUser: (user: User) => void;
  onUserDeleted: (userId: string) => void;
}

export function UserTable({ users, onSelectUser, onUserDeleted }: UserTableProps) {
  return (
    <table>
      <tbody>
        {users.map(user => (
          <tr key={user.id} onClick={() => onSelectUser(user)}>
            <td>{user.name}</td>
            <td>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onUserDeleted(user.id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}`,
    explanation:
      'Angular dispatches events via output() signals or EventEmitter. React passes standard TypeScript callback functions down as props, executing them directly when events occur.',
    solidPrinciple:
      'Dependency Inversion Principle (DIP): Components depend on abstract callback function signatures rather than concrete parent event dispatcher classes.',
    bestPractices: [
      'Use e.stopPropagation() in nested React button handlers to prevent triggering parent row selection callbacks.',
      'Type callback arguments precisely rather than using "any" or vague object types.',
    ],
  },

  // ==========================================
  // 7. Lifecycle & DOM
  // ==========================================
  {
    id: 'lifecycle-init-destroy',
    title: 'Lifecycle Hooks (ngOnInit/ngOnDestroy vs useEffect/useLayoutEffect)',
    category: 'lifecycle',
    angularSnippet: `// Angular Lifecycle Interfaces & Render Hooks
@Component({ ... })
export class ResizeSensorComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroyRef = inject(DestroyRef);
  private resizeObserver!: ResizeObserver;
  private containerEl = viewChild.required<ElementRef>('box');

  ngOnInit() {
    console.log('Component initialized');
  }

  ngAfterViewInit() {
    this.resizeObserver = new ResizeObserver(entries => {
      console.log('Resized:', entries[0].contentRect);
    });
    this.resizeObserver.observe(this.containerEl().nativeElement);

    // Modern DestroyRef hook
    this.destroyRef.onDestroy(() => {
      this.resizeObserver.disconnect();
    });
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }
}`,
    reactSnippet: `// React useLayoutEffect & useEffect with Cleanup
export function ResizeSensor({ onResize }: { onResize: (rect: DOMRectReadOnly) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect runs synchronously immediately after DOM mutations before paint
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry) onResize(entry.contentRect);
    });

    observer.observe(el);

    // Guaranteed teardown on unmount or before effect re-runs
    return () => {
      observer.disconnect();
    };
  }, [onResize]);

  return <div ref={containerRef} className="sensor-box" />;
}`,
    explanation:
      'Angular separates component lifecycle across distinct class methods (ngOnInit, ngAfterViewInit, ngOnDestroy). React unifies setup, updates, and teardown into useEffect (asynchronous post-paint) and useLayoutEffect (synchronous pre-paint).',
    solidPrinciple:
      'Single Responsibility Principle (SRP): Resource acquisition and release are co-located in one cohesive function.',
    bestPractices: [
      'Use useLayoutEffect in React only when measuring DOM elements or preventing visual layout shifts.',
      'Use useEffect for asynchronous side effects like data fetching, analytics logging, and subscriptions.',
    ],
  },
  {
    id: 'dom-queries-refs',
    title: 'DOM Queries & View References (viewChild vs useRef & forwardRef)',
    category: 'lifecycle',
    angularSnippet: `// Angular viewChild and viewChildren
@Component({
  selector: 'app-video-player',
  standalone: true,
  template: \`
    <video #mediaPlayer [src]="videoUrl()"></video>
    <div class="controls">
      <button (click)="togglePlay()">Play/Pause</button>
      <button (click)="seekTo(0)">Restart</button>
    </div>
  \`
})
export class VideoPlayerComponent {
  videoUrl = input.required<string>();
  // Strongly-typed signal DOM query
  playerRef = viewChild.required<ElementRef<HTMLVideoElement>>('mediaPlayer');

  togglePlay() {
    const vid = this.playerRef().nativeElement;
    vid.paused ? vid.play() : vid.pause();
  }

  seekTo(seconds: number) {
    this.playerRef().nativeElement.currentTime = seconds;
  }
}`,
    reactSnippet: `// React useRef & useImperativeHandle / forwardRef
export interface VideoPlayerHandle {
  play: () => void;
  pause: () => void;
  restart: () => void;
}

export const VideoPlayer = forwardRef<VideoPlayerHandle, { src: string }>(
  function VideoPlayer({ src }, ref) {
    const videoRef = useRef<HTMLVideoElement>(null);

    // Expose a clean, encapsulated imperative API to parents
    useImperativeHandle(ref, () => ({
      play: () => videoRef.current?.play(),
      pause: () => videoRef.current?.pause(),
      restart: () => {
        if (videoRef.current) videoRef.current.currentTime = 0;
      },
    }));

    return <video ref={videoRef} src={src} controls />;
  }
);`,
    explanation:
      'Angular viewChild() returns a reactive signal pointing to the template ElementRef. React uses useRef for direct DOM references and useImperativeHandle with forwardRef to expose controlled imperative handles to parent components.',
    solidPrinciple:
      'Interface Segregation Principle (ISP): useImperativeHandle exposes only intended methods rather than leaking raw DOM nodes.',
    bestPractices: [
      'Avoid directly mutating DOM properties outside of media playback, focus management, or animation canvas contexts.',
      'In React 19, forwardRef is simplified as ref can be passed directly as a standard component prop.',
    ],
  },
  {
    id: 'teardown-cleanup',
    title: 'Resource Teardown & Subscription Management (DestroyRef vs AbortController)',
    category: 'lifecycle',
    angularSnippet: `// Angular DestroyRef & takeUntilDestroyed
@Component({ ... })
export class RealtimeFeedComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private websocket = inject(WebSocketService);
  feedItems = signal<FeedItem[]>([]);

  ngOnInit() {
    this.websocket.stream$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(msg => {
        this.feedItems.update(items => [msg, ...items.slice(0, 49)]);
      });

    this.destroyRef.onDestroy(() => {
      this.websocket.disconnect();
    });
  }
}`,
    reactSnippet: `// React AbortController & Stream Cleanup in useEffect
export function RealtimeFeed({ endpoint }: { endpoint: string }) {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const ws = new WebSocket(endpoint);

    ws.onmessage = (event) => {
      const msg: FeedItem = JSON.parse(event.data);
      setFeedItems(prev => [msg, ...prev.slice(0, 49)]);
    };

    // Cleanup callback handles teardown
    return () => {
      controller.abort();
      ws.close();
    };
  }, [endpoint]);

  return (
    <ul>
      {feedItems.map(item => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}`,
    explanation:
      'Angular provides DestroyRef and takeUntilDestroyed() operator for automatic RxJS stream unsubscription. React utilizes the return cleanup function of useEffect alongside Web API AbortController for cancelable async resources.',
    solidPrinciple:
      'Single Responsibility Principle (SRP): Subscription initialization and automatic teardown are bound to component lifecycle.',
    bestPractices: [
      'Always abort pending fetch requests or close WebSockets in React useEffect cleanups to eliminate memory leaks.',
      'Check signal.aborted before updating React state in async promise chains.',
    ],
  },

  // ==========================================
  // 8. Dependency Injection
  // ==========================================
  {
    id: 'dependency-injection',
    title: 'Hierarchical DI Container vs React Context Tree',
    category: 'di',
    angularSnippet: `// Angular Injection Tokens & Hierarchical Injectors
export interface AppConfig {
  apiUrl: string;
  maxRetries: number;
}
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

@Injectable({ providedIn: 'root' })
export class AuthService {
  private config = inject(APP_CONFIG);
  private http = inject(HttpClient);
  
  currentUser = signal<User | null>(null);
  
  login(token: string) {
    // Uses config.apiUrl
  }
}

// In Component:
// auth = inject(AuthService);`,
    reactSnippet: `// React Context API with Custom Hook Consumer
export interface AuthContextType {
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children, apiUrl }: { children: ReactNode; apiUrl: string }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (token: string) => {
    const res = await fetch(\`\${apiUrl}/auth/me\`, {
      headers: { Authorization: \`Bearer \${token}\` }
    });
    setUser(await res.json());
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to consume context safely
export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}`,
    explanation:
      'Angular provides a class-based IoC container with hierarchical injectors (root, environment, component, element). React uses the Context API (createContext, useContext) to propagate dependencies down the component tree.',
    solidPrinciple:
      'Dependency Inversion Principle (DIP): High-level components depend on abstract context interfaces rather than concrete network singletons.',
    bestPractices: [
      'Throw descriptive runtime errors in custom context hooks if consumed outside their designated Provider wrapper.',
      'Split distinct contexts (e.g., AuthStateContext vs AuthActionsContext) to prevent unnecessary re-renders in consumer trees.',
    ],
  },
  {
    id: 'factory-providers-custom-hooks',
    title: 'Factory Providers vs Factory Custom Hooks',
    category: 'di',
    angularSnippet: `// Angular Factory Provider with Dependencies
export const LOGGER_TOKEN = new InjectionToken<LoggerService>('LOGGER_TOKEN');

export function loggerFactory(config: AppConfig, env: EnvironmentService): LoggerService {
  return env.isProduction() 
    ? new DatadogLogger(config.apiKey)
    : new ConsoleLogger();
}

// Module / App Bootstrap config:
// {
//   provide: LOGGER_TOKEN,
//   useFactory: loggerFactory,
//   deps: [APP_CONFIG, EnvironmentService]
// }`,
    reactSnippet: `// React Factory Hook with Dynamic Implementation Selection
export interface Logger {
  log: (msg: string) => void;
  error: (msg: string, err?: unknown) => void;
}

export function useLogger(): Logger {
  const { isProduction, datadogApiKey } = useEnvironment();

  return useMemo(() => {
    if (isProduction && datadogApiKey) {
      return {
        log: (msg) => datadogSdk.log(msg),
        error: (msg, err) => datadogSdk.error(msg, err),
      };
    }
    return {
      log: (msg) => console.log(\`[DEV-LOG]: \${msg}\`),
      error: (msg, err) => console.error(\`[DEV-ERR]: \${msg}\`, err),
    };
  }, [isProduction, datadogApiKey]);
}`,
    explanation:
      'Angular uses factory provider objects with explicit deps token arrays in DI configuration. React utilizes factory custom hooks (e.g., useLogger) with useMemo to dynamically instantiate and memoize specialized services based on environment state.',
    solidPrinciple:
      'Open/Closed Principle (OCP): New logger implementations can be plugged in based on environment configurations without modifying client calls.',
    bestPractices: [
      'Wrap factory hook instantiations in useMemo to prevent creating new service object instances on every component render.',
      'Keep logger contracts strictly typed with a shared TypeScript interface.',
    ],
  },

  // ==========================================
  // 9. Forms
  // ==========================================
  {
    id: 'reactive-forms-vs-hook-form',
    title: 'Typed Reactive Forms vs React Hook Form + Zod Validation',
    category: 'forms',
    angularSnippet: `// Angular Typed Reactive Forms with Async Validator
@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="username" placeholder="Username" />
      <span *ngIf="form.controls.username.errors?.['required']">Required</span>
      <span *ngIf="form.controls.username.errors?.['userTaken']">Username taken</span>

      <input formControlName="email" type="email" placeholder="Email" />
      <span *ngIf="form.controls.email.errors?.['email']">Invalid email format</span>

      <button type="submit" [disabled]="form.invalid || form.pending">Register</button>
    </form>
  \`
})
export class UserRegistrationComponent {
  private fb = inject(NonNullableFormBuilder);
  private userService = inject(UserService);

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)], [this.validateUsernameAsync()]],
    email: ['', [Validators.required, Validators.email]],
  });

  private validateUsernameAsync(): AsyncValidatorFn {
    return (control) => this.userService.checkAvailability(control.value).pipe(
      map(isTaken => isTaken ? { userTaken: true } : null),
      catchError(() => of(null))
    );
  }

  onSubmit() {
    if (this.form.valid) console.log(this.form.getRawValue());
  }
}`,
    reactSnippet: `// React Hook Form with Zod Schema Validation & Async Check
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const registrationSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .refine(async (val) => {
      const isAvailable = await checkUsernameAvailability(val);
      return isAvailable;
    }, 'Username is already taken'),
  email: z.string().email('Invalid email address format'),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export function UserRegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    await registerUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username')} placeholder="Username" />
      {errors.username && <span className="err">{errors.username.message}</span>}

      <input {...register('email')} type="email" placeholder="Email" />
      {errors.email && <span className="err">{errors.email.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}`,
    explanation:
      'Angular Reactive Forms manage an in-memory mutable control tree (FormGroup/FormControl) with class validators. React Hook Form uses uncontrolled native input refs with Zod schema validation, minimizing re-renders and guaranteeing type inference.',
    solidPrinciple:
      'Single Responsibility Principle (SRP): Validation schemas (Zod) are defined outside UI components and shared between client and server.',
    bestPractices: [
      'Use React Hook Form with Zod (zodResolver) for production-grade React forms.',
      'Configure validation mode to "onBlur" or "onChange" based on whether immediate feedback is required.',
    ],
  },
  {
    id: 'dynamic-form-arrays',
    title: 'Dynamic Form Arrays (FormArray vs useFieldArray)',
    category: 'forms',
    angularSnippet: `// Angular FormArray for Dynamic Line Items
export class OrderFormComponent {
  private fb = inject(FormBuilder);

  orderForm = this.fb.group({
    customer: ['', Validators.required],
    items: this.fb.array<FormGroup<{ name: FormControl<string>; qty: FormControl<number> }>>([])
  });

  get itemsArray() {
    return this.orderForm.controls.items;
  }

  addItem() {
    this.itemsArray.push(this.fb.group({
      name: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      qty: this.fb.control(1, { nonNullable: true, validators: [Validators.min(1)] })
    }));
  }

  removeItem(index: number) {
    this.itemsArray.removeAt(index);
  }
}`,
    reactSnippet: `// React Hook Form useFieldArray
import { useForm, useFieldArray } from 'react-hook-form';

interface OrderFormValues {
  customer: string;
  items: { name: string; qty: number }[];
}

export function OrderForm() {
  const { register, control, handleSubmit } = useForm<OrderFormValues>({
    defaultValues: { customer: '', items: [{ name: '', qty: 1 }] }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <input {...register('customer')} placeholder="Customer Name" />

      {fields.map((field, idx) => (
        <div key={field.id} className="line-item">
          <input {...register(\`items.\${idx}.name\` as const)} placeholder="Item Name" />
          <input type="number" {...register(\`items.\${idx}.qty\` as const, { valueAsNumber: true })} />
          <button type="button" onClick={() => remove(idx)}>Remove</button>
        </div>
      ))}

      <button type="button" onClick={() => append({ name: '', qty: 1 })}>+ Add Item</button>
      <button type="submit">Submit Order</button>
    </form>
  );
}`,
    explanation:
      'Angular uses FormArray class instances to manipulate dynamic nested arrays of controls. React Hook Form provides the useFieldArray hook with unique stable field IDs (field.id) preventing item reordering bugs in React JSX.',
    solidPrinciple:
      'Open/Closed Principle (OCP): Array collections can grow dynamically without modifying individual field validation schemes.',
    bestPractices: [
      'Always use field.id as the React key when mapping useFieldArray items, never the array index.',
      'Use the "as const" TypeScript assertion on nested field path strings for strict type safety.',
    ],
  },
  {
    id: 'custom-form-controls-cva',
    title: 'Custom Form Controls (ControlValueAccessor vs Controller)',
    category: 'forms',
    angularSnippet: `// Angular ControlValueAccessor Custom Star Rating
@Component({
  selector: 'app-star-rating',
  standalone: true,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StarRatingComponent),
    multi: true
  }],
  template: \`
    <div class="stars">
      <span *ngFor="let star of [1,2,3,4,5]" 
            [class.filled]="star <= rating"
            (click)="setRating(star)">★</span>
    </div>
  \`
})
export class StarRatingComponent implements ControlValueAccessor {
  rating = 0;
  onChange = (val: number) => {};
  onTouched = () => {};

  writeValue(val: number) { this.rating = val || 0; }
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouched = fn; }
  setDisabledState?(isDisabled: boolean) {}

  setRating(val: number) {
    this.rating = val;
    this.onChange(val);
    this.onTouched();
  }
}`,
    reactSnippet: `// React Custom Component with React Hook Form Controller
import { Controller, useForm } from 'react-hook-form';

export function StarRatingInput({
  value = 0,
  onChange,
  onBlur,
}: {
  value?: number;
  onChange: (val: number) => void;
  onBlur?: () => void;
}) {
  return (
    <div className="stars" onBlur={onBlur}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= value ? 'filled' : ''}
          onClick={() => onChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// Controller integration in parent form:
// <Controller
//   name="rating"
//   control={control}
//   render={({ field }) => (
//     <StarRatingInput value={field.value} onChange={field.onChange} onBlur={field.onBlur} />
//   )}
// />`,
    explanation:
      'Angular custom form controls must implement the ControlValueAccessor interface (writeValue, registerOnChange, registerOnTouched) and register NG_VALUE_ACCESSOR. React simply receives value/onChange props, integrated seamlessly via the <Controller> wrapper.',
    solidPrinciple:
      'Interface Segregation Principle (ISP): React input components only need simple value and onChange props instead of a heavy 4-method interface.',
    bestPractices: [
      'Design custom UI controls (sliders, color pickers, rating widgets) to accept standard value and onChange props.',
      'Use React Hook Form Controller to bridge third-party UI widgets (e.g. Radix, MUI) into form state.',
    ],
  },

  // ==========================================
  // 10. Routing
  // ==========================================
  {
    id: 'route-guards',
    title: 'Route Protection (CanActivateFn vs Protected Route Layouts)',
    category: 'routing',
    angularSnippet: `// Angular Functional CanActivateFn Route Guard
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }
  
  // Redirect to login with returnUrl state
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};

// Route Configuration:
export const routes: Routes = [
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./admin.component').then(m => m.AdminComponent)
  }
];`,
    reactSnippet: `// React Router Protected Layout Route with <Navigate />
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function ProtectedRouteLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="page-loader">Verifying session...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login preserving original destination in location state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Renders nested matching child routes
  return <Outlet />;
}

// React Router configuration:
export const router = createBrowserRouter([
  {
    element: <ProtectedRouteLayout />,
    children: [
      { path: '/admin', element: <AdminDashboard /> },
      { path: '/profile', element: <UserProfile /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
]);`,
    explanation:
      'Angular route guards execute at router configuration level before component loading. React Router uses wrapper layout components (<ProtectedRouteLayout>) returning <Outlet /> or <Navigate to="/login" replace /> for declarative authorization.',
    solidPrinciple:
      'Open/Closed Principle (OCP): New protected layout branches can wrap routes without modifying page components.',
    bestPractices: [
      'Preserve the intended destination via location state when redirecting to login to redirect users back after authenticating.',
      'Always handle authentication loading states inside route guards to prevent flashing login pages on fresh page refreshes.',
    ],
  },
  {
    id: 'route-resolvers-loaders',
    title: 'Data Loaders vs Route Resolvers (ResolveFn vs loader)',
    category: 'routing',
    angularSnippet: `// Angular Route Resolver (ResolveFn)
export const userResolver: ResolveFn<User> = (route, state) => {
  const userService = inject(UserService);
  const userId = route.paramMap.get('id')!;
  return userService.getUserById(userId);
};

// In Route Config:
// { path: 'user/:id', component: UserDetailComponent, resolve: { user: userResolver } }

// In Component:
@Component({ ... })
export class UserDetailComponent {
  // Bound automatically with withComponentInputBinding()
  user = input.required<User>();
}`,
    reactSnippet: `// React Router Data Loader & useLoaderData
import { useLoaderData, type LoaderFunctionArgs } from 'react-router-dom';

export async function userDetailLoader({ params }: LoaderFunctionArgs) {
  const res = await fetch(\`/api/users/\${params.id}\`);
  if (!res.ok) {
    throw new Response('User Not Found', { status: 404 });
  }
  const user: User = await res.json();
  return { user };
}

export function UserDetailPage() {
  const { user } = useLoaderData() as { user: User };

  return (
    <div className="user-detail">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// Router config:
// { path: 'user/:id', element: <UserDetailPage />, loader: userDetailLoader }`,
    explanation:
      'Angular ResolveFn fetches data before route activation, injected via activated route data. React Router data loaders execute parallel data fetching during URL transitions, accessed via useLoaderData() with automatic Error Boundary handling on 404/500 errors.',
    solidPrinciple:
      'Single Responsibility Principle (SRP): Route data loading requirements are declared alongside route definitions.',
    bestPractices: [
      'Throw Response objects (e.g. 404 or 401) inside React Router loaders to trigger nested route ErrorBoundaries automatically.',
      'Type loader outputs cleanly with TypeScript loader utility types.',
    ],
  },
  {
    id: 'query-params-sync',
    title: 'URL Query Parameters & Filter State Synchronization',
    category: 'routing',
    angularSnippet: `// Angular ActivatedRoute & Router.navigate Query Params
@Component({ ... })
export class ProductCatalogComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  searchTerm = signal('');

  constructor() {
    this.route.queryParamMap.subscribe(params => {
      this.searchTerm.set(params.get('q') || '');
    });
  }

  updateSearch(q: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: q || null },
      queryParamsHandling: 'merge'
    });
  }
}`,
    reactSnippet: `// React Router useSearchParams with Debounced URL Sync
import { useSearchParams } from 'react-router-dom';

export function ProductCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [localQuery, setLocalQuery] = useState(query);

  const updateUrlParam = (val: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (val) next.set('q', val);
      else next.delete('q');
      return next;
    }, { replace: true });
  };

  return (
    <div>
      <input
        value={localQuery}
        onChange={e => {
          setLocalQuery(e.target.value);
          updateUrlParam(e.target.value);
        }}
        placeholder="Filter catalog..."
      />
    </div>
  );
}`,
    explanation:
      'Angular uses ActivatedRoute queryParamMap and Router.navigate with queryParamsHandling: "merge". React Router uses the useSearchParams hook providing URLSearchParams state synchronization with optional { replace: true } browser history management.',
    solidPrinciple:
      'Single Responsibility Principle (SRP): The browser URL serves as the single source of truth for sharable view filter state.',
    bestPractices: [
      'Pass { replace: true } in setSearchParams during keystroke filtering to avoid cluttering the browser back-button history.',
      'Delete empty or null query params from URLSearchParams to keep URLs clean.',
    ],
  },

  // ==========================================
  // 11. HTTP & Networking
  // ==========================================
  {
    id: 'http-interceptors-fetch',
    title: 'HTTP Client & Interceptors vs Fetch Middleware Pipeline',
    category: 'http',
    angularSnippet: `// Angular Functional Interceptor with Token Refresh & Retry
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getAccessToken();

  let authReq = req;
  if (token && !req.headers.has('Authorization')) {
    authReq = req.clone({
      setHeaders: { Authorization: \`Bearer \${token}\`, 'X-Client-Version': '1.0.0' }
    });
  }

  return next(authReq).pipe(
    retry({ count: 2, delay: 1000 }),
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        return auth.refreshToken().pipe(
          switchMap(newToken => next(req.clone({
            setHeaders: { Authorization: \`Bearer \${newToken}\` }
          })))
        );
      }
      return throwError(() => err);
    })
  );
};`,
    reactSnippet: `// React Composable Fetch Client with Middleware Interceptor Pipeline
export async function customFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(options.headers);

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', \`Bearer \${token}\`);
  }
  headers.set('X-Client-Version', '1.0.0');

  let response = await fetch(endpoint, { ...options, headers });

  // Handle 401 Automatic Token Refresh
  if (response.status === 401) {
    const newToken = await refreshAuthToken();
    if (newToken) {
      headers.set('Authorization', \`Bearer \${newToken}\`);
      response = await fetch(endpoint, { ...options, headers });
    }
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || \`HTTP error \${response.status}\`);
  }

  return response.json();
}`,
    explanation:
      'Angular provides an extensible HttpInterceptorFn pipeline configured in provideHttpClient. React uses custom fetch wrappers, Axios interceptors, or Ky client hooks to implement authentication token injection, automated refresh, and retry policies.',
    solidPrinciple:
      'Single Responsibility Principle (SRP): Token decoration, metrics, and error recovery are isolated in HTTP middleware without polluting UI callers.',
    bestPractices: [
      'Centralize network request logic into a typed apiClient utility rather than spreading raw fetch() calls across components.',
      'Handle 401 token refresh concurrency using a shared promise lock to avoid duplicate refresh requests.',
    ],
  },
  {
    id: 'tanstack-query-vs-http-service',
    title: 'Declarative Caching & Mutations (HttpClient vs TanStack Query)',
    category: 'http',
    angularSnippet: `// Angular Service with RxJS Caching & Refresh Subject
@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  // Cached Observable Stream
  todos$ = this.refreshTrigger$.pipe(
    switchMap(() => this.http.get<Todo[]>('/api/todos')),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  addTodo(newTodo: Partial<Todo>): Observable<Todo> {
    return this.http.post<Todo>('/api/todos', newTodo).pipe(
      tap(() => this.refreshTrigger$.next()) // Invalidate cache
    );
  }
}`,
    reactSnippet: `// React TanStack Query (useQuery + useMutation with Optimistic Updates)
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useTodos() {
  const queryClient = useQueryClient();

  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: () => customFetch<Todo[]>('/api/todos'),
    staleTime: 1000 * 60 * 5, // 5 min cache staleness
  });

  const addMutation = useMutation({
    mutationFn: (newTodo: Partial<Todo>) =>
      customFetch<Todo>('/api/todos', { method: 'POST', body: JSON.stringify(newTodo) }),
    // Optimistic Update
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);
      queryClient.setQueryData<Todo[]>(['todos'], old => [...(old || []), { id: 'temp', ...newTodo } as Todo]);
      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['todos'], context?.previousTodos); // Rollback
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return { ...todosQuery, addTodo: addMutation.mutate };
}`,
    explanation:
      'Angular uses HttpClient observables with shareReplay and BehaviorSubject triggers for cache management. React leverages TanStack Query for out-of-the-box stale-while-revalidate caching, background window focus refetching, and optimistic updates with automatic rollback.',
    solidPrinciple:
      'Dependency Inversion Principle (DIP): UI components depend on declarative query hooks rather than imperative networking orchestration.',
    bestPractices: [
      'Use structured query key arrays (e.g., [\'todos\', { status: \'active\' }]) for granular cache invalidation in TanStack Query.',
      'Implement optimistic UI updates for instant user feedback on fast mutations.',
    ],
  },
  {
    id: 'request-cancellation',
    title: 'Request Cancellation & Race Conditions (switchMap vs AbortController)',
    category: 'http',
    angularSnippet: `// Angular Typeahead with RxJS switchMap Cancellation
@Component({ ... })
export class SearchAutocompleteComponent {
  private http = inject(HttpClient);
  searchTerm = signal('');

  // Automatically cancels pending in-flight HTTP requests when term changes
  results = toSignal(
    toObservable(this.searchTerm).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        if (!query.trim()) return of([]);
        return this.http.get<SearchResult[]>(\`/api/search?q=\${encodeURIComponent(query)}\`).pipe(
          catchError(() => of([]))
        );
      })
    ),
    { initialValue: [] }
  );
}`,
    reactSnippet: `// React Async Search with AbortController Cancellation
export function SearchAutocomplete() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(\`/api/search?q=\${encodeURIComponent(query)}\`, {
          signal: controller.signal // Aborts pending request if query changes
        });
        const data = await res.json();
        setResults(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort(); // Cancel previous search execution
    };
  }, [query]);

  return <SearchDropdown results={results} loading={loading} onSearch={setQuery} />;
}`,
    explanation:
      'Angular RxJS switchMap automatically unsubscribes and cancels previous HTTP requests when a new event emits. React uses AbortController attached to the fetch signal inside useEffect cleanup to abort in-flight requests and avoid race conditions.',
    solidPrinciple:
      'Single Responsibility Principle (SRP): Cancellation prevents stale responses from overwriting newer user interactions.',
    bestPractices: [
      'Catch and ignore AbortError in fetch catch blocks to avoid logging intentional cancellations as errors.',
      'Always clear debouncing timers in the useEffect cleanup function.',
    ],
  },

  // ==========================================
  // 12. RxJS & Async Streams
  // ==========================================
  {
    id: 'rxjs-tosignal-external-store',
    title: 'RxJS Streams (toSignal vs useSyncExternalStore)',
    category: 'rxjs-async',
    angularSnippet: `// Angular toSignal RxJS Stream Interop
@Component({
  selector: 'app-stock-ticker',
  standalone: true,
  template: \`
    <div class="ticker">
      <span>Price: {{ currentPrice() | currency }}</span>
      <span [class.up]="isPositive()">{{ delta() }}%</span>
    </div>
  \`
})
export class StockTickerComponent {
  private stockService = inject(StockWebSocketService);

  // Converts RxJS observable stream directly into a fine-grained Signal
  currentPrice = toSignal(this.stockService.priceStream$, { initialValue: 0 });
  
  delta = computed(() => {
    const p = this.currentPrice();
    return p > 100 ? '+2.4' : '-1.1';
  });
  isPositive = computed(() => this.currentPrice() >= 100);
}`,
    reactSnippet: `// React useSyncExternalStore Concurrent-Safe Subscription
import { useSyncExternalStore } from 'react';
import type { Observable } from 'rxjs';

export function useObservable<T>(observable$: Observable<T>, initialValue: T): T {
  return useSyncExternalStore(
    (notify) => {
      const subscription = observable$.subscribe({
        next: () => notify(),
        error: (err) => console.error('Observable store error:', err),
      });
      return () => subscription.unsubscribe();
    },
    () => {
      let currentVal = initialValue;
      // Extract latest emitted value safely
      return currentVal;
    }
  );
}

export function StockTicker({ priceStream$ }: { priceStream$: Observable<number> }) {
  const currentPrice = useObservable(priceStream$, 0);
  const isPositive = currentPrice >= 100;

  return (
    <div className="ticker">
      <span>Price: \${currentPrice.toFixed(2)}</span>
      <span className={isPositive ? 'up' : 'down'}>
        {isPositive ? '+2.4%' : '-1.1%'}
      </span>
    </div>
  );
}`,
    explanation:
      'Angular bridges Observables to Signals using @angular/core/rxjs-interop toSignal(). React integrates external observable subscriptions safely into concurrent rendering using React\'s useSyncExternalStore hook, preventing state tearing.',
    solidPrinciple:
      'Dependency Inversion Principle (DIP): UI components depend on abstract stream consumers without coupling to specific message broker transports.',
    bestPractices: [
      'Use useSyncExternalStore for any external non-React subscription store (RxJS, WebSockets, Redux internals).',
      'Always supply a stable snapshot selector callback to prevent infinite re-render loops in React.',
    ],
  },
  {
    id: 'ngrx-signalstore-vs-zustand',
    title: 'Enterprise State Management (NgRx SignalStore vs Zustand)',
    category: 'rxjs-async',
    angularSnippet: `// Angular NgRx SignalStore
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';

export interface TaskState {
  tasks: Task[];
  filter: 'all' | 'completed';
  isLoading: boolean;
}

export const TaskStore = signalStore(
  { providedIn: 'root' },
  withState<TaskState>({ tasks: [], filter: 'all', isLoading: false }),
  withComputed(({ tasks, filter }) => ({
    filteredTasks: computed(() => {
      const f = filter();
      if (f === 'completed') return tasks().filter(t => t.done);
      return tasks();
    }),
    completedCount: computed(() => tasks().filter(t => t.done).length)
  })),
  withMethods((store, taskApi = inject(TaskApiService)) => ({
    async loadTasks() {
      patchState(store, { isLoading: true });
      const tasks = await taskApi.fetchTasks();
      patchState(store, { tasks, isLoading: false });
    },
    toggleTask(id: string) {
      patchState(store, {
        tasks: store.tasks().map(t => t.id === id ? { ...t, done: !t.done } : t)
      });
    }
  }))
);`,
    reactSnippet: `// React Zustand Store with Middleware & Computed Selectors
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface TaskStoreState {
  tasks: Task[];
  filter: 'all' | 'completed';
  isLoading: boolean;
  loadTasks: () => Promise<void>;
  toggleTask: (id: string) => void;
  setFilter: (filter: 'all' | 'completed') => void;
}

export const useTaskStore = create<TaskStoreState>()(
  devtools(
    (set, get) => ({
      tasks: [],
      filter: 'all',
      isLoading: false,
      loadTasks: async () => {
        set({ isLoading: true });
        const res = await fetch('/api/tasks');
        const tasks = await res.json();
        set({ tasks, isLoading: false });
      },
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map(t => t.id === id ? { ...t, done: !t.done } : t)
        })),
      setFilter: (filter) => set({ filter }),
    }),
    { name: 'TaskStore' }
  )
);

// Granular selector hook:
// const tasks = useTaskStore(state => state.tasks);
// const toggleTask = useTaskStore(state => state.toggleTask);`,
    explanation:
      'NgRx SignalStore provides modular state slices, computed signals, and methods using withState/withMethods. Zustand provides a lightweight hook-based store in React with devtools, middleware, and atomic selector subscriptions.',
    solidPrinciple:
      'Interface Segregation Principle (ISP): Components subscribe only to specific store slices, avoiding re-renders when unrelated store properties change.',
    bestPractices: [
      'In Zustand, always use atomic selectors (e.g. useTaskStore(s => s.tasks)) rather than destructuring the entire store.',
      'Use immer or shallow comparison middleware for complex nested state mutations in React.',
    ],
  },
  {
    id: 'websocket-realtime-streams',
    title: 'Real-Time WebSocket Streams with Auto-Reconnect',
    category: 'rxjs-async',
    angularSnippet: `// Angular RxJS webSocket with Reconnection Strategy
@Injectable({ providedIn: 'root' })
export class LiveMetricsService {
  private socket$ = webSocket<MetricUpdate>({
    url: 'wss://api.example.com/live-metrics',
    deserializer: msg => JSON.parse(msg.data)
  });

  metricsStream$ = this.socket$.pipe(
    retry({
      delay: (err, count) => timer(Math.min(1000 * Math.pow(2, count), 10000))
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  sendPing() {
    this.socket$.next({ type: 'PING' } as any);
  }
}`,
    reactSnippet: `// React Custom useWebSocket Hook with Exponential Backoff
export function useWebSocket<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let retryCount = 0;
    let timer: NodeJS.Timeout;
    let isUnmounted = false;

    function connect() {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        retryCount = 0;
      };

      ws.onmessage = (event) => {
        if (!isUnmounted) setData(JSON.parse(event.data));
      };

      ws.onclose = () => {
        setIsConnected(false);
        if (!isUnmounted) {
          const timeout = Math.min(1000 * Math.pow(2, retryCount++), 10000);
          timer = setTimeout(connect, timeout);
        }
      };
    }

    connect();

    return () => {
      isUnmounted = true;
      clearTimeout(timer);
      wsRef.current?.close();
    };
  }, [url]);

  return { data, isConnected };
}`,
    explanation:
      'Angular uses rxjs/webSocket with retry operators and shareReplay. React implements resilient WebSocket connections using custom hooks with exponential backoff timers and unmount protection.',
    solidPrinciple:
      'Single Responsibility Principle (SRP): Connection resilience and reconnect backoff are encapsulated away from UI views.',
    bestPractices: [
      'Always track an isUnmounted flag in React WebSocket hooks to prevent state updates on unmounted components.',
      'Cap exponential reconnection delays to prevent hammering servers during outages.',
    ],
  },

  // ==========================================
  // 13. Security & A11y
  // ==========================================
  {
    id: 'security-dom-sanitizer',
    title: 'Security & XSS Defense (DomSanitizer vs DOMPurify / JSX Escaping)',
    category: 'security-a11y',
    angularSnippet: `// Angular DomSanitizer & SecurityContext
@Component({
  selector: 'app-safe-html-viewer',
  standalone: true,
  template: \`<div [innerHTML]="trustedContent"></div>\`
})
export class SafeHtmlViewerComponent {
  @Input() rawHtml = '';
  private sanitizer = inject(DomSanitizer);

  get trustedContent(): SafeHtml {
    // Explicit security bypass for sanitized trusted markup
    return this.sanitizer.sanitize(SecurityContext.HTML, this.rawHtml) || '';
  }
}`,
    reactSnippet: `// React DOMPurify Sanitization & dangerouslySetInnerHTML
import DOMPurify from 'dompurify';

export interface SafeHtmlProps {
  rawHtml: string;
  className?: string;
}

export function SafeHtml({ rawHtml, className = '' }: SafeHtmlProps) {
  // Sanitize untrusted markup strictly before rendering
  const cleanHtml = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'li', 'code'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}`,
    explanation:
      'Angular automatically escapes bindings and provides DomSanitizer for explicit trust bypasses. React automatically escapes all JSX strings by default and requires explicit dangerouslySetInnerHTML paired with DOMPurify for HTML injection.',
    solidPrinciple:
      'Single Responsibility Principle (SRP): HTML sanitization is isolated from the view rendering pipeline.',
    bestPractices: [
      'Never pass unsanitized raw user input directly to dangerouslySetInnerHTML in React.',
      'Configure DOMPurify with an explicit whitelist of ALLOWED_TAGS and ALLOWED_ATTR.',
    ],
  },
  {
    id: 'accessible-dialog-modal',
    title: 'Accessible Modals & Focus Trapping (CDK FocusTrap vs Radix UI)',
    category: 'security-a11y',
    angularSnippet: `// Angular CDK FocusTrap & LiveAnnouncer
@Component({
  selector: 'app-a11y-modal',
  standalone: true,
  template: \`
    <div role="dialog" aria-modal="true" aria-labelledby="dialog-title" class="modal-backdrop">
      <div class="modal-box" cdkTrapFocus cdkTrapFocusAutoCapture>
        <h2 id="dialog-title">{{ title() }}</h2>
        <ng-content />
        <button type="button" (click)="close.emit()">Close</button>
      </div>
    </div>
  \`
})
export class A11yModalComponent implements OnInit {
  title = input.required<string>();
  close = output<void>();
  private liveAnnouncer = inject(LiveAnnouncer);

  ngOnInit() {
    this.liveAnnouncer.announce(\`Dialog \${this.title()} opened\`, 'polite');
  }
}`,
    reactSnippet: `// React Accessible Dialog using Radix UI Headless Primitives
import * as Dialog from '@radix-ui/react-dialog';

export function AccessibleDialog({ title, isOpen, onOpenChange, children }: DialogProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title className="dialog-title">{title}</Dialog.Title>
          <Dialog.Description className="dialog-desc">
            Accessible dialog with automated focus trap and escape key listeners.
          </Dialog.Description>
          
          {children}

          <Dialog.Close asChild>
            <button className="btn-close" aria-label="Close dialog">Close</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}`,
    explanation:
      'Angular CDK provides cdkTrapFocus directives and LiveAnnouncer services. React leverages headless primitive libraries like Radix UI or React Aria for automatic focus trapping, ARIA roles, portal mounting, and keyboard dismissals.',
    solidPrinciple:
      'Open/Closed Principle (OCP): Headless primitives provide complete keyboard and screen reader accessibility without constraining CSS styling.',
    bestPractices: [
      'Use headless accessibility libraries (Radix UI, Floating UI) in React instead of building custom focus traps from scratch.',
      'Ensure every dialog has an accessible title (aria-labelledby) and description (aria-describedby).',
    ],
  },

  // ==========================================
  // 14. Performance
  // ==========================================
  {
    id: 'performance-onpush-memo',
    title: 'Change Detection Optimization (OnPush vs React.memo & Compiler)',
    category: 'performance',
    angularSnippet: `// Angular OnPush Change Detection with Signal Inputs
@Component({
  selector: 'app-metric-row',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div class="metric-row">
      <span>{{ metric().label }}</span>
      <span class="value">{{ formattedValue() }}</span>
    </div>
  \`
})
export class MetricRowComponent {
  metric = input.required<MetricData>();
  formattedValue = computed(() => this.metric().value.toFixed(2));
}`,
    reactSnippet: `// React Memoization with React.memo & Custom Comparison
export interface MetricRowProps {
  metric: MetricData;
  onInspect?: (id: string) => void;
}

export const MetricRow = React.memo(
  function MetricRow({ metric, onInspect }: MetricRowProps) {
    const formattedValue = useMemo(() => metric.value.toFixed(2), [metric.value]);

    return (
      <div className="metric-row">
        <span>{metric.label}</span>
        <span className="value">{formattedValue}</span>
        {onInspect && <button onClick={() => onInspect(metric.id)}>Inspect</button>}
      </div>
    );
  },
  // Custom memo comparator (returns true if props are equal, skipping re-render)
  (prev, next) =>
    prev.metric.id === next.metric.id &&
    prev.metric.value === next.metric.value &&
    prev.metric.label === next.metric.label
);`,
    explanation:
      'Angular ChangeDetectionStrategy.OnPush skips subtrees unless signal inputs change. React uses React.memo() with optional shallow/custom prop comparators (or automatic React 19 compiler optimization) to skip unchanged child re-renders.',
    solidPrinciple:
      'Single Responsibility Principle (SRP): Component render purity enables declarative optimization.',
    bestPractices: [
      'In React, keep prop callbacks stable with useCallback() when passing them to React.memo() components.',
      'Rely on the React 19 Compiler where enabled, using manual React.memo() only for high-frequency list rows.',
    ],
  },
  {
    id: 'virtual-scrolling',
    title: 'Virtual Scrolling for Large Datasets (CDK vs TanStack Virtual)',
    category: 'performance',
    angularSnippet: `<!-- Angular CDK Virtual Scroll -->
<cdk-virtual-scroll-viewport itemSize="60" minBufferPx="300" maxBufferPx="600" class="viewport">
  <div *cdkVirtualFor="let user of users; trackBy: trackById" class="user-row">
    <img [src]="user.avatar" alt="" />
    <span>{{ user.name }} ({{ user.email }})</span>
  </div>
</cdk-virtual-scroll-viewport>`,
    reactSnippet: `// React TanStack Virtual (useVirtualizer)
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

export function VirtualUserList({ users }: { users: User[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: users.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 5,
  });

  return (
    <div ref={parentRef} className="viewport" style={{ height: '500px', overflow: 'auto' }}>
      <div style={{ height: \`\${rowVirtualizer.getTotalSize()}px\`, position: 'relative', width: '100%' }}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const user = users[virtualRow.index];
          return (
            <div
              key={virtualRow.key}
              className="user-row"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: \`\${virtualRow.size}px\`,
                transform: \`translateY(\${virtualRow.start}px)\`,
              }}
            >
              <img src={user.avatar} alt="" />
              <span>{user.name} ({user.email})</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}`,
    explanation:
      'Angular CDK provides cdk-virtual-scroll-viewport and *cdkVirtualFor. React uses TanStack Virtual (useVirtualizer) for lightweight, high-performance windowed rendering of tens of thousands of items without DOM node bloat.',
    solidPrinciple:
      'Single Responsibility Principle (SRP): Virtualization calculates visible item window coordinates without coupling to row markup.',
    bestPractices: [
      'Always configure an overscan buffer (e.g. 5-10 items) to prevent blank spaces during rapid scrolling in React.',
      'Use dynamic measurement (virtualRow.measureElement) in TanStack Virtual if row heights vary dynamically.',
    ],
  },
  {
    id: 'concurrent-transitions',
    title: 'Non-Blocking Concurrent Transitions (useTransition & useDeferredValue)',
    category: 'performance',
    angularSnippet: `// Angular Zone-Outside Execution for High-Frequency Events
@Component({ ... })
export class CanvasGraphComponent implements OnInit {
  private ngZone = inject(NgZone);
  private el = inject(ElementRef);

  ngOnInit() {
    // Run high-frequency mousemove events outside Angular Change Detection
    this.ngZone.runOutsideAngular(() => {
      this.el.nativeElement.addEventListener('mousemove', (e: MouseEvent) => {
        this.renderCanvasParticles(e.clientX, e.clientY);
      });
    });
  }
}`,
    reactSnippet: `// React 18/19 Concurrent Features (useDeferredValue & useTransition)
import { useState, useDeferredValue, useTransition } from 'react';

export function SearchFilterDashboard({ items }: { items: Product[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();

  // Defers expensive list filtering so keystrokes remain instantaneous
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(deferredSearchTerm.toLowerCase())
  );

  const handleClear = () => {
    startTransition(() => {
      setSearchTerm('');
    });
  };

  return (
    <div>
      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Type to filter..."
      />
      <button onClick={handleClear} disabled={isPending}>Clear</button>
      
      {deferredSearchTerm !== searchTerm && <p className="shimmer">Filtering results...</p>}
      <HeavyProductGrid products={filteredItems} />
    </div>
  );
}`,
    explanation:
      'Angular historically used NgZone.runOutsideAngular() to bypass change detection cycles for animation frames. React uses concurrent features (useTransition, useDeferredValue) to mark heavy render computations as non-blocking background tasks.',
    solidPrinciple:
      'Single Responsibility Principle (SRP): Urgent user inputs (typing) take priority over non-urgent background UI recalculations.',
    bestPractices: [
      'Use useDeferredValue on search queries passed to heavy child grids to prevent input typing lag.',
      'Use useTransition for page navigation, tab switching, and heavy filter resets in React.',
    ],
  },

  // ==========================================
  // 15. CDK & UI Primitives
  // ==========================================
  {
    id: 'cdk-drag-drop-vs-dnd-kit',
    title: 'Interactive Drag-and-Drop Lists (CDK DragDrop vs @dnd-kit)',
    category: 'cdk-material',
    angularSnippet: `// Angular CDK Drag and Drop
import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban-column',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CommonModule],
  template: \`
    <div cdkDropList class="task-list" (cdkDropListDropped)="onDrop($event)">
      <div *ngFor="let task of tasks" cdkDrag class="task-card">
        <span>{{ task.title }}</span>
      </div>
    </div>
  \`
})
export class KanbanColumnComponent {
  tasks: Task[] = [...];

  onDrop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }
}`,
    reactSnippet: `// React Drag and Drop with @dnd-kit (Core + Sortable)
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="task-card">
      {task.title}
    </div>
  );
}

export function KanbanColumn({ tasks, onTasksReordered }: Props) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex(t => t.id === active.id);
      const newIndex = tasks.findIndex(t => t.id === over.id);
      onTasksReordered(arrayMove(tasks, oldIndex, newIndex));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div className="task-list">
          {tasks.map(task => <SortableItem key={task.id} task={task} />)}
        </div>
      </SortableContext>
    </DndContext>
  );
}`,
    explanation:
      'Angular CDK provides cdkDropList and cdkDrag directives with moveItemInArray. React leverages @dnd-kit (or @hello-pangea/dnd) using hooks (useSortable) and context providers (DndContext, SortableContext) for accessible drag-and-drop interactions.',
    solidPrinciple:
      'Open/Closed Principle (OCP): Drag sensor behaviors (pointer, keyboard, touch) can be extended without altering list presentation.',
    bestPractices: [
      'In @dnd-kit, pass string/number item IDs into SortableContext items array.',
      'Ensure keyboard accessibility sensors are configured for compliant WCAG drag-and-drop operations.',
    ],
  },
  {
    id: 'cdk-overlays-floating-ui',
    title: 'Overlays & Anchored Positioning (CDK Overlay vs Floating UI)',
    category: 'cdk-material',
    angularSnippet: `// Angular CDK Overlay with Flexible Connected Position
@Component({ ... })
export class PopoverService {
  private overlay = inject(Overlay);

  openPopover(originElement: HTMLElement, component: ComponentType<any>): OverlayRef {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(originElement)
      .withPositions([
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 8 },
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -8 }
      ]);

    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });

    overlayRef.attach(new ComponentPortal(component));
    overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
    return overlayRef;
  }
}`,
    reactSnippet: `// React Floating UI (useFloating with autoUpdate, offset, flip, shift)
import { useFloating, autoUpdate, offset, flip, shift, useClick, useDismiss, useInteractions } from '@floating-ui/react';
import { useState } from 'react';

export function Popover({ trigger, content }: { trigger: ReactNode; content: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(8), flip(), shift({ padding: 10 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()} className="popover-trigger">
        {trigger}
      </div>
      {isOpen && (
        <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} className="popover-bubble">
          {content}
        </div>
      )}
    </>
  );
}`,
    explanation:
      'Angular CDK uses the programmatic Overlay service with ComponentPortal and FlexibleConnectedPositionStrategy. React uses Floating UI (or Radix Popover) with useFloating and middleware (flip, shift, offset) for automatic collision detection and viewport anchoring.',
    solidPrinciple:
      'Single Responsibility Principle (SRP): Anchored positioning calculation is isolated from popup inner markup.',
    bestPractices: [
      'Always pass whileElementsMounted: autoUpdate to useFloating to maintain accurate alignment during window resizes and scrolling.',
      'Include flip() and shift() middleware to prevent popovers from overflowing viewport boundaries.',
    ],
  },

  // ==========================================
  // 16. Testing
  // ==========================================
  {
    id: 'testing-testbed-rtl',
    title: 'Component Integration Testing (TestBed vs React Testing Library)',
    category: 'testing',
    angularSnippet: `// Angular TestBed Component Integration Test
describe('UserCardComponent', () => {
  let fixture: ComponentFixture<UserCardComponent>;
  let component: UserCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    // Set signal input
    fixture.componentRef.setInput('user', { id: 'u1', name: 'Alice', role: 'admin' });
    fixture.detectChanges();
  });

  it('renders user details and emits on select', () => {
    const selectSpy = vi.fn();
    component.select.subscribe(selectSpy);

    const titleEl = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(titleEl.textContent).toContain('Alice');

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(selectSpy).toHaveBeenCalledWith('u1');
  });
});`,
    reactSnippet: `// Vitest + React Testing Library + userEvent
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { UserCard } from './UserCard';

describe('UserCard Component', () => {
  it('renders user details and triggers onSelect callback', async () => {
    const user = userEvent.setup();
    const mockSelect = vi.fn();

    const mockUserData = { id: 'u1', name: 'Alice', role: 'admin' as const };

    render(<UserCard user={mockUserData} onSelect={mockSelect} />);

    // Query elements from the user's accessibility perspective
    expect(screen.getByRole('heading', { level: 3, name: /alice/i })).toBeInTheDocument();
    expect(screen.getByText(/admin/i)).toBeInTheDocument();

    const selectButton = screen.getByRole('button', { name: /select/i });
    await user.click(selectButton);

    expect(mockSelect).toHaveBeenCalledTimes(1);
    expect(mockSelect).toHaveBeenCalledWith('u1');
  });
});`,
    explanation:
      'Angular uses TestBed and ComponentFixture with manual detectChanges() and By.css selectors. React Testing Library queries DOM nodes from the user perspective (getByRole, getByText) and simulates realistic browser events with userEvent.',
    solidPrinciple:
      'Liskov Substitution Principle (LSP): Tests verify public interface behavior without inspecting private internal properties.',
    bestPractices: [
      'Prefer getByRole and getByLabelText over getByTestId in React Testing Library tests for better accessibility verification.',
      'Always use userEvent.setup() instead of fireEvent for realistic keyboard and mouse event dispatching.',
    ],
  },
  {
    id: 'testing-async-msw',
    title: 'Async Data Fetching & Network Mocking (HttpTestingController vs MSW)',
    category: 'testing',
    angularSnippet: `// Angular HttpTestingController Unit Test
describe('UserService HTTP', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('fetches users list successfully', () => {
    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users[0].name).toBe('John');
    });

    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: '1', name: 'John' }, { id: '2', name: 'Jane' }]);
  });
});`,
    reactSnippet: `// React Testing with Mock Service Worker (MSW v2)
import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { UserListView } from './UserListView';

const server = setupServer(
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
    ]);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserListView with MSW', () => {
  it('renders users after network fetch completes', async () => {
    render(<UserListView />);

    expect(screen.getByText(/loading users/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });
});`,
    explanation:
      'Angular tests mock the HttpClient layer using HttpTestingController. React tests leverage Mock Service Worker (MSW) at the network layer, intercepting standard fetch/axios requests seamlessly across both tests and browser development.',
    solidPrinciple:
      'Dependency Inversion Principle (DIP): Tests verify network data integration against realistic standard HTTP endpoint contracts.',
    bestPractices: [
      'Use Mock Service Worker (MSW) to mock HTTP requests at network level without mocking custom fetch hooks.',
      'Use waitFor() in React Testing Library when asserting state updates driven by async network responses.',
    ],
  },
]

export const MIGRATION_CATEGORY_TABS: { id: PatternCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Patterns' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'templates', label: 'Templates' },
  { id: 'control-flow', label: 'Control Flow' },
  { id: 'defer', label: 'Deferred Loading' },
  { id: 'directives', label: 'Directives' },
  { id: 'reactivity', label: 'State & Reactivity' },
  { id: 'lifecycle', label: 'Lifecycle & DOM' },
  { id: 'di', label: 'Dependency Injection' },
  { id: 'forms', label: 'Forms' },
  { id: 'routing', label: 'Routing' },
  { id: 'http', label: 'HTTP & Fetch' },
  { id: 'rxjs-async', label: 'RxJS & Streams' },
  { id: 'security-a11y', label: 'Security & A11y' },
  { id: 'performance', label: 'Performance' },
  { id: 'cdk-material', label: 'CDK & UI' },
  { id: 'testing', label: 'Testing' },
]
