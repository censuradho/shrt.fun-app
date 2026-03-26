import { Icon } from "@/components/icons";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ViewEnum, type ViewEnumType } from "../hooks/useLinkListViewModel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ToolsMenuProps {
   onSelectAll: () => void;
   isSelectedAll: boolean;
   onToggleView: (view: ViewEnumType) => void;
   view: ViewEnumType
   selectedCount?: number
   onChangeIsActive?: (status: 'true' | 'false') => void
   isActive?: string
}

export function ToolsMenu (props: ToolsMenuProps) {
  const { 
    onSelectAll, 
    isSelectedAll, 
    onToggleView, 
    view, 
    selectedCount,
    isActive,
    onChangeIsActive
  } = props

  return (
    <div className="flex justify-between py-4 sticky top-0 z-10 bg-background/90 backdrop-blur-lg">
      <div className="flex items-center gap-2 pl-4">
        <Checkbox  
          checked={isSelectedAll}
          onCheckedChange={() => {
            onSelectAll()
            console.log('clicou')
          }}
          id="select-all"
        />
        <label htmlFor="select-all" className="text-sm cursor-pointer">
          {selectedCount} selecionado{selectedCount !== 1 && 's'}
        </label>
      </div>
      <div className="flex items-center gap-4">
        <ToggleGroup 
          size="lg" 
          type="single" 
          defaultValue={ViewEnum.LIST}
          value={view} 
          onValueChange={onToggleView}
          className="hidden lg:flex"
        >
          <ToggleGroupItem 
            value={ViewEnum.LIST} 
            aria-label="Exibir em lista resumida"
            className="data-[state=on]:bg-accent"
          >
            <Icon size={20} name="List" />
          </ToggleGroupItem>
          <ToggleGroupItem 
            value={ViewEnum.RICH_LIST} 
            aria-label="Exibir em lista completa"
            className="data-[state=on]:bg-accent"
          >
            <Icon size={20} name="Columns3" className="rotate-90" />
          </ToggleGroupItem>
          <ToggleGroupItem 
            value={ViewEnum.GRID} 
            aria-label="Exibir em lista completa"
            className="data-[state=on]:bg-accent"
          >
            <Icon size={20} name="LayoutGrid" />
          </ToggleGroupItem>
        </ToggleGroup>
        <Select
          onValueChange={onChangeIsActive}
          value={isActive}
        >
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Selecione uma opção" />
          </SelectTrigger>
          <SelectContent className="bg-card">
            <SelectItem value="true">Ativo</SelectItem>
            <SelectItem value="false">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}