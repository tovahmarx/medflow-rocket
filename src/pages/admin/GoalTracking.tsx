import { TopBar } from '@/components/layout/TopBar';
import { AIInsightCard } from '@/components/shared/AIInsightCard';
import { AvatarCircle } from '@/components/shared/AvatarCircle';
import { reps, repPerformance, users } from '@/data/mock-data';

const goals = [
  { userId: 'u2', name: 'Clint M.', initials: 'CM', revenue: { target: 300000, actual: 246000 }, calls: { target: 200, actual: 156 }, accounts: { target: 8, actual: 5 }, aiNote: 'At current pace, Clint will hit 94% of revenue target.' },
  { userId: 'u3', name: 'Sara L.', initials: 'SL', revenue: { target: 300000, actual: 192000 }, calls: { target: 200, actual: 134 }, accounts: { target: 8, actual: 4 }, aiNote: 'Sara needs 6 more calls/week to hit call target.' },
  { userId: 'u4', name: 'James R.', initials: 'JR', revenue: { target: 300000, actual: 110000 }, calls: { target: 200, actual: 89 }, accounts: { target: 8, actual: 2 }, aiNote: 'James is significantly behind. Consider coaching session.' },
  { userId: 'u5', name: 'Priya N.', initials: 'PN', revenue: { target: 300000, actual: 320000 }, calls: { target: 200, actual: 187 }, accounts: { target: 8, actual: 7 }, aiNote: 'Priya has already exceeded revenue target. On track for all goals.' },
];

function ProgressBar({ label, actual, target }: { label: string; actual: number; target: number }) {
  const pct = Math.min(100, Math.round((actual / target) * 100));
  const color = pct >= 80 ? 'bg-success' : pct >= 60 ? 'bg-warning' : 'bg-destructive';
  const format = (v: number) => v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `${v}`;
  return (
    <div className="mt-1">
      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
        <span>{label}</span>
        <span>{format(actual)} / {format(target)} ({pct}%)</span>
      </div>
      <div className="mt-0.5 h-1.5 w-full rounded-full bg-muted">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function GoalTracking() {
  return (
    <>
      <TopBar title="Goals" />
      <div className="space-y-4 p-4">
        {/* Team Aggregate */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
          <p className="text-sm font-medium text-foreground">Team is at 72% of Q1 target with 22 days remaining.</p>
        </div>

        <button className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground tap-target">Set Goals</button>

        {goals.map(g => (
          <div key={g.userId} className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3 mb-3">
              <AvatarCircle initials={g.initials} size="sm" />
              <p className="text-sm font-semibold text-foreground">{g.name}</p>
            </div>
            <ProgressBar label="Revenue" actual={g.revenue.actual} target={g.revenue.target} />
            <ProgressBar label="Calls" actual={g.calls.actual} target={g.calls.target} />
            <ProgressBar label="New Accounts" actual={g.accounts.actual} target={g.accounts.target} />
            <AIInsightCard className="mt-3">{g.aiNote}</AIInsightCard>
          </div>
        ))}
      </div>
    </>
  );
}
