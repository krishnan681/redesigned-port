// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import "../CSS/ProjectsScroll.css";

// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// import { dataSet } from "../data/projectsData";

// const ProjectsScroll = () => {
//   const wrapperRef = useRef(null);
//   const bgTextRef = useRef(null);
//   const navRef = useRef(null);

//   useEffect(() => {
//     const wrapper = wrapperRef.current;
//     const bgText = bgTextRef.current;
//     const navContainer = navRef.current;

//     // Safety check
//     if (!wrapper || !navContainer) return;

//     // Clear previous elements
//     wrapper.innerHTML = "";
//     navContainer.innerHTML = '<div class="nav-line"></div>';

//     dataSet.forEach((item, i) => {
//       const isOdd = i % 2 === 0;

//       const dot = document.createElement("div");
//       dot.className = `nav-dot ${i === 0 ? "active" : ""}`;
//       dot.innerHTML = `<span class="nav-label">${item.title}</span>`;
//       dot.onclick = () =>
//         gsap.to(window, {
//           scrollTo: i * (document.body.scrollHeight / dataSet.length),
//           duration: 2,
//         });
//       navContainer.appendChild(dot);

//       const card = document.createElement("div");
//       card.className = `viewport-item card project-${i}`;
//       card.style.left = isOdd ? "8%" : "52%";
//       card.innerHTML = `
//         <div class="card-inner">
//           <img src="https://picsum.photos/seed/${i + 100}/800/600" />
//         </div>
//       `;

//       const detail = document.createElement("div");
//       detail.className = `viewport-item details project-${i}`;
//       detail.style.left = isOdd ? "58%" : "8%";
//       detail.innerHTML = `
//         <h2>${item.title}</h2>
//         <p class="main-desc">${item.desc}</p>
//         <ul class="features">
//           ${item.features.map((f) => `<li>${f}</li>`).join("")}
//         </ul>
//         <div class="tech-stack">
//           ${item.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
//         </div>
//       `;

//       wrapper.appendChild(card);
//       wrapper.appendChild(detail);
//       gsap.set([card, detail], { z: -5000, opacity: 0 });
//     });

//     const dots = gsap.utils.toArray(".nav-dot");

//     // We no longer need an internal timeline here as HomePage master timeline handles it.
//     // However, we still want the bgText update logic if possible? 
//     // Actually, HomePage handles bgText in its onUpdate too.

//     return () => {
//       ScrollTrigger.getAll().forEach(t => t.kill());
//     };
//   }, []);

//   return (
//     <>
//       <div className="nav-container" ref={navRef} style={{ position: 'absolute', zIndex: 100 }}>
//         <div className="nav-line" />
//       </div>

//       <div className="scroll-hint">Scroll to Explore</div>

//       <div className="stage projects-3d-root" style={{ opacity: 0 }}>
//         <div className="bg-text" ref={bgTextRef}>
//           NEXT
//         </div>
//         <div className="container" ref={wrapperRef} />
//       </div>
//     </>
//   );
// };

// export default ProjectsScroll;


// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import "../CSS/ProjectsScroll.css";
// import { dataSet } from "../data/projectsData";

// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// const ProjectsScroll = () => {
//   const wrapperRef = useRef(null);
//   const navRef = useRef(null);

//   useEffect(() => {
//     const wrapper = wrapperRef.current;
//     const navContainer = navRef.current;

//     if (!wrapper || !navContainer) return;

//     wrapper.innerHTML = "";
//     navContainer.innerHTML = '<div class="nav-line"></div>';

//     const sectionHeight = window.innerHeight;

//     dataSet.forEach((item, i) => {
//       const isOdd = i % 2 === 0;

//       // 🔹 NAV DOT
//       const dot = document.createElement("div");
//       dot.className = `nav-dot ${i === 0 ? "active" : ""}`;
//       dot.innerHTML = `<span class="nav-label">${item.title}</span>`;

//       dot.onclick = () => {
//         gsap.to(window, {
//           scrollTo: {
//             y: i * sectionHeight,
//           },
//           duration: 1.5,
//           ease: "power3.inOut",
//         });
//       };

//       navContainer.appendChild(dot);

