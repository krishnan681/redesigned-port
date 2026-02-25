import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "../CSS/ProjectsScroll.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

import { dataSet } from "../data/projectsData";

const ProjectsScroll = () => {
  const wrapperRef = useRef(null);
  const bgTextRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const bgText = bgTextRef.current;
    const navContainer = navRef.current;

    // Safety check
    if (!wrapper || !navContainer) return;

    // Clear previous elements
    wrapper.innerHTML = "";
    navContainer.innerHTML = '<div class="nav-line"></div>';

    dataSet.forEach((item, i) => {
      const isOdd = i % 2 === 0;

      const dot = document.createElement("div");
      dot.className = `nav-dot ${i === 0 ? "active" : ""}`;
      dot.innerHTML = `<span class="nav-label">${item.title}</span>`;
      dot.onclick = () =>
        gsap.to(window, {
          scrollTo: i * (document.body.scrollHeight / dataSet.length),
          duration: 2,
        });
      navContainer.appendChild(dot);

      const card = document.createElement("div");
      card.className = `viewport-item card project-${i}`;
      card.style.left = isOdd ? "8%" : "52%";
      card.innerHTML = `
        <div class="card-inner">
          <img src="https://picsum.photos/seed/${i + 100}/800/600" />
        </div>
      `;

      const detail = document.createElement("div");
      detail.className = `viewport-item details project-${i}`;
      detail.style.left = isOdd ? "58%" : "8%";
      detail.innerHTML = `
        <h2>${item.title}</h2>
        <p class="main-desc">${item.desc}</p>
        <ul class="features">
          ${item.features.map((f) => `<li>${f}</li>`).join("")}
        </ul>
        <div class="tech-stack">
          ${item.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
        </div>
      `;

      wrapper.appendChild(card);
      wrapper.appendChild(detail);
      gsap.set([card, detail], { z: -5000, opacity: 0 });
    });

    const dots = gsap.utils.toArray(".nav-dot");

    // We no longer need an internal timeline here as HomePage master timeline handles it.
    // However, we still want the bgText update logic if possible? 
    // Actually, HomePage handles bgText in its onUpdate too.

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <div className="nav-container" ref={navRef} style={{ position: 'absolute', zIndex: 100 }}>
        <div className="nav-line" />
      </div>

      <div className="scroll-hint">Scroll to Explore</div>

      <div className="stage projects-3d-root" style={{ opacity: 0 }}>
        <div className="bg-text" ref={bgTextRef}>
          NEXT
        </div>
        <div className="container" ref={wrapperRef} />
      </div>
    </>
  );
};

export default ProjectsScroll;