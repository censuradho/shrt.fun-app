export const PLANS_ENUM = {
  GROWTH: 'GROWTH',
  FREE: 'FREE',
} as const

export type PLANS = typeof PLANS_ENUM[keyof typeof PLANS_ENUM]

export const PLANS_LABELS = {
  GROWTH: 'Plano Growth (Em breve)',
  FREE: 'Plano Free (Grátis)',
}