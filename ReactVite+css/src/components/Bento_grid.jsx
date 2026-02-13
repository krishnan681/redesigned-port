// import React from "react";
// import "../CSS/BentoGrid.css";
// import LightRays from "../components/UI/LightRays";
// import Lottie from "lottie-react";
// import RobotSaludando from "../assets/lottie/RobotSaludando.json";

// /* TECH STACK DATA */
// const techItems = [
//   { name: "HTML", logo: "/logos/html.svg" },        // Fixed placeholder logos
//   { name: "CSS", logo: "/logos/css.svg" },
//   { name: "Bootstrap", logo: "/logos/bootstrap.svg" },
//   { name: "Figma", logo: "/logos/figma.svg" },
//   { name: "React", logo: "/logos/react.svg" },
//   { name: "React Native", logo: "/logos/react.svg" },
//   { name: "Git", logo: "/logos/git.svg" },
//   { name: "Github", logo: "/logos/github.svg" },
//   { name: "Expo", logo: "/logos/expo.svg" },
//   { name: "Postman", logo: "/logos/postman.svg" },
//   { name: "Supabase", logo: "/logos/supabase.svg" },
//   { name: "Auth", logo: "/logos/auth.svg" },
//   { name: "Photoshop", logo: "/logos/photoshop.svg" },
// ];

// const BentoGridSection = () => {
//   return (
//     <section id="projects" className="section bento-grid">

//       {/* Original clip path for Bento A */}
//       <svg width="0" height="0" style={{ position: "absolute" }}>
//         <defs>
//           <clipPath id="rounded-step" clipPathUnits="objectBoundingBox">
//             <path d="M 0.05 0 H 0.64 Q 0.68 0 0.68 0.06 V 0.45 Q 0.68 0.51 0.76 0.51 H 0.98 Q 1 0.51 1 0.57 V 0.95 Q 1 1 0.95 1 H 0.05 Q 0 1 0 0.95 V 0.06 Q 0 0 0.05 0 Z" />
//           </clipPath>
//         </defs>
//       </svg>

//       <svg width="0" height="0" style={{ position: "absolute" }}>
//         <defs>
//           <clipPath id="bottom-right-step" clipPathUnits="objectBoundingBox">
//             <path d="
//   M 0 0
//   H 0.99
//   Q 1 0 1 0.02
//   V 0.62
//   Q 1 0.68 0.99 0.68
//   H 0.80
//   Q 0.75 0.68 0.75 0.74
//   V 0.98
//   Q 0.75 1 0.70 1
//   H 0
//   Q 0 1 0 0.98
//   V 0.02
//   Q 0 0 0.02 0
//   Z
// " />
//           </clipPath>
//         </defs>
//       </svg>

//       <div className="bento-container">
//         {/* BENTO A */}
//         <div className="bento-item bento-a">
//           <h2>3D Rendering Image</h2>
//         </div>

//         {/* FLOATING LOTTIE */}
//         <div className="bento-a-lottie-floating">
//           <Lottie animationData={RobotSaludando} loop autoplay />
//         </div>

//         {/* BENTO B */}
//         <div className="bento-item bento-b">
//           <p className="bento-b-gradient-text">
//             &lt; Frontend Developer passionate about building sleek, responsive
//             websites. Since 2023, I’ve been honing my skills in HTML, CSS, and
//             Bootstrap, blending traditional coding with AI-assisted workflows.
//             Always learning. Always building. /&gt;
//           </p>
//         </div>

//         {/* BENTO C - Now uses bottom-right step clip */}
//         <div className="bento-item bento-c">
//           <div className="bento-c-rays">
//             <LightRays
//               raysOrigin="top-center"
//               raysColor="#01afff"
//               raysSpeed={1}
//               lightSpread={12}
//               rayLength={3}
//               followMouse
//               mouseInfluence={0.2}
//             />
//           </div>

//           <div className="bento-c-content">
//             <div className="bento-c-text">
//               <h2>Rapidly adopting modern development tools</h2>
//               <p>Focused on continuously learning and evolving with new technologies</p>
//             </div>

