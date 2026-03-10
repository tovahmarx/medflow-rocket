import { TopBar } from '@/components/layout/TopBar';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { orders } from '@/data/mock-data';

export default function OrderHistory() {
  const myOrders = orders.filter(o => o.doctorId === 'u6');

  return (
    <>
      <TopBar title="Order History" />
      <div className="space-y-3 p-4">
        {/* Auto-reorder info */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-medium text-primary">Recurring Order</p>
          <p className="text-sm text-foreground">24× MedGlide Pro 100mL every 3 weeks</p>
          <p className="text-xs text-muted-foreground">Next: March 18</p>
          <div className="mt-2 flex gap-2">
            <button className="rounded-md border px-3 py-1 text-xs font-medium text-foreground tap-target">Pause</button>
            <button className="rounded-md border px-3 py-1 text-xs font-medium text-destructive tap-target">Cancel</button>
          </div>
        </div>

        {myOrders.map(o => (
          <div key={o.id} className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">{o.id}</p>
                <p className="text-xs text-muted-foreground">{o.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">${o.total.toLocaleString()}</p>
                <StatusBadge variant="success">{o.status}</StatusBadge>
              </div>
            </div>
            <div className="mt-2 space-y-1">
              {o.items.map((item, i) => (
                <p key={i} className="text-xs text-muted-foreground">{item.qty}× {item.name} — ${(item.qty * item.price).toLocaleString()}</p>
              ))}
            </div>
            <button className="mt-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground tap-target">Reorder</button>
          </div>
        ))}
      </div>
    </>
  );
}
