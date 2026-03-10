import { useState, useEffect } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { StatCard } from '@/components/shared/StatCard';
import { AIInsightCard } from '@/components/shared/AIInsightCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ListRow } from '@/components/shared/ListRow';
import { AvatarCircle } from '@/components/shared/AvatarCircle';
import { SkeletonStatGrid, SkeletonCard } from '@/components/shared/SkeletonLoaders';
import { pipelineStages, revenueData, commEntries, products } from '@/data/mock-data';
import { useNavigate } from 'react-router-dom';

export default function CommandCenter() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <TopBar title="Command Center" />
      <div className="space-y-4 p-4">
        {loading ? (
          <>
            <SkeletonCard lines={3} />
            <SkeletonStatGrid count={6} />
            <SkeletonCard lines={4} />
            <SkeletonCard lines={4} />
          </>
        ) : (
          <>
            <AIInsightCard>
              Revenue is up 12% vs last month. 14 doctors are past their visit cadence — 3 are Top tier. Priya is on a 14-day streak and has 3 closes pending. Sterile Single Use will hit critical stock by Friday.
            </AIInsightCard>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              <StatCard label="Total Pipeline" value="$8.9M" trend="up" trendValue="8%" />
              <StatCard label="Revenue MTD" value="$124K" trend="up" trendValue="12%" />
              <StatCard label="Orders This Month" value="18" trend="up" trendValue="3" />
              <StatCard label="Active Reps" value="4" />
              <StatCard label="Close Rate" value="34%" trend="up" trendValue="2%" />
              <StatCard label="Avg Deal Size" value="$42K" trend="down" trendValue="5%" />
            </div>

            {/* Revenue Chart */}
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Revenue Forecast</h3>
              <div className="flex items-end gap-2" style={{ height: 120 }}>
                {revenueData.map(d => {
                  const val = d.actual || d.projected || 0;
                  const max = 150000;
                  const h = (val / max) * 100;
                  return (
                    <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
                      <span className="text-[10px] text-muted-foreground">${Math.round(val / 1000)}K</span>
                      <div
                        className={`w-full rounded-t-sm ${d.actual ? 'bg-primary' : 'border-2 border-dashed border-primary/40'}`}
                        style={{ height: `${h}%` }}
                      />
                      <span className="text-[10px] text-muted-foreground">{d.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pipeline Funnel */}
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Pipeline Funnel</h3>
              <div className="space-y-2">
                {pipelineStages.map((s) => {
                  const maxVal = 2250000;
                  const w = Math.max(20, (s.value / maxVal) * 100);
                  return (
                    <div key={s.name} className="flex items-center gap-3">
                      <span className="w-28 flex-shrink-0 text-xs text-muted-foreground">{s.name}</span>
                      <div className="flex-1 min-w-0">
                        <div className="h-6 rounded-sm bg-primary/10">
                          <div
                            className="flex h-6 items-center rounded-sm bg-primary px-2"
                            style={{ width: `${w}%` }}
                          >
                            <span className="text-[10px] font-medium text-primary-foreground whitespace-nowrap">{s.deals} · ${(s.value / 1000000).toFixed(1)}M</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Overdue Cadences */}
            <div
              className="cursor-pointer rounded-lg border border-destructive/20 bg-destructive/5 p-4 active:bg-destructive/10"
              onClick={() => navigate('/admin/doctors')}
            >
              <p className="text-sm font-medium text-destructive">14 doctors overdue across all reps. 3 are Top tier.</p>
              <p className="mt-1 text-xs text-muted-foreground">Tap to view →</p>
            </div>

            {/* Inventory Alerts */}
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Inventory Alerts</h3>
              <div className="space-y-2">
                {products.filter(p => p.status !== 'OK').map(p => (
                  <div key={p.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.stock} units</p>
                    </div>
                    <StatusBadge variant={p.status === 'Critical' ? 'danger' : 'warning'}>{p.status}</StatusBadge>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Approvals */}
            <div
              className="cursor-pointer rounded-lg border bg-card p-4 active:bg-muted/50"
              onClick={() => navigate('/admin/approvals')}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">Pending Approvals</p>
                <StatusBadge variant="warning">5 items</StatusBadge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">5 items need your approval →</p>
            </div>

            {/* Live Activity */}
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Live Activity</h3>
              <div className="space-y-2">
                {commEntries.slice(0, 5).map(e => (
                  <ListRow
                    key={e.id}
                    avatar={<AvatarCircle initials={e.repName.split(' ').map(w => w[0]).join('')} size="sm" />}
                    primary={`${e.repName} → ${e.target}`}
                    secondary={e.message || `${e.duration || ''} ${e.type}`}
                    right={
                      e.isLive ? <StatusBadge variant="success" dot>LIVE</StatusBadge> :
                      e.outcomeBadge ? <StatusBadge variant={e.outcomeBadge === 'Ordered' ? 'success' : e.outcomeBadge === 'Interested' ? 'info' : 'offline'}>{e.outcomeBadge}</StatusBadge> :
                      <span className="text-xs text-muted-foreground">{e.time}</span>
                    }
                  />
                ))}
              </div>
              <button onClick={() => navigate('/admin/comms')} className="mt-3 text-xs font-medium text-primary">See All →</button>
            </div>

            {/* Content Performance */}
            <div className="rounded-lg border bg-card p-4">
              <p className="text-sm text-foreground">Product Overview — <span className="font-semibold">78% engagement</span> this week</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
