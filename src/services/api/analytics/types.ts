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


export type FindHitsByCityResponse = OffsetPaginationResult<LocationClicksItem>
export type FindHitsByCountryResponse = OffsetPaginationResult<LocationClicksItem>
