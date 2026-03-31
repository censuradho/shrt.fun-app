import type { UseSignUpViewModelReturn } from "../hooks/useSignUpViewModel";

import Github from '@/assets/github.svg?react';
import Google from '@/assets/google.svg?react';
import { Banner } from "@/components/Banner";
import { Button } from "@/components/Button";
import { CheckboxHook } from "@/components/hook/CheckboxHook";
import { PasswordFieldHook } from "@/components/hook/PasswordFieldHook";
import { TextFieldHook } from "@/components/hook/TextFieldHook";
import { PasswordStrongIndicator } from "@/components/PasswordStrongerIndicator";
import { appConfig } from "@/config/app";
import { paths } from "@/constants/routes";
import { toastyComingSoon } from "@/utils/toastyComingSoon";
import { useFormState, useWatch } from "react-hook-form";
import { Link } from "react-router";

interface SignUpFormProps {
  form: UseSignUpViewModelReturn['form']
  onSubmit: UseSignUpViewModelReturn['handleSubmit']
  isPending?: boolean
}

export function SignUpForm ({ form, onSubmit, isPending }: SignUpFormProps) {
    
  const { errors } = useFormState({ control: form.control })

  const password = useWatch({
    control: form.control,
    name: 'password',
  })

  return (
    <>
      <div className="mb-6 p-4">
        <h1 className="text-xl font-semibold">Seja Bem-vindo</h1>
        <p className="text-sm text-card-foreground">Comece hoje. Sem cartão de crédito.</p>
      </div>
      <div className="flex flex-col gap-2 px-6 my-6">
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
        <div className="flex gap-2 items-center mt-2">
          <hr className="border-outline bg-outline w-full" />
          <p className="text-center text-xs text-card-foreground whitespace-nowrap">ou continue com e-mail</p>
          <hr className="border-outline bg-outline w-full" />
        </div>
      </div>
      {errors?.terms?.message && (
        <div className="px-4 my-4">
          <Banner variant="alert" headIcon="TriangleAlert">
            <p>{errors?.terms?.message}</p>
          </Banner>
        </div>
      )}
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="px-6 flex flex-col gap-4">
          <div className="flex gap-4">
            <TextFieldHook 
              autoFocus
              label="Nome"
              register={form.register('firstName')}
              id="firstName"
              errorMessage={errors.firstName?.message}
            />
            <TextFieldHook 
              label="Sobrenome"
              register={form.register('lastName')}
              id="lastName"
              errorMessage={errors.lastName?.message}
            />
          </div>
          <TextFieldHook 
            label="E-mail"
            type="email"
            register={form.register('email')}
            id="email"
            errorMessage={errors.email?.message}
            placeholder="voce@email.com"
          />
          <PasswordFieldHook 
            label="Senha"
            register={form.register('password')}
            id="password"
            errorMessage={errors.password?.message}
          />
          <PasswordStrongIndicator 
            value={password || ''}
          />
          <div className="flex items-start gap-4">
            <CheckboxHook 
              control={form.control}
              name="terms"
              label="Aceito os termos e condições"
            />
            <p className="text-sm text-card-foreground">Li e aceito os <a href="/terms-of-use" className="text-link">Termos de uso</a> e a <a href="https://site.shrt.fun/politicas-privacidade" target="_blank" className="text-link">Política de privacidade</a> do {appConfig.name}</p>
          </div>
          <Button
            className="w-full justify-center"
            loading={isPending}
          >
              Criar Conta
          </Button>
        </div>
        <div className="px-6 py-6 border-t border-outline flex justify-center">
          <p className="text-sm text-card-foreground">Já tem uma conta? <Link className="text-link" to={paths.public.signin}>Entrar</Link></p>
        </div>
      </form>
    </>
  )
}