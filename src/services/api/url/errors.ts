import type { IApiErrorMessage } from "../types";

export const URL_ERROR_MESSAGES: Record<string, IApiErrorMessage> = {
  SHORT_URL_ALREADY_EXISTS: {
    description: 'O slug personalizado que você escolheu já está em uso. Por favor, escolha outro slug ou deixe em branco para gerar um automaticamente.'
  },
  MONTHLY_LINK_LIMIT_REACHED: {
    description: 'Você atingiu o limite mensal de criação de links. Por favor, aguarde até o próximo mês para criar mais links ou considere atualizar para um plano premium para aumentar seu limite.'
  },
  DAILY_LINK_LIMIT_REACHED: {
    description: 'Você atingiu o limite diário de criação de links. Por favor, aguarde até amanhã para criar mais links ou considere atualizar para um plano premium para aumentar seu limite.'
  }
}