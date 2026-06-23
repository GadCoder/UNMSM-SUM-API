import { z } from "zod";

export const BaseResponseSchema = z.object({
  mensaje: z.string(),
  codigo: z.string(),
}).passthrough();

export const NullableDataResponseSchema = BaseResponseSchema.extend({
  data: z.unknown().nullable(),
}).passthrough();

export type NullableDataResponse = z.infer<typeof NullableDataResponseSchema>;
