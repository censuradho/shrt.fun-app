import { paths } from "@/constants/routes";
import { MainLayout } from "@/layout/main";
import { LinkListScreen } from "@/screens/private/link/list";
import { SignInScreen } from "@/screens/public/signin";
import { SignUpScreen } from "@/screens/public/signUp";
import { Route, Routes } from "react-router";
import { PrivateRoute } from "./PrivateRoute";
import { CreateLinkScreen } from "@/screens/private/link/create";


export function AppRoutes () {
  return (
    <Routes>
      <Route path={paths.public.signin} element={<SignInScreen />} />
      <Route path={paths.public.signUp} element={<SignUpScreen />} />


      <Route element={<PrivateRoute  />}>
        <Route path={paths.private.root} element={<MainLayout />}>
          <Route path={paths.private.link.list} element={<LinkListScreen />} />
          <Route path={paths.private.link.create} element={<CreateLinkScreen />} />
        </Route>
      </Route>
    </Routes>
  )
}