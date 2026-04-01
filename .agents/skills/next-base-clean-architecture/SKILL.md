---
name: next-base-clean-architecture
description: Use this skill when working in the next-base repository to add or refactor features that should follow the project's Clean Architecture flow across domain, application, infrastructure, presentation, shared endpoints, and dependency injection. It is especially useful for CRUD/auth flows, repository wiring, React Query hooks, and route-to-feature implementation in this codebase.
---

# Next Base Clean Architecture

Use this skill for changes inside `/Users/tuyenpham/WorkSpace/Nobi/next-base` when the task involves reading the architecture, adding a new module, wiring API calls, or extending auth/CRUD flows.

## What this repo looks like

- `src/app`: Next.js App Router entrypoints and global app shell.
- `src/domain`: entities and request/response model shapes.
- `src/application`: repository contracts, DTOs, exceptions, service interfaces.
- `src/infrastructure`: HTTP client, low-level API hooks, repository implementations, service implementations.
- `src/presentation`: feature components, layout components, and user-facing hooks.
- `src/shared`: endpoints, enums, helpers, constants, URL builders, shared types.
- `src/di/RepositoriesProvider.tsx`: React Context-based DI for repositories.

Read `/Users/tuyenpham/WorkSpace/Nobi/next-base/.agents/skills/next-base-clean-architecture/references/architecture.md` before making non-trivial changes.

## Repo-specific rules

- Repositories are not classes. They are factory functions returning hook-based operations.
- Presentation hooks consume repositories through `useRepository()`.
- API integration should go through `useGetApi`, `usePostApi`, `usePutApi`, `usePatchApi`, or `useDeleteApi`.
- Shared endpoints live in `src/shared/endpoints.ts`.
- Auth/token refresh behavior is centralized in `src/infrastructure/http/HttpClient.ts`; do not duplicate refresh logic in features.
- Prefer matching the existing naming pattern exactly, even when the codebase is slightly inconsistent.

## Default workflow for a new API-backed feature

1. Read the closest existing feature first, usually `Auth` or `Users`.
2. Add or update domain models in `src/domain/models/<Feature>.ts`.
3. Add repository contract in `src/application/repositories/<Feature>Repository.ts`.
4. Add repository implementation in `src/infrastructure/repositories/<Feature>RepositoryImpl.ts`.
5. Add endpoint constants in `src/shared/endpoints.ts`.
6. Register the repository in `src/di/RepositoriesProvider.tsx` if presentation code needs it broadly.
7. Add presentation hooks in `src/presentation/hooks/<feature>/`.
8. Add feature UI in `src/presentation/features/<feature>/` or wire route components in `src/app/`.
9. Run validation with `yarn check:type`, then `yarn check:lint` or `yarn check` when the scope is broader.

## CRUD shortcut

If the task is standard CRUD scaffolding, inspect `scripts/generate-crud.mjs` and consider using:

```bash
yarn gen:api
```

Use the generator only when its output shape matches the requested feature. Review generated endpoints carefully because this repo mixes patterns such as `getAll`, `create`, and some `:id`-style paths.

## Implementation checklist

- Keep domain files focused on types/interfaces.
- Keep business-facing contracts in `application`, not `infrastructure`.
- Keep transport details inside infrastructure repositories and HTTP hooks.
- Use presentation hooks to adapt repository output for components.
- Reuse `ResponseCommon<T>` and shared common params/pagination types when applicable.
- Preserve existing route targets and redirects such as `/auth/sign-in`.

## When to inspect extra files

- For auth/session work: read `src/infrastructure/http/HttpClient.ts` and `src/shared/helpers.ts`.
- For data fetching conventions: read `src/infrastructure/hooks/useApi.ts`.
- For DI wiring: read `src/di/RepositoriesProvider.tsx`.
- For environment/config changes: read `src/env.ts`.

## Expected output style when using this skill

- Keep architecture explanations short and concrete.
- Reference the exact files touched.
- Mention whether the change affects domain, application, infrastructure, presentation, or shared layers.
- End with the validation command run, or clearly state if validation could not be run.
