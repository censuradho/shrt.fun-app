import { Icon } from "@/components/icons"
import { LinkButton } from "@/components/LinkButton"
import { paths } from "@/constants/routes"
import { cn } from "@/lib/utils"
import { NavLink } from "react-router"
import { navigation } from "../constants"

export function ExpandedNavigation () {
  const renderNavigation = navigation.map((node, index) => (
    <li 
      key={index} 
      className="relative pb-1"
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
    <div className="w-full flex-col flex flex-1">
      <div className="px-4 pt-6">
        <LinkButton 
          to={paths.private.link.create}
          headIcon={{
            name: "Plus",
          }}
          className="w-full mb-6 justify-center"
        >Criar novo</LinkButton>
      </div>
      <nav className="w-full flex-1 px-4 my-10">
        <ul 
          className="flex flex-col"
        >
          {renderNavigation}
        </ul>
      </nav>
    </div>
  )
}