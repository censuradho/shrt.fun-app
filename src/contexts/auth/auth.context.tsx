import { PLANS_ENUM } from "@/constants/plans";
import type { AuthUser } from "@/lib/supabase";
import { authGateway } from "@/lib/supabase";
import { setApiToken } from "@/services/api";
import { useMeQuery } from "@/services/api/auth/queries";
import type { Me } from "@/services/api/auth/types";
import { paths } from "@/constants/routes";
import { useQueryClient, type QueryObserverResult, type RefetchOptions } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";

interface AuthContextValue {
  supabaseUser: AuthUser | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  me?: Me | null
  refetchMe?: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<Me, Error>>
  isFree?: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const queryClient = useQueryClient()

  const isInPrivateAppPath =
    location.pathname === paths.private.root ||
    location.pathname.startsWith(`${paths.private.root}/`)
  
  const [supabaseUser, setSupabaseUser] = useState<AuthUser | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [shouldAutoLoadMe, setShouldAutoLoadMe] = useState(true);

  const shouldEnableMeQuery = !!supabaseUser && isInPrivateAppPath && shouldAutoLoadMe

  const {
    data: me,
    isLoading: isMeLoading,
    isFetched: isMeFetched,
    refetch: refetchMe,
  } = useMeQuery(shouldEnableMeQuery);

  useEffect(() => {
    if (isMeFetched && shouldAutoLoadMe) setShouldAutoLoadMe(false)
  }, [isMeFetched, shouldAutoLoadMe])

  const isFree = me?.plan.name === PLANS_ENUM.FREE;

  useEffect(() => {
    authGateway.getUser()
      .then(user => setSupabaseUser(user))
      .finally(() => setIsLoading(false));
    const unsubscribe = authGateway.onAuthStateChange((event, session) => {
      setApiToken(session?.accessToken ?? null);
      
      if (event === 'SIGNED_OUT') {
        void queryClient.invalidateQueries()
        queryClient.clear()
        setSupabaseUser(null)
      };
    });

    return unsubscribe;
  }, []);

  async function signIn(email: string, password: string) {
    try {
      setIsLoading(true);
      const session = await authGateway.signInWithPassword(email, password);
      setSupabaseUser(session?.user ?? null);
      setApiToken(session?.accessToken ?? null);
    }  finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    await authGateway.signOut();
    await queryClient.invalidateQueries()
    queryClient.clear();
    setSupabaseUser(null);
    setApiToken(null);
    queryClient.clear();
  }

  return (
    <AuthContext.Provider 
      value={{ 
        supabaseUser, 
        isLoading: isLoading || (!!supabaseUser && isMeLoading),
        signIn, 
        signOut,
        me,
        refetchMe,
        isFree
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
