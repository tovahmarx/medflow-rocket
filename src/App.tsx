import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { TourProvider } from "@/contexts/TourContext";
import { TourOverlay } from "@/components/shared/TourOverlay";
import LoginPage from "@/pages/LoginPage";
import AdminShell from "@/layouts/AdminShell";
import RepShell from "@/layouts/RepShell";
import DoctorShell from "@/layouts/DoctorShell";
// Admin
import CommandCenter from "@/pages/admin/CommandCenter";
import SalesReps from "@/pages/admin/SalesReps";
import DoctorAccounts from "@/pages/admin/DoctorAccounts";
import CommsCenter from "@/pages/admin/CommsCenter";
import Approvals from "@/pages/admin/Approvals";
import InventoryTracker from "@/pages/admin/InventoryTracker";
import Billing from "@/pages/admin/Billing";
import Compliance from "@/pages/admin/Compliance";
import SampleLots from "@/pages/admin/SampleLots";
import EmailSequences from "@/pages/admin/EmailSequences";
import GoalTracking from "@/pages/admin/GoalTracking";
import TerritoryMap from "@/pages/admin/TerritoryMap";
import RepOnboarding from "@/pages/admin/RepOnboarding";
import Invitations from "@/pages/admin/Invitations";
import AuditLog from "@/pages/admin/AuditLog";
import Reports from "@/pages/admin/Reports";
import AdminContentLibrary from "@/pages/admin/AdminContentLibrary";
import AdminPipeline from "@/pages/admin/AdminPipeline";
import Settings from "@/pages/admin/Settings";
// Rep
import MyTasks from "@/pages/rep/MyTasks";
import CommsHub from "@/pages/rep/CommsHub";
import LeadCapture from "@/pages/rep/LeadCapture";
import MyPipeline from "@/pages/rep/MyPipeline";
import Commission from "@/pages/rep/Commission";
import RoutePlanner from "@/pages/rep/RoutePlanner";
import QuoteBuilder from "@/pages/rep/QuoteBuilder";
import ExpenseTracker from "@/pages/rep/ExpenseTracker";
import ContentLibrary from "@/pages/rep/ContentLibrary";
import MyContacts from "@/pages/rep/MyContacts";
import ObjectionLibrary from "@/pages/rep/ObjectionLibrary";
// Doctor
import DoctorHome from "@/pages/doctor/DoctorHome";
import OrderProducts from "@/pages/doctor/OrderProducts";
import OrderHistory from "@/pages/doctor/OrderHistory";
import Learn from "@/pages/doctor/Learn";
import MyRep from "@/pages/doctor/MyRep";
// Shared
import Leaderboard from "@/pages/shared/Leaderboard";
import CalendarPage from "@/pages/shared/CalendarPage";
import Chat from "@/pages/shared/Chat";
import TrainingHub from "@/pages/shared/TrainingHub";
import HelpSupport from "@/pages/shared/HelpSupport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AuthenticatedRoutes() {
  const { role, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <LoginPage />;

  const homeRedirect = role === 'admin' ? '/admin' : role === 'rep' ? '/rep' : '/doctor';

  return (
    <>
      <TourOverlay />
      <Routes>
        <Route path="/" element={<Navigate to={homeRedirect} replace />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminShell />}>
          <Route index element={<CommandCenter />} />
          <Route path="reps" element={<SalesReps />} />
          <Route path="doctors" element={<DoctorAccounts />} />
          <Route path="comms" element={<CommsCenter />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="pipeline" element={<AdminPipeline />} />
          <Route path="sequences" element={<EmailSequences />} />
          <Route path="territory" element={<TerritoryMap />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="inventory" element={<InventoryTracker />} />
          <Route path="billing" element={<Billing />} />
          <Route path="samples" element={<SampleLots />} />
          <Route path="compliance" element={<Compliance />} />
          <Route path="onboarding" element={<RepOnboarding />} />
          <Route path="training" element={<TrainingHub />} />
          <Route path="reports" element={<Reports />} />
          <Route path="content" element={<AdminContentLibrary />} />
          <Route path="chat" element={<Chat />} />
          <Route path="invitations" element={<Invitations />} />
          <Route path="audit" element={<AuditLog />} />
          <Route path="goals" element={<GoalTracking />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<HelpSupport />} />
        </Route>

        {/* Rep Routes */}
        <Route path="/rep" element={<RepShell />}>
          <Route index element={<MyTasks />} />
          <Route path="comms" element={<CommsHub />} />
          <Route path="capture" element={<LeadCapture />} />
          <Route path="pipeline" element={<MyPipeline />} />
          <Route path="contacts" element={<MyContacts />} />
          <Route path="commission" element={<Commission />} />
          <Route path="leaderboard" element={<Leaderboard isRepView />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="expenses" element={<ExpenseTracker />} />
          <Route path="quotes" element={<QuoteBuilder />} />
          <Route path="content" element={<ContentLibrary />} />
          <Route path="training" element={<TrainingHub isRepView />} />
          <Route path="chat" element={<Chat isRepView />} />
          <Route path="route" element={<RoutePlanner />} />
          <Route path="objections" element={<ObjectionLibrary />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<HelpSupport />} />
        </Route>

        {/* Doctor Routes */}
        <Route path="/doctor" element={<DoctorShell />}>
          <Route index element={<DoctorHome />} />
          <Route path="order" element={<OrderProducts />} />
          <Route path="history" element={<OrderHistory />} />
          <Route path="learn" element={<Learn />} />
          <Route path="my-rep" element={<MyRep />} />
          <Route path="help" element={<HelpSupport />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <TourProvider>
          <BrowserRouter>
            <AuthenticatedRoutes />
          </BrowserRouter>
        </TourProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
