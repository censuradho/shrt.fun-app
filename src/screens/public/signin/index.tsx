import { TextFieldHook } from "@/components/hook/TextFieldHook"
import { useSignInViewModel } from "./hook/useSignInViewModel"
import { PasswordFieldHook } from "@/components/hook/PasswordFieldHook"
import { Link } from "react-router"
import { Button } from "@/components/Button"

import Google from '@/assets/google.svg?react'
import Github from '@/assets/github.svg?react'
import { paths } from "@/constants/routes"
import { useFormState } from "react-hook-form"
import { toastyComingSoon } from "@/utils/toastyComingSoon"

export function SignInScreen () {
  const viewModel = useSignInViewModel()
  
  const { errors } = useFormState({ control: viewModel.form.control })

  return (
    <main className="flex flex-col items-center justify-center h-full w-full min-h-dvh">
      <div
        className="w-full lg:max-w-[450px] mx-auto bg-card flex-1 flex flex-col justify-center items-center lg:flex-none rounded-md border border-outline"
      >
        <div className="mb-6 p-4 w-full max-w-[450px] lg:max-w-auto">
          <h1 className="text-xl font-semibold">Bem-vindo de volta</h1>
          <p className="text-sm text-card-foreground">Entre na sua conta para acessar seus links</p>
        </div>
        <div className="flex flex-col gap-2 px-6 my-6 max-w-[450px] lg:max-w-auto w-full">
          <Button className="w-full" variant="ghost" onClick={toastyComingSoon}>
            <div className="flex gap-2 justify-center items-center w-full">
              <Google />
            Continuar com Google
            </div>
          </Button>
          <Button className="w-full" variant="ghost" onClick={toastyComingSoon}>
            <div className="flex gap-2 justify-center items-center w-full">
              <Github />
            Continuar com Github
            </div>
          </Button>
          <div className="flex gap-2 items-center mt-2 max-w-[450px] lg:max-w-auto">
            <hr className="border-outline bg-outline w-full" />
            <p className="text-center text-xs text-card-foreground whitespace-nowrap">ou continue com e-mail</p>
            <hr className="border-outline bg-outline w-full" />
          </div>
        </div>
        <form 
          onSubmit={viewModel.form.handleSubmit}
          className="flex flex-col gap-4 max-w-[450px] lg:max-w-auto w-full"
        >
          <div className="px-6 flex flex-col gap-4">
            <TextFieldHook 
              label="E-mail"
              type="email"
              register={viewModel.form.register('email')}
              id="email"
              errorMessage={errors.email?.message}
              placeholder="voce@email.com"
              autoComplete="email"
            />
            <PasswordFieldHook 
              label="Senha"
              register={viewModel.form.register('password')}
              id="password"
              type="password"
              autoComplete="current-password"
              errorMessage={errors.password?.message}
            />
            <div className="flex flex-col items-end gap-2">
              <Link className="text-sm text-right text-card-foreground font-medium hover:opacity-80" to={paths.public.forgotPassword}>Esqueceu a senha?</Link>
              <Button
                className="w-full justify-center"
                loading={viewModel.isLoading}
              >
              Entrar
              </Button>
            </div>
          </div>
          <div className="px-6 py-6 border-t border-outline flex justify-center">
            <p className="text-sm text-card-foreground">Não tem conta? <Link className="text-blitzit-green font-medium hover:opacity-80" to="/signup">Criar conta grátis</Link></p>
          </div>
        </form>
      </div>
    </main>
  )
}