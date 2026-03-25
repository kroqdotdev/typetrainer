# TypeTrainer

TypeTrainer teaches you to code — starting with Python, expanding to JavaScript, TypeScript, Rust, Go, Ruby, and C++.

Sign up with Google, GitHub, or Apple. Your progress syncs across devices via Convex. The app runs on the web today; Android and iOS are on the roadmap.

## Stack

| Layer | Tech |
|-------|------|
| Web | Next.js 16, React 19, Tailwind CSS 4 |
| Mobile | Expo 55 (placeholder) |
| Auth | Clerk (OAuth — Google, GitHub, Apple) |
| Backend | Convex (real-time database, server functions) |
| Monorepo | pnpm workspaces |

## Getting started

```bash
# Clone and install
git clone https://github.com/kroqdotdev/typetrainer.git
cd typetrainer
pnpm install

# Set up environment variables
cp apps/web/.env.example apps/web/.env.local
# Fill in your Clerk and Convex keys (see below)

# Start Convex and the dev server
cd apps/web && npx convex dev   # terminal 1
pnpm dev                        # terminal 2 (from repo root)
```

### Environment variables

Create a Clerk application at [dashboard.clerk.com](https://dashboard.clerk.com) and a Convex project with `npx convex dev`. Then fill in `apps/web/.env.local`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
CONVEX_DEPLOYMENT=dev:your-project-name
NEXT_PUBLIC_CONVEX_URL=https://your-project-name.convex.cloud
```

Set the Clerk JWT issuer domain in Convex:

```bash
npx convex env set CLERK_JWT_ISSUER_DOMAIN https://your-clerk-domain.clerk.accounts.dev
```

## Project structure

```
typetrainer/
  apps/
    web/           Next.js web app
    mobile/        Expo app (Android + iOS placeholder)
  packages/
    shared/        Types and language definitions
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

To report a vulnerability, see [SECURITY.md](SECURITY.md).

## License

AGPL-3.0 — see [LICENSE](LICENSE).

Built by [kroq.dev](https://kroq.dev).
