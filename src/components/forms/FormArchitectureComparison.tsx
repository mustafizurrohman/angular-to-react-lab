import { CodePane } from '../migration/CodePane.tsx'
import { useClipboard } from '../../hooks/useClipboard.ts'

const ANGULAR_REACTIVE_SNIPPET = `@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="form-field">
        <label>Username</label>
        <input formControlName="username" />
        <span class="err" *ngIf="form.controls.username.errors?.['required']">
          Username is required.
        </span>
        <span class="err" *ngIf="form.controls.username.errors?.['minlength']">
          Minimum 3 characters required.
        </span>
        <span class="err" *ngIf="form.controls.username.errors?.['userTaken']">
          Username is already registered.
        </span>
      </div>

      <div formArrayName="emails" class="emails-array">
        <label>Email Addresses</label>
        <div *ngFor="let emailCtrl of emails.controls; let i = index" class="email-row">
          <input [formControlName]="i" placeholder="user@example.com" />
          <button type="button" (click)="removeEmail(i)">Remove</button>
        </div>
        <button type="button" (click)="addEmail()">+ Add Another Email</button>
      </div>

      <button type="submit" [disabled]="form.invalid || form.pending">
        {{ form.pending ? 'Validating...' : 'Submit Profile' }}
      </button>
    </form>
  \`
})
export class ProfileFormComponent {
  private fb = inject(NonNullableFormBuilder);
  private userService = inject(UserService);

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)], [this.checkUsernameAsync()]],
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

  private checkUsernameAsync(): AsyncValidatorFn {
    return (control) => this.userService.checkUsername(control.value).pipe(
      map(isTaken => isTaken ? { userTaken: true } : null),
      catchError(() => of(null))
    );
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Submitted values:', this.form.getRawValue());
    }
  }
}`

const REACT_FORM_SNIPPET = `import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Decoupled Zod Validation Schema (SRP)
export const profileSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .refine(async (val) => {
      const isAvailable = await checkUsernameAvailable(val);
      return isAvailable;
    }, 'Username is already registered'),
  role: z.enum(['developer', 'designer', 'manager']),
  emails: z
    .array(z.string().email('Valid email address required'))
    .min(1, 'At least one email is required'),
  receiveNewsletter: z.boolean().default(true),
  bio: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileFormPlayground({ onSubmitSuccess }: { onSubmitSuccess: (data: ProfileFormValues) => void }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: 'onBlur',
    defaultValues: {
      username: '',
      role: 'developer',
      emails: [''],
      receiveNewsletter: true,
      bio: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'emails',
  });

  const onSubmit = async (values: ProfileFormValues) => {
    await saveProfile(values);
    onSubmitSuccess(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field">
        <label>Username</label>
        <input {...register('username')} />
        {errors.username && <span className="err">{errors.username.message}</span>}
      </div>

      <div className="emails-array">
        <label>Email Addresses</label>
        {fields.map((field, idx) => (
          <div key={field.id} className="email-row">
            <input {...register(\`emails.\${idx}\` as const)} placeholder="user@example.com" />
            <button type="button" onClick={() => remove(idx)}>Remove</button>
            {errors.emails?.[idx] && <span className="err">{errors.emails[idx]?.message}</span>}
          </div>
        ))}
        <button type="button" onClick={() => append('')}>+ Add Another Email</button>
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Validating...' : 'Submit Profile'}
      </button>
    </form>
  );
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
          label="⚛️ React Composable Form Hook (RHF + Zod)"
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
