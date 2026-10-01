export type TokenType =
  | 'keyword'
  | 'decorator'
  | 'control-flow'
  | 'type'
  | 'function'
  | 'hook'
  | 'string'
  | 'tag'
  | 'attr-name'
  | 'attr-value'
  | 'directive'
  | 'binding'
  | 'interpolation'
  | 'comment'
  | 'number'
  | 'boolean'
  | 'operator'
  | 'punctuation'
  | 'property'
  | 'variable'
  | 'plain'

export interface CodeToken {
  text: string
  type: TokenType
}

export interface CodeLine {
  lineNumber: number
  tokens: CodeToken[]
}

export interface FileTypeInfo {
  type: 'ts' | 'tsx' | 'html' | 'css' | 'json' | 'js'
  name: string
  label: string
  badgeClass: string
  framework: 'angular' | 'react' | 'neutral'
  iconName: string
}

interface TokenizerState {
  inBlockComment: boolean
  inHtmlComment: boolean
  inBacktickString: boolean
}

/**
 * Normalizes and formats code snippet by trimming leading/trailing empty lines
 * and normalizing space indentation while preserving relative layout.
 */
export function formatCode(code: string): string {
  if (!code) return ''

  // Split into lines
  const rawLines = code.split(/\r?\n/)

  // Remove leading blank lines
  while (rawLines.length > 0 && rawLines[0].trim() === '') {
    rawLines.shift()
  }

  // Remove trailing blank lines
  while (rawLines.length > 0 && rawLines[rawLines.length - 1].trim() === '') {
    rawLines.pop()
  }

  return rawLines.join('\n')
}

/**
 * Detects the file type, extension, framework affiliation, and display metadata
 * based on snippet content, framework label, and explicit overrides.
 */
