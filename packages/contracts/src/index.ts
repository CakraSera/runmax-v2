import { z } from "zod";

export const HealthSchema = z.object({
  ok: z.boolean(),
  service: z.string(),
});

export type Health = z.infer<typeof HealthSchema>;

export const EchoBodySchema = z.object({
  message: z.string().min(1).max(200),
});

export const EchoResponseSchema = z.object({
  message: z.string(),
  at: z.string(),
});
