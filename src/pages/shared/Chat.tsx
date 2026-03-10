import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { AvatarCircle } from '@/components/shared/AvatarCircle';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const adminThreads = [
  { id: 'u2', name: 'Clint M.', initials: 'CM', lastMsg: "Got it, I'll send the quote today", time: '9:14 AM', unread: 0 },
  { id: 'u3', name: 'Sara L.', initials: 'SL', lastMsg: 'Can you approve the Webb discount?', time: '8:30 AM', unread: 1 },
  { id: 'u4', name: 'James R.', initials: 'JR', lastMsg: 'Running behind on calls this week', time: 'Yesterday', unread: 0 },
  { id: 'u5', name: 'Priya N.', initials: 'PN', lastMsg: "St. Luke's deal closing Friday", time: 'Yesterday', unread: 0 },
];

const chatMessages: Record<string, { from: string; text: string; time: string }[]> = {
  u2: [
    { from: 'u1', text: 'How did the Osei call go?', time: '9:00 AM' },
    { from: 'u2', text: "Great! She's interested in bulk pricing. I'll send a quote.", time: '9:10 AM' },
    { from: 'u1', text: 'Perfect, keep me posted.', time: '9:12 AM' },
    { from: 'u2', text: "Got it, I'll send the quote today", time: '9:14 AM' },
  ],
  u3: [
    { from: 'u3', text: "Kelly, Dr. Webb wants 10% off a bulk order. Can you approve?", time: '8:28 AM' },
    { from: 'u1', text: "What's the order total?", time: '8:29 AM' },
    { from: 'u3', text: '$2,400. She said she\'d commit to quarterly auto-reorder.', time: '8:30 AM' },
  ],
};

export default function Chat({ isRepView = false }: { isRepView?: boolean }) {
  const { user } = useAuth();
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Rep view: single thread with Kelly
  const threads = isRepView
    ? [{ id: 'u1', name: 'Kelly M.', initials: 'KM', lastMsg: 'Perfect, keep me posted.', time: '9:12 AM', unread: 0 }]
    : adminThreads;

  const messages = selectedThread ? (chatMessages[selectedThread] || chatMessages.u2 || []) : [];

  if (selectedThread) {
    const thread = threads.find(t => t.id === selectedThread)!;
    const myId = user?.id || 'u1';
    return (
      <>
        <TopBar title={thread.name} />
        <div className="flex flex-col" style={{ height: 'calc(100vh - 120px)' }}>
          <button onClick={() => setSelectedThread(null)} className="px-4 py-2 text-xs text-primary tap-target text-left">← Back</button>
          <div className="flex-1 overflow-y-auto space-y-2 px-4 pb-4">
            {messages.map((m, i) => {
              const isMe = m.from === myId || (isRepView && m.from === user?.id);
              return (
                <div key={i} className={cn('flex', isMe ? 'justify-end' : 'justify-start')}>
                  <div className={cn(
                    'max-w-[80%] rounded-2xl px-3 py-2',
                    isMe ? 'rounded-br-sm bg-primary/10' : 'rounded-bl-sm bg-muted'
                  )}>
                    <p className="text-sm text-foreground">{m.text}</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">{m.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-t p-3 flex items-center gap-2">
            <input
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-xl border bg-card px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
            />
            <button className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground tap-target">Send</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar title="Chat" />
      <div className="space-y-2 p-4">
        {threads.map(t => (
          <div key={t.id} onClick={() => setSelectedThread(t.id)}
            className="flex items-center gap-3 rounded-lg border bg-card p-3 tap-target cursor-pointer active:bg-muted/50">
            <AvatarCircle initials={t.initials} size="md" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <span className="text-[10px] text-muted-foreground">{t.time}</span>
              </div>
              <p className="truncate text-xs text-muted-foreground">{t.lastMsg}</p>
            </div>
            {t.unread > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{t.unread}</span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
