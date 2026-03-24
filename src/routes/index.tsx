import { paths } from "@/constants/routes";
import { SignInScreen } from "@/screens/public/signin";
import { SignUpScreen } from "@/screens/public/signUp";
import { Route, Routes } from "react-router";


export function AppRoutes () {
  return (
    <Routes>
      <Route path={paths.public.signin} element={<SignInScreen />} />
      <Route path={paths.public.signUp} element={<SignUpScreen />} />
    </Routes>
  )
}