import { Button } from "@/components/Button";
import { AdvanceCard } from "./components/AdvanceCard";
import { ColorsCard } from "./components/ColorsCard";
import { StyleCard } from "./components/StylesCard";
import { useQRCustomizeViewModel } from "./hooks/useQRCustomizeViewModel";
import { cn } from "@/lib/utils";

export function QrCodeCustomizeScreen () {
  const { form } = useQRCustomizeViewModel()

  return (
    <div className="grid md:grid-cols-[720px_1fr] flex-1 h-full">
      <section className="flex flex-col bg-card px-4 mx-1 mt-1 rounded-tl-2xl relative pb-10">
        <div className="w-full max-w-[600px] flex-1 mx-auto mt-10 ">
          <header className="flex justify-between items-center gap-4">
            <h1 className="text-2xl font-bold">Personalize o design</h1>
          </header>
          <div className="mt-6 flex flex-col gap-6">
            <StyleCard 
              form={form} 
            />
            <ColorsCard form={form} />
            <AdvanceCard form={form} />
          </div>
        </div>
        <div className={cn(
          'w-full z-5 flex sticky bottom-4 mx-auto gap-2 bg-popover border border-outline',
          'rounded-md px-4 py-2 mt-6 flex justify-between items-center max-w-[600px]',
        )}>
          <Button
            variant="text"
            type="button"
          >Cancelar</Button>
          <Button>Salvar</Button>
        </div>
      </section>
      <div>
        {/* blank space */}
      </div>
    </div>
  )
}