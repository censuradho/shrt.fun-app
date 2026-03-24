import { useSignUpMutation } from "@/services/api/auth/queries"
import { toastifyApiErrorMessage } from "@/services/api/toastifyApiErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signUpValidation, type SignUpFormData } from "../validations"
import { useResendConfirmationEmail } from "@/lib/supabase"
import { useState } from "react"

export function useSignUpViewModel () {
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false)

  const resendEmailConfirmationTokenMutation = useResendConfirmationEmail()
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpValidation),
    mode: "onChange",
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const {
    mutate,
    isPending,
  } = useSignUpMutation()

  const handleSubmit = async (data: SignUpFormData) => {
    mutate(data, {
      onError: (error) => toastifyApiErrorMessage(error),
      onSuccess: () => setIsSignUpSuccessful(true)
    })
  }

  const handleResendConfirmationEmail = async () => {
    resendEmailConfirmationTokenMutation.mutate(form.getValues('email'), {
      onError: (error) => toastifyApiErrorMessage(error),
    })
  }

  const handleReset = () => {
    setIsSignUpSuccessful(false)
    form.reset()
  }

  return {
    form,
    handleSubmit,
    isPending,
    isSignUpSuccessful,
    handleResendConfirmationEmail,
    resendEmailConfirmationTokenMutation,
    handleReset
  }
}

export type UseSignUpViewModelReturn = ReturnType<typeof useSignUpViewModel>
