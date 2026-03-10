import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { AIInsightCard } from '@/components/shared/AIInsightCard';
import { npiDatabase } from '@/data/mock-data';
import { Search, Star, Mic, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = ['Contact', 'Practice', 'Interest', 'Notes'];

export default function LeadCapture() {
  const [step, setStep] = useState(0);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<typeof npiDatabase[0] | null>(null);
  const [interest, setInterest] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const results = query.length >= 2 ? npiDatabase.filter(n =>
    n.name.toLowerCase().includes(query.toLowerCase()) ||
    n.npi.includes(query)
  ) : [];

  if (submitted) {
    return (
      <>
        <TopBar title="Lead Capture" />
        <div className="flex flex-col items-center justify-center p-8">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <Check className="h-8 w-8 text-success" />
          </div>
          <p className="text-lg font-semibold text-foreground">Lead Submitted!</p>
          <AIInsightCard className="mt-4">
            Score: 82/100 — Hot lead. Urology matches core product. 5-star interest. Using competitor. Recommend Fast Track sequence.
          </AIInsightCard>
          <button onClick={() => { setSubmitted(false); setStep(0); setSelected(null); setInterest(0); setQuery(''); }} className="mt-6 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground tap-target">
            Capture Another
          </button>
          <p className="mt-3 text-xs text-muted-foreground">7 leads captured today</p>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar title="Lead Capture" />
      <div className="p-4">
        {/* Progress */}
        <div className="mb-6 flex gap-1">
          {steps.map((s, i) => (
            <div key={s} className="flex-1">
              <div className={cn('h-1 rounded-full', i <= step ? 'bg-primary' : 'bg-muted')} />
              <p className={cn('mt-1 text-center text-[10px]', i <= step ? 'font-medium text-primary' : 'text-muted-foreground')}>{s}</p>
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search doctor by name, city, or NPI..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            {results.length > 0 && (
              <div className="space-y-2">
                {results.map(r => (
                  <div key={r.npi} onClick={() => { setSelected(r); setStep(1); }}
                    className="rounded-lg border bg-card p-3 active:bg-muted/50 cursor-pointer">
                    <p className="text-sm font-medium text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.specialty} · {r.city}, {r.state} · NPI {r.npi}</p>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => setStep(1)} className="text-xs text-primary">Not found? Enter manually →</button>
          </div>
        )}

        {step === 1 && selected && (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Verify Practice Info</p>
            {[
              { label: 'Name', value: selected.name },
              { label: 'Specialty', value: selected.specialty },
              { label: 'Practice', value: selected.practice },
              { label: 'City', value: `${selected.city}, ${selected.state}` },
              { label: 'NPI', value: selected.npi },
            ].map(f => (
              <div key={f.label}>
                <label className="text-xs font-medium text-muted-foreground">{f.label}</label>
                <input value={f.value} readOnly className="mt-0.5 w-full rounded-lg border bg-card px-3 py-2 text-sm text-foreground" />
              </div>
            ))}
            <div>
              <label className="text-xs font-medium text-muted-foreground">Practice Size</label>
              <div className="mt-1 flex flex-wrap gap-2">
                {['Solo', '2-5', '6-15', 'Hospital', 'Surgery Center'].map(s => (
                  <button key={s} className="rounded-full border px-3 py-1.5 text-xs font-medium tap-target active:bg-primary active:text-primary-foreground">{s}</button>
                ))}
              </div>
            </div>
            <button onClick={() => setStep(2)} className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground tap-target">Next</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Interest Level</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <button key={s} onClick={() => setInterest(s)} className="tap-target">
                    <Star className={cn('h-10 w-10', s <= interest ? 'fill-warning text-warning' : 'text-muted')} />
                  </button>
                ))}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{interest === 0 ? '' : interest <= 2 ? 'Cold Lead' : interest <= 3 ? 'Warm Lead' : 'Hot Lead'}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Current Product</p>
              <div className="flex flex-wrap gap-2">
                {['None', 'Competitor A', 'Competitor B', 'Our Product', 'Multiple'].map(p => (
                  <button key={p} className="rounded-full border px-3 py-1.5 text-xs font-medium tap-target active:bg-primary active:text-primary-foreground">{p}</button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {['Wants Demo', 'Wants Sample', 'Wants Follow-up'].map(f => (
                <label key={f} className="flex items-center gap-2 text-xs"><input type="checkbox" className="rounded" />{f}</label>
              ))}
            </div>
            <button onClick={() => setStep(3)} className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground tap-target">Next</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <textarea placeholder="Add notes..." className="flex-1 rounded-lg border bg-card p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" rows={4} />
            </div>
            <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm text-foreground tap-target">
              <Mic className="h-4 w-4" /> Voice Note
            </button>
            {selected && (
              <div className="rounded-lg border bg-card p-3">
                <p className="text-xs font-medium text-muted-foreground mb-1">Review</p>
                <p className="text-sm font-medium text-foreground">{selected.name}</p>
                <p className="text-xs text-muted-foreground">{selected.specialty} · {selected.practice} · NPI {selected.npi}</p>
                <p className="text-xs text-muted-foreground mt-1">Interest: {'★'.repeat(interest)}{'☆'.repeat(5 - interest)}</p>
              </div>
            )}
            <button onClick={() => setSubmitted(true)} className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground tap-target">Submit Lead</button>
          </div>
        )}
      </div>
    </>
  );
}
