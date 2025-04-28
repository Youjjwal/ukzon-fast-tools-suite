
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/context/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MergePDF from "./pages/tools/pdf/Merge";
import SplitPDF from "./pages/tools/pdf/Split";
import ImageTools from "./pages/tools/image/Index";
import ResizeImage from "./pages/tools/image/Resize";
import CompressImage from "./pages/tools/image/Compress";
import CompressVideo from "./pages/tools/video/Compress";
import QRGenerator from "./pages/tools/utils/QRGenerator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/tools/pdf/merge" element={<MergePDF />} />
                <Route path="/tools/pdf/split" element={<SplitPDF />} />
                <Route path="/tools/image" element={<ImageTools />} />
                <Route path="/tools/image/resize" element={<ResizeImage />} />
                <Route path="/tools/image/compress" element={<CompressImage />} />
                <Route path="/tools/video/compress" element={<CompressVideo />} />
                <Route path="/tools/utils/qr-generator" element={<QRGenerator />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
