# MedFlow Rocket

## Project Overview
MedFlow Rocket is a medical/pharma sales CRM platform with three user roles: Sales Rep, Doctor, and Admin. Built with React + Vite + TypeScript + shadcn/ui + Tailwind CSS. Originally scaffolded with Lovable.

**Live URL:** https://medflow-rocket.vercel.app
**Repo:** https://github.com/tovahmarx/medflow-rocket

## Tech Stack
- **Framework:** React 18 + TypeScript
- **Build:** Vite
- **Styling:** Tailwind CSS + shadcn/ui (Radix primitives)
- **Routing:** React Router DOM
- **State:** React Context (Auth, Cart, Tour) + TanStack React Query
- **Deployment:** Vercel (auto-deploy on push)

## Project Structure
```
src/
  App.tsx                    # Root routes + providers
  main.tsx                   # Entry point
  contexts/
    AuthContext.tsx           # Role-based auth (admin/rep/doctor)
    CartContext.tsx           # Doctor product cart
    TourContext.tsx           # Onboarding tour state
  layouts/
    AdminShell.tsx            # Admin sidebar layout
    RepShell.tsx              # Rep sidebar layout
    DoctorShell.tsx           # Doctor sidebar layout
  pages/
    LoginPage.tsx             # Role selector login
    admin/                    # 19 admin pages
      CommandCenter.tsx       # Admin dashboard
      SalesReps.tsx           # Manage reps
      DoctorAccounts.tsx      # Manage doctors
      Approvals.tsx           # Quote/expense approvals
      InventoryTracker.tsx    # Sample inventory
      Compliance.tsx          # Compliance tracking
      TerritoryMap.tsx        # Territory management
      Reports.tsx             # Analytics/reports
      ... (11 more)
    rep/                      # 11 rep pages
      MyTasks.tsx             # Daily tasks
      MyPipeline.tsx          # Sales pipeline
      CommsHub.tsx            # Communications
      LeadCapture.tsx         # Lead capture
      Commission.tsx          # Commission tracking
      RoutePlanner.tsx        # Visit route planning
      QuoteBuilder.tsx        # Build quotes
      ExpenseTracker.tsx      # Expense reports
      ContentLibrary.tsx      # Sales materials
      MyContacts.tsx          # Contact management
      ObjectionLibrary.tsx    # Objection handling scripts
    doctor/                   # 5 doctor pages
      DoctorHome.tsx          # Doctor dashboard
      OrderProducts.tsx       # Product ordering
      OrderHistory.tsx        # Past orders
      Learn.tsx               # Educational content
      MyRep.tsx               # Contact rep
    shared/                   # Cross-role pages
      Leaderboard.tsx         # Sales leaderboard
      CalendarPage.tsx        # Calendar
      Chat.tsx                # Messaging
      TrainingHub.tsx         # Training materials
      HelpSupport.tsx         # Help/support
  components/
    ui/                       # shadcn/ui components
    shared/                   # Cross-role components
    layout/                   # Layout components
  data/
    mock-data.ts              # Mock/seed data
```

## Roles
- **Admin:** Full platform management — reps, doctors, inventory, compliance, territories, approvals, analytics
- **Rep (Sales Rep):** CRM tools — pipeline, tasks, contacts, quotes, commissions, route planning, expense tracking
- **Doctor:** Product ordering, order history, educational content, rep contact

## Commands
```bash
npm run dev        # Start dev server (port 8080)
npm run build      # Production build
npm run preview    # Preview production build
npm test           # Run tests
```

## Key Conventions
- Path alias: `@/` maps to `src/`
- All UI components from shadcn/ui (Radix-based)
- Role-based routing with RoleGuard component
- Tailwind for all styling — no CSS modules
- Mock data in `src/data/mock-data.ts`
