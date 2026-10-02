import type {
  CategoryGroup,
  ChecklistSectionSummary,
  FeatureChecklistItem,
} from '../types/features.ts'

export const CATEGORY_GROUPS: {
  id: CategoryGroup | 'all'
  label: string
  icon: string
  description: string
}[] = [
  {
    id: 'all',
    label: 'All Sections',
    icon: 'list-checks',
    description: 'Complete 35-section Angular vs ReactJS feature inventory',
  },
  {
    id: 'core',
    label: 'Core Architecture',
    icon: 'tree-structure',
    description: 'Component models, modules vs functions, and dependency systems',
  },
  {
    id: 'templates',
    label: 'Templates & Directives',
    icon: 'code',
    description: 'Binding syntaxes, built-in directives, custom directives & pipes',
  },
  {
    id: 'reactivity',
    label: 'Reactivity & Lifecycle',
    icon: 'sparkle',
    description: 'Signals, hooks, state primitives, effects, and DOM access',
  },
  {
    id: 'forms-routing',
    label: 'Forms & Routing',
    icon: 'compass',
    description: 'Reactive forms, URL synchronization, guards, and navigation',
  },
  {
    id: 'network-async',
    label: 'HTTP & Async Streams',
    icon: 'plugs-connected',
    description: 'HttpClient, interceptors, RxJS interop, and async data pipelines',
  },
  {
    id: 'performance-tooling',
    label: 'Performance & Tooling',
    icon: 'lightning',
    description: 'Control flow, deferred loading, OnPush, SSR, build optimizations',
  },
  {
    id: 'ecosystem',
    label: 'CDK, UI & Ecosystem',
    icon: 'globe',
    description: 'Material/CDK primitives, security, accessibility, testing, & patterns',
  },
]

export const CHECKLIST_SECTIONS: ChecklistSectionSummary[] = [
  {
    number: 1,
    title: 'Core architecture',
    group: 'core',
    description: 'Standalone components, services, providers, bootstrap, and modular hierarchy',
    itemCount: 2,
  },
  {
    number: 2,
    title: 'Template syntax',
    group: 'templates',
    description: 'Interpolation, property/event binding, template variables, and SVG rendering',
    itemCount: 2,
  },
  {
    number: 3,
    title: 'Built-in control flow',
    group: 'performance-tooling',
    description: '@if/@else, @for with required track, @empty, @switch, and @let block variable declaration',
    itemCount: 1,
  },
  {
    number: 4,
    title: 'Deferred loading',
    group: 'performance-tooling',
    description: '@defer, @placeholder, @loading, @error triggers (viewport, interaction, timer, idle)',
    itemCount: 1,
  },
  {
    number: 5,
    title: 'Built-in directives',
    group: 'templates',
    description: 'NgClass, NgStyle, NgOptimizedImage, NgTemplateOutlet, and RouterOutlet',
    itemCount: 1,
  },
  {
    number: 6,
    title: 'Custom directives',
    group: 'templates',
    description: 'Host directives, attribute/structural directives, ViewContainerRef, and hostBindings',
    itemCount: 1,
  },
  {
    number: 7,
    title: 'Components and component APIs',
    group: 'core',
    description: 'input(), output(), model(), content projection, and dynamic createComponent',
    itemCount: 1,
  },
  {
    number: 8,
    title: 'Signals and reactive primitives',
    group: 'reactivity',
    description: 'signal(), computed(), effect(), linkedSignal(), resource(), and RxJS interop',
    itemCount: 1,
  },
  {
    number: 9,
    title: 'Lifecycle and rendering hooks',
    group: 'reactivity',
    description: 'ngOnInit, ngOnDestroy, afterNextRender, afterEveryRender, and DestroyRef',
    itemCount: 1,
  },
  {
    number: 10,
    title: 'Dependency injection',
    group: 'core',
    description: 'inject(), InjectionToken, hierarchical environment and element injectors',
    itemCount: 1,
  },
  {
    number: 11,
    title: 'Queries and DOM access',
    group: 'reactivity',
    description: 'viewChild(), viewChildren(), contentChild(), ElementRef, and Renderer2',
    itemCount: 1,
  },
  {
    number: 12,
    title: 'Change detection and zones',
    group: 'reactivity',
    description: 'ChangeDetectionStrategy.OnPush, Zoneless change detection, and NgZone',
    itemCount: 1,
  },
  {
    number: 13,
    title: 'Built-in pipes',
    group: 'templates',
    description: 'AsyncPipe, DatePipe, CurrencyPipe, JsonPipe, KeyValuePipe, and custom PipeTransform',
    itemCount: 1,
  },
  {
    number: 14,
    title: 'Forms',
    group: 'forms-routing',
    description: 'ReactiveFormsModule (FormGroup, FormArray, FormControl), typed forms, and custom validators',
    itemCount: 1,
  },
  {
    number: 15,
    title: 'Routing',
    group: 'forms-routing',
    description: 'provideRouter, functional guards (CanActivateFn), resolvers, lazy loadComponent',
    itemCount: 1,
  },
  {
    number: 16,
    title: 'HTTP client',
    group: 'network-async',
    description: 'provideHttpClient, functional interceptors, HttpContextToken, typed responses, retry/cancel',
    itemCount: 1,
  },
  {
    number: 17,
    title: 'RxJS interoperability',
    group: 'network-async',
    description: 'toSignal(), toObservable(), takeUntilDestroyed(), BehaviorSubject, debouncing',
    itemCount: 1,
  },
  {
    number: 18,
    title: 'Server-side rendering and hydration',
    group: 'performance-tooling',
    description: 'Angular SSR, client hydration, event replay, isPlatformBrowser/Server',
    itemCount: 1,
  },
  {
    number: 19,
    title: 'Internationalization and localization',
    group: 'ecosystem',
    description: 'i18n template attributes, ICU plural/select expressions, $localize runtime vs react-i18next',
    itemCount: 1,
  },
  {
    number: 20,
    title: 'Images, styles, animations, and UI',
    group: 'ecosystem',
    description: 'Component style encapsulation, @angular/animations trigger/transition vs Framer Motion',
    itemCount: 1,
  },
  {
    number: 21,
    title: 'Security',
    group: 'ecosystem',
    description: 'DomSanitizer, HTML/URL sanitization, bypassSecurityTrustHtml, CSP, and XSS defense',
    itemCount: 1,
  },
  {
    number: 22,
    title: 'Accessibility',
    group: 'ecosystem',
    description: 'ARIA attribute bindings, Angular CDK FocusMonitor, FocusTrap, and LiveAnnouncer',
    itemCount: 1,
  },
  {
    number: 23,
    title: 'Testing',
    group: 'performance-tooling',
    description: 'TestBed, ComponentFixture, fakeAsync/tick vs Vitest & React Testing Library',
    itemCount: 1,
  },
  {
    number: 24,
    title: 'Angular CLI and workspace',
    group: 'performance-tooling',
    description: 'ng generate, build configurations, file replacements, budgets, schematics vs Vite plugins',
    itemCount: 1,
  },
  {
    number: 25,
    title: 'Compilation and build system',
    group: 'performance-tooling',
    description: 'Ahead-of-Time (AOT) compiler, Ivy runtime, code splitting vs Rolldown & SWC',
    itemCount: 1,
  },
  {
    number: 26,
    title: 'Micro-frontends and Module Federation',
    group: 'performance-tooling',
    description: 'Native Federation with loadRemoteModule vs Webpack/Vite dynamic Module Federation',
    itemCount: 1,
  },
  {
    number: 27,
    title: 'Progressive Web Apps and service workers',
    group: 'ecosystem',
    description: '@angular/pwa, SwUpdate service, asset/data caching vs Workbox & Vite PWA plugin',
    itemCount: 1,
  },
  {
    number: 28,
    title: 'Angular CDK',
    group: 'ecosystem',
    description: 'Overlay, Drag and Drop, Virtual Scrolling (CdkVirtualScrollViewport), BreakpointObserver',
    itemCount: 1,
  },
  {
    number: 29,
    title: 'Angular Material',
    group: 'ecosystem',
    description: 'Material design components (MatButton, MatDialog, MatTable, MatFormField) vs Radix / MUI',
    itemCount: 1,
  },
  {
    number: 30,
    title: 'State management (NgRx / NGXS)',
    group: 'reactivity',
    description: 'NgRx SignalStore, createAction/createReducer, Effects vs Redux Toolkit / Zustand',
    itemCount: 1,
  },
  {
    number: 31,
    title: 'Angular CDK deep primitives',
    group: 'ecosystem',
    description: 'SelectionModel, ComponentPortal, TemplatePortal, FocusMonitor vs React Portals & hooks',
    itemCount: 1,
  },
  {
    number: 32,
    title: 'Developer tooling',
    group: 'performance-tooling',
    description: 'Angular Language Service, DevTools profiler, component explorer vs React DevTools',
    itemCount: 1,
  },
  {
    number: 33,
    title: 'Library authoring',
    group: 'ecosystem',
    description: 'Angular Package Format (APF), ng-packagr, public API barrels vs tsup / rollup',
    itemCount: 1,
  },
  {
    number: 34,
    title: 'Legacy and compatibility topics',
    group: 'core',
    description: 'NgModule to Standalone migration, *ngIf/*ngFor to @if/@for, class to functional hooks',
    itemCount: 1,
  },
  {
    number: 35,
    title: 'Common external patterns often used with Angular',
    group: 'ecosystem',
    description: 'NgRx SignalStore, NGXS, RxAngular, Tailwind, Jest/Vitest, Storybook, OpenAPI clients',
    itemCount: 1,
  },
]

