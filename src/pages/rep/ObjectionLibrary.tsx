import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

const categories = [
  {
    name: 'Price',
    objections: [
      {
        question: "It's too expensive.",
        responses: [
          { style: 'Empathetic', text: "I understand budget is a concern — let me show you the per-procedure savings that practices like yours typically see with MedGlide." },
          { style: 'Direct', text: "Our price includes sterile packaging and single-use convenience that competitors charge extra for." },
          { style: 'Data', text: "Practices that switched to MedGlide saved an average of 18% per procedure when factoring in waste reduction and time savings." },
        ],
      },
    ],
  },
  {
    name: 'Competitor',
    objections: [
      {
        question: "We already use [Competitor] and it works fine.",
        responses: [
          { style: 'Empathetic', text: "That makes sense — switching can feel risky. Would you be open to a side-by-side trial so your team can compare?" },
          { style: 'Direct', text: "MedGlide has 40% better lubricity in independent testing. Here's the clinical data." },
          { style: 'Data', text: "78% of practices that trialed MedGlide alongside their current product chose to switch within 30 days." },
        ],
      },
    ],
  },
  { name: 'Current Satisfaction', objections: [{ question: "We're happy with what we have.", responses: [{ style: 'Empathetic', text: "That's great to hear. Would it be worth seeing if there are areas where MedGlide could complement your current setup?" }, { style: 'Direct', text: "Many satisfied users found unexpected improvements in efficiency after trying our single-use line." }, { style: 'Data', text: "92% of practices report improved workflow efficiency within the first month of using MedGlide." }] }] },
  { name: 'Budget', objections: [{ question: "We don't have budget for this right now.", responses: [{ style: 'Empathetic', text: "Totally understand. Can I send some info so you have it when budget opens up?" }, { style: 'Direct', text: "Our bulk pricing and auto-reorder discounts often fit within existing supply budgets." }, { style: 'Data', text: "The average practice saves $2,400/year switching to MedGlide's auto-reorder program." }] }] },
  { name: 'Timing', objections: [{ question: "Now isn't a good time.", responses: [{ style: 'Empathetic', text: "No problem at all. When would be a better time for me to follow up?" }, { style: 'Direct', text: "We're running a Q1 pricing promotion that ends March 31 — might be worth a quick look." }, { style: 'Data', text: "Practices that onboard in Q1 typically see ROI by Q2." }] }] },
  { name: 'Need Info', objections: [{ question: "I need to see more data.", responses: [{ style: 'Empathetic', text: "Absolutely — I'll send our latest clinical study and a comparison sheet right away." }, { style: 'Direct', text: "Here's our ISO 13485 certification and the urology clinical study results." }, { style: 'Data', text: "Published in 3 peer-reviewed journals with a 95% satisfaction rate across 500+ practices." }] }] },
  { name: 'Decision Maker', objections: [{ question: "I'm not the one who makes purchasing decisions.", responses: [{ style: 'Empathetic', text: "Understood — would you be able to connect me with the right person, or would it help if I prepared materials for them?" }, { style: 'Direct', text: "I can put together an ROI summary specifically for your office manager or procurement team." }, { style: 'Data', text: "We provide a ready-made cost analysis that 85% of office managers approve within one meeting." }] }] },
];

export default function ObjectionLibrary() {
  const [selected, setSelected] = useState<string | null>(null);

  const category = categories.find(c => c.name === selected);

  if (category) {
    return (
      <>
        <TopBar title="Objections" />
        <div className="p-4">
          <button onClick={() => setSelected(null)} className="mb-3 text-xs text-primary tap-target">← Back</button>
          <h2 className="text-base font-semibold text-foreground mb-4">{category.name}</h2>
          {category.objections.map((obj, i) => (
            <div key={i} className="mb-4">
              <p className="text-sm font-medium text-foreground mb-3">"{obj.question}"</p>
              <div className="space-y-2">
                {obj.responses.map(r => (
                  <div key={r.style} className="rounded-lg border bg-card p-3">
                    <p className="text-xs font-semibold text-primary mb-1">{r.style}</p>
                    <p className="text-sm text-foreground">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button className="w-full rounded-lg border py-3 text-sm font-medium text-foreground tap-target">
            Personalize for Dr. ___
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar title="Objections" />
      <div className="space-y-2 p-4">
        <p className="text-xs text-muted-foreground mb-2">7 categories · tap to view responses</p>
        {categories.map(c => (
          <button
            key={c.name}
            onClick={() => setSelected(c.name)}
            className="flex w-full items-center justify-between rounded-lg border bg-card p-4 tap-target active:bg-muted/50"
          >
            <div>
              <p className="text-sm font-medium text-foreground">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.objections.length} objection{c.objections.length > 1 ? 's' : ''}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </>
  );
}
