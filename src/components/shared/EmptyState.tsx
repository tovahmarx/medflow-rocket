import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: React.ReactNode;
  message: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}

export function EmptyState({ icon, message, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <div className="mb-3 text-muted-foreground">{icon}</div>
      <p className="text-sm text-muted-foreground">{message}</p>
      {action && (
        <button onClick={action.onClick} className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground tap-target">
          {action.label}
        </button>
      )}
    </div>
  );
}
