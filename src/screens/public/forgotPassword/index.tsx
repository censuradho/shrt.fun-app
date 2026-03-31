import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { forgotPasswordValidations, type ForgotPasswordValidations } from "./validations"
import { TextFieldHook } from "@/components/hook/TextFieldHook"
import { Button } from "@/components/Button"
import { LinkButton } from "@/components/LinkButton"
import { paths } from "@/constants/routes"
import { useResetPasswordMutation } from "@/services/api/auth/queries"
import { useState } from "react"

export function ForgotPasswordScreen() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    mutate,
    isPending,
    isSuccess
  } = useResetPasswordMutation()

  const form = useForm({
    resolver: zodResolver(forgotPasswordValidations)
  })

  const onSubmit = async (data: ForgotPasswordValidations) => {
    mutate(data, {
      onSuccess: () => {
        setIsSubmitted(true)
      },
    })
  }

  const renderForm = () => {
    if (isSubmitted) return null

    return (
      <>
        <div className="flex flex-col gap-4 mb-6">
          <TextFieldHook 
            name="email"
            label="Email"
            placeholder="Digite seu email"
            register={form.register('email')}
            id="email"
          />
          <Button 
            className="w-full justify-center"
            loading={isPending}
          >Recuperar senha</Button>
        </div>
        <LinkButton 
          variant="text"
          headIcon={{
            name: 'ChevronLeft'
          }}
          to={paths.public.signin}
          className="w-full justify-center"
        >Voltar para o login</LinkButton>
      </>
    )
  }

  const renderSuccessMessage = () => {
    if (!isSubmitted) return null

    return (
      <div className="flex flex-col gap-4 mb-6 w-full">
        <strong>Enviamos o link de recuperação</strong>
        <p className="text-sm text-card-foreground">
          Um email foi enviado para <strong className="text-foreground">{form.getValues('email')} </strong>.
          Verifique sua caixa de entrada e siga as instruções para criar uma nova senha.  
          Se não encontrar o email, confira também a pasta de spam ou lixeira.
        </p>
        <div className="justify-end">
          <Button 
            variant="text"
            type="button"
            headIcon={{
              name: 'ChevronLeft'
            }}
            onClick={() => setIsSubmitted(false)}
          >Ok, entendi</Button>
        </div>
      </div>
    )
  }
  
  return (
    <main className="bg-background">
      <form className="w-full max-w-100 mx-auto mt-40" onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="mb-8 text-lg font-medium text-foreground">Esqueci minha senha</h1>
        {renderForm()}
        {renderSuccessMessage()}
      </form>
    </main>
  )
}