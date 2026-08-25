import React from "react";
import Home from "./home";
import BentoGridSection from "./Bento_grid";
import ScrollExperience from "./ScrollExperience";
import ProjectsScroll from "./ProjectsScroll";
import AboutMe from "./AboutMe";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <div style={{ position: "relative", zIndex: 1 }}>
        <Home />
        <BentoGridSection />
        <ScrollExperience />
        <ProjectsScroll />
      </div>
      <AboutMe />
      <Footer />
    </div>
  );
};

export default HomePage;
