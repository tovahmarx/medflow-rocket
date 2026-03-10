import { cn } from '@/lib/utils';
import { useState } from 'react';

interface FilterBarProps {
  filters: string[];
  active: string;
  onSelect: (filter: string) => void;
  className?: string;
}

export function FilterBar({ filters, active, onSelect, className }: FilterBarProps) {
  return (
    <div className={cn('flex gap-2 overflow-x-auto pb-1 scrollbar-none', className)}>
      {filters.map(f => (
        <button
          key={f}
          onClick={() => onSelect(f)}
          className={cn(
            'whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium tap-target transition-colors',
            f === active
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          )}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
