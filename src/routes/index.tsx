import { paths } from "@/constants/routes";
import { MainLayout } from "@/layout/main";
import { LinkListScreen } from "@/screens/private/link/list";
import { SignInScreen } from "@/screens/public/signin";
import { SignUpScreen } from "@/screens/public/signUp";
import { Route, Routes } from "react-router";
import { PrivateRoute } from "./PrivateRoute";
import { CreateLinkScreen } from "@/screens/private/link/create";
import { DetailLinkScreen } from "@/screens/private/link/details";
import { AnalyticsScreen } from "@/screens/private/analytics";
import { ForgotPasswordScreen } from "@/screens/public/forgotPassword";
import { ResetPasswordScreen } from "@/screens/public/resetPassword";
import { QrCodeCustomizeScreen } from "@/screens/private/link/qrCustomize";
import { UpdateLinkScreen } from "@/screens/private/link/update";


export function AppRoutes () {
  return (
    <Routes>
      <Route path={paths.public.signin} element={<SignInScreen />} />
      <Route path={paths.public.signUp} element={<SignUpScreen />} />
      <Route path={paths.public.forgotPassword} element={<ForgotPasswordScreen />} />
      <Route path={paths.public.resetPassword} element={<ResetPasswordScreen />} />

      <Route element={<PrivateRoute  />}>
        <Route path={paths.private.root} element={<MainLayout />}>
          <Route path={paths.private.link.list} element={<LinkListScreen />} />
          <Route path={paths.private.link.create} element={<CreateLinkScreen />} />
          <Route path={paths.private.link.details} element={<DetailLinkScreen />} />
          <Route path={paths.private.link.qrCustomize} element={<QrCodeCustomizeScreen />} />
          <Route path={paths.private.analytics} element={<AnalyticsScreen />} />
          <Route path={paths.private.link.update} element={<UpdateLinkScreen />} />
        </Route>
      </Route>
    </Routes>
  )
}