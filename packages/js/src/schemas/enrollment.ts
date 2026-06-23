import { z } from "zod";

import { BaseResponseSchema } from "./common.js";

export const EnrollmentInformationResponseSchema = BaseResponseSchema.extend({
  data: z.object({
    codSemestre: z.string(),
    fechaDB: z.string(),
    fecIniMatInternet: z.string(),
    fecFinMatInternet: z.string(),
    mensajeMat: z.string(),
    indMatHabilitada: z.boolean(),
    matricula: z.unknown().nullable(),
  }).passthrough(),
}).passthrough();

export type EnrollmentInformationResponse = z.infer<typeof EnrollmentInformationResponseSchema>;
