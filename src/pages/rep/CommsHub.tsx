import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { cn } from '@/lib/utils';
import { Phone, MessageSquare, Mail, Video, Mic, Delete } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { commEntries, doctorAccounts, users } from '@/data/mock-data';

const subTabs = [
  { label: 'Phone', icon: Phone },
  { label: 'Text', icon: MessageSquare },
  { label: 'Email', icon: Mail },
  { label: 'Video', icon: Video },
];

function DialPad({ quickDial }: { quickDial: string[] }) {
  const [digits, setDigits] = useState('');
  const [callState, setCallState] = useState<'idle' | 'ringing' | 'connected' | 'ended'>('idle');
  const [timer, setTimer] = useState(0);

  const pad = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

  const startCall = () => {
    setCallState('ringing');
    setTimeout(() => {
      setCallState('connected');
      const interval = setInterval(() => setTimer(t => t + 1), 1000);
      setTimeout(() => { clearInterval(interval); }, 600000);
    }, 2000);
  };

  const endCall = () => {
    setCallState('ended');
    setTimer(0);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  if (callState === 'ringing') {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="mb-4 h-16 w-16 animate-pulse rounded-full bg-primary/20" />
        <p className="text-lg font-semibold text-foreground">Calling...</p>
        <button onClick={endCall} className="mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-destructive">
          <Phone className="h-6 w-6 text-primary-foreground" />
        </button>
      </div>
    );
  }

  if (callState === 'connected') {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-lg font-semibold text-foreground">Connected</p>
        <p className="mt-1 text-3xl font-bold text-primary">{formatTime(timer)}</p>
        <div className="mt-8 flex gap-4">
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-muted"><Mic className="h-5 w-5" /></button>
          <button onClick={endCall} className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive">
            <Phone className="h-6 w-6 text-primary-foreground" />
          </button>
        </div>
      </div>
    );
  }

  if (callState === 'ended') {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-lg font-semibold text-foreground">Call Ended</p>
        <div className="mt-6 w-full max-w-xs space-y-3">
          <p className="text-xs font-medium text-muted-foreground">Outcome</p>
          <div className="flex flex-wrap gap-2">
            {['Ordered', 'Interested', 'Follow-up', 'Voicemail', 'Not Interested'].map(o => (
              <button key={o} className="rounded-full border px-3 py-1.5 text-xs font-medium tap-target active:bg-primary active:text-primary-foreground">{o}</button>
            ))}
          </div>
          <textarea placeholder="Add notes..." className="w-full rounded-lg border bg-card p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" rows={3} />
          <button onClick={() => setCallState('idle')} className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground tap-target">Save & Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-4">
      <div className="mb-4 flex h-12 w-full max-w-xs items-center justify-between rounded-lg border bg-card px-4">
        <span className="text-xl font-medium tracking-wider text-foreground">{digits || 'Enter number'}</span>
        {digits && <button onClick={() => setDigits(d => d.slice(0, -1))} className="tap-target"><Delete className="h-5 w-5 text-muted-foreground" /></button>}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {pad.map(d => (
          <button key={d} onClick={() => setDigits(prev => prev + d)} className="flex h-16 w-16 items-center justify-center rounded-full border text-xl font-medium text-foreground tap-target active:bg-muted">
            {d}
          </button>
        ))}
      </div>
      <button onClick={startCall} className="mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary tap-target">
        <Phone className="h-7 w-7 text-primary-foreground" />
      </button>
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        {quickDial.map(n => (
          <button key={n} className="whitespace-nowrap rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground tap-target">{n}</button>
        ))}
      </div>
    </div>
  );
}

