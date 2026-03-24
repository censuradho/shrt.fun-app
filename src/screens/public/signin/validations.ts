import z from "zod";

export const signInValidation = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(8, 'Senha deve conter no mínimo 8 caracteres').max(256, 'Senha deve conter no máximo 256 caracteres'),
})

export type SignInFormData = z.infer<typeof signInValidation>