import { TopBar } from '@/components/layout/TopBar';
import { AIInsightCard } from '@/components/shared/AIInsightCard';
import { MapPin, Navigation, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { routeStops } from '@/data/mock-data';

export default function RoutePlanner() {
  const { user } = useAuth();
  const stops = routeStops.filter(s => s.repId === user?.id);
  const territory = user?.territory || 'Your Area';

  return (
    <>
      <TopBar title="Route Planner" />
      <div className="space-y-4 p-4">
        <div className="flex h-48 items-center justify-center rounded-lg bg-muted">
          <div className="text-center">
            <MapPin className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-1 text-xs text-muted-foreground">{territory} — {stops.length} stops</p>
          </div>
        </div>

        <div className="space-y-0">
          {stops.map((s) => (
            <div key={`${s.repId}-${s.num}`}>
              {s.drive && (
                <div className="flex items-center gap-2 py-1 pl-4">
                  <div className="h-4 w-0.5 bg-border" />
                  <span className="text-[10px] text-muted-foreground">{s.drive} drive</span>
                </div>
              )}
              <div className="flex items-center gap-3 rounded-lg border bg-card p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {s.num}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{s.name}</p>
                    <span className="text-[10px] text-muted-foreground">{s.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{s.address}</p>
                </div>
                <div className="flex gap-1">
                  <button className="rounded-md border p-2 tap-target"><CheckCircle className="h-4 w-4 text-success" /></button>
                  <button className="rounded-md border p-2 tap-target"><Navigation className="h-4 w-4 text-info" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <AIInsightCard>
          Add Dr. Cruz — 8 min from 1pm stop, 31 days overdue. Also: 2 urologists within 2 miles not in your contacts.
        </AIInsightCard>

        <div className="flex gap-2">
          <button className="flex-1 rounded-lg bg-primary py-3 text-sm font-medium text-primary-foreground tap-target">Add Dr. Cruz</button>
          <button className="flex-1 rounded-lg border py-3 text-sm font-medium text-foreground tap-target">Discover Doctors</button>
        </div>
      </div>
    </>
  );
}
