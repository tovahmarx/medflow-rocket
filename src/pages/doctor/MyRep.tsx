import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { AvatarCircle } from '@/components/shared/AvatarCircle';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { useAuth } from '@/contexts/AuthContext';
import { doctorAccounts, users } from '@/data/mock-data';
import { Phone, Mail, Video, Star, Check } from 'lucide-react';

export default function MyRep() {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const myAccount = doctorAccounts.find(d => d.userId === user?.id);
  const rep = myAccount ? users.find(u => u.id === myAccount.assignedRep) : null;

  return (
    <>
      <TopBar title="My Rep" />
      <div className="space-y-4 p-4">
        {rep && (
        <div className="rounded-lg border bg-card p-4 text-center">
          <AvatarCircle initials={rep.initials} size="lg" className="mx-auto" />
          <p className="mt-2 text-base font-semibold text-foreground">{rep.name}</p>
          <p className="text-xs text-muted-foreground">Sales Rep · {rep.territory}</p>
          <div className="mt-4 flex gap-2">
            <button className="flex flex-1 items-center justify-center gap-1 rounded-lg border py-2.5 text-xs font-medium text-foreground tap-target">
              <Phone className="h-4 w-4" /> Call
            </button>
            <button className="flex flex-1 items-center justify-center gap-1 rounded-lg border py-2.5 text-xs font-medium text-foreground tap-target">
              <Mail className="h-4 w-4" /> Email
            </button>
            <button className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-primary py-2.5 text-xs font-medium text-primary-foreground tap-target">
              <Video className="h-4 w-4" /> Video
            </button>
          </div>
        </div>
        )}

        {/* Product Feedback */}
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm font-semibold text-foreground">Product Feedback</p>
          <p className="mt-1 text-xs text-muted-foreground">How is MedGlide Pro working?</p>
          <div className="mt-2 flex gap-1">
            {[1, 2, 3, 4, 5].map(s => (
              <button key={s} onClick={() => setRating(s)} className="tap-target">
                <Star className={`h-8 w-8 ${s <= rating ? 'fill-warning text-warning' : 'text-muted'}`} />
              </button>
            ))}
          </div>
          <textarea placeholder="Add a comment..." className="mt-2 w-full rounded-lg border bg-card p-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" rows={2} />
          <button onClick={() => setFeedbackSent(true)} className="mt-2 rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground tap-target">
            {feedbackSent ? '✓ Submitted' : 'Submit'}
          </button>
          <div className="mt-3 rounded-lg bg-muted p-2">
            <p className="text-xs text-muted-foreground">Mar 1: ★★★★★ "Excellent quality. Staff prefers single-use for efficiency."</p>
          </div>
        </div>

        {/* Document Signing */}
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm font-semibold text-foreground">Documents</p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm text-foreground">HIPAA BAA</p>
            <StatusBadge variant="success"><Check className="mr-0.5 h-3 w-3" /> Signed Mar 2023</StatusBadge>
          </div>
        </div>

        {/* Usage Analytics */}
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm font-semibold text-foreground">Your Usage</p>
          <div className="mt-3 flex items-end gap-2" style={{ height: 80 }}>
            {[
              { month: 'Jan', val: 576 },
              { month: 'Feb', val: 952 },
              { month: 'Mar', val: 1152 },
            ].map(d => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground">${d.val}</span>
                <div className="w-full rounded-t-sm bg-primary" style={{ height: `${(d.val / 1200) * 100}%` }} />
                <span className="text-[10px] text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1 text-xs text-muted-foreground">
            <p>Order frequency: Every 21 days</p>
            <p>You order 18% more frequently than similar practices</p>
          </div>
        </div>
      </div>
    </>
  );
}
