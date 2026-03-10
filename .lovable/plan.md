

## Problem

There are no role-based route guards. Every authenticated user can access every route — admin, rep, and doctor. A doctor logging in gets redirected to `/doctor` by default, but can manually navigate to `/admin` and see the full admin dashboard. Same for reps accessing admin routes.

## Solution

Add a simple `RoleGuard` wrapper component that checks the user's role against the allowed role for each route group. If the role doesn't match, redirect to the user's home page.

### Changes

**1. Create `src/components/shared/RoleGuard.tsx`**
- Accepts `allowedRole: UserRole` prop
- Uses `useAuth()` to check the current user's role
- If role matches, renders `<Outlet />`
- If not, redirects to the user's correct home (`/admin`, `/rep`, or `/doctor`)

**2. Update `src/App.tsx`**
- Wrap each route group's shell with `RoleGuard`:
  - `/admin/*` → `allowedRole="admin"`
  - `/rep/*` → `allowedRole="rep"`
  - `/doctor/*` → `allowedRole="doctor"`

This is a small, surgical fix — two files, ~20 lines of new code.

