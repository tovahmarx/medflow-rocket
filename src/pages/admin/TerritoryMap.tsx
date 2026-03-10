import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { AvatarCircle } from '@/components/shared/AvatarCircle';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { reps, repPerformance, users } from '@/data/mock-data';
import { MapPin, Phone, MessageSquare } from 'lucide-react';

const territories = [
  { name: 'Southeast', color: 'bg-success/20 border-success', rep: 'Clint M.', initials: 'CM', userId: 'u2' },
  { name: 'Northeast', color: 'bg-info/20 border-info', rep: 'Sara L.', initials: 'SL', userId: 'u3' },
  { name: 'Midwest', color: 'bg-warning/20 border-warning', rep: 'James R.', initials: 'JR', userId: 'u4' },
  { name: 'West', color: 'bg-offline/20 border-offline', rep: 'Priya N.', initials: 'PN', userId: 'u5' },
];

export default function TerritoryMap() {
  const [showVisits, setShowVisits] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);

  return (
    <>
      <TopBar title="Territory Map" />
      <div className="space-y-4 p-4">
        {/* Mock Map */}
        <div className="relative rounded-lg border bg-muted" style={{ height: 280 }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin className="h-12 w-12 text-muted-foreground/30" />
          </div>
          {/* Territory regions as overlay boxes */}
          <div className="absolute inset-4 grid grid-cols-2 grid-rows-2 gap-2">
            {territories.map(t => {
              const perf = repPerformance.find(p => p.userId === t.userId);
              return (
                <div key={t.name} className={`flex flex-col items-center justify-center rounded-lg border ${t.color} p-2`}>
                  <div className="relative">
                    <AvatarCircle initials={t.initials} size="sm" />
                    {perf && perf.activityScore >= 80 && (
                      <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-success animate-pulse-ring" />
                    )}
                  </div>
                  <p className="mt-1 text-[10px] font-semibold text-foreground">{t.name}</p>
                  <p className="text-[9px] text-muted-foreground">{t.rep}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Toggles */}
        <div className="flex gap-3">
          <label className="flex items-center gap-2 text-xs">
            <input type="checkbox" checked={showVisits} onChange={e => setShowVisits(e.target.checked)} className="rounded" />
            Show Visits
          </label>
          <label className="flex items-center gap-2 text-xs">
            <input type="checkbox" checked={showHeatmap} onChange={e => setShowHeatmap(e.target.checked)} className="rounded" />
            Cadence Heat Map
          </label>
        </div>

        {showVisits && (
          <div className="flex gap-3 text-[10px]">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-success" /> Ordered</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-info" /> Interested</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-warning" /> Follow-up</span>
          </div>
        )}

        {showHeatmap && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
            <p className="text-xs text-destructive">3 overdue areas highlighted: Tampa East, Miami North, Chicago Central</p>
          </div>
        )}

        {/* Rep List */}
        <div className="space-y-2">
          {territories.map(t => {
            const perf = repPerformance.find(p => p.userId === t.userId)!;
            return (
              <div key={t.name} className="flex items-center gap-3 rounded-lg border bg-card p-3">
                <AvatarCircle initials={t.initials} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{t.rep}</p>
                  <p className="text-xs text-muted-foreground">{t.name} · {perf.callsToday} calls · ${(perf.pipeline / 1000000).toFixed(2)}M pipeline</p>
                </div>
                <div className="flex gap-1">
                  <button className="rounded-md border p-2 tap-target"><Phone className="h-4 w-4 text-muted-foreground" /></button>
                  <button className="rounded-md border p-2 tap-target"><MessageSquare className="h-4 w-4 text-muted-foreground" /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
