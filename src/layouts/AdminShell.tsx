import { Outlet } from 'react-router-dom';
import { BottomTabBar } from '@/components/layout/BottomTabBar';
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';
import { AnimatedOutlet } from '@/components/layout/AnimatedOutlet';
import {
  LayoutDashboard, Users, Radio, ShieldCheck, UserPlus, Map, Calendar,
  Package, CreditCard, FlaskConical, Scale, ClipboardList, FileText,
  Library, MessageSquare, Send, ScrollText, Trophy, Target, Settings, GraduationCap
} from 'lucide-react';

const tabs = [
  { label: 'Command', path: '/admin', icon: LayoutDashboard },
  { label: 'Reps', path: '/admin/reps', icon: Users },
  { label: 'Comms', path: '/admin/comms', icon: Radio },
  { label: 'Approvals', path: '/admin/approvals', icon: ShieldCheck },
];

const moreItems = [
  { label: 'Doctors', path: '/admin/doctors', icon: UserPlus },
  { label: 'Pipeline', path: '/admin/pipeline', icon: ClipboardList },
  { label: 'Sequences', path: '/admin/sequences', icon: Send },
  { label: 'Territory', path: '/admin/territory', icon: Map },
  { label: 'Calendar', path: '/admin/calendar', icon: Calendar },
  { label: 'Inventory', path: '/admin/inventory', icon: Package },
  { label: 'Billing', path: '/admin/billing', icon: CreditCard },
  { label: 'Samples', path: '/admin/samples', icon: FlaskConical },
  { label: 'Compliance', path: '/admin/compliance', icon: Scale },
  { label: 'Onboarding', path: '/admin/onboarding', icon: UserPlus },
  { label: 'Training', path: '/admin/training', icon: GraduationCap },
  { label: 'Reports', path: '/admin/reports', icon: FileText },
  { label: 'Content', path: '/admin/content', icon: Library },
  { label: 'Chat', path: '/admin/chat', icon: MessageSquare },
  { label: 'Invitations', path: '/admin/invitations', icon: Send },
  { label: 'Audit Log', path: '/admin/audit', icon: ScrollText },
  { label: 'Goals', path: '/admin/goals', icon: Target },
  { label: 'Leaderboard', path: '/admin/leaderboard', icon: Trophy },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminShell() {
  return (
    <div className="flex min-h-screen w-full">
      <DesktopSidebar tabs={tabs} moreItems={moreItems} />
      <div className="flex flex-1 flex-col pb-16 md:pb-0 md:min-w-0">
        <AnimatedOutlet />
      </div>
      <BottomTabBar tabs={tabs} moreItems={moreItems} />
    </div>
  );
}
