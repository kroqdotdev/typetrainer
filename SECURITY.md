# Security Policy

## Reporting a vulnerability

If you find a security issue in TypeTrainer, **do not open a public issue.** Instead, email [security@kroq.dev](mailto:security@kroq.dev) with:

- A description of the vulnerability.
- Steps to reproduce it.
- The potential impact.

You will receive a response within 72 hours. We will work with you to understand and fix the issue before any public disclosure.

## Scope

This policy covers:

- The TypeTrainer web application (`apps/web/`)
- The Convex backend functions (`apps/web/convex/`)
- Authentication and authorization logic
- Any deployed instance at an official domain

Out of scope:

- Third-party services (Clerk, Convex, Vercel) — report those to their respective security teams.
- Issues that require physical access to a user's device.

## Supported versions

Only the latest version on the `main` branch receives security updates. There are no legacy branches.
