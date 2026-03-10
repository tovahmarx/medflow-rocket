import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { FAB } from '@/components/shared/FAB';
import { BottomSheet } from '@/components/shared/BottomSheet';
import { AIInsightCard } from '@/components/shared/AIInsightCard';
import { useAuth } from '@/contexts/AuthContext';
import { expenses as seedExpenses, Expense } from '@/data/mock-data';
import { toast } from 'sonner';

const expenseTypes = ['Meal', 'Travel', 'Mileage', 'Supplies', 'Other'] as const;

export default function ExpenseTracker() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [allExpenses, setAllExpenses] = useState<Expense[]>(seedExpenses);

  // Form state
  const [type, setType] = useState<string>('Meal');
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));

  const expenses = allExpenses.filter(e => e.repId === user?.id);
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  const byType = expenses.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);

  const resetForm = () => {
    setType('Meal');
    setAmount('');
    setDesc('');
    setDoctor('');
    setDate(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  };

  const handleSubmit = () => {
    const parsedAmount = parseFloat(amount);
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    if (!desc.trim()) {
      toast.error('Please enter a description');
      return;
    }
    if (desc.trim().length > 200) {
      toast.error('Description must be under 200 characters');
      return;
    }

    const newExpense: Expense = {
      id: Date.now(),
      repId: user?.id || '',
      date,
      type,
      amount: parsedAmount,
      desc: doctor.trim() ? `${desc.trim()} — ${doctor.trim()}` : desc.trim(),
      status: 'Pending',
    };

    setAllExpenses(prev => [newExpense, ...prev]);
    resetForm();
    setShowForm(false);
    toast.success('Expense submitted');
  };

  return (
    <>
      <TopBar title="Expenses" />
      <div className="space-y-4 p-4">
        <div className="rounded-lg bg-card p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">Monthly Total</p>
          <p className="text-2xl font-bold text-foreground">${total.toFixed(2)}</p>
          <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
            {Object.entries(byType).map(([t, amt]) => (
              <span key={t}>{t}: ${amt.toFixed(2)}</span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {expenses.map(e => (
            <div key={e.id} className="flex items-center justify-between rounded-lg bg-card p-3 shadow-sm transition-all duration-200">
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
      <BottomSheet open={showForm} onClose={() => { setShowForm(false); resetForm(); }} title="Log Expense">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Type</label>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {expenseTypes.map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium tap-target transition-colors ${
                    type === t
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Amount ($)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="mt-0.5 w-full rounded-lg border bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Description</label>
            <input
              type="text"
              maxLength={200}
              value={desc}
              onChange={e => setDesc(e.target.value)}
              className="mt-0.5 w-full rounded-lg border bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g. Lunch with Dr. Park"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Doctor (optional)</label>
            <input
              type="text"
              maxLength={100}
              value={doctor}
              onChange={e => setDoctor(e.target.value)}
              className="mt-0.5 w-full rounded-lg border bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="NPI or name"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Date</label>
            <input
              type="text"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="mt-0.5 w-full rounded-lg border bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Mar 10"
            />
          </div>

          <button className="w-full rounded-lg border py-2 text-sm font-medium text-foreground tap-target hover:bg-muted transition-colors">
            📷 Upload Receipt
          </button>

          <button
            onClick={handleSubmit}
            className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground tap-target shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
          >
            Submit Expense
          </button>
        </div>
      </BottomSheet>
    </>
  );
}
