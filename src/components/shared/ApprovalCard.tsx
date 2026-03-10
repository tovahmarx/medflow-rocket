import { cn } from '@/lib/utils';

interface ApprovalCardProps {
  title: string;
  description: string;
  amount?: string;
  badge?: React.ReactNode;
  onApprove: () => void;
  onReject: () => void;
  className?: string;
}

export function ApprovalCard({ title, description, amount, badge, onApprove, onReject, className }: ApprovalCardProps) {
  return (
    <div className={cn('rounded-lg border bg-card p-4', className)}>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-foreground">{title}</p>
            {badge}
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        </div>
        {amount && <span className="text-sm font-semibold text-foreground">{amount}</span>}
      </div>
      <div className="mt-3 flex gap-2">
        <button onClick={onApprove} className="flex-1 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground tap-target">
          Approve
        </button>
        <button onClick={onReject} className="flex-1 rounded-md border px-3 py-2 text-xs font-medium text-foreground tap-target">
          Reject
        </button>
      </div>
    </div>
  );
}
