import type { ComparisonPattern, PatternCategory } from '../types/migration.ts'

export const MIGRATION_PATTERNS: ComparisonPattern[] = [
  // Architecture
  {
    id: 'standalone-vs-functions',
    title: 'Standalone Components vs Functional Components',
    category: 'architecture',
    angularSnippet: `@Component({\n  selector: 'app-user-card',\n  standalone: true,\n  imports: [CommonModule],\n  template: \`<div class="card"><h3>{{ title }}</h3></div>\`\n})\nexport class UserCardComponent {\n  @Input() title = '';\n}`,
    reactSnippet: `interface UserCardProps {\n  title?: string;\n}\n\nexport function UserCard({ title = '' }: UserCardProps) {\n  return <div className="card"><h3>{title}</h3></div>;\n}`,
    explanation:
      'Angular uses class decorators with metadata and an imports array. React uses pure functional components that accept typed props and return JSX.',
    solidPrinciple: 'Single Responsibility Principle (SRP): UI rendering separated from metadata registration.',
    bestPractices: [
      'Keep presentational components pure and stateless.',
      'Destructure props with default fallback values in React.',
    ],
  },
  {
    id: 'container-presentational',
    title: 'Smart/Container & Presentational Components',
    category: 'architecture',
    angularSnippet: `// Container Component\n@Component({\n  selector: 'app-users-page',\n  standalone: true,\n  imports: [UserListComponent],\n  template: \`<app-user-list [users]="users()" (select)="onSelect($event)" />\`\n})\nexport class UsersPageComponent {\n  private userService = inject(UserService);\n  users = this.userService.users;\n  onSelect(id: string) { this.userService.selectUser(id); }\n}`,
    reactSnippet: `// Presentational\nexport function UserList({ users, onSelect }: UserListProps) {\n  return <ul>{users.map(u => <li key={u.id} onClick={() => onSelect(u.id)}>{u.name}</li>)}</ul>;\n}\n\n// Container Hook & Component\nexport function UsersPage() {\n  const { users, selectUser } = useUsers();\n  return <UserList users={users} onSelect={selectUser} />;\n}`,
    explanation:
      'Separates state orchestration from UI presentation. React enables custom hooks to encapsulate container logic cleanly without extra component layers.',
    solidPrinciple: 'Interface Segregation Principle (ISP): Presentational component only receives required callbacks.',
  },

  // Templates
  {
    id: 'conditional-rendering',
    title: 'Conditional Rendering (*ngIf)',
    category: 'templates',
    angularSnippet: `<div *ngIf="isLoggedIn; else guestTpl">\n  Welcome, {{ user.name }}!\n</div>\n<ng-template #guestTpl>\n  <p>Please log in</p>\n</ng-template>`,
    reactSnippet: `{isLoggedIn ? (\n  <div>Welcome, {user.name}!</div>\n) : (\n  <p>Please log in</p>\n)}`,
    explanation:
      'Angular uses structural directives (*ngIf) and template references. React uses standard JavaScript conditional expressions (ternary or && operators) inside JSX.',
    solidPrinciple: 'Open/Closed Principle (OCP): Standard JS expressions evaluate without custom template parsers.',
  },
  {
    id: 'list-rendering',
    title: 'List Rendering (*ngFor)',
    category: 'templates',
    angularSnippet: `<ul>\n  <li *ngFor="let item of items; trackBy: trackById">\n    {{ item.name }}\n  </li>\n</ul>`,
    reactSnippet: `<ul>\n  {items.map((item) => (\n    <li key={item.id}>{item.name}</li>\n  ))}\n</ul>`,
    explanation:
      'Angular uses *ngFor with optional trackBy function. React maps an array to JSX elements using Array.prototype.map() with a unique key prop.',
    solidPrinciple: 'Liskov Substitution Principle (LSP): Any array element matching key contract can be rendered.',
  },
  {
    id: 'two-way-binding',
    title: 'Two-Way Form Binding ([(ngModel)])',
    category: 'templates',
    angularSnippet: `<input [(ngModel)]="username" />`,
    reactSnippet: `<input\n  value={username}\n  onChange={(e) => setUsername(e.target.value)}\n/>`,
    explanation:
      'Angular offers two-way data binding via "banana-in-a-box" syntax [()]. React uses controlled components with explicit value and onChange handler props.',
    solidPrinciple: 'Single Responsibility Principle (SRP): Unidirectional data flow makes state mutations explicit.',
  },

  // Control Flow
  {
    id: 'modern-control-flow',
    title: 'Modern Built-in Control Flow (@if, @for, @switch)',
    category: 'control-flow',
    angularSnippet: `@if (user.isAdmin) {\n  <app-admin-panel />\n} @else {\n  <app-user-view />\n}\n\n@for (item of items; track item.id; let idx = $index) {\n  <div>#{{ idx + 1 }}: {{ item.title }}</div>\n} @empty {\n  <p>No items found</p>\n}`,
    reactSnippet: `{user.isAdmin ? <AdminPanel /> : <UserView />}\n\n{items.length === 0 ? (\n  <p>No items found</p>\n) : (\n  items.map((item, idx) => (\n    <div key={item.id}>#{idx + 1}: {item.title}</div>\n  ))\n)}`,
    explanation:
      'Angular v17+ introduced ergonomic control blocks with required track expressions. React leverages native JS expressions (ternary, array mapping) with unique key props.',
    solidPrinciple: 'Single Responsibility Principle (SRP): Display logic is expressed natively without extra directive imports.',
  },

  // Defer
  {
    id: 'deferred-loading-suspense',
    title: 'Deferred Loading (@defer vs React Suspense / lazy)',
    category: 'defer',
    angularSnippet: `@defer (on viewport; prefetch on idle) {\n  <app-heavy-chart [data]="chartData" />\n} @placeholder {\n  <div class="skeleton">Chart placeholder</div>\n} @loading (minimum 500ms) {\n  <app-spinner />\n} @error {\n  <p>Failed to load bundle</p>\n}`,
    reactSnippet: `const HeavyChart = lazy(() => import('./HeavyChart'));\n\n<ErrorBoundary fallback={<p>Failed to load bundle</p>}>\n  <Suspense fallback={<div className="skeleton">Loading chart...</div>}>\n    <HeavyChart data={chartData} />\n  </Suspense>\n</ErrorBoundary>`,
    explanation:
      'Angular @defer automates trigger-based lazy bundle loading directly in template syntax. React combines React.lazy(), Suspense fallbacks, and Error Boundaries for declarative async chunk management.',
    solidPrinciple: 'Open/Closed Principle (OCP): Asynchronous code-splitting can be added around any component without modifying child implementations.',
  },

  // Directives
  {
    id: 'host-directives-hooks',
    title: 'Host Directives vs Custom Hooks',
    category: 'directives',
    angularSnippet: `@Directive({\n  selector: '[appTooltip]',\n  standalone: true,\n  hostDirectives: [{\n    directive: CdkTooltip,\n    inputs: ['cdkTooltip: appTooltip']\n  }]\n})\nexport class TooltipDirective {}`,
    reactSnippet: `// Custom Hook or Wrapper Component\nexport function useTooltip(text: string) {\n  const [visible, setVisible] = useState(false);\n  const triggerProps = {\n    onMouseEnter: () => setVisible(true),\n    onMouseLeave: () => setVisible(false),\n    'aria-label': text\n  };\n  return { visible, triggerProps };\n}`,
    explanation:
      'Angular uses hostDirectives composition API to compose behaviors onto elements. React uses composable custom hooks returning event handler props or compound components.',
    solidPrinciple: 'Single Responsibility Principle (SRP): Reusable DOM behaviors are packaged independently from UI render tree.',
  },

  // Reactivity
  {
    id: 'state-signals',
    title: 'Reactive State (Signals vs useState)',
    category: 'reactivity',
    angularSnippet: `// Angular Signal\nconst count = signal(0);\ncount.update(n => n + 1);\nconsole.log(count());`,
    reactSnippet: `// React useState Hook\nconst [count, setCount] = useState(0);\nsetCount(prev => prev + 1);\nconsole.log(count);`,
    explanation:
      'Angular Signals use getter functions count() and mutable .set()/.update(). React useState provides a value and an immutable setter dispatch function that schedules a render.',
    solidPrinciple: 'Single Responsibility Principle (SRP): State update scheduling is isolated from state read access.',
  },
  {
    id: 'computed-vs-usememo',
    title: 'Derived State (computed() vs useMemo)',
    category: 'reactivity',
    angularSnippet: `const price = signal(100);\nconst taxRate = signal(0.1);\nconst total = computed(() => price() * (1 + taxRate()));`,
    reactSnippet: `const [price, setPrice] = useState(100);\nconst [taxRate, setTaxRate] = useState(0.1);\nconst total = useMemo(() => price * (1 + taxRate), [price, taxRate]);`,
    explanation:
      'Angular computed() automatically tracks signal dependencies at runtime. React useMemo caches calculations across renders based on an explicit dependency array.',
    solidPrinciple: 'Single Responsibility Principle (SRP): Pure computation without external mutation side effects.',
  },
  {
    id: 'props-inputs',
    title: 'Passing Props (@Input / input() vs Props)',
    category: 'reactivity',
    angularSnippet: `@Component({...})\nexport class UserCard {\n  name = input.required<string>();\n  age = input(18);\n}`,
    reactSnippet: `interface UserCardProps {\n  name: string;\n  age?: number;\n}\n\nexport function UserCard({ name, age = 18 }: UserCardProps) {\n  return <div>{name} ({age})</div>;\n}`,
    explanation:
      'Angular uses input() signal functions or @Input() decorators. React components receive plain TypeScript object parameters (props) with native destructuring.',
    solidPrinciple: 'Interface Segregation Principle (ISP): Component contracts define exactly what data is consumed.',
  },
  {
    id: 'events-outputs',
    title: 'Emitting Events (output() vs Callback Props)',
    category: 'reactivity',
    angularSnippet: `selectItem = output<string>();\n\nonClick(id: string) {\n  this.selectItem.emit(id);\n}`,
    reactSnippet: `interface Props {\n  onSelectItem: (id: string) => void;\n}\n\nfunction Component({ onSelectItem }: Props) {\n  return <button onClick={() => onSelectItem('123')}>Select</button>;\n}`,
    explanation:
      'Angular dispatches events via output() or EventEmitter. React passes standard callback functions as props, following unidirectional data flow.',
    solidPrinciple: 'Dependency Inversion Principle (DIP): Components depend on abstract callback signatures rather than concrete parent event handlers.',
  },

  // Lifecycle
  {
    id: 'lifecycle-init-destroy',
    title: 'Lifecycle (ngOnInit/ngOnDestroy vs useEffect)',
    category: 'lifecycle',
    angularSnippet: `ngOnInit() {\n  this.sub = this.api.getData().subscribe(...);\n}\n\nngOnDestroy() {\n  this.sub.unsubscribe();\n}`,
    reactSnippet: `useEffect(() => {\n  const controller = new AbortController();\n  fetchData({ signal: controller.signal });\n\n  return () => {\n    controller.abort(); // Cleanup function\n  };\n}, []);`,
    explanation:
      'Angular splits lifecycle into distinct class methods (ngOnInit, ngOnDestroy). React unifies lifecycle and synchronization within useEffect and its cleanup return callback.',
    solidPrinciple: 'Single Responsibility Principle (SRP): Setup and teardown are paired cohesively in one place.',
  },
  {
    id: 'dom-queries-refs',
    title: 'DOM Queries (viewChild vs useRef)',
    category: 'lifecycle',
    angularSnippet: `inputEl = viewChild.required<ElementRef<HTMLInputElement>>('searchBox');\n\nfocusInput() {\n  this.inputEl().nativeElement.focus();\n}`,
    reactSnippet: `const inputRef = useRef<HTMLInputElement>(null);\n\nconst focusInput = () => {\n  inputRef.current?.focus();\n};\n\n<input ref={inputRef} />`,
    explanation:
      'Angular viewChild() queries template elements as signals. React useRef creates a stable reference object connected directly to JSX elements.',
    solidPrinciple: 'Interface Segregation Principle (ISP): Direct typed handle to the specific DOM element.',
  },

  // Dependency Injection
  {
    id: 'dependency-injection',
    title: 'Dependency Injection (Services vs Context)',
    category: 'di',
    angularSnippet: `@Injectable({ providedIn: 'root' })\nexport class AuthService { ... }\n\n// In Component:\nauth = inject(AuthService);`,
    reactSnippet: `const AuthContext = createContext<AuthContextType | null>(null);\n\n// In Component:\nconst auth = useContext(AuthContext);`,
    explanation:
      'Angular uses a hierarchical runtime Dependency Injection container with tokens and decorators. React uses Context API (useContext) and custom composable hooks.',
    solidPrinciple: 'Dependency Inversion Principle (DIP): High-level UI components consume injected abstractions rather than instantiating dependencies.',
  },

  // Forms
  {
    id: 'reactive-forms-vs-hook-form',
    title: 'Reactive Forms (FormGroup vs Controlled / Form Hooks)',
    category: 'forms',
    angularSnippet: `profileForm = new FormGroup({\n  username: new FormControl('', [Validators.required]),\n  email: new FormControl('', [Validators.required, Validators.email])\n});\n\nonSubmit() {\n  if (this.profileForm.valid) console.log(this.profileForm.value);\n}`,
    reactSnippet: `const [formState, setFormState] = useState({ username: '', email: '' });\nconst [errors, setErrors] = useState<{ [k: string]: string }>({});\n\nconst handleSubmit = (e: React.FormEvent) => {\n  e.preventDefault();\n  const errs = validate(formState);\n  if (Object.keys(errs).length === 0) console.log(formState);\n  else setErrors(errs);\n};`,
    explanation:
      'Angular Reactive Forms manage an in-memory mutable control model (FormGroup/FormControl). React uses controlled component state or declarative schema validators (Zod/Yup).',
    solidPrinciple: 'Open/Closed Principle (OCP): Form validation rules can be composed dynamically without altering core input controls.',
  },

  // Routing
  {
    id: 'route-guards',
    title: 'Route Protection (Guards vs Wrapper Route)',
    category: 'routing',
    angularSnippet: `export const authGuard: CanActivateFn = (route, state) => {\n  const auth = inject(AuthService);\n  return auth.isLoggedIn() || inject(Router).parseUrl('/login');\n};`,
    reactSnippet: `export function ProtectedRoute({ children }: { children: React.ReactNode }) {\n  const { isLoggedIn } = useAuth();\n  if (!isLoggedIn) {\n    return <Navigate to="/login" replace />;\n  }\n  return <>{children}</>;\n}`,
    explanation:
      'Angular guards execute at router configuration level before component instantiation. React protects routes via composition using Higher-Order wrapper components or layout routes with <Navigate />.',
    solidPrinciple: 'Open/Closed Principle (OCP): New protected layout branches can wrap routes without modifying page components.',
  },

  // HTTP
  {
    id: 'http-interceptors-fetch',
    title: 'HTTP Client & Interceptors (HttpClient vs Fetch Pipeline)',
    category: 'http',
    angularSnippet: `// Functional Interceptor\nexport const authInterceptor: HttpInterceptorFn = (req, next) => {\n  const token = inject(AuthService).token();\n  const cloned = token ? req.clone({ headers: req.headers.set('Authorization', \`Bearer \${token}\`) }) : req;\n  return next(cloned);\n};`,
    reactSnippet: `// Custom Fetch Client with Middleware\nexport async function apiClient(endpoint: string, options: RequestInit = {}) {\n  const token = getAuthToken();\n  const headers = new Headers(options.headers);\n  if (token) headers.set('Authorization', \`Bearer \${token}\`);\n  \n  const res = await fetch(endpoint, { ...options, headers });\n  if (!res.ok) throw new Error(res.statusText);\n  return res.json();\n}`,
    explanation:
      'Angular provides an extensible HttpInterceptorFn pipeline. React uses custom fetch wrappers, Axios interceptors, or TanStack Query plugins.',
    solidPrinciple: 'Single Responsibility Principle (SRP): Authentication token decoration is isolated in interceptor middleware.',
  },

  // RxJS & Async
  {
    id: 'rxjs-tosignal-external-store',
    title: 'RxJS Streams (toSignal vs useSyncExternalStore)',
    category: 'rxjs-async',
    angularSnippet: `// Angular Signal to Observable interop\nsearchTerm = signal('');\nresults = toSignal(\n  toObservable(this.searchTerm).pipe(\n    debounceTime(300),\n    switchMap(q => this.api.search(q))\n  ),\n  { initialValue: [] }\n);`,
    reactSnippet: `// React useSyncExternalStore subscription\nexport function useObservable<T>(observable$: Observable<T>, initial: T): T {\n  return useSyncExternalStore(\n    callback => {\n      const sub = observable$.subscribe(callback);\n      return () => sub.unsubscribe();\n    },\n    () => initial\n  );\n}`,
    explanation:
      'Angular seamlessly bridges Signals and Observables via @angular/core/rxjs-interop. React connects external observable stores safely using useSyncExternalStore.',
    solidPrinciple: 'Dependency Inversion Principle (DIP): Components depend on abstract stream subscribers without knowing internal publisher details.',
  },

  // Security & A11y
  {
    id: 'security-dom-sanitizer',
    title: 'Security (DomSanitizer vs DOMPurify / JSX Escaping)',
    category: 'security-a11y',
    angularSnippet: `@Component({ ... })\nexport class SafeHtmlComponent {\n  private sanitizer = inject(DomSanitizer);\n  cleanHtml = this.sanitizer.bypassSecurityTrustHtml('<b>Trusted HTML</b>');\n}\n// <div [innerHTML]="cleanHtml"></div>`,
    reactSnippet: `import DOMPurify from 'dompurify';\n\nexport function SafeHtml({ raw }: { raw: string }) {\n  const clean = DOMPurify.sanitize(raw);\n  return <div dangerouslySetInnerHTML={{ __html: clean }} />;\n}`,
    explanation:
      'Angular automatically escapes bindings and provides DomSanitizer for explicit trust bypasses. React escapes JSX text nodes by default and requires dangerouslySetInnerHTML for HTML injection.',
    solidPrinciple: 'Single Responsibility Principle (SRP): Input sanitization is separated from the rendering layer.',
  },

  // Performance
  {
    id: 'performance-onpush-memo',
    title: 'Performance Optimization (OnPush vs React.memo / Compiler)',
    category: 'performance',
    angularSnippet: `@Component({\n  selector: 'app-metric-row',\n  standalone: true,\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  template: \`<div>{{ metric().value }}</div>\`\n})\nexport class MetricRowComponent {\n  metric = input.required<Metric>();\n}`,
    reactSnippet: `export const MetricRow = React.memo(function MetricRow({ metric }: { metric: Metric }) {\n  return <div>{metric.value}</div>;\n});`,
    explanation:
      'Angular OnPush skips component subtrees unless inputs change or signals update. React uses React.memo() or React 19 Compiler to skip unnecessary re-renders.',
    solidPrinciple: 'Single Responsibility Principle (SRP): Component render purity enables declarative optimization.',
  },

  // CDK & Material
  {
    id: 'cdk-primitives-radix',
    title: 'UI Primitives (Angular CDK vs Radix UI / Headless UI)',
    category: 'cdk-material',
    angularSnippet: `<!-- Angular CDK Overlay / Dialog -->\nconst overlayRef = this.overlay.create({\n  positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),\n  hasBackdrop: true\n});\noverlayRef.attach(new ComponentPortal(MyDialogComponent));`,
    reactSnippet: `<!-- Radix UI Dialog in React -->\nimport * as Dialog from '@radix-ui/react-dialog';\n\n<Dialog.Root>\n  <Dialog.Trigger>Open</Dialog.Trigger>\n  <Dialog.Portal>\n    <Dialog.Overlay className="dialog-overlay" />\n    <Dialog.Content className="dialog-content">\n      <Dialog.Title>Accessible Dialog</Dialog.Title>\n    </Dialog.Content>\n  </Dialog.Portal>\n</Dialog.Root>`,
    explanation:
      'Angular CDK provides programmatic portals and overlays. React uses composable headless compound components (Radix UI / Floating UI).',
    solidPrinciple: 'Open/Closed Principle (OCP): Headless primitives provide accessibility and positioning without dictating styling.',
  },

  // Testing
  {
    id: 'testing-testbed-rtl',
    title: 'Testing (TestBed vs React Testing Library)',
    category: 'testing',
    angularSnippet: `await TestBed.configureTestingModule({ imports: [CounterComponent] }).compileComponents();\nconst fixture = TestBed.createComponent(CounterComponent);\nfixture.detectChanges();\nconst btn = fixture.debugElement.query(By.css('button'));\nbtn.nativeElement.click();\nfixture.detectChanges();\nexpect(fixture.componentInstance.count()).toBe(1);`,
    reactSnippet: `render(<Counter />);\nconst btn = screen.getByRole('button', { name: /increment/i });\nawait userEvent.click(btn);\nexpect(screen.getByText(/count: 1/i)).toBeInTheDocument();`,
    explanation:
      'Angular TestBed emulates DI compilation and requires manual detectChanges() triggers. React Testing Library queries DOM nodes from user perspective and tests observable behavior.',
    solidPrinciple: 'Liskov Substitution Principle (LSP): Test verifies public contracts and user-visible behavior rather than private implementation details.',
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
