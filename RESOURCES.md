# RunMax API Resources (Hono + Drizzle + PostgreSQL)

## Knowledge

- [Drizzle ORM docs: Migrations fundamentals](https://orm.drizzle.team/docs/migrations)
  The mental model behind `generate` / `migrate` / `push` / `pull`. Use for: choosing and defending a migration workflow.
- [Drizzle docs: `drizzle-kit generate`](https://orm.drizzle.team/docs/drizzle-kit-generate) · [`migrate`](https://orm.drizzle.team/docs/drizzle-kit-migrate) · [`drizzle.config.ts`](https://orm.drizzle.team/docs/drizzle-config-file)
  Command reference for the CLI your `db:*` scripts wrap. Use for: exact flags, config fields, output locations.
- [Drizzle docs: PostgreSQL column types](https://orm.drizzle.team/docs/column-types)
  Authoritative list of `pg-core` column builders (`uuid`, `char`, `varchar`, timestamps). Use for: writing or reviewing schema code.
- [PostgreSQL 18 docs: UUID functions](https://www.postgresql.org/docs/18/functions-uuid.html)
  Defines `uuidv7()`. Use for: ID strategy decisions — note the function is PG18+ only.
- [PostgreSQL 16 docs: Data types — Character types](https://www.postgresql.org/docs/16/datatype-character.html)
  Why `char(n)` is padded/fixed and how it compares in FKs. Use for: type-mismatch errors.
- [node-postgres (`pg`) docs](https://node-postgres.github.io/)
  Pool/client behaviour behind `drizzle-orm/node-postgres`. Use for: connection pooling and shutdown semantics.

## Wisdom (Communities)

- [Drizzle Team Discord](https://discord.gg/yfjTbVXMW4)
  Official server; core devs answer. Use for: drizzle-kit errors and migration workflow questions.
- [Hono Discord](https://discord.gg/hono) / [Hono GitHub discussions](https://github.com/honojs/hono/discussions)
  Use for: middleware, zod-openapi route design, deployment questions.
- [r/PostgreSQL](https://reddit.com/r/PostgreSQL)
  Moderated, high-signal DBA community. Use for: schema design critique, constraint/index questions.

## Gaps

- No trusted resource yet on `@hono/zod-openapi` + Scalar reference setup (their docs are thin). Find a high-quality example repo before lesson on OpenAPI route design.
- No seeding resource pinned yet — revisit when RunMax needs seed data.
