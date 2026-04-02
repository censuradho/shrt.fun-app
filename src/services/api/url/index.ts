import { api } from "..";
import type { CreateUrlRequestPayload, FindManyLinksQueries, FindManyUrlPaginated, QrCodePreviewRequestPayload, QrCodePreviewResponse, UrlNode } from "./types";

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

async function generateQrCodePreview (payload: QrCodePreviewRequestPayload) {
  const { data }  = await api.post<QrCodePreviewResponse>('/url/qrcode/preview', payload)

  return data
}

export const urlService = {
  findManyPaginated,
  create,
  toggleIsActive,
  getById,
  deleteById,
  generateQrCodePreview
}