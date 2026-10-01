export interface ProfileFormValues {
  username: string
  role: 'developer' | 'architect' | 'designer' | 'manager'
  emails: string[]
  receiveNewsletter: boolean
  bio: string
}

export type FormErrors<T> = {
  [K in keyof T]?: T[K] extends unknown[] ? (string | undefined)[] : string
}

export type FormTouched<T> = {
  [K in keyof T]?: T[K] extends unknown[] ? boolean[] : boolean
}

export interface ValidatorFn<T> {
  (value: T, formValues?: ProfileFormValues): string | null
}

export interface AsyncValidatorFn<T> {
  (value: T): Promise<string | null>
}

export interface FormSubmissionResult {
  timestamp: string
  data: ProfileFormValues
}
