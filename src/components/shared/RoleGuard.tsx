import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/data/mock-data';

const homeByRole: Record<UserRole, string> = { admin: '/admin', rep: '/rep', doctor: '/doctor' };

export default function RoleGuard({ allowedRole }: { allowedRole: UserRole }) {
  const { role } = useAuth();
  if (role !== allowedRole) return <Navigate to={homeByRole[role!]} replace />;
  return <Outlet />;
}
