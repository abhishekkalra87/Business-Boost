import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ConsultationProvider } from "@/context/consultation-context";
import { BookConsultationModal } from "@/components/BookConsultationModal";
import NotFound from "@/pages/not-found";

// Layout components
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/widgets/WhatsAppButton";
import { ChatbotWidget } from "@/components/widgets/ChatbotWidget";

// Pages
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import Industries from "@/pages/industries";
import Careers from "@/pages/careers";
import Contact from "@/pages/contact";
import AdminContacts from "@/pages/admin";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/admin/:token/contacts" component={AdminContacts} />
      <Route>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 flex flex-col">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/services" component={Services} />
              <Route path="/industries" component={Industries} />
              <Route path="/careers" component={Careers} />
              <Route path="/contact" component={Contact} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
          <WhatsAppButton />
          <ChatbotWidget />
          <BookConsultationModal />
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="nexora-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ConsultationProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </ConsultationProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
