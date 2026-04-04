import { AUTH_ERROR_MESSAGES } from "./auth/auth.errors";
import { URL_ERROR_MESSAGES } from "./url/errors";
import { USER_ERROR_MESSAGES } from "./user/user.errors";

export const API_ERROR_MESSAGES = {
  ...AUTH_ERROR_MESSAGES,
  ...URL_ERROR_MESSAGES,
  ...USER_ERROR_MESSAGES
}