import { useForm } from "react-hook-form"
import { signInValidation, type SignInFormData } from "../validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/contexts/auth/auth.context"
import { isApiError } from "@/lib/supabase"

export function useSignInViewModel () {
  const { 
    signIn,
    isLoading
  } = useAuth()

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInValidation),
    mode: 'onChange'
  })

  const handleSubmit = async (data: SignInFormData) => {
    try {
      await signIn(data.email, data.password)
    } catch (error) {
      if (isApiError(error)) {
        if (error.status === 400) {
          form.setError('email', { message: 'E-mail ou senha inválidos' })
          form.setError('password', { message: 'E-mail ou senha inválidos' })
        }
      }
    }
  }

  return {
    form: {
      ...form,
      handleSubmit: form.handleSubmit(handleSubmit)
    },
    isLoading
  }
}