# Contributing to TypeTrainer

Contributions are welcome. This document explains how to get involved.

## Before you start

- Check [open issues](https://github.com/kroqdotdev/typetrainer/issues) for existing work or duplicates.
- For large changes, open an issue first to discuss the approach.

## Development setup

```bash
git clone https://github.com/kroqdotdev/typetrainer.git
cd typetrainer
pnpm install
```

Copy `apps/web/.env.example` to `apps/web/.env.local` and fill in your Clerk and Convex credentials. See the [README](README.md) for details.

## Workflow

1. Fork the repo and create a branch from `main`.
2. Make your changes.
3. Run the checks:
   ```bash
   pnpm build          # must pass
   pnpm lint           # must pass
   pnpm format:check   # must pass (run pnpm format to fix)
   ```
4. Open a pull request against `main`.

## Code style

- TypeScript everywhere.
- Prettier handles formatting — run `pnpm format` before committing.
- ESLint handles linting — run `pnpm lint` to check.
- No unused imports. No `any` types unless unavoidable.

## Commits

Write short, direct commit messages. Lead with what changed and why — not how.

```
Good: Fix light mode contrast on language cards
Bad:  Updated the CSS styles for better UX experience across themes
```

## Pull requests

- Keep PRs focused. One concern per PR.
- Include a short description of what changed and why.
- Screenshots help if you changed UI.

## Adding a new language

Language definitions live in `packages/shared/src/languages.ts`. To add a new language:

1. Add the entry to the `languages` array.
2. Set `available: false` until lessons exist.
3. Course content will go in `packages/shared/src/courses/<language>/` (structure TBD).

## License

By contributing, you agree that your contributions will be licensed under AGPL-3.0.
