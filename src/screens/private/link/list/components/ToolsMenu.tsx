import { Icon } from "@/components/icons";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroupItem, ToggleGroup } from "@/components/ui/toggle-group";
import { toast } from "sonner";

interface ToolsMenuProps {
   onSelectAll: () => void;
   isSelectedAll: boolean;
   onToggleView: (view: string) => void;
   view: string
   selectedCount?: number
}

export function ToolsMenu (props: ToolsMenuProps) {
  const { onSelectAll, isSelectedAll, onToggleView, view, selectedCount } = props

  console.log(isSelectedAll)
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
      <ToggleGroup 
        size="lg" 
        type="single" 
        defaultValue="list" 
        value={view} 
        onValueChange={onToggleView}
      >
        <ToggleGroupItem 
          value="list" 
          aria-label="Exibir em lista resumida"
          className="data-[state=on]:bg-accent"
          onClick={() => toast.message(<span>TODO: Funcionalidade ainda não está pronta <span className="text-lg">😭</span></span>)}
        >
          <Icon size={20} name="List" />
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="list-complete" 
          aria-label="Exibir em lista completa"
          className="data-[state=on]:bg-accent"
          onClick={() => toast.message(<span>TODO: Funcionalidade ainda não está pronta <span className="text-lg">😭</span></span>)}
        >
          <Icon size={20} name="Columns3" className="rotate-90" />
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="grid" 
          aria-label="Exibir em lista completa"
          className="data-[state=on]:bg-accent"
          onClick={() => toast.message(<span>TODO: Funcionalidade ainda não está pronta <span className="text-lg">😭</span></span>)}
        >
          <Icon size={20} name="LayoutGrid" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}