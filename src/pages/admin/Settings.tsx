import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { reps, users, products } from '@/data/mock-data';
import { AvatarCircle } from '@/components/shared/AvatarCircle';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTour } from '@/contexts/TourContext';

const sections = [
  {
    title: 'Rep Management',
    content: () => (
      <div className="space-y-2">
        {reps.map(r => (
          <div key={r.id} className="flex items-center justify-between rounded-lg border bg-card p-3">
            <div className="flex items-center gap-2">
              <AvatarCircle initials={r.initials} size="sm" />
              <div>
                <p className="text-sm font-medium text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.territory}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <button className="rounded border px-2 py-1 text-[10px] font-medium tap-target">Edit</button>
              <button className="rounded border px-2 py-1 text-[10px] font-medium tap-target">Reset PW</button>
              <button className="rounded border px-2 py-1 text-[10px] font-medium text-destructive tap-target">Deactivate</button>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Commission Tiers',
    content: () => (
      <div className="space-y-2">
        {[{ tier: 'Tier 1', rate: '8%', range: '$0 – $20K' }, { tier: 'Tier 2', rate: '10%', range: '$20K – $50K' }, { tier: 'Tier 3', rate: '13%', range: '$50K+' }].map(t => (
          <div key={t.tier} className="flex items-center justify-between rounded-lg border bg-card p-3">
            <span className="text-sm font-medium text-foreground">{t.tier} — {t.rate}</span>
            <span className="text-xs text-muted-foreground">{t.range}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Cadence Rules',
    content: () => (
      <div className="space-y-2">
        {[{ tier: 'Top', days: 14 }, { tier: 'Repeat', days: 21 }, { tier: 'At Risk', days: 10 }, { tier: 'Cold', days: 30 }, { tier: 'New Lead', days: 7 }].map(c => (
          <div key={c.tier} className="flex items-center justify-between rounded-lg border bg-card p-3">
            <span className="text-sm text-foreground">{c.tier}</span>
            <div className="flex items-center gap-2">
              <input type="number" defaultValue={c.days} className="w-14 rounded border bg-card px-2 py-1 text-xs text-center focus:outline-none focus:ring-2 focus:ring-primary" />
              <span className="text-xs text-muted-foreground">days</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Products',
    content: () => (
      <div className="space-y-2">
        {products.map(p => (
          <div key={p.id} className="flex items-center justify-between rounded-lg border bg-card p-3">
            <div>
              <p className="text-sm font-medium text-foreground">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.sku} · ${p.price}/{p.unit}</p>
            </div>
            <span className="text-xs text-muted-foreground">Stock: {p.stock}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Approval Thresholds',
    content: () => (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Deal amount for approval</span>
          <div className="flex items-center gap-1"><span className="text-xs text-muted-foreground">$</span><input type="number" defaultValue={100000} className="w-24 rounded border bg-card px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary" /></div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Discount % for approval</span>
          <div className="flex items-center gap-1"><input type="number" defaultValue={5} className="w-14 rounded border bg-card px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary" /><span className="text-xs text-muted-foreground">%</span></div>
        </div>
      </div>
    ),
  },
  {
    title: 'Notifications',
    content: () => (
      <div className="space-y-2">
        {['New orders', 'Overdue cadences', 'Low inventory', 'Expense submissions', 'Rep activity alerts', 'Content expiry'].map(n => (
          <label key={n} className="flex items-center justify-between py-1">
            <span className="text-sm text-foreground">{n}</span>
            <input type="checkbox" defaultChecked className="rounded" />
          </label>
        ))}
      </div>
    ),
  },
  {
    title: 'Onboarding Tour',
    content: () => (
      <button className="rounded-lg border py-3 w-full text-sm font-medium text-foreground tap-target">Restart Onboarding Tour</button>
    ),
  },
];

export default function Settings() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggle = (title: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title); else next.add(title);
      return next;
    });
  };

  return (
    <>
      <TopBar title="Settings" />
      <div className="space-y-2 p-4">
        {sections.map(s => (
          <div key={s.title} className="rounded-lg border bg-card">
            <button onClick={() => toggle(s.title)} className="flex w-full items-center justify-between p-4 tap-target">
              <p className="text-sm font-semibold text-foreground">{s.title}</p>
              {openSections.has(s.title) ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
            </button>
            {openSections.has(s.title) && (
              <div className="border-t px-4 pb-4 pt-3">{s.content()}</div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
