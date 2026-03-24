import { createContext, useContext, useEffect, useState } from "react";
import { authGateway } from "@/lib/supabase";
import type { AuthSession, AuthUser } from "@/lib/supabase";
import { setApiToken } from "@/services/api";

interface AuthContextValue {
  user: AuthUser | null
  session: AuthSession | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authGateway.getSession().then((session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    const unsubscribe = authGateway.onAuthStateChange((_, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setApiToken(session?.accessToken ?? null);
    });

    return unsubscribe;
  }, []);

  async function signIn(email: string, password: string) {
    const session = await authGateway.signIn(email, password);
    setSession(session);
    setUser(session.user);
    setApiToken(session?.accessToken ?? null);
  }

  async function signOut() {
    await authGateway.signOut();
    setSession(null);
    setUser(null);
    setApiToken(null);
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        session, 
        isLoading, 
        signIn, 
        signOut 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
