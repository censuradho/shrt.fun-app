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
export interface AuthClaims {
  iss: string
  sub: string
  aud: string
  exp: number
  iat: number
  email: string
  phone: string
  app_metadata: {
    provider: string
    providers: string[]
  }
  user_metadata: {
    email: string
    email_verified: boolean
    phone_verified: boolean
    sub: string
  }
  role: string
  aal: string
  amr: { method: string; timestamp: number }[]
  session_id: string
  is_anonymous: boolean
}

export interface AuthGateway {
  signInWithPassword(email: string, password: string): Promise<AuthSession>
  signUp(email: string, password: string): Promise<AuthUser>
  signOut(): Promise<void>
  getClaims(): Promise<AuthClaims | null>
  getUser(): Promise<AuthUser | null>
  onAuthStateChange(callback: AuthStateChangeCallback): Unsubscribe
  resendConfirmationEmail(email: string): Promise<void>
}
