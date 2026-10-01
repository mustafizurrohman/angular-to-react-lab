import { CodePane } from '../migration/CodePane.tsx'
import { useClipboard } from '../../hooks/useClipboard.ts'

const ANGULAR_REACTIVE_SNIPPET = `@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="username" />
      <div *ngIf="form.get('username')?.invalid && form.get('username')?.touched">
        Username is required (min 3 chars).
      </div>

      <div formArrayName="emails">
        <div *ngFor="let emailCtrl of emails.controls; let i = index">
          <input [formControlName]="i" />
          <button type="button" (click)="removeEmail(i)">Remove</button>
        </div>
      </div>
      <button type="button" (click)="addEmail()">+ Add Email</button>

      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  \`
})
export class ProfileFormComponent {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)], [this.checkUsernameAsync]],
    role: ['developer'],
    emails: this.fb.array([this.fb.control('', [Validators.required, Validators.email])]),
    receiveNewsletter: [true],
    bio: ['']
  });

  get emails() {
    return this.form.controls.emails;
  }

  addEmail() {
    this.emails.push(this.fb.control('', [Validators.required, Validators.email]));
  }

  removeEmail(index: number) {
    this.emails.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Submitted values:', this.form.getRawValue());
    }
  }
}`

const REACT_FORM_SNIPPET = `// Custom Reactive Form Hook adhering to SOLID principles
export function useReactiveForm() {
  const [values, setValues] = useState<ProfileFormValues>(INITIAL_VALUES);
  const [touched, setTouched] = useState<FormTouched<ProfileFormValues>>({});
  const [asyncError, setAsyncError] = useState<string | null>(null);

  // Pure validation engine (SRP)
  const syncErrors = useMemo(() => validateSync(values), [values]);
  
  // Pluggable async validation (DIP)
  useEffect(() => {
    const cancel = validateAsync(values.username, setAsyncError);
    return cancel;
  }, [values.username]);

  const isValid = Object.keys(syncErrors).length === 0 && !asyncError;

  const addEmail = () => setValues(v => ({ ...v, emails: [...v.emails, ''] }));
  const removeEmail = (idx: number) => setValues(v => ({
    ...v,
    emails: v.emails.filter((_, i) => i !== idx)
  }));

  return { values, touched, errors: { ...syncErrors, asyncError }, isValid, addEmail, removeEmail };
}`

export function FormArchitectureComparison() {
  const { copiedId, copyToClipboard } = useClipboard()

  return (
    <div className="architecture-comparison-card">
      <div className="code-comparison-grid">
        <CodePane
          label="🅰️ Angular Reactive Forms Architecture"
          labelClass="angular-label"
          code={ANGULAR_REACTIVE_SNIPPET}
          copyId="form-arch-angular"
          isCopied={copiedId === 'form-arch-angular'}
          onCopy={copyToClipboard}
        />
        <CodePane
          label="⚛️ React Composable Form Hook"
          labelClass="react-label"
          code={REACT_FORM_SNIPPET}
          copyId="form-arch-react"
          isCopied={copiedId === 'form-arch-react'}
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
            Validation logic is strictly decoupled from state storage and view rendering, enabling reusable standalone validator suites.
          </p>
        </div>

        <div className="solid-card">
          <div className="solid-card-header">
            <span className="solid-badge">OCP</span>
            <span className="solid-title">Open/Closed Principle</span>
          </div>
          <p className="solid-desc">
            New custom field validators or async remote checks can be composed dynamically without altering core input controls.
          </p>
        </div>

        <div className="solid-card">
          <div className="solid-card-header">
            <span className="solid-badge">DIP</span>
            <span className="solid-title">Dependency Inversion Principle</span>
          </div>
          <p className="solid-desc">
            Form state engine consumes abstract validator functions and async verification contracts rather than hardcoded endpoint logic.
          </p>
        </div>
      </div>
    </div>
  )
}
