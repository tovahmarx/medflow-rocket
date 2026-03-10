import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { AvatarCircle } from '@/components/shared/AvatarCircle';
import { cn } from '@/lib/utils';
import { Play, CheckCircle, Clock, Upload } from 'lucide-react';
import { BottomSheet } from '@/components/shared/BottomSheet';
import { useAuth } from '@/contexts/AuthContext';

const modules = [
  { id: 1, title: 'Product Overview', duration: '12 min', required: true, completion: { u2: 'complete', u3: 'complete', u4: 'in_progress', u5: 'complete' } },
  { id: 2, title: 'HIPAA & Compliance', duration: '18 min', required: true, completion: { u2: 'complete', u3: 'complete', u4: 'complete', u5: 'complete' } },
  { id: 3, title: 'Softphone Training', duration: '8 min', required: true, completion: { u2: 'complete', u3: 'in_progress', u4: 'not_started', u5: 'complete' } },
  { id: 4, title: 'Lead Capture', duration: '6 min', required: true, completion: { u2: 'complete', u3: 'complete', u4: 'not_started', u5: 'complete' } },
  { id: 5, title: 'Objection Handling', duration: '14 min', required: false, completion: { u2: 'in_progress', u3: 'not_started', u4: 'not_started', u5: 'complete' } },
  { id: 6, title: 'GPO Sales Strategy', duration: '20 min', required: false, completion: { u2: 'not_started', u3: 'not_started', u4: 'not_started', u5: 'in_progress' } },
];

const tabs = ['Modules', 'Live Sessions'];

type CompletionStatus = 'complete' | 'in_progress' | 'not_started';

export default function TrainingHub({ isRepView = false }: { isRepView?: boolean }) {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const { user } = useAuth();

  const repId = (user?.id || 'u2') as keyof typeof modules[0]['completion'];

  if (selectedModule !== null) {
    const mod = modules.find(m => m.id === selectedModule)!;
    return (
      <>
        <TopBar title={mod.title} />
        <div className="p-4 space-y-4">
          <button onClick={() => setSelectedModule(null)} className="text-xs text-primary tap-target">← Back</button>
          <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
            <Play className="h-12 w-12 text-muted-foreground" />
          </div>
          <p className="text-sm font-semibold text-foreground">{mod.title}</p>
          <p className="text-xs text-muted-foreground">{mod.duration} · {mod.required ? 'Required' : 'Optional'}</p>
          <p className="text-sm text-foreground">This module covers the essential knowledge for {mod.title.toLowerCase()}. Complete the video and quiz to earn your certification badge.</p>
          <button className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground tap-target">
            Mark Complete
          </button>
        </div>
      </>
    );
  }

  const statusIcon = (s: CompletionStatus) =>
    s === 'complete' ? <CheckCircle className="h-4 w-4 text-success" /> :
    s === 'in_progress' ? <Clock className="h-4 w-4 text-warning" /> :
    <div className="h-4 w-4 rounded-full border-2 border-muted" />;

  const completedCount = isRepView
    ? modules.filter(m => m.completion[repId] === 'complete').length
    : 0;

  return (
    <>
      <TopBar title="Training" />
      <div className="space-y-4 p-4">
        {isRepView && (
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{completedCount}/{modules.length} complete</p>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-20 rounded-full bg-muted">
                <div className="h-1.5 rounded-full bg-primary" style={{ width: `${(completedCount / modules.length) * 100}%` }} />
              </div>
              <span className="text-xs text-muted-foreground">{Math.round((completedCount / modules.length) * 100)}%</span>
            </div>
          </div>
        )}

        <div className="flex gap-1 rounded-lg bg-muted p-1">
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setActiveTab(i)}
              className={cn('flex-1 rounded-md py-2 text-xs font-medium tap-target', i === activeTab ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground')}>
              {t}
            </button>
          ))}
        </div>

        {activeTab === 0 && (
          <div className="space-y-2">
            {!isRepView && (
              <button onClick={() => setShowUpload(true)} className="w-full rounded-lg border border-dashed py-3 text-sm font-medium text-muted-foreground tap-target">
                <Upload className="mr-1 inline h-4 w-4" /> Upload New Module
              </button>
            )}
            {modules.map(m => (
              <div key={m.id} onClick={() => setSelectedModule(m.id)}
                className="flex items-center gap-3 rounded-lg border bg-card p-3 cursor-pointer active:bg-muted/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Play className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{m.title}</p>
                  <p className="text-xs text-muted-foreground">{m.duration}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge variant={m.required ? 'danger' : 'neutral'}>
                    {m.required ? 'Required' : 'Optional'}
                  </StatusBadge>
                  {isRepView && statusIcon(m.completion[repId] as CompletionStatus)}
                </div>
              </div>
            ))}

            {isRepView && (
              <div className="mt-4 flex flex-wrap gap-2">
                <StatusBadge variant="success">HIPAA Certified ✓</StatusBadge>
                <StatusBadge variant="success">Product Expert ✓</StatusBadge>
              </div>
            )}
          </div>
        )}

        {activeTab === 1 && (
          <div className="space-y-3">
            <div className="rounded-lg border bg-card p-4">
              <p className="text-sm font-semibold text-foreground">Training Session</p>
              <p className="text-xs text-muted-foreground">Wednesday 2:00 PM · Kelly M.</p>
              <button className="mt-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground tap-target">Join</button>
            </div>
            {!isRepView && (
              <button className="w-full rounded-lg border py-3 text-sm font-medium text-foreground tap-target">Schedule Training</button>
            )}
          </div>
        )}
      </div>

      <BottomSheet open={showUpload} onClose={() => setShowUpload(false)} title="Upload Module">
        <div className="space-y-3">
          {['Title', 'Description', 'Duration'].map(f => (
            <div key={f}>
              <label className="text-xs font-medium text-muted-foreground">{f}</label>
              <input className="mt-0.5 w-full rounded-lg border bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder={f} />
            </div>
          ))}
          <button className="w-full rounded-lg border py-2 text-sm font-medium text-foreground tap-target">Upload Video</button>
          <label className="flex items-center gap-2 text-xs"><input type="checkbox" className="rounded" /> Required</label>
          <button onClick={() => setShowUpload(false)} className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground tap-target">Save Module</button>
        </div>
      </BottomSheet>
    </>
  );
}
