// import { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Layout from "./components/Layout/layout";
// import HomePage from "./components/HomePage";
// import ScrollExperience from "./components/ScrollExperience";
// import ProjectsScroll from "./components/ProjectsScroll";

// import TerminalSplash from "./components/UI/TerminalSplash";


// import AboutMe from "./components/AboutMe";

// function App() {
//   const [loading, setLoading] = useState(true);

//   if (loading) {
//     return <TerminalSplash onFinish={() => setLoading(false)} />;
//   }

//   return (
//     <Layout>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/experience" element={<ScrollExperience />} />
//         <Route
//           path="/projects"
//           element={
//             <>
//               <ProjectsScroll />
//               <AboutMe />
//             </>
//           }
//         />

//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Layout>
//   );
// }

// export default App;



import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/layout";
import HomePage from "./components/HomePage";
import TerminalSplash from "./components/UI/TerminalSplash";

// Separate Pages
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import LinksPage from "./pages/LinksPage";

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <TerminalSplash onFinish={() => setLoading(false)} />;
  }

  return (
    <Layout>
      <Routes>
        {/* Main continuous scroll page */}
        <Route path="/" element={<HomePage />} />
        
        {/* Separate Navigation Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/links" element={<LinksPage />} />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;

// import { Routes, Route } from "react-router-dom";
// import HomePage from "../src/components/HomePage";
// import ScrollExperience from "../src/components/ScrollExperience";
// import ProjectsScroll from "./components/ProjectsScroll";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/experience" element={<ScrollExperience />} />
//       <Route path="/projects" element={<ProjectsScroll />} />
//     </Routes>
//   );
// }

// export default App;
