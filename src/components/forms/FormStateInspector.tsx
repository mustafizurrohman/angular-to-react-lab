import type {
  ProfileFormValues,
  FormErrors,
  FormTouched,
  FormSubmissionResult,
} from '../../types/forms.ts'

interface FormStateInspectorProps {
  values: ProfileFormValues
  errors: FormErrors<ProfileFormValues>
  touched: FormTouched<ProfileFormValues>
  isValid: boolean
  isDirty: boolean
  isAsyncValidating: boolean
  submissionHistory: FormSubmissionResult[]
}

export function FormStateInspector({
  values,
  errors,
  touched,
  isValid,
  isDirty,
  isAsyncValidating,
  submissionHistory,
}: FormStateInspectorProps) {
  const formStatus = isAsyncValidating
    ? 'VALIDATING (PENDING)'
    : isValid
    ? 'VALID'
    : 'INVALID'

  return (
    <div className="inspector-box form-inspector-box">
      <div className="inspector-header-status">
        <h3>Form State Model Inspector</h3>
        <span
          className={`status-pill ${
            isAsyncValidating ? 'pending' : isValid ? 'valid' : 'invalid'
          }`}
        >
          {formStatus}
        </span>
      </div>

      <div className="state-flags-bar">
        <span className="flag-item">
          <strong>dirty:</strong> {String(isDirty)}
        </span>
        <span className="flag-item">
          <strong>valid:</strong> {String(isValid)}
        </span>
        <span className="flag-item">
          <strong>pending:</strong> {String(isAsyncValidating)}
        </span>
      </div>

      <div className="inspector-tabs-body">
        <h4>Live Reactive Model (JSON):</h4>
        <pre className="json-inspector">
          {JSON.stringify(
            {
              values,
              errors,
              touched,
            },
            null,
            2
          )}
        </pre>

        {submissionHistory.length > 0 && (
          <div className="submissions-section">
            <h4>Recent Submissions ({submissionHistory.length}):</h4>
            <div className="submissions-list">
              {submissionHistory.map((sub, idx) => (
                <div key={idx} className="submission-history-item">
                  <div className="sub-header">
                    <span className="sub-time">{sub.timestamp}</span>
                    <span className="sub-user">{sub.data.username}</span>
                  </div>
                  <div className="sub-details">
                    Role: {sub.data.role} | Emails: {sub.data.emails.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
