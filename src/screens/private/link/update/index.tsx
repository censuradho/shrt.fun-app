import { Icon } from "@/components/icons";
import { useNavigate } from "react-router";
import { useUpdateLinkViewModel } from "./hooks/useUpdateLinkViewModel";
import { TextFieldHook } from "@/components/hook/TextFieldHook";
import { DatePickerHook } from "@/components/hook/DatePickerHook";
import { Button } from "@/components/Button";

export function UpdateLinkScreen () {
  const navigate = useNavigate()
  const {
    form,
    data,
    isPending,
    handleSubmit,
  } = useUpdateLinkViewModel()

  if (isPending) return null

  return (
    <div className="pt-10 h-full flex flex-col">
      <header className="container-sm flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <button className="cursor-pointer" onClick={() => navigate(-1)}>
            <Icon size={20} name="ChevronLeft" />
          </button>
          <h1 className="text-2xl font-bold">Editar link</h1>
        </div>
      </header>
      <section className="mt-8 container-sm">
        <div className="grid gap-6 border-b border-outline pb-6">
          <div className="grid gap-1">
            <h2 className="text-lg">Link curto</h2>
            <span className="text-sm text-card-foreground truncate">{data?.shortUrl || 'N/A'}</span>
          </div>
          <div className="grid gap-1">
            <h2 className="text-lg">Link de destino</h2>
            <span className="text-sm text-card-foreground truncate">{data?.originalUrl || 'N/A'}</span>
          </div>
        </div>
      </section>
      <section className="mt-8 flex-1">
        <form
          className="flex-1 flex-col flex h-full"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="flex-1">
            <div className="container-sm flex flex-col gap-4 flex-1">
              <TextFieldHook
                label="Título"
                placeholder="Digite um título para o link"
                register={form.register('title')}
                errorMessage={form.formState.errors.title?.message}
                id="title"
              />
              <TextFieldHook
                label="Descrição"
                placeholder="Digite uma descrição para o link"
                register={form.register('description')}
                errorMessage={form.formState.errors.description?.message}
                id="description"
              />
              <DatePickerHook
                label="Expiração (opcional)"
                name="expireAt"
                control={form.control}
                errorMessage={form.formState.errors.expireAt?.message as string | undefined}
              />
            </div>

          </div>
          <div className="flex justify-end mt-2 border-t border-outline py-6">
            <Button
              variant="text"
              onClick={() => navigate(-1)}
              disabled={isPending}
              type="button"
            >Cancelar</Button>
            <Button loading={isPending}>Salvar</Button>
          </div>
        </form>
      </section>
    </div>
  )
}
