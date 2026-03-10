import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIInsightCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AIInsightCard({ children, className }: AIInsightCardProps) {
  return (
    <div className={cn('flex gap-3 rounded-lg border-l-4 border-l-success bg-success/5 p-4 shadow-sm', className)}>
      <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
      <p className="text-sm leading-relaxed text-foreground">{children}</p>
    </div>
  );
}
