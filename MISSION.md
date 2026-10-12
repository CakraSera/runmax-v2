# Mission: Ship the RunMax API (Hono + Drizzle + PostgreSQL)

> Status: inferred from the repo and your first question. Confirm or correct this — it steers every future lesson.

## Why
You are building RunMax, a pnpm monorepo with a Hono API backed by PostgreSQL, and you want to learn the stack by shipping it — not by reading tutorials detached from the codebase. The concrete goal is a running, migrated database behind real endpoints (auth, users) that you fully understand.

## Success looks like
- You can take a schema change from TypeScript to a committed SQL migration to a live database without hesitation
- When `drizzle-kit` or PostgreSQL throws an error, you can diagnose it yourself instead of pasting it into a chat
- RunMax's `auth` and `users` modules run against a migrated schema you designed

## Constraints
- Learning happens inside the real repo, in short sessions, tied to whatever you are building that day
- Terse, concrete, code-first explanations; no long theory detours

## Out of scope
- Mobile app (for now)
- Infrastructure/DevOps depth beyond what the API needs (Docker basics only)
