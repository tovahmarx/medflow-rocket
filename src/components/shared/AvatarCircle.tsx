import { cn } from '@/lib/utils';

interface AvatarCircleProps {
  initials: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
};

export function AvatarCircle({ initials, className, size = 'md' }: AvatarCircleProps) {
  return (
    <div className={cn('flex items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-primary/5 font-semibold text-primary ring-1 ring-primary/10', sizes[size], className)}>
      {initials}
    </div>
  );
}
