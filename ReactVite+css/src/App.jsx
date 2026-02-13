import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/home";
// import BentoGridSection from "./components/bento_grid";
import HomePage from "./components/HomePage";
import ScrollExperience from "./components/ScrollExperience";

import ProjectsScroll from "./components/ProjectsScroll";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/experience" element={<ScrollExperience />} />
        <Route path="/projects" element={<ProjectsScroll />} />
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
