import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { StatCard } from '@/components/shared/StatCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { AIInsightCard } from '@/components/shared/AIInsightCard';
import { cn } from '@/lib/utils';

const invoices = [
  { id: 'INV-0091', client: 'Park Derm Group', amount: 12400, date: 'Today', status: 'Paid' as const },
  { id: 'INV-0090', client: 'Tampa Surgery Ctr', amount: 8750, date: 'Yesterday', status: 'Paid' as const },
  { id: 'INV-0089', client: 'Urology Associates', amount: 6200, date: 'Mar 6', status: 'Pending' as const },
  { id: 'INV-0088', client: "St. Luke's Hospital", amount: 34100, date: 'Mar 4', status: 'Overdue' as const },
];

const feeData = [
  { order: 'ORD-0091', amount: 1152, platformFee: 23.04, stripeFee: 33.70 },
  { order: 'ORD-0090', amount: 1440, platformFee: 28.80, stripeFee: 42.06 },
  { order: 'ORD-0089', amount: 752, platformFee: 15.04, stripeFee: 21.98 },
];

const tabs = ['Invoices', 'Fee Ledger', 'P&L'];

export default function Billing() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <TopBar title="Billing" />
      <div className="space-y-4 p-4">
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Collected" value="$21,150" />
          <StatCard label="Pending" value="$6,200" className="border-warning/20" />
          <StatCard label="Overdue" value="$34,100" className="border-destructive/20" />
        </div>

        <div className="flex gap-1 rounded-lg bg-muted p-1">
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setActiveTab(i)}
              className={cn('flex-1 rounded-md py-2 text-xs font-medium tap-target', i === activeTab ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground')}>
              {t}
            </button>
          ))}
        </div>

        {activeTab === 0 && (
          <div className="space-y-2">
            {invoices.map(inv => (
              <div key={inv.id} className="flex items-center justify-between rounded-lg border bg-card p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{inv.id}</p>
                  <p className="text-xs text-muted-foreground">{inv.client} · {inv.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">${inv.amount.toLocaleString()}</p>
                  <StatusBadge variant={inv.status === 'Paid' ? 'success' : inv.status === 'Pending' ? 'warning' : 'danger'}>
                    {inv.status}
                  </StatusBadge>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 1 && (
          <div className="space-y-2">
            {feeData.map(f => (
              <div key={f.order} className="rounded-lg border bg-card p-3">
                <p className="text-sm font-medium text-foreground">{f.order} — ${f.amount.toLocaleString()}</p>
                <div className="mt-1 flex gap-4 text-xs text-muted-foreground">
                  <span>Platform 2%: ${f.platformFee}</span>
                  <span>Stripe: ${f.stripeFee}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 2 && (
          <div className="space-y-3">
            <div className="rounded-lg border bg-card p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">Revenue by Rep</h3>
              {[{ name: 'Priya N.', val: 320000 }, { name: 'Clint M.', val: 284000 }, { name: 'Sara L.', val: 192000 }, { name: 'James R.', val: 110000 }].map(r => (
                <div key={r.name} className="flex items-center justify-between py-1">
                  <span className="text-xs text-foreground">{r.name}</span>
                  <span className="text-xs font-semibold text-foreground">${(r.val / 1000).toFixed(0)}K</span>
                </div>
              ))}
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between py-1">
                <span className="text-xs text-foreground">Total Revenue</span>
                <span className="text-sm font-semibold text-foreground">$906K</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-xs text-muted-foreground">Platform Costs</span>
                <span className="text-xs text-destructive">-$18.1K</span>
              </div>
              <div className="flex items-center justify-between py-1 border-t mt-1 pt-1">
                <span className="text-xs font-semibold text-foreground">Net Margin</span>
                <span className="text-sm font-semibold text-success">$887.9K</span>
              </div>
            </div>
          </div>
        )}

        <AIInsightCard>
          30-day forecast: $142K. 60-day: $285K. 90-day: $430K. St. Luke's overdue invoice ($34.1K) is the largest risk.
        </AIInsightCard>
      </div>
    </>
  );
}
