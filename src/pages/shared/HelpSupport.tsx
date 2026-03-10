import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { ChevronDown, ChevronUp, MessageSquare, Bug, Mail } from 'lucide-react';
import { useTour } from '@/contexts/TourContext';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/data/mock-data';

const faqsByRole: Record<UserRole, { q: string; a: string }[]> = {
  admin: [
    { q: 'How do I add a new doctor?', a: 'Go to Doctors → tap the + button. Use NPI search to auto-fill doctor details, then assign a rep and set the cadence tier.' },
    { q: 'How does the cadence system work?', a: 'Each doctor tier has a contact frequency rule (e.g., Top = 14 days). The CadenceRing turns amber at 80% and red at 100% of the interval.' },
    { q: 'How are commission tiers calculated?', a: 'Tier 1 (8%) applies to $0–$20K, Tier 2 (10%) to $20K–$50K, and Tier 3 (13%) to $50K+. All tiers are configurable in Settings.' },
    { q: 'What triggers an approval request?', a: 'Deals over $100K, discounts above 5%, expenses over $50, and new content uploads all require admin approval.' },
    { q: 'Can I export compliance data?', a: 'Yes. Go to Compliance → CMS Export to download all Sunshine Act entries in the required CMS format.' },
    { q: 'How do I restart the onboarding tour?', a: 'Go to Settings → Onboarding Tour → Restart, or tap the button below.' },
  ],
  rep: [
    { q: 'How do I log a visit?', a: 'Go to My Contacts → select a doctor → tap "Log Visit" to record your call details and next steps.' },
    { q: 'How does AI lead scoring work?', a: 'Leads are scored based on NPI specialty match, conference engagement, interest rating, and historical conversion data for similar profiles.' },
    { q: 'How are my commissions calculated?', a: 'Tier 1 (8%) applies to $0–$20K, Tier 2 (10%) to $20K–$50K, and Tier 3 (13%) to $50K+. Check the Commission page for your current earnings.' },
    { q: 'How do I submit an expense?', a: 'Go to Expense Tracker → tap + to add a new expense. Attach a receipt photo and it will be sent for admin approval.' },
    { q: 'How do I restart the onboarding tour?', a: 'Go to Settings → Onboarding Tour → Restart, or tap the button below.' },
  ],
  doctor: [
    { q: 'How do I place an order?', a: 'Go to Order → browse or search products → add items to your cart → review and submit your order.' },
    { q: 'How do I track my order?', a: 'Go to History to see all past and pending orders with real-time status updates.' },
    { q: 'How do I contact my rep?', a: 'Go to My Rep to see your assigned representative\'s contact details and send them a message.' },
    { q: 'Where can I find product training materials?', a: 'Go to Learn to access product guides, videos, and educational resources curated by your rep.' },
    { q: 'How do I update my profile?', a: 'Contact your sales representative to update your account details and preferences.' },
  ],
};

export default function HelpSupport() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'bug'>('faq');
  const [submitted, setSubmitted] = useState(false);
  const { startTour } = useTour();
  const { role } = useAuth();
  const faqs = faqsByRole[role ?? 'doctor'];

  const tabs = [
    { id: 'faq' as const, label: 'FAQ', icon: MessageSquare },
    { id: 'contact' as const, label: 'Contact', icon: Mail },
    { id: 'bug' as const, label: 'Bug Report', icon: Bug },
  ];

  return (
    <>
      <TopBar title="Help & Support" />
      <div className="p-4 space-y-4">
        {/* Tab bar */}
        <div className="flex rounded-lg border bg-card p-1">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => { setActiveTab(t.id); setSubmitted(false); }}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-xs font-medium tap-target ${activeTab === t.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
            >
              <t.icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'faq' && (
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-lg border bg-card">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-4 tap-target"
                >
                  <p className="text-sm font-medium text-foreground text-left pr-2">{faq.q}</p>
                  {openFaq === i ? <ChevronUp className="h-4 w-4 flex-shrink-0 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 flex-shrink-0 text-muted-foreground" />}
                </button>
                {openFaq === i && (
                  <div className="border-t px-4 pb-4 pt-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={startTour}
              className="w-full rounded-lg border bg-card py-3 text-sm font-medium text-primary tap-target"
            >
              Restart Onboarding Tour
            </button>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-3">
            {submitted ? (
              <div className="rounded-lg border bg-card p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                  <Mail className="h-6 w-6 text-success" />
                </div>
                <p className="text-sm font-semibold text-foreground">Message sent!</p>
                <p className="mt-1 text-xs text-muted-foreground">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <input placeholder="Subject" className="w-full rounded-lg border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                <textarea rows={5} placeholder="How can we help?" className="w-full rounded-lg border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                <button onClick={() => setSubmitted(true)} className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground tap-target">
                  Send Message
                </button>
              </>
            )}
          </div>
        )}

        {activeTab === 'bug' && (
          <div className="space-y-3">
            {submitted ? (
              <div className="rounded-lg border bg-card p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                  <Bug className="h-6 w-6 text-success" />
                </div>
                <p className="text-sm font-semibold text-foreground">Bug reported!</p>
                <p className="mt-1 text-xs text-muted-foreground">Our team has been notified. Ticket #BUG-0042.</p>
              </div>
            ) : (
              <>
                <input placeholder="What happened?" className="w-full rounded-lg border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                <textarea rows={4} placeholder="Steps to reproduce..." className="w-full rounded-lg border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                <select className="w-full rounded-lg border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Severity: Low</option>
                  <option>Severity: Medium</option>
                  <option>Severity: High</option>
                  <option>Severity: Critical</option>
                </select>
                <button onClick={() => setSubmitted(true)} className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground tap-target">
                  Submit Bug Report
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
