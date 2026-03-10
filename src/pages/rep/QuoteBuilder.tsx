import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { AIInsightCard } from '@/components/shared/AIInsightCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { products, quotes as allQuotes } from '@/data/mock-data';
import { Search, Plus, FileText, Send } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface LineItem { productId: string; name: string; price: number; qty: number; }

export default function QuoteBuilder() {
  const [building, setBuilding] = useState(false);
  const [items, setItems] = useState<LineItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const { user } = useAuth();

  const existingQuotes = allQuotes.filter(q => q.repId === user?.id);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discountAmt = subtotal * (discount / 100);
  const total = subtotal - discountAmt;

  const addItem = (p: typeof products[0]) => {
    setItems(prev => {
      const ex = prev.find(i => i.productId === p.id);
      if (ex) return prev.map(i => i.productId === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { productId: p.id, name: p.name, price: p.price, qty: 1 }];
    });
  };

  if (building) {
    return (
      <>
        <TopBar title="New Quote" />
        <div className="space-y-4 p-4">
          <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Search doctor by NPI..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>

          <div className="space-y-2">
            {products.map(p => (
              <div key={p.id} className="flex items-center justify-between rounded-lg border bg-card p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">${p.price}/{p.unit}</p>
                </div>
                <button onClick={() => addItem(p)} className="rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground tap-target">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {items.length > 0 && (
            <div className="rounded-lg border bg-card p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">Line Items</h3>
              {items.map(i => (
                <div key={i.productId} className="flex items-center justify-between py-1">
                  <span className="text-xs text-foreground">{i.name} × {i.qty}</span>
                  <span className="text-xs font-medium text-foreground">${(i.price * i.qty).toLocaleString()}</span>
                </div>
              ))}
              <div className="mt-2 border-t pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Discount %</span>
                  <input type="number" value={discount} onChange={e => setDiscount(Number(e.target.value))}
                    className="w-16 rounded border bg-card px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary" />
                  {discount > 5 && <StatusBadge variant="warning">Requires Approval</StatusBadge>}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">Total</span>
                  <span className="text-lg font-bold text-foreground">${total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          <AIInsightCard>Based on order history, consider 6-month auto-reorder.</AIInsightCard>

          <div className="flex gap-2">
            <button className="flex-1 rounded-lg border py-3 text-sm font-medium text-foreground tap-target">
              <FileText className="mr-1 inline h-4 w-4" /> Preview PDF
            </button>
            <button className="flex-1 rounded-lg bg-primary py-3 text-sm font-medium text-primary-foreground tap-target">
              <Send className="mr-1 inline h-4 w-4" /> Send
            </button>
          </div>
          <button onClick={() => setBuilding(false)} className="w-full text-center text-xs text-muted-foreground tap-target">Cancel</button>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar title="Quotes" />
      <div className="space-y-3 p-4">
        <button onClick={() => setBuilding(true)} className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground tap-target">
          + New Quote
        </button>
        {existingQuotes.map(q => (
          <div key={q.id} className="flex items-center justify-between rounded-lg border bg-card p-3">
            <div>
              <p className="text-sm font-medium text-foreground">{q.id} — {q.doctor}</p>
              <p className="text-xs text-muted-foreground">{q.date}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">${q.total.toLocaleString()}</p>
              <StatusBadge variant={q.status === 'Signed' ? 'success' : q.status === 'Viewed' ? 'info' : q.status === 'Sent' ? 'neutral' : 'danger'}>
                {q.status}
              </StatusBadge>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
