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
}
