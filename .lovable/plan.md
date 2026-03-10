

## Problem

Several pages still show identical hardcoded data regardless of which user is logged in. The pages already fixed (MyTasks, MyPipeline, MyContacts, Commission, DoctorHome, OrderHistory, MyRep) correctly filter by `user.id`, but these do not:

### Pages needing per-user filtering

| Page | Issue |
|------|-------|
| **CalendarPage** | Same 5 events for everyone; should show only the logged-in rep's events (or all for admin) |
| **ExpenseTracker** | Same 4 expenses for every rep; should vary per rep |
| **RoutePlanner** | Same 4 stops for every rep; should vary per rep |
| **QuoteBuilder** | Same 4 quotes for every rep; should vary per rep |
| **CommsHub** | Phone/text/email UI is generic (acceptable), but recent call history should vary |
| **Leaderboard** (rep view) | "You're #2" highlight is hardcoded; should dynamically find the logged-in rep's rank and gap |

Pages that are correctly shared (same for all users by design): ContentLibrary, ObjectionLibrary, Learn, OrderProducts catalog, TrainingHub (already uses `user.id`).

### Plan

1. **Add per-rep mock data** to `mock-data.ts` for expenses, routes, and quotes keyed by rep ID
2. **CalendarPage** -- add rep-specific events; filter by `user.id` for reps, show all for admin
3. **ExpenseTracker** -- key expenses by `repId`, filter by logged-in user
4. **RoutePlanner** -- key routes by `repId`, filter by logged-in user
5. **QuoteBuilder** -- key quotes by `repId`, filter by logged-in user
6. **Leaderboard** -- dynamically compute the rep highlight ("You're #X — $Y behind Z") from the category data and `user.id`

Each page will import `useAuth`, grab `user.id`, and filter its data set -- same pattern already established in MyTasks/MyPipeline/MyContacts.

