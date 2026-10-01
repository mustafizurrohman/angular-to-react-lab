import { CodePane } from '../migration/CodePane.tsx'
import { useClipboard } from '../../hooks/useClipboard.ts'

const ANGULAR_HTTP_SNIPPET = `// Angular Functional Interceptor & HttpClient
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  const cloned = token
    ? req.clone({
        setHeaders: {
          Authorization: \`Bearer \${token}\`,
          'X-Request-Id': crypto.randomUUID()
        }
      })
    : req;

  return next(cloned).pipe(
    retry({ count: 2, delay: 1000 }),
    catchError((err: HttpErrorResponse) => {
      console.error('HTTP Error in interceptor:', err);
      return throwError(() => err);
    })
  );
};

// Bootstrap Configuration
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
});`

const REACT_HTTP_SNIPPET = `// React Composable Fetch with Interceptors & AbortController
export function useFetchUsers() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch('/api/users', {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: \`Bearer \${token}\` } : {}),
        'X-Request-Id': crypto.randomUUID()
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        return res.json();
      })
      .then(users => setData(users))
      .catch(err => {
        if (err.name !== 'AbortError') console.error(err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort(); // Automatic teardown cancellation
  }, [token]);

  return { data, loading };
}`

export function HttpArchitectureComparison() {
  const { copiedId, copyToClipboard } = useClipboard()

  return (
    <div className="architecture-comparison-card">
      <div className="code-comparison-grid">
        <CodePane
          label="🅰️ Angular HttpClient & Functional Interceptors"
          labelClass="angular-label"
          code={ANGULAR_HTTP_SNIPPET}
          copyId="http-arch-angular"
          isCopied={copiedId === 'http-arch-angular'}
          onCopy={copyToClipboard}
        />
        <CodePane
          label="⚛️ React Fetch Middleware & AbortController"
          labelClass="react-label"
          code={REACT_HTTP_SNIPPET}
          copyId="http-arch-react"
          isCopied={copiedId === 'http-arch-react'}
          onCopy={copyToClipboard}
        />
      </div>

      <div className="solid-notes-grid" style={{ marginTop: '1.25rem' }}>
        <div className="solid-card">
          <div className="solid-card-header">
            <span className="solid-badge">SRP</span>
            <span className="solid-title">Single Responsibility Principle</span>
          </div>
          <p className="solid-desc">
            Authentication token attachment, request logging, and retry logic are isolated inside middleware/interceptors without polluting domain consumers.
          </p>
        </div>

        <div className="solid-card">
          <div className="solid-card-header">
            <span className="solid-badge">OCP</span>
            <span className="solid-title">Open/Closed Principle</span>
          </div>
          <p className="solid-desc">
            New interceptors (metrics, caching, XSRF headers) can be appended to the pipeline without modifying existing service call sites.
          </p>
        </div>

        <div className="solid-card">
          <div className="solid-card-header">
            <span className="solid-badge">DIP</span>
            <span className="solid-title">Dependency Inversion Principle</span>
          </div>
          <p className="solid-desc">
            Components depend on high-level data contracts rather than concrete browser network transport implementations.
          </p>
        </div>
      </div>
    </div>
  )
}
