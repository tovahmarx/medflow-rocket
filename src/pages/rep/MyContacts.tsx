import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { FilterBar } from '@/components/shared/FilterBar';
import { CadenceRing } from '@/components/shared/CadenceRing';
import { AvatarCircle } from '@/components/shared/AvatarCircle';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { useAuth } from '@/contexts/AuthContext';
import { doctorAccounts, users } from '@/data/mock-data';
import { Phone, Mail, Video, Search } from 'lucide-react';

const filters = ['All', 'Top', 'Repeat', 'At Risk', 'Cold', 'Overdue'];

export default function MyContacts() {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState('All');

  const myDoctors = doctorAccounts.filter(d => d.assignedRep === user?.id);
  const filtered = myDoctors.filter(d => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Overdue') return d.cadenceStatus === 'red';
    return d.tier === activeFilter;
  });

  // Sort most overdue first
  const sorted = [...filtered].sort((a, b) => b.lastContactDays - a.lastContactDays);

  return (
    <>
      <TopBar title="My Contacts" />
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Search contacts..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
        </div>

        <FilterBar filters={filters} active={activeFilter} onSelect={setActiveFilter} />

        <div className="space-y-2">
          {sorted.map(d => {
            const user = users.find(u => u.id === d.userId)!;
            return (
              <div key={d.userId} className="rounded-lg border bg-card p-3">
                <div className="flex items-center gap-3">
                  <CadenceRing status={d.cadenceStatus}>
                    <AvatarCircle initials={user.initials} />
                  </CadenceRing>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.practice} · {user.specialty}</p>
                    <p className="text-[10px] text-muted-foreground">{d.lastContact}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-semibold text-foreground">${(d.lifetimeValue / 1000).toFixed(0)}K</span>
                    <StatusBadge variant={d.tier === 'Top' ? 'success' : d.tier === 'Repeat' ? 'info' : d.tier === 'At Risk' ? 'warning' : 'neutral'}>
                      {d.tier}
                    </StatusBadge>
                  </div>
                </div>
                <div className="mt-2 flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1 rounded-md border py-2 text-xs font-medium tap-target">
                    <Phone className="h-3 w-3" /> Call
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 rounded-md border py-2 text-xs font-medium tap-target">
                    <Mail className="h-3 w-3" /> Email
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 rounded-md border py-2 text-xs font-medium tap-target">
                    <Video className="h-3 w-3" /> Video
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