export const CHECKLIST_ITEMS: FeatureChecklistItem[] = [
  // Section 1: Core architecture
  {
    id: 'sec1-standalone-components',
    sectionNumber: 1,
    sectionTitle: 'Core architecture',
    group: 'core',
    name: 'Standalone Components & Bootstrap',
    angularConcept:
      'Angular v14+ standalone components define their own imports array and bootstrap directly via bootstrapApplication().',
    reactConcept:
      'React functional components are inherently standalone modules imported directly using standard ES module imports and rendered with createRoot().',
    angularSnippet: `@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, UserAvatarComponent],
  template: \`
    <div class="profile">
      <app-user-avatar [user]="user()" />
      <h2>{{ user().name }}</h2>
    </div>
  \`
})
export class UserProfileComponent {
  user = input.required<User>();
}

// main.ts
bootstrapApplication(UserProfileComponent, appConfig);`,
    reactSnippet: `import { UserAvatar } from './UserAvatar';
import type { User } from '../types';

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="profile">
      <UserAvatar user={user} />
      <h2>{user.name}</h2>
    </div>
  );
}

// main.tsx
createRoot(document.getElementById('root')!).render(<UserProfile user={currentUser} />);`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility Principle',
        description: 'Each component is solely responsible for rendering its assigned UI view given its props.',
      },
      {
        principle: 'DIP',
        title: 'Dependency Inversion',
        description: 'Components depend on abstract prop interfaces (UserProfileProps) rather than concrete instances.',
      },
    ],
    keyDifferences: [
      'Angular requires @Component decorator metadata and explicit imports array.',
      'React uses plain TypeScript functions and native ES6 module imports without framework decorator registration.',
      'React props are destructured TypeScript interfaces.',
    ],
    tags: ['Components', 'Standalone', 'Bootstrap', 'ApplicationConfig'],
  },
  {
    id: 'sec1-smart-presentational',
    sectionNumber: 1,
    sectionTitle: 'Core architecture',
    group: 'core',
    name: 'Smart/Container & Presentational Components',
    angularConcept:
      'Container components inject services, manage state observables, and pass data down to presentational components via @Input() and listen to @Output().',
    reactConcept:
      'Custom container components or hooks manage state and business logic, delegating rendering to pure presentational components.',
    angularSnippet: `// Container Component
@Component({
  selector: 'app-order-container',
  standalone: true,
  imports: [OrderSummaryComponent],
  template: \`
    <app-order-summary 
      [items]="orderService.items()"
      (checkout)="orderService.checkout()"
    />
  \`
})
export class OrderContainerComponent {
  orderService = inject(OrderService);
}`,
    reactSnippet: `// Presentational Component
export function OrderSummary({ items, onCheckout }: OrderSummaryProps) {
  return (
    <div>
      <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>
      <button onClick={onCheckout}>Checkout</button>
    </div>
  );
}

// Container Component
export function OrderContainer() {
  const { items, checkout } = useOrderService();
  return <OrderSummary items={items} onCheckout={checkout} />;
}`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility Principle',
        description: 'Separates state coordination (container/hook) from presentation rendering (presentational component).',
      },
      {
        principle: 'ISP',
        title: 'Interface Segregation',
        description: 'Presentational component only asks for the exact props (OrderSummaryProps) it needs.',
      },
    ],
    keyDifferences: [
      'In React, custom hooks can cleanly encapsulate container logic without needing a separate container component wrapper.',
      'Angular uses DI injection in component classes or router resolvers.',
    ],
    tags: ['Architecture', 'Smart Components', 'Presentational', 'Containers'],
  },

  // Section 2: Template syntax
  {
    id: 'sec2-template-binding',
    sectionNumber: 2,
    sectionTitle: 'Template syntax',
    group: 'templates',
    name: 'Data, Property, Attribute & Event Bindings',
    angularConcept:
      'Angular uses distinct syntax delimiters: {{}} for interpolation, [] for property binding, [attr.*] for HTML attributes, and () for event binding.',
    reactConcept:
      'React uses unified curly braces {} for all expressions: values, props, HTML attributes, and event handlers (camelCase onClick, onChange).',
    angularSnippet: `<!-- Angular Template -->
<button 
  [disabled]="isSubmitting"
  [class.active]="isSelected"
  [attr.aria-expanded]="isExpanded"
  [style.fontSize.px]="fontSize"
  (click)="handleClick($event)">
  {{ buttonLabel }}
</button>`,
    reactSnippet: `{/* React JSX */}
<button
  disabled={isSubmitting}
  className={isSelected ? 'active' : ''}
  aria-expanded={isExpanded}
  style={{ fontSize: \`\${fontSize}px\` }}
  onClick={(e) => handleClick(e)}
>
  {buttonLabel}
</button>`,
    solidNotes: [
      {
        principle: 'OCP',
        title: 'Open/Closed Principle',
        description: 'React JSX allows any standard JS expression to compute styles, classnames, and attributes dynamically without new compiler syntax.',
      },
    ],
    keyDifferences: [
      'Angular distinguishes DOM property bindings [property] from HTML attribute bindings [attr.attribute].',
      'React maps HTML attributes directly to DOM properties (e.g. className for class, htmlFor for for, camelCase events).',
      'React JSX is full TypeScript code checked at compile time.',
    ],
    tags: ['Template Syntax', 'Binding', 'Property Binding', 'Event Binding', 'Interpolation'],
  },
  {
    id: 'sec2-template-containers',
    sectionNumber: 2,
    sectionTitle: 'Template syntax',
    group: 'templates',
    name: '<ng-container>, <ng-template> & React Fragments',
    angularConcept:
      '<ng-container> acts as a non-rendering grouping wrapper; <ng-template> defines a reusable template snippet rendered via TemplateRef or NgTemplateOutlet.',
    reactConcept:
      'React Fragments (<>...</> or <React.Fragment key={id}>) provide grouping without adding extra DOM nodes; render props or functional components serve as templates.',
    angularSnippet: `<!-- Non-rendering container -->
<ng-container *ngIf="user">
  <h1>{{ user.name }}</h1>
  <p>{{ user.email }}</p>
</ng-container>

<!-- Template definition & outlet -->
<ng-template #cardTpl let-title="title">
  <div class="card">{{ title }}</div>
</ng-template>
<ng-container *ngTemplateOutlet="cardTpl; context: { title: 'Admin' }"></ng-container>`,
    reactSnippet: `{/* React Fragment grouping */}
{user && (
  <>
    <h1>{user.name}</h1>
    <p>{user.email}</p>
  </>
)}

{/* Reusable template function */}
const renderCard = (title: string) => <div className="card">{title}</div>;
{renderCard('Admin')}`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility',
        description: 'Fragments avoid polluting the DOM layout with wrapper elements solely for logical grouping.',
      },
    ],
    keyDifferences: [
      'React functions and JSX variables replace the need for specialized <ng-template> engines.',
      'React Fragments natively accept keys when mapping lists: <Fragment key={item.id}>...</Fragment>.',
    ],
    tags: ['ng-container', 'ng-template', 'React Fragment', 'Render Props'],
  },

  // Section 3: Built-in control flow
  {
    id: 'sec3-control-flow',
    sectionNumber: 3,
    sectionTitle: 'Built-in control flow',
    group: 'performance-tooling',
    name: 'Modern Control Flow (@if, @for with track, @empty, @switch, @let)',
    angularConcept:
      'Angular v17+ built-in control flow replaces *ngIf, *ngFor, and *ngSwitch with ergonomic compiler blocks: @if, @for (track expr), @empty, @switch, and @let.',
    reactConcept:
      'React uses standard JS constructs: ternary expressions, array .map() with unique key prop, switch statements, and local let/const declarations in JSX render bodies.',
    angularSnippet: `@if (isLoading) {
  <app-spinner />
} @else if (error) {
  <p class="error">{{ error }}</p>
} @else {
  @let total = items.length;
  <p>Total: {{ total }}</p>
  
  @for (item of items; track item.id; let idx = $index; let first = $first) {
    <div [class.first-row]="first">
      #{{ idx + 1 }}: {{ item.name }}
    </div>
  } @empty {
    <p>No items found.</p>
  }
}`,
    reactSnippet: `{isLoading ? (
  <Spinner />
) : error ? (
  <p className="error">{error}</p>
) : (
  (() => {
    const total = items.length;
    return (
      <>
        <p>Total: {total}</p>
        {items.length === 0 ? (
          <p>No items found.</p>
        ) : (
          items.map((item, idx) => (
            <div key={item.id} className={idx === 0 ? 'first-row' : ''}>
              #{idx + 1}: {item.name}
            </div>
          ))
        )}
      </>
    );
  })()
)}`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility',
        description: 'Mapping and conditional display are cleanly delineated; key tracking ensures predictable DOM reconciliation.',
      },
    ],
    keyDifferences: [
      'Angular @for enforces a required track expression for performance.',
      'React enforces key={uniqueId} on mapped JSX elements to preserve element identity across reconciliation.',
      'Angular @empty handles empty collections seamlessly without extra checks.',
    ],
    tags: ['@if', '@for', '@switch', '@let', 'track', 'JSX conditionals'],
  },

  // Section 4: Deferred loading
  {
    id: 'sec4-deferred-loading',
    sectionNumber: 4,
    sectionTitle: 'Deferred loading',
    group: 'performance-tooling',
    name: 'Deferred Views (@defer vs React Suspense / lazy)',
    angularConcept:
      '@defer automatically code-splits and lazy-loads template chunks based on triggers: on idle, on viewport, on interaction, on hover, on timer, or when condition.',
    reactConcept:
      'React uses React.lazy() with dynamic import() and <Suspense fallback={<Loading />}>, combined with IntersectionObserver or event triggers for viewport/hover deferral.',
    angularSnippet: `@defer (on viewport; prefetch on idle) {
  <app-heavy-chart [data]="chartData" />
} @placeholder (minimum 500ms) {
  <div class="skeleton">Chart placeholder...</div>
} @loading (after 100ms; minimum 1s) {
  <app-spinner />
} @error {
  <p>Failed to load chart bundle.</p>
}`,
    reactSnippet: `// Lazy chunk definition
const HeavyChart = lazy(() => import('./HeavyChart'));

export function Dashboard({ chartData }: Props) {
  return (
    <ErrorBoundary fallback={<p>Failed to load chart bundle.</p>}>
      <Suspense fallback={<div className="skeleton">Loading chart...</div>}>
        <HeavyChart data={chartData} />
      </Suspense>
    </ErrorBoundary>
  );
}`,
    solidNotes: [
      {
        principle: 'OCP',
        title: 'Open/Closed Principle',
        description: 'Adding asynchronous or heavy chunks does not require changing parent rendering code; Suspense handles the async lifecycle cleanly.',
      },
    ],
    keyDifferences: [
      'Angular @defer is a built-in compiler feature supporting declarative triggers like on viewport, on hover, on timer directly in template syntax.',
      'React uses React.lazy() + Suspense for bundle splitting, and custom hooks/components for viewport or interaction-triggered loading.',
    ],
    tags: ['@defer', '@placeholder', '@loading', 'Suspense', 'React.lazy', 'Code Splitting'],
  },

  // Section 5: Built-in directives
  {
    id: 'sec5-builtin-directives',
    sectionNumber: 5,
    sectionTitle: 'Built-in directives',
    group: 'templates',
    name: 'Built-in Directives (NgClass, NgStyle, NgOptimizedImage)',
    angularConcept:
      'Angular provides NgClass, NgStyle, NgOptimizedImage for DOM attribute and styling enhancements and performance optimizations.',
    reactConcept:
      'React applies style objects, dynamic className helper utilities (like clsx/classnames), and optimized image components (native or framework-level).',
    angularSnippet: `<img 
  [ngSrc]="user.avatarUrl"
  width="80"
  height="80"
  priority
  alt="User Avatar"
/>
<div [ngClass]="{ 'active': isActive, 'error': hasError }"
     [ngStyle]="{ 'color': statusColor, 'opacity': isDimmed ? 0.5 : 1 }">
  Content
</div>`,
    reactSnippet: `import clsx from 'clsx';

<img
  src={user.avatarUrl}
  width={80}
  height={80}
  fetchPriority="high"
  loading="eager"
  alt="User Avatar"
/>
<div
  className={clsx({ active: isActive, error: hasError })}
  style={{ color: statusColor, opacity: isDimmed ? 0.5 : 1 }}
>
  Content
</div>`,
    solidNotes: [
      {
        principle: 'ISP',
        title: 'Interface Segregation',
        description: 'Style and class definitions accept clean typed objects containing only the relevant visual properties.',
      },
    ],
    keyDifferences: [
      'Angular NgOptimizedImage automatically enforces aspect ratio and preconnects image domains.',
      'React uses standard HTML5 attributes (fetchPriority, loading="lazy") or specialized image components.',
    ],
    tags: ['NgClass', 'NgStyle', 'NgOptimizedImage', 'clsx', 'className'],
  },

  // Section 6: Custom directives
  {
    id: 'sec6-custom-directives',
    sectionNumber: 6,
    sectionTitle: 'Custom directives',
    group: 'templates',
    name: 'Custom Directives vs Custom Hooks',
    angularConcept:
      'Angular custom directives manipulate host elements via ElementRef/Renderer2 or compose behaviors via hostDirectives.',
    reactConcept:
      'React encapsulates reusable DOM interactions and event listeners into custom composable hooks returning refs and prop getters.',
    angularSnippet: `@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input('appTooltip') text = '';
  private el = inject(ElementRef);
  
  @HostListener('mouseenter')
  onEnter() {
    this.showTooltip();
  }
}`,
    reactSnippet: `export function useTooltip(text: string) {
  const [visible, setVisible] = useState(false);
  
  const triggerProps = {
    onMouseEnter: () => setVisible(true),
    onMouseLeave: () => setVisible(false),
    'aria-label': text
  };
  
  return { visible, triggerProps };
}`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility',
        description: 'Interaction logic is packaged into a reusable hook decoupled from component layout.',
      },
    ],
    keyDifferences: [
      'Angular directives attach directly to template HTML tags via attribute selectors.',
      'React custom hooks return spreadable props or event handlers bound directly in JSX.',
    ],
    tags: ['Directives', 'HostListener', 'Custom Hooks', 'Prop Getters'],
  },

  // Section 7: Components and component APIs
  {
    id: 'sec7-component-apis',
    sectionNumber: 7,
    sectionTitle: 'Components and component APIs',
    group: 'core',
    name: 'Signal Inputs, Outputs, Model Signals vs React Props',
    angularConcept:
      'Angular component APIs use input(), input.required(), output(), and model() signals for reactive two-way data contracts.',
    reactConcept:
      'React components accept typed props interfaces and invoke callback function props to trigger state changes up the hierarchy.',
    angularSnippet: `@Component({ ... })
export class CounterComponent {
  label = input.required<string>();
  step = input(1);
  count = model<number>(0); // Two-way binding signal

  increment() {
    this.count.update(c => c + this.step());
  }
}`,
    reactSnippet: `interface CounterProps {
  label: string;
  step?: number;
  count: number;
  onCountChange: (next: number) => void;
}

export function Counter({ label, step = 1, count, onCountChange }: CounterProps) {
  return (
    <div>
      <p>{label}: {count}</p>
      <button onClick={() => onCountChange(count + step)}>+{step}</button>
    </div>
  );
}`,
    solidNotes: [
      {
        principle: 'ISP',
        title: 'Interface Segregation',
        description: 'Props interfaces define the exact minimum public contract required by the component.',
      },
    ],
    keyDifferences: [
      'Angular model() signal provides bidirectional synchronization automatically with [(count)]="val".',
      'React enforces explicit unidirectional props flow: value prop + onChange handler prop.',
    ],
    tags: ['input()', 'output()', 'model()', 'Props', 'Component APIs'],
  },

  // Section 8: Signals and reactive primitives
  {
    id: 'sec8-signals-reactivity',
    sectionNumber: 8,
    sectionTitle: 'Signals and reactive primitives',
    group: 'reactivity',
    name: 'Signals (signal, computed, effect) vs useState & useMemo',
    angularConcept:
      'Angular Signals offer fine-grained reactivity: signal() for mutable state, computed() for derived values, and effect() for side effects.',
    reactConcept:
      'React uses useState for local state, useMemo for cached computations, and useEffect for lifecycle side effects.',
    angularSnippet: `const count = signal(0);
const double = computed(() => count() * 2);

effect(() => {
  console.log('Count changed:', count());
});

count.update(n => n + 1);`,
    reactSnippet: `const [count, setCount] = useState(0);
const double = useMemo(() => count * 2, [count]);

useEffect(() => {
  console.log('Count changed:', count);
}, [count]);

setCount(prev => prev + 1);`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility',
        description: 'Derived state calculation is isolated in pure compute functions without mutation side effects.',
      },
    ],
    keyDifferences: [
      'Angular signals track dependencies automatically at runtime when reading the signal function count().',
      'React useMemo and useEffect require explicit dependency arrays (or React 19 automatic compiler memoization).',
      'Angular Signals do not re-execute the entire component function on update; they update specific DOM bindings directly.',
    ],
    tags: ['signal()', 'computed()', 'effect()', 'linkedSignal()', 'useState', 'useMemo', 'useEffect'],
  },

  // Section 9: Lifecycle and rendering hooks
  {
    id: 'sec9-lifecycle-hooks',
    sectionNumber: 9,
    sectionTitle: 'Lifecycle and rendering hooks',
    group: 'reactivity',
    name: 'Lifecycle & Rendering Hooks',
    angularConcept:
      'Angular components implement lifecycle interfaces (ngOnInit, ngOnDestroy, ngOnChanges) and render hooks like afterNextRender() and DestroyRef.',
    reactConcept:
      'React uses useEffect with dependency arrays and return cleanup functions for lifecycle events, useLayoutEffect for DOM measurements, and useInsertionEffect for CSS.',
    angularSnippet: `@Component({ ... })
export class TimerComponent implements OnInit, OnDestroy {
  private destroyRef = inject(DestroyRef);
  private intervalId!: number;

  ngOnInit() {
    this.intervalId = window.setInterval(() => console.log('Tick'), 1000);
    
    this.destroyRef.onDestroy(() => {
      clearInterval(this.intervalId);
    });
  }
  
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}`,
    reactSnippet: `export function Timer() {
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      console.log('Tick');
    }, 1000);

    // Cleanup function executed on unmount or before rerun
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty array = mount / unmount

  return <div>Timer active</div>;
}`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility',
        description: 'Resource allocation and cleanup are paired in a single cohesive unit.',
      },
    ],
    keyDifferences: [
      'Angular separates mount, update, and destroy into separate class methods.',
      'React couples setup and teardown together inside the return callback of useEffect, preventing resource leak bugs.',
    ],
    tags: ['ngOnInit', 'ngOnDestroy', 'DestroyRef', 'afterNextRender', 'useEffect', 'useLayoutEffect'],
  },

  // Section 10: Dependency injection
  {
    id: 'sec10-dependency-injection',
    sectionNumber: 10,
    sectionTitle: 'Dependency injection',
    group: 'core',
    name: 'Hierarchical Dependency Injection vs React Context & Hooks',
    angularConcept:
      'Angular provides an IoC container with hierarchical injectors (root, environment, component, directive) resolved via inject() or constructor injection.',
    reactConcept:
      'React uses the Context API (createContext, useContext) and composable custom hooks for tree-based dependency propagation without global singletons.',
    angularSnippet: `// Injection Token & Service
export const API_URL = new InjectionToken<string>('API_URL');

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = inject(API_URL);
  private http = inject(HttpClient);
  
  getUsers() {
    return this.http.get<User[]>(this.apiUrl);
  }
}`,
    reactSnippet: `// Context & Hook Provider
interface UserContextType {
  users: User[];
  refresh: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function useUsers() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUsers must be used within UserProvider');
  return context;
}

export function UserProvider({ children, apiUrl }: { children: React.ReactNode; apiUrl: string }) {
  // Implementation
  return <UserContext.Provider value={{ users, refresh }}>{children}</UserContext.Provider>;
}`,
    solidNotes: [
      {
        principle: 'DIP',
        title: 'Dependency Inversion Principle',
        description: 'Components depend on the abstract Context interface (UserContextType) or inject token, not on the network layer implementation.',
      },
    ],
    keyDifferences: [
      'Angular DI is class and token based with multiple provider levels (root, module, component, element).',
      'React Context is component tree-based; values flow strictly down through Provider elements.',
    ],
    tags: ['Dependency Injection', 'inject()', 'InjectionToken', 'Context API', 'createContext', 'useContext'],
  },

  // Section 11: Queries and DOM access
  {
    id: 'sec11-dom-queries',
    sectionNumber: 11,
    sectionTitle: 'Queries and DOM access',
    group: 'reactivity',
    name: 'Queries & Direct DOM Access',
    angularConcept:
      'Angular queries child elements via viewChild(), viewChildren(), contentChild(), ElementRef, and manipulates safely via Renderer2.',
    reactConcept:
      'React references DOM nodes directly with useRef(), handles element collections with callback refs or ref maps, and avoids manual DOM mutations.',
    angularSnippet: `@Component({ ... })
export class SearchBoxComponent {
  inputElement = viewChild.required<ElementRef<HTMLInputElement>>('searchInput');

  focusInput() {
    this.inputElement().nativeElement.focus();
  }
}`,
    reactSnippet: `export function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <input ref={inputRef} placeholder="Search..." />
      <button onClick={focusInput}>Focus</button>
    </div>
  );
}`,
    solidNotes: [
      {
        principle: 'ISP',
        title: 'Interface Segregation',
        description: 'useRef provides a direct, typed reference to the specific HTML element.',
      },
    ],
    keyDifferences: [
      'Angular viewChild() returns a signal that reacts to dynamic template changes.',
      'React useRef returns a mutable object { current: T } that persists across renders without triggering re-renders.',
    ],
    tags: ['viewChild', 'ElementRef', 'Renderer2', 'useRef', 'callback ref'],
  },

  // Section 12: Change detection and zones
  {
    id: 'sec12-change-detection',
    sectionNumber: 12,
    sectionTitle: 'Change detection and zones',
    group: 'reactivity',
    name: 'Change Detection, OnPush & Zoneless vs React Virtual DOM',
    angularConcept:
      'Angular historically used Zone.js to monkey-patch async APIs; modern Angular supports OnPush and full Zoneless change detection powered by Signals.',
    reactConcept:
      'React uses a declarative rendering engine that computes Virtual DOM diffs (reconciliation) triggered by explicit setState calls or props changes.',
    angularSnippet: `@Component({
  selector: 'app-user-row',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`<div>{{ user().name }}</div>\`
})
export class UserRowComponent {
  user = input.required<User>();
}`,
    reactSnippet: `// Pure React Component (Memoized)
export const UserRow = React.memo(function UserRow({ user }: { user: User }) {
  return <div>{user.name}</div>;
});`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility',
        description: 'Components are pure rendering functions; change evaluation is handled by the framework runtime.',
      },
    ],
    keyDifferences: [
      'Angular OnPush checks components only when @Input changes, events fire, or signals update.',
      'React re-renders children when parents render unless memoized with React.memo() or compiled by React 19 compiler.',
    ],
    tags: ['OnPush', 'Zone.js', 'Zoneless', 'Virtual DOM', 'React.memo', 'Reconciliation'],
  },

  // Section 13: Built-in pipes
  {
    id: 'sec13-pipes-transforms',
    sectionNumber: 13,
    sectionTitle: 'Built-in pipes',
    group: 'templates',
    name: 'Built-in Pipes & Formatting vs Utility Functions',
    angularConcept:
      'Angular uses pure and impure Pipes (DatePipe, CurrencyPipe, DecimalPipe, JsonPipe, AsyncPipe) in template expressions using the pipe operator (|).',
    reactConcept:
      'React uses standard TypeScript utility functions, Intl API (Intl.NumberFormat, Intl.DateTimeFormat), and custom formatting hooks directly in JSX.',
    angularSnippet: `<p>Date: {{ item.createdAt | date:'mediumDate' }}</p>
<p>Price: {{ item.price | currency:'USD':'symbol':'1.2-2' }}</p>
<p>JSON: <pre>{{ item | json }}</pre></p>
<p>Async: {{ user$ | async }}</p>`,
    reactSnippet: `{/* Standard JavaScript / Intl in JSX */}
<p>Date: {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(item.createdAt))}</p>
<p>Price: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}</p>
<p>JSON: <pre>{JSON.stringify(item, null, 2)}</pre></p>
<p>Async: {user?.name}</p>`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility',
        description: 'Formatting logic is encapsulated in reusable pure functions that do not depend on the rendering tree.',
      },
    ],
    keyDifferences: [
      'Angular Pipes require @Pipe decorator and registration in component imports.',
      'React uses standard JavaScript functions and built-in Web APIs (Intl) without framework-specific pipe engines.',
    ],
    tags: ['Pipes', 'DatePipe', 'CurrencyPipe', 'AsyncPipe', 'Intl', 'Formatting'],
  },

  // Section 14: Forms
  {
    id: 'sec14-forms-reactive',
    sectionNumber: 14,
    sectionTitle: 'Forms',
    group: 'forms-routing',
    name: 'Reactive Forms (FormGroup, FormArray) vs React Hook Form',
    angularConcept:
      'Angular ReactiveFormsModule provides typed FormGroup, FormControl, FormArray, built-in Validators, and ControlValueAccessor for complex forms.',
    reactConcept:
      'React uses controlled components with typed state hooks, custom form reducers, or ecosystem libraries like React Hook Form / Zod for schema validation.',
    angularSnippet: `export class ProfileFormComponent {
  fb = inject(FormBuilder);
  
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    emails: this.fb.array([this.fb.control('', [Validators.required, Validators.email])])
  });

  addEmail() {
    this.form.controls.emails.push(this.fb.control('', [Validators.required, Validators.email]));
  }
}`,
    reactSnippet: `export function ProfileForm() {
  const [username, setUsername] = useState('');
  const [emails, setEmails] = useState<string[]>(['']);

  const handleAddEmail = () => setEmails(prev => [...prev, '']);
  const handleEmailChange = (index: number, val: string) => {
    setEmails(prev => prev.map((e, i) => i === index ? val : e));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={e => setUsername(e.target.value)} />
      {emails.map((email, idx) => (
        <input key={idx} value={email} onChange={e => handleEmailChange(idx, e.target.value)} />
      ))}
      <button type="button" onClick={handleAddEmail}>Add Email</button>
    </form>
  );
}`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility Principle',
        description: 'Separates form validation rules, form state storage, and input UI components.',
      },
      {
        principle: 'OCP',
        title: 'Open/Closed Principle',
        description: 'New validator functions can be attached without altering the form engine.',
      },
    ],
    keyDifferences: [
      'Angular Reactive Forms manage an internal mutable tree of AbstractControl models.',
      'React enforces immutable updates on form state or utilizes unbuffered refs with React Hook Form.',
    ],
    tags: ['FormGroup', 'FormArray', 'FormControl', 'Validators', 'Controlled Components', 'Forms'],
  },

  // Section 15: Routing
  {
    id: 'sec15-routing-guards',
    sectionNumber: 15,
    sectionTitle: 'Routing',
    group: 'forms-routing',
    name: 'Routing, Functional Guards & Lazy Loading',
    angularConcept:
      'Angular provideRouter supports loadComponent for lazy routes, functional guards (CanActivateFn), resolvers, and route data inputs.',
    reactConcept:
      'React Router uses createBrowserRouter with lazy route components, loader functions, layout routes, and wrapper components for route guards.',
    angularSnippet: `// app.routes.ts
export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin.component').then(m => m.AdminComponent),
    canActivate: [(route, state) => inject(AuthService).isAdmin()],
    resolve: { stats: () => inject(StatsService).getStats() }
  }
];`,
    reactSnippet: `// AppRouter.tsx
const router = createBrowserRouter([
  {
    path: 'admin',
    lazy: async () => {
      const { AdminView } = await import('./AdminView');
      return { Component: AdminView };
    },
    loader: async () => fetchAdminStats(),
    element: (
      <AdminGuard>
        <AdminView />
      </AdminGuard>
    )
  }
]);`,
    solidNotes: [
      {
        principle: 'OCP',
        title: 'Open/Closed Principle',
        description: 'New routes and sub-branches can be appended to the route definition without modifying core layout architecture.',
      },
      {
        principle: 'DIP',
        title: 'Dependency Inversion',
        description: 'Guards rely on abstract authentication interfaces to permit or redirect navigation.',
      },
    ],
    keyDifferences: [
      'Angular guards return booleans, UrlTrees, or Promises/Observables configured in route array.',
      'React Router utilizes composition with higher-order guard wrappers (<ProtectedRoute>) or loader redirect responses.',
    ],
    tags: ['provideRouter', 'CanActivateFn', 'loadComponent', 'React Router', 'createBrowserRouter', 'Guards'],
  },

  // Section 16: HTTP client
  {
    id: 'sec16-http-client',
    sectionNumber: 16,
    sectionTitle: 'HTTP client',
    group: 'network-async',
    name: 'HTTP Client, Functional Interceptors & Cancellation',
    angularConcept:
      'Angular HttpClient uses RxJS observables, functional interceptors (HttpInterceptorFn), transfer cache, and request cancellation via unsubscribe.',
    reactConcept:
      'React applications use Fetch API or Axios with AbortController for cancellation, custom interceptor middleware, and React Query / SWR for caching.',
    angularSnippet: `// Functional Interceptor
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();
  const authReq = token 
    ? req.clone({ setHeaders: { Authorization: \`Bearer \${token}\` } }) 
    : req;
  return next(authReq);
};

// Service Call
export class UserService {
  private http = inject(HttpClient);
  fetchUsers() {
    return this.http.get<User[]>('/api/users');
  }
}`,
    reactSnippet: `// React Fetch Hook with Interceptor & AbortController
export function useFetchUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const controller = new AbortController();
    
    fetch('/api/users', {
      signal: controller.signal,
      headers: token ? { Authorization: \`Bearer \${token}\` } : {}
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => {
        if (err.name !== 'AbortError') console.error(err);
      });

    return () => controller.abort(); // Automatic cancellation
  }, [token]);

  return users;
}`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility Principle',
        description: 'Authentication header injection is isolated in the interceptor middleware without polluting consumer service calls.',
      },
      {
        principle: 'OCP',
        title: 'Open/Closed Principle',
        description: 'Interceptor pipelines can append logging, retry, caching, and auth tokens without modifying fetch consumers.',
      },
    ],
    keyDifferences: [
      'Angular HttpClient returns RxJS Observables that automatically cancel when unsubscribed.',
      'React Fetch uses Web Standard Promises and explicit AbortController instances inside useEffect cleanup.',
    ],
    tags: ['HttpClient', 'provideHttpClient', 'HttpInterceptorFn', 'AbortController', 'Fetch API', 'Interceptors'],
  },

  // Section 17: RxJS interoperability
  {
    id: 'sec17-rxjs-interop',
    sectionNumber: 17,
    sectionTitle: 'RxJS interoperability',
    group: 'network-async',
    name: 'RxJS Interoperability (toSignal, toObservable, takeUntilDestroyed)',
    angularConcept:
      'Angular provides @angular/core/rxjs-interop with toSignal(), toObservable(), takeUntilDestroyed(), and rxResource() to bridge Signals and Observables.',
    reactConcept:
      'React uses useSyncExternalStore or custom subscription hooks (useObservable) to bind RxJS Observable streams safely into React state.',
    angularSnippet: `export class SearchComponent {
  private searchService = inject(SearchService);
  searchTerm = signal('');
  
  // Convert signal to observable, debounce, switchMap, and back to signal
  results = toSignal(
    toObservable(this.searchTerm).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.searchService.search(term))
    ),
    { initialValue: [] }
  );
}`,
    reactSnippet: `export function useObservable<T>(observable$: Observable<T>, initialValue: T): T {
  return useSyncExternalStore(
    (callback) => {
      const sub = observable$.subscribe(callback);
      return () => sub.unsubscribe();
    },
    () => initialValue
  );
}

// Debounced Search Hook
export function useDebouncedSearch(query: string, delay = 300) {
  const [debounced, setDebounced] = useState(query);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query), delay);
    return () => clearTimeout(timer);
  }, [query, delay]);
  return debounced;
}`,
    solidNotes: [
      {
        principle: 'DIP',
        title: 'Dependency Inversion',
        description: 'UI components bind to the abstract observable stream interface without knowing how data is generated.',
      },
    ],
    keyDifferences: [
      'Angular has native first-party interop primitives (toSignal, toObservable).',
      'React integrates external streams via useSyncExternalStore to prevent tearing during concurrent rendering.',
    ],
    tags: ['toSignal', 'toObservable', 'takeUntilDestroyed', 'RxJS', 'useSyncExternalStore'],
  },

  // Section 18: Server-side rendering and hydration
  {
    id: 'sec18-ssr-hydration',
    sectionNumber: 18,
    sectionTitle: 'Server-side rendering and hydration',
    group: 'performance-tooling',
    name: 'Server-Side Rendering (SSR) & Event Replay Hydration',
    angularConcept:
      '@angular/ssr provides non-destructive hydration, event replay, route-specific render modes (SSR, SSG, CSR), and isPlatformBrowser guards.',
    reactConcept:
      'React 19 supports streaming SSR with renderToReadableStream, React Server Components (RSC), selective hydration with Suspense, and Next.js / Remix.',
    angularSnippet: `// app.config.server.ts
export const config: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideClientHydration(withEventReplay())
  ]
};

// Platform check
if (isPlatformBrowser(this.platformId)) {
  localStorage.getItem('theme');
}`,
    reactSnippet: `// Server-safe environment check
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
}

// Streaming Suspense on Server
<Suspense fallback={<Skeleton />}>
  <ServerDataList />
</Suspense>`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility',
        description: 'Separates server-side HTML prerendering from interactive client-side hydration.',
      },
    ],
    keyDifferences: [
      'Angular event replay buffers user interactions prior to full client hydration and replays them accurately.',
      'React 19 Server Components render on the server with zero client bundle overhead.',
    ],
    tags: ['SSR', 'Hydration', 'Event Replay', 'isPlatformBrowser', 'React Server Components'],
  },

  // Section 19: Internationalization and localization
  {
    id: 'sec19-i18n-localization',
    sectionNumber: 19,
    sectionTitle: 'Internationalization and localization',
    group: 'ecosystem',
    name: 'Internationalization (i18n / $localize vs react-i18next)',
    angularConcept:
      'Angular uses compile-time i18n attributes with XLIFF translation catalogs and $localize tagged templates for runtime translation.',
    reactConcept:
      'React uses runtime i18n libraries like react-i18next or formatjs (react-intl) with dynamic JSON resource bundles and useTranslation() hook.',
    angularSnippet: `<!-- Angular i18n template attribute & ICU plural expression -->
<h1 i18n="User greeting|Greeting on header@@userGreeting">Welcome back!</h1>
<span i18n="@@itemCount">
  {items.length, plural, =0 {No items} =1 {One item} other {{{items.length}} items}}
</span>

// TypeScript runtime translation:
const msg = $localize\`:@@submitBtn:Submit Form\`;`,
    reactSnippet: `// React react-i18next translation hook
import { useTranslation } from 'react-i18next';

export function Header({ itemCount }: { itemCount: number }) {
  const { t } = useTranslation();

  return (
    <header>
      <h1>{t('userGreeting', 'Welcome back!')}</h1>
      <span>{t('itemCount', { count: itemCount })}</span>
    </header>
  );
}`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility',
        description: 'Translation dictionaries are separated from presentation component markup.',
      },
    ],
    keyDifferences: [
      'Angular compile-time i18n produces distinct build artifacts per locale.',
      'React i18next performs dynamic runtime bundle loading without rebuilding the application.',
    ],
    tags: ['i18n', 'Localization', 'react-i18next', '$localize', 'ICU MessageFormat'],
  },

  // Section 20: Images, styles, animations, and UI
  {
    id: 'sec20-styles-animations',
    sectionNumber: 20,
    sectionTitle: 'Images, styles, animations, and UI',
    group: 'ecosystem',
    name: 'Component Animations & Styles (@angular/animations vs Framer Motion)',
    angularConcept:
      'Angular uses DSL-based @angular/animations (trigger, state, style, transition, animate) declared in component metadata.',
    reactConcept:
      'React leverages Framer Motion (motion.div, AnimatePresence) or CSS Modules / Tailwind CSS for declarative spring physics and exit animations.',
    angularSnippet: `@Component({
  selector: 'app-fade-box',
  standalone: true,
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ],
  template: \`<div *ngIf="show()" @fadeSlide class="box">Animated content</div>\`
})
export class FadeBoxComponent { show = signal(true); }`,
    reactSnippet: `import { motion, AnimatePresence } from 'framer-motion';

export function FadeBox({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="box"
        >
          Animated content
        </motion.div>
      )}
    </AnimatePresence>
  );
}`,
    solidNotes: [
      {
        principle: 'OCP',
        title: 'Open/Closed Principle',
        description: 'Animation spring configurations can be tuned without modifying DOM node structures.',
      },
    ],
    keyDifferences: [
      'Angular animations use string DSL syntax inside @Component decorators.',
      'Framer Motion uses declarative JSX motion components with physics-based transitions.',
    ],
    tags: ['Animations', 'Framer Motion', '@angular/animations', 'CSS Modules'],
  },

  // Section 21: Security
  {
    id: 'sec21-security',
    sectionNumber: 21,
    sectionTitle: 'Security',
    group: 'ecosystem',
    name: 'Security, DomSanitizer & XSS Defense',
    angularConcept:
      'Angular automatically sanitizes HTML/URL bindings and requires explicit bypass via DomSanitizer (bypassSecurityTrustHtml, bypassSecurityTrustUrl).',
    reactConcept:
      'React escapes all JSX string values by default and requires explicit dangerouslySetInnerHTML={{ __html: trustedHtml }} with DOMPurify.',
    angularSnippet: `export class SafeContentComponent {
  private sanitizer = inject(DomSanitizer);
  rawHtml = '<p>Safe <strong>content</strong></p>';
  
  get trustedHtml() {
    return this.sanitizer.bypassSecurityTrustHtml(this.rawHtml);
  }
}

// Template:
// <div [innerHTML]="trustedHtml"></div>`,
    reactSnippet: `import DOMPurify from 'dompurify';

export function SafeContent({ rawHtml }: { rawHtml: string }) {
  const cleanHtml = DOMPurify.sanitize(rawHtml);
  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
}`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility Principle',
        description: 'Input sanitization is strictly isolated from rendering execution.',
      },
    ],
    keyDifferences: [
      'Angular has built-in DomSanitizer service in @angular/platform-browser.',
      'React deliberately uses the verbose name dangerouslySetInnerHTML and expects developers to use industry standards like DOMPurify.',
    ],
    tags: ['Security', 'DomSanitizer', 'XSS', 'dangerouslySetInnerHTML', 'DOMPurify'],
  },

  // Section 22: Accessibility
  {
    id: 'sec22-accessibility',
    sectionNumber: 22,
    sectionTitle: 'Accessibility',
    group: 'ecosystem',
    name: 'Accessibility (ARIA, FocusTrap, LiveAnnouncer)',
    angularConcept:
      'Angular CDK provides FocusMonitor, FocusTrap, LiveAnnouncer, and HighContrastMode detection alongside standard ARIA bindings.',
    reactConcept:
      'React uses standard ARIA attributes (camelCase aria-*), focus-trap-react, Radix UI accessibility primitives, and aria-live status regions.',
    angularSnippet: `export class AccessibleModalComponent implements AfterViewInit {
  private focusTrap = inject(FocusTrapFactory);
  private liveAnnouncer = inject(LiveAnnouncer);
  elementRef = inject(ElementRef);

  ngAfterViewInit() {
    const trap = this.focusTrap.create(this.elementRef.nativeElement);
    trap.focusInitialElement();
    this.liveAnnouncer.announce('Modal opened', 'assertive');
  }
}`,
    reactSnippet: `import FocusTrap from 'focus-trap-react';

export function AccessibleModal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <FocusTrap active={isOpen}>
      <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div role="status" aria-live="assertive" className="sr-only">
          Modal opened
        </div>
        <h2 id="modal-title">Accessible Dialog</h2>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </FocusTrap>
  );
}`,
    solidNotes: [
      {
        principle: 'ISP',
        title: 'Interface Segregation',
        description: 'Accessibility concerns (focus trapping, live announcements) are modular primitives applied only where needed.',
      },
    ],
    keyDifferences: [
      'Angular CDK provides a rich suite of a11y services (FocusMonitor, LiveAnnouncer).',
      'React relies on declarative JSX role/aria-* attributes and focused headless component libraries (Radix / Floating UI).',
    ],
    tags: ['Accessibility', 'ARIA', 'FocusTrap', 'LiveAnnouncer', 'CDK a11y'],
  },

  // Section 23: Testing
  {
    id: 'sec23-testing',
    sectionNumber: 23,
    sectionTitle: 'Testing',
    group: 'performance-tooling',
    name: 'Testing (TestBed & ComponentFixture vs React Testing Library)',
    angularConcept:
      'Angular uses TestBed to configure DI modules, create ComponentFixture, execute fakeAsync/tick, and inspect fixture.debugElement.',
    reactConcept:
      'React uses Vitest / Jest with React Testing Library (render, screen, userEvent, waitFor), testing user behavior from the DOM perspective.',
    angularSnippet: `describe('CounterComponent', () => {
  let fixture: ComponentFixture<CounterComponent>;
  let component: CounterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should increment count', () => {
    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
    fixture.detectChanges();
    expect(component.count()).toBe(1);
  });
});`,
    reactSnippet: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

describe('Counter Component', () => {
  it('should increment count when clicked', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    const button = screen.getByRole('button', { name: /increment/i });
    await user.click(button);

    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  });
});`,
    solidNotes: [
      {
        principle: 'LSP',
        title: 'Liskov Substitution Principle',
        description: 'Tests interact with the component via public user interfaces without coupling to private implementation state.',
      },
    ],
    keyDifferences: [
      'Angular TestBed emulates DI compilation and requires manual fixture.detectChanges() calls.',
      'React Testing Library tests pure DOM output and real user interactions without mocking internal component state.',
    ],
    tags: ['TestBed', 'ComponentFixture', 'Vitest', 'React Testing Library', 'userEvent'],
  },

  // Section 24: Tooling and CLI
  {
    id: 'sec24-tooling-cli',
    sectionNumber: 24,
    sectionTitle: 'Angular CLI and workspace',
    group: 'performance-tooling',
    name: 'Workspace Tooling (Angular CLI vs Vite / Rolldown)',
    angularConcept:
      'Angular CLI uses angular.json configuration, architectural schematics (ng generate), target builders, and environment file replacements.',
    reactConcept:
      'React uses Vite (vite.config.ts) powered by Rolldown/ESBuild for instant HMR, environment variables with import.meta.env, and lightweight plugins.',
    angularSnippet: `// angular.json build configuration
{
  "configurations": {
    "production": {
      "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.prod.ts"
        }
      ],
      "budgets": [{ "type": "initial", "maximumError": "1mb" }]
    }
  }
}`,
    reactSnippet: `// vite.config.ts configuration
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify('1.0.0'),
  },
  server: { port: 3000, open: true },
});`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility',
        description: 'Build bundler configuration is decoupled from application runtime source code.',
      },
    ],
    keyDifferences: [
      'Angular CLI is an all-in-one framework CLI with built-in code generators.',
      'Vite is a fast, agnostic bundler focusing on rapid developer feedback with hot module replacement.',
    ],
    tags: ['Angular CLI', 'Vite', 'vite.config.ts', 'HMR', 'Bundling'],
  },

  // Section 25: Monorepos and build systems
  {
    id: 'sec25-monorepos-build',
    sectionNumber: 25,
    sectionTitle: 'Compilation and build system',
    group: 'performance-tooling',
    name: 'Monorepo Architecture (Nx vs Turborepo)',
    angularConcept:
      'Angular enterprise monorepos commonly utilize Nx with project graph computation, computation caching, and module boundary lint rules.',
    reactConcept:
      'React monorepos use Turborepo or Nx with npm/pnpm workspaces for fast pipeline orchestration and remote caching across packages.',
    angularSnippet: `// nx.json monorepo configuration
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "cache": true
    },
    "test": {
      "cache": true
    }
  }
}`,
    reactSnippet: `// turbo.json monorepo configuration
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "lint": {},
    "dev": { "cache": false, "persistent": true }
  }
}`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility',
        description: 'Individual apps and shared UI package libraries maintain dedicated dependency scopes.',
      },
    ],
    keyDifferences: [
      'Nx provides rich Angular-aware code generators and AST migrations.',
      'Turborepo provides minimal, high-speed task orchestration across any JavaScript workspace.',
    ],
    tags: ['Monorepos', 'Nx', 'Turborepo', 'pnpm workspaces', 'Build Caching'],
  },

  // Section 26: Micro-frontends and Module Federation
  {
    id: 'sec26-microfrontends',
    sectionNumber: 26,
    sectionTitle: 'Micro-frontends and Module Federation',
    group: 'performance-tooling',
    name: 'Micro-Frontends & Dynamic Remote Loading',
    angularConcept:
      'Angular Native Federation / Module Federation loads remote ES modules at runtime with shared dependency singletons.',
    reactConcept:
      'React uses Webpack / Vite Module Federation or dynamic script loaders with React.lazy and Suspense fallbacks.',
    angularSnippet: `// Angular Native Federation route loading
