import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { cn } from '@/lib/utils';
import { Phone, MessageSquare, Mail, Video, Mic, Delete } from 'lucide-react';

const subTabs = [
  { label: 'Phone', icon: Phone },
  { label: 'Text', icon: MessageSquare },
  { label: 'Email', icon: Mail },
  { label: 'Video', icon: Video },
];

function DialPad() {
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
        <p className="text-lg font-semibold text-foreground">Calling Dr. Osei...</p>
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
        {['Dr. Osei', 'Dr. Park', 'Dr. Webb'].map(n => (
          <button key={n} className="whitespace-nowrap rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground tap-target">{n}</button>
        ))}
      </div>
    </div>
  );
}

function TextTab() {
  const threads = [
    { name: 'Dr. Osei', last: 'Yes please, we\'re running low', time: '9:31 AM', unread: 1 },
    { name: 'Dr. Park', last: 'Works for me.', time: 'Yesterday', unread: 0 },
    { name: 'Dr. Cruz', last: 'Wanted to check in', time: '2 days ago', unread: 0 },
  ];
  const [selected, setSelected] = useState<string | null>(null);

  if (selected === 'Dr. Osei') {
    return (
      <div className="flex flex-col h-[60vh]">
        <button onClick={() => setSelected(null)} className="mb-2 text-xs text-primary tap-target">← Back</button>
        <div className="flex-1 space-y-2 overflow-y-auto">
          <div className="flex justify-start"><div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-sm">Yes please, we're running low</div></div>
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

function EmailTab() {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {['Inbox', 'Sent', 'Compose'].map(t => (
          <button key={t} className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground tap-target first:bg-primary first:text-primary-foreground">{t}</button>
        ))}
      </div>
      {[
        { from: 'Dr. Osei', subject: 'Re: Pricing for bulk order', preview: 'Hi Clint, thanks for...', time: 'Today', unread: true },
        { from: 'Dr. Park', subject: 'Re: Thursday call', preview: 'Confirmed, talk then.', time: 'Yesterday', unread: false },
      ].map(e => (
        <div key={e.subject} className="rounded-lg border bg-card p-3 active:bg-muted/50">
          <div className="flex items-center justify-between">
            <p className={cn('text-sm', e.unread ? 'font-semibold text-foreground' : 'text-muted-foreground')}>{e.from}</p>
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
        <p className="mt-1 text-xs text-muted-foreground">Video Demo with Dr. Park — Thu 2:00 PM</p>
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

        {activeTab === 0 && <DialPad />}
        {activeTab === 1 && <TextTab />}
        {activeTab === 2 && <EmailTab />}
        {activeTab === 3 && <VideoTab />}
      </div>
    </>
  );
}
