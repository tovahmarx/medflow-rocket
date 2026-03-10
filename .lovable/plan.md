

## Making MedFlow Look Premium & Professional

The app currently looks flat and basic due to: no shadows/depth, plain borders everywhere, a very bright green primary, low-contrast cards barely distinguishable from the background, and uniform styling with no visual hierarchy. Here's the plan to make it feel like a polished SaaS product.

### 1. Refined Color Palette (index.css)
- **Shift primary** from bright mint green (160 84% 39%) to a deeper, more sophisticated teal-green (164 70% 34%) — still green, but richer
- **True white cards** instead of near-white gray (card: 0 0% 100%) so they pop against the background
- **Slightly warm gray background** (220 14% 96%) for better card contrast
- **Richer muted-foreground** for better readability
- **Softer border color** to reduce the "boxy" feeling

### 2. Shadows & Depth (shared components)
- **StatCard**: Add `shadow-sm` and subtle hover lift transition
- **ListRow**: Replace flat border with `shadow-sm border-0` for a floating card feel
- **AIInsightCard**: Add a subtle left accent bar + soft shadow instead of just a tinted background
- **Cards across pages**: Use `shadow-sm hover:shadow-md transition-shadow` pattern

### 3. Typography & Spacing Refinements
- **TopBar**: Increase font weight, add a subtle bottom shadow instead of just a border
- **Section headers** inside pages: Use tracking-wide uppercase labels (like "PIPELINE FUNNEL") for a more structured feel
- **Page content areas**: Slightly more generous padding (p-5 instead of p-4)

### 4. Component Polish
- **Buttons**: Add subtle shadow to primary buttons (`shadow-sm`), slightly rounded corners
- **StatusBadge**: Add a subtle border matching the variant color for more definition
- **AvatarCircle**: Add a ring/border for more polish, gradient backgrounds
- **BottomTabBar**: Add top shadow instead of just border, frosted glass effect with `backdrop-blur`
- **DesktopSidebar**: Softer background, active item gets a left accent bar

### 5. Micro-interactions
- Add `transition-all duration-200` to cards and interactive elements
- Subtle scale on tap for mobile (`active:scale-[0.98]`)

### Files Changed
- `src/index.css` — color palette refinements, new utility classes
- `src/components/shared/StatCard.tsx` — shadow + hover
- `src/components/shared/ListRow.tsx` — shadow + transitions
- `src/components/shared/AIInsightCard.tsx` — accent bar + shadow
- `src/components/shared/StatusBadge.tsx` — subtle border
- `src/components/shared/AvatarCircle.tsx` — ring + gradient
- `src/components/layout/TopBar.tsx` — shadow + refined styling
- `src/components/layout/BottomTabBar.tsx` — backdrop blur + shadow
- `src/components/layout/DesktopSidebar.tsx` — active accent bar
- `src/components/shared/FAB.tsx` — larger shadow + hover animation

This is purely visual — no logic changes, no new dependencies. Every page benefits automatically since it's done at the component level.

