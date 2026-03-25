import { errorMessages } from "@/constants/errorMessages";
import { sanitizeString } from "@/utils/sanitizeString";
import { slugValidation, urlValidation } from "@/utils/validations";
import z from "zod";

export const createLinkValidation = z.object({
  url: z
    .string()
    .min(1, errorMessages.required)
    .transform(sanitizeString)
    .refine(url => urlValidation(url), 'URL inválida'),
  slug: z
    .string()
    .optional()
    .transform(sanitizeString)
    .refine(slug => !slug || slugValidation(slug), 'Slug inválido. Use apenas letras, números e hífens.')
})

export type CreateLinkFormData = z.infer<typeof createLinkValidation>