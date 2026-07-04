import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import IntroLoader from "./components/IntroLoader";

const WorkPage     = lazy(() => import("./pages/WorkPage"));
const AboutPage    = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIntroDone(false); // replay intro animation on every page change
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {!introDone && <IntroLoader key={location.pathname} onDone={() => setIntroDone(true)} />}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/work" element={<WorkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="*" element={<HomePage menuOpen={menuOpen} setMenuOpen={setMenuOpen} />} />
        </Routes>
      </Suspense>
    </>
  );
}
