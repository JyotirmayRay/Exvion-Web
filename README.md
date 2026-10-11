# Exvion Monorepo

Enterprise digital services and multi-channel lead generation platform built with Turborepo, Next.js 14, NestJS, and Prisma.

## Repository Structure

```
.
├── apps/
│   ├── web/           # Customer-facing marketing & booking site (Next.js 14)
│   ├── admin/         # Internal CRM & leads dashboard (Next.js 14)
│   └── api/           # Backend REST API (NestJS + Prisma)
└── packages/
    ├── config/        # Shared environment & site configuration
    ├── database/      # Prisma ORM schema & client
    ├── types/         # Shared TypeScript interfaces & types
    ├── ui/            # Shared React UI component library
    ├── utils/         # Common utility helpers
    ├── eslint-config/ # ESLint 9 configuration
    └── typescript-config/ # TypeScript configurations
```

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 8.15 (`corepack enable && corepack prepare pnpm@8.15.5 --activate`)

### Installation

```bash
pnpm install
```

### Development

To run all apps concurrently:

```bash
pnpm dev
```

- **Web (Customer App):** [http://localhost:3000](http://localhost:3000)
- **Admin (CRM App):** [http://localhost:3002](http://localhost:3002)
- **API (NestJS):** [http://localhost:3001](http://localhost:3001)

### Building

```bash
# Build all packages & applications
pnpm build

# Build only customer web app
pnpm build:web

# Typecheck and lint
pnpm check-types
pnpm lint
```

---

## Deploying to Vercel (vercel.com)

`apps/web` is optimized and pre-configured for deployment on Vercel.

### Recommended Setup (Single Project: Web Frontend)

1. **Import Repository**:
   - Go to [vercel.com/new](https://vercel.com/new) and select `Exvion-Web`.

2. **Configure Project Settings**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web` *(Important: click Edit and choose `apps/web`)*
   - **Build Command**: `pnpm build` (or leave default `next build`)
   - **Install Command**: `pnpm install` (or leave default)
   - **Output Directory**: `.next`

3. **Environment Variables**:
   Add the following in the Vercel Project Settings under **Environment Variables**:

   | Key | Description | Example / Default |
   |-----|-------------|-------------------|
   | `NEXT_PUBLIC_API_URL` | Base URL of your backend NestJS API | `https://api.exvionglobal.com` |

   > **Note**: If `NEXT_PUBLIC_API_URL` is omitted, the frontend automatically routes API requests through `/api/*` which proxies to `https://api.exvionglobal.com/api/*` via the included `vercel.json` rewrites.

4. **Deploy**:
   Click **Deploy**. Vercel will automatically build the Next.js static and serverless artifacts.

---

### Deploying Admin App to Vercel

To deploy `apps/admin` as a separate project on Vercel:

1. Import the same repository into a new Vercel project (e.g. `exvion-admin`).
2. Set **Root Directory** to `apps/admin`.
3. Set **Framework Preset** to `Next.js`.
4. Configure environment variables (`NEXT_PUBLIC_API_URL=https://api.exvionglobal.com`).
5. Deploy.
