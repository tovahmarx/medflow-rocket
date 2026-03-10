import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  className?: string;
}

export function StatCard({ label, value, trend, trendValue, className }: StatCardProps) {
  return (
    <div className={cn('rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden', className)}>
      <p className="truncate text-xs font-medium text-muted-foreground">{label}</p>
      <div className="mt-1 flex items-end gap-2 min-w-0">
        <span className="text-2xl font-semibold text-foreground">{value}</span>
        {trend && (
          <span className={cn('flex items-center text-xs font-medium', trend === 'up' ? 'text-success' : 'text-destructive')}>
            {trend === 'up' ? <TrendingUp className="mr-0.5 h-3 w-3" /> : <TrendingDown className="mr-0.5 h-3 w-3" />}
            {trendValue}
          </span>
        )}
      </div>
    </div>
  );
}
