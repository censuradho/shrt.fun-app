import z from "zod";

export const forgotPasswordValidations = z.object({
  email: z.email("Por favor, insira um email válido"),
})

export type ForgotPasswordValidations = z.infer<typeof forgotPasswordValidations>