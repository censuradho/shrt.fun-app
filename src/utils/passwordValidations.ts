export const hasUppercaseCharacter = (value: string) => /[A-Z]/.test(value)

export const hasLowercaseCharacter = (value: string) => /[a-z]/.test(value)

export const hasNumber = (value: string) => /[0-9]/.test(value)

export const hasSpecialCharacter = (value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value)

export const hasMinLength = (value: string, minLength: number) => value.length >= minLength