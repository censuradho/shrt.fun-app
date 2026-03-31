import { signUpValidation } from './../signUp/validations';
import z from "zod";

export const resetPasswordValidations = signUpValidation.pick({
  password: true,
}).extend({
  confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ['confirmPassword']
});

export type ResetPasswordValidations = z.infer<typeof resetPasswordValidations>