import { api } from "..";
import type { CreateUrlRequestPayload, FindManyLinksQueries, FindManyUrlPaginated, QrCodePreviewRequestPayload, QrCodePreviewResponse, UpdateUrlRequestPayload, UrlNode } from "./types";

function findManyPaginated (queries: FindManyLinksQueries) {
  return api.get<FindManyUrlPaginated>('/url', {
    params: queries
  })
}

function create (payload: CreateUrlRequestPayload) {
  return api.post<{ shortUrl: string }>('/url', payload)
}

function toggleIsActive (id: string) {
  return api.patch(`/url/${id}/active`)
}


async function getById (id: string) {
  const { data } = await api.get<UrlNode>(`/url/${id}`)
  return data
}

function deleteById (id: string) {
  return api.delete(`/url/${id}`)
}

async function update (id: string, payload: UpdateUrlRequestPayload) {
  const { data } = await api.put(`/url/${id}`, payload)
  return data
}

async function generateQrCodePreview (payload: QrCodePreviewRequestPayload) {
  const { data }  = await api.post<QrCodePreviewResponse>('/url/qrcode/preview', payload)

  return data
}

async function getQrCode (urlId: string) {
  const { data }  = await api.get<{ qrCode: string }>(`/url/${urlId}/qrcode`)

  return data
}

async function customizeQRCode (urlId: string, payload: QrCodePreviewRequestPayload) {
  const { data }  = await api.patch(`/url/${urlId}/qrcode`, payload)

  return data

}

export const urlService = {
  findManyPaginated,
  create,
  update,
  toggleIsActive,
  getById,
  deleteById,
  generateQrCodePreview,
  getQrCode,
  customizeQRCode
}