import { TopBar } from '@/components/layout/TopBar';
import { StatCard } from '@/components/shared/StatCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { products } from '@/data/mock-data';

export default function InventoryTracker() {
  return (
    <>
      <TopBar title="Inventory" />
      <div className="space-y-3 p-4">
        {products.map(p => {
          const pct = Math.min(100, (p.stock / (p.reorderThreshold * 2)) * 100);
          return (
            <div key={p.id} className="rounded-lg border bg-card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.sku} · ${p.price}/{p.unit}</p>
                </div>
                <StatusBadge variant={p.status === 'OK' ? 'success' : p.status === 'Low' ? 'warning' : 'danger'}>
                  {p.status}
                </StatusBadge>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{p.stock} units</span>
                  <span>Reorder @ {p.reorderThreshold}</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-muted">
                  <div
                    className={`h-2 rounded-full ${p.status === 'OK' ? 'bg-success' : p.status === 'Low' ? 'bg-warning' : 'bg-destructive'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
              {p.status !== 'OK' && (
                <button className="mt-3 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground tap-target">
                  Send Reorder Alert
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
