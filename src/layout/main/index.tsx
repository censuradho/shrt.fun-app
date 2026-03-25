import { Outlet } from "react-router";
import { Icon } from "@/components/icons";
import { lazy, Suspense, useState } from "react";
import { cn } from "@/lib/utils";
import { AccountMenu } from "./components/AccountMenu";
import { useAuth } from "@/contexts/auth/auth.context";
import { useWindowSize } from "@/hooks/useWindowSize";

const ExpandedNavigation = lazy(() => 
  import("./components/ExpandedNavigation").then(module => ({ default: module.ExpandedNavigation }))
)

const IconNavigation = lazy(() =>
  import('./components/IconNavigation').then(module => ({ default: module.IconNavigation }))
);

const MobileNavigation = lazy(() =>
  import('./components/MobileNavigation').then(module => ({ default: module.MobileNavigation }))
);

export function MainLayout () {
  const [expanded, setExpanded] = useState(false)
  const { me , signOut} = useAuth()
  const { isMobile } = useWindowSize()

  return (
    <div className="relative flex w-full h-dvh overflow-hidden bg-white/4">
      {!isMobile && (
        <div 
          className={cn(
            'transition-all w-full max-w-[270px] z-2 bg-card flex-1 flex flex-col',
            {
              'max-w-[270px]': expanded,
              'max-w-15': !expanded
            }
          )}>
          <div className="h-12 ">

          </div>
          <Suspense>
            {(expanded ? <ExpandedNavigation /> : <IconNavigation />)}
          </Suspense>
        </div>
      )}
      {isMobile && (
        <Suspense>
          <MobileNavigation open={expanded} onOpenChange={setExpanded} />
        </Suspense>
      )}
      <div className="flex-1 h-full z-2">
        <header
          className="w-full px-6 h-12 bg-card flex items-center justify-between"
        >
          <button className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
            <Icon name="Menu" />
          </button>
          <AccountMenu 
            me={me} 
            onSignOut={signOut}
          />
        </header>
        <main className="flex-1 h-full bg-card">
          <div className="flex flex-col flex-1 bg-background h-full rounded-tl-2xl">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  )
}