export function detectFileType(
  code: string,
  label = '',
  labelClass = '',
  explicitFileType?: string,
  explicitFileName?: string,
  explicitLanguage?: string
): FileTypeInfo {
  const isAngular =
    labelClass.includes('angular') ||
    label.toLowerCase().includes('angular') ||
    label.includes('🅰️')

  const isReact =
    labelClass.includes('react') ||
    label.toLowerCase().includes('react') ||
    label.includes('⚛️')

  // If explicit file type is provided
  if (explicitFileType) {
    const cleanType = explicitFileType.toLowerCase().replace(/^\./, '') as FileTypeInfo['type']
    if (cleanType === 'tsx') {
      return {
        type: 'tsx',
        name: explicitFileName || (isReact ? 'Component.tsx' : 'Snippet.tsx'),
        label: 'React TSX',
        badgeClass: 'file-badge-tsx',
        framework: 'react',
        iconName: 'file-jsx',
      }
    }
    if (cleanType === 'html') {
      return {
        type: 'html',
        name: explicitFileName || (isAngular ? 'template.component.html' : 'template.html'),
        label: isAngular ? 'Angular HTML' : 'HTML',
        badgeClass: 'file-badge-html',
        framework: isAngular ? 'angular' : 'neutral',
        iconName: 'file-html',
      }
    }
    if (cleanType === 'ts') {
      return {
        type: 'ts',
        name: explicitFileName || (isAngular ? 'component.ts' : 'module.ts'),
        label: 'TypeScript',
        badgeClass: 'file-badge-ts',
        framework: isAngular ? 'angular' : isReact ? 'react' : 'neutral',
        iconName: 'file-ts',
      }
    }
  }

  // If explicit language is provided
  if (explicitLanguage && explicitLanguage !== 'auto') {
    if (explicitLanguage === 'tsx') {
      return {
        type: 'tsx',
        name: explicitFileName || 'Component.tsx',
        label: 'React TSX',
        badgeClass: 'file-badge-tsx',
        framework: 'react',
        iconName: 'file-jsx',
      }
    }
    if (explicitLanguage === 'html') {
      return {
        type: 'html',
        name: explicitFileName || (isAngular ? 'template.component.html' : 'template.html'),
        label: isAngular ? 'Angular HTML' : 'HTML',
        badgeClass: 'file-badge-html',
        framework: isAngular ? 'angular' : 'neutral',
        iconName: 'file-html',
      }
    }
    if (explicitLanguage === 'typescript') {
      return {
        type: 'ts',
        name: explicitFileName || (isAngular ? 'component.ts' : isReact ? 'useHook.ts' : 'module.ts'),
        label: 'TypeScript',
        badgeClass: 'file-badge-ts',
        framework: isAngular ? 'angular' : isReact ? 'react' : 'neutral',
        iconName: 'file-ts',
      }
    }
  }

  // Angular heuristic
  if (isAngular) {
    const hasClassOrDecorator =
      /@Component|@Directive|@Injectable|@Pipe|export class|inject\(|signal\(|input\(|output\(|computed\(|TestBed\./.test(
        code
      )
    const hasHtmlTags = /<[a-z0-9_-]+(\s+[^>]*)?>|<!--|\{\{|\*ngIf|\*ngFor|@if\s*\(|@for\s*\(|@defer\s*\(|@switch\s*\(/.test(
      code
    )

    if (hasClassOrDecorator) {
      let inferredName = 'component.ts'
      const selectorMatch = code.match(/selector:\s*['"](?:app-)?([a-zA-Z0-9_-]+)['"]/)
      const classMatch = code.match(/export class ([A-Za-z0-9_]+)/)
      const interceptorMatch = code.match(/export const ([a-zA-Z0-9_]+):\s*HttpInterceptorFn/)

      if (selectorMatch) {
        inferredName = `${selectorMatch[1]}.component.ts`
      } else if (classMatch) {
        const cls = classMatch[1]
        if (cls.endsWith('Component')) {
          inferredName = `${cls.replace(/Component$/, '').toLowerCase()}.component.ts`
        } else if (cls.endsWith('Directive')) {
          inferredName = `${cls.replace(/Directive$/, '').toLowerCase()}.directive.ts`
        } else if (cls.endsWith('Service')) {
          inferredName = `${cls.replace(/Service$/, '').toLowerCase()}.service.ts`
        } else {
          inferredName = `${cls.toLowerCase()}.ts`
        }
      } else if (interceptorMatch) {
        inferredName = `${interceptorMatch[1].replace(/Interceptor$/, '')}.interceptor.ts`
      } else if (/@Injectable|AuthService|Service\b/.test(code)) {
        inferredName = 'auth.service.ts'
      } else if (/@Directive/.test(code)) {
        inferredName = 'tooltip.directive.ts'
      } else if (/TestBed/.test(code)) {
        inferredName = 'counter.component.spec.ts'
      } else if (/HttpInterceptorFn/.test(code)) {
        inferredName = 'auth.interceptor.ts'
      }

      return {
        type: 'ts',
        name: explicitFileName || inferredName,
        label: 'Angular TS',
        badgeClass: 'file-badge-angular-ts',
        framework: 'angular',
        iconName: 'file-ts',
      }
    }

    if (hasHtmlTags) {
      return {
        type: 'html',
        name: explicitFileName || 'template.component.html',
        label: 'Angular Template',
        badgeClass: 'file-badge-angular-html',
        framework: 'angular',
        iconName: 'file-html',
      }
    }

    return {
      type: 'ts',
      name: explicitFileName || 'component.ts',
      label: 'Angular TS',
      badgeClass: 'file-badge-angular-ts',
      framework: 'angular',
      iconName: 'file-ts',
    }
  }

  // React heuristic
  if (isReact) {
    const hasJsx = /<[A-Z][a-zA-Z0-9]*|<[a-z][a-zA-Z0-9_-]*\s*[^>]*\/?>|<\/>|<\/|<ErrorBoundary|<Suspense|className=/.test(
      code
    )
    const hookMatch = code.match(/export (?:default )?function (use[a-zA-Z0-9_]+)|const (use[a-zA-Z0-9_]+)/)
    const compMatch = code.match(/export (?:default )?function ([A-Z][a-zA-Z0-9_]+)|const ([A-Z][a-zA-Z0-9_]+)/)
    const isPureHook = /export function use|useSyncExternalStore|apiClient|fetch\(/.test(code) && !hasJsx

    if (isPureHook) {
      const hookName = hookMatch ? hookMatch[1] || hookMatch[2] : 'useObservable'
      return {
        type: 'ts',
        name: explicitFileName || `${hookName}.ts`,
        label: 'React TS Hook',
        badgeClass: 'file-badge-ts',
        framework: 'react',
        iconName: 'file-ts',
      }
    }

    const compName = compMatch ? compMatch[1] || compMatch[2] : 'Component'
    return {
      type: 'tsx',
      name: explicitFileName || `${compName}.tsx`,
      label: 'React TSX',
      badgeClass: 'file-badge-tsx',
      framework: 'react',
      iconName: 'file-jsx',
    }
  }

  // Neutral heuristic
  if (/^\s*[{[]/.test(code) && /[}\]]\s*$/.test(code.trim())) {
    return {
      type: 'json',
      name: explicitFileName || 'data.json',
      label: 'JSON',
      badgeClass: 'file-badge-json',
      framework: 'neutral',
      iconName: 'file-code',
    }
  }

  if (/<[a-z0-9_-]+(\s+[^>]*)?>/i.test(code)) {
    return {
      type: 'html',
      name: explicitFileName || 'index.html',
      label: 'HTML',
      badgeClass: 'file-badge-html',
      framework: 'neutral',
      iconName: 'file-html',
    }
  }

  return {
    type: 'ts',
    name: explicitFileName || 'index.ts',
    label: 'TypeScript',
    badgeClass: 'file-badge-ts',
    framework: 'neutral',
    iconName: 'file-ts',
  }
}

const KEYWORDS = new Set([
  'import',
  'export',
  'from',
  'as',
  'class',
  'interface',
  'type',
  'enum',
  'extends',
  'implements',
  'private',
  'public',
  'protected',
  'readonly',
  'static',
  'async',
  'await',
  'function',
  'const',
  'let',
  'var',
  'return',
  'if',
  'else',
  'switch',
  'case',
  'default',
  'for',
  'of',
  'in',
  'while',
  'do',
  'try',
  'catch',
  'finally',
  'throw',
  'new',
  'typeof',
  'instanceof',
  'void',
  'delete',
  'yield',
  'track',
  'minimum',
  'prefetch',
  'when',
  'on',
  'idle',
  'viewport',
  'interaction',
  'hover',
  'immediate',
  'timer',
])

const TYPES = new Set([
  'string',
  'number',
  'boolean',
  'any',
  'unknown',
  'never',
  'void',
  'null',
  'undefined',
  'symbol',
  'bigint',
  'object',
  'Record',
  'Partial',
  'Array',
  'Promise',
  'Observable',
  'BehaviorSubject',
  'Subject',
  'Signal',
  'WritableSignal',
  'ComponentRef',
  'ElementRef',
  'TemplateRef',
  'ViewContainerRef',
  'FormGroup',
  'FormControl',
  'FormArray',
  'FormRecord',
  'FormBuilder',
  'NonNullableFormBuilder',
  'Validators',
  'ReactNode',
  'ReactElement',
  'RequestInit',
  'Headers',
  'Response',
  'Error',
  'AbortController',
  'HttpInterceptorFn',
  'HttpContext',
  'InjectionToken',
  'Injector',
  'DestroyRef',
  'ChangeDetectorRef',
  'EffectRef',
  'ComponentPortal',
  'OverlayRef',
  'TestBed',
  'ComponentFixture',
  'PipeTransform',
  'ControlValueAccessor',
  'CommonModule',
  'Metric',
  'Task',
  'AuthService',
  'UserCardProps',
  'Props',
  'AuthContextType',
])

const HOOKS_AND_FRAMEWORK_FUNCS = new Set([
  'useState',
  'useEffect',
  'useMemo',
  'useCallback',
  'useRef',
  'useContext',
  'useReducer',
  'useId',
  'useTransition',
  'useDeferredValue',
  'useSyncExternalStore',
  'createContext',
  'lazy',
  'Suspense',
  'ErrorBoundary',
  'forwardRef',
  'memo',
  'useNavigate',
  'useLocation',
  'useParams',
  'useUsers',
  'useAuth',
  'useTooltip',
  'useObservable',
  'signal',
  'computed',
  'effect',
  'untracked',
  'linkedSignal',
  'resource',
  'rxResource',
  'toSignal',
  'toObservable',
  'takeUntilDestroyed',
  'input',
  'output',
  'model',
  'inject',
  'createComponent',
  'provideRouter',
  'provideHttpClient',
  'debounceTime',
  'switchMap',
  'render',
  'screen',
  'expect',
  'userEvent',
  'apiClient',
  'fetchData',
])

/**
 * Tokenizes a single line of code into high-fidelity syntax tokens.
 */
function tokenizeLine(
  line: string,
  state: TokenizerState
): { tokens: CodeToken[]; nextState: TokenizerState } {
  const tokens: CodeToken[] = []
  let index = 0
  const len = line.length

  let inBlockComment = state.inBlockComment
  let inHtmlComment = state.inHtmlComment
  let inBacktickString = state.inBacktickString

  // Handle continuing block comment from previous line
  if (inBlockComment) {
    const endIdx = line.indexOf('*/')
    if (endIdx !== -1) {
      tokens.push({ text: line.substring(0, endIdx + 2), type: 'comment' })
      index = endIdx + 2
      inBlockComment = false
    } else {
      tokens.push({ text: line, type: 'comment' })
      return { tokens, nextState: { inBlockComment: true, inHtmlComment: false, inBacktickString: false } }
    }
  }

  // Handle continuing HTML comment from previous line
  if (inHtmlComment) {
    const endIdx = line.indexOf('-->')
    if (endIdx !== -1) {
      tokens.push({ text: line.substring(0, endIdx + 3), type: 'comment' })
      index = endIdx + 3
      inHtmlComment = false
    } else {
      tokens.push({ text: line, type: 'comment' })
      return { tokens, nextState: { inBlockComment: false, inHtmlComment: true, inBacktickString: false } }
    }
  }

  // Handle continuing backtick string
  if (inBacktickString) {
    let endIdx = -1
    for (let i = 0; i < len; i++) {
      if (line[i] === '`' && (i === 0 || line[i - 1] !== '\\')) {
        endIdx = i
        break
      }
    }
    if (endIdx !== -1) {
      tokens.push({ text: line.substring(0, endIdx + 1), type: 'string' })
      index = endIdx + 1
      inBacktickString = false
    } else {
      tokens.push({ text: line, type: 'string' })
      return { tokens, nextState: { inBlockComment: false, inHtmlComment: false, inBacktickString: true } }
    }
  }

  while (index < len) {
    const rest = line.substring(index)

    // 1. Whitespace
    const wsMatch = rest.match(/^\s+/)
    if (wsMatch) {
      tokens.push({ text: wsMatch[0], type: 'plain' })
      index += wsMatch[0].length
      continue
    }

    // 2. Single line comment //
    if (rest.startsWith('//')) {
      tokens.push({ text: rest, type: 'comment' })
      break
    }

    // 3. Block comment /* ... */ or HTML comment <!-- ... -->
    if (rest.startsWith('/*')) {
      const endIdx = rest.indexOf('*/')
      if (endIdx !== -1) {
        tokens.push({ text: rest.substring(0, endIdx + 2), type: 'comment' })
        index += endIdx + 2
      } else {
        tokens.push({ text: rest, type: 'comment' })
        inBlockComment = true
        break
      }
      continue
    }

    if (rest.startsWith('<!--')) {
      const endIdx = rest.indexOf('-->')
      if (endIdx !== -1) {
        tokens.push({ text: rest.substring(0, endIdx + 3), type: 'comment' })
        index += endIdx + 3
      } else {
        tokens.push({ text: rest, type: 'comment' })
        inHtmlComment = true
        break
      }
      continue
    }

    if (rest.startsWith('{/*')) {
      const endIdx = rest.indexOf('*/}')
      if (endIdx !== -1) {
        tokens.push({ text: rest.substring(0, endIdx + 3), type: 'comment' })
        index += endIdx + 3
        continue
      }
    }

    // 4. Strings: Single quote, double quote, backtick
    if (rest.startsWith("'")) {
      let strEnd = 1
      while (strEnd < rest.length) {
        if (rest[strEnd] === "'" && rest[strEnd - 1] !== '\\') {
          strEnd++
          break
        }
        strEnd++
      }
      tokens.push({ text: rest.substring(0, strEnd), type: 'string' })
      index += strEnd
      continue
    }

    if (rest.startsWith('"')) {
      let strEnd = 1
      while (strEnd < rest.length) {
        if (rest[strEnd] === '"' && rest[strEnd - 1] !== '\\') {
          strEnd++
          break
        }
        strEnd++
      }
      tokens.push({ text: rest.substring(0, strEnd), type: 'string' })
      index += strEnd
      continue
    }

    if (rest.startsWith('`')) {
      let strEnd = 1
      let closed = false
      while (strEnd < rest.length) {
        if (rest[strEnd] === '`' && rest[strEnd - 1] !== '\\') {
          strEnd++
          closed = true
          break
        }
        strEnd++
      }
      tokens.push({ text: rest.substring(0, strEnd), type: 'string' })
      index += strEnd
      if (!closed) {
        inBacktickString = true
        break
      }
      continue
    }

    // 5. Template Interpolation: {{ ... }}
    if (rest.startsWith('{{') || rest.startsWith('}}')) {
      tokens.push({ text: rest.substring(0, 2), type: 'interpolation' })
      index += 2
      continue
    }

    // 6. Angular Decorators & Control Flow: @Component, @if, @for, @defer, etc.
    const decoratorMatch = rest.match(
      /^@(Component|Directive|Injectable|Pipe|Input|Output|HostBinding|HostListener|ViewChild|ViewChildren|ContentChild|ContentChildren|NgModule)\b/
    )
    if (decoratorMatch) {
      tokens.push({ text: decoratorMatch[0], type: 'decorator' })
      index += decoratorMatch[0].length
      continue
    }

    const controlFlowMatch = rest.match(
      /^@(if|else\s+if|else|for|empty|switch|case|default|defer|placeholder|loading|error|let)\b/
    )
    if (controlFlowMatch) {
      tokens.push({ text: controlFlowMatch[0], type: 'control-flow' })
      index += controlFlowMatch[0].length
      continue
    }

    // 7. Angular Directives & Bindings: [(ngModel)], [class.active], (click), *ngIf, #myRef
    const bananaMatch = rest.match(/^\[\([a-zA-Z0-9_.-]+\)\]/)
    if (bananaMatch) {
      tokens.push({ text: bananaMatch[0], type: 'binding' })
      index += bananaMatch[0].length
      continue
    }

    const propBindingMatch = rest.match(/^\[[a-zA-Z0-9_.-]+\]/)
    if (propBindingMatch) {
      tokens.push({ text: propBindingMatch[0], type: 'binding' })
      index += propBindingMatch[0].length
      continue
    }

    const eventBindingMatch = rest.match(/^\([a-zA-Z0-9_.-]+\)(?=\s*=)/)
    if (eventBindingMatch) {
      tokens.push({ text: eventBindingMatch[0], type: 'binding' })
      index += eventBindingMatch[0].length
      continue
    }

    const structuralDirectiveMatch = rest.match(/^\*(ngIf|ngFor|ngSwitch|ngSwitchCase|ngSwitchDefault|ngComponentOutlet|ngTemplateOutlet)\b/)
    if (structuralDirectiveMatch) {
      tokens.push({ text: structuralDirectiveMatch[0], type: 'directive' })
      index += structuralDirectiveMatch[0].length
      continue
    }

    const templateRefMatch = rest.match(/^#[a-zA-Z0-9_-]+/)
    if (templateRefMatch) {
      tokens.push({ text: templateRefMatch[0], type: 'directive' })
      index += templateRefMatch[0].length
      continue
    }

    // 8. HTML & JSX Tags: <div, </div, <app-user-card, <Component.Sub, </>, etc.
    const closingTagMatch = rest.match(/^<\/[a-zA-Z0-9_.:-]*>/)
    if (closingTagMatch) {
      tokens.push({ text: closingTagMatch[0], type: 'tag' })
      index += closingTagMatch[0].length
      continue
    }

    const openTagMatch = rest.match(/^<([a-zA-Z0-9_.:-]+)/)
    if (openTagMatch && !/^\s*<(=|string|number|boolean|any|T\b)/.test(rest)) {
      tokens.push({ text: openTagMatch[0], type: 'tag' })
      index += openTagMatch[0].length
      continue
    }

    if (rest.startsWith('</>')) {
      tokens.push({ text: '</>', type: 'tag' })
      index += 3
      continue
    }

    if (rest.startsWith('<>')) {
      tokens.push({ text: '<>', type: 'tag' })
      index += 2
      continue
    }

    if (rest.startsWith('/>')) {
      tokens.push({ text: '/>', type: 'tag' })
      index += 2
      continue
    }

    // 9. Angular contextual variables: $index, $count, $first, $last, $even, $odd, $event
    const contextualVarMatch = rest.match(/^\$(index|count|first|last|even|odd|event|any)\b/)
    if (contextualVarMatch) {
      tokens.push({ text: contextualVarMatch[0], type: 'variable' })
      index += contextualVarMatch[0].length
      continue
    }

    // 10. Numbers and units (e.g. 500ms, 300ms, 18, 0.1, 100)
    const numberMatch = rest.match(/^\b\d+(\.\d+)?(ms|s|px|rem|em|%)?\b/)
    if (numberMatch) {
      tokens.push({ text: numberMatch[0], type: 'number' })
      index += numberMatch[0].length
      continue
    }

    // 11. Booleans
    const boolMatch = rest.match(/^\b(true|false)\b/)
    if (boolMatch) {
      tokens.push({ text: boolMatch[0], type: 'boolean' })
      index += boolMatch[0].length
      continue
    }

    // 12. Keywords, Types, Hooks, Functions & Words
    const wordMatch = rest.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*/)
    if (wordMatch) {
      const word = wordMatch[0]
      const afterWord = rest.substring(word.length)

      if (KEYWORDS.has(word)) {
        tokens.push({ text: word, type: 'keyword' })
      } else if (TYPES.has(word) || /^[A-Z][a-zA-Z0-9]*Props$/.test(word) || /^[A-Z][a-zA-Z0-9]*State$/.test(word)) {
        tokens.push({ text: word, type: 'type' })
      } else if (HOOKS_AND_FRAMEWORK_FUNCS.has(word)) {
        tokens.push({ text: word, type: word.startsWith('use') ? 'hook' : 'function' })
      } else if (/^[A-Z][a-zA-Z0-9]*Component$/.test(word) || /^[A-Z][a-zA-Z0-9]*Directive$/.test(word) || /^[A-Z][a-zA-Z0-9]*Service$/.test(word)) {
        tokens.push({ text: word, type: 'type' })
      } else if (afterWord.startsWith('(')) {
        // Function/method call
        tokens.push({ text: word, type: 'function' })
      } else if (afterWord.match(/^\s*:/) && !afterWord.match(/^\s*:\s*[a-zA-Z]/)) {
        // Property in object literal
        tokens.push({ text: word, type: 'property' })
      } else if (afterWord.match(/^\s*=/)) {
        // Attribute or assigned variable
        tokens.push({ text: word, type: 'attr-name' })
      } else {
        tokens.push({ text: word, type: 'plain' })
      }

      index += word.length
      continue
    }

    // 13. Multi-character operators: =>, ===, !==, ==, !=, <=, >=, &&, ||, ??, ?.
    const multiOpMatch = rest.match(/^(=>|===|!==|==|!=|<=|>=|&&|\|\||\?\?|\?\.)/)
    if (multiOpMatch) {
      tokens.push({ text: multiOpMatch[0], type: 'operator' })
      index += multiOpMatch[0].length
      continue
    }

    // 14. Single-character operators & punctuation
    const char = rest[0]
    if ('=+-*/%&|^~<>!?:'.includes(char)) {
      tokens.push({ text: char, type: 'operator' })
      index += 1
      continue
    }

    if ('(){}[],.;'.includes(char)) {
      tokens.push({ text: char, type: 'punctuation' })
      index += 1
      continue
    }

    // 15. Fallback single character
    tokens.push({ text: char, type: 'plain' })
    index += 1
  }

  return {
    tokens,
    nextState: {
      inBlockComment,
      inHtmlComment,
      inBacktickString,
    },
  }
}

/**
 * Tokenizes entire multi-line code string into an array of CodeLine records with line numbers.
 */
export function tokenizeCode(code: string): CodeLine[] {
  const formatted = formatCode(code)
  if (!formatted) return []

  const lines = formatted.split(/\r?\n/)
  const codeLines: CodeLine[] = []
  let state: TokenizerState = {
    inBlockComment: false,
    inHtmlComment: false,
    inBacktickString: false,
  }

  lines.forEach((lineText, idx) => {
    const { tokens, nextState } = tokenizeLine(lineText, state)
    state = nextState
    codeLines.push({
      lineNumber: idx + 1,
      tokens: tokens.length > 0 ? tokens : [{ text: '', type: 'plain' }],
    })
  })

  return codeLines
}