//             <div className="tech-marquee">
//               <div className="tech-row move-right">
//                 {[...techItems, ...techItems].map((item, index) => (
//                   <div className="tech-pill" key={`r1-${index}`}>
//                     <img src={item.logo} alt={item.name} />
//                     <span>{item.name}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="tech-row move-left">
//                 {[...techItems, ...techItems].map((item, index) => (
//                   <div className="tech-pill" key={`r2-${index}`}>
//                     <img src={item.logo} alt={item.name} />
//                     <span>{item.name}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* BENTO D */}
//         <div className="bento-item bento-d">Bento D</div>
//       </div>
//     </section>
//   );
// };

// export default BentoGridSection;





























// new













import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Lottie from "lottie-react";
import LightRays from "../components/UI/LightRays";
import RobotSaludando from "../assets/lottie/RobotSaludando.json";
import "../CSS/BentoGrid.css";

/* TECH STACK DATA */
const techItems = [
   { name: "HTML", logo: "/logos/html.svg" },        // Fixed placeholder logos
  { name: "CSS", logo: "/logos/css.svg" },
  { name: "Bootstrap", logo: "/logos/bootstrap.svg" },
  { name: "Figma", logo: "/logos/figma.svg" },
  { name: "React", logo: "/logos/react.svg" },
  { name: "React Native", logo: "/logos/react.svg" },
  { name: "Git", logo: "/logos/git.svg" },
  { name: "Github", logo: "/logos/github.svg" },
  { name: "Expo", logo: "/logos/expo.svg" },
  { name: "Postman", logo: "/logos/postman.svg" },
  { name: "Supabase", logo: "/logos/supabase.svg" },
  { name: "Auth", logo: "/logos/auth.svg" },
  { name: "Photoshop", logo: "/logos/photoshop.svg" },
];

const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`bento-item ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      <div className="tilt-inner" style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

const BentoGridSection = () => {
  return (
    <section id="projects" className="bento-grid-section">
      <div className="bento-container">

        {/* BENTO A: COLLABORATION & IDENTITY */}
        <TiltCard className="bento-a">
          <div className="bento-a-content">
            <span className="badge">Collaboration First</span>
            <h2>I prioritize client communication & open feedback</h2>
            <p className="bento-subtitle">Based in India, working worldwide.</p>
          </div>
          <div className="bento-a-lottie">
            <Lottie animationData={RobotSaludando} loop autoplay />
          </div>
        </TiltCard>

        {/* BENTO B: THE MANIFESTO */}
        <TiltCard className="bento-b">
          <p className="gradient-text">
            &lt; Frontend Developer crafting immersive digital experiences. 
            Merging technical performance with aesthetic precision to build 
            the future of web interfaces. /&gt;
          </p>
<br></br>
<br></br>
          <h2 style={{ color: 'white' }}>add cards - certifications horizontally  </h2>

        </TiltCard>

        {/* BENTO C: THE "INSIDE SCOOP" TECH STACK */}
        <TiltCard className="bento-c">
          <div className="bento-c-rays">
            <LightRays raysColor="#8b5cf6" raysSpeed={0.8} />
          </div>
          <div className="bento-c-content">
            <div className="bento-c-text">
               
              <h2>Building a Directory Website (On going Process)</h2>
              <p>Scalable, modular, and performance-first development.</p>
            </div>
            
            <div className="tech-marquee">
              <div className="tech-row move-right">
                {[...techItems, ...techItems].map((item, i) => (
                  <div className="tech-pill" key={i}>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
              <div className="tech-row move-left" style={{marginTop: '10px'}}>
                {[...techItems, ...techItems].reverse().map((item, i) => (
                  <div className="tech-pill" key={i}>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TiltCard>

        {/* BENTO D: GLOBAL CONNECTIVITY */}
        <TiltCard className="bento-d">
          <div className="bento-d-content">
            <a href="#contact" className="cta-button">Let's work together</a>
          </div>
        </TiltCard>

      </div>
    </section>
  );
};

export default BentoGridSection;