import { CodePane } from '../migration/CodePane.tsx'
import { useClipboard } from '../../hooks/useClipboard.ts'

const ANGULAR_HTTP_SNIPPET = `// Angular Functional Interceptor & HttpClient Pipeline
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { retry, catchError, throwError, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Clone immutable request and attach headers
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: \`Bearer \${token}\`,
          'X-Request-Id': crypto.randomUUID()
        }
      })
    : req;

  return next(authReq).pipe(
    retry({ count: 2, delay: 1000 }),
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        return authService.refreshToken().pipe(
          switchMap(newToken => next(req.clone({
            setHeaders: { Authorization: \`Bearer \${newToken}\` }
          })))
        );
      }
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

const REACT_HTTP_SNIPPET = `// React Composable Fetch with Middleware & TanStack Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';

export interface User {
  id: string;
  name: string;
  email: string;
}

export function useUsersApi() {
  const { token, refreshToken } = useAuth();
  const queryClient = useQueryClient();

  // Custom Fetch client with interceptor logic & AbortController support
  const apiClient = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const headers = new Headers(options.headers);
    if (token) headers.set('Authorization', \`Bearer \${token}\`);
    headers.set('X-Request-Id', crypto.randomUUID());

    let res = await fetch(endpoint, { ...options, headers });

    // Handle 401 Token Refresh
    if (res.status === 401) {
      const newToken = await refreshToken();
      if (newToken) {
        headers.set('Authorization', \`Bearer \${newToken}\`);
        res = await fetch(endpoint, { ...options, headers });
      }
    }

    if (!res.ok) throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
    return res.json();
  };

  // Declarative TanStack Query with automatic background refetch & stale-time
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: ({ signal }) => apiClient<User[]>('/api/users', { signal }),
    staleTime: 1000 * 60 * 5, // 5 min cache
  });

  return usersQuery;
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
          label="⚛️ React Composable Fetch & TanStack Query"
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
