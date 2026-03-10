import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { FilterBar } from '@/components/shared/FilterBar';
import { ListRow } from '@/components/shared/ListRow';
import { AvatarCircle } from '@/components/shared/AvatarCircle';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { commEntries } from '@/data/mock-data';
import { Phone, MessageSquare, Mail, Video, Presentation } from 'lucide-react';

const filters = ['All', 'Calls', 'Texts', 'Emails', 'Video', 'Presentations'];
const typeIcons: Record<string, React.ReactNode> = {
  call: <Phone className="h-4 w-4" />,
  text: <MessageSquare className="h-4 w-4" />,
  email: <Mail className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  presentation: <Presentation className="h-4 w-4" />,
};

const filterMap: Record<string, string> = {
  Calls: 'call', Texts: 'text', Emails: 'email', Video: 'video', Presentations: 'presentation',
};

export default function CommsCenter() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = commEntries.filter(e => {
    if (activeFilter === 'All') return true;
    return e.type === filterMap[activeFilter];
  });

  return (
    <>
      <TopBar title="Comms Center" />
      <div className="space-y-3 p-4">
        <FilterBar filters={filters} active={activeFilter} onSelect={setActiveFilter} />

        <div className="space-y-2">
          {filtered.map(e => (
            <ListRow
              key={e.id}
              avatar={<AvatarCircle initials={e.repName.split(' ').map(w => w[0]).join('')} size="sm" />}
              primary={`${e.repName} → ${e.target}`}
              secondary={e.message || `${e.type} · ${e.duration || ''}`}
              right={
                <div className="flex flex-col items-end gap-1">
                  {e.isLive ? (
                    <StatusBadge variant="success" dot>LIVE</StatusBadge>
                  ) : e.outcomeBadge ? (
                    <StatusBadge variant={e.outcomeBadge === 'Ordered' ? 'success' : e.outcomeBadge === 'Interested' ? 'info' : e.outcomeBadge === 'Voicemail' ? 'offline' : 'neutral'}>
                      {e.outcomeBadge}
                    </StatusBadge>
                  ) : null}
                  <span className="text-[10px] text-muted-foreground">{e.time}</span>
                </div>
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}
