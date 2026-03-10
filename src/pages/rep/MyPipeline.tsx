import { TopBar } from '@/components/layout/TopBar';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { useAuth } from '@/contexts/AuthContext';
import { deals } from '@/data/mock-data';
import { Sparkles } from 'lucide-react';

const stageOrder = ['Conference Lead', 'Contacted', 'Sample Sent', 'In Evaluation', 'Contract Out', 'Closed Won'];

export default function MyPipeline() {
  const { user } = useAuth();
  const myDeals = deals.filter(d => d.repId === user?.id);

  return (
    <>
      <TopBar title="My Pipeline" />
      <div className="space-y-4 p-4">
        {stageOrder.map(stage => {
          const stageDeals = myDeals.filter(d => d.stage === stage);
          if (stageDeals.length === 0) return null;
          const total = stageDeals.reduce((s, d) => s + d.value, 0);
          return (
            <div key={stage}>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold text-foreground">{stage}</p>
                <span className="text-xs text-muted-foreground">{stageDeals.length} · ${(total / 1000).toFixed(0)}K</span>
              </div>
              <div className="space-y-2">
                {stageDeals.map(d => (
                  <div key={d.id} className="rounded-lg border bg-card p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{d.doctorName}</p>
                      <span className="text-sm font-semibold text-foreground">${(d.value / 1000).toFixed(0)}K</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{d.practice}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">{d.daysInStage}d in stage</span>
                      <StatusBadge variant={d.winProbability >= 70 ? 'success' : d.winProbability >= 40 ? 'info' : 'neutral'}>
                        {d.winProbability}% win
                      </StatusBadge>
                    </div>
                    {d.aiFlag && (
                      <div className="mt-2 flex items-start gap-1 rounded bg-success/5 p-1.5">
                        <Sparkles className="mt-0.5 h-3 w-3 text-success" />
                        <p className="text-[10px] text-foreground">{d.aiFlag}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