//       // 🔹 CARD
//       const card = document.createElement("div");
//       card.className = `viewport-item card`;
//       card.style.left = isOdd ? "8%" : "52%";

//       card.innerHTML = `
//         <div class="card-inner">
//           <img src="https://picsum.photos/seed/${i + 100}/800/600" />
//         </div>
//       `;

//       // 🔹 DETAILS
//       const detail = document.createElement("div");
//       detail.className = `viewport-item details`;
//       detail.style.left = isOdd ? "58%" : "8%";

//       detail.innerHTML = `
//         <h2>${item.title}</h2>
//         <p class="main-desc">${item.desc}</p>
//         <ul class="features">
//           ${item.features.map((f) => `<li>${f}</li>`).join("")}
//         </ul>
//         <div class="tech-stack">
//           ${item.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
//         </div>
//       `;

//       wrapper.appendChild(card);
//       wrapper.appendChild(detail);

//       // 🔹 Initial State
//       gsap.set([card, detail], { z: -3000, opacity: 0 });

//       // 🔥 SCROLL ANIMATION
//       gsap.to([card, detail], {
//         z: 0,
//         opacity: 1,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: wrapper,
//           start: `${i * 100}% top`,
//           end: `${(i + 1) * 100}% top`,
//           scrub: true,
//         },
//       });

//       // 🔹 NAV ACTIVE STATE
//       ScrollTrigger.create({
//         trigger: wrapper,
//         start: `${i * 100}% top`,
//         end: `${(i + 1) * 100}% top`,
//         onEnter: () => updateActiveDot(i),
//         onEnterBack: () => updateActiveDot(i),
//       });
//     });

//     function updateActiveDot(index) {
//       const dots = document.querySelectorAll(".nav-dot");
//       dots.forEach((d, i) => {
//         d.classList.toggle("active", i === index);
//       });
//     }

//     return () => {
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, []);

//   return (
//     <>
//       <div className="nav-container" ref={navRef} />

//       <div className="stage">
//         <div className="bg-text">PROJECTS</div>
//         <div className="container" ref={wrapperRef} />
//       </div>

//       {/* SCROLL SPACE */}
//       <div className="spacer" />
//     </>
//   );
// };

// export default ProjectsScroll;














// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import "../CSS/ProjectsScroll.css";

// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// import { dataSet } from "../data/projectsData";

// const ProjectsScroll = () => {
//   const wrapperRef = useRef(null);
//   const bgTextRef = useRef(null);
//   const navRef = useRef(null);

//   useEffect(() => {
//     const wrapper = wrapperRef.current;
//     const bgText = bgTextRef.current;
//     const navContainer = navRef.current;

//     if (!wrapper || !navContainer) return;

//     // ✅ Smooth scroll setup
//     gsap.to(window, {
//       scrollTo: { y: 0 },
//       duration: 0,
//     });

//     ScrollTrigger.normalizeScroll(true);
//     ScrollTrigger.config({
//       ignoreMobileResize: true,
//     });

//     // Clear previous elements
//     wrapper.innerHTML = "";
//     navContainer.innerHTML = '<div class="nav-line"></div>';

//     const GAP = 1800; // ✅ spacing between sections

//     dataSet.forEach((item, i) => {
//       const isOdd = i % 2 === 0;

//       // ✅ NAV DOT
//       const dot = document.createElement("div");
//       dot.className = `nav-dot ${i === 0 ? "active" : ""}`;
//       dot.innerHTML = `<span class="nav-label">${item.title}</span>`;

//       dot.onclick = () =>
//         gsap.to(window, {
//           scrollTo: {
//             y: i * window.innerHeight * 1.2, // ✅ fixed spacing scroll
//           },
//           duration: 1.5,
//           ease: "power2.inOut",
//         });

//       navContainer.appendChild(dot);

//       // ✅ CARD
//       const card = document.createElement("div");
//       card.className = `viewport-item card project-${i}`;
//       card.style.left = isOdd ? "8%" : "52%";
//       card.innerHTML = `
//         <div class="card-inner">
//           <img src="${item.image}" />
//         </div>
//       `;

