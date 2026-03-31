import { Button } from "@/components/Button"
import { PasswordStrongIndicator } from "@/components/PasswordStrongerIndicator"
import { PasswordFieldHook } from "@/components/hook/PasswordFieldHook"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { resetPasswordValidations, type ResetPasswordValidations } from "./validations"
import { useUpdatePasswordMutation } from "@/services/api/auth/queries"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { paths } from "@/constants/routes"
import { SUPABASE_ERRORS } from "@/lib/gateways/supabase.errors"
import { LinkButton } from "@/components/LinkButton"

export function ResetPasswordScreen() {
  const navigate = useNavigate()

  const {
    mutate,
    isPending
  } = useUpdatePasswordMutation()
  const form = useForm({
    resolver: zodResolver(resetPasswordValidations)
  })

  const { watch } = form
  const password = watch('password')
  

  const onSubmit = async (data: ResetPasswordValidations) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Senha atualizada com sucesso!')
        navigate(paths.public.signin)
      },
      onError: (error: any) => {
        if (error?.code === SUPABASE_ERRORS.same_password)
          toast.error("Erro ao tentar atualizar a senha", {
            description: "Tente uma nova senha.",
          })
      }
    })
  }


  return (
    <main className="bg-background">
      <form className="w-full max-w-100 mx-auto mt-40" onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="mb-8 text-lg font-medium text-foreground">Redefinir senha</h1>
        <div className="flex flex-col gap-4">
          <PasswordFieldHook 
            name="password"
            label="Nova senha"
            placeholder="Digite sua nova senha"
            register={form.register('password')}
            id="password"
            errorMessage={form.formState.errors.password?.message}
          />
          <PasswordFieldHook 
            name="confirmPassword"
            label="Confirmar nova senha"
            placeholder="Confirme sua nova senha"
            register={form.register('confirmPassword')}
            id="confirmPassword"
            errorMessage={form.formState.errors.confirmPassword?.message}
          />
          <Button 
            className="justify-center w-full"
            loading={isPending}
          >Confirmar</Button>
          <PasswordStrongIndicator 
            value={password || ''}
          />
          <LinkButton 
            variant="text"
            headIcon={{
              name: 'ChevronLeft'
            }}
            to={paths.public.signin}
            className="w-full justify-center"
          >Voltar para o login</LinkButton>
        </div>
      </form>
    </main>
  )
}