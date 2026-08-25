import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { dataSet } from "../data/projectsData";
import "../CSS/ProjectsScroll.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const projectAtmospheres = [
  {
    watermark: "CONFERENCE",
    category: "Full-Stack Web App",
  },
  {
    watermark: "NOVEL ARCHIVE",
    category: "Interactive Storytelling",
  },
  {
    watermark: "INTERIOR DESIGN",
    category: "Architecture & Design",
  },
];

const ProjectsScroll = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const bgLayersRef = useRef([]);
  const watermarkRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean);
    const bgLayers = bgLayersRef.current.filter(Boolean);
    if (cards.length === 0) return;

    const totalCards = cards.length;

    // Set initial card & gradient layer states
    cards.forEach((card, i) => {
      if (i === 0) {
        gsap.set(card, {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          filter: "brightness(1)",
          zIndex: 10,
          pointerEvents: "auto",
        });
      } else {
        gsap.set(card, {
          yPercent: 125,
          scale: 0.94,
          opacity: 0,
          filter: "brightness(1)",
          zIndex: 10 + i,
          pointerEvents: "none",
        });
      }
    });

    // Set initial background gradient layer
    bgLayers.forEach((layer, i) => {
      gsap.set(layer, { opacity: i === 0 ? 1 : 0 });
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${totalCards * 1100}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const rawProgress = self.progress * (totalCards - 1);
            const currentIdx = Math.min(Math.round(rawProgress), totalCards - 1);
            setActiveIdx(currentIdx);

            cards.forEach((c, idx) => {
              if (c) {
                c.style.pointerEvents = idx === currentIdx ? "auto" : "none";
              }
            });
          },
        },
      });

      for (let i = 1; i < totalCards; i++) {
        const currentCard = cards[i];
        const atmo = projectAtmospheres[i] || projectAtmospheres[0];

        // Scale down and dim preceding cards
        for (let j = 0; j < i; j++) {
          const depth = i - j;
          const targetScale = Math.max(1 - depth * 0.05, 0.85);
          const targetY = -depth * 18;
          const targetBrightness = Math.max(1 - depth * 0.3, 0.35);

          tl.to(
            cards[j],
            {
              scale: targetScale,
              y: targetY,
              filter: `brightness(${targetBrightness})`,
              duration: 1,
              ease: "power2.out",
            },
            `stack-${i}`
          );
        }

        // Slide current card in
        tl.to(
          currentCard,
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            filter: "brightness(1)",
            duration: 1,
            ease: "power2.out",
          },
          `stack-${i}`
        );

        // Smooth cross-fade to current project's high-opacity gradient layer
        if (bgLayers[i - 1]) {
          tl.to(
            bgLayers[i - 1],
            { opacity: 0, duration: 1, ease: "power1.inOut" },
            `stack-${i}`
          );
        }
        if (bgLayers[i]) {
          tl.to(
            bgLayers[i],
            { opacity: 1, duration: 1, ease: "power1.inOut" },
            `stack-${i}`
          );
        }

        // Watermark transition
        if (watermarkRef.current) {
          tl.to(
            watermarkRef.current,
            {
              opacity: 0,
              duration: 0.25,
              onComplete: () => {
                if (watermarkRef.current) {
                  watermarkRef.current.innerText = atmo.watermark;
                }
              },
            },
            `stack-${i}`
          ).to(
            watermarkRef.current,
            { opacity: 0.08, duration: 0.4 },
            `stack-${i}+=0.25`
          );
        }
      }
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  const scrollToCard = (index) => {
    if (!sectionRef.current) return;
    const totalCards = dataSet.length;
    const allTriggers = ScrollTrigger.getAll();
    const trigger = allTriggers.find((st) => st.trigger === sectionRef.current);

    if (trigger) {
      const scrollStart = trigger.start;
      const scrollTotal = trigger.end - trigger.start;
      const targetScroll = scrollStart + (index / (totalCards - 1)) * scrollTotal;

      gsap.to(window, {
        scrollTo: targetScroll,
        duration: 1.2,
        ease: "power2.inOut",
      });
    }
  };

  const initialAtmo = projectAtmospheres[0];

  return (
    <section className="projects-stack-section" id="projects" ref={sectionRef}>
      {/* High-Opacity Gradient Layers for 60FPS Cross-Fading */}
      <div
        className="gradient-bg-layer layer-0"
        ref={(el) => (bgLayersRef.current[0] = el)}
      />
      <div
        className="gradient-bg-layer layer-1"
        ref={(el) => (bgLayersRef.current[1] = el)}
      />
      <div
        className="gradient-bg-layer layer-2"
        ref={(el) => (bgLayersRef.current[2] = el)}
      />

      <div className="gradient-dark-vignette" />

      <div className="projects-watermark-text" ref={watermarkRef}>
        {initialAtmo.watermark}
      </div>

      <div className="projects-grid-overlay" />

      {/* Header */}
      <div className="projects-header-sticky">
        <div className="projects-header-left">
          <span className="projects-tagline">Featured Work</span>
        </div>

        <div className="projects-counter-badge">
          {String(activeIdx + 1).padStart(2, "0")} / {String(dataSet.length).padStart(2, "0")}
        </div>
      </div>

      {/* Cards Viewport */}
      <div className="projects-viewport">
        <div className="cards-stack-container">
          {dataSet.map((project, i) => {
            const atmo = projectAtmospheres[i] || projectAtmospheres[0];

            return (
              <article
                className={`stack-card stack-card-${i}`}
                key={project.title + i}
                ref={(el) => (cardsRef.current[i] = el)}
              >
                {/* Left: Content Details */}
                <div className="card-content-col">
                  <div>
                    <div className="card-header-meta">
                      <span className="card-index-tag">{String(i + 1).padStart(2, "0")}</span>
                      <span className="card-category-tag">{atmo.category}</span>
                    </div>

                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-desc">{project.desc}</p>

                    {project.features && (
                      <ul className="card-features-list">
                        {project.features.map((feature, fIdx) => (
                          <li className="card-feature-item" key={fIdx}>
                            <span className="feature-sparkle">✦</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div>
                    <div className="card-tech-wrapper">
                      {project.tech.map((t, tIdx) => (
                        <span className="card-tech-pill" key={tIdx}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="card-action-row">
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="view-live-btn"
                        >
                          View Live
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7 17L17 7M17 7H7M17 7V17"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      ) : (
                        <span className="view-live-btn" style={{ opacity: 0.6 }}>
                          View Live
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Mockup Showcase */}
                <div className="card-showcase-col">
                  <div className="showcase-mockup-stage">
                    <div className="mockup-desktop-frame">
                      <div className="mockup-browser-bar">
                        <span className="browser-dot red" />
                        <span className="browser-dot yellow" />
                        <span className="browser-dot green" />
                        <span className="browser-address-pill" />
                      </div>
                      <div className="mockup-desktop-screen">
                        <img
                          src={project.image}
                          alt={`${project.title} Desktop View`}
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <div className="mockup-mobile-frame">
                      <div className="mockup-mobile-notch" />
                      <div className="mockup-mobile-screen">
                        <img
                          src={project.imageMobile || project.image}
                          alt={`${project.title} Mobile View`}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Floating Side Nav */}
      <nav className="projects-side-nav" aria-label="Project Navigation">
        {dataSet.map((project, i) => (
          <div
            key={i}
            className={`side-nav-item ${i === activeIdx ? "active" : ""}`}
            onClick={() => scrollToCard(i)}
          >
            <span className="side-nav-tooltip">{project.title}</span>
            <div className="side-nav-dot" />
          </div>
        ))}
      </nav>
    </section>
  );
};

export default ProjectsScroll;