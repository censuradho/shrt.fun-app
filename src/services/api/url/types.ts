import type { QRCodeCornersDotStyle, QRCodeCornersSquareStyle, QRCodeDotsStyle } from "@/constants/qrCode";
import type { CursorPaginationParams, CursorPaginationResult } from "../types";

export interface FindManyLinksQueries extends CursorPaginationParams {
  isActive?: string
  search?: string
  createdBefore?: string
  createdAfter?: string
}

export interface CreateUrlRequestPayload {
  url: string
  slug?: string | null
  title?: string | null
  generateQrCode?: boolean
  qrOptions?: {
    dotsColor?: string
  }
}

export interface UrlNode {
  id: string
  originalUrl: string
  shortUrl: string
  hitsCount: number
  isActive: boolean
  title?: string
  description?: string
  expireAt?: string
  createdAt: string
  updatedAt: string
  hasQrCode?: boolean
  qrCodeOptions: {
    dotsColor: string
  }
}

export type FindManyUrlPaginated = CursorPaginationResult<UrlNode>

export interface QrCodePreviewRequestPayload {
  dotsColor: string
}
export interface QrCodePreviewResponse {
  qrCode: string
}

export interface CustomizeQRCodeRequestPayload {
  dotsStyle?: QRCodeDotsStyle
  dotsColor?: string
  backgroundColor?: string
  cornersSquareStyle?: QRCodeCornersSquareStyle
  cornersDotStyle?: QRCodeCornersDotStyle
  /**base64*/
  centerLogo?: string
  /**base64*/
  watermarkLogo?: string  
}