export const routes: Routes = [
  {
    path: 'checkout',
    loadChildren: () =>
      loadRemoteModule('checkoutRemote', './Routes').then(m => m.CHECKOUT_ROUTES)
  }
];`,
    reactSnippet: `// React Module Federation Dynamic Remote
const RemoteCheckout = lazy(() => import('checkoutRemote/CheckoutView'));

export function AppShell() {
  return (
    <Suspense fallback={<div>Loading remote checkout...</div>}>
      <RemoteCheckout />
    </Suspense>
  );
}`,
    solidNotes: [
      {
        principle: 'DIP',
        title: 'Dependency Inversion',
        description: 'Host shell consumes independent remotes via remote entry contract.',
      },
    ],
    keyDifferences: [
      'Angular provides loadRemoteModule wrappers managing Angular injection contexts across boundaries.',
      'React mounts remote components inside standard React trees with shared Context and Suspense.',
    ],
    tags: ['Microfrontends', 'Module Federation', 'Native Federation', 'Code Splitting'],
  },

  // Section 27: Progressive Web Apps and service workers
  {
    id: 'sec27-pwa-service-workers',
    sectionNumber: 27,
    sectionTitle: 'Progressive Web Apps and service workers',
    group: 'ecosystem',
    name: 'Progressive Web Apps (SwUpdate vs Workbox / Vite PWA)',
    angularConcept:
      '@angular/service-worker and SwUpdate provide built-in update notifications, asset caching, and offline data handling.',
    reactConcept:
      'React applications use Vite PWA plugin with Workbox (registerSW) for offline caching and service worker lifecycle management.',
    angularSnippet: `@Injectable({ providedIn: 'root' })
