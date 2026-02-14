# Study Web

Next.js web app for the Study frontend, designed to interact with another app backend.

## Tech Stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS, Shadcn UI
- **State Management:** TanStack Query (Server), Zustand (Client)
- **Forms:** React Hook Form, Zod
- **Build Tools:** pnpm

## Getting Started

```bash
pnpm install
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint
- `pnpm test`: Run Jest unit tests

## Project Structure

This project follows a **Feature-based Architecture**.

- `app/` - Routes and layouts
- `features/` - Scalable domain modules. Each is self-contained with its own `components`, `hooks`, `services`, `types`.
- `components/` - Shared UI (primitives in `ui/`, global widgets in `shared/`)
- `services/` - Global API clients and integrations
- `store/` - Global Zustand stores
- `lib/` - Utilities

## Architecture Highlights

- **Authentication:** Session cookie based, managed via `proxy.ts`.
- **API Proxy:** Requests to `/api/*` are proxied to the backend (`API_PROXY_TARGET`).
- **State Strategy:** Use TanStack Query for data fetching/caching; Zustand for global UI state; Local state for ephemerals.

## Coding Standards

- **Naming:** PascalCase for components (`UserProfile.tsx`) and named exports.
- **Styling:** Tailwind CSS with `cn()` utility for class merging.
- **Imports:** External -> Internal Aliases (`@/...`) -> Relative.
- **Testing:** Unit tests collocated with components or in `__tests__`.

