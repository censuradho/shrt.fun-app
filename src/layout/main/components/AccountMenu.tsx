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
import type { Me } from "@/services/api/auth/types"

interface AccountMenuProps {
  me?: Me | null
  onSignOut?: () => void
}

export function AccountMenu (props: AccountMenuProps) {
  const { me, onSignOut } = props

  if (!me) return null

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
            <span className="text-sm font-normal text-muted-foreground!">{me.email}</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="uppercase text-xxs font-semibold text-card-foreground">Tema</DropdownMenuLabel>
        <DropdownMenuItem className="gap-4 text-card-foreground cursor-pointer">
          <span className="text-lg">•</span>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-4 text-card-foreground cursor-pointer">
          <span className="text-lg">•</span>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-4 text-card-foreground cursor-pointer">
          <span className="text-lg">•</span>
          Sistema
        </DropdownMenuItem >
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={onSignOut}
          className="gap-2 text-card-foreground cursor-pointer"
        >
          <Icon name="LogOut" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}