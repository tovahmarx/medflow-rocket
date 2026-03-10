import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import type { TabItem, MoreItem } from './BottomTabBar';

interface DesktopSidebarProps {
  tabs: TabItem[];
  moreItems: MoreItem[];
}

export function DesktopSidebar({ tabs, moreItems }: DesktopSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const allItems = [...tabs, ...moreItems];
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <aside className="hidden md:flex md:w-56 md:flex-col md:border-r md:bg-card md:shadow-sm">
      <div className="flex items-center gap-2 border-b px-4 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Heart className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-base font-bold text-foreground">MedFlow</span>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        {allItems.map(item => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium tap-target transition-colors duration-150',
              isActive(item.path) ? 'bg-primary/10 text-primary border-l-2 border-l-primary' : 'text-muted-foreground hover:bg-muted'
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
