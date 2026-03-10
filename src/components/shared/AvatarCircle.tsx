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
    <div className={cn('flex items-center justify-center rounded-full bg-primary/10 font-semibold text-primary', sizes[size], className)}>
      {initials}
    </div>
  );
}
