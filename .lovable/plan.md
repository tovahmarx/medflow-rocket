

# MedFlow — Medical Sales Platform Implementation Plan

## Overview
MedFlow is a mobile-first medical sales operating system with three role-based experiences: **Admin (Kelly)**, **Sales Rep (Clint/Sara)**, and **Doctor (Dr. Osei)**. All data is mocked — no backend. Light theme only with green (#10B981) accent.

## Design System Foundation
- Custom Tailwind theme: white backgrounds, Inter font, green accent palette, 44px min tap targets
- 12 reusable components: StatCard, Badge, ListRow, BottomSheet, EmptyState, FilterBar, FAB, AIInsightCard, ApprovalCard, LeaderboardRow, SearchBar, CadenceRing, PreCallBriefCard, OfflineBanner
- Mobile-first layout: bottom tab bar (mobile), left sidebar (desktop 768px+)
- Bottom sheets on mobile, centered modals on desktop

## Phase 1 — Core Shell & Login
- **Login screen** with demo account quick-fill buttons, role-based routing
- **Three app shells** with role-specific bottom tab navigation (5 tabs each) and "More" overflow menu
- **Global top bar** with search icon, bell icon (notification badge), help icon
- Mock auth context to manage current user/role

## Phase 2 — Admin Core Screens
- **Command Center**: AI briefing card, 6 stat cards, revenue bar chart, pipeline funnel, overdue alerts, inventory alerts, pending approvals link, live activity feed
- **Sales Reps**: 4 rep list with activity scores, pipeline $, AI badges, goal progress; tap → detail with 7 tabs
- **Doctor Accounts**: Doctor list with CadenceRings, NPI search mock, filter bar (Top/Repeat/At Risk/Cold/Overdue); tap → detail with 8 tabs
- **Comms Center**: Live feed of all rep communications with filters; tap call → detail with AI summary + mock audio player

## Phase 3 — Sales Rep Core Screens
- **My Tasks**: AI morning briefing, prioritized task list with urgency borders, cadence rings, pre-call brief cards, completion tracking
- **Comms Hub** (4 sub-tabs): Phone (dial pad + call states + post-call flow), Text (threaded messaging + AI draft replies), Email (inbox/sent/compose + AI draft), Video (mock video call UI + screen share + content presentation)
- **Conference Lead Capture**: 4-step wizard with NPI auto-fill, interest rating, voice notes mock, AI lead scoring
- **My Pipeline**: 6-stage kanban-style view with deal cards, AI win probability, stage movement

## Phase 4 — Doctor Portal
- **Home**: Smart reorder AI prompt, 3 stat cards, recent orders, My Rep card
- **Order Products**: Product cards with qty selectors, "usual order" shortcut, AI cross-sell, sticky cart bar, checkout flow with mock Stripe, auto-reorder toggle
- **Order History**: Order list with expand → line items; reorder button; auto-reorder management
- **My Rep**: Rep contact card, schedule video call, product feedback (star rating), document signing mock, usage analytics charts
- **Learn**: Video library with categories, watch progress, upcoming webinars

## Phase 5 — Admin Operations
- **Approvals**: Queue with ApprovalCards (compliance, expense, discount, content, deal) + approve/reject/request changes
- **Sunshine Act Compliance**: Stat cards, log form with NPI search, entry list with AI-suggested entries, CMS export
- **Sample Lot Tracker**: 5 stat cards, log form, sample list with chain of custody detail, FDA export
- **Inventory Tracker**: 4 product cards with stock progress bars, reorder alerts
- **Billing & Invoicing**: 3 stat cards, tabs (Invoices/Fee Ledger/P&L), invoice detail with line items, AI revenue forecast
- **Email Sequence Builder**: 5 sequence cards with stats, timeline editor, email preview with variable placeholders, analytics tab

## Phase 6 — Rep Secondary Screens
- **Commission Dashboard**: Earned stats, monthly bar chart, tier progress, goal tracker, AI forecast
- **Route Planner**: Map with 4 numbered stops, drive times, AI suggestion to add overdue doctors, check-in + navigate
- **Quote Builder**: NPI doctor search, product line items, discount (with approval threshold), PDF preview, send via email/link
- **Expense Tracker**: Log form with mileage auto-calc, receipt upload mock, AI Sunshine Act cross-check, monthly totals
- **Content Library (Rep)**: Approved content browse, "Present to Doctor" full-screen mode with slide tracking, send to doctor
- **My Contacts**: Rep-filtered doctor list with CadenceRings, pre-call briefs, log referral form
- **Objection Library**: 7 categories, 3 response variants per objection, AI personalization per doctor

## Phase 7 — Collaboration & Analytics
- **Leaderboard** (Admin + Rep views): Toggle categories (Revenue/Calls/Leads/Pipeline/Presentations/Commission), badges, challenges, personal highlights for rep view
- **Goal Setting & Tracking**: Per-rep quarterly goals with progress bars, AI projections, team aggregate
- **Territory Map**: US map SVG with color-coded regions, rep pins, visit trails, cadence heat map toggle
- **Calendar** (Admin + Rep): Month/week/day views, color-coded event types, create event form with NPI search
- **Internal Chat**: Conversation list with unread badges, chat bubbles UI, read receipts
- **Training Hub**: 6 modules with completion tracking, mock video player, live sessions, upload module form

## Phase 8 — Admin Management & Global Features
- **Rep Onboarding Wizard**: 6-step wizard (info, territory, sequences, commission with live preview, training, launch review)
- **Doctor Invitation System**: Invite form with NPI search, invitation list with status badges, resend/revoke
- **Audit Log**: Filterable table with timestamp, user, action, target, IP
- **Reporting & Exports**: 9 report cards with mock previews, PDF/CSV buttons
- **Settings**: Collapsible sections for all configuration (commission tiers, cadence rules, products, notifications, approval thresholds, etc.)
- **Global Search**: Full-screen overlay, results grouped by category, recent searches
- **Notification System**: Bell icon → notification panel with categorized alerts
- **Onboarding Tour**: Role-specific guided tooltip overlay (Admin 5 steps, Rep 5 steps, Doctor 3 steps)
- **Help & Support**: FAQ accordion, contact/bug report forms

## State Management
- React Context for: current user/role, cart (doctor), notification state, tour state
- useState/useReducer for all screen-level state
- Centralized mock data files organized by domain (users, products, orders, pipeline, communications, etc.)

## Navigation Structure
- **Admin tabs**: Command · Reps · Comms · Approvals · More (18 additional screens)
- **Rep tabs**: Tasks · Comms · Capture · Pipeline · More (12 additional screens)
- **Doctor tabs**: Home · Order · History · Learn · My Rep
- React Router with role-based route guards

