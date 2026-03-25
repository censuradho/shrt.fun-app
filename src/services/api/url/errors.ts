import type { IApiErrorMessage } from "../types";

export const URL_ERROR_MESSAGES: Record<string, IApiErrorMessage> = {
  SHORT_URL_ALREADY_EXISTS: {
    description: 'O slug personalizado que você escolheu já está em uso. Por favor, escolha outro slug ou deixe em branco para gerar um automaticamente.'
  }
}