export class PwaUpdateService {
  private swUpdate = inject(SwUpdate);

  checkForUpdates() {
    this.swUpdate.versionUpdates.subscribe(evt => {
      if (evt.type === 'VERSION_READY') {
        if (confirm('New version available. Reload?')) {
          this.swUpdate.activateUpdate().then(() => document.location.reload());
        }
      }
    });
  }
}`,
    reactSnippet: `import { registerSW } from 'virtual:pwa-register';

export function usePwaUpdate() {
  useEffect(() => {
    const updateSW = registerSW({
      onNeedRefresh() {
        if (confirm('New content available. Reload?')) {
          updateSW(true);
        }
      },
    });
  }, []);
}`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility',
        description: 'Service worker cache management is isolated from main UI thread components.',
      },
    ],
    keyDifferences: [
      '@angular/service-worker relies on ngsw-config.json configuration rules.',
      'React Vite PWA utilizes Google Workbox service worker toolchain.',
    ],
    tags: ['PWA', 'Service Workers', 'SwUpdate', 'Workbox', 'Offline'],
  },

  // Section 28: Angular CDK
  {
    id: 'sec28-angular-cdk',
    sectionNumber: 28,
    sectionTitle: 'Angular CDK',
    group: 'ecosystem',
    name: 'Angular CDK Primitives vs Headless React UI Libraries',
    angularConcept:
      'Angular CDK offers un-opinionated behavioral primitives: Overlay, DragDrop, VirtualScrollViewport, Collections SelectionModel, and BreakpointObserver.',
    reactConcept:
      'React uses headless primitives like Radix UI, TanStack Virtual, dnd-kit, and custom media query hooks for accessible UI behaviors.',
    angularSnippet: `<!-- Virtual Scroll -->
