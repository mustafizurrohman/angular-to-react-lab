import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import './Pages.css'

interface RouteDemoItem {
  id: string
  title: string
  category: 'core' | 'routing' | 'state' | 'lifecycle'
  description: string
}

const DEMO_ITEMS: RouteDemoItem[] = [
  {
    id: '1',
    title: 'Declarative Routes',
    category: 'routing',
    description: 'Routes configured via <Routes> and <Route> JSX components instead of NgModule route tables.',
  },
  {
    id: '2',
    title: 'Programmatic Navigation',
    category: 'routing',
    description: 'useNavigate hook replaces Angular Router service navigate() calls with a cleaner, dependency-free API.',
  },
  {
    id: '3',
    title: 'Search Query Parameters',
    category: 'routing',
    description: 'useSearchParams synchronizes UI state with browser URL search query strings seamlessly.',
  },
  {
    id: '4',
    title: 'Component State',
    category: 'state',
    description: 'useState and useReducer provide local reactive primitives replacing component property binding.',
  },
  {
    id: '5',
    title: 'Effect Hooks',
    category: 'lifecycle',
    description: 'useEffect synchronizes with external systems, unifying ngOnInit, ngOnChanges, and ngOnDestroy.',
  },
  {
    id: '6',
    title: 'Functional Components',
    category: 'core',
    description: 'Pure functions returning JSX replace class-based components decorated with @Component.',
  },
]

export function RoutingLab() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  const currentCategory = searchParams.get('category') || 'all'
  const searchQuery = searchParams.get('q') || ''
  const sortBy = searchParams.get('sort') || 'name-asc'

  const updateParam = (key: string, value: string) => {
    const nextParams = new URLSearchParams(searchParams)
    if (value && value !== 'all') {
      nextParams.set(key, value)
    } else {
      nextParams.delete(key)
    }
    setSearchParams(nextParams)
  }

  const clearAllParams = () => {
    setSearchParams(new URLSearchParams())
  }

  const filteredItems = DEMO_ITEMS.filter((item) => {
    const matchesCategory = currentCategory === 'all' || item.category === currentCategory
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesQuery
  }).sort((a, b) => {
    if (sortBy === 'name-desc') return b.title.localeCompare(a.title)
    return a.title.localeCompare(b.title)
  })

  // Format search params entries for inspector
  const paramsEntries = Array.from(searchParams.entries())

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1 className="page-title">Client-Side Routing</h1>
        <p className="page-subtitle">
          Explore declarative client-side navigation with React Router—contrasting hooks like{' '}
          <code>useNavigate</code> and <code>useSearchParams</code> with Angular&apos;s{' '}
          <code>RouterModule</code> and <code>ActivatedRoute</code>.
        </p>
      </div>

      <div className="lab-section">
        <div className="lab-header">
          <h2>1. Live URL Search Params Synchronizer</h2>
          <p className="section-desc">
            Use the controls below. Notice how the URL query parameters automatically synchronize with the state without page reloads.
          </p>
        </div>

        <div className="routing-controls-panel">
          <div className="control-group">
            <label htmlFor="search-input" className="control-label">Search Query (<code>q</code>):</label>
            <input
              id="search-input"
              type="text"
              className="text-input"
              placeholder="Filter topics..."
              value={searchQuery}
              onChange={(e) => updateParam('q', e.target.value)}
            />
          </div>

          <div className="control-group">
            <span className="control-label">Category (<code>category</code>):</span>
            <div className="filter-buttons">
              {['all', 'routing', 'state', 'lifecycle', 'core'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-btn ${currentCategory === cat ? 'active' : ''}`}
                  onClick={() => updateParam('category', cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <label htmlFor="sort-select" className="control-label">Sort Order (<code>sort</code>):</label>
            <select
              id="sort-select"
              className="select-input"
              value={sortBy}
              onChange={(e) => updateParam('sort', e.target.value)}
            >
              <option value="name-asc">Title: A to Z</option>
              <option value="name-desc">Title: Z to A</option>
            </select>
          </div>

          {paramsEntries.length > 0 && (
            <button
              type="button"
              className="reset-btn"
              onClick={clearAllParams}
              style={{ alignSelf: 'flex-start' }}
            >
              Clear Query Params
            </button>
          )}
        </div>

        <div className="routing-results-grid">
          <div className="results-list-container">
            <h3>Filtered Concepts ({filteredItems.length})</h3>
            {filteredItems.length === 0 ? (
              <p className="empty-state">No matching concepts found for the current query.</p>
            ) : (
              <div className="items-list">
                {filteredItems.map((item) => (
                  <div key={item.id} className="concept-result-card">
                    <div className="card-top">
                      <h4>{item.title}</h4>
                      <span className="category-pill">{item.category}</span>
                    </div>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="inspector-box">
            <h3>Route & Location Inspector</h3>
            <div className="location-details">
              <div className="loc-row">
                <span className="loc-key">Pathname:</span>
                <code>{location.pathname}</code>
              </div>
              <div className="loc-row">
                <span className="loc-key">Search String:</span>
                <code>{location.search || '(empty)'}</code>
              </div>
              <div className="loc-row">
                <span className="loc-key">Hash:</span>
                <code>{location.hash || '(none)'}</code>
              </div>
            </div>

            <h4 style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-h)' }}>
              Parsed Query Parameters
            </h4>
            {paramsEntries.length === 0 ? (
              <p className="empty-state" style={{ fontSize: '13px' }}>
                No active query parameters.
              </p>
            ) : (
              <ul className="params-list">
                {paramsEntries.map(([key, value]) => (
                  <li key={key} className="param-item">
                    <strong>{key}:</strong> <span>&quot;{value}&quot;</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="lab-section" style={{ marginTop: '2.5rem' }}>
        <div className="lab-header">
          <h2>2. Programmatic Navigation with <code>useNavigate</code></h2>
          <p className="section-desc">
            In React Router, navigation is triggered imperatively with the <code>useNavigate</code> hook, replacing Angular&apos;s injected <code>Router.navigate()</code>.
          </p>
        </div>

        <div className="nav-actions-grid">
          <button
            type="button"
            className="counter-btn"
            onClick={() => navigate('/state')}
          >
            Navigate to Interactive State Lab &rarr;
          </button>
          <button
            type="button"
            className="counter-btn"
            onClick={() => navigate('/angular-to-react')}
          >
            Navigate to Comparison Guide &rarr;
          </button>
          <button
            type="button"
            className="reset-btn"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back (History -1)
          </button>
        </div>
      </div>
    </div>
  )
}
