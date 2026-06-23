import { z } from "zod";

import { BaseResponseSchema } from "./common.js";

export const AcademicCourseSchema = z.object({
  codCurso: z.string(),
  ciclo: z.number(),
  desAsignatura: z.string(),
  desCalificacion: z.string(),
  codTipoActa: z.string(),
  numCreditaje: z.number(),
  valCalificacionFinal: z.number(),
  codPlan: z.string(),
  codSeccion: z.string(),
  numActa: z.string(),
  tipoAsignatura: z.string(),
  numResConv: z.unknown().nullable(),
}).passthrough();

export const AcademicHistoryResponseSchema = BaseResponseSchema.extend({
  data: z.array(z.object({
    codSemestre: z.string(),
    asignatura: z.array(AcademicCourseSchema),
  }).passthrough()),
}).passthrough();

export type AcademicHistoryResponse = z.infer<typeof AcademicHistoryResponseSchema>;