<cdk-virtual-scroll-viewport itemSize="50" class="viewport">
  <div *cdkVirtualFor="let item of items" class="item">
    {{ item.name }}
  </div>
</cdk-virtual-scroll-viewport>`,
    reactSnippet: `// TanStack Virtual Scroll in React
import { useVirtualizer } from '@tanstack/react-virtual';

export function VirtualList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  return (
    <div ref={parentRef} className="viewport" style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: \`\${rowVirtualizer.getTotalSize()}px\`, position: 'relative' }}>
        {rowVirtualizer.getVirtualItems().map(virtualRow => (
          <div key={virtualRow.index} style={{ position: 'absolute', top: 0, transform: \`translateY(\${virtualRow.start}px)\` }}>
            {items[virtualRow.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility Principle',
        description: 'Virtualization engine only calculates visible element window offsets, decoupling layout from row rendering.',
      },
    ],
    keyDifferences: [
      'Angular CDK is maintained by the official Angular team with cohesive directives and services.',
      'React has a vibrant specialized ecosystem (TanStack Virtual, Radix UI, Floating UI, dnd-kit).',
    ],
    tags: ['CDK', 'Overlay', 'Virtual Scroll', 'Drag and Drop', 'Radix UI', 'TanStack'],
  },

  // Section 29: Angular Material
  {
    id: 'sec29-angular-material',
    sectionNumber: 29,
    sectionTitle: 'Angular Material',
    group: 'ecosystem',
    name: 'Angular Material vs Material UI (MUI) & Component Libraries',
    angularConcept:
      'Angular Material provides standard Material Design components (MatButton, MatDialog, MatTable, MatFormField) configured via Sass theming.',
    reactConcept:
      'React offers Material UI (MUI), Joy UI, Shadcn/ui (Tailwind + Radix), and Chakra UI with flexible emotion or CSS variable styling.',
    angularSnippet: `<mat-form-field appearance="outline">
  <mat-label>User Email</mat-label>
  <input matInput [formControl]="emailControl" placeholder="user@example.com">
  <mat-error *ngIf="emailControl.invalid">Please enter a valid email</mat-error>
</mat-form-field>`,
    reactSnippet: `import TextField from '@mui/material/TextField';

export function EmailInput({ value, onChange, error }: EmailProps) {
  return (
    <TextField
      variant="outlined"
      label="User Email"
      value={value}
      onChange={e => onChange(e.target.value)}
      error={Boolean(error)}
      helperText={error}
      placeholder="user@example.com"
    />
  );
}`,
    solidNotes: [
      {
        principle: 'OCP',
        title: 'Open/Closed Principle',
        description: 'Design system components can be customized via themes and design tokens without changing component internals.',
      },
    ],
    keyDifferences: [
      'Angular Material uses Angular modules or standalone component imports with MatFormField wrapping inputs.',
      'React MUI provides compound or self-contained customizable components integrated with emotion or modern CSS variables.',
    ],
    tags: ['Angular Material', 'MatButton', 'MatDialog', 'MUI', 'Shadcn', 'Theming'],
  },

  // Section 30: State management (NgRx / NGXS)
  {
    id: 'sec30-state-ngrx-rtk',
    sectionNumber: 30,
    sectionTitle: 'State management (NgRx / NGXS)',
    group: 'reactivity',
    name: 'Redux Pattern (NgRx Actions/Reducers vs Redux Toolkit createSlice)',
    angularConcept:
      'NgRx Store utilizes actions, reducers, selectors (createSelector), and Effects (@Injectable) for predictable CQRS state.',
    reactConcept:
      'Redux Toolkit (RTK) uses createSlice, createAsyncThunk, and typed hooks (useAppDispatch, useAppSelector) with Immer immutable mutations.',
    angularSnippet: `// NgRx Action & Reducer
export const increment = createAction('[Counter] Increment');
export const counterReducer = createReducer(
  0,
  on(increment, state => state + 1)
);

// Selector:
export const selectCount = createFeatureSelector<number>('count');`,
    reactSnippet: `// Redux Toolkit Slice
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    addBy: (state, action: PayloadAction<number>) => { state.value += action.payload; },
  },
});
export const { increment, addBy } = counterSlice.actions;`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility',
        description: 'Action dispatchers, state reducers, and selectors maintain isolated responsibilities.',
      },
    ],
    keyDifferences: [
      'NgRx effects use RxJS operators (switchMap, exhaustMap) for async workflows.',
      'Redux Toolkit uses createAsyncThunk or RTK Query with async/await promises.',
    ],
    tags: ['NgRx', 'Redux Toolkit', 'createSlice', 'State Management'],
  },

  // Section 31: Angular CDK deep primitives
  {
    id: 'sec31-cdk-deep-primitives',
    sectionNumber: 31,
    sectionTitle: 'Angular CDK deep primitives',
    group: 'ecosystem',
    name: 'SelectionModel & BreakpointObserver vs React Hooks',
    angularConcept:
      'Angular CDK SelectionModel manages multi-select state independently of UI; BreakpointObserver tracks responsive screen queries.',
    reactConcept:
      'React manages selection via Set in useState/useReducer and responsive breakpoints with custom matchMedia hooks (useMediaQuery).',
    angularSnippet: `// Angular SelectionModel & BreakpointObserver
