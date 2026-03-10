import { useState } from 'react';
import { Search, Bell, HelpCircle, LogOut, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { notifications } from '@/data/mock-data';
import { BottomSheet } from '@/components/shared/BottomSheet';
import { AvatarCircle } from '@/components/shared/AvatarCircle';

export function TopBar({ title }: { title: string }) {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const unread = notifications.filter(n => !n.read).length;

  const iconColor = (type: string) =>
    type === 'destructive' ? 'bg-destructive/10 text-destructive' :
    type === 'success' ? 'bg-success/10 text-success' :
    type === 'warning' ? 'bg-warning/10 text-warning' :
    type === 'info' ? 'bg-info/10 text-info' :
    'bg-offline/10 text-offline';

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-background px-4 py-3">
        <h1 className="text-lg font-bold text-foreground">{title}</h1>
        <div className="flex items-center gap-1">
          <button onClick={() => setShowSearch(true)} className="rounded-full p-2 hover:bg-muted tap-target">
            <Search className="h-5 w-5 text-muted-foreground" />
          </button>
          <button onClick={() => setShowNotifications(true)} className="relative rounded-full p-2 hover:bg-muted tap-target">
            <Bell className="h-5 w-5 text-muted-foreground" />
            {unread > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-primary-foreground">
                {unread}
              </span>
            )}
          </button>
          <button onClick={logout} className="rounded-full p-2 hover:bg-muted tap-target">
            <LogOut className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Search overlay */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="flex items-center gap-2 border-b px-4 py-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              autoFocus
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search doctors, orders, calls, reps..."
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button onClick={() => { setShowSearch(false); setSearchQuery(''); }} className="tap-target">
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
          <div className="p-4">
            {searchQuery.length === 0 ? (
              <p className="text-xs text-muted-foreground">Recent searches will appear here</p>
            ) : (
              <div className="space-y-4">
                {searchQuery.toLowerCase().includes('osei') && (
                  <>
                    <div>
                      <p className="mb-2 text-xs font-medium text-muted-foreground">DOCTORS</p>
                      <div className="flex items-center gap-3 rounded-lg p-2 active:bg-muted">
                        <AvatarCircle initials="RO" size="sm" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Dr. Renata Osei</p>
                          <p className="text-xs text-muted-foreground">Urology · Urology Associates</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-medium text-muted-foreground">ORDERS</p>
                      <div className="flex items-center gap-3 rounded-lg p-2 active:bg-muted">
                        <p className="text-sm text-foreground">ORD-0091 · 24× MedGlide Pro · $1,152</p>
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-medium text-muted-foreground">CALLS</p>
                      <div className="flex items-center gap-3 rounded-lg p-2 active:bg-muted">
                        <p className="text-sm text-foreground">Call with Dr. Osei · 6m 42s · Interested</p>
                      </div>
                    </div>
                  </>
                )}
                {!searchQuery.toLowerCase().includes('osei') && (
                  <p className="text-sm text-muted-foreground">No results for "{searchQuery}"</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notifications */}
      <BottomSheet open={showNotifications} onClose={() => setShowNotifications(false)} title="Notifications">
        <div className="space-y-2">
          {notifications.map(n => (
            <div key={n.id} className="flex items-start gap-3 rounded-lg p-2 active:bg-muted">
              <div className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${iconColor(n.icon)}`}>
                <Bell className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className={`text-sm ${n.read ? 'text-muted-foreground' : 'font-medium text-foreground'}`}>{n.text}</p>
                <p className="text-xs text-muted-foreground">{n.time}</p>
              </div>
              {!n.read && <span className="mt-2 h-2 w-2 rounded-full bg-primary" />}
            </div>
          ))}
        </div>
      </BottomSheet>
    </>
  );
}
