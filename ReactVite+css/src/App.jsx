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
import Layout from "./components/Layout/layout";
import HomePage from "./components/HomePage";
import ScrollExperience from "./components/ScrollExperience";
import ProjectsScroll from "./components/ProjectsScroll";
import AboutMe from "./components/AboutMe";
import TerminalSplash from "./components/UI/TerminalSplash";

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <TerminalSplash onFinish={() => setLoading(false)} />;
  }

  return (
    <Layout>
      <HomePage />
      {/* <ScrollExperience /> */}
      <ProjectsScroll />
      <AboutMe />
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
