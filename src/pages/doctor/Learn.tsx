import { TopBar } from '@/components/layout/TopBar';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { BookOpen, Play } from 'lucide-react';

const videos = [
  { title: 'Product Overview', duration: '12 min', category: 'Product Training', watched: true },
  { title: 'Clinical Study: Urology', duration: '8 min', category: 'Clinical Evidence', watched: true },
  { title: 'Best Practices: Sterile Lubrication', duration: '15 min', category: 'Best Practices', watched: false },
  { title: 'Q4 Webinar Recording', duration: '45 min', category: 'Webinars', watched: false },
];

export default function Learn() {
  return (
    <>
      <TopBar title="Learn" />
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">2/4 watched</p>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-20 rounded-full bg-muted">
              <div className="h-1.5 w-10 rounded-full bg-primary" />
            </div>
            <span className="text-xs text-muted-foreground">50%</span>
          </div>
        </div>

        {/* Upcoming */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-medium text-primary">Upcoming</p>
          <p className="text-sm font-medium text-foreground">MedGlide Best Practices Webinar</p>
          <p className="text-xs text-muted-foreground">March 15 at 2:00 PM</p>
          <button className="mt-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground tap-target">Join →</button>
        </div>

        {videos.map(v => (
          <div key={v.title} className="flex items-center gap-3 rounded-lg border bg-card p-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              {v.watched ? <BookOpen className="h-5 w-5 text-success" /> : <Play className="h-5 w-5 text-muted-foreground" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{v.title}</p>
              <p className="text-xs text-muted-foreground">{v.duration} · {v.category}</p>
            </div>
            {v.watched && <StatusBadge variant="success">Watched</StatusBadge>}
          </div>
        ))}
      </div>
    </>
  );
}
