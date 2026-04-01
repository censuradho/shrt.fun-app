import { Icon } from "@/components/icons"
import { LinkButton } from "@/components/LinkButton"
import {
  Drawer,
  DrawerContent
} from "@/components/ui/drawer"
import { paths } from "@/constants/routes"
import { cn } from "@/lib/utils"
import type { PropsWithChildren } from "react"
import { Link, NavLink } from "react-router"
import { navigation } from "../constants"
import Logo from "@/assets/logo-short.svg?react"

interface MobileNavigationProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileNavigation (props: PropsWithChildren<MobileNavigationProps>) {
  const { open, onOpenChange } = props

  const renderNavigation = navigation.map((node, index) => (
    <li 
      key={index} 
      className="relative pb-1"
      onClick={() => onOpenChange(false)}
    >
      <NavLink 
        end
        to={node.path}
        className={({ isActive }) => cn(
          'w-full px-4 py-2 flex gap-2 items-center hover:bg-muted rounded-md hover:text-foreground',
          'text-sm text-card-foreground',
          isActive && 'hover:bg-accent bg-accent text-foreground'
        )}
      >
        <Icon size={16} name={node.icon} />
        {node.label}
      </NavLink>
    </li>
  ))


  return (
    <Drawer 
      open={open} 
      onOpenChange={onOpenChange}
      direction="left"
    >
      <DrawerContent className="w-full bg-card">
        <div className="w-full flex justify-start px-6 items-center h-14 shrink-0 border-b border-outline">
          <Link to={paths.private.link.list}>
            <Logo className="text-foreground w-8 h-8"/>
          </Link>
        </div>
        <nav className="w-full flex-1 px-4 my-10">
          <ul 
            className="flex flex-col"
          >
            {renderNavigation}
          </ul>
        </nav>
        <div className="px-4 mt-auto">
          <LinkButton
            to={paths.private.link.create}
            onClick={() => onOpenChange(false)}
            headIcon={{
              name: "Plus",
            }}
            className="w-full mb-6 justify-center"
          >Criar novo</LinkButton>
        </div>
      </DrawerContent>
    </Drawer>
  )
}