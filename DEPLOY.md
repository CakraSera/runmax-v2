# Deploy API (minimal Docker)

## Run locally / single host

```bash
cp .env.example .env   # fill DATABASE_URL if you override
docker compose up -d --build
curl http://localhost:3000/health
```

## What this is

- Multi-stage Dockerfile (build deps once, run slim)
- Non-root user (`nodejs`)
- Healthcheck on `/health`
- Compose: Postgres + API, same pattern as production
- API binds `0.0.0.0` so the published port works

## Why this shape (Lindy / industry)

- Multi-stage images: standard since Docker 17.05 (2017). Smaller attack surface, faster pulls.
- Non-root: default recommendation in Node and Docker docs for years.
- Healthchecks + restart policy: how orchestrators (Compose, Swarm, k8s) decide if the process is alive.
- Read `PORT` from the environment: 12-factor app (Heroku, 2011) and every PaaS since.
- `postgres` official image + named volume: the boring, proven way to run Postgres in a container for years.

## References to learn the pieces

1. Docker multi-stage builds  
   https://docs.docker.com/build/building/multi-stage/

2. Node.js in Docker best practices (official)  
   https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md

3. 12-factor config (env vars, not files)  
   https://12factor.net/config

4. Docker Compose reference  
   https://docs.docker.com/compose/

5. Postgres Docker Hub (official image)  
   https://hub.docker.com/_/postgres

6. pnpm filtering in monorepos  
   https://pnpm.io/filtering

7. Healthchecks in Compose  
   https://docs.docker.com/compose/compose-file/05-services/#healthcheck

## Later (when you outgrow this)

- Compile TypeScript in the image (`tsc` or `esbuild`) and drop `tsx` from the runtime.
- Move Postgres to a managed service (Neon, RDS) and only containerize the API.
- Add a release command that runs `drizzle-kit migrate` before the process starts.
