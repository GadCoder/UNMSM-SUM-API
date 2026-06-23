import { z } from "zod";

import { BaseResponseSchema } from "./common.js";

export const StudentInfoSchema = z.object({
  apePaterno: z.string(),
  apeMaterno: z.string(),
  nombre: z.string(),
  codFacultad: z.number(),
  desFacultad: z.string(),
  foto: z.string(),
  sexo: z.string(),
  correoInstitucional: z.string(),
  dni: z.string(),
  codAlumno: z.string(),
  codEscuela: z.number(),
  desEscuela: z.string(),
  codEspecialidad: z.number(),
  desEspecialidad: z.string(),
  codPlan: z.string(),
  desPlan: z.string(),
  ponderado: z.number(),
  actualizoFormulario: z.boolean(),
  periodo: z.string(),
  urlFoto: z.string(),
  codPermanencia: z.string(),
  desPermanencia: z.string(),
  codSituacion: z.string(),
  desSituacion: z.string(),
  regimen: z.string(),
  egresadoEG: z.string(),
  anioIngreso: z.number(),
  matricula: z.unknown().nullable(),
}).passthrough();

export const PersonalInformationResponseSchema = BaseResponseSchema.extend({
  data: z.object({}).passthrough(),
}).passthrough();

export type StudentInfo = z.infer<typeof StudentInfoSchema>;
export type PersonalInformationResponse = z.infer<typeof PersonalInformationResponseSchema>;
