import type { ProfileFormValues, FormErrors, FormTouched } from '../../types/forms.ts'
import { Icon } from '../common/Icon.tsx'

interface ProfileFormPlaygroundProps {
  values: ProfileFormValues
  touched: FormTouched<ProfileFormValues>
  errors: FormErrors<ProfileFormValues>
  isValid: boolean
  isDirty: boolean
  isAsyncValidating: boolean
  onFieldChange: <K extends keyof ProfileFormValues>(field: K, val: ProfileFormValues[K]) => void
  onFieldBlur: (field: keyof ProfileFormValues) => void
  onEmailChange: (index: number, val: string) => void
  onEmailBlur: (index: number) => void
  onAddEmail: () => void
  onRemoveEmail: (index: number) => void
  onReset: () => void
  onSubmit: (e: React.FormEvent) => void
}

export function ProfileFormPlayground({
  values,
  touched,
  errors,
  isValid,
  isDirty,
  isAsyncValidating,
  onFieldChange,
  onFieldBlur,
  onEmailChange,
  onEmailBlur,
  onAddEmail,
  onRemoveEmail,
  onReset,
  onSubmit,
}: ProfileFormPlaygroundProps) {
  return (
    <div className="form-playground-card">
      <form onSubmit={onSubmit} className="reactive-form-body" noValidate>
        {/* Username Field */}
        <div className={`form-control-group ${touched.username && errors.username ? 'has-error' : ''}`}>
          <label htmlFor="username-input" className="form-label">
            Username <span className="req-star">*</span>
          </label>
          <div className="input-with-indicator">
            <input
              id="username-input"
              type="text"
              className="text-input"
              placeholder="e.g. alex_dev (try 'admin' to trigger async collision)"
              value={values.username}
              onChange={(e) => onFieldChange('username', e.target.value)}
              onBlur={() => onFieldBlur('username')}
              aria-invalid={Boolean(touched.username && errors.username)}
              aria-describedby={errors.username ? 'username-error' : undefined}
            />
            {isAsyncValidating && (
              <span className="async-spinner-badge" title="Validating availability...">
                <Icon name="spinner" size={16} className="spin-icon" />
              </span>
            )}
          </div>
          {touched.username && errors.username && (
            <p id="username-error" className="field-error-msg" role="alert">
              {errors.username}
            </p>
          )}
          <span className="field-hint">Synchronous format check + simulated async availability validator.</span>
        </div>

        {/* Role Selector */}
        <div className="form-control-group">
          <label htmlFor="role-select" className="form-label">
            Engineering Role
          </label>
          <select
            id="role-select"
            className="select-input"
            value={values.role}
            onChange={(e) =>
              onFieldChange('role', e.target.value as ProfileFormValues['role'])
            }
          >
            <option value="developer">Frontend / Full-stack Developer</option>
            <option value="architect">Solutions Architect</option>
            <option value="designer">UI/UX Engineer</option>
            <option value="manager">Engineering Lead</option>
          </select>
        </div>

        {/* FormArray Email Collection */}
        <div className="form-control-group">
          <div className="array-header-row">
            <label className="form-label">
              Notification Emails (FormArray Equivalent)
            </label>
            <button
              type="button"
              className="add-array-btn"
              onClick={onAddEmail}
              aria-label="Add another email input"
            >
              + Add Email
            </button>
          </div>

          <div className="array-items-list">
            {values.emails.map((email, idx) => {
              const emailTouched = touched.emails?.[idx]
              const emailError = errors.emails?.[idx]

              return (
                <div key={idx} className="array-item-row">
                  <div className="input-col">
                    <input
                      type="email"
                      className={`text-input ${emailTouched && emailError ? 'input-error' : ''}`}
                      placeholder={`email_${idx + 1}@domain.com`}
                      value={email}
                      onChange={(e) => onEmailChange(idx, e.target.value)}
                      onBlur={() => onEmailBlur(idx)}
                      aria-label={`Notification Email ${idx + 1}`}
                    />
                    {emailTouched && emailError && (
                      <p className="field-error-msg">{emailError}</p>
                    )}
                  </div>

                  {values.emails.length > 1 && (
                    <button
                      type="button"
                      className="remove-array-btn"
                      onClick={() => onRemoveEmail(idx)}
                      title="Remove this email"
                      aria-label={`Remove email ${idx + 1}`}
                    >
                      ×
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Bio Textarea */}
        <div className={`form-control-group ${touched.bio && errors.bio ? 'has-error' : ''}`}>
          <label htmlFor="bio-input" className="form-label">
            Bio & Architecture Experience
          </label>
          <textarea
            id="bio-input"
            className="text-input textarea-input"
            rows={3}
            placeholder="Tell us about your Angular/React migrations..."
            value={values.bio}
            onChange={(e) => onFieldChange('bio', e.target.value)}
            onBlur={() => onFieldBlur('bio')}
          />
          {touched.bio && errors.bio && (
            <p className="field-error-msg">{errors.bio}</p>
          )}
          <span className="field-char-count">{values.bio.length} / 250</span>
        </div>

        {/* Newsletter Checkbox */}
        <div className="form-control-group checkbox-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={values.receiveNewsletter}
              onChange={(e) => onFieldChange('receiveNewsletter', e.target.checked)}
            />
            <span>Receive technical architectural migration digests</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="form-actions-row">
          <button
            type="submit"
            className="counter-btn"
            disabled={!isValid || isAsyncValidating}
          >
            Submit Form (Valid State Only)
          </button>
          <button
            type="button"
            className="reset-btn"
            onClick={onReset}
            disabled={!isDirty}
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  )
}
