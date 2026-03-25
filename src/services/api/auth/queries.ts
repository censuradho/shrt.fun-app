import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "./auth.service";

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