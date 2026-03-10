import { cn } from '@/lib/utils';

interface ListRowProps {
  icon?: React.ReactNode;
  avatar?: React.ReactNode;
  primary: string;
  secondary?: string;
  right?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  leftBorder?: string;
}

export function ListRow({ icon, avatar, primary, secondary, right, onClick, className, leftBorder }: ListRowProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 rounded-lg bg-card p-3 tap-target shadow-sm transition-all duration-200',
        leftBorder,
        onClick && 'cursor-pointer hover:shadow-md active:scale-[0.98]',
        className
      )}
    >
      {avatar || icon}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{primary}</p>
        {secondary && <p className="truncate text-xs text-muted-foreground">{secondary}</p>}
      </div>
      {right && <div className="flex-shrink-0">{right}</div>}
    </div>
  );
}
