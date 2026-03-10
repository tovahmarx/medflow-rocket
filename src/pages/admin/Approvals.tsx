import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { ApprovalCard } from '@/components/shared/ApprovalCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { approvals } from '@/data/mock-data';

export default function Approvals() {
  const [items, setItems] = useState(approvals);

  const handleApprove = (id: string) => {
    setItems(prev => prev.map(a => a.id === id ? { ...a, status: 'approved' as const } : a));
  };

  const handleReject = (id: string) => {
    setItems(prev => prev.map(a => a.id === id ? { ...a, status: 'rejected' as const } : a));
  };

  const pending = items.filter(a => a.status === 'pending');

  return (
    <>
      <TopBar title="Approvals" />
      <div className="space-y-3 p-4">
        <p className="text-xs text-muted-foreground">{pending.length} pending items</p>
        {pending.map(a => (
          <ApprovalCard
            key={a.id}
            title={a.title}
            description={`${a.repName} · ${a.description}`}
            amount={a.amount}
            badge={a.aiSuggested ? <StatusBadge variant="offline">AI Suggested</StatusBadge> : undefined}
            onApprove={() => handleApprove(a.id)}
            onReject={() => handleReject(a.id)}
          />
        ))}
        {pending.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">All caught up! 🎉</div>
        )}
      </div>
    </>
  );
}
