import { AUTH_ERROR_MESSAGES } from "./auth/auth.errors";
import { URL_ERROR_MESSAGES } from "./url/errors";

export const API_ERROR_MESSAGES = {
  ...AUTH_ERROR_MESSAGES,
  ...URL_ERROR_MESSAGES,
}