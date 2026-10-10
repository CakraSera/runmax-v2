import { eq } from "drizzle-orm";
import { OpenAPIHono } from "@hono/zod-openapi";
import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

import { AuthRegisterSchema, AuthLoginSchema } from "./schema.js";
import { PrivateUserSchema } from "../user/schema.js";

import { users, passwords } from "../../lib/db/schema.js";
import { db } from "../../lib/db/index.ts";

import {
  hashingPassword,
  verifyPassword,
  dummyHashPassword,
} from "../../lib/auth.ts";
import { signToken } from "../../lib/token.ts";
// TODO(auth MVP): 7 endpoints — register, login, refresh, logout, me, forgot-password, reset-password
// TODO(auth MVP): token strategy — JWT access (~15 min) + rotating opaque refresh (~30 days, hashed at rest)
// TODO(auth MVP): password hashing (argon2id or bcrypt); never store plaintext
// TODO(mount): mount authRoute at "/auth" in app.ts (currently commented out)

// TODO(login): request schema (email, password), zod-validated
// TODO(login): verify credentials; 401 with generic message (no user enumeration)
// TODO(login): return { access token, refresh token } on success
// TODO(login): rate limit per IP + email
// TODO(login): fix OpenAPI metadata — tags: ["Auth"], summary "Login"
//Login
export const authRoute = new OpenAPIHono();
authRoute.openapi(
  createRoute({
    method: "post",
    path: "/login",
    tags: ["Auth"],
    request: {
      body: {
        description: "User login credentials",
        content: {
          "application/json": {
            schema: AuthLoginSchema,
          },
        },
      },
    },
    summary: "Login User",
    responses: {
      200: {
        description: "Login successful",
        content: {
          "application/json": {
            schema: z.object({
              status: z.string().default("ok"),
              accessToken: z.string(),
            }),
          },
        },
      },
    },
  }),
  async (c) => {
    const { email, password } = c.req.valid("json");

    const userQuery = await db
      .select({ id: users.id, hash: passwords.hash })
      .from(users)
      .innerJoin(passwords, eq(users.id, passwords.userId))
      .where(eq(users.email, email))
      .limit(1);

    let matches: boolean = false;
    const row = userQuery[0];
    try {
      matches = await verifyPassword(
        password,
        row?.hash ?? (await dummyHashPassword()),
      );
    } catch (error) {
      matches = false;
    }

    if (!matches || !row) {
      return c.json(
        { status: "error", message: "Invalid email or password" },
        401,
      );
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey || secretKey.length < 32) {
      return c.json(
        {
          status: "error",
          message:
            "Server configuration error: JWT secret key is missing or too short",
        },
        500,
      );
    }

    const accessToken = await signToken({ userId: row.id, secretKey });

    return c.json({ status: "ok", accessToken }, 200);
  },
);

// TODO(register): request schema (email, password), zod-validated; min password length
// TODO(register): 409 on duplicate email (generic message to client)
// TODO(register): hash password (argon2id/bcrypt), create user, return 201
// TODO(register): optional — send verification email (deferred until email sender exists)
// TODO(register): fix OpenAPI metadata — tags: ["Auth"], summary "Register"
// Register
authRoute.openapi(
  createRoute({
    method: "post",
    path: "/register",
    tags: ["Auth"],
    request: {
      body: {
        description: "",
        content: { "application/json": { schema: AuthRegisterSchema } },
      },
    },
    responses: {
      201: {
        description: "Private Data User",
        content: { "application/json": { schema: PrivateUserSchema } },
      },
      400: {
        description: "Register user failed",
      },
    },
  }),
  async (c) => {
    const { username, email, fullName, role, password } = await c.req.json();

    if (!username || !email || !password) {
      return c.json(
        { status: "error", message: "Missing required fields" },
        400,
      );
    }

    if (password.length < 15) {
      return c.json(
        { status: "error", message: "Password must be at least 15 characters" },
        400,
      );
    }
    const row = await db
      .select({ userName: users.username })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (row.length > 0) {
      return c.json({ status: "error", message: "Email already exists" }, 400);
    }
    const hashedPassword = await hashingPassword(password);

    const user = await db.transaction(async (tx) => {
      const newUser = await tx
        .insert(users)
        .values({
          fullName,
          username,
          email,
        })
        .returning({ id: users.id });

      await tx.insert(passwords).values({
        userId: newUser[0].id,
        hash: hashedPassword,
      });
      return newUser[0];
    });

    return c.json({ status: "ok", userId: user.id }, 201);
  },
);

// TODO(refresh): POST /refresh — rotate refresh token, issue new pair; 401 on revoked/reused token
// TODO(logout): POST /logout — revoke current refresh token
// TODO(me): GET /me — auth guard middleware; return user id/email; first smoke test of the guard
// TODO(forgot-password): POST /forgot-password — always 200 (no user enumeration); email reset link
// TODO(forgot-password): depends on email sender — ship without this + reset if not ready at launch
// TODO(reset-password): POST /reset-password — token + new password; revoke all refresh tokens
