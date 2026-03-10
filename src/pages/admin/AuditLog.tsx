import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { FilterBar } from '@/components/shared/FilterBar';

const logs = [
  { time: 'Mar 9 9:31', user: 'Kelly M.', action: 'Approve', target: 'Expense #482', ip: '192.168.1.10' },
  { time: 'Mar 9 9:14', user: 'Clint M.', action: 'Login', target: '—', ip: '10.0.0.42' },
  { time: 'Mar 9 9:02', user: 'Kelly M.', action: 'Export', target: 'Sunshine Report', ip: '192.168.1.10' },
  { time: 'Mar 9 8:55', user: 'Kelly M.', action: 'View', target: 'Dr. Osei', ip: '192.168.1.10' },
  { time: 'Mar 8 4:30', user: 'Sara L.', action: 'Edit', target: 'Lead #1847', ip: '10.0.0.55' },
  { time: 'Mar 8 3:15', user: 'Priya N.', action: 'Login', target: '—', ip: '10.0.0.78' },
  { time: 'Mar 8 2:00', user: 'James R.', action: 'View', target: 'Dr. Reyes', ip: '10.0.0.33' },
  { time: 'Mar 7 5:00', user: 'Kelly M.', action: 'Delete', target: 'Draft Quote #Q-0035', ip: '192.168.1.10' },
];

const filters = ['All', 'Login', 'View', 'Edit', 'Delete', 'Export', 'Approve'];

export default function AuditLog() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = logs.filter(l => activeFilter === 'All' || l.action === activeFilter);

  return (
    <>
      <TopBar title="Audit Log" />
      <div className="space-y-3 p-4">
        <FilterBar filters={filters} active={activeFilter} onSelect={setActiveFilter} />

        <button className="rounded-lg border px-4 py-2 text-sm font-medium text-foreground tap-target">Export CSV</button>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="py-2 pr-3 font-medium">Time</th>
                <th className="py-2 pr-3 font-medium">User</th>
                <th className="py-2 pr-3 font-medium">Action</th>
                <th className="py-2 pr-3 font-medium">Target</th>
                <th className="py-2 font-medium">IP</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2 pr-3 text-muted-foreground whitespace-nowrap">{l.time}</td>
                  <td className="py-2 pr-3 font-medium text-foreground whitespace-nowrap">{l.user}</td>
                  <td className="py-2 pr-3 text-foreground">{l.action}</td>
                  <td className="py-2 pr-3 text-foreground">{l.target}</td>
                  <td className="py-2 text-muted-foreground font-mono">{l.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
