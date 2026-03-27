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

export interface FindLocationHitsResponse {
  countries: OffsetPaginationResult<LocationClicksItem>
  cities: OffsetPaginationResult<LocationClicksItem>
}