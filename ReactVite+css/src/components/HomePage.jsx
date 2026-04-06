import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import Home from "./home";
import BentoGridSection from "./Bento_grid";
import ScrollExperience from "./ScrollExperience";
import ProjectsScroll from "./ProjectsScroll";
import AboutMe from "./AboutMe";
import Footer from "./Footer";
import { dataSet } from "../data/projectsData";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const HomePage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Master Timeline
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".master-viewport",
          start: "top top",
          end: "+=6000", // reduced from 8000 for smoother tighter scrolling
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            // Dive is 0-0.2, Projects are 0.2-1.0
            if (progress > 0.2) {
              const pProg = (progress - 0.2) / 0.8;
              const index = Math.min(Math.floor(pProg * dataSet.length), dataSet.length - 1);
              const bgText = document.querySelector(".bg-text");
              if (bgText) bgText.innerText = dataSet[index].bg;

              const dots = document.querySelectorAll(".nav-dot");
              dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
            }
          }
        }
      });

      // --- PHASE 1: THE DIVE ---
      // Zoom out the ScrollExperience
      masterTl.to(".experience-root-camera", {
        scale: 15,
        opacity: 0,
        duration: 2,
        ease: "power2.in"
      }, "start");

      // Zoom IN the Projects (Simulate camera entering)
      masterTl.to(".projects-3d-root", {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power2.out"
      }, "start+=0.5");

      // --- PHASE 2: THE PROJECTS ---
      masterTl.addLabel("projectsStart");

      dataSet.forEach((_, i) => {
        const targets = `.project-${i}`;
        const startTime = 2 + (i * 2.5); // Start after dive (2s)

        // Appear
        masterTl.to(targets, { z: 0, opacity: 1, duration: 2, ease: "power2.out" }, startTime);

        // Disappear (Fly past)
        masterTl.to(targets, { z: 1500, opacity: 0, duration: 1.5, ease: "power2.in" }, startTime + 2.5);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ minHeight: '100vh', position: 'relative' }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Home />
        <BentoGridSection />

        {/* Master Viewport - Pinned Area for Dive + Projects */}
        <div className="master-viewport" style={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          overflow: 'hidden'
        }}>

          {/* Layer 1: Scroll Experience (Top) */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
            <ScrollExperience />
          </div>

          {/* Layer 2: Projects (Bottom/Hidden initially) */}
          <ProjectsScroll />

        </div>
      </div>
      <AboutMe />
      <Footer />
    </div>
  );
};

export default HomePage;
