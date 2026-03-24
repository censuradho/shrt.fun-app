import type { IApiErrorMessage } from "../types";

export const AUTH_ERROR_MESSAGES: Record<string, IApiErrorMessage> = {
  USER_ALREADY_EXISTS: {
    description: 'Já existe um usuário cadastrado com este e-mail. Por favor, tente novamente com um e-mail diferente.'
  }
}