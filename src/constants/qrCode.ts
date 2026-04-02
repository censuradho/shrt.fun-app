
export const QRCodeDotStyleEnum = {
  SQUARE: 'square',
  ROUNDED: 'rounded',
  DOTS: 'dots',
  CLASSY: 'classy',
  CLASSY_ROUNDED: 'classy-rounded',
  EXTRA_ROUNDED: 'extra-rounded',
  MIXED: 'mixed',
  FLUID: 'fluid',
} as const

export type QRCodeDotsStyle = typeof QRCodeDotStyleEnum[keyof typeof QRCodeDotStyleEnum]

export const QRCodeCornersSquareStyleEnum = {
  DOT: 'dot',
  SQUARE: 'square',
  EXTRA_ROUNDED: 'extra-rounded',
} as const

export const QRCodeCornersDotStyleEnum = {
  DOT: 'dot',
  SQUARE: 'square',
} as const

export type QRCodeCornersSquareStyle = typeof QRCodeCornersSquareStyleEnum[keyof typeof QRCodeCornersSquareStyleEnum]

export type QRCodeCornersDotStyle = typeof QRCodeCornersDotStyleEnum[keyof typeof QRCodeCornersDotStyleEnum]