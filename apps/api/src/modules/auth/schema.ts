import { z } from "@hono/zod-openapi";

export const AuthRegisterSchema = z.object({
  email: z.email().max(254),
  password: z.string().min(15).max(128),
  fullName: z.string().min(1).max(80),
  username: z.string().min(1).max(32),
});

export const AuthLoginSchema = z.object({
  email: z.string().max(254),
  password: z.string().min(1).max(128),
});

export const AuthLoginSuccessSchema = z.object({ token: z.string() });

export const AuthHeaderSchema = z.object({
  Authorization: z.string().openapi({
    example: "Bearer Token",
  }),
});

export const AuthMeSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.email(),
});
