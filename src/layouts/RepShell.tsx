import { Outlet } from 'react-router-dom';
import { BottomTabBar } from '@/components/layout/BottomTabBar';
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';
import { AnimatedOutlet } from '@/components/layout/AnimatedOutlet';
import {
  CheckSquare, Radio, Crosshair, TrendingUp, Users, DollarSign, Trophy,
  Calendar, Receipt, FileText, Library, GraduationCap, MessageSquare,
  MapPin, BookOpen, Settings
} from 'lucide-react';

const tabs = [
  { label: 'Tasks', path: '/rep', icon: CheckSquare },
  { label: 'Comms', path: '/rep/comms', icon: Radio },
  { label: 'Capture', path: '/rep/capture', icon: Crosshair },
  { label: 'Pipeline', path: '/rep/pipeline', icon: TrendingUp },
];

const moreItems = [
  { label: 'Contacts', path: '/rep/contacts', icon: Users },
  { label: 'Commission', path: '/rep/commission', icon: DollarSign },
  { label: 'Leaderboard', path: '/rep/leaderboard', icon: Trophy },
  { label: 'Calendar', path: '/rep/calendar', icon: Calendar },
  { label: 'Expenses', path: '/rep/expenses', icon: Receipt },
  { label: 'Quotes', path: '/rep/quotes', icon: FileText },
  { label: 'Content', path: '/rep/content', icon: Library },
  { label: 'Training', path: '/rep/training', icon: GraduationCap },
  { label: 'Chat', path: '/rep/chat', icon: MessageSquare },
  { label: 'Route', path: '/rep/route', icon: MapPin },
  { label: 'Objections', path: '/rep/objections', icon: BookOpen },
  { label: 'Settings', path: '/rep/settings', icon: Settings },
];

export default function RepShell() {
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
