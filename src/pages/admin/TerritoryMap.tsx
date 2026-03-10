import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { AvatarCircle } from '@/components/shared/AvatarCircle';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { StatCard } from '@/components/shared/StatCard';
import { AIInsightCard } from '@/components/shared/AIInsightCard';
import { repPerformance } from '@/data/mock-data';
import { MapPin, Phone, MessageSquare, TrendingUp, Users, DollarSign, Activity, ChevronRight, Flame, Snowflake, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const territories = [
  { name: 'Southeast', color: 'from-success/30 to-success/5', borderColor: 'border-success/40', accent: 'text-success', rep: 'Clint M.', initials: 'CM', userId: 'u2', states: 'FL, GA, AL, SC', doctors: 48 },
  { name: 'Northeast', color: 'from-info/30 to-info/5', borderColor: 'border-info/40', accent: 'text-info', rep: 'Sara L.', initials: 'SL', userId: 'u3', states: 'NY, MA, CT, NJ', doctors: 35 },
  { name: 'Midwest', color: 'from-warning/30 to-warning/5', borderColor: 'border-warning/40', accent: 'text-warning', rep: 'James R.', initials: 'JR', userId: 'u4', states: 'IL, OH, MI, IN', doctors: 29 },
  { name: 'West', color: 'from-offline/30 to-offline/5', borderColor: 'border-offline/40', accent: 'text-offline', rep: 'Priya N.', initials: 'PN', userId: 'u5', states: 'CA, WA, OR, AZ', doctors: 52 },
];

const statusIcon = (badge: string) => {
  if (badge === 'Hot') return <Flame className="h-3.5 w-3.5 text-destructive" />;
  if (badge === 'Warm') return <Zap className="h-3.5 w-3.5 text-warning" />;
  return <Snowflake className="h-3.5 w-3.5 text-info" />;
};

const overdueAreas = [
  { area: 'Tampa East', rep: 'Clint M.', days: 14 },
  { area: 'Miami North', rep: 'Clint M.', days: 21 },
  { area: 'Chicago Central', rep: 'James R.', days: 31 },
];

export default function TerritoryMap() {
  const [selected, setSelected] = useState<string | null>(null);
  const [view, setView] = useState<'map' | 'heatmap'>('map');

  const totalPipeline = repPerformance.reduce((s, p) => s + p.pipeline, 0);
  const totalDoctors = territories.reduce((s, t) => s + t.doctors, 0);
  const avgActivity = Math.round(repPerformance.reduce((s, p) => s + p.activityScore, 0) / repPerformance.length);
  const totalRevenue = repPerformance.reduce((s, p) => s + p.revenue, 0);

  const selectedTerritory = territories.find(t => t.name === selected);
  const selectedPerf = selectedTerritory ? repPerformance.find(p => p.userId === selectedTerritory.userId) : null;

  return (
    <>
      <TopBar title="Territory Map" />
      <div className="space-y-4 p-4 pb-24">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Total Pipeline" value={`$${(totalPipeline / 1e6).toFixed(1)}M`} trend="up" trendValue="12%" />
          <StatCard label="Active Doctors" value={totalDoctors.toString()} trend="up" trendValue="+6" />
          <StatCard label="Avg Activity" value={`${avgActivity}%`} trend={avgActivity >= 75 ? 'up' : 'down'} trendValue={avgActivity >= 75 ? 'Good' : 'Low'} />
          <StatCard label="Q1 Revenue" value={`$${(totalRevenue / 1e6).toFixed(1)}M`} trend="up" trendValue="18%" />
        </div>

        {/* View Toggle */}
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          <button
            onClick={() => setView('map')}
            className={cn('flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all', view === 'map' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground')}
          >
            Territory View
          </button>
          <button
            onClick={() => setView('heatmap')}
            className={cn('flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all', view === 'heatmap' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground')}
          >
            Cadence Heatmap
          </button>
        </div>

        {view === 'map' ? (
          <>
            {/* Territory Grid */}
            <div className="grid grid-cols-2 gap-3">
              {territories.map(t => {
                const perf = repPerformance.find(p => p.userId === t.userId)!;
                const isSelected = selected === t.name;
                return (
                  <button
                    key={t.name}
                    onClick={() => setSelected(isSelected ? null : t.name)}
                    className={cn(
                      'relative flex flex-col rounded-xl border bg-gradient-to-br p-4 text-left shadow-sm transition-all duration-200',
                      t.color, t.borderColor,
                      isSelected ? 'scale-[1.02] shadow-md ring-2 ring-primary/30' : 'hover:shadow-md active:scale-[0.98]'
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <AvatarCircle initials={t.initials} size="sm" />
                      <div className="flex items-center gap-1">
                        {statusIcon(perf.statusBadge)}
                        {perf.activityScore >= 80 && (
                          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                        )}
                      </div>
                    </div>
                    <p className="mt-2 text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground">{t.rep}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-semibold text-foreground">${(perf.pipeline / 1e6).toFixed(1)}M</span>
                      <span className="text-[10px] text-muted-foreground">{t.doctors} docs</span>
                    </div>
                    {/* Mini progress bar */}
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
                      <div
                        className={cn('h-full rounded-full transition-all duration-500', perf.goalProgress >= 75 ? 'bg-success' : perf.goalProgress >= 50 ? 'bg-warning' : 'bg-destructive')}
                        style={{ width: `${perf.goalProgress}%` }}
                      />
                    </div>
                    <p className="mt-1 text-[9px] text-muted-foreground">{perf.goalProgress}% of quota</p>
                  </button>
                );
              })}
            </div>

            {/* Selected Territory Detail */}
            {selectedTerritory && selectedPerf && (
              <div className="space-y-3 rounded-xl border bg-card p-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AvatarCircle initials={selectedTerritory.initials} size="md" />
                    <div>
                      <p className="text-sm font-bold text-foreground">{selectedTerritory.rep}</p>
                      <p className="text-xs text-muted-foreground">{selectedTerritory.name} · {selectedTerritory.states}</p>
                    </div>
                  </div>
                  <StatusBadge
                    variant={selectedPerf.statusBadge === 'Hot' ? 'danger' : selectedPerf.statusBadge === 'Warm' ? 'warning' : 'info'}
                    dot
                  >
                    {selectedPerf.statusBadge}
                  </StatusBadge>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg bg-muted/50 p-2.5 text-center">
                    <p className="text-lg font-bold text-foreground">{selectedPerf.callsToday}</p>
                    <p className="text-[10px] text-muted-foreground">Calls Today</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-2.5 text-center">
                    <p className="text-lg font-bold text-foreground">{selectedPerf.dealCount}</p>
                    <p className="text-[10px] text-muted-foreground">Active Deals</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-2.5 text-center">
                    <p className="text-lg font-bold text-foreground">{selectedPerf.activityScore}</p>
                    <p className="text-[10px] text-muted-foreground">Activity Score</p>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Revenue vs Target</p>
                    <p className="text-sm font-bold text-foreground">
                      ${(selectedPerf.revenue / 1000).toFixed(0)}K
                      <span className="font-normal text-muted-foreground"> / ${(selectedPerf.quarterlyTarget / 1000).toFixed(0)}K</span>
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full border-[3px] border-muted flex items-center justify-center relative">
                    <svg className="absolute inset-0 h-full w-full -rotate-90">
                      <circle cx="20" cy="20" r="16" fill="none" strokeWidth="3"
                        className={selectedPerf.goalProgress >= 75 ? 'stroke-success' : selectedPerf.goalProgress >= 50 ? 'stroke-warning' : 'stroke-destructive'}
                        strokeDasharray={`${selectedPerf.goalProgress} ${100 - selectedPerf.goalProgress}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-[10px] font-bold text-foreground">{selectedPerf.goalProgress}%</span>
                  </div>
                </div>

                <AIInsightCard>
                  {selectedPerf.aiBadge === 'Crushing it'
                    ? `${selectedTerritory.rep} is on fire — ${selectedPerf.goalProgress}% to target with strong call volume. Consider expanding territory.`
                    : selectedPerf.aiBadge === 'On track'
                    ? `${selectedTerritory.rep} is steady. ${selectedTerritory.doctors} active doctors, pipeline healthy. Suggest focusing on conversion.`
                    : `${selectedTerritory.rep} needs attention — activity score ${selectedPerf.activityScore}/100 and only ${selectedPerf.goalProgress}% to target. Schedule a coaching call.`}
                </AIInsightCard>

                <div className="flex gap-2">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-xs font-semibold text-primary-foreground shadow-sm tap-target active:scale-[0.98] transition-all">
                    <Phone className="h-3.5 w-3.5" /> Call
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border py-2.5 text-xs font-semibold text-foreground tap-target hover:bg-muted active:scale-[0.98] transition-all">
                    <MessageSquare className="h-3.5 w-3.5" /> Message
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Heatmap View */
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><span className="h-2.5 w-5 rounded bg-success/60" /> On cadence</span>
              <span className="flex items-center gap-1"><span className="h-2.5 w-5 rounded bg-warning/60" /> Slipping</span>
              <span className="flex items-center gap-1"><span className="h-2.5 w-5 rounded bg-destructive/60" /> Overdue</span>
            </div>

            {/* Heatmap grid */}
            <div className="space-y-2">
              {territories.map(t => {
                const perf = repPerformance.find(p => p.userId === t.userId)!;
                const cells = Array.from({ length: 12 }, (_, i) => {
                  // Simulate cadence data
                  const rand = Math.random();
                  if (perf.activityScore < 65 && rand < 0.4) return 'destructive';
                  if (perf.activityScore < 80 && rand < 0.3) return 'warning';
                  if (rand < 0.15) return 'warning';
                  return 'success';
                });
                return (
                  <div key={t.name} className="rounded-lg bg-card p-3 shadow-sm">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AvatarCircle initials={t.initials} size="sm" />
                        <div>
                          <p className="text-xs font-semibold text-foreground">{t.rep}</p>
                          <p className="text-[10px] text-muted-foreground">{t.name}</p>
                        </div>
                      </div>
                      <StatusBadge variant={perf.activityScore >= 80 ? 'success' : perf.activityScore >= 65 ? 'warning' : 'danger'}>
                        {perf.activityScore}% active
                      </StatusBadge>
                    </div>
                    <div className="grid grid-cols-12 gap-1">
                      {cells.map((c, i) => (
                        <div key={i} className={cn('h-4 rounded-sm transition-colors', c === 'success' ? 'bg-success/50' : c === 'warning' ? 'bg-warning/50' : 'bg-destructive/50')} />
                      ))}
                    </div>
                    <p className="mt-1.5 text-[9px] text-muted-foreground">Last 12 weeks · {t.doctors} doctors</p>
                  </div>
                );
              })}
            </div>

            {/* Overdue Areas */}
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 shadow-sm">
              <p className="mb-3 text-xs font-bold text-destructive">⚠ Overdue Areas</p>
              <div className="space-y-2">
                {overdueAreas.map(a => (
                  <div key={a.area} className="flex items-center justify-between rounded-lg bg-card p-2.5 shadow-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-destructive" />
                      <div>
                        <p className="text-xs font-medium text-foreground">{a.area}</p>
                        <p className="text-[10px] text-muted-foreground">{a.rep}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-destructive">{a.days}d</span>
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <AIInsightCard>
              James R. has 3 overdue zones in the Midwest — 31 days since last Chicago Central visit. Recommend scheduling a blitz day or reassigning accounts to Sara.
            </AIInsightCard>
          </div>
        )}
      </div>
    </>
  );
}
