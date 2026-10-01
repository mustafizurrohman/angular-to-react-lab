import { useReactiveForm } from '../hooks/useReactiveForm.ts'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import { PageHeader } from '../components/common/PageHeader.tsx'
import { SectionHeader } from '../components/common/SectionHeader.tsx'
import { ProfileFormPlayground } from '../components/forms/ProfileFormPlayground.tsx'
import { FormStateInspector } from '../components/forms/FormStateInspector.tsx'
import { FormArchitectureComparison } from '../components/forms/FormArchitectureComparison.tsx'
import './Pages.css'

export function FormsLab() {
  useDocumentTitle('Forms & Validation')

  const {
    values,
    touched,
    errors,
    isValid,
    isDirty,
    isAsyncValidating,
    submissionHistory,
    handleFieldChange,
    handleFieldBlur,
    handleEmailChange,
    handleEmailBlur,
    addEmail,
    removeEmail,
    resetForm,
    handleSubmit,
  } = useReactiveForm()

  return (
    <div className="page-wrapper">
      <PageHeader
        title="Reactive Forms & Validation Lab"
        subtitle={
          <>
            Explore complex form structures, dynamic collections (<code>FormArray</code>), cross-field sync validation, and debounce-based async checks—contrasting Angular&apos;s <code>ReactiveFormsModule</code> with React&apos;s composable typed hook pipelines.
          </>
        }
      />

      <div className="lab-section">
        <SectionHeader
          title="1. Interactive Form Playground & Live Validation Engine"
          description="Try typing in the inputs, adding and removing dynamic emails, and testing username validation (try entering 'admin' to trigger the async collision validator)."
        />

        <div className="state-playground form-playground-grid">
          <ProfileFormPlayground
            values={values}
            touched={touched}
            errors={errors}
            isValid={isValid}
            isDirty={isDirty}
            isAsyncValidating={isAsyncValidating}
            onFieldChange={handleFieldChange}
            onFieldBlur={handleFieldBlur}
            onEmailChange={handleEmailChange}
            onEmailBlur={handleEmailBlur}
            onAddEmail={addEmail}
            onRemoveEmail={removeEmail}
            onReset={resetForm}
            onSubmit={handleSubmit}
          />

          <FormStateInspector
            values={values}
            errors={errors}
            touched={touched}
            isValid={isValid}
            isDirty={isDirty}
            isAsyncValidating={isAsyncValidating}
            submissionHistory={submissionHistory}
          />
        </div>
      </div>

      <div className="lab-section" style={{ marginTop: '2.5rem' }}>
        <SectionHeader
          title="2. Architectural Comparison: Reactive Forms & SOLID Principles"
          description="Notice how both Angular and React decouple validation rules from UI rendering (SRP), support pluggable validator extensions (OCP), and rely on abstract verification contracts (DIP)."
        />

        <FormArchitectureComparison />
      </div>
    </div>
  )
}
