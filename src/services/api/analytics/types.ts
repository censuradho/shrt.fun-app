export interface HitsCountByLocation {
  clicks: number
  country?: string | null
  city?: string | null
}
export type FindHistCountByLocationResponse = HitsCountByLocation[]
