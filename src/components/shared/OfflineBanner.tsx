import { WifiOff } from 'lucide-react';
import { useState, useEffect } from 'react';

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center gap-2 bg-destructive px-4 py-2 animate-fade-in">
      <WifiOff className="h-4 w-4 text-destructive-foreground" />
      <p className="text-xs font-medium text-destructive-foreground">You're offline. Some features may be unavailable.</p>
    </div>
  );
}
