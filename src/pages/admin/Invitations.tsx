import { TopBar } from '@/components/layout/TopBar';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Search } from 'lucide-react';
import { BottomSheet } from '@/components/shared/BottomSheet';
import { useState } from 'react';

const invitations = [
  { id: 1, name: 'Dr. Renata Osei', email: 'rosei@uatampa.com', status: 'Active', date: 'Mar 2023', rep: 'Clint M.' },
  { id: 2, name: 'Dr. Jin Park', email: 'jpark@parkderm.com', status: 'Active', date: 'Jan 2026', rep: 'Priya N.' },
  { id: 3, name: 'Dr. Marcus Webb', email: 'mwebb@coastalwh.com', status: 'Sent', date: 'Mar 8', rep: 'Clint M.' },
  { id: 4, name: 'Dr. Ana Gutierrez', email: 'agutierrez@med.com', status: 'Sent', date: 'Today', rep: 'Sara L.' },
];

export default function Invitations() {
  const [showInvite, setShowInvite] = useState(false);

  return (
    <>
      <TopBar title="Invitations" />
      <div className="space-y-3 p-4">
        <button onClick={() => setShowInvite(true)} className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground tap-target">
          + Invite Doctor
        </button>

        {invitations.map(inv => (
          <div key={inv.id} className="flex items-center justify-between rounded-lg border bg-card p-3">
            <div>
              <p className="text-sm font-medium text-foreground">{inv.name}</p>
              <p className="text-xs text-muted-foreground">{inv.email} · {inv.rep}</p>
              <p className="text-[10px] text-muted-foreground">{inv.date}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <StatusBadge variant={inv.status === 'Active' ? 'success' : inv.status === 'Accepted' ? 'info' : 'neutral'}>
                {inv.status}
              </StatusBadge>
              {inv.status === 'Sent' && (
                <div className="flex gap-1">
                  <button className="rounded border px-2 py-0.5 text-[10px] font-medium tap-target">Resend</button>
                  <button className="rounded border px-2 py-0.5 text-[10px] font-medium text-destructive tap-target">Revoke</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <BottomSheet open={showInvite} onClose={() => setShowInvite(false)} title="Invite Doctor">
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Doctor (NPI Search)</label>
            <div className="mt-0.5 flex items-center gap-2 rounded-lg border bg-card px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Search by name or NPI..." />
            </div>
          </div>
          {['Email', 'Practice', 'Specialty'].map(f => (
            <div key={f}>
              <label className="text-xs font-medium text-muted-foreground">{f}</label>
              <input className="mt-0.5 w-full rounded-lg border bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder={f} />
            </div>
          ))}
          <div>
            <label className="text-xs font-medium text-muted-foreground">Assigned Rep</label>
            <select className="mt-0.5 w-full rounded-lg border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Clint M.</option><option>Sara L.</option><option>James R.</option><option>Priya N.</option>
            </select>
          </div>
          <button onClick={() => setShowInvite(false)} className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground tap-target">Send Invitation</button>
        </div>
      </BottomSheet>
    </>
  );
}
