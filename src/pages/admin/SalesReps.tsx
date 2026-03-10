import { TopBar } from '@/components/layout/TopBar';
import { AvatarCircle } from '@/components/shared/AvatarCircle';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { reps, repPerformance, users } from '@/data/mock-data';

export default function SalesReps() {
  return (
    <>
      <TopBar title="Sales Reps" />
      <div className="space-y-3 p-4">
        {reps.map(rep => {
          const perf = repPerformance.find(p => p.userId === rep.id)!;
          const scoreColor = perf.activityScore >= 80 ? 'bg-success' : perf.activityScore >= 60 ? 'bg-warning' : 'bg-destructive';
          return (
            <div key={rep.id} className="rounded-lg border bg-card p-4">
              <div className="flex items-start gap-3">
                <AvatarCircle initials={rep.initials} size="lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{rep.name}</p>
                      <p className="text-xs text-muted-foreground">{rep.territory}</p>
                    </div>
                    <StatusBadge variant={perf.statusBadge === 'Hot' ? 'danger' : perf.statusBadge === 'Warm' ? 'warning' : 'neutral'}>
                      {perf.statusBadge}
                    </StatusBadge>
                  </div>

                  {/* Activity Score */}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-2 flex-1 rounded-full bg-muted">
                      <div className={`h-2 rounded-full ${scoreColor}`} style={{ width: `${perf.activityScore}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-foreground">{perf.activityScore}%</span>
                  </div>

                  {/* Stats Row */}
                  <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                    <span>Pipeline: <span className="font-medium text-foreground">${(perf.pipeline / 1000000).toFixed(2)}M</span></span>
                    <span>{perf.dealCount} deals</span>
                    <span>{perf.callsToday} calls</span>
                  </div>

                  {/* AI Badge + Goal */}
                  <div className="mt-2 flex items-center justify-between">
                    <StatusBadge variant={perf.aiBadge === 'Crushing it' ? 'success' : perf.aiBadge === 'On track' ? 'info' : 'danger'}>
                      {perf.aiBadge}
                    </StatusBadge>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-muted">
                        <div className="h-1.5 rounded-full bg-primary" style={{ width: `${perf.goalProgress}%` }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{perf.goalProgress}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
