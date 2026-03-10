import { TopBar } from '@/components/layout/TopBar';
import { AIInsightCard } from '@/components/shared/AIInsightCard';
import { MapPin, Navigation, CheckCircle } from 'lucide-react';

const stops = [
  { num: 1, time: '9:00 AM', name: 'Dr. Osei', address: '4812 N Dale Mabry Hwy', drive: null },
  { num: 2, time: '10:30 AM', name: 'Tampa Surgery Ctr', address: '2901 W Swann Ave', drive: '12 min' },
  { num: 3, time: '1:00 PM', name: 'Dr. Webb', address: '509 S Armenia Ave', drive: '8 min' },
  { num: 4, time: '3:00 PM', name: "St. Luke's Hospital", address: '4801 Van Dyke Rd', drive: '22 min' },
];

export default function RoutePlanner() {
  return (
    <>
      <TopBar title="Route Planner" />
      <div className="space-y-4 p-4">
        {/* Mock Map */}
        <div className="flex h-48 items-center justify-center rounded-lg bg-muted">
          <div className="text-center">
            <MapPin className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-1 text-xs text-muted-foreground">Tampa, FL — 4 stops</p>
          </div>
        </div>

        {/* Stops */}
        <div className="space-y-0">
          {stops.map((s, i) => (
            <div key={s.num}>
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
