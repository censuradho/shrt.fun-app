import { useMutation } from "@tanstack/react-query";
import { authService } from "./auth.service";

export const useSignUpMutation = () => {
  return useMutation({
    mutationKey: ["auth", "sign-up"],
    mutationFn: authService.signUp,
  })
}