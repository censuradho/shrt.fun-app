import type { IApiErrorMessage } from "../types";

export const USER_ERROR_MESSAGES: Record<string, IApiErrorMessage> = {
  USERNAME_ALREADY_TAKEN: {
    description: 'O nome de usuário escolhido já está em uso. Por favor, escolha outro nome de usuário.'
  }
}