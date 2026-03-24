import { useForm } from "react-hook-form"
import { signInValidation, type SignInFormData } from "../validations"
import { zodResolver } from "@hookform/resolvers/zod"

export function useSignInViewModel () {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInValidation),
    mode: 'onChange'
  })

  const handleSubmit = async (data: SignInFormData) => {

  }

  return {
    form: {
      ...form,
      handleSubmit: form.handleSubmit(handleSubmit)
    }
  }
}