
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import About from "./pages/About";
import Creators from "./pages/Creators";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import AuthCallback from "./pages/AuthCallback";
import DashboardHome from "./pages/dashboard/DashboardHome";
import SupportersPage from "./pages/dashboard/SupportersPage";
import PayoutsPage from "./pages/dashboard/PayoutsPage";
import ButtonsGraphicsPage from "./pages/dashboard/ButtonsGraphicsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import CreatorPage from "./pages/CreatorPage";
import EditCreatorPage from "./pages/EditCreatorPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/creators" element={<Creators />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/login" element={<Navigate to="/auth" replace />} />
              <Route path="/signup" element={<Navigate to="/auth?tab=register" replace />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              
              {/* Creator Page Routes */}
              <Route path="/creator/:username" element={<CreatorPage />} />
              <Route path="/creator/:username/edit" element={<EditCreatorPage />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route path="/dashboard/supporters" element={<SupportersPage />} />
              <Route path="/dashboard/payouts" element={<PayoutsPage />} />
              <Route path="/dashboard/buttons-graphics" element={<ButtonsGraphicsPage />} />
              <Route path="/dashboard/settings" element={<SettingsPage />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
