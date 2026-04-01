# next-base architecture notes

## Current shape

- Framework: Next.js 15 App Router with React 19 and TypeScript.
- Data fetching/state: TanStack React Query.
- HTTP transport: Axios wrapped by a singleton `HttpClient`.
- Styling: Tailwind CSS 4.
- Validation/config: Zod via `@t3-oss/env-nextjs`.

## Layer mapping in this repo

### `src/domain`

- Holds core model and request types such as `Auth.ts` and `Users.ts`.
- Also contains common parameter types in `domain/models/common`.

### `src/application`

- Holds repository interfaces such as `AuthRepository` and `UsersRepository`.
- Holds DTO wrappers like `ResponseCommon<T>`.
- Holds cross-cutting exception/service interfaces.

### `src/infrastructure`

- `http/HttpClient.ts`: axios instance, auth header injection, token refresh queue, logout redirect.
- `hooks/useApi.ts`: generic React Query wrappers for GET and mutations.
- `repositories/*RepositoryImpl.ts`: bridge from repository contracts to concrete endpoints and API hooks.
- `services/*Impl.ts`: infrastructure implementations for app services like logger and local storage.

### `src/presentation`

- `hooks/`: feature-facing hooks that call repositories through DI.
- `features/`: feature UI blocks.
- `layouts/` and `components/`: shared UI structure.

### `src/di`

- `RepositoriesProvider.tsx` creates repository instances and exposes them with React Context.
- Any hook using `useRepository()` must run under this provider.

### `src/shared`

- `endpoints.ts`: central endpoint registry.
- `helpers.ts`: token persistence/logout helpers.
- `url.ts`: URL construction for query and path params.
- `types/react-query.ts`: shared query option types.

## Important implementation patterns

### Repository contract pattern

- Application repositories return `ReturnType<typeof useGetApi>` or mutation hook return types.
- This means repositories are designed to be consumed in React hook contexts, not plain service classes.

### DI pattern

- `RepositoryProvider` memoizes repository instances once.
- To add a new repository broadly, update the container type and provider value in `src/di/RepositoriesProvider.tsx`.

### Auth/session pattern

- Access token and refresh token are read from storage in request interceptors.
- A 401 triggers refresh logic unless the failing request is the refresh endpoint itself.
- Failed refresh leads to logout and redirect to `/auth/sign-in`.

### Query/mutation pattern

- Query keys are arrays of `[endpoint, urlParams, queryParams]`.
- `useMutationApi` passes through optional headers and custom success/error callbacks.
- Abort signals come from `useAxios()` and the shared `HttpClient`.

## Known realities of the current repo

- `src/app/page.tsx` is still close to the default Next.js starter page.
- The repo already has auth and users examples, so those should be treated as primary templates.
- Endpoint naming is centralized but not perfectly uniform; match existing conventions before "improving" them.
- `package.json` exposes `yarn gen:api`, `yarn check:type`, `yarn check:lint`, and `yarn check`.

## Recommended reading order

1. `README.md`
2. `src/di/RepositoriesProvider.tsx`
3. `src/infrastructure/hooks/useApi.ts`
4. `src/infrastructure/http/HttpClient.ts`
5. Closest existing repository pair and presentation hook for the feature area
