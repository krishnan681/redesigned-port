import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/layout";
import HomePage from "./components/HomePage";
import TerminalSplash from "./components/UI/TerminalSplash";

// Separate Navigation Pages
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import LinksPage from "./pages/LinksPage";

function App() {
  const [splashFinished, setSplashFinished] = useState(false);

  return (
    <>
      {/* Terminal splash overlay - sits above page until fade completes */}
      {!splashFinished && (
        <TerminalSplash onFinish={() => setSplashFinished(true)} />
      )}

      {/* Main page content mounted immediately to prevent flash/blip after loader */}
      <Layout>
        <Routes>
          {/* Main continuous scroll portfolio page */}
          <Route path="/" element={<HomePage />} />

          {/* Dedicated Subpages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/links" element={<LinksPage />} />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
