import React, { useState } from "react";

import Home from "./home";
import BentoGridSection from "./Bento_grid";
import ScrollExperience from "./ScrollExperience";

const HomePage = () => {
  const [diveComplete, setDiveComplete] = useState(false);

  return (
    <>
      <Home />
      <BentoGridSection />

      <ScrollExperience onDiveComplete={() => setDiveComplete(true)} />

    </>
  );
};

export default HomePage;










// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// import Home from "./home";
// import BentoGridSection from "./Bento_grid";
// import ScrollExperience from "./ScrollExperience";
// import ProjectsScroll from "./ProjectsScroll";
// import StarBackground from "./UI/star_background";

// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// const HomePage = () => {
//   const containerRef = useRef(null);

//   const handleExplore = () => {
//     gsap.to(window, {
//       scrollTo: ".master-viewport",
//       duration: 1.5,
//       ease: "power2.inOut"
//     });
//   };

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Master Timeline
//       const masterTl = gsap.timeline({
//         scrollTrigger: {
//           trigger: ".master-viewport",
//           start: "top top",
//           end: "+=8000", // 2000 for dive, 6000 for projects
//           pin: true,
//           scrub: 1,
//           onUpdate: (self) => {
//             // Re-implementing dynamic text update:
//             const progress = self.progress;
//             // Assuming Dive is 0-0.15, Projects are 0.15-1.0
//             if (progress > 0.15) {
//               const pProg = (progress - 0.15) / 0.85;
//               const index = Math.min(Math.floor(pProg * dataSet.length), dataSet.length - 1);
//               const bgText = document.querySelector(".project-bg-text");
//               if (bgText) bgText.innerText = dataSet[index].bg;

//               const dots = document.querySelectorAll(".nav-dot");
//               dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
//             }
//           }
//         }
//       });

//       // --- PHASE 1: THE DIVE ---
//       // Zoom out the ScrollExperience
//       masterTl.to(".experience-root-camera", {
//         scale: 15,
//         opacity: 0,
//         duration: 2,
//         ease: "power2.in"
//       }, "start");

//       // Zoom IN the Projects (Simulate camera entering)
//       // Starts slightly offset to create fly-through feel
//       masterTl.to(".projects-3d-root", {
//         opacity: 1,
//         scale: 1,
//         duration: 2,
//         ease: "power2.out"
//       }, "start+=0.5");

//       // --- PHASE 2: THE PROJECTS ---
//       // We start this after the dive (at label 'projectsStart' or just time offset)
//       masterTl.addLabel("projectsStart");

//       dataSet.forEach((_, i) => {
//         const targets = `.project-${i}`;
//         const startTime = 2 + (i * 2.5); // Start after dive (2s)

//         // Appear
//         masterTl.to(targets, { z: 0, opacity: 1, duration: 2, ease: "power2.out" }, startTime);

//         // Disappear (Fly past)
//         masterTl.to(targets, { z: 1500, opacity: 0, duration: 1.5, ease: "power2.in" }, startTime + 2.5);
//       });

//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div ref={containerRef} style={{ background: '#000', minHeight: '100vh', position: 'relative' }}>
//       {/* Global Stars Overlay */}
//       <StarBackground />

//       <div style={{ position: 'relative', zIndex: 1 }}>
//         <Home />
//         <BentoGridSection />

//         {/* Master Viewport - Pinned Area for Dive + Projects */}
//         <div className="master-viewport" style={{
//           position: 'relative',
//           height: '100vh',
//           width: '100%',
//           overflow: 'hidden'
//         }}>

//           {/* Layer 1: Scroll Experience (Top) */}
//           {/* We wrap it to ensure it handles absolute positioning correctly */}
//           <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
//             <ScrollExperience onExplore={handleExplore} />
//           </div>

//           {/* Layer 2: Projects (Bottom/Hidden initially) */}
//           {/* It has zIndex 5 inside the component, but we control visibility via GSAP */}
//           <ProjectsScroll />

//         </div>
//       </div>

//       {/* Footer / Next Section */}
//       <div style={{ height: '100vh', background: 'transparent' }}></div>
//     </div>
//   );
// };

// export default HomePage;
