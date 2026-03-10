import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { StatCard } from '@/components/shared/StatCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { FAB } from '@/components/shared/FAB';
import { BottomSheet } from '@/components/shared/BottomSheet';
import { FilterBar } from '@/components/shared/FilterBar';

const samples = [
  { id: 'LOT-0091', product: 'MedGlide Pro 100mL', lot: 'L2024-091', qty: 4, rep: 'Clint M.', doctor: 'Dr. Osei', status: 'Delivered', feedback: 'Positive', serial: 'SN10041→SN10044' },
  { id: 'LOT-0090', product: 'MedGlide OR Kit', lot: 'L2024-090', qty: 2, rep: 'Priya N.', doctor: 'Dr. Addo', status: 'Delivered', feedback: 'Awaiting', serial: 'SN10039→SN10040' },
  { id: 'LOT-0089', product: 'MedGlide Sterile SU', lot: 'L2024-089', qty: 10, rep: 'Sara L.', doctor: 'Dr. Diallo', status: 'In Transit', feedback: null, serial: 'SN10029→SN10038' },
  { id: 'LOT-0088', product: 'MedGlide Pro 50mL', lot: 'L2024-088', qty: 6, rep: 'James R.', doctor: 'Dr. Reyes', status: 'Delivered', feedback: 'Neutral', serial: 'SN10023→SN10028' },
  { id: 'LOT-0087', product: 'MedGlide Pro 100mL', lot: 'L2024-087', qty: 2, rep: 'Clint M.', doctor: 'Dr. Cruz', status: 'Delivered', feedback: 'Negative', serial: 'SN10021→SN10022' },
];

const filters = ['All', 'Delivered', 'In Transit', 'Pending'];

export default function SampleLots() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);

  const filtered = samples.filter(s => activeFilter === 'All' || s.status === activeFilter);

  const feedbackVariant = (f: string | null) =>
    f === 'Positive' ? 'success' : f === 'Negative' ? 'danger' : f === 'Neutral' ? 'neutral' : 'warning';

  return (
    <>
      <TopBar title="Sample Lots" />
      <div className="space-y-4 p-4">
        <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
          <StatCard label="Total Sent" value="35" />
          <StatCard label="Delivered" value="28" />
          <StatCard label="Positive" value="71%" />
          <StatCard label="Awaiting" value="4" />
          <StatCard label="Active Lots" value="6" />
        </div>

        <FilterBar filters={filters} active={activeFilter} onSelect={setActiveFilter} />

        <div className="space-y-2">
          {filtered.map(s => (
            <div key={s.id} className="rounded-lg border bg-card p-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{s.id}</p>
                  <p className="text-xs text-muted-foreground">{s.product} · {s.lot} · {s.qty}u</p>
                  <p className="text-xs text-muted-foreground">{s.rep} → {s.doctor}</p>
                  <p className="text-[10px] text-muted-foreground">{s.serial}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StatusBadge variant={s.status === 'Delivered' ? 'success' : s.status === 'In Transit' ? 'info' : 'warning'}>
                    {s.status}
                  </StatusBadge>
                  {s.feedback && <StatusBadge variant={feedbackVariant(s.feedback)}>{s.feedback}</StatusBadge>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button className="flex-1 rounded-lg border py-3 text-sm font-medium text-foreground tap-target">Export FDA Report</button>
        </div>
      </div>

      <FAB onClick={() => setShowForm(true)} />
      <BottomSheet open={showForm} onClose={() => setShowForm(false)} title="Log New Sample">
        <div className="space-y-3">
          {['Product', 'Lot Number', 'Quantity', 'Expiry Date', 'Rep', 'Doctor (NPI Search)', 'Practice', 'Notes'].map(f => (
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
