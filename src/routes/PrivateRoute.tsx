import { paths } from "@/constants/routes";
import { useAuth } from "@/contexts/auth/auth.context";
import { Navigate, Outlet } from "react-router";

export function PrivateRoute () {
  const { supabaseUser } = useAuth()

  if (!supabaseUser) return <Navigate to={paths.public.signin} />
  
  return  <Outlet />;

}