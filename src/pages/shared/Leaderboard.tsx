import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { AvatarCircle } from '@/components/shared/AvatarCircle';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { FilterBar } from '@/components/shared/FilterBar';
import { leaderboard } from '@/data/mock-data';
import { TrendingUp, TrendingDown, Minus, Trophy, Flame, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const categories = ['Revenue', 'Calls', 'Leads', 'Pipeline', 'Presentations', 'Commission'];

const badges = [
  { name: 'First $100K Quarter', owner: 'Priya N.', icon: '💰' },
  { name: '50 Calls in a Week', owner: 'Clint M.', icon: '📞' },
  { name: 'Conference MVP', owner: 'Priya N.', icon: '🏆' },
  { name: 'Closer of the Month', owner: 'Clint M.', icon: '🎯' },
  { name: 'Content Champion', owner: 'Sara L.', icon: '📊' },
];

const rankColors = ['', 'text-yellow-500', 'text-gray-400', 'text-amber-600'];

export default function Leaderboard({ isRepView = false }: { isRepView?: boolean }) {
  const [activeCategory, setActiveCategory] = useState('Revenue');
  const { user } = useAuth();

  return (
    <>
      <TopBar title="Leaderboard" />
      <div className="space-y-4 p-4">
        <FilterBar filters={categories} active={activeCategory} onSelect={setActiveCategory} />

        {/* Rep highlight */}
        {isRepView && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
            <p className="text-sm font-medium text-foreground">You're #2 — $3,200 behind Priya.</p>
            <p className="text-xs text-muted-foreground">2 more closes to take #1. Dr. Osei and St. Luke's are best bets.</p>
          </div>
        )}

        {/* Leaderboard */}
        <div className="space-y-2">
          {leaderboard.map((entry) => (
            <div
              key={entry.userId}
              className={cn(
                'flex items-center gap-3 rounded-lg border bg-card p-3',
                isRepView && entry.userId === user?.id && 'border-primary/30 bg-primary/5'
              )}
            >
              <div className="flex h-8 w-8 items-center justify-center">
                {entry.rank <= 3 ? (
                  <Trophy className={cn('h-6 w-6', rankColors[entry.rank])} />
                ) : (
                  <span className="text-sm font-bold text-muted-foreground">{entry.rank}</span>
                )}
              </div>
              <AvatarCircle initials={entry.initials} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{entry.name}</p>
                  {entry.streak && (
                    <span className="flex items-center gap-0.5 text-[10px] text-warning">
                      <Flame className="h-3 w-3" />{entry.streak}d
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">{entry.score}</span>
                {entry.trend === 'up' && <TrendingUp className="h-4 w-4 text-success" />}
                {entry.trend === 'down' && <TrendingDown className="h-4 w-4 text-destructive" />}
                {entry.trend === 'same' && <Minus className="h-4 w-4 text-muted-foreground" />}
              </div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Badges Earned</h3>
          <div className="flex flex-wrap gap-2">
            {badges.map(b => (
              <div key={b.name} className="flex items-center gap-1.5 rounded-full border bg-muted px-2.5 py-1">
                <span>{b.icon}</span>
                <span className="text-[10px] font-medium text-foreground">{b.name}</span>
                <span className="text-[10px] text-muted-foreground">— {b.owner}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <div className="rounded-lg border border-warning/20 bg-warning/5 p-4">
          <div className="flex items-center gap-2 mb-1">
            <Award className="h-4 w-4 text-warning" />
            <p className="text-sm font-semibold text-foreground">Active Challenge</p>
          </div>
          <p className="text-xs text-foreground">March Madness: Most new accounts this month wins a weekend getaway!</p>
          <p className="mt-1 text-[10px] text-muted-foreground">18 days remaining · Priya leading with 5 new accounts</p>
        </div>
      </div>
    </>
  );
}
