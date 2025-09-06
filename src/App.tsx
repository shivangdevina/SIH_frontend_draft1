import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import DashboardLayout from "./components/DashboardLayout";
import FertilizerGuide from "./components/FertilizerGuide";
import IrrigationPlanner from "./components/IrrigationPlanner";
import WeatherForecast from "./components/WeatherForecast";
import PestIdentification from "./components/PestIdentification";
import CropRecommendations from "./components/CropRecommendations";
import ChatPage from "./components/ChatPage";
import MarketAnalyst from "./components/MarketAnalyst";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="fertilizer-guide" element={<FertilizerGuide />} />
            <Route path="irrigation-planner" element={<IrrigationPlanner />} />
            <Route path="weather-forecast" element={<WeatherForecast />} />
            <Route path="pest-expert" element={<PestIdentification />} />
            <Route path="crop-advisor" element={<CropRecommendations />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="market-analyst" element={<MarketAnalyst />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
