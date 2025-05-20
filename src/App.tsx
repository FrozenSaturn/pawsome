
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PawBuddy from "./components/PawBuddy";
import Index from "./pages/Index";
import NetworkPage from "./pages/NetworkPage";
import AdoptPage from "./pages/AdoptPage";
import VolunteerPage from "./pages/VolunteerPage";
import StoriesPage from "./pages/StoriesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1">
      {children}
    </main>
    <Footer />
    <PawBuddy />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/network" 
            element={<Layout><NetworkPage /></Layout>} 
          />
          <Route 
            path="/adopt" 
            element={<Layout><AdoptPage /></Layout>} 
          />
          <Route 
            path="/volunteer" 
            element={<Layout><VolunteerPage /></Layout>} 
          />
          <Route 
            path="/stories" 
            element={<Layout><StoriesPage /></Layout>} 
          />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
