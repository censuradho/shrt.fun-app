import { errorMessages } from "@/constants/errorMessages";
import z from "zod";

export const updateLinkValidations = z.object({
  title: z
    .string()
    .max(255, errorMessages.required), 
  description: z
    .string()
    .max(500, errorMessages.required)
    .optional(),
  expireAt: z.date().optional().nullable(),
})

export type UpdateLinkFormData = z.infer<typeof updateLinkValidations>