export class TableComponent {
  selection = new SelectionModel<User>(true, []);
  private breakpointObserver = inject(BreakpointObserver);

  isMobile = toSignal(
    this.breakpointObserver.observe('(max-width: 768px)').pipe(map(r => r.matches))
  );

  toggleRow(user: User) {
    this.selection.toggle(user);
  }
}`,
    reactSnippet: `// React useMediaQuery & Set-based Selection
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

export function useSelection<T extends { id: string }>() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return { selectedIds, toggle };
}`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility',
        description: 'Selection tracking logic is pure state management independent of table rendering markup.',
      },
    ],
    keyDifferences: [
      'SelectionModel is an imperative class container in Angular CDK.',
      'React uses immutable Set structures inside state hooks.',
    ],
    tags: ['SelectionModel', 'BreakpointObserver', 'useMediaQuery', 'CDK Primitives'],
  },

  // Section 32: Developer tooling
  {
    id: 'sec32-dev-tooling',
    sectionNumber: 32,
    sectionTitle: 'Developer tooling',
    group: 'performance-tooling',
    name: 'DevTools Profiler & Component Tree Inspection',
    angularConcept:
      'Angular DevTools extension profiles change detection cycles, inject token trees, and visualizes component signal graphs.',
    reactConcept:
      'React DevTools extension provides component tree inspection, props/state editing, and a dedicated flamegraph Profiler.',
    angularSnippet: `// Inspecting component signals & change detection in Angular DevTools
