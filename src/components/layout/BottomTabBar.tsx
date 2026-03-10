import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MoreHorizontal, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface TabItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export interface MoreItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

interface BottomTabBarProps {
  tabs: TabItem[];
  moreItems: MoreItem[];
}

export function BottomTabBar({ tabs, moreItems }: BottomTabBarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  const allTabs = [...tabs, { label: 'More', path: '__more__', icon: MoreHorizontal }];

  const isActive = (path: string) => {
    if (path === '__more__') return moreItems.some(m => location.pathname.startsWith(m.path));
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t bg-background md:hidden">
        <div className="flex items-stretch">
          {allTabs.map(tab => (
            <button
              key={tab.label}
              onClick={() => {
                if (tab.path === '__more__') {
                  setShowMore(!showMore);
                } else {
                  setShowMore(false);
                  navigate(tab.path);
                }
              }}
              className={cn(
                'flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-medium tap-target',
                isActive(tab.path) ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* More menu overlay */}
      {showMore && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setShowMore(false)}>
          <div className="fixed inset-0 bg-foreground/20" />
          <div className="fixed bottom-16 left-4 right-4 z-50 rounded-2xl bg-background p-4 shadow-lg" onClick={e => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">More</h3>
              <button onClick={() => setShowMore(false)} className="tap-target"><X className="h-5 w-5 text-muted-foreground" /></button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {moreItems.map(item => (
                <button
                  key={item.label}
                  onClick={() => { navigate(item.path); setShowMore(false); }}
                  className={cn(
                    'flex flex-col items-center gap-1 rounded-lg p-3 text-[11px] font-medium tap-target',
                    location.pathname.startsWith(item.path) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
