import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "../CSS/ProjectsScroll.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const dataSet = [
  {
    title: "Next Ventures",
    bg: "NEXT",
    desc: "A platform for entrepreneurs.",
    features: ["Leveraged PPR.", "Clean design.", "Optimization."],
    tech: ["Next.js", "React"],
  },
  {
    title: "Nova Mobile",
    bg: "NOVA",
    desc: "Financial tracking app.",
    features: ["State management.", "Beautiful charts.", "Biometrics."],
    tech: ["Flutter", "Android Studio"],
  },
  {
    title: "CyberMesh",
    bg: "CYBER",
    desc: "Networking hub.",
    features: ["Node monitoring.", "Smart contracts.", "Terminal."],
    tech: ["TypeScript", "Rust"],
  },
  {
    title: "FitPulse App",
    bg: "PULSE",
    desc: "Health companion.",
    features: ["Native modules.", "Offline-first.", "Adaptive UI."],
    tech: ["Flutter", "Android Studio"],
  },
];

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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".spacer",
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
        onUpdate: (self) => {
          const index = Math.min(
            Math.floor(self.progress * dataSet.length),
            dataSet.length - 1
          );

          if (bgText) bgText.innerText = dataSet[index].bg;

          dots.forEach((dot, i) =>
            dot.classList.toggle("active", i === index)
          );
        },
      },
    });

    dataSet.forEach((_, i) => {
      const targets = `.project-${i}`;
      tl.to(targets, { z: 0, opacity: 1, duration: 2 }, i * 3).to(
        targets,
        { z: 1500, opacity: 0, duration: 1.5 },
        i * 3 + 2.5
      );
    });

    if (bgText) {
      gsap.to(bgText, {
        y: -150,
        scrollTrigger: { trigger: ".spacer", scrub: true },
      });
    }

    return () => {
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <div className="nav-container" ref={navRef}>
        <div className="nav-line" />
      </div>

      <div className="scroll-hint">Scroll to Explore</div>

      <div className="stage">
        <div className="bg-text" ref={bgTextRef}>
          NEXT
        </div>
        <div className="container" ref={wrapperRef} />
      </div>

      <div className="spacer" />
    </>
  );
};

export default ProjectsScroll;