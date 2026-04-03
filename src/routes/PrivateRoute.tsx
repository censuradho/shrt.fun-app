import { PageLoader } from "@/components/PageLoader";
import { paths } from "@/constants/routes";
import { useAuth } from "@/contexts/auth/auth.context";
import { Navigate, Outlet } from "react-router";

export function PrivateRoute () {
  const { supabaseUser, isLoading, me } = useAuth()

  if (isLoading) return <PageLoader />

  if (!supabaseUser || !me ) return <Navigate to={paths.public.signin} />
  
  return  <Outlet />;

}