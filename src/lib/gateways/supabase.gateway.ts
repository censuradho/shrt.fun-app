import { createClient } from "@supabase/supabase-js";
import type { AuthGateway, AuthSession, AuthStateChangeCallback, AuthStateEvent, AuthUser, Unsubscribe } from "./auth.gateway";

const client = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_APP_SUPABASE_ANON_KEY
);

class SupabaseGateway implements AuthGateway {
  resendConfirmationEmail(email: string): Promise<void>

  async resendConfirmationEmail(email: string): Promise<void> {
    const { error } = await client.auth.resend({ email, type: 'signup' });
    if (error) throw error;
  }

  async signIn(email: string, password: string): Promise<AuthSession> {
    const { data, error } = await client.auth.signInWithPassword({ email, password });

    if (error) throw error;

    return {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      user: { id: data.user.id, email: data.user.email },
    };
  }

  async signUp(email: string, password: string): Promise<AuthUser> {
    const { data, error } = await client.auth.signUp({ email, password });

    if (error) throw error;
    if (!data.user) throw new Error("Sign up failed");

    return { id: data.user.id, email: data.user.email };
  }

  async signOut(): Promise<void> {
    const { error } = await client.auth.signOut();
    if (error) throw error;
  }

  async getSession(): Promise<AuthSession | null> {
    const { data, error } = await client.auth.getSession();

    if (error) throw error;
    if (!data.session) return null;

    return {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      user: { id: data.session.user.id, email: data.session.user.email },
    };
  }

  onAuthStateChange(callback: AuthStateChangeCallback): Unsubscribe {
    const { data } = client.auth.onAuthStateChange((event, session) => {
      const mapped = session ? {
        accessToken: session.access_token,
        refreshToken: session.refresh_token,
        user: { id: session.user.id, email: session.user.email },
      } : null;

      callback(event as AuthStateEvent, mapped);
    });

    return () => data.subscription.unsubscribe();
  }
}

export const authGateway: AuthGateway = new SupabaseGateway();
