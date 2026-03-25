# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies including openssl for Prisma
RUN apk add --no-cache openssl libc6-compat

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy everything for local build
COPY . .

# Install all dependencies (monorepo root)
RUN pnpm install --frozen-lockfile

# Generate Prisma client for API
RUN pnpm --filter api exec prisma generate

# Build API
RUN pnpm --filter api build


# Stage 2: Production
FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache openssl libc6-compat

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy the entire app for simplicity in local live run (avoid missing hoisted deps)
COPY --from=builder /app ./

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

# Run migrations and start API from its directory
WORKDIR /app/apps/api
CMD ["sh", "-c", "npx prisma@5.22.0 migrate deploy && node dist/main.js"]
