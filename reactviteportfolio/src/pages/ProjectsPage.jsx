// import React, { useEffect, useRef } from "react";
// import "../CSS/ProjectsPage.css";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const projects = [
//   {
//     title: "Portfolio Website",
//     desc: "Modern portfolio with animations and smooth UI.",
//     img: "/assets/images/bento-a.png",
//     code: "#",
//     live: "#",
//   },
//   {
//     title: "Admin Dashboard",
//     desc: "Full-stack dashboard with analytics and CRUD.",
//     img: "/assets/images/download.webp",
//     code: "#",
//     live: "#",
//   },
//   {
//     title: "Flutter App",
//     desc: "Cross-platform mobile UI with smooth UX.",
//     img: "/assets/images/profile.png",
//     code: "#",
//     live: "#",
//   },
// ];

// const ProjectsPage = () => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const cards = gsap.utils.toArray(".project-card");

//       // TIMELINE (stagger animation)
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top 80%",
//           toggleActions: "play none none reverse",
//         },
//       });

//       tl.from(cards, {
//         opacity: 0,
//         y: 100,
//         scale: 0.9,
//         duration: 1,
//         ease: "power4.out",
//         stagger: 0.2,
//       });

//       // OPTIONAL: subtle parallax on scroll
//       cards.forEach((card, i) => {
//         gsap.to(card, {
//           y: -20,
//           scrollTrigger: {
//             trigger: card,
//             start: "top bottom",
//             scrub: 1,
//           },
//         });
//       });
//     }, containerRef);

//     return () => ctx.revert(); // cleanup
//   }, []);

//   return (
//     <div className="projects-page" ref={containerRef}>
//       <h1 className="projects-title">Projects</h1>

//       <div className="projects-grid">
//         {projects.map((proj, index) => (
//           <div className="project-card" key={index}>
//             <div className="project-image">
//               <img src={proj.img} alt={proj.title} />
//               <div className="image-overlay"></div>
//             </div>

//             <div className="project-content">
//               <h2>{proj.title}</h2>
//               <p>{proj.desc}</p>

//               <div className="project-buttons">
//                 <a href={proj.code}>View Code</a>
//                 <a href={proj.live}>Live Demo</a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProjectsPage;





import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../CSS/ProjectsPage.css";

// ✅ import your dataset
import { dataSet } from "../data/projectsData"; // adjust path if needed

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPage() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const lineRef = useRef(null);

  // ✅ transform your dataset → UI format
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
      // heading animation
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

      // line animation
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

      // cards animation
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

      // image parallax
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const img = card.querySelector(".pf__card-img-inner");

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
      {/* background visuals */}
      <div className="pf__orb pf__orb--lime" />
      <div className="pf__orb pf__orb--indigo" />
      <div className="pf__dot-grid" />

      <section className="pf__section" ref={sectionRef}>
        <header className="pf__header">
          <p className="pf__eyebrow">Selected Work</p>

          <h2 className="pf__headline" ref={headingRef}>
            Projects that <br />
            <span className="pf__headline-ghost">
              define the craft
            </span>
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
              {/* image */}
              <div className="pf__card-img-wrap">
                <div
                  className="pf__card-img-inner"
                  style={{
                    backgroundImage: `url(${project.image})`,
                  }}
                />

                <div className="pf__card-img-veil" />

                {/* tags */}
                <div className="pf__card-chips">
                  {project.tags.map((tag) => (
                    <span className="pf__chip" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* content */}
              <div className="pf__card-body">
                <div className="pf__card-num">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <h3 className="pf__card-name">
                  {project.title}
                </h3>

                <p className="pf__card-blurb">
                  {project.description}
                </p>

                {/* buttons */}
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
                    <span className="pf__btn-arrow">
                      &#x2197;
                    </span>
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