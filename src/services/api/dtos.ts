import z from "zod";

export const findLocationHitsPaginationParamsDto = z.object({
  countriesOffset: z.coerce.number().int().nonnegative().optional().default(0),
  countriesLimit: z.coerce.number().int().positive().max(100).optional().default(10),
  citiesOffset: z.coerce.number().int().nonnegative().optional().default(0),
  citiesLimit: z.coerce.number().int().positive().max(100).optional().default(10),
});


export type FindLocationHitsPaginationParamsDto = z.infer<typeof findLocationHitsPaginationParamsDto>
