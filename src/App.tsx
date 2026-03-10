import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoginPage from "@/pages/LoginPage";
import AdminShell from "@/layouts/AdminShell";
import RepShell from "@/layouts/RepShell";
import DoctorShell from "@/layouts/DoctorShell";
import CommandCenter from "@/pages/admin/CommandCenter";
import SalesReps from "@/pages/admin/SalesReps";
import DoctorAccounts from "@/pages/admin/DoctorAccounts";
import CommsCenter from "@/pages/admin/CommsCenter";
import Approvals from "@/pages/admin/Approvals";
import MyTasks from "@/pages/rep/MyTasks";
import CommsHub from "@/pages/rep/CommsHub";
import LeadCapture from "@/pages/rep/LeadCapture";
import MyPipeline from "@/pages/rep/MyPipeline";
import DoctorHome from "@/pages/doctor/DoctorHome";
import OrderProducts from "@/pages/doctor/OrderProducts";
import OrderHistory from "@/pages/doctor/OrderHistory";
import Learn from "@/pages/doctor/Learn";
import MyRep from "@/pages/doctor/MyRep";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function PlaceholderPage({ title }: { title: string }) {
  const { TopBar } = require("@/components/layout/TopBar");
  return (
    <>
      <TopBar title={title} />
      <div className="flex items-center justify-center p-8">
        <p className="text-sm text-muted-foreground">{title} — coming soon</p>
      </div>
    </>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold text-foreground">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Coming soon</p>
    </div>
  );
}

function AuthenticatedRoutes() {
  const { user, role, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <LoginPage />;

  const homeRedirect = role === 'admin' ? '/admin' : role === 'rep' ? '/rep' : '/doctor';

  return (
    <Routes>
      <Route path="/" element={<Navigate to={homeRedirect} replace />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminShell />}>
        <Route index element={<CommandCenter />} />
        <Route path="reps" element={<SalesReps />} />
        <Route path="doctors" element={<DoctorAccounts />} />
        <Route path="comms" element={<CommsCenter />} />
        <Route path="approvals" element={<Approvals />} />
        <Route path="pipeline" element={<Placeholder title="Pipeline" />} />
        <Route path="sequences" element={<Placeholder title="Email Sequences" />} />
        <Route path="territory" element={<Placeholder title="Territory Map" />} />
        <Route path="calendar" element={<Placeholder title="Calendar" />} />
        <Route path="inventory" element={<Placeholder title="Inventory" />} />
        <Route path="billing" element={<Placeholder title="Billing" />} />
        <Route path="samples" element={<Placeholder title="Sample Lots" />} />
        <Route path="compliance" element={<Placeholder title="Compliance" />} />
        <Route path="onboarding" element={<Placeholder title="Rep Onboarding" />} />
        <Route path="training" element={<Placeholder title="Training" />} />
        <Route path="reports" element={<Placeholder title="Reports" />} />
        <Route path="content" element={<Placeholder title="Content Library" />} />
        <Route path="chat" element={<Placeholder title="Chat" />} />
        <Route path="invitations" element={<Placeholder title="Invitations" />} />
        <Route path="audit" element={<Placeholder title="Audit Log" />} />
        <Route path="goals" element={<Placeholder title="Goals" />} />
        <Route path="leaderboard" element={<Placeholder title="Leaderboard" />} />
        <Route path="settings" element={<Placeholder title="Settings" />} />
      </Route>

      {/* Rep Routes */}
      <Route path="/rep" element={<RepShell />}>
        <Route index element={<MyTasks />} />
        <Route path="comms" element={<CommsHub />} />
        <Route path="capture" element={<LeadCapture />} />
        <Route path="pipeline" element={<MyPipeline />} />
        <Route path="contacts" element={<Placeholder title="My Contacts" />} />
        <Route path="commission" element={<Placeholder title="Commission" />} />
        <Route path="leaderboard" element={<Placeholder title="Leaderboard" />} />
        <Route path="calendar" element={<Placeholder title="Calendar" />} />
        <Route path="expenses" element={<Placeholder title="Expenses" />} />
        <Route path="quotes" element={<Placeholder title="Quotes" />} />
        <Route path="content" element={<Placeholder title="Content Library" />} />
        <Route path="training" element={<Placeholder title="Training" />} />
        <Route path="chat" element={<Placeholder title="Chat" />} />
        <Route path="route" element={<Placeholder title="Route Planner" />} />
        <Route path="objections" element={<Placeholder title="Objections" />} />
        <Route path="settings" element={<Placeholder title="Settings" />} />
      </Route>

      {/* Doctor Routes */}
      <Route path="/doctor" element={<DoctorShell />}>
        <Route index element={<DoctorHome />} />
        <Route path="order" element={<OrderProducts />} />
        <Route path="history" element={<OrderHistory />} />
        <Route path="learn" element={<Learn />} />
        <Route path="my-rep" element={<MyRep />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AuthenticatedRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
