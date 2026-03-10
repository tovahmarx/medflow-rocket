import { TopBar } from '@/components/layout/TopBar';
import { StatCard } from '@/components/shared/StatCard';
import { AIInsightCard } from '@/components/shared/AIInsightCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { useAuth } from '@/contexts/AuthContext';
import { repPerformance } from '@/data/mock-data';

const monthlyData = [
  { month: 'Jan', value: 28400 },
  { month: 'Feb', value: 31200 },
  { month: 'Mar', value: 47200, highlight: true },
  { month: 'Apr', value: 52000, projected: true },
];

const tiers = [
  { name: 'Tier 1', rate: '8%', range: '$0–$20K', done: true },
  { name: 'Tier 2', rate: '10%', range: '$20K–$50K', done: true },
  { name: 'Tier 3', rate: '13%', range: '$50K+', active: true },
];

export default function Commission() {
  const { user } = useAuth();
  const perf = repPerformance.find(p => p.userId === user?.id);
  const revenue = perf?.revenue ?? 0;
  const target = perf?.quarterlyTarget ?? 300000;
  const progress = perf?.goalProgress ?? 0;
  return (
    <>
      <TopBar title="Commission" />
      <div className="space-y-4 p-4">
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="This Month" value="$47.2K" className="border-success/20" />
          <StatCard label="YTD Total" value="$141.6K" className="border-info/20" />
          <StatCard label="Current Tier" value="Tier 3" />
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Monthly Earnings</h3>
          <div className="flex items-end gap-2" style={{ height: 100 }}>
            {monthlyData.map(d => {
              const h = (d.value / 55000) * 100;
              return (
                <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-[10px] text-muted-foreground">${(d.value / 1000).toFixed(1)}K</span>
                  <div
                    className={`w-full rounded-t-sm ${d.projected ? 'border-2 border-dashed border-primary/40' : d.highlight ? 'bg-primary' : 'bg-primary/60'}`}
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[10px] text-muted-foreground">{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Tier Progress</h3>
          {tiers.map(t => (
            <div key={t.name} className="flex items-center gap-3 py-2">
              <div className="w-14">
                <p className="text-xs font-semibold text-foreground">{t.name}</p>
                <p className="text-[10px] text-muted-foreground">{t.rate}</p>
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">{t.range}</p>
              </div>
              {t.done && <StatusBadge variant="success">✓</StatusBadge>}
              {t.active && <StatusBadge variant="warning">ACTIVE</StatusBadge>}
            </div>
          ))}
        </div>

        <div className="rounded-lg border bg-card p-4">
          <p className="text-xs text-muted-foreground">Q1 Target</p>
          <p className="text-sm font-medium text-foreground">$300K — You: $246K — 82%</p>
          <div className="mt-2 h-2 w-full rounded-full bg-muted">
            <div className="h-2 rounded-full bg-primary" style={{ width: '82%' }} />
          </div>
          <p className="mt-1 text-[10px] text-muted-foreground">22 days remaining</p>
        </div>

        <AIInsightCard>
          At current pace: $52,400 this quarter, Tier 3 by April 12. Closing St. Luke's adds ~$4,400 in commission.
        </AIInsightCard>
      </div>
    </>
  );
}
