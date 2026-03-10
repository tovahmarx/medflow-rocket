import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, HelpCircle, LogOut, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { notifications, users, doctors, deals, products, commEntries } from '@/data/mock-data';
import { BottomSheet } from '@/components/shared/BottomSheet';
import { AvatarCircle } from '@/components/shared/AvatarCircle';

export function TopBar({ title }: { title: string }) {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
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

  const recentSearches = ['Dr. Osei', 'MedGlide Pro', 'St. Luke\'s'];

  const getSearchResults = (q: string) => {
    const lower = q.toLowerCase();
    const matchedDoctors = users.filter(u => u.role === 'doctor' && (u.name.toLowerCase().includes(lower) || u.specialty?.toLowerCase().includes(lower)));
    const matchedReps = users.filter(u => u.role === 'rep' && u.name.toLowerCase().includes(lower));
    const matchedProducts = products.filter(p => p.name.toLowerCase().includes(lower) || p.sku.toLowerCase().includes(lower));
    const matchedDeals = deals.filter(d => d.doctorName.toLowerCase().includes(lower) || d.practice.toLowerCase().includes(lower));
    const matchedComms = commEntries.filter(c => c.target.toLowerCase().includes(lower) || c.repName.toLowerCase().includes(lower));
    return { matchedDoctors, matchedReps, matchedProducts, matchedDeals, matchedComms };
  };

  const helpPath = role === 'admin' ? '/admin/help' : role === 'rep' ? '/rep/help' : '/doctor/help';

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
          <button onClick={() => navigate(helpPath)} className="rounded-full p-2 hover:bg-muted tap-target">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
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
          <div className="overflow-y-auto p-4" style={{ maxHeight: 'calc(100vh - 56px)' }}>
            {searchQuery.length === 0 ? (
              <div>
                <p className="mb-3 text-xs font-medium text-muted-foreground">RECENT SEARCHES</p>
                <div className="space-y-1">
                  {recentSearches.map(s => (
                    <button key={s} onClick={() => setSearchQuery(s)} className="flex w-full items-center gap-2 rounded-lg p-2 text-sm text-foreground tap-target active:bg-muted">
                      <Search className="h-3.5 w-3.5 text-muted-foreground" />
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              (() => {
                const { matchedDoctors, matchedReps, matchedProducts, matchedDeals, matchedComms } = getSearchResults(searchQuery);
                const hasResults = matchedDoctors.length || matchedReps.length || matchedProducts.length || matchedDeals.length || matchedComms.length;
                if (!hasResults) return <p className="text-sm text-muted-foreground">No results for "{searchQuery}"</p>;
                return (
                  <div className="space-y-4">
                    {matchedDoctors.length > 0 && (
                      <div>
                        <p className="mb-2 text-xs font-medium text-muted-foreground">DOCTORS</p>
                        {matchedDoctors.map(d => (
                          <div key={d.id} className="flex items-center gap-3 rounded-lg p-2 active:bg-muted">
                            <AvatarCircle initials={d.initials} size="sm" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{d.name}</p>
                              <p className="text-xs text-muted-foreground">{d.specialty} · {d.practice}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {matchedReps.length > 0 && (
                      <div>
                        <p className="mb-2 text-xs font-medium text-muted-foreground">REPS</p>
                        {matchedReps.map(r => (
                          <div key={r.id} className="flex items-center gap-3 rounded-lg p-2 active:bg-muted">
                            <AvatarCircle initials={r.initials} size="sm" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{r.name}</p>
                              <p className="text-xs text-muted-foreground">{r.territory}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {matchedProducts.length > 0 && (
                      <div>
                        <p className="mb-2 text-xs font-medium text-muted-foreground">PRODUCTS</p>
                        {matchedProducts.map(p => (
                          <div key={p.id} className="flex items-center gap-3 rounded-lg p-2 active:bg-muted">
                            <p className="text-sm text-foreground">{p.name} · {p.sku} · ${p.price}/{p.unit}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {matchedDeals.length > 0 && (
                      <div>
                        <p className="mb-2 text-xs font-medium text-muted-foreground">DEALS</p>
                        {matchedDeals.map(d => (
                          <div key={d.id} className="flex items-center gap-3 rounded-lg p-2 active:bg-muted">
                            <p className="text-sm text-foreground">{d.doctorName} · ${d.value.toLocaleString()} · {d.stage}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {matchedComms.length > 0 && (
                      <div>
                        <p className="mb-2 text-xs font-medium text-muted-foreground">COMMUNICATIONS</p>
                        {matchedComms.map(c => (
                          <div key={c.id} className="flex items-center gap-3 rounded-lg p-2 active:bg-muted">
                            <p className="text-sm text-foreground">{c.repName} → {c.target} · {c.type} · {c.time}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()
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
