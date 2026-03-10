import { TopBar } from '@/components/layout/TopBar';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { pipelineStages, deals } from '@/data/mock-data';
import { Sparkles } from 'lucide-react';

export default function AdminPipeline() {
  return (
    <>
      <TopBar title="Pipeline" />
      <div className="space-y-4 p-4">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border bg-card p-3 text-center">
            <p className="text-xs text-muted-foreground">Total Deals</p>
            <p className="text-xl font-bold text-foreground">111</p>
          </div>
          <div className="rounded-lg border bg-card p-3 text-center">
            <p className="text-xs text-muted-foreground">Total Value</p>
            <p className="text-xl font-bold text-foreground">$8.9M</p>
          </div>
          <div className="rounded-lg border bg-card p-3 text-center">
            <p className="text-xs text-muted-foreground">Avg Win Rate</p>
            <p className="text-xl font-bold text-foreground">34%</p>
          </div>
        </div>

        {/* Funnel */}
        {pipelineStages.map(s => (
          <div key={s.name}>
            <div className="mb-1 flex items-center justify-between">
              <p className="text-xs font-semibold text-foreground">{s.name}</p>
              <span className="text-xs text-muted-foreground">{s.deals} · ${(s.value / 1000000).toFixed(1)}M</span>
            </div>
            <div className="h-3 rounded-sm bg-muted">
              <div className="h-3 rounded-sm bg-primary" style={{ width: `${Math.max(15, (s.value / 2250000) * 100)}%` }} />
            </div>
          </div>
        ))}

        {/* Sample deals */}
        <p className="text-xs font-semibold text-muted-foreground mt-4">Recent Deals</p>
        <div className="space-y-2">
          {deals.slice(0, 6).map(d => (
            <div key={d.id} className="flex items-center justify-between rounded-lg border bg-card p-3">
              <div>
                <p className="text-sm font-medium text-foreground">{d.doctorName}</p>
                <p className="text-xs text-muted-foreground">{d.stage} · {d.daysInStage}d</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">${(d.value / 1000).toFixed(0)}K</p>
                <StatusBadge variant={d.winProbability >= 70 ? 'success' : d.winProbability >= 40 ? 'info' : 'neutral'}>
                  {d.winProbability}%
                </StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
