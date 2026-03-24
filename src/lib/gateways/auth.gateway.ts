export interface ApiError {
  status: number
  message: string
}

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'message' in error &&
    typeof (error as ApiError).status === 'number'
  )
}

export interface AuthUser {
  id: string
  email: string | undefined
}

export interface AuthSession {
  accessToken: string
  refreshToken: string
  user: AuthUser
}

export type AuthStateEvent = "SIGNED_IN" | "SIGNED_OUT" | "TOKEN_REFRESHED" | "USER_UPDATED"

export type AuthStateChangeCallback = (event: AuthStateEvent, session: AuthSession | null) => void

export type Unsubscribe = () => void

export interface AuthGateway {
  signIn(email: string, password: string): Promise<AuthSession>
  signUp(email: string, password: string): Promise<AuthUser>
  signOut(): Promise<void>
  getSession(): Promise<AuthSession | null>
  onAuthStateChange(callback: AuthStateChangeCallback): Unsubscribe
  resendConfirmationEmail(email: string): Promise<void>
}
