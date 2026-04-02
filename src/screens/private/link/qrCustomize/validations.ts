import { QRCodeCornersSquareStyleEnum, QRCodeDotStyleEnum } from "@/constants/qrCode";
import z from "zod";

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
  ]),
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
  centerLogo: z.string().optional(),
  watermarkLogo: z.boolean(),
})

export type QRCodeCustomizeFormData = z.infer<typeof qrCodeCustomizeValidations>