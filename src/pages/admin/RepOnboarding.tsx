import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { cn } from '@/lib/utils';

const steps = ['Rep Info', 'Territory', 'Sequences', 'Commission', 'Training', 'Launch'];

const regions = ['Southeast', 'Northeast', 'Midwest', 'West', 'Central', 'Southwest'];
const specialties = ['Urology', 'Dermatology', 'OB/GYN', 'Surgery', 'Internal Medicine', 'Orthopedics'];
const sequences = ['Urologist — Cold Intro', 'OB/GYN — Warm Lead', 'Competitor Switchover', 'Hot Lead — Fast Track', 'Hospital / Surgery Center'];
const trainingModules = [
  { title: 'Product Overview', duration: '12 min', required: true },
  { title: 'HIPAA & Compliance', duration: '18 min', required: true },
  { title: 'Softphone Training', duration: '8 min', required: true },
  { title: 'Lead Capture', duration: '6 min', required: true },
  { title: 'Objection Handling', duration: '14 min', required: false },
  { title: 'GPO Sales Strategy', duration: '20 min', required: false },
];

const commissionPlans = [
  { name: 'Standard', desc: '8% / 10% / 13%', tiers: [{ range: '$25K', earn: '$2,000' }, { range: '$50K', earn: '$5,000' }, { range: '$75K', earn: '$9,750' }, { range: '$100K', earn: '$13,000' }] },
  { name: 'Flat', desc: '10% flat', tiers: [{ range: '$25K', earn: '$2,500' }, { range: '$50K', earn: '$5,000' }, { range: '$75K', earn: '$7,500' }, { range: '$100K', earn: '$10,000' }] },
  { name: 'Accelerated', desc: '6% / 12% / 18%', tiers: [{ range: '$25K', earn: '$1,500' }, { range: '$50K', earn: '$6,000' }, { range: '$75K', earn: '$13,500' }, { range: '$100K', earn: '$18,000' }] },
];

export default function RepOnboarding() {
  const [step, setStep] = useState(0);
  const [commPlan, setCommPlan] = useState(0);
  const [launched, setLaunched] = useState(false);

  if (launched) {
    return (
      <>
        <TopBar title="Onboarding" />
        <div className="flex flex-col items-center justify-center p-8">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <span className="text-2xl">🚀</span>
          </div>
          <p className="text-lg font-semibold text-foreground">Rep Launched!</p>
          <p className="mt-1 text-sm text-muted-foreground">New rep account has been created and onboarding emails sent.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar title="Onboard New Rep" />
      <div className="p-4">
        {/* Progress */}
        <div className="mb-6 flex gap-0.5">
          {steps.map((s, i) => (
            <div key={s} className="flex-1">
              <div className={cn('h-1 rounded-full', i <= step ? 'bg-primary' : 'bg-muted')} />
              <p className={cn('mt-1 text-center text-[9px]', i <= step ? 'font-medium text-primary' : 'text-muted-foreground')}>{s}</p>
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="space-y-3">
            {['First Name', 'Last Name', 'Email', 'Phone', 'Start Date'].map(f => (
              <div key={f}>
                <label className="text-xs font-medium text-muted-foreground">{f}</label>
                <input className="mt-0.5 w-full rounded-lg border bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder={f} />
              </div>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Region</p>
              <div className="grid grid-cols-3 gap-2">
                {regions.map(r => (
                  <button key={r} className="rounded-lg border px-3 py-2 text-xs font-medium tap-target active:bg-primary active:text-primary-foreground">{r}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Specialties</p>
              <div className="space-y-1">
                {specialties.map(s => (
                  <label key={s} className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" />{s}</label>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground mb-2">Enable sequences</p>
            {sequences.map(s => (
              <label key={s} className="flex items-center justify-between rounded-lg border bg-card p-3">
                <span className="text-sm text-foreground">{s}</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </label>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            {commissionPlans.map((p, i) => (
              <div key={p.name} onClick={() => setCommPlan(i)}
                className={cn('rounded-lg border bg-card p-4 cursor-pointer', i === commPlan && 'border-primary ring-2 ring-primary/20')}>
                <p className="text-sm font-semibold text-foreground">{p.name} — {p.desc}</p>
                <div className="mt-2 grid grid-cols-4 gap-2 text-center">
                  {p.tiers.map(t => (
                    <div key={t.range}>
                      <p className="text-[10px] text-muted-foreground">{t.range}</p>
                      <p className="text-xs font-semibold text-foreground">{t.earn}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-2">
            {trainingModules.map(m => (
              <label key={m.title} className="flex items-center justify-between rounded-lg border bg-card p-3">
                <div>
                  <p className="text-sm text-foreground">{m.title}</p>
                  <p className="text-xs text-muted-foreground">{m.duration}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn('text-[10px] font-medium', m.required ? 'text-destructive' : 'text-muted-foreground')}>
                    {m.required ? 'Required' : 'Optional'}
                  </span>
                  <input type="checkbox" defaultChecked={m.required} className="rounded" />
                </div>
              </label>
            ))}
          </div>
        )}

        {step === 5 && (
          <div className="rounded-lg border bg-card p-4 space-y-2">
            <p className="text-sm font-semibold text-foreground">Review Summary</p>
            <p className="text-xs text-muted-foreground">Rep: [New Rep Name]</p>
            <p className="text-xs text-muted-foreground">Territory: Southeast</p>
            <p className="text-xs text-muted-foreground">Commission: {commissionPlans[commPlan].name}</p>
            <p className="text-xs text-muted-foreground">Sequences: 5 enabled</p>
            <p className="text-xs text-muted-foreground">Training: 6 modules assigned</p>
          </div>
        )}

        <div className="mt-6 flex gap-2">
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} className="flex-1 rounded-lg border py-3 text-sm font-medium text-foreground tap-target">Back</button>
          )}
          {step < 5 ? (
            <button onClick={() => setStep(s => s + 1)} className="flex-1 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground tap-target">Next</button>
          ) : (
            <button onClick={() => setLaunched(true)} className="flex-1 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground tap-target">🚀 Launch Rep</button>
          )}
        </div>
      </div>
    </>
  );
}
