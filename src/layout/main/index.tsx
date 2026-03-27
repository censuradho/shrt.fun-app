import { Icon } from "@/components/icons";
import { useAuth } from "@/contexts/auth/auth.context";
import { useWindowSize } from "@/hooks/useWindowSize";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Outlet } from "react-router";
import { AccountMenu } from "./components/AccountMenu";
import { ExpandedNavigation } from "./components/ExpandedNavigation";
import { IconNavigation } from "./components/IconNavigation";
import { MobileNavigation } from "./components/MobileNavigation";


export function MainLayout () {
  const [expanded, setExpanded] = useState(false)
  const { me, signOut} = useAuth()
  const { isMobile } = useWindowSize()

  return (
    <div className="relative flex w-full h-dvh overflow-hidden">
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
          {(expanded ? <ExpandedNavigation /> : <IconNavigation />)}
        </div>
      )}
      {isMobile && (
        <MobileNavigation open={expanded} onOpenChange={setExpanded} />
      )}
      <div className="flex-1 flex flex-col min-h-0 z-2">
        <header
          className="w-full px-6 h-12 shrink-0 bg-card flex items-center justify-between"
        >
          <button className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
            <Icon name="Menu" />
          </button>
          <AccountMenu
            me={me}
            onSignOut={signOut}
          />
        </header>
        <main className="flex-1 min-h-0 bg-card relative">
          <div className="flex flex-col bg-background border border-outline h-full rounded-tl-2xl overflow-hidden">
            <div className="overflow-y-auto flex-1 pb-10">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}