import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { FAB } from '@/components/shared/FAB';
import { BottomSheet } from '@/components/shared/BottomSheet';
import { AIInsightCard } from '@/components/shared/AIInsightCard';
import { useAuth } from '@/contexts/AuthContext';
import { expenses as allExpenses } from '@/data/mock-data';

export default function ExpenseTracker() {
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();

  const expenses = allExpenses.filter(e => e.repId === user?.id);
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  const byType = expenses.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <>
      <TopBar title="Expenses" />
      <div className="space-y-4 p-4">
        <div className="rounded-lg border bg-card p-4">
          <p className="text-xs text-muted-foreground">Monthly Total</p>
          <p className="text-2xl font-bold text-foreground">${total.toFixed(2)}</p>
          <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
            {Object.entries(byType).map(([type, amt]) => (
              <span key={type}>{type}: ${amt.toFixed(2)}</span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {expenses.map(e => (
            <div key={e.id} className="flex items-center justify-between rounded-lg border bg-card p-3">
              <div>
                <p className="text-sm font-medium text-foreground">{e.type} — ${e.amount.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{e.desc}</p>
                <p className="text-[10px] text-muted-foreground">{e.date}</p>
              </div>
              <StatusBadge variant={e.status === 'Approved' ? 'success' : e.status === 'Pending' ? 'warning' : 'neutral'}>
                {e.status}
              </StatusBadge>
            </div>
          ))}
        </div>

        {expenses.length > 0 && (
          <AIInsightCard>
            {expenses.find(e => e.type === 'Meal') 
              ? `${expenses.find(e => e.type === 'Meal')?.desc} ($${expenses.find(e => e.type === 'Meal')?.amount}) should be logged in Sunshine Act. Create entry?`
              : 'No meal expenses to flag this period.'}
          </AIInsightCard>
        )}
      </div>

      <FAB onClick={() => setShowForm(true)} />
      <BottomSheet open={showForm} onClose={() => setShowForm(false)} title="Log Expense">
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Type</label>
            <div className="mt-1 flex gap-2">
              {['Meal', 'Travel', 'Mileage', 'Supplies', 'Other'].map(t => (
                <button key={t} className="rounded-full border px-3 py-1.5 text-xs font-medium tap-target active:bg-primary active:text-primary-foreground">{t}</button>
              ))}
            </div>
          </div>
          {['Amount', 'Description', 'Doctor (NPI Search)', 'Date'].map(f => (
            <div key={f}>
              <label className="text-xs font-medium text-muted-foreground">{f}</label>
              <input className="mt-0.5 w-full rounded-lg border bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder={f} />
            </div>
          ))}
          <button className="w-full rounded-lg border py-2 text-sm font-medium text-foreground tap-target">📷 Upload Receipt</button>
          <button onClick={() => setShowForm(false)} className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground tap-target">Submit</button>
        </div>
      </BottomSheet>
    </>
  );
}
