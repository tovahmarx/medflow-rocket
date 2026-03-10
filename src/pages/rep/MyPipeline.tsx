import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { StatCard } from '@/components/shared/StatCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { AIInsightCard } from '@/components/shared/AIInsightCard';
import { useAuth } from '@/contexts/AuthContext';
import { deals } from '@/data/mock-data';
import { Sparkles, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const stageOrder = ['Conference Lead', 'Contacted', 'Sample Sent', 'In Evaluation', 'Contract Out', 'Closed Won'];

const stageColors: Record<string, string> = {
  'Conference Lead': 'bg-muted-foreground',
  'Contacted': 'bg-info',
  'Sample Sent': 'bg-warning',
  'In Evaluation': 'bg-offline',
  'Contract Out': 'bg-primary',
  'Closed Won': 'bg-success',
};

export default function MyPipeline() {
  const { user } = useAuth();
  const myDeals = deals.filter(d => d.repId === user?.id);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const totalValue = myDeals.reduce((s, d) => s + d.value, 0);
  const avgWin = myDeals.length ? Math.round(myDeals.reduce((s, d) => s + d.winProbability, 0) / myDeals.length) : 0;
  const closedWon = myDeals.filter(d => d.stage === 'Closed Won');
  const closedValue = closedWon.reduce((s, d) => s + d.value, 0);

  const toggle = (stage: string) => setCollapsed(prev => ({ ...prev, [stage]: !prev[stage] }));

  return (
    <>
      <TopBar title="My Pipeline" />
      <div className="space-y-4 p-4 pb-24">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-2">
          <StatCard label="Pipeline" value={`$${(totalValue / 1000).toFixed(0)}K`} />
          <StatCard label="Avg Win %" value={`${avgWin}%`} trend={avgWin >= 50 ? 'up' : 'down'} trendValue={avgWin >= 50 ? 'Good' : 'Low'} />
          <StatCard label="Won" value={`$${(closedValue / 1000).toFixed(0)}K`} trend="up" trendValue={`${closedWon.length}`} />
        </div>

        {/* Funnel bar */}
        <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
          {stageOrder.map(stage => {
            const count = myDeals.filter(d => d.stage === stage).length;
            if (!count) return null;
            const pct = (count / myDeals.length) * 100;
            return (
              <div
                key={stage}
                className={cn('h-full transition-all', stageColors[stage])}
                style={{ width: `${pct}%` }}
                title={`${stage}: ${count}`}
              />
            );
          })}
        </div>

        {/* Stage groups */}
        {stageOrder.map(stage => {
          const stageDeals = myDeals.filter(d => d.stage === stage);
          if (stageDeals.length === 0) return null;
          const total = stageDeals.reduce((s, d) => s + d.value, 0);
          const isCollapsed = collapsed[stage];

          return (
            <div key={stage}>
              <button
                onClick={() => toggle(stage)}
                className="mb-2 flex w-full items-center justify-between tap-target"
              >
                <div className="flex items-center gap-2">
                  <div className={cn('h-2.5 w-2.5 rounded-full', stageColors[stage])} />
                  <p className="text-xs font-bold uppercase tracking-wide text-foreground">{stage}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {stageDeals.length} deal{stageDeals.length > 1 ? 's' : ''} · ${(total / 1000).toFixed(0)}K
                  </span>
                  {isCollapsed ? (
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </div>
              </button>

              {!isCollapsed && (
                <div className="space-y-2">
                  {stageDeals.map(d => (
                    <div
                      key={d.id}
                      className={cn(
                        'rounded-xl bg-card p-3.5 shadow-sm transition-all duration-200 hover:shadow-md',
                        'border-l-[3px]',
                        d.winProbability >= 70 ? 'border-l-success' : d.winProbability >= 40 ? 'border-l-info' : 'border-l-muted-foreground'
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-foreground">{d.doctorName}</p>
                          <p className="truncate text-xs text-muted-foreground">{d.practice}</p>
                        </div>
                        <span className="flex-shrink-0 text-sm font-bold text-foreground">${(d.value / 1000).toFixed(0)}K</span>
                      </div>

                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-muted-foreground">{d.daysInStage}d in stage</span>
                          {d.daysInStage > 14 && (
                            <span className="text-[10px] font-medium text-warning">⚠ Stalling</span>
                          )}
                        </div>
                        <StatusBadge variant={d.winProbability >= 70 ? 'success' : d.winProbability >= 40 ? 'info' : 'neutral'}>
                          {d.winProbability}%
                        </StatusBadge>
                      </div>

                      {/* Win probability bar */}
                      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all duration-500',
                            d.winProbability >= 70 ? 'bg-success' : d.winProbability >= 40 ? 'bg-info' : 'bg-muted-foreground'
                          )}
                          style={{ width: `${d.winProbability}%` }}
                        />
                      </div>

                      {d.aiFlag && (
                        <div className="mt-2.5 flex items-start gap-1.5 rounded-lg bg-success/5 px-2.5 py-2">
                          <Sparkles className="mt-0.5 h-3 w-3 flex-shrink-0 text-success" />
                          <p className="text-[10px] leading-relaxed text-foreground">{d.aiFlag}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* AI Summary */}
        {myDeals.length > 0 && (
          <AIInsightCard>
            {myDeals.filter(d => d.daysInStage > 14).length > 0
              ? `${myDeals.filter(d => d.daysInStage > 14).length} deal(s) stalling over 14 days. Focus on moving them forward or disqualifying.`
              : `Pipeline looks healthy — ${avgWin}% avg win rate across ${myDeals.length} deals.`}
          </AIInsightCard>
        )}
      </div>
    </>
  );
}
