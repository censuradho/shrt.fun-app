import { PageLoader } from "@/components/PageLoader";
import { paths } from "@/constants/routes";
import { useAuth } from "@/contexts/auth/auth.context";
import { Navigate, Outlet } from "react-router";

export function PrivateRoute () {
  const { supabaseUser, isLoading } = useAuth()

  if (isLoading) return <PageLoader />

  if (!supabaseUser) return <Navigate to={paths.public.signin} />
  
  return  <Outlet />;

}