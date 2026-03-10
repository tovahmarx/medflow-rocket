import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { AIInsightCard } from '@/components/shared/AIInsightCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { CadenceRing } from '@/components/shared/CadenceRing';
import { AvatarCircle } from '@/components/shared/AvatarCircle';
import { repTasks } from '@/data/mock-data';
import { Phone, Mail, Building, Video, Presentation, Zap, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const typeIcons: Record<string, React.ReactNode> = {
  call: <Phone className="h-4 w-4" />,
  email: <Mail className="h-4 w-4" />,
  visit: <Building className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  presentation: <Presentation className="h-4 w-4" />,
  auto: <Zap className="h-4 w-4" />,
};

const urgencyBorder: Record<string, string> = {
  high: 'border-l-4 border-l-destructive',
  medium: 'border-l-4 border-l-warning',
  low: 'border-l-4 border-l-info',
};

export default function MyTasks() {
  const [tasks, setTasks] = useState(repTasks.filter(t => t.repId === 'u2'));

  const toggle = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const remaining = tasks.filter(t => !t.completed);
  const completed = tasks.filter(t => t.completed);

  return (
    <>
      <TopBar title="My Tasks" />
      <div className="space-y-4 p-4">
        <AIInsightCard>
          You have 2 high-urgency calls this morning. Dr. Osei is ready to reorder — call her first. Dr. Webb hasn't responded to 3 emails — try an office visit. You're 4 calls away from your weekly streak badge. Day 14 streak — keep it going.
        </AIInsightCard>

        <p className="text-xs text-muted-foreground">{remaining.length} remaining · {completed.length} completed</p>

        <div className="space-y-2">
          {remaining.map(t => (
            <div
              key={t.id}
              className={cn('rounded-lg border bg-card p-3', urgencyBorder[t.urgency])}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 text-muted-foreground">{typeIcons[t.type]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{t.doctorName}</p>
                    <StatusBadge variant={t.urgency === 'high' ? 'danger' : t.urgency === 'medium' ? 'warning' : 'info'}>
                      {t.urgency}
                    </StatusBadge>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.practice}</p>
                  <p className="mt-1 text-xs text-foreground">{t.description}</p>
                  {t.time && <p className="mt-0.5 text-[10px] text-muted-foreground">{t.time}</p>}
                  {t.aiTip && (
                    <div className="mt-2 flex items-start gap-1.5 rounded bg-success/5 p-2">
                      <Sparkles className="mt-0.5 h-3 w-3 flex-shrink-0 text-success" />
                      <p className="text-[11px] text-foreground">{t.aiTip}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-2 flex gap-2">
                <button onClick={() => toggle(t.id)} className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground tap-target">
                  Complete
                </button>
                <button className="rounded-md border px-3 py-1.5 text-xs font-medium text-foreground tap-target">
                  Reschedule
                </button>
              </div>
            </div>
          ))}
        </div>

        {completed.length > 0 && (
          <div className="space-y-2 opacity-50">
            <p className="text-xs font-medium text-muted-foreground">Completed</p>
            {completed.map(t => (
              <div key={t.id} className="rounded-lg border bg-card p-3 line-through">
                <p className="text-sm text-muted-foreground">{t.doctorName} — {t.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
