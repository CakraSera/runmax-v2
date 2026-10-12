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

- [NIST SP 800-63B-4 — Password verifiers](https://pages.nist.gov/800-63-4/sp800-63b/authenticators/#passwordver)
  Current normative SHALLs for a password login: length, rate limit, protected channel, salted hash, no composition rules. Use for: deciding what is required now.
- [NIST SP 800-63B §5.1.1.2 (June 2017)](https://github.com/usnistgov/800-63-3/blob/nist-pages/sp800-63b/sec5_authenticators.md)
  Superseded 1 Aug 2025. Use for: the Lindy diff — which SHALLs held (rate limit, salted hash, TLS) and which number moved (8 → 15).
- [OWASP ASVS 4.0.3 V2 Authentication](https://github.com/OWASP/ASVS/blob/master/4.0/en/0x11-V2-Authentication.md)
  Level 1 vs Level 3. Use for: what is the minimum (throttle, 100 failures/hour/account) versus what is AAL3 (phishing resistance).
- [OWASP Authentication Cheat Sheet — error messages](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-responses)
  Generic failure body, and the early-return timing example. Use for: enumeration, including time.
- [OWASP Logging Cheat Sheet — data to exclude](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html#data-to-exclude)
  Never log passwords, access tokens, session identifiers, or encryption keys. Use for: the `console.log` fail.
- [node-argon2 README](https://github.com/ranisalt/node-argon2#usage)
  Defaults follow the Argon2 team; do not weaken them for passwords. Use for: whether `argon2.hash()` with no options is enough.

## Wisdom (Communities)

- [Drizzle Team Discord](https://discord.gg/yfjTbVXMW4)
  Official server; core devs answer. Use for: drizzle-kit errors and migration workflow questions.
- [Hono Discord](https://discord.gg/hono) / [Hono GitHub discussions](https://github.com/honojs/hono/discussions)
  Use for: middleware, zod-openapi route design, deployment questions.
- [Information Security Stack Exchange](https://security.stackexchange.com/)
  Moderated Q&A. Use for: whether RunMax should stop at the login floor or move to AAL2 — that depends on what an account can do.
- [r/PostgreSQL](https://reddit.com/r/PostgreSQL)
  Moderated, high-signal DBA community. Use for: schema design critique, constraint/index questions.

## Gaps

- No trusted resource yet on `@hono/zod-openapi` + Scalar reference setup (their docs are thin). Find a high-quality example repo before lesson on OpenAPI route design.
- No seeding resource pinned yet — revisit when RunMax needs seed data.
