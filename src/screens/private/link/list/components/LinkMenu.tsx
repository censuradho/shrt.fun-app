import { Icon } from "@/components/icons";
import * as DropDown  from "@/components/ui/dropdown-menu";
import type { PropsWithChildren } from "react";

interface LinkMenuProps {
  onDetails?: () => void
  onToggleActive?: () => void
  onViewQrCode?: () => void
  onDelete?: () => void
  isActive?: boolean
}

export function LinkMenu (props: PropsWithChildren<LinkMenuProps>) {
  const { 
    children,
    onDetails,
    onToggleActive,
    onViewQrCode,
    onDelete,
    isActive
  } = props
  
  return (
    <DropDown.DropdownMenu>
      <DropDown.DropdownMenuTrigger>
        {children}
      </DropDown.DropdownMenuTrigger>
      <DropDown.DropdownMenuContent className="w-50 text-card-foreground">
        <DropDown.DropdownMenuItem className="whitespace-nowrap" onClick={onDetails}>
          <Icon name="Link" size={15} className="mr-2" />
          Detalhes
        </DropDown.DropdownMenuItem>
        <DropDown.DropdownMenuItem className="whitespace-nowrap" onClick={onToggleActive}>
          <Icon name={isActive ? "EyeOff" : "Eye"} size={15} className="mr-2" />
          {isActive ? "Desativar Link" : "Ativar Link"}
        </DropDown.DropdownMenuItem>
        <DropDown.DropdownMenuItem className="whitespace-nowrap" onClick={onViewQrCode}>
          <Icon name="QrCode" size={15} className="mr-2" />
          Visualizar QR Code
        </DropDown.DropdownMenuItem>
        <DropDown.DropdownMenuSeparator />
        <DropDown.DropdownMenuItem className="whitespace-nowrap" onClick={onDelete}>
          <Icon name="Trash" size={15} className="mr-2" />
          Apagar
        </DropDown.DropdownMenuItem>
      </DropDown.DropdownMenuContent>
    </DropDown.DropdownMenu>
  )
}