import { Button } from "@/components/Button";
import { AdvanceCard } from "./components/AdvanceCard";
import { ColorsCard } from "./components/ColorsCard";
import { StyleCard } from "./components/StylesCard";
import { useQRCustomizeViewModel } from "./hooks/useQRCustomizeViewModel";
import { cn } from "@/lib/utils";
import { QRCodePreviewCard } from "./components/QRCodePreview";

export function QrCodeCustomizeScreen () {
  const { form } = useQRCustomizeViewModel()

  return (
    <div className="grid md:grid-cols-[720px_1fr] flex-1 h-full">
      <section className="flex flex-col bg-card px-4 mx-1 mt-1 rounded-tl-2xl relative pb-10">
        <div className="w-full max-w-[600px] flex-1 mx-auto mt-10 ">
          <Button
            variant="ghost"
            className="w-full mb-8 md:hidden sticky top-1 z-10 shadow-2xl"
            headIcon={{
              name: 'QrCode'
            }}
          >
            Preview do seu QR Code
          </Button>
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
          'w-full z-5 flex bottom-4 mx-auto gap-2 md:bg-popover md:border border-outline',
          'rounded-md px-4 py-2 mt-8 md:mt-6 flex justify-between items-center max-w-[600px]',
          'md:sticky'
        )}>
          <Button
            variant="text"
            type="button"
          >Cancelar</Button>
          <Button>Salvar</Button>
        </div>
      </section>
      <div className="hidden md:flex items-center justify-center flex-1">
        <QRCodePreviewCard 
          form={form}
        />
      </div>
    </div>
  )
}