function TextTab({ repId }: { repId: string }) {
  // Get doctors assigned to this rep
  const myDoctorIds = doctorAccounts.filter(d => d.assignedRep === repId).map(d => d.userId);
  const myDoctors = users.filter(u => myDoctorIds.includes(u.id));

  const threads = myDoctors.slice(0, 3).map((d, i) => ({
    name: d.name,
    last: i === 0 ? "Yes please, we're running low" : i === 1 ? 'Works for me.' : 'Wanted to check in',
    time: i === 0 ? '9:31 AM' : i === 1 ? 'Yesterday' : '2 days ago',
    unread: i === 0 ? 1 : 0,
  }));

  const [selected, setSelected] = useState<string | null>(null);

  if (selected && threads.find(t => t.name === selected)) {
    return (
      <div className="flex flex-col h-[60vh]">
        <button onClick={() => setSelected(null)} className="mb-2 text-xs text-primary tap-target">← Back</button>
        <div className="flex-1 space-y-2 overflow-y-auto">
          <div className="flex justify-start"><div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-sm">{threads.find(t => t.name === selected)?.last}</div></div>
          <div className="flex justify-end"><div className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary/10 px-3 py-2 text-sm">On it — sending sheet now.</div></div>
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-xl border bg-card p-2 text-sm">
          <input className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground" placeholder="Type a message..." />
          <button className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground tap-target">Send</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {threads.map(t => (
        <div key={t.name} onClick={() => setSelected(t.name)} className="flex items-center gap-3 rounded-lg border bg-card p-3 tap-target active:bg-muted/50 cursor-pointer">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {t.name.split(' ').pop()?.[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">{t.name}</p>
              <span className="text-[10px] text-muted-foreground">{t.time}</span>
            </div>
            <p className="truncate text-xs text-muted-foreground">{t.last}</p>
          </div>
          {t.unread > 0 && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{t.unread}</span>}
        </div>
      ))}
    </div>
  );
}