//       // ✅ DETAILS
//       const detail = document.createElement("div");
//       detail.className = `viewport-item details project-${i}`;
//       detail.style.left = isOdd ? "58%" : "8%";
//       detail.innerHTML = `
//         <h2>${item.title}</h2>
//         <p class="main-desc">${item.desc}</p>
//         <ul class="features">
//           ${item.features.map((f) => `<li>${f}</li>`).join("")}
//         </ul>
//         <div class="tech-stack">
//           ${item.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
//         </div>
//       `;

//       wrapper.appendChild(card);
//       wrapper.appendChild(detail);

//       // ✅ APPLY 3D GAP
//       gsap.set([card, detail], {
//         z: -i * GAP,
//         opacity: 0,
//       });
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, []);

//   return (
//     <>
//       <div
//         className="nav-container"
//         ref={navRef}
//         style={{ position: "absolute", zIndex: 100 }}
//       >
//         <div className="nav-line" />
//       </div>

//       <div className="scroll-hint">Scroll to Explore</div>

//       <div className="stage projects-3d-root" style={{ opacity: 0 }}>
//         <div className="bg-text" ref={bgTextRef}>
//           NEXT
//         </div>
//         <div className="container" ref={wrapperRef} />
//       </div>

//       {/* ✅ IMPORTANT: SCROLL SPACE */}
//       <div className="spacer" />
//     </>
//   );
// };

// export default ProjectsScroll;


import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "@studio-freight/lenis";
import "../CSS/ProjectsScroll.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

import { dataSet } from "../data/projectsData";

const ProjectsScroll = () => {
  const wrapperRef = useRef(null);
  const bgTextRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const navContainer = navRef.current;

    if (!wrapper || !navContainer) return;

    const lenis = new Lenis({
      duration: 1.4,
      smoothWheel: true,
      smoothTouch: false,
      lerp: 0.08,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const rafFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(rafFn);
    gsap.ticker.lagSmoothing(0);

    wrapper.innerHTML = "";
    navContainer.innerHTML = '<div class="nav-line"></div>';

    const GAP = 1800;

    dataSet.forEach((item, i) => {
      const isOdd = i % 2 === 0;

      const dot = document.createElement("div");
      dot.className = `nav-dot ${i === 0 ? "active" : ""}`;
      dot.innerHTML = `<span class="nav-label">${item.title}</span>`;

      dot.onclick = () => {
        // Calculate the relative timeline position
        // Total duration is roughly 13.5s. Item 'i' appear finishes at 4 + i * 2.5
        const targetTime = 4 + i * 2.5;
        const targetProgress = Math.min(targetTime / 13.5, 1);
        
        // Find the top of the master-viewport
        const viewport = document.querySelector(".master-viewport");
        if (viewport) {
          const rect = viewport.getBoundingClientRect();
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const viewportTop = rect.top + scrollTop;
          
          // pin lasts for 6000px
          const targetY = viewportTop + (targetProgress * 6000);
          
          gsap.to(window, {
            scrollTo: { y: targetY },
            duration: 1.5,
            ease: "power2.inOut",
          });
        }
      };

      navContainer.appendChild(dot);

      const card = document.createElement("div");
      card.className = `viewport-item card project-${i}`;
      card.style.left = isOdd ? "8%" : "52%";
      card.innerHTML = `<div class="card-inner"><img src="${item.image}" /></div>`;

      const detail = document.createElement("div");
      detail.className = `viewport-item details project-${i}`;
      detail.style.left = isOdd ? "58%" : "8%";
      detail.innerHTML = `
        <h2>${item.title}</h2>
        <p class="main-desc">${item.desc}</p>
        <ul class="features">${item.features.map((f) => `<li>${f}</li>`).join("")}</ul>
        <div class="tech-stack">${item.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}</div>
      `;

      wrapper.appendChild(card);
      wrapper.appendChild(detail);

      gsap.set([card, detail], { z: -i * GAP, opacity: 0 });
    });

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafFn);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <div className="nav-container" ref={navRef} style={{ position: "absolute", zIndex: 100 }}>
        <div className="nav-line" />
      </div>

    
      <div className="stage projects-3d-root">
       
        <div className="container" ref={wrapperRef} />
      </div>
    </>
  );
};

export default ProjectsScroll;