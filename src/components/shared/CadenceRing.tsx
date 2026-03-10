import { cn } from '@/lib/utils';

interface CadenceRingProps {
  status: 'green' | 'amber' | 'red';
  children: React.ReactNode;
  size?: number;
  className?: string;
}

const ringColors = {
  green: 'ring-success',
  amber: 'ring-warning',
  red: 'ring-destructive',
};

export function CadenceRing({ status, children, className }: CadenceRingProps) {
  return (
    <div className={cn('relative rounded-full ring-2', ringColors[status], className)}>
      {children}
    </div>
  );
}
