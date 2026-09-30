import type { ComparisonPattern, PatternCategory } from '../types/migration.ts'

export const MIGRATION_PATTERNS: ComparisonPattern[] = [
  {
    id: 'conditional-rendering',
    title: 'Conditional Rendering (*ngIf)',
    category: 'templates',
    angularSnippet: `<div *ngIf="isLoggedIn; else guestTpl">\n  Welcome, {{ user.name }}!\n</div>\n<ng-template #guestTpl>\n  <p>Please log in</p>\n</ng-template>`,
    reactSnippet: `{isLoggedIn ? (\n  <div>Welcome, {user.name}!</div>\n) : (\n  <p>Please log in</p>\n)}`,
    explanation:
      'Angular uses structural directives (*ngIf) and template references. React uses standard JavaScript conditional expressions (ternary or && operators) inside JSX.',
  },
  {
    id: 'list-rendering',
    title: 'List Rendering (*ngFor)',
    category: 'templates',
    angularSnippet: `<ul>\n  <li *ngFor="let item of items; trackBy: trackById">\n    {{ item.name }}\n  </li>\n</ul>`,
    reactSnippet: `<ul>\n  {items.map((item) => (\n    <li key={item.id}>{item.name}</li>\n  ))}\n</ul>`,
    explanation:
      'Angular uses *ngFor with optional trackBy function. React maps an array to JSX elements using Array.prototype.map() with a unique key prop.',
  },
  {
    id: 'two-way-binding',
    title: 'Two-Way Form Binding ([(ngModel)])',
    category: 'templates',
    angularSnippet: `<input [(ngModel)]="username" />`,
    reactSnippet: `<input\n  value={username}\n  onChange={(e) => setUsername(e.target.value)}\n/>`,
    explanation:
      'Angular offers two-way data binding via "banana-in-a-box" syntax [()]. React uses controlled components with explicit value and onChange handler props.',
  },
  {
    id: 'state-signals',
    title: 'Reactive State (Signals vs useState)',
    category: 'reactivity',
    angularSnippet: `// Angular Signal\nconst count = signal(0);\ncount.update(n => n + 1);\nconsole.log(count());`,
    reactSnippet: `// React useState Hook\nconst [count, setCount] = useState(0);\nsetCount(prev => prev + 1);\nconsole.log(count);`,
    explanation:
      'Angular Signals use getter functions count() and mutable .set()/.update(). React useState provides a value and an immutable setter dispatch function that schedules a render.',
  },
  {
    id: 'props-inputs',
    title: 'Passing Props (@Input vs Props)',
    category: 'reactivity',
    angularSnippet: `@Component({...})\nexport class UserCard {\n  @Input({ required: true }) name!: string;\n  @Input() age = 18;\n}`,
    reactSnippet: `interface UserCardProps {\n  name: string;\n  age?: number;\n}\n\nexport function UserCard({ name, age = 18 }: UserCardProps) {\n  return <div>{name} ({age})</div>;\n}`,
    explanation:
      'Angular uses class field decorators (@Input) or input() signal functions. React components receive plain TypeScript object parameters (props) with native destructuring.',
  },
  {
    id: 'events-outputs',
    title: 'Emitting Events (@Output vs Callback Props)',
    category: 'reactivity',
    angularSnippet: `@Output() selectItem = new EventEmitter<string>();\n\nonClick(id: string) {\n  this.selectItem.emit(id);\n}`,
    reactSnippet: `interface Props {\n  onSelectItem: (id: string) => void;\n}\n\nfunction Component({ onSelectItem }: Props) {\n  return <button onClick={() => onSelectItem('123')}>Select</button>;\n}`,
    explanation:
      'Angular dispatches RxJS EventEmitter instances via @Output(). React passes standard callback functions as props, following unidirectional data flow.',
  },
  {
    id: 'lifecycle-init-destroy',
    title: 'Lifecycle (ngOnInit/ngOnDestroy vs useEffect)',
    category: 'lifecycle',
    angularSnippet: `ngOnInit() {\n  this.sub = this.api.getData().subscribe(...);\n}\n\nngOnDestroy() {\n  this.sub.unsubscribe();\n}`,
    reactSnippet: `useEffect(() => {\n  const controller = new AbortController();\n  fetchData({ signal: controller.signal });\n\n  return () => {\n    controller.abort(); // Cleanup function\n  };\n}, []);`,
    explanation:
      'Angular splits lifecycle into distinct class methods (ngOnInit, ngOnDestroy). React unifies lifecycle and synchronization within useEffect and its cleanup return callback.',
  },
  {
    id: 'dependency-injection',
    title: 'Dependency Injection (Services vs Context)',
    category: 'di',
    angularSnippet: `@Injectable({ providedIn: 'root' })\nexport class AuthService { ... }\n\n// In Component:\nconstructor(private auth: AuthService) {}`,
    reactSnippet: `const AuthContext = createContext<AuthContextType | null>(null);\n\n// In Component:\nconst auth = useContext(AuthContext);`,
    explanation:
      'Angular uses a hierarchical runtime Dependency Injection container with tokens and decorators. React uses Context API (useContext) and custom composable hooks.',
  },
  {
    id: 'route-guards',
    title: 'Route Protection (Guards vs Wrapper Route)',
    category: 'routing',
    angularSnippet: `export const authGuard: CanActivateFn = (route, state) => {\n  const auth = inject(AuthService);\n  return auth.isLoggedIn() || inject(Router).parseUrl('/login');\n};`,
    reactSnippet: `export function ProtectedRoute({ children }: { children: React.ReactNode }) {\n  const { isLoggedIn } = useAuth();\n  if (!isLoggedIn) {\n    return <Navigate to="/login" replace />;\n  }\n  return <>{children}</>;\n}`,
    explanation:
      'Angular guards execute at router configuration level before component instantiation. React protects routes via composition using Higher-Order wrapper components or layout routes with <Navigate />.',
  },
]

export const MIGRATION_CATEGORY_TABS: { id: PatternCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Patterns' },
  { id: 'templates', label: 'Templates' },
  { id: 'reactivity', label: 'State & Reactivity' },
  { id: 'lifecycle', label: 'Lifecycle' },
  { id: 'di', label: 'Dependency Injection' },
  { id: 'routing', label: 'Routing & Guards' },
]
