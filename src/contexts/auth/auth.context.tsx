import { paths } from "@/constants/routes";
import type { AuthUser } from "@/lib/supabase";
import { authGateway } from "@/lib/supabase";
import { setApiToken } from "@/services/api";
import { useMeQuery } from "@/services/api/auth/queries";
import type { Me } from "@/services/api/auth/types";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface AuthContextValue {
  supabaseUser: AuthUser | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  me?: Me | null
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const [supabaseUser, setSupabaseUser] = useState<AuthUser | null>(null);
  const queryClient = useQueryClient()
  
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: me,
    isLoading: isMeLoading,
    refetch
  } = useMeQuery(!!supabaseUser);

  useEffect(() => {
    authGateway.getUser()
      .then(user => setSupabaseUser(user))
      .finally(() => setIsLoading(false));

    const unsubscribe = authGateway.onAuthStateChange((event, session) => {
      setApiToken(session?.accessToken ?? null);
      
      if (event === 'SIGNED_OUT') setSupabaseUser(null);
    });

    return unsubscribe;
  }, []);

  async function signIn(email: string, password: string) {
    try {
      setIsLoading(true);
      const session = await authGateway.signInWithPassword(email, password);
      setSupabaseUser(session?.user ?? null);
      setApiToken(session?.accessToken ?? null);
      refetch().then(() => {
        navigate(paths.private.link.list)
      })
    }  finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    await authGateway.signOut();
    setSupabaseUser(null);
    setApiToken(null);
    queryClient.clear();
  }

  useEffect(() => {
    if (!me?.id) return

    navigate(paths.private.link.list)
  }, [me?.id])

  return (
    <AuthContext.Provider 
      value={{ 
        supabaseUser, 
        isLoading: isLoading || (!!supabaseUser && isMeLoading),
        signIn, 
        signOut,
        me
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
