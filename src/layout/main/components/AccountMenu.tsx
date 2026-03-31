import { Button } from "@/components/Button"
import { Icon } from "@/components/icons"
import { LetterCircle } from "@/components/LetterCircle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { PLANS_LABELS } from "@/constants/plans"
import { useTheme } from "@/contexts/theme.context"
import type { Me } from "@/services/api/auth/types"
import { toastyComingSoon } from "@/utils/toastyComingSoon"

interface AccountMenuProps {
  me?: Me | null
  onSignOut?: () => void
}

export function AccountMenu (props: AccountMenuProps) {
  const { me, onSignOut } = props
  const { setTheme, theme } = useTheme()

  if (!me) return null

  const renderThemeIndicator = (option: string) => {
    if (theme === option) {
      return <span className="text-lg">•</span>
    }
    return <span className="text-lg opacity-0">•</span>
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-popover p-1 rounded">
        <div className="flex items-center gap-2">
          <LetterCircle className="bg-blitzit-blue min-w-7 min-h-7" letter={me.firstName} />
          <strong className="text-sm font-medium">{me.username}</strong>
          <Icon size={12} name="ChevronDown" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px]" align="end">
        <div className="flex items-center gap-2 hover:text-inherit hover:bg-transparent py-1" >
          <Icon name="User" />
          <div className="flex flex-col">
            <strong className="text-sm font-medium">{me.firstName} {me.lastName}</strong>
            <span className="text-xs font-normal text-muted-foreground!">{me.email}</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <div className="flex items-center gap-2 hover:text-inherit hover:bg-transparent py-1 px-2 justify-between" >
          <div className="flex flex-col">
            <span className="text-sm">{PLANS_LABELS[me.plan.name as keyof typeof PLANS_LABELS]}</span>
          </div>
          <Button 
            size="sm"
            onClick={toastyComingSoon}
          >
            Upgrade
          </Button>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="uppercase text-xxs font-semibold text-card-foreground">Tema</DropdownMenuLabel>
        <DropdownMenuItem 
          className="gap-4 text-card-foreground cursor-pointer" onClick={() => setTheme("dark")}>
          {renderThemeIndicator("dark")}
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-4 text-card-foreground cursor-pointer" onClick={() => setTheme("light")}>
          {renderThemeIndicator("light")}
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-4 text-card-foreground cursor-pointer" onClick={() => setTheme("system")}>
          {renderThemeIndicator("system")}
          Sistema
        </DropdownMenuItem >
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={onSignOut}
          className="gap-2 text-card-foreground cursor-pointer py-2"
        >
          <Icon name="Settings" />
          <span>Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={onSignOut}
          className="gap-2 text-card-foreground cursor-pointer py-2"
        >
          <Icon name="LogOut" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}