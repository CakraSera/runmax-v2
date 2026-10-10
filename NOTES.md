# Notes

## Workspace
- Teaching workspace root = the `runmax/feat-api` monorepo itself. Teaching files (`MISSION.md`, `RESOURCES.md`, `lessons/`, `reference/`, `assets/`) live alongside the code. If this pollutes the repo, say so and I will relocate them.

## Environment facts (verified 2026-10-04)
- PostgreSQL 16.15 running on localhost:5432 (also 15432 listening)
- `docker` CLI: permission denied for this user (`/var/run/docker.sock`); `sudo docker` presumably works
- `psql` client available; no `initdb`/server binaries outside Docker
- Deps installed via pnpm with `nodeLinker: hoisted` (everything lands in root `node_modules`)
- `apps/api/.env` does not exist; root `.env` does (concrete `DATABASE_URL`, works)

## Teaching preferences
- User asks short, direct questions in English about their own code → answer first, teach second

- Judges auth standards by Lindy (what has survived across revisions), not by the newest checklist. Teach the diff between NIST 2017 and 2025 rather than a flat "best practices" list.
- A review can be advice-only. Do not edit application code unless asked. Teaching files (`lessons/`, `reference/`, `assets/`) are fine.
- For a single confusing idea, a 7-year-old explanation is welcome: one picture, short sentences, then the real name.
- Prefer proving claims by running commands against their real stack over asserting from memory
