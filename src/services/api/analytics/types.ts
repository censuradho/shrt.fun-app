import type { OffsetPaginationResult } from "../types"

export interface HitsCountByLocation {
  clicks: number
  country?: string | null
  city?: string | null
}
export type FindHistCountByLocationResponse = HitsCountByLocation[]

export interface LocationClicksItem {
  name: string | null
  clicks: number
}

export type  TopMostAccessedUrlResponse = Array<{
  shortUrl: string;
  originalUrl: string;
  hitsCount: number;
  title?: string
}>

export type TopMostAccessedUrlDetailResponse = Array<TopMostAccessedUrlResponse[number] & {
  city?: string | null
  country?: string | null
  device?: string | null
  os?: string | null
}>

export interface TopMostAccessedUrlsQuery {
  limit?: number
  isActive?: boolean
}

export type ReferrerDistributionResponse = Array<{
  referrer: string | null;
  hitsCount: number;
}>

export type FindHitsByCityResponse = OffsetPaginationResult<LocationClicksItem>
export type FindHitsByCountryResponse = OffsetPaginationResult<LocationClicksItem>
