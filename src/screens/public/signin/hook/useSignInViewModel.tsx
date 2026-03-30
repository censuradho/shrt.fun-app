import { useAuth } from "@/contexts/auth/auth.context"
import { isApiError, SUPABASE_ERROR_MESSAGES } from "@/lib/supabase"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { signInValidation, type SignInFormData } from "../validations"

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
      await signIn(
        data.email, 
        data.password,
      )
      
    } catch (error) {
      if (isApiError(error)) {
        if (error.message === SUPABASE_ERROR_MESSAGES.EMAIL_NOT_CONFIRMED) {
          toast.error('E-mail não confirmado. Por favor, verifique sua caixa de entrada.')
          return
        }
        if (error.status === 400 && error.message === SUPABASE_ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD) {
          toast.error('E-mail ou senha inválidos')
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