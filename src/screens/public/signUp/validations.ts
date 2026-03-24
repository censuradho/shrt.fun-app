import { errorMessages } from "@/constants/errorMessages";
import { hasLowercaseCharacter, hasNumber, hasSpecialCharacter, hasUppercaseCharacter } from "@/utils/passwordValidations";
import z from "zod";

export const signUpValidation = z.object({
  email: z.email('E-mail inválido'),
  password: z
    .string()
    .min(8, '   ')
    .max(256, errorMessages.maxLength(256))
    .refine(value => 
      hasLowercaseCharacter(value) &&
      hasNumber(value) && 
      hasUppercaseCharacter(value) &&
      hasSpecialCharacter(value),
    '   '
    ),
  firstName: z.string().min(1, errorMessages.required).max(100, errorMessages.maxLength(100)),
  lastName: z.string().min(1, errorMessages.required).max(255, errorMessages.maxLength(255)),
  terms: z.literal(true, 'Você deve aceitar os termos e condições')
})

export type SignUpFormData = z.infer<typeof signUpValidation>