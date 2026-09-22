import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { ProgressProvider } from "@/context/ProgressContext";
import FavoritesPage from "@/pages/FavoritesPage";
import GameModePage from "@/pages/GameModePage";
import GuidePage from "@/pages/GuidePage";
import Index from "@/pages/Index";
import MapPage from "@/pages/MapPage";
import NotFound from "@/pages/NotFound";
import ProgressPage from "@/pages/ProgressPage";
import SearchPage from "@/pages/SearchPage";
import SolversPage from "@/pages/SolversPage";
import StepDetailPage from "@/pages/StepDetailPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ProgressProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/guia" element={<GuidePage />} />
              <Route path="/guia/:stepId" element={<StepDetailPage />} />
              <Route path="/partida" element={<GameModePage />} />
              <Route path="/partida/:stepId" element={<GameModePage />} />
              <Route path="/mapa" element={<MapPage />} />
              <Route path="/solvers" element={<SolversPage />} />
              <Route path="/progreso" element={<ProgressPage />} />
              <Route path="/buscar" element={<SearchPage />} />
              <Route path="/favoritos" element={<FavoritesPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProgressProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
