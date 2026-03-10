import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { FilterBar } from '@/components/shared/FilterBar';
import { Heart, Send, Presentation } from 'lucide-react';

const content = [
  { id: 1, title: 'Product Overview Deck', type: 'Presentation', status: 'Approved', version: 'v3', favorite: true },
  { id: 2, title: 'Urology Clinical Study', type: 'Clinical Study', status: 'Approved', version: 'v1', favorite: false },
  { id: 3, title: 'Pricing Comparison', type: 'One-Pager', status: 'Approved', version: 'v2', favorite: true },
  { id: 4, title: 'ISO 13485 Certificate', type: 'Product Sheet', status: 'Approved', version: 'v1', favorite: false },
];

const filters = ['All', 'Presentation', 'Clinical Study', 'One-Pager', 'Product Sheet'];

export default function ContentLibrary() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [presenting, setPresenting] = useState<number | null>(null);
  const [items, setItems] = useState(content);

  const filtered = items.filter(c => activeFilter === 'All' || c.type === activeFilter);
  const favorites = filtered.filter(c => c.favorite);
  const rest = filtered.filter(c => !c.favorite);

  if (presenting !== null) {
    return (
      <>
        <TopBar title="Presenting" />
        <div className="flex flex-col items-center justify-center p-8">
          <div className="w-full aspect-[16/9] rounded-lg bg-muted flex items-center justify-center mb-4">
            <Presentation className="h-16 w-16 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">{items.find(c => c.id === presenting)?.title}</p>
          <p className="text-xs text-muted-foreground mt-1">Slide 1 of 8 · 00:00</p>
          <div className="mt-4 flex gap-2">
            <button className="rounded-lg border px-4 py-2 text-sm tap-target">Previous</button>
            <button className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground tap-target">Next</button>
          </div>
          <button onClick={() => setPresenting(null)} className="mt-4 text-xs text-destructive tap-target">End Presentation</button>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar title="Content Library" />
      <div className="space-y-4 p-4">
        <FilterBar filters={filters} active={activeFilter} onSelect={setActiveFilter} />

        {favorites.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold text-muted-foreground">FAVORITES</p>
            <div className="space-y-2">
              {favorites.map(c => (
                <ContentRow key={c.id} item={c} onPresent={() => setPresenting(c.id)} onToggleFav={() => setItems(prev => prev.map(i => i.id === c.id ? { ...i, favorite: !i.favorite } : i))} />
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          {rest.map(c => (
            <ContentRow key={c.id} item={c} onPresent={() => setPresenting(c.id)} onToggleFav={() => setItems(prev => prev.map(i => i.id === c.id ? { ...i, favorite: !i.favorite } : i))} />
          ))}
        </div>
      </div>
    </>
  );
}

function ContentRow({ item, onPresent, onToggleFav }: { item: typeof content[0]; onPresent: () => void; onToggleFav: () => void }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-card p-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
        <Presentation className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{item.title}</p>
        <p className="text-xs text-muted-foreground">{item.type} · {item.version}</p>
      </div>
      <div className="flex gap-1">
        <button onClick={onToggleFav} className="rounded-md p-2 tap-target">
          <Heart className={`h-4 w-4 ${item.favorite ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
        </button>
        <button onClick={onPresent} className="rounded-md bg-primary p-2 tap-target">
          <Presentation className="h-4 w-4 text-primary-foreground" />
        </button>
      </div>
    </div>
  );
}
