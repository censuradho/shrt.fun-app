import { useMutation } from "@tanstack/react-query";
import { authGateway } from "./gateways/supabase.gateway";

export { authGateway } from "./gateways/supabase.gateway";
export type { AuthGateway, AuthSession, AuthUser, ApiError } from "./gateways/auth.gateway";
export { isApiError } from "./gateways/auth.gateway";

export function useResendConfirmationEmail () {
  return useMutation({
    mutationKey: ['resend-confirmation-email'],
    mutationFn: authGateway.resendConfirmationEmail,
  })
}

export const SUPABASE_ERROR_MESSAGES = {
  EMAIL_NOT_CONFIRMED: 'Email not confirmed',
  INVALID_EMAIL_OR_PASSWORD: 'Invalid login credentials',
  USER_ALREADY_EXISTS: 'User already exists',
  TOO_MANY_REQUESTS: 'Too many requests. Please try again later.',
  UNKNOWN_ERROR: 'An unknown error occurred. Please try again.',
}