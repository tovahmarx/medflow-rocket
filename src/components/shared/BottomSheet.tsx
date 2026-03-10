import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function BottomSheet({ open, onClose, title, children, className }: BottomSheetProps) {
  const isMobile = useIsMobile();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center animate-fade-in" onClick={onClose}>
      <div className="fixed inset-0 bg-foreground/20" />
      <div
        onClick={e => e.stopPropagation()}
        className={cn(
          'relative z-50 w-full bg-background shadow-lg',
          isMobile ? 'max-h-[85vh] rounded-t-2xl animate-slide-up' : 'max-h-[80vh] max-w-lg rounded-lg animate-scale-in',
          className
        )}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-muted tap-target">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
