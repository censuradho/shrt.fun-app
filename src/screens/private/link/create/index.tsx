import { Button } from "@/components/Button";
import { useCreateLinkViewModel } from "./hooks/useCreateLinkViewModel";
import { TextFieldHook } from "@/components/hook/TextFieldHook";
import { useFormState } from "react-hook-form";
import { appConfig } from "@/config/app";
import { SuccessCreateDialog } from "./components/SuccessCreateDialog";
import { Icon } from "@/components/icons";
import { useNavigate } from "react-router";

export function CreateLinkScreen () {
  const navigate = useNavigate()

  const {
    form,
    setSuccessModal,
    successModal,
    isPending
  } = useCreateLinkViewModel()

  const { errors } = useFormState({ control: form.control })

  return (
    <div>
      <SuccessCreateDialog 
        open={!!successModal}
        onOpenChange={() => { 
          setSuccessModal(null) 
          navigate(-1)
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
        <section className="bg-card rounded-md p-4 mt-6">
          <form 
            id="create-link-form" 
            onSubmit={form.handleSubmit}
            className="flex flex-col gap-4"
          >
            <TextFieldHook 
              label="URL de destino"
              placeholder="https://www.exemplo.com"
              register={form.register('url')}
              errorMessage={errors.url?.message}
              id="url"
            />
            <TextFieldHook 
              label="Slug (opcional)"
              headText={`${appConfig.name}/`}
              placeholder="seu-slug-personalizado"
              register={form.register('slug')}
              errorMessage={errors.slug?.message}
              id="slug"
            />
            <div className="flex justify-end">
              <Button loading={isPending}>Criar seu link</Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}