function EmailTab({ repId }: { repId: string }) {
  const myDoctorIds = doctorAccounts.filter(d => d.assignedRep === repId).map(d => d.userId);
  const myDoctors = users.filter(u => myDoctorIds.includes(u.id));

  const allEmails = [
    ...myDoctors.slice(0, 1).map(d => ({ from: d.name, subject: 'Re: Pricing for bulk order', preview: 'Hi, thanks for sending that over. Can we schedule a call to discuss volume discounts?', time: 'Today', unread: true })),
    ...myDoctors.slice(1, 2).map(d => ({ from: d.name, subject: 'Re: Thursday call', preview: 'Confirmed, talk then. I have a few questions about the new line.', time: 'Today', unread: true })),
    ...myDoctors.slice(2, 3).map(d => ({ from: d.name, subject: 'Sample request — MedGlide Pro', preview: 'Would love to try the new MedGlide Pro in our next procedure. Can you send samples?', time: 'Yesterday', unread: false })),
    ...myDoctors.slice(0, 1).map(d => ({ from: d.name, subject: 'Re: Clinical trial data', preview: 'The results look promising. Let me share with my team and get back to you.', time: 'Yesterday', unread: false })),
    ...myDoctors.slice(3, 4).map(d => ({ from: d.name, subject: 'Invoice question', preview: 'Quick question about the last invoice — the PO number doesn\'t match our records.', time: '2 days ago', unread: false })),
    ...myDoctors.slice(1, 2).map(d => ({ from: d.name, subject: 'Re: Product training session', preview: 'My staff is available next Tuesday for the training. Does 10 AM work?', time: '3 days ago', unread: false })),
    ...myDoctors.slice(4, 5).map(d => ({ from: d.name || 'Dr. Contact', subject: 'Competitor pricing concern', preview: 'I got a quote from another vendor that\'s 15% lower. Can we discuss?', time: '4 days ago', unread: false })),
  ].filter(e => e.from);

  const sentEmails = [
    { to: myDoctors[0]?.name || 'Doctor', subject: 'MedGlide Pro — Updated Pricing', preview: 'Hi Doctor, as discussed, here is the updated pricing sheet for bulk orders...', time: 'Today' },
    { to: myDoctors[1]?.name || 'Doctor', subject: 'Follow-up: Training Session', preview: 'Thank you for your interest. I\'ve attached the training schedule...', time: 'Yesterday' },
    { to: myDoctors[2]?.name || 'Doctor', subject: 'Sample Shipment Confirmation', preview: 'Your samples have been shipped and should arrive by Thursday...', time: '2 days ago' },
  ];

  const [activeMailTab, setActiveMailTab] = useState('Inbox');
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
  const [composing, setComposing] = useState(false);

  if (composing) {
    return (
      <div className="space-y-3">
        <button onClick={() => setComposing(false)} className="text-xs text-primary tap-target">← Back</button>
        <div className="space-y-2">
          <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2">
            <span className="text-xs text-muted-foreground">To:</span>
            <input className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Select a contact..." />
          </div>
          <input className="w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none placeholder:text-muted-foreground" placeholder="Subject" />
          <textarea className="w-full rounded-lg border bg-card p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" rows={6} placeholder="Write your email..." />
          <div className="flex items-center gap-2">
            <button className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground tap-target">Send</button>
            <button className="rounded-lg border px-4 py-2.5 text-sm font-medium text-muted-foreground tap-target">Attach</button>
            <button className="rounded-lg border px-4 py-2.5 text-sm font-medium text-muted-foreground tap-target">Template</button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedEmail !== null && activeMailTab === 'Inbox') {
    const email = allEmails[selectedEmail];
    return (
      <div className="space-y-3">
        <button onClick={() => setSelectedEmail(null)} className="text-xs text-primary tap-target">← Back to Inbox</button>
        <div className="rounded-lg border bg-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">{email.from}</p>
            <span className="text-[10px] text-muted-foreground">{email.time}</span>
          </div>
          <p className="text-sm font-medium text-foreground">{email.subject}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{email.preview} We appreciate your partnership and look forward to continuing our collaboration on this.</p>
          <div className="flex gap-2 pt-2 border-t border-border">
            <button className="flex-1 rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground tap-target">Reply</button>
            <button className="rounded-lg border px-4 py-2 text-xs font-medium text-muted-foreground tap-target">Forward</button>
            <button className="rounded-lg border px-4 py-2 text-xs font-medium text-destructive tap-target">Archive</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {['Inbox', 'Sent', 'Compose'].map(t => (
          <button
            key={t}
            onClick={() => { if (t === 'Compose') { setComposing(true); } else { setActiveMailTab(t); setSelectedEmail(null); } }}
            className={cn('rounded-full px-3 py-1.5 text-xs font-medium tap-target transition-colors',
              (t === activeMailTab && t !== 'Compose') ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            )}
          >{t}</button>
        ))}
      </div>

      {activeMailTab === 'Inbox' && allEmails.map((e, i) => (
        <div key={i} onClick={() => setSelectedEmail(i)} className="rounded-lg border bg-card p-3 cursor-pointer active:bg-muted/50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {e.unread && <div className="h-2 w-2 rounded-full bg-primary" />}
              <p className={cn('text-sm', e.unread ? 'font-semibold text-foreground' : 'text-muted-foreground')}>{e.from}</p>
            </div>
            <span className="text-[10px] text-muted-foreground">{e.time}</span>
          </div>
          <p className="text-xs font-medium text-foreground">{e.subject}</p>
          <p className="truncate text-xs text-muted-foreground">{e.preview}</p>
        </div>
      ))}

      {activeMailTab === 'Sent' && sentEmails.map((e, i) => (
        <div key={i} className="rounded-lg border bg-card p-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">To: {e.to}</p>
            <span className="text-[10px] text-muted-foreground">{e.time}</span>
          </div>
          <p className="text-xs font-medium text-foreground">{e.subject}</p>
          <p className="truncate text-xs text-muted-foreground">{e.preview}</p>
        </div>
      ))}
    </div>
  );
}

function VideoTab() {
  return (
    <div className="space-y-4 py-4">
      <div className="rounded-lg border bg-card p-4">
        <p className="text-sm font-medium text-foreground">Upcoming</p>
        <p className="mt-1 text-xs text-muted-foreground">Video Demo — Thu 2:00 PM</p>
        <button className="mt-3 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground tap-target">Join Call</button>
      </div>
      <button className="w-full rounded-lg border bg-card p-4 text-sm font-medium text-foreground tap-target active:bg-muted/50">
        + Start Instant Call
      </button>
    </div>
  );
}

export default function CommsHub() {
  const [activeTab, setActiveTab] = useState(0);
  const { user } = useAuth();
  const repId = user?.id || '';

  // Quick dial: doctors assigned to this rep
  const myDoctorIds = doctorAccounts.filter(d => d.assignedRep === repId).map(d => d.userId);
  const quickDial = users.filter(u => myDoctorIds.includes(u.id)).map(u => u.name);

  return (
    <>
      <TopBar title="Comms Hub" />
      <div className="p-4">
        <div className="mb-4 flex gap-1 rounded-lg bg-muted p-1">
          {subTabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={cn(
                'flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-xs font-medium tap-target transition-colors',
                activeTab === i ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 0 && <DialPad quickDial={quickDial} />}
        {activeTab === 1 && <TextTab repId={repId} />}
        {activeTab === 2 && <EmailTab repId={repId} />}
        {activeTab === 3 && <VideoTab />}
      </div>
    </>
  );
}
