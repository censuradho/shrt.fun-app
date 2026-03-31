import { HitsByLocationCard } from "./components/HitsByLocationCard"
import { TopMostAccessedUrlsCard } from "./components/TopMostAccessedUrlsCard"

export function AnalyticsScreen () {
  return (
    <div className="container mt-10">
      <header className="flex justify-between items-center gap-4 border-b border-outline pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Analytics</h1>
        </div>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-6 gap-4">
        <HitsByLocationCard />
        <TopMostAccessedUrlsCard />
      </div>
    </div>
  )
}