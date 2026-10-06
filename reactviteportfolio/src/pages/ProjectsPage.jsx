import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dataSet } from "../data/projectsData";
import "../CSS/ProjectsPage.css";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPage() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const lineRef = useRef(null);

  const projects = dataSet.map((item, i) => ({
    id: i + 1,
    title: item.title,
    description: item.cardDesc,
    image: item.image,
    tags: item.tech,
    codeUrl: item.link,
    demoUrl: item.link,
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        }
      );

      // Line animation
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 85%",
          },
        }
      );

      // Cards animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          scrub: false,
        },
      });

      tl.fromTo(
        cardsRef.current,
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.15,
        }
      );

      // Image parallax
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const img = card.querySelector(".pf__card-img-inner");
        if (!img) return;

        gsap.to(img, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="pf__root">
      {/* Background visuals */}
      <div className="pf__orb pf__orb--lime" />
      <div className="pf__orb pf__orb--indigo" />
      <div className="pf__dot-grid" />

      <section className="pf__section" ref={sectionRef}>
        <header className="pf__header">
          <p className="pf__eyebrow">Selected Work</p>

          <h2 className="pf__headline" ref={headingRef}>
            Projects that <br />
            <span className="pf__headline-ghost">define the craft</span>
          </h2>

          <div className="pf__rule" ref={lineRef} />
        </header>

        <div className="pf__grid">
          {projects.map((project, i) => (
            <article
              className="pf__card"
              key={project.id}
              ref={(el) => (cardsRef.current[i] = el)}
            >
              {/* Image */}
              <div className="pf__card-img-wrap">
                <div
                  className="pf__card-img-inner"
                  style={{
                    backgroundImage: `url(${project.image})`,
                  }}
                />

                <div className="pf__card-img-veil" />

                {/* Tags */}
                <div className="pf__card-chips">
                  {project.tags.map((tag) => (
                    <span className="pf__chip" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="pf__card-body">
                <div className="pf__card-num">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <h3 className="pf__card-name">{project.title}</h3>
                <p className="pf__card-blurb">{project.description}</p>

                {/* Buttons */}
                <div className="pf__card-cta">
                  <a
                    href={project.codeUrl}
                    className="pf__btn pf__btn--outline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Project
                  </a>

                  <a
                    href={project.demoUrl}
                    className="pf__btn pf__btn--solid"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live Demo
                    <span className="pf__btn-arrow">&#x2197;</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}