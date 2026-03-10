import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { StatCard } from '@/components/shared/StatCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { FAB } from '@/components/shared/FAB';
import { BottomSheet } from '@/components/shared/BottomSheet';

const entries = [
  { id: 1, rep: 'Clint M.', doctor: 'Dr. Osei', npi: '1234567890', type: 'Meal', desc: 'Lunch at Tampa Grill', amount: 42, date: 'Mar 6', status: 'Reported' },
  { id: 2, rep: 'Priya N.', doctor: 'Dr. Park', npi: '2345678901', type: 'Sample', desc: 'MedGlide Pro 100mL', amount: 0, date: 'Mar 5', status: 'Reported' },
  { id: 3, rep: 'Sara L.', doctor: 'Dr. Webb', npi: '3456789012', type: 'Meal', desc: 'Coffee meeting', amount: 28, date: 'Mar 4', status: 'Pending' },
  { id: 4, rep: 'Clint M.', doctor: 'Dr. Osei', npi: '1234567890', type: 'Meal', desc: 'Detected in call notes', amount: 38, date: 'Mar 3', status: 'Pending', aiSuggested: true },
];

export default function Compliance() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <TopBar title="Sunshine Act" />
      <div className="space-y-4 p-4">
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Total MTD" value="$70" />
          <StatCard label="Unreported" value="1" className="border-destructive/20" />
          <StatCard label="Compliant" value="2" className="border-success/20" />
        </div>

        <div className="space-y-2">
          {entries.map(e => (
            <div key={e.id} className="flex items-center justify-between rounded-lg border bg-card p-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{e.rep} → {e.doctor}</p>
                  {e.aiSuggested && <StatusBadge variant="offline">AI Suggested</StatusBadge>}
                </div>
                <p className="text-xs text-muted-foreground">NPI {e.npi} · {e.type} · {e.desc}</p>
                <p className="text-[10px] text-muted-foreground">{e.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">${e.amount}</p>
                <StatusBadge variant={e.status === 'Reported' ? 'success' : 'warning'}>{e.status}</StatusBadge>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full rounded-lg border py-3 text-sm font-medium text-foreground tap-target">
          Export CMS Report
        </button>
      </div>

      <FAB onClick={() => setShowForm(true)} />
      <BottomSheet open={showForm} onClose={() => setShowForm(false)} title="Log Compliance Entry">
        <div className="space-y-3">
          {['Rep', 'Doctor (NPI Search)', 'Type', 'Amount', 'Description', 'Date'].map(f => (
            <div key={f}>
              <label className="text-xs font-medium text-muted-foreground">{f}</label>
              <input className="mt-0.5 w-full rounded-lg border bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder={f} />
            </div>
          ))}
          <button onClick={() => setShowForm(false)} className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground tap-target">Submit</button>
        </div>
      </BottomSheet>
    </>
  );
}
