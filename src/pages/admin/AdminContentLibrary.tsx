import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { FilterBar } from '@/components/shared/FilterBar';
import { cn } from '@/lib/utils';
import { Upload, Presentation, FileText, Video, BookOpen } from 'lucide-react';
import { BottomSheet } from '@/components/shared/BottomSheet';

const content = [
  { id: 1, title: 'Product Overview Deck', type: 'Presentation', status: 'Approved', version: 'v3', updated: 'Mar 5' },
  { id: 2, title: 'Urology Clinical Study', type: 'Clinical Study', status: 'Approved', version: 'v1', updated: 'Feb 20' },
  { id: 3, title: 'Pricing Comparison', type: 'One-Pager', status: 'Approved', version: 'v2', updated: 'Mar 1' },
  { id: 4, title: 'Q1 Results Webinar', type: 'Video', status: 'Draft', version: 'v1', updated: 'Mar 8' },
  { id: 5, title: 'ISO 13485 Certificate', type: 'Product Sheet', status: 'Approved', version: 'v1', updated: 'Jan 15' },
  { id: 6, title: 'MedGlide Comparison', type: 'Presentation', status: 'Expired', version: 'v1', updated: 'Dec 1' },
];

const tabs = ['All Content', 'Pending Review', 'Analytics'];

const analytics = [
  { title: 'Product Overview Deck', presented: 47, avgDuration: '11 min', slides: '7.2/8', engagement: '78%' },
  { title: 'Urology Clinical Study', presented: 12, avgDuration: '6 min', slides: '4/5', engagement: '82%' },
  { title: 'Pricing Comparison', presented: 31, avgDuration: '3 min', slides: '1/1', engagement: '91%' },
];

export default function AdminContentLibrary() {
  const [activeTab, setActiveTab] = useState(0);
  const [showUpload, setShowUpload] = useState(false);

  const typeIcon = (t: string) =>
    t === 'Presentation' ? <Presentation className="h-5 w-5 text-muted-foreground" /> :
    t === 'Video' ? <Video className="h-5 w-5 text-muted-foreground" /> :
    t === 'Clinical Study' ? <BookOpen className="h-5 w-5 text-muted-foreground" /> :
    <FileText className="h-5 w-5 text-muted-foreground" />;

  return (
    <>
      <TopBar title="Content Library" />
      <div className="space-y-4 p-4">
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
            <button onClick={() => setShowUpload(true)} className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground tap-target">
              <Upload className="mr-1 inline h-4 w-4" /> Upload Content
            </button>
            {content.map(c => (
              <div key={c.id} className="flex items-center gap-3 rounded-lg border bg-card p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">{typeIcon(c.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.type} · {c.version} · {c.updated}</p>
                </div>
                <StatusBadge variant={c.status === 'Approved' ? 'success' : c.status === 'Draft' ? 'warning' : 'danger'}>
                  {c.status}
                </StatusBadge>
              </div>
            ))}
          </div>
        )}

        {activeTab === 1 && (
          <div className="space-y-2">
            {content.filter(c => c.status === 'Draft').map(c => (
              <div key={c.id} className="rounded-lg border bg-card p-4">
                <p className="text-sm font-medium text-foreground">{c.title}</p>
                <p className="text-xs text-muted-foreground">{c.type} · {c.version}</p>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 rounded-md bg-primary py-2 text-xs font-medium text-primary-foreground tap-target">Approve</button>
                  <button className="flex-1 rounded-md border py-2 text-xs font-medium text-foreground tap-target">Reject</button>
                </div>
              </div>
            ))}
            {content.filter(c => c.status === 'Draft').length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">No pending reviews</p>
            )}
          </div>
        )}

        {activeTab === 2 && (
          <div className="space-y-3">
            {analytics.map(a => (
              <div key={a.title} className="rounded-lg border bg-card p-4">
                <p className="text-sm font-semibold text-foreground">{a.title}</p>
                <div className="mt-2 grid grid-cols-4 gap-2 text-center">
                  <div><p className="text-lg font-bold text-foreground">{a.presented}</p><p className="text-[10px] text-muted-foreground">Presented</p></div>
                  <div><p className="text-lg font-bold text-foreground">{a.avgDuration}</p><p className="text-[10px] text-muted-foreground">Avg Duration</p></div>
                  <div><p className="text-lg font-bold text-foreground">{a.slides}</p><p className="text-[10px] text-muted-foreground">Avg Slides</p></div>
                  <div><p className="text-lg font-bold text-foreground">{a.engagement}</p><p className="text-[10px] text-muted-foreground">Engagement</p></div>
                </div>
              </div>
            ))}
            <div className="rounded-lg border border-success/20 bg-success/5 p-3">
              <p className="text-xs text-foreground">Slide 4 (pricing comparison) has 92% view rate. Slide 7 (technical specs) skipped 60% of the time.</p>
            </div>
            <button className="w-full rounded-lg border py-3 text-sm font-medium text-foreground tap-target">Export CLM Report</button>
          </div>
        )}
      </div>

      <BottomSheet open={showUpload} onClose={() => setShowUpload(false)} title="Upload Content">
        <div className="space-y-3">
          {['Title', 'Expiry Date'].map(f => (
            <div key={f}>
              <label className="text-xs font-medium text-muted-foreground">{f}</label>
              <input className="mt-0.5 w-full rounded-lg border bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder={f} />
            </div>
          ))}
          <div>
            <label className="text-xs font-medium text-muted-foreground">Type</label>
            <select className="mt-0.5 w-full rounded-lg border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Presentation</option><option>One-Pager</option><option>Clinical Study</option><option>Product Sheet</option><option>Video</option>
            </select>
          </div>
          <button className="w-full rounded-lg border py-2 text-sm font-medium text-foreground tap-target">Choose File</button>
          <button onClick={() => setShowUpload(false)} className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground tap-target">Upload</button>
        </div>
      </BottomSheet>
    </>
  );
}
