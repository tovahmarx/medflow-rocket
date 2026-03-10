import { Outlet } from 'react-router-dom';
import { BottomTabBar } from '@/components/layout/BottomTabBar';
import { DesktopSidebar } from '@/components/layout/DesktopSidebar';
import { Home, ShoppingCart, ClipboardList, BookOpen, UserCheck } from 'lucide-react';

const tabs = [
  { label: 'Home', path: '/doctor', icon: Home },
  { label: 'Order', path: '/doctor/order', icon: ShoppingCart },
  { label: 'History', path: '/doctor/history', icon: ClipboardList },
  { label: 'Learn', path: '/doctor/learn', icon: BookOpen },
  { label: 'My Rep', path: '/doctor/my-rep', icon: UserCheck },
];

export default function DoctorShell() {
  return (
    <div className="flex min-h-screen w-full">
      <DesktopSidebar tabs={tabs} moreItems={[]} />
      <div className="flex flex-1 flex-col pb-16 md:pb-0">
        <Outlet />
      </div>
      <BottomTabBar tabs={tabs} moreItems={[]} />
    </div>
  );
}
