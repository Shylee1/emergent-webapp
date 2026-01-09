import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import LandingPage from "@/pages/LandingPage";
import AboutPage from "@/pages/AboutPage";
import PricingPage from "@/pages/PricingPage";
import NewsPage from "@/pages/NewsPage";
import InvestorPage from "@/pages/InvestorPage";
import ContactPage from "@/pages/ContactPage";
import NotFoundPage from "@/pages/NotFoundPage";

function App() {
  return (
    <div className="App" data-testid="app-root">
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/investor" element={<InvestorPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
