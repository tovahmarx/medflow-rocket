import { useState, useEffect } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { FilterBar } from '@/components/shared/FilterBar';
import { CadenceRing } from '@/components/shared/CadenceRing';
import { AvatarCircle } from '@/components/shared/AvatarCircle';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { SkeletonList } from '@/components/shared/SkeletonLoaders';
import { doctorAccounts, users } from '@/data/mock-data';
import { Search, Plus } from 'lucide-react';

const filters = ['All', 'Top', 'Repeat', 'At Risk', 'Cold', 'Overdue'];

export default function DoctorAccounts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = doctorAccounts.filter(d => {
    const user = users.find(u => u.id === d.userId);
    const matchesSearch = !searchQuery || 
      user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.npi?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.practice?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.specialty?.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Overdue') return d.cadenceStatus === 'red';
    return d.tier === activeFilter;
  });

  return (
    <>
      <TopBar title="Doctor Accounts" />
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-lg border bg-card px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by name, NPI..." className="flex-1 min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>
          <button className="flex items-center gap-1 rounded-lg bg-primary px-3 py-2.5 text-xs font-medium text-primary-foreground tap-target flex-shrink-0">
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>

        <FilterBar filters={filters} active={activeFilter} onSelect={setActiveFilter} />

        {loading ? (
          <SkeletonList count={5} />
        ) : (
          <div className="space-y-2">
            {filtered.map(d => {
              const user = users.find(u => u.id === d.userId)!;
              return (
                <div key={d.userId} className="flex items-center gap-3 rounded-lg border bg-card p-3 active:bg-muted/50">
                  <CadenceRing status={d.cadenceStatus}>
                    <AvatarCircle initials={user.initials} />
                  </CadenceRing>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.practice} · {user.specialty}</p>
                    <p className="text-[10px] text-muted-foreground">NPI {user.npi} · {d.lastContact}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-sm font-semibold text-foreground">${(d.lifetimeValue / 1000).toFixed(0)}K</span>
                    <StatusBadge variant={d.tier === 'Top' ? 'success' : d.tier === 'Repeat' ? 'info' : d.tier === 'At Risk' ? 'warning' : 'neutral'}>
                      {d.tier}
                    </StatusBadge>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
