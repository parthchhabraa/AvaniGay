import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import CaseSelection from "./pages/CaseSelection";
import About from "./pages/About";
import DetectiveRecordPage from "./pages/DetectiveRecordPage";
import CaseLayout from "./pages/CaseLayout";
import CaseIntro from "./pages/CaseIntro";
import InvestigationDashboard from "./pages/InvestigationDashboard";
import ResultScreen from "./pages/ResultScreen";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function Shell() {
  return (
    <div className="min-h-screen bg-noir-900">
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/cases" element={<CaseSelection />} />
        <Route path="/about" element={<About />} />
        <Route path="/record" element={<DetectiveRecordPage />} />
        <Route path="/case/:caseId" element={<CaseLayout />}>
          <Route index element={<CaseIntro />} />
          <Route path="investigate" element={<InvestigationDashboard />} />
          <Route path="result" element={<ResultScreen />} />
        </Route>
        <Route
          path="*"
          element={
            <div className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center gap-4 px-6 text-center">
              <div className="stamp text-burgundy-400">404 — PAGE NOT FOUND</div>
              <p className="text-paper-300/70">This file doesn't exist in the archive.</p>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Shell />
    </BrowserRouter>
  );
}
