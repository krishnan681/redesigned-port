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

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Orbit Dashboard",
    description: "A real-time analytics platform with live data streaming, customizable widgets, and multi-tenant architecture. Built for scale and performance at the edge.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: ["React", "WebSocket", "Node.js"],
    codeUrl: "#",
    demoUrl: "#",
  },
  {
    id: 2,
    title: "Luminary AI",
    description: "An intelligent writing assistant powered by large language models. Features contextual suggestions, tone analysis, and collaborative document editing.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    tags: ["Next.js", "OpenAI", "Prisma"],
    codeUrl: "#",
    demoUrl: "#",
  },
  {
    id: 3,
    title: "Phantom Store",
    description: "A headless e-commerce engine with blazing-fast SSR, animated product galleries, and a frictionless checkout flow optimized for conversion.",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80",
    tags: ["Next.js", "Stripe", "Postgres"],
    codeUrl: "#",
    demoUrl: "#",
  },
  {
    id: 4,
    title: "Terrain Maps",
    description: "An interactive geospatial visualization tool for exploring topographic data in 3D. Supports custom map layers, route plotting, and elevation profiling.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    tags: ["Three.js", "MapboxGL", "Python"],
    codeUrl: "#",
    demoUrl: "#",
  },
];

export default function ProjectsPage() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef   = useRef([]);
  const lineRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" } }
      );

      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: lineRef.current, start: "top 85%" } }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          scrub: false,
        },
      });
      tl.fromTo(cardsRef.current,
        { opacity: 0, y: 80, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "power3.out", stagger: 0.15 }
      );

      cardsRef.current.forEach((card) => {
        if (!card) return;
        const img = card.querySelector(".pf__card-img-inner");
        gsap.to(img, {
          yPercent: -12, ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1.5 },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="pf__root">
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
              <div className="pf__card-img-wrap">
                <div className="pf__card-img-inner" style={{ backgroundImage: `url(${project.image})` }} />
                <div className="pf__card-img-veil" />
                <div className="pf__card-chips">
                  {project.tags.map((tag) => (
                    <span className="pf__chip" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="pf__card-body">
                <div className="pf__card-num">0{i + 1}</div>
                <h3 className="pf__card-name">{project.title}</h3>
                <p className="pf__card-blurb">{project.description}</p>
                <div className="pf__card-cta">
                  <a href={project.codeUrl} className="pf__btn pf__btn--outline">
                    <span className="pf__btn-ico">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    </span>
                    View Code
                  </a>
                  <a href={project.demoUrl} className="pf__btn pf__btn--solid">
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