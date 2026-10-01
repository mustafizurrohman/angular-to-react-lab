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
    itemCount: 4,
  },
  {
    number: 2,
    title: 'Template syntax',
    group: 'templates',
    description: 'Interpolation, property/event binding, template variables, and SVG rendering',
    itemCount: 4,
  },
  {
    number: 3,
    title: 'Built-in control flow',
    group: 'performance-tooling',
    description: '@if/@else, @for with required track, @empty, @switch, and @let block variable declaration',
    itemCount: 3,
  },
  {
    number: 4,
    title: 'Deferred loading',
    group: 'performance-tooling',
    description: '@defer, @placeholder, @loading, @error triggers (viewport, interaction, timer, idle)',
    itemCount: 3,
  },
  {
    number: 5,
    title: 'Built-in directives',
    group: 'templates',
    description: 'NgClass, NgStyle, NgOptimizedImage, NgTemplateOutlet, and RouterOutlet',
    itemCount: 3,
  },
  {
    number: 6,
    title: 'Custom directives',
    group: 'templates',
    description: 'Host directives, attribute/structural directives, ViewContainerRef, and hostBindings',
    itemCount: 3,
  },
  {
    number: 7,
    title: 'Components and component APIs',
    group: 'core',
    description: 'input(), output(), model(), content projection, and dynamic createComponent',
    itemCount: 4,
  },
  {
    number: 8,
    title: 'Signals and reactive primitives',
    group: 'reactivity',
    description: 'signal(), computed(), effect(), linkedSignal(), resource(), and RxJS interop',
    itemCount: 4,
  },
  {
    number: 9,
    title: 'Lifecycle and rendering hooks',
    group: 'reactivity',
    description: 'ngOnInit, ngOnDestroy, afterNextRender, afterEveryRender, and DestroyRef',
    itemCount: 3,
  },
  {
    number: 10,
    title: 'Dependency injection',
    group: 'core',
    description: 'inject(), InjectionToken, hierarchical environment and element injectors',
    itemCount: 3,
  },
  {
    number: 11,
    title: 'Queries and DOM access',
    group: 'reactivity',
    description: 'viewChild(), viewChildren(), contentChild(), ElementRef, and Renderer2',
    itemCount: 3,
  },
  {
    number: 12,
    title: 'Change detection and zones',
    group: 'reactivity',
    description: 'ChangeDetectionStrategy.OnPush, Zoneless change detection, and NgZone',
    itemCount: 3,
  },
  {
    number: 13,
    title: 'Built-in pipes',
    group: 'templates',
    description: 'AsyncPipe, DatePipe, CurrencyPipe, JsonPipe, KeyValuePipe, and custom PipeTransform',
    itemCount: 3,
  },
  {
    number: 14,
    title: 'Forms',
    group: 'forms-routing',
    description: 'ReactiveFormsModule (FormGroup, FormArray, FormControl), typed forms, and custom validators',
    itemCount: 4,
  },
  {
    number: 15,
    title: 'Routing',
    group: 'forms-routing',
    description: 'provideRouter, functional guards (CanActivateFn), resolvers, lazy loadComponent',
    itemCount: 4,
  },
  {
    number: 16,
    title: 'HTTP client',
    group: 'network-async',
    description: 'provideHttpClient, functional interceptors, HttpContextToken, typed responses, retry/cancel',
    itemCount: 3,
  },
  {
    number: 17,
    title: 'RxJS interoperability',
    group: 'network-async',
    description: 'toSignal(), toObservable(), takeUntilDestroyed(), BehaviorSubject, debouncing',
    itemCount: 3,
  },
  {
    number: 18,
    title: 'Server-side rendering and hydration',
    group: 'performance-tooling',
    description: 'Angular SSR, client hydration, event replay, isPlatformBrowser/Server',
    itemCount: 3,
  },
  {
    number: 19,
    title: 'Internationalization and localization',
    group: 'ecosystem',
    description: 'i18n template attributes, ICU plural/select expressions, $localize runtime',
    itemCount: 2,
  },
  {
    number: 20,
    title: 'Images, styles, animations, and UI',
    group: 'ecosystem',
    description: 'Component style encapsulation (Emulated/ShadowDOM), NgOptimizedImage, CSS custom properties',
    itemCount: 3,
  },
  {
    number: 21,
    title: 'Security',
    group: 'ecosystem',
    description: 'DomSanitizer, HTML/URL sanitization, bypassSecurityTrustHtml, CSP, and XSS defense',
    itemCount: 3,
  },
  {
    number: 22,
    title: 'Accessibility',
    group: 'ecosystem',
    description: 'ARIA attribute bindings, Angular CDK FocusMonitor, FocusTrap, and LiveAnnouncer',
    itemCount: 3,
  },
  {
    number: 23,
    title: 'Testing',
    group: 'performance-tooling',
    description: 'TestBed, ComponentFixture, fakeAsync/tick, component harnesses vs React Testing Library',
    itemCount: 3,
  },
  {
    number: 24,
    title: 'Angular CLI and workspace',
    group: 'performance-tooling',
    description: 'ng generate, build configurations, file replacements, budgets, schematics vs Vite plugins',
    itemCount: 2,
  },
  {
    number: 25,
    title: 'Compilation and build system',
    group: 'performance-tooling',
    description: 'Ahead-of-Time (AOT) compiler, Ivy runtime, code splitting, dead code elimination',
    itemCount: 2,
  },
  {
    number: 26,
    title: 'Performance and diagnostics',
    group: 'performance-tooling',
    description: 'OnPush, fine-grained Signals, track in @for, lazy routes, memoized computed signals',
    itemCount: 3,
  },
  {
    number: 27,
    title: 'Error handling and stability',
    group: 'core',
    description: 'Global ErrorHandler token, error boundaries, RxJS catchError, HTTP error interceptors',
    itemCount: 3,
  },
  {
    number: 28,
    title: 'Angular CDK',
    group: 'ecosystem',
    description: 'Overlay, Drag and Drop, Virtual Scrolling (CdkVirtualScrollViewport), Clipboard, BreakpointObserver',
    itemCount: 3,
  },
  {
    number: 29,
    title: 'Angular Material',
    group: 'ecosystem',
    description: 'Material design components (MatButton, MatDialog, MatTable, MatFormField) vs Radix / MUI',
    itemCount: 3,
  },
  {
    number: 30,
    title: 'Angular libraries and package ecosystem',
    group: 'ecosystem',
    description: '@angular/core, @angular/common/http, @angular/elements (Web Components), @angular/forms',
    itemCount: 2,
  },
  {
    number: 31,
    title: 'Progressive Web Apps and service workers',
    group: 'ecosystem',
    description: '@angular/pwa, SwUpdate service, asset/data caching vs Workbox & Vite PWA plugin',
    itemCount: 2,
  },
  {
    number: 32,
    title: 'Developer tooling',
    group: 'performance-tooling',
    description: 'Angular Language Service, DevTools profiler, component explorer vs React DevTools',
    itemCount: 2,
  },
  {
    number: 33,
    title: 'Library authoring',
    group: 'ecosystem',
    description: 'Angular Package Format (APF), ng-packagr, public API barrels, tree-shakable packages',
    itemCount: 2,
  },
  {
    number: 34,
    title: 'Legacy and compatibility topics',
    group: 'core',
    description: 'NgModule to Standalone migration, *ngIf/*ngFor to @if/@for, decorator to signal inputs',
    itemCount: 3,
  },
  {
    number: 35,
    title: 'Common external patterns often used with Angular',
    group: 'ecosystem',
    description: 'NgRx Store/SignalStore, NGXS, RxAngular, Tailwind, Jest/Vitest, Storybook, OpenAPI clients',
    itemCount: 3,
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
    angularSnippet: `@Component({\n  selector: 'app-user-profile',\n  standalone: true,\n  imports: [CommonModule, UserAvatarComponent],\n  template: \`<div class="profile">\n    <app-user-avatar [user]="user" />\n    <h2>{{ user.name }}</h2>\n  </div>\`\n})\nexport class UserProfileComponent {\n  @Input({ required: true }) user!: User;\n}\n\n// main.ts\nbootstrapApplication(UserProfileComponent, appConfig);`,
    reactSnippet: `import { UserAvatar } from './UserAvatar';\nimport type { User } from '../types';\n\ninterface UserProfileProps {\n  user: User;\n}\n\nexport function UserProfile({ user }: UserProfileProps) {\n  return (\n    <div className="profile">\n      <UserAvatar user={user} />\n      <h2>{user.name}</h2>\n    </div>\n  );\n}\n\n// main.tsx\ncreateRoot(document.getElementById('root')!).render(<UserProfile user={currentUser} />);`,
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
    angularSnippet: `// Container Component\n@Component({\n  selector: 'app-order-container',\n  standalone: true,\n  imports: [OrderSummaryComponent],\n  template: \`<app-order-summary \n    [items]="orderService.items()"\n    (checkout)="orderService.checkout()"\n  />\`\n})\nexport class OrderContainerComponent {\n  orderService = inject(OrderService);\n}`,
    reactSnippet: `// Presentational Component\nexport function OrderSummary({ items, onCheckout }: OrderSummaryProps) {\n  return (\n    <div>\n      <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>\n      <button onClick={onCheckout}>Checkout</button>\n    </div>\n  );\n}\n\n// Container Component\nexport function OrderContainer() {\n  const { items, checkout } = useOrderService();\n  return <OrderSummary items={items} onCheckout={checkout} />;\n}`,
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
    angularSnippet: `<!-- Angular Template -->\n<button \n  [disabled]="isSubmitting"\n  [class.active]="isSelected"\n  [attr.aria-expanded]="isExpanded"\n  [style.fontSize.px]="fontSize"\n  (click)="handleClick($event)">\n  {{ buttonLabel }}\n</button>`,
    reactSnippet: `{/* React JSX */}\n<button\n  disabled={isSubmitting}\n  className={isSelected ? 'active' : ''}\n  aria-expanded={isExpanded}\n  style={{ fontSize: \`\${fontSize}px\` }}\n  onClick={(e) => handleClick(e)}\n>\n  {buttonLabel}\n</button>`,
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
    angularSnippet: `<!-- Non-rendering container -->\n<ng-container *ngIf="user">\n  <h1>{{ user.name }}</h1>\n  <p>{{ user.email }}</p>\n</ng-container>\n\n<!-- Template definition & outlet -->\n<ng-template #cardTpl let-title="title">\n  <div class="card">{{ title }}</div>\n</ng-template>\n<ng-container *ngTemplateOutlet="cardTpl; context: { title: 'Admin' }"></ng-container>`,
    reactSnippet: `{/* React Fragment grouping */}\n{user && (\n  <>\n    <h1>{user.name}</h1>\n    <p>{user.email}</p>\n  </>\n)}\n\n{/* Reusable template function */}\nconst renderCard = (title: string) => <div className="card">{title}</div>;\n{renderCard('Admin')}`,
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
    angularSnippet: `@if (isLoading) {\n  <app-spinner />\n} @else if (error) {\n  <p class="error">{{ error }}</p>\n} @else {\n  @let total = items.length;\n  <p>Total: {{ total }}</p>\n  \n  @for (item of items; track item.id; let idx = $index; let first = $first) {\n    <div [class.first-row]="first">\n      #{{ idx + 1 }}: {{ item.name }}\n    </div>\n  } @empty {\n    <p>No items found.</p>\n  }\n}`,
    reactSnippet: `{isLoading ? (\n  <Spinner />\n) : error ? (\n  <p className="error">{error}</p>\n) : (\n  (() => {\n    const total = items.length;\n    return (\n      <>\n        <p>Total: {total}</p>\n        {items.length === 0 ? (\n          <p>No items found.</p>\n        ) : (\n          items.map((item, idx) => (\n            <div key={item.id} className={idx === 0 ? 'first-row' : ''}>\n              #{idx + 1}: {item.name}\n            </div>\n          ))\n        )}\n      </>\n    );\n  })()\n)}`,
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
    angularSnippet: `@defer (on viewport; prefetch on idle) {\n  <app-heavy-chart [data]="chartData" />\n} @placeholder (minimum 500ms) {\n  <div class="skeleton">Chart placeholder...</div>\n} @loading (after 100ms; minimum 1s) {\n  <app-spinner />\n} @error {\n  <p>Failed to load chart bundle.</p>\n}`,
    reactSnippet: `// Lazy chunk definition\nconst HeavyChart = lazy(() => import('./HeavyChart'));\n\nexport function Dashboard({ chartData }: Props) {\n  return (\n    <ErrorBoundary fallback={<p>Failed to load chart bundle.</p>}>\n      <Suspense fallback={<div className="skeleton">Loading chart...</div>}>\n        <HeavyChart data={chartData} />\n      </Suspense>\n    </ErrorBoundary>\n  );\n}`,
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
    angularSnippet: `<img \n  [ngSrc]="user.avatarUrl"\n  width="80"\n  height="80"\n  priority\n  alt="User Avatar"\n/>\n<div [ngClass]="{ 'active': isActive, 'error': hasError }"\n     [ngStyle]="{ 'color': statusColor, 'opacity': isDimmed ? 0.5 : 1 }">\n  Content\n</div>`,
    reactSnippet: `import clsx from 'clsx';\n\n<img\n  src={user.avatarUrl}\n  width={80}\n  height={80}\n  fetchPriority="high"\n  loading="eager"\n  alt="User Avatar"\n/>\n<div\n  className={clsx({ active: isActive, error: hasError })}\n  style={{ color: statusColor, opacity: isDimmed ? 0.5 : 1 }}\n>\n  Content\n</div>`,
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
    name: 'Custom Directives vs Custom Hooks / Wrapper Components',
    angularConcept:
      'Angular @Directive classes attach behavior to host elements via HostListener, HostBinding, or hostDirectives composition API.',
    reactConcept:
      'React encapsulates reusable DOM behavior using custom hooks attached via ref callbacks or Higher-Order wrapper components.',
    angularSnippet: `@Directive({\n  selector: '[appAutofocus]',\n  standalone: true\n})\nexport class AutofocusDirective implements OnInit {\n  private el = inject(ElementRef);\n  ngOnInit() {\n    this.el.nativeElement.focus();\n  }\n}\n\n// Usage: <input appAutofocus />`,
    reactSnippet: `// Custom Hook with Ref\nexport function useAutofocus<T extends HTMLElement>() {\n  const ref = useRef<T>(null);\n  useEffect(() => {\n    ref.current?.focus();\n  }, []);\n  return ref;\n}\n\n// Usage:\nfunction SearchInput() {\n  const inputRef = useAutofocus<HTMLInputElement>();\n  return <input ref={inputRef} placeholder="Search..." />;\n}`,
    solidNotes: [
      {
        principle: 'SRP',
        title: 'Single Responsibility',
        description: 'The autofocus behavior is completely isolated from the business logic of the search input.',
      },
      {
        principle: 'OCP',
        title: 'Open/Closed',
        description: 'Any component can adopt autofocus behavior without modifying the component implementation.',
      },
    ],
    keyDifferences: [
      'Angular directives modify the host element imperatively through DI and lifecycle hooks.',
      'React hooks return refs or event handlers that are declaratively spread or assigned to JSX elements.',
    ],
    tags: ['Directives', 'HostDirectives', 'Custom Hooks', 'useRef', 'DOM behavior'],
  },

  // Section 7: Components and component APIs
  {
    id: 'sec7-component-apis',
    sectionNumber: 7,
    sectionTitle: 'Components and component APIs',
    group: 'core',
    name: 'Component APIs (input(), output(), model(), Content Projection)',
    angularConcept:
      'Modern Angular uses input(), input.required(), output(), model() signals, and <ng-content select="..."> for multi-slot content projection.',
    reactConcept:
      'React uses typed prop interfaces, callback props, controlled value/onChange pairs, and children or named JSX slots (props.header, props.footer).',
    angularSnippet: `@Component({\n  selector: 'app-dialog',\n  standalone: true,\n  template: \`<div class="dialog">\n    <header><ng-content select="[dialog-title]" /></header>\n    <main><ng-content /></main>\n    <footer><button (click)="close.emit()">Close</button></footer>\n  </div>\`\n})\nexport class DialogComponent {\n  title = input<string>('Default Title');\n  isOpen = model<boolean>(false); // 2-way signal\n  close = output<void>();\n}`,
    reactSnippet: `interface DialogProps {\n  title?: string;\n  isOpen: boolean;\n  onIsOpenChange?: (open: boolean) => void;\n  onClose: () => void;\n  headerSlot?: React.ReactNode;\n  children: React.ReactNode;\n}\n\nexport function Dialog({\n  title = 'Default Title',\n  isOpen,\n  onClose,\n  headerSlot,\n  children\n}: DialogProps) {\n  if (!isOpen) return null;\n  return (\n    <div className="dialog">\n      <header>{headerSlot ?? <h2>{title}</h2>}</header>\n      <main>{children}</main>\n      <footer><button onClick={onClose}>Close</button></footer>\n    </div>\n  );\n}`,
    solidNotes: [
      {
        principle: 'ISP',
        title: 'Interface Segregation',
        description: 'Dialog accepts explicit, segregated props for slots, title, and event callbacks.',
      },
      {
        principle: 'LSP',
        title: 'Liskov Substitution',
        description: 'Any valid ReactNode can be passed into children or headerSlot interchangeably.',
      },
    ],
    keyDifferences: [
      'Angular uses <ng-content> with CSS selectors for slot distribution.',
      'React uses props.children for default slot and named prop elements (headerSlot, footerSlot) for multi-slot projection.',
    ],
    tags: ['input()', 'output()', 'model()', 'Content Projection', 'Props', 'Slots'],
  },

  // Section 8: Signals and reactive primitives
  {
    id: 'sec8-signals-reactivity',
    sectionNumber: 8,
    sectionTitle: 'Signals and reactive primitives',
    group: 'reactivity',
    name: 'Signals vs React State & Memoization Primitives',
    angularConcept:
      'Angular Signals provide fine-grained reactivity via signal(), computed() with lazy memoization, effect(), and linkedSignal().',
    reactConcept:
      'React uses useState for component state, useMemo for memoized derivations, useEffect for side-effects, and React 19 compiler for auto-memoization.',
    angularSnippet: `export class CounterComponent {\n  count = signal(0);\n  multiplier = signal(2);\n  \n  // Derived memoized signal\n  doubled = computed(() => this.count() * this.multiplier());\n  \n  constructor() {\n    effect(() => {\n      console.log('Count updated:', this.count());\n    });\n  }\n  \n  increment() {\n    this.count.update(c => c + 1);\n  }\n}`,
    reactSnippet: `export function Counter() {\n  const [count, setCount] = useState(0);\n  const [multiplier, setMultiplier] = useState(2);\n\n  // Memoized derived value\n  const doubled = useMemo(() => count * multiplier, [count, multiplier]);\n\n  // Side effect\n  useEffect(() => {\n    console.log('Count updated:', count);\n  }, [count]);\n\n  const increment = () => setCount(c => c + 1);\n\n  return <div>{count} * {multiplier} = {doubled}</div>;\n}`,
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
    angularSnippet: `@Component({ ... })\nexport class TimerComponent implements OnInit, OnDestroy {\n  private destroyRef = inject(DestroyRef);\n  private intervalId!: number;\n\n  ngOnInit() {\n    this.intervalId = window.setInterval(() => console.log('Tick'), 1000);\n    \n    this.destroyRef.onDestroy(() => {\n      clearInterval(this.intervalId);\n    });\n  }\n  \n  ngOnDestroy() {\n    clearInterval(this.intervalId);\n  }\n}`,
    reactSnippet: `export function Timer() {\n  useEffect(() => {\n    const intervalId = window.setInterval(() => {\n      console.log('Tick');\n    }, 1000);\n\n    // Cleanup function executed on unmount or before rerun\n    return () => {\n      clearInterval(intervalId);\n    };\n  }, []); // Empty array = mount / unmount\n\n  return <div>Timer active</div>;\n}`,
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
    angularSnippet: `// Injection Token & Service\nexport const API_URL = new InjectionToken<string>('API_URL');\n\n@Injectable({ providedIn: 'root' })\nexport class UserService {\n  private apiUrl = inject(API_URL);\n  private http = inject(HttpClient);\n  \n  getUsers() {\n    return this.http.get<User[]>(this.apiUrl);\n  }\n}`,
    reactSnippet: `// Context & Hook Provider\ninterface UserContextType {\n  users: User[];\n  refresh: () => void;\n}\n\nconst UserContext = createContext<UserContextType | null>(null);\n\nexport function useUsers() {\n  const context = useContext(UserContext);\n  if (!context) throw new Error('useUsers must be used within UserProvider');\n  return context;\n}\n\nexport function UserProvider({ children, apiUrl }: { children: React.ReactNode; apiUrl: string }) {\n  // Implementation\n  return <UserContext.Provider value={{ users, refresh }}>{children}</UserContext.Provider>;\n}`,
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
    angularSnippet: `@Component({ ... })\nexport class SearchBoxComponent {\n  inputElement = viewChild.required<ElementRef<HTMLInputElement>>('searchInput');\n\n  focusInput() {\n    this.inputElement().nativeElement.focus();\n  }\n}`,
    reactSnippet: `export function SearchBox() {\n  const inputRef = useRef<HTMLInputElement>(null);\n\n  const focusInput = () => {\n    inputRef.current?.focus();\n  };\n\n  return (\n    <div>\n      <input ref={inputRef} placeholder="Search..." />\n      <button onClick={focusInput}>Focus</button>\n    </div>\n  );\n}`,
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
    angularSnippet: `@Component({\n  selector: 'app-user-row',\n  standalone: true,\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  template: \`<div>{{ user().name }}</div>\`\n})\nexport class UserRowComponent {\n  user = input.required<User>();\n}`,
    reactSnippet: `// Pure React Component (Memoized)\nexport const UserRow = React.memo(function UserRow({ user }: { user: User }) {\n  return <div>{user.name}</div>;\n});`,
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
    angularSnippet: `<p>Date: {{ item.createdAt | date:'mediumDate' }}</p>\n<p>Price: {{ item.price | currency:'USD':'symbol':'1.2-2' }}</p>\n<p>JSON: <pre>{{ item | json }}</pre></p>\n<p>Async: {{ user$ | async }}</p>`,
    reactSnippet: `{/* Standard JavaScript / Intl in JSX */}\n<p>Date: {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(item.createdAt))}</p>\n<p>Price: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}</p>\n<p>JSON: <pre>{JSON.stringify(item, null, 2)}</pre></p>\n<p>Async: {user?.name}</p>`,
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
    name: 'Reactive Forms (FormGroup, FormArray) vs Controlled Form Hooks',
    angularConcept:
      'Angular ReactiveFormsModule provides typed FormGroup, FormControl, FormArray, built-in Validators, and ControlValueAccessor for complex forms.',
    reactConcept:
      'React uses controlled components with typed state hooks, custom form reducers, or ecosystem libraries like React Hook Form / Zod for schema validation.',
    angularSnippet: `export class ProfileFormComponent {\n  fb = inject(FormBuilder);\n  \n  form = this.fb.group({\n    username: ['', [Validators.required, Validators.minLength(3)]],\n    emails: this.fb.array([this.fb.control('', [Validators.required, Validators.email])])\n  });\n\n  addEmail() {\n    this.form.controls.emails.push(this.fb.control('', [Validators.required, Validators.email]));\n  }\n}`,
    reactSnippet: `export function ProfileForm() {\n  const [username, setUsername] = useState('');\n  const [emails, setEmails] = useState<string[]>(['']);\n  const [errors, setErrors] = useState<Record<string, string>>({});\n\n  const handleAddEmail = () => setEmails(prev => [...prev, '']);\n  const handleEmailChange = (index: number, val: string) => {\n    setEmails(prev => prev.map((e, i) => i === index ? val : e));\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={username} onChange={e => setUsername(e.target.value)} />\n      {emails.map((email, idx) => (\n        <input key={idx} value={email} onChange={e => handleEmailChange(idx, e.target.value)} />\n      ))}\n      <button type="button" onClick={handleAddEmail}>Add Email</button>\n    </form>\n  );\n}`,
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
    angularSnippet: `// app.routes.ts\nexport const routes: Routes = [\n  {\n    path: 'admin',\n    loadComponent: () => import('./admin.component').then(m => m.AdminComponent),\n    canActivate: [(route, state) => inject(AuthService).isAdmin()],\n    resolve: { stats: () => inject(StatsService).getStats() }\n  }\n];`,
    reactSnippet: `// AppRouter.tsx\nconst router = createBrowserRouter([\n  {\n    path: 'admin',\n    lazy: async () => {\n      const { AdminView } = await import('./AdminView');\n      return { Component: AdminView };\n    },\n    loader: async () => fetchAdminStats(),\n    element: (\n      <AdminGuard>\n        <AdminView />\n      </AdminGuard>\n    )\n  }\n]);`,
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
    angularSnippet: `// Functional Interceptor\nexport const authInterceptor: HttpInterceptorFn = (req, next) => {\n  const token = inject(AuthService).getToken();\n  const authReq = token \n    ? req.clone({ setHeaders: { Authorization: \`Bearer \${token}\` } }) \n    : req;\n  return next(authReq);\n};\n\n// Service Call\nexport class UserService {\n  private http = inject(HttpClient);\n  fetchUsers() {\n    return this.http.get<User[]>('/api/users');\n  }\n}`,
    reactSnippet: `// React Fetch Hook with Interceptor & AbortController\nexport function useFetchUsers() {\n  const [users, setUsers] = useState<User[]>([]);\n  const { token } = useAuth();\n\n  useEffect(() => {\n    const controller = new AbortController();\n    \n    fetch('/api/users', {\n      signal: controller.signal,\n      headers: token ? { Authorization: \`Bearer \${token}\` } : {}\n    })\n      .then(res => res.json())\n      .then(data => setUsers(data))\n      .catch(err => {\n        if (err.name !== 'AbortError') console.error(err);\n      });\n\n    return () => controller.abort(); // Automatic cancellation\n  }, [token]);\n\n  return users;\n}`,
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
    angularSnippet: `export class SearchComponent {\n  private searchService = inject(SearchService);\n  searchTerm = signal('');\n  \n  // Convert signal to observable, debounce, switchMap, and back to signal\n  results = toSignal(\n    toObservable(this.searchTerm).pipe(\n      debounceTime(300),\n      distinctUntilChanged(),\n      switchMap(term => this.searchService.search(term))\n    ),\n    { initialValue: [] }\n  );\n}`,
    reactSnippet: `export function useObservable<T>(observable$: Observable<T>, initialValue: T): T {\n  return useSyncExternalStore(\n    (callback) => {\n      const sub = observable$.subscribe(callback);\n      return () => sub.unsubscribe();\n    },\n    () => initialValue\n  );\n}\n\n// Debounced Search Hook\nexport function useDebouncedSearch(query: string, delay = 300) {\n  const [debounced, setDebounced] = useState(query);\n  useEffect(() => {\n    const timer = setTimeout(() => setDebounced(query), delay);\n    return () => clearTimeout(timer);\n  }, [query, delay]);\n  return debounced;\n}`,
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
    angularSnippet: `// app.config.server.ts\nexport const config: ApplicationConfig = {\n  providers: [\n    provideServerRendering(),\n    provideClientHydration(withEventReplay())\n  ]\n};\n\n// Platform check\nif (isPlatformBrowser(this.platformId)) {\n  localStorage.getItem('theme');\n}`,
    reactSnippet: `// Server-safe environment check\nexport function useIsClient() {\n  const [isClient, setIsClient] = useState(false);\n  useEffect(() => {\n    setIsClient(true);\n  }, []);\n  return isClient;\n}\n\n// Streaming Suspense on Server\n<Suspense fallback={<Skeleton />}>\n  <ServerDataList />\n</Suspense>`,
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
    angularSnippet: `export class SafeContentComponent {\n  private sanitizer = inject(DomSanitizer);\n  rawHtml = '<p>Safe <strong>content</strong></p>';\n  \n  get trustedHtml() {\n    return this.sanitizer.bypassSecurityTrustHtml(this.rawHtml);\n  }\n}\n\n// Template:\n// <div [innerHTML]="trustedHtml"></div>`,
    reactSnippet: `import DOMPurify from 'dompurify';\n\nexport function SafeContent({ rawHtml }: { rawHtml: string }) {\n  const cleanHtml = DOMPurify.sanitize(rawHtml);\n  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;\n}`,
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
    angularSnippet: `export class AccessibleModalComponent implements AfterViewInit {\n  private focusTrap = inject(FocusTrapFactory);\n  private liveAnnouncer = inject(LiveAnnouncer);\n  elementRef = inject(ElementRef);\n\n  ngAfterViewInit() {\n    const trap = this.focusTrap.create(this.elementRef.nativeElement);\n    trap.focusInitialElement();\n    this.liveAnnouncer.announce('Modal opened', 'assertive');\n  }\n}`,
    reactSnippet: `import FocusTrap from 'focus-trap-react';\n\nexport function AccessibleModal({ isOpen, onClose, children }: ModalProps) {\n  if (!isOpen) return null;\n  return (\n    <FocusTrap active={isOpen}>\n      <div role="dialog" aria-modal="true" aria-labelledby="modal-title">\n        <div role="status" aria-live="assertive" className="sr-only">\n          Modal opened\n        </div>\n        <h2 id="modal-title">Accessible Dialog</h2>\n        {children}\n        <button onClick={onClose}>Close</button>\n      </div>\n    </FocusTrap>\n  );\n}`,
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
    angularSnippet: `describe('CounterComponent', () => {\n  let fixture: ComponentFixture<CounterComponent>;\n  let component: CounterComponent;\n\n  beforeEach(async () => {\n    await TestBed.configureTestingModule({\n      imports: [CounterComponent]\n    }).compileComponents();\n\n    fixture = TestBed.createComponent(CounterComponent);\n    component = fixture.componentInstance;\n    fixture.detectChanges();\n  });\n\n  it('should increment count', () => {\n    const button = fixture.debugElement.query(By.css('button'));\n    button.nativeElement.click();\n    fixture.detectChanges();\n    expect(component.count()).toBe(1);\n  });\n});`,
    reactSnippet: `import { render, screen } from '@testing-library/react';\nimport userEvent from '@testing-library/user-event';\nimport { Counter } from './Counter';\n\ndescribe('Counter Component', () => {\n  it('should increment count when clicked', async () => {\n    const user = userEvent.setup();\n    render(<Counter />);\n\n    const button = screen.getByRole('button', { name: /increment/i });\n    await user.click(button);\n\n    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();\n  });\n});`,
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
    angularSnippet: `<!-- Virtual Scroll -->\n<cdk-virtual-scroll-viewport itemSize="50" class="viewport">\n  <div *cdkVirtualFor="let item of items" class="item">\n    {{ item.name }}\n  </div>\n</cdk-virtual-scroll-viewport>`,
    reactSnippet: `// TanStack Virtual Scroll in React\nimport { useVirtualizer } from '@tanstack/react-virtual';\n\nexport function VirtualList({ items }: { items: Item[] }) {\n  const parentRef = useRef<HTMLDivElement>(null);\n  const rowVirtualizer = useVirtualizer({\n    count: items.length,\n    getScrollElement: () => parentRef.current,\n    estimateSize: () => 50,\n  });\n\n  return (\n    <div ref={parentRef} className="viewport" style={{ height: '400px', overflow: 'auto' }}>\n      <div style={{ height: \`\${rowVirtualizer.getTotalSize()}px\`, position: 'relative' }}>\n        {rowVirtualizer.getVirtualItems().map(virtualRow => (\n          <div key={virtualRow.index} style={{ position: 'absolute', top: 0, transform: \`translateY(\${virtualRow.start}px)\` }}>\n            {items[virtualRow.index].name}\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n}`,
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
    angularSnippet: `<mat-form-field appearance="outline">\n  <mat-label>User Email</mat-label>\n  <input matInput [formControl]="emailControl" placeholder="user@example.com">\n  <mat-error *ngIf="emailControl.invalid">Please enter a valid email</mat-error>\n</mat-form-field>`,
    reactSnippet: `import TextField from '@mui/material/TextField';\n\nexport function EmailInput({ value, onChange, error }: EmailProps) {\n  return (\n    <TextField\n      variant="outlined"\n      label="User Email"\n      value={value}\n      onChange={e => onChange(e.target.value)}\n      error={Boolean(error)}\n      helperText={error}\n      placeholder="user@example.com"\n    />\n  );\n}`,
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

  // Section 35: Common external patterns
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
    angularSnippet: `// NgRx SignalStore\nexport const TodoStore = signalStore(\n  { providedIn: 'root' },\n  withState({ todos: [] as Todo[], filter: 'all' }),\n  withComputed(({ todos, filter }) => ({\n    completedCount: computed(() => todos().filter(t => t.done).length),\n    filteredTodos: computed(() => {\n      if (filter() === 'done') return todos().filter(t => t.done);\n      return todos();\n    })\n  })),\n  withMethods((store) => ({\n    addTodo(title: string) {\n      patchState(store, { todos: [...store.todos(), { id: Date.now(), title, done: false }] });\n    }\n  }))\n);`,
    reactSnippet: `// Zustand Store in React\nimport { create } from 'zustand';\n\ninterface TodoState {\n  todos: Todo[];\n  filter: 'all' | 'done';\n  addTodo: (title: string) => void;\n  setFilter: (filter: 'all' | 'done') => void;\n}\n\nexport const useTodoStore = create<TodoState>((set) => ({\n  todos: [],\n  filter: 'all',\n  addTodo: (title) => set((state) => ({\n    todos: [...state.todos, { id: Date.now(), title, done: false }]\n  })),\n  setFilter: (filter) => set({ filter }),\n}));`,
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
