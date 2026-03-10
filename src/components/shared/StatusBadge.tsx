import { cn } from '@/lib/utils';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'offline';

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-destructive/10 text-destructive',
  info: 'bg-info/10 text-info',
  neutral: 'bg-muted text-muted-foreground',
  offline: 'bg-offline/10 text-offline',
};

interface StatusBadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export function StatusBadge({ variant, children, className, dot }: StatusBadgeProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold', variantStyles[variant], className)}>
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', variant === 'success' ? 'bg-success' : variant === 'warning' ? 'bg-warning' : variant === 'danger' ? 'bg-destructive' : variant === 'info' ? 'bg-info' : variant === 'offline' ? 'bg-offline' : 'bg-muted-foreground')} />}
      {children}
    </span>
  );
}
