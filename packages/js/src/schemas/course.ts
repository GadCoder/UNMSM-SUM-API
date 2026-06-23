import { z } from "zod";

import { BaseResponseSchema } from "./common.js";

export const ScheduleSchema = z.object({
  codHorario: z.number(),
  horaInicio: z.string(),
  horaFin: z.string(),
  dia: z.string(),
}).passthrough();

export const SectionSchema = z.object({
  codSeccion: z.number(),
  codTurno: z.string(),
  canTopeAlumnos: z.number(),
  canAlumMatriculados: z.number(),
  codTipoHorAsignatura: z.string(),
  codDocente: z.string(),
  nomDocente: z.string(),
  apePaterno: z.string(),
  apeMaterno: z.string(),
  codAula: z.string(),
  horarios: z.array(ScheduleSchema),
}).passthrough();

export const CourseScheduleResponseSchema = BaseResponseSchema.extend({
  data: z.array(z.object({
    asignatura: z.array(z.object({
      codAsignatura: z.string(),
      desAsignatura: z.string(),
      canHorasTeoria: z.number(),
      canHorasPractica: z.number(),
      canHorasLaboratorio: z.number(),
      numCreditaje: z.number(),
      indRegimen: z.string(),
      seccion: z.array(SectionSchema),
    }).passthrough()),
  }).passthrough()),
}).passthrough();

export type CourseScheduleResponse = z.infer<typeof CourseScheduleResponseSchema>;
