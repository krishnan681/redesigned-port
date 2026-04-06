import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "@studio-freight/lenis";
import "../CSS/ProjectsScroll.css";
import { dataSet } from "../data/projectsData";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const ProjectsPage = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const wrapper = wrapperRef.current;
    const navContainer = navRef.current;
    const container = containerRef.current;

    if (!wrapper || !navContainer || !container) return;

    // Use a similar approach to the homepage but isolated
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
    const totalHeight = 6000; // Same as master viewport

    dataSet.forEach((item, i) => {
      const isOdd = i % 2 === 0;

      const dot = document.createElement("div");
      dot.className = `nav-dot ${i === 0 ? "active" : ""}`;
      dot.innerHTML = `<span class="nav-label">${item.title}</span>`;

      dot.onclick = () => {
        // Timeline goes from 0 to 13.5s. Item i starts at 2 + i*2.5
        const targetProgress = Math.min((2 + i * 2.5) / 13.5, 1);
        const rect = container.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const targetY = rect.top + scrollTop + (targetProgress * totalHeight);
        
        gsap.to(window, {
          scrollTo: { y: targetY },
          duration: 1.5,
          ease: "power2.inOut",
        });
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

      gsap.set([card, detail], { z: -1000, opacity: 0 }); // Initialize scaled out
    });

    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".projects-standalone-viewport",
          start: "top top",
          end: "+=" + totalHeight,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const pProg = progress; // Direct mapping instead of phase 1/2
            const index = Math.min(Math.floor(pProg * dataSet.length), dataSet.length - 1);
            const dots = document.querySelectorAll(".nav-dot");
            dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
          }
        }
      });

      // No dive phase, jump straight to project phase mapping
      masterTl.to(".projects-3d-root", { opacity: 1, scale: 1, duration: 0.1 }); 

      dataSet.forEach((_, i) => {
        const targets = `.project-${i}`;
        const startTime = i * 2.5; 

        // Appear
        masterTl.to(targets, { z: 0, opacity: 1, duration: 2, ease: "power2.out" }, startTime);

        // Disappear (Fly past)
        masterTl.to(targets, { z: 1500, opacity: 0, duration: 1.5, ease: "power2.in" }, startTime + 2.5);
      });

    }, containerRef);

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafFn);
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} style={{ minHeight: '100vh', position: 'relative', backgroundColor: "#020F16" }}>
      <div className="projects-standalone-viewport" style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden'
      }}>
        <div className="nav-container" ref={navRef} style={{ position: "absolute", zIndex: 100, top: "80px" }}>
          <div className="nav-line" />
        </div>

        <div className="stage projects-3d-root" style={{ opacity: 0 }}>
          <div className="container" ref={wrapperRef} />
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
