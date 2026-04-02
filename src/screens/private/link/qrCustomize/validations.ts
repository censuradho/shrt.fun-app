import { QRCodeCornersSquareStyleEnum, QRCodeDotStyleEnum } from "@/constants/qrCode";
import { base64MaxSize } from "@/utils/base64MaxSize";
import z from "zod";
const MAX_CENTER_LOGO_SIZE = base64MaxSize(2 * 1024 * 1024) // 2MB

export const qrCodeCustomizeValidations = z.object({
  dotsStyle: z.enum([
    QRCodeDotStyleEnum.SQUARE,
    QRCodeDotStyleEnum.ROUNDED,
    QRCodeDotStyleEnum.DOTS,
    QRCodeDotStyleEnum.CLASSY,
    QRCodeDotStyleEnum.CLASSY_ROUNDED,
    QRCodeDotStyleEnum.EXTRA_ROUNDED,
    QRCodeDotStyleEnum.MIXED,
    QRCodeDotStyleEnum.FLUID,
  ]).optional(),
  dotsColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Cor inválida").optional(),
  backgroundColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Cor inválida").optional(),
  cornersSquareStyle: z.enum([
    QRCodeCornersSquareStyleEnum.DOT,
    QRCodeCornersSquareStyleEnum.SQUARE,
    QRCodeCornersSquareStyleEnum.EXTRA_ROUNDED,
  ]).optional(),
  cornersDotStyle: z.enum([
    QRCodeCornersSquareStyleEnum.DOT,
    QRCodeCornersSquareStyleEnum.SQUARE,
  ]).optional(),
  centerLogo: z
    .string()
    .regex(/^data:image\/(png|jpeg|jpg);base64,[A-Za-z0-9+/]+=*$/, "Formato de imagem inválido")
    .max(MAX_CENTER_LOGO_SIZE, 'O logo deve ser menor que 2MB')
    .optional(),
  hasWaterMark: z.boolean().optional(),
})

export type QRCodeCustomizeFormData = z.infer<typeof qrCodeCustomizeValidations>