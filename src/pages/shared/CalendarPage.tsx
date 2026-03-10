import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { BottomSheet } from '@/components/shared/BottomSheet';

const eventColors: Record<string, string> = {
  Call: 'bg-success/10 border-l-4 border-l-success',
  Visit: 'bg-info/10 border-l-4 border-l-info',
  'Video Demo': 'bg-offline/10 border-l-4 border-l-offline',
  'Follow-up': 'bg-warning/10 border-l-4 border-l-warning',
  Meeting: 'bg-muted border-l-4 border-l-muted-foreground',
  Presentation: 'bg-pink-50 border-l-4 border-l-pink-400',
  Training: 'bg-teal-50 border-l-4 border-l-teal-400',
};

const weekEvents = [
  { day: 'Mon', events: [{ time: '9:00 AM', title: 'Call Dr. Osei', type: 'Call', rep: 'Clint' }, { time: '1:00 PM', title: 'Visit Dr. Webb', type: 'Visit', rep: 'Clint' }] },
  { day: 'Tue', events: [{ time: '10:00 AM', title: 'Video Demo Dr. Park', type: 'Video Demo', rep: 'Priya' }] },
  { day: 'Wed', events: [{ time: '2:00 PM', title: 'Training Session', type: 'Training', rep: 'Kelly' }] },
  { day: 'Thu', events: [{ time: '11:00 AM', title: 'Presentation Tampa Surgery', type: 'Presentation', rep: 'Clint' }] },
  { day: 'Fri', events: [{ time: '9:00 AM', title: "Follow-up St. Luke's", type: 'Follow-up', rep: 'Clint' }] },
  { day: 'Sat', events: [] },
  { day: 'Sun', events: [] },
];

const views = ['Day', 'Week', 'Month'];

export default function CalendarPage() {
  const [view, setView] = useState('Week');
  const [showCreate, setShowCreate] = useState(false);

  return (
    <>
      <TopBar title="Calendar" />
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="tap-target p-1"><ChevronLeft className="h-5 w-5 text-muted-foreground" /></button>
            <p className="text-sm font-semibold text-foreground">March 10 – 16, 2026</p>
            <button className="tap-target p-1"><ChevronRight className="h-5 w-5 text-muted-foreground" /></button>
          </div>
          <button onClick={() => setShowCreate(true)} className="flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground tap-target">
            <Plus className="h-4 w-4" /> Event
          </button>
        </div>

        <div className="flex gap-1 rounded-lg bg-muted p-1">
          {views.map(v => (
            <button key={v} onClick={() => setView(v)}
              className={cn('flex-1 rounded-md py-1.5 text-xs font-medium tap-target', v === view ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground')}>
              {v}
            </button>
          ))}
        </div>

        {/* Color legend */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(eventColors).map(([type, cls]) => (
            <span key={type} className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <span className={cn('h-2 w-2 rounded-sm', cls.includes('success') ? 'bg-success' : cls.includes('info') ? 'bg-info' : cls.includes('offline') ? 'bg-offline' : cls.includes('warning') ? 'bg-warning' : cls.includes('pink') ? 'bg-pink-400' : cls.includes('teal') ? 'bg-teal-400' : 'bg-muted-foreground')} />
              {type}
            </span>
          ))}
        </div>

        {/* Week view */}
        <div className="space-y-3">
          {weekEvents.map(day => (
            <div key={day.day}>
              <p className="mb-1 text-xs font-semibold text-muted-foreground">{day.day}</p>
              {day.events.length === 0 ? (
                <p className="text-xs text-muted-foreground/50 pl-2">No events</p>
              ) : (
                <div className="space-y-1">
                  {day.events.map((e, i) => (
                    <div key={i} className={cn('rounded-lg p-3', eventColors[e.type] || 'bg-muted')}>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground">{e.title}</p>
                        <span className="text-[10px] text-muted-foreground">{e.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{e.rep} · {e.type}</p>
                      {e.type === 'Video Demo' && (
                        <button className="mt-1 rounded-md bg-primary px-2 py-1 text-[10px] font-medium text-primary-foreground tap-target">Join</button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <BottomSheet open={showCreate} onClose={() => setShowCreate(false)} title="Create Event">
        <div className="space-y-3">
          {['Title', 'Type', 'Doctor (NPI Search)', 'Rep', 'Date', 'Time', 'Location', 'Notes'].map(f => (
            <div key={f}>
              <label className="text-xs font-medium text-muted-foreground">{f}</label>
              <input className="mt-0.5 w-full rounded-lg border bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder={f} />
            </div>
          ))}
          <button onClick={() => setShowCreate(false)} className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground tap-target">Create Event</button>
        </div>
      </BottomSheet>
    </>
  );
}
