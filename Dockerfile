# syntax=docker/dockerfile:1
# Minimal production image for the Hono API (pnpm monorepo).
# Pattern: multi-stage + non-root + healthcheck. Standard since ~2016.

FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@12.8.1 --activate
WORKDIR /app

# --- deps: install only what the API needs ---
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc ./
COPY apps/api/package.json apps/api/
COPY packages/contracts/package.json packages/contracts/
RUN pnpm install --frozen-lockfile --filter @repo/api... --prod=false

# --- runtime ---
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000

# non-root (industry default)
RUN addgroup -g 1001 -S nodejs && adduser -S -u 1001 -G nodejs nodejs

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=deps /app/packages/contracts/node_modules ./packages/contracts/node_modules
COPY pnpm-workspace.yaml package.json ./
COPY apps/api ./apps/api
COPY packages/contracts ./packages/contracts

WORKDIR /app/apps/api
USER nodejs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1

# tsx is already a dependency; noEmit tsconfig + .js imports make a pure tsc build awkward.
# For a Lindy-minimal start this is acceptable. Later: compile with tsc/esbuild and drop tsx.
CMD ["pnpm", "exec", "tsx", "src/index.ts"]
