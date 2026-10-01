import { useState, useCallback, useEffect } from 'react'
import type {
  ProfileFormValues,
  FormErrors,
  FormTouched,
  FormSubmissionResult,
} from '../types/forms.ts'

const INITIAL_VALUES: ProfileFormValues = {
  username: '',
  role: 'developer',
  emails: ['user@example.com'],
  receiveNewsletter: true,
  bio: '',
}

export function useReactiveForm() {
  const [values, setValues] = useState<ProfileFormValues>(INITIAL_VALUES)
  const [touched, setTouched] = useState<FormTouched<ProfileFormValues>>({
    username: false,
    role: false,
    emails: [false],
    receiveNewsletter: false,
    bio: false,
  })
  const [asyncError, setAsyncError] = useState<string | null>(null)
  const [isAsyncValidating, setIsAsyncValidating] = useState(false)
  const [submissionHistory, setSubmissionHistory] = useState<FormSubmissionResult[]>([])
  const [submitAttempted, setSubmitAttempted] = useState(false)

  // Synchronous Validation Engine (SRP: Pure validation rule application)
  const computeSyncErrors = useCallback((vals: ProfileFormValues): FormErrors<ProfileFormValues> => {
    const errs: FormErrors<ProfileFormValues> = {}

    // Username validation
    if (!vals.username.trim()) {
      errs.username = 'Username is required.'
    } else if (vals.username.trim().length < 3) {
      errs.username = 'Username must be at least 3 characters.'
    } else if (!/^[a-zA-Z0-9_]+$/.test(vals.username.trim())) {
      errs.username = 'Username can only contain letters, numbers, and underscores.'
    }

    // Emails (FormArray validation)
    const emailErrors: (string | undefined)[] = []
    let hasEmailErrors = false
    vals.emails.forEach((email, idx) => {
      if (!email.trim()) {
        emailErrors[idx] = 'Email address cannot be empty.'
        hasEmailErrors = true
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        emailErrors[idx] = 'Invalid email address format.'
        hasEmailErrors = true
      } else {
        emailErrors[idx] = undefined
      }
    })
    if (hasEmailErrors) {
      errs.emails = emailErrors
    }

    // Bio validation
    if (vals.bio && vals.bio.length > 250) {
      errs.bio = 'Bio cannot exceed 250 characters.'
    }

    return errs
  }, [])

  const syncErrors = computeSyncErrors(values)

  // Asynchronous Validation (Simulating Angular AsyncValidatorFn for username availability)
  useEffect(() => {
    const rawUsername = values.username.trim().toLowerCase()
    if (!rawUsername || rawUsername.length < 3) {
      return
    }

    const timer = window.setTimeout(() => {
      // Reserved usernames for demonstration
      const reserved = ['admin', 'root', 'superuser', 'angular', 'react']
      if (reserved.includes(rawUsername)) {
        setAsyncError(`Username "${rawUsername}" is already taken. Try another name.`)
      } else {
        setAsyncError(null)
      }
      setIsAsyncValidating(false)
    }, 450)

    return () => {
      window.clearTimeout(timer)
    }
  }, [values.username])

  const errors: FormErrors<ProfileFormValues> = {
    ...syncErrors,
    username: syncErrors.username || asyncError || undefined,
  }

  const isValid =
    Object.keys(syncErrors).length === 0 && !asyncError && !isAsyncValidating

  const isDirty = JSON.stringify(values) !== JSON.stringify(INITIAL_VALUES)

  // Actions
  const handleFieldChange = useCallback(
    <K extends keyof ProfileFormValues>(field: K, val: ProfileFormValues[K]) => {
      setValues((prev) => ({ ...prev, [field]: val }))
      if (field === 'username') {
        const raw = String(val).trim().toLowerCase()
        if (raw.length >= 3) {
          setIsAsyncValidating(true)
        } else {
          setIsAsyncValidating(false)
          setAsyncError(null)
        }
      }
    },
    []
  )

  const handleFieldBlur = useCallback((field: keyof ProfileFormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }, [])

  const handleEmailChange = useCallback((index: number, val: string) => {
    setValues((prev) => {
      const nextEmails = [...prev.emails]
      nextEmails[index] = val
      return { ...prev, emails: nextEmails }
    })
  }, [])

  const handleEmailBlur = useCallback((index: number) => {
    setTouched((prev) => {
      const nextEmailTouched = [...(prev.emails ?? [])]
      nextEmailTouched[index] = true
      return { ...prev, emails: nextEmailTouched }
    })
  }, [])

  const addEmail = useCallback(() => {
    setValues((prev) => ({ ...prev, emails: [...prev.emails, ''] }))
    setTouched((prev) => ({ ...prev, emails: [...(prev.emails ?? []), false] }))
  }, [])

  const removeEmail = useCallback((index: number) => {
    setValues((prev) => {
      if (prev.emails.length <= 1) return prev
      return { ...prev, emails: prev.emails.filter((_, i) => i !== index) }
    })
    setTouched((prev) => {
      if ((prev.emails ?? []).length <= 1) return prev
      return { ...prev, emails: (prev.emails ?? []).filter((_, i) => i !== index) }
    })
  }, [])

  const resetForm = useCallback(() => {
    setValues(INITIAL_VALUES)
    setTouched({
      username: false,
      role: false,
      emails: [false],
      receiveNewsletter: false,
      bio: false,
    })
    setAsyncError(null)
    setIsAsyncValidating(false)
    setSubmitAttempted(false)
  }, [])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setSubmitAttempted(true)

      // Mark all touched
      setTouched({
        username: true,
        role: true,
        emails: values.emails.map(() => true),
        receiveNewsletter: true,
        bio: true,
      })

      if (isValid) {
        const newRecord: FormSubmissionResult = {
          timestamp: new Date().toLocaleTimeString(),
          data: { ...values },
        }
        setSubmissionHistory((prev) => [newRecord, ...prev.slice(0, 9)])
      }
    },
    [isValid, values]
  )

  return {
    values,
    touched,
    errors,
    isValid,
    isDirty,
    isAsyncValidating,
    submitAttempted,
    submissionHistory,
    handleFieldChange,
    handleFieldBlur,
    handleEmailChange,
    handleEmailBlur,
    addEmail,
    removeEmail,
    resetForm,
    handleSubmit,
  }
}
