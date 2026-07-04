// Static-import mirror of App.tsx's <Routes> for server rendering.
// Browser build keeps lazy() for code-splitting; renderToStaticMarkup runs
// synchronously and can't wait on a lazy()/Suspense boundary to resolve,
// so the prerendered build imports every page eagerly instead.
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WorkPage from "./pages/WorkPage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";

export default function PrerenderRoutes() {
  return (
    <Routes>
      <Route path="/work" element={<WorkPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="*" element={<HomePage menuOpen={false} setMenuOpen={() => {}} />} />
    </Routes>
  );
}
