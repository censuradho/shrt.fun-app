import { Button } from "@/components/Button";
import { AdvanceCard } from "./components/AdvanceCard";
import { ColorsCard } from "./components/ColorsCard";
import { StyleCard } from "./components/StylesCard";
import { useQRCustomizeViewModel } from "./hooks/useQRCustomizeViewModel";
import { cn } from "@/lib/utils";
import { QRCodePreviewCard } from "./components/QRCodePreview";
import { QRCodePreviewDialog } from "./components/QRCodePreviewDialog";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useNavigate } from "react-router";

export function QrCodeCustomizeScreen () {
  const { form, isPending, handleSubmit } = useQRCustomizeViewModel()
  const { isMobile } = useWindowSize()
  const navigate = useNavigate()
  
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="grid flex-1 h-full md:grid-cols-[minmax(0,1fr)_280px] lg:grid-cols-[minmax(0,782px)_minmax(280px,1fr)] xl:grid-cols-[820px_minmax(320px,1fr)]">
      <section className="flex min-w-0 flex-col bg-card px-4 mx-1 mt-1 rounded-tl-2xl relative pb-10">
        <div className="w-full max-w-150 flex-1 mx-auto mt-10 ">
          {isMobile && (
            <QRCodePreviewDialog
              form={form}
              trigger={(
                <Button
                  variant="ghost"
                  className="w-full mb-8 md:hidden sticky top-1 z-10 shadow-2xl bg-foreground text-background"
                  headIcon={{ name: 'QrCode' }}
                >
                Preview do seu QR Code
                </Button>
              )}
            />
          )}
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
          'rounded-md px-4 py-2 mt-8 md:mt-6 flex justify-between items-center max-w-150',
          'md:sticky'
        )}>
          <Button
            variant="text"
            type="button"
            onClick={() => navigate(-1)}
          >Cancelar</Button>
          <Button type="submit" loading={isPending}>Salvar</Button>
        </div>
      </section>
      {!isMobile && (
        <div className="hidden min-w-0 md:flex items-center justify-center flex-1 flex-col gap-4 px-4 lg:px-6">
          <QRCodePreviewCard 
            form={form}
          />
          <span className="text-sm text-muted-foreground max-w-60 text-center">Sempre teste antes de compartilhar, as cores podem interferir na legibilidade do QR Code.</span>
        </div>
      )}
    </form>
  )
}