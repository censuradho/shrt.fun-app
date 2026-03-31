import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "./auth.service";
import { authGateway } from "@/lib/supabase";

export const useSignUpMutation = () => {
  return useMutation({
    mutationKey: ["auth", "sign-up"],
    mutationFn: authService.signUp,
  })
}

export const useMeQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: authService.me,
    enabled,
  })
}

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationKey: ["auth", "reset-password"],
    mutationFn: ({
      email, 
      options
    }: {
      email: string, options?: { redirectTo?: string }
    }) => authGateway.resetPasswordForEmail(email, options),
  })
}