import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

const sequences = [
  { id: 1, name: 'Urologist — Cold Intro', emails: 4, days: 14, open: 43, reply: 13, sent: 142, active: true },
  { id: 2, name: 'OB/GYN — Warm Lead', emails: 4, days: 10, open: 61, reply: 35, sent: 89, active: true },
  { id: 3, name: 'Competitor Switchover', emails: 5, days: 23, open: 43, reply: 16, sent: 67, active: true },
  { id: 4, name: 'Hot Lead — Fast Track', emails: 3, days: 3, open: 82, reply: 65, sent: 34, active: true },
  { id: 5, name: 'Hospital / Surgery Center', emails: 5, days: 30, open: 50, reply: 21, sent: 28, active: false },
];

const emailTimeline = [
  { day: 1, subject: 'Introduction to MedGlide', type: 'Intro', preview: 'Hi {LastName}, I noticed your practice specializes in...' },
  { day: 3, subject: 'Clinical Data That Matters', type: 'Value', preview: 'Dr. {LastName}, practices using MedGlide report 18% fewer complications...' },
  { day: 7, subject: 'Would a Sample Help?', type: 'Sample', preview: 'I\'d love to send you a complimentary sample of MedGlide Pro...' },
  { day: 14, subject: 'Quick Follow-Up', type: 'Follow-up', preview: 'Dr. {LastName}, just checking if you had a chance to...' },
];

const tabs = ['Sequences', 'Analytics'];

export default function EmailSequences() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedSeq, setSelectedSeq] = useState<number | null>(null);
  const [seqs, setSeqs] = useState(sequences);

  return (
    <>
      <TopBar title="Email Sequences" />
      <div className="space-y-4 p-4">
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setActiveTab(i)}
              className={cn('flex-1 rounded-md py-2 text-xs font-medium tap-target', i === activeTab ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground')}>
              {t}
            </button>
          ))}
        </div>

        {activeTab === 0 && !selectedSeq && (
          <div className="space-y-2">
            {seqs.map(s => (
              <div key={s.id} onClick={() => setSelectedSeq(s.id)} className="flex items-center justify-between rounded-lg border bg-card p-4 cursor-pointer active:bg-muted/50">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{s.name}</p>
                    {!s.active && <StatusBadge variant="neutral">Off</StatusBadge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{s.emails} emails · {s.days} days · {s.sent} sent</p>
                  <div className="mt-2 flex gap-4 text-xs">
                    <span className="text-foreground">{s.open}% open</span>
                    <span className="text-foreground">{s.reply}% reply</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); setSeqs(prev => prev.map(sq => sq.id === s.id ? { ...sq, active: !sq.active } : sq)); }}
                    className={cn('relative h-6 w-11 rounded-full transition-colors', s.active ? 'bg-primary' : 'bg-muted')}
                  >
                    <div className={cn('absolute top-0.5 h-5 w-5 rounded-full bg-background shadow transition-transform', s.active ? 'translate-x-5' : 'translate-x-0.5')} />
                  </button>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 0 && selectedSeq && (
          <div>
            <button onClick={() => setSelectedSeq(null)} className="mb-3 text-xs text-primary tap-target">← Back</button>
            <p className="text-sm font-semibold text-foreground mb-4">{seqs.find(s => s.id === selectedSeq)?.name}</p>
            <div className="relative space-y-0">
              {emailTimeline.map((e, i) => (
                <div key={i} className="relative flex gap-3 pb-6">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      D{e.day}
                    </div>
                    {i < emailTimeline.length - 1 && <div className="mt-1 w-0.5 flex-1 bg-border" />}
                  </div>
                  <div className="flex-1 rounded-lg border bg-card p-3">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{e.subject}</p>
                      <StatusBadge variant="info">{e.type}</StatusBadge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{e.preview}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Open Rate by Sequence</p>
            {seqs.map(s => (
              <div key={s.id} className="flex items-center gap-3">
                <span className="w-32 truncate text-xs text-muted-foreground">{s.name}</span>
                <div className="flex-1 h-5 rounded-sm bg-muted">
                  <div className="h-5 rounded-sm bg-info flex items-center px-2" style={{ width: `${s.open}%` }}>
                    <span className="text-[10px] font-medium text-info-foreground">{s.open}%</span>
                  </div>
                </div>
              </div>
            ))}
            <p className="mt-4 text-sm font-semibold text-foreground">Reply Rate by Sequence</p>
            {seqs.map(s => (
              <div key={s.id} className="flex items-center gap-3">
                <span className="w-32 truncate text-xs text-muted-foreground">{s.name}</span>
                <div className="flex-1 h-5 rounded-sm bg-muted">
                  <div className="h-5 rounded-sm bg-success flex items-center px-2" style={{ width: `${s.reply}%` }}>
                    <span className="text-[10px] font-medium text-success-foreground">{s.reply}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
