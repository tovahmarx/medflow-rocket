import { TopBar } from '@/components/layout/TopBar';
import { FileText, Download } from 'lucide-react';

const reports = [
  { title: 'Rep Performance', desc: 'Calls, pipeline, closed, commission per rep' },
  { title: 'Sunshine Act Export', desc: 'CMS-ready federal reporting' },
  { title: 'Sample Lot Export', desc: 'FDA chain of custody per lot' },
  { title: 'Revenue Report', desc: 'Invoices, collected, overdue, P&L' },
  { title: 'Doctor Activity', desc: 'Orders, samples, emails, calls per doctor' },
  { title: 'Expense Report', desc: 'Rep expenses by category and period' },
  { title: 'Training Report', desc: 'Module completion per rep' },
  { title: 'Content Effectiveness', desc: 'Presentation engagement and slide analytics' },
  { title: 'Cadence Compliance', desc: '% doctors contacted within cadence per rep' },
];

export default function Reports() {
  return (
    <>
      <TopBar title="Reports" />
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2">
          <span className="text-xs text-muted-foreground">Date Range:</span>
          <input type="date" className="bg-transparent text-xs text-foreground outline-none" defaultValue="2026-03-01" />
          <span className="text-xs text-muted-foreground">to</span>
          <input type="date" className="bg-transparent text-xs text-foreground outline-none" defaultValue="2026-03-10" />
        </div>

        {reports.map(r => (
          <div key={r.title} className="rounded-lg border bg-card p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{r.title}</p>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1 rounded-md border py-2 text-xs font-medium text-foreground tap-target">
                <Download className="h-3 w-3" /> PDF
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 rounded-md border py-2 text-xs font-medium text-foreground tap-target">
                <Download className="h-3 w-3" /> CSV
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
