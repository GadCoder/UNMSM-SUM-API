import { z } from "zod";

export const LoginRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
}).passthrough();

export const LoginResponseSchema = z.object({
  username: z.string(),
  fullName: z.string(),
  token: z.string(),
  refreshToken: z.string(),
  createAt: z.string(),
  expirationDate: z.string(),
}).passthrough();

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