@Component({
  selector: 'app-perf-monitor',
  standalone: true,
  template: \`<p>Renders: {{ renderCount }}</p>\`
})
export class PerfMonitorComponent {
  renderCount = 0;
  // Angular DevTools highlights OnPush component ticks
}`,
    reactSnippet: `// React Profiler API for programmatic performance monitoring
import { Profiler, type ProfilerOnRenderCallback } from 'react';

const onRenderCallback: ProfilerOnRenderCallback = (id, phase, actualDuration) => {
  console.log(\`[\${id}] (\${phase}) took \${actualDuration.toFixed(2)}ms\`);
};

export function MonitoredSection() {
  return (
    <Profiler id="UserGrid" onRender={onRenderCallback}>
      <UserGrid />
    </Profiler>
  );
}`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility',
        description: 'Performance telemetry collection runs out-of-band without disturbing UI logic.',
      },
    ],
    keyDifferences: [
      'Angular DevTools tracks zone events, change detection passes, and injector hierarchies.',
      'React DevTools profiles commit durations, render counts, and hook state changes.',
    ],
    tags: ['DevTools', 'Profiler', 'Performance Monitoring', 'Debugging'],
  },

  // Section 33: Library authoring
  {
    id: 'sec33-library-authoring',
    sectionNumber: 33,
    sectionTitle: 'Library authoring',
    group: 'ecosystem',
    name: 'Library Packaging (ng-packagr / APF vs tsup / Rolldown)',
    angularConcept:
      'Angular libraries are built with ng-packagr producing Angular Package Format (APF) with secondary entry points (ng-package.json).',
    reactConcept:
      'React libraries use tsup, rollup, or vite-plugin-dts to produce ESM/CJS bundles with TypeScript .d.ts declaration maps.',
    angularSnippet: `// ng-package.json for Angular Library Authoring
{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "../../dist/my-ui-lib",
  "lib": {
    "entryFile": "src/public-api.ts"
  }
}`,
    reactSnippet: `// tsup.config.ts for React Library Authoring
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom'],
});`,
    solidNotes: [
      {
        principle: 'ISP',
        title: 'Interface Segregation',
        description: 'Public API barrels (public-api.ts / index.ts) expose only intended contracts.',
      },
    ],
    keyDifferences: [
      'ng-packagr compiles Angular metadata for AOT compilation consumption.',
      'tsup/rollup bundles standard JavaScript/TypeScript packages consumable by any bundler.',
    ],
    tags: ['ng-packagr', 'tsup', 'Library Authoring', 'APF', 'Rollup'],
  },

  // Section 34: Legacy and compatibility topics
  {
    id: 'sec34-legacy-migration',
    sectionNumber: 34,
    sectionTitle: 'Legacy and compatibility topics',
    group: 'core',
    name: 'Modernization: NgModule to Standalone vs Class to Functional React',
    angularConcept:
      'Angular modernization migrates @NgModule declarations to standalone components and decorators (@Input) to signals.',
    reactConcept:
      'React modernization transforms legacy React.Component class components with lifecycle methods into functional components with hooks.',
    angularSnippet: `// Modern Standalone Refactoring
// Legacy: @NgModule({ declarations: [LegacyComponent], imports: [...] })
// Modern:
@Component({
  selector: 'app-modern-view',
  standalone: true,
  imports: [CommonModule],
  template: \`<p>{{ title() }}</p>\`
})
export class ModernViewComponent {
  title = input<string>('Default');
}`,
    reactSnippet: `// Modern Functional Hooks Refactoring
// Legacy: class View extends React.Component { componentDidMount() {...} }
// Modern:
export function ModernView({ title = 'Default' }: { title?: string }) {
  useEffect(() => {
    // Replaces componentDidMount & componentWillUnmount
    return () => console.log('Cleanup');
  }, []);

  return <p>{title}</p>;
}`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility',
        description: 'Functional paradigms eliminate verbose class ceremony and boilerplate.',
      },
    ],
    keyDifferences: [
      'Angular provided automated schematics (ng g @angular/core:standalone) for migration.',
      'React functional components replaced class components starting with React 16.8 Hooks.',
    ],
    tags: ['Migration', 'NgModule', 'Standalone', 'Class Components', 'Hooks Refactor'],
  },

  // Section 35: Common external patterns often used with Angular
  {
    id: 'sec35-state-ecosystem',
    sectionNumber: 35,
    sectionTitle: 'Common external patterns often used with Angular',
    group: 'ecosystem',
    name: 'State Management (NgRx SignalStore vs Zustand / Redux Toolkit)',
    angularConcept:
      'Angular ecosystems leverage NgRx SignalStore, NgRx ComponentStore, and NGXS for centralized reactive state management.',
    reactConcept:
      'React leverages Zustand, Redux Toolkit, TanStack Store, and Jotai for lightweight, boilerplate-free global state.',
    angularSnippet: `// NgRx SignalStore
export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState({ todos: [] as Todo[], filter: 'all' }),
  withComputed(({ todos, filter }) => ({
    completedCount: computed(() => todos().filter(t => t.done).length),
    filteredTodos: computed(() => {
      if (filter() === 'done') return todos().filter(t => t.done);
      return todos();
    })
  })),
  withMethods((store) => ({
    addTodo(title: string) {
      patchState(store, { todos: [...store.todos(), { id: Date.now(), title, done: false }] });
    }
  }))
);`,
    reactSnippet: `// Zustand Store in React
import { create } from 'zustand';

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'done';
  addTodo: (title: string) => void;
  setFilter: (filter: 'all' | 'done') => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  filter: 'all',
  addTodo: (title) => set((state) => ({
    todos: [...state.todos, { id: Date.now(), title, done: false }]
  })),
  setFilter: (filter) => set({ filter }),
}));`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility Principle',
        description: 'Store logic encapsulates state transformations; UI components subscribe only to required slices.',
      },
      {
        principle: 'ISP',
        title: 'Interface Segregation',
        description: 'Components selectively subscribe to specific store properties (store.todos vs full state), avoiding redundant re-renders.',
      },
    ],
    keyDifferences: [
      'NgRx SignalStore uses Angular Signals for deeply reactive computed selectors and state patching.',
      'Zustand uses custom selector hooks with shallow equality checks for fine-grained subscription performance in React.',
    ],
    tags: ['NgRx', 'SignalStore', 'Zustand', 'Redux', 'Global State'],
  },
]
