import { Link, NavLink } from "react-router"
import { navigation } from "../constants"
import { Icon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { paths } from "@/constants/routes"

export function IconNavigation() {
  const renderNavigation = navigation.map((value, index) => (
    <li key={index} className="flex">
      <NavLink 
        end
        to={value.path}
        className={({ isActive }) => cn(
          'w-full flex gap-2 items-center hover:bg-muted rounded-md hover:text-foreground p-2',
          'text-sm text-card-foreground',
          isActive && 'hover:bg-accent bg-accent text-foreground'
        )}
      >
        <Icon name={value.icon} size={20} />
      </NavLink>
    </li>
  ))
  return (
    <div className="w-full flex-col flex flex-1 px-2">
      <Link to={paths.private.link.create} className="bg-primary-500 rounded text-primary-foreground p-2 mb-6 flex items-center justify-center cursor-pointer hover:bg-primary-600">
        <Icon name="Plus" size={20} />
      </Link>
      <nav>
        <ul className="flex flex-col gap justify-center items-center gap-4 my-10">
          {renderNavigation}
        </ul>
      </nav>
    </div>
  )
}