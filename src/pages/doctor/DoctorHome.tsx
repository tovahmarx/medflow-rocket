import { TopBar } from '@/components/layout/TopBar';
import { StatCard } from '@/components/shared/StatCard';
import { AIInsightCard } from '@/components/shared/AIInsightCard';
import { AvatarCircle } from '@/components/shared/AvatarCircle';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { useAuth } from '@/contexts/AuthContext';
import { orders, doctorAccounts, users } from '@/data/mock-data';
import { useNavigate } from 'react-router-dom';

export default function DoctorHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const myOrders = orders.filter(o => o.doctorId === user?.id);
  const myAccount = doctorAccounts.find(d => d.userId === user?.id);
  const myRep = myAccount ? users.find(u => u.id === myAccount.assignedRep) : null;
  const totalSpend = myOrders.reduce((s, o) => s + o.total, 0);

  return (
    <>
      <TopBar title="Home" />
      <div className="space-y-4 p-4">
        <AIInsightCard>
          Based on your ordering pattern, you'll need MedGlide Pro 100mL by March 18. Last order was 18 days ago. You typically reorder every 21 days.{' '}
          <button onClick={() => navigate('/doctor/order')} className="font-semibold text-primary underline">Reorder now →</button>
        </AIInsightCard>

        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Total Orders" value="4" />
          <StatCard label="Lifetime Spend" value="$3,952" />
          <StatCard label="Status" value="Active" className="border-success/20" />
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Recent Orders</h3>
          <div className="space-y-2">
            {myOrders.slice(0, 3).map(o => (
              <div key={o.id} className="flex items-center justify-between rounded-lg p-2 active:bg-muted/50">
                <div>
                  <p className="text-sm font-medium text-foreground">{o.id}</p>
                  <p className="text-xs text-muted-foreground">{o.date} · {o.items.map(i => `${i.qty}× ${i.name.split(' ').slice(-1)}`).join(', ')}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">${o.total.toLocaleString()}</p>
                  <StatusBadge variant="success">{o.status}</StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <p className="text-xs text-muted-foreground">Your Rep</p>
          <div className="mt-2 flex items-center gap-3">
            <AvatarCircle initials="CM" />
            <div>
              <p className="text-sm font-medium text-foreground">Clint M.</p>
              <p className="text-xs text-muted-foreground">Sales Rep · Southeast</p>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button className="flex-1 rounded-lg border py-2 text-xs font-medium text-foreground tap-target">Call</button>
            <button className="flex-1 rounded-lg border py-2 text-xs font-medium text-foreground tap-target">Email</button>
            <button className="flex-1 rounded-lg bg-primary py-2 text-xs font-medium text-primary-foreground tap-target">Video Demo</button>
          </div>
        </div>
      </div>
    </>
  );
}
