import { Button } from "@/components/Button";
import { useCreateLinkViewModel } from "./hooks/useCreateLinkViewModel";
import { TextFieldHook } from "@/components/hook/TextFieldHook";
import { useFormState, useWatch } from "react-hook-form";
import { appConfig } from "@/config/app";
import { SuccessCreateDialog } from "./components/SuccessCreateDialog";
import { Icon } from "@/components/icons";
import { useNavigate } from "react-router";
import { paths } from "@/constants/routes";
import { SwitchHook } from "@/components/hook/SwitchHook";
import { ColorPickerHook } from "./components/QRCodeCard";
import { QRCodePreview } from "./components/QRCodePreview";

export function CreateLinkScreen () {
  const navigate = useNavigate()

  const {
    form,
    setSuccessModal,
    successModal,
    isPending,
    handleGenerateSlug,
    handleSubmit,
    qrCodePreview,
    isQrCodePreviewPending
  } = useCreateLinkViewModel()

  const { errors } = useFormState({ control: form.control })
  const generateQrCode = useWatch({ control: form.control, name: 'generateQrCode' })

  return (
    <div>
      <SuccessCreateDialog 
        open={!!successModal}
        onOpenChange={() => { 
          setSuccessModal(null) 
          navigate(paths.private.link.list)
        }}
        link={successModal?.shortUrl || ''}
      />
      <div className="container-sm mt-10">
        <header className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <button className="cursor-pointer" onClick={() => navigate(-1)}>
              <Icon size={20} name="ChevronLeft" />
            </button>
            <h1 className="text-2xl font-bold">Criar link</h1>
          </div>
        </header>
        <section className="mt-6">
          <form 
            id="create-link-form" 
            onSubmit={form.handleSubmit(handleSubmit) }
            className="flex flex-col gap-4"
          >
            <div className="card p-4 flex flex-col gap-4">
              <TextFieldHook 
                label="URL de destino"
                placeholder="https://www.exemplo.com"
                register={form.register('url')}
                inputMode="url"
                errorMessage={errors.url?.message}
                id="url"
              />
              <TextFieldHook 
                label="Título (opcional)"
                placeholder="Título do link"
                register={form.register('title')}
                errorMessage={errors.title?.message}
                id="title"
              />
              <TextFieldHook 
                label="Slug (opcional)"
                headText={`${appConfig.name}/`}
                placeholder="seu-slug-personalizado"
                register={form.register('slug')}
                errorMessage={errors.slug?.message}
                tailLabel={(
                  <Button 
                    type="button"
                    size="sm"
                    variant="ghost"
                    headIcon={{
                      name: 'RefreshCw',
                    }}
                    onClick={handleGenerateSlug}
                  >Gerar</Button>
                )}
                id="slug"
              />
            </div>
            <div className="card p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="QrCode" />
                  <label 
                    htmlFor="generateQrCode"
                    className="cursor-pointer"
                  >Gerar QR Code</label>
                </div>
                <SwitchHook 
                  control={form.control}
                  name="generateQrCode"
                  label="Gerar QR Code"
                />
              </div>
              {generateQrCode && (
                <div className="flex flex-col gap-6 md:flex-row justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                      <strong className="text-xxs uppercase text-card-foreground font-normal">Cor</strong>
                      <ColorPickerHook
                        control={form.control}
                        name="qrCodeColor"
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <strong className="text-xxs uppercase text-card-foreground font-normal">Logo</strong>
                      <div className="flex items-center gap-4">
                        <div className="size-[88px] rounded bg-muted flex items-center justify-center text-muted-foreground">
                          <Icon name="Image" />
                        </div>
                        <Button 
                          variant="ghost" 
                          disabled
                          type="button"
                        >Add logo</Button>
                        <Icon name="Lock" size={14} />
                      </div>
                    </div>
                    <span className="text-xs text-card-foreground">Arquivo tipo: PNG. 1:1 aspect ratio. Tamanho max: 5MB, 2500x2500px</span>
                  </div>
                  <div className="md:pr-4 flex flex-col gap-3 items-center justify-center">

                    <QRCodePreview
                      src={qrCodePreview ?? null}
                      isPending={isQrCodePreviewPending}
                    />
                    <span className="text-center max-w-60 md:max-w-37 text-xs text-card-foreground">More customizations are available after creating.</span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <Button loading={isPending}>Criar seu link</Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}