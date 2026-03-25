import { Spinner } from "@/components/spinner";

export function PageLoader () {
  return (
    <div className="w-full h-dvh bg-background flex items-center justify-center">
      <Spinner size={50} />
    </div>
  )
}