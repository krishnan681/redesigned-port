// import React from "react";
// import "../CSS/home.css";
// import Lottie from "lottie-react";
// import ctaCircleAnimation from "../assets/lottie/cta-circle.json";

// import SplitText from "../components/UI/SplitText";
// import RotatingText from "../components/UI/RotatingText";
// import StarBackground from "./UI/star_background";

// const Home = () => {
//   return (
//     <div style={{ position: 'relative', overflow: 'hidden' }}>
//       <StarBackground />

//       <div className="portfolio-container">
//         <section className="hero">
//           <div className="hero-content">

//             {/* BIG CURSIVE TAGLINE */}
//             <h1 className="hero-tagline">
//               lets turn fresh ideas into <br />
//               functional reality
//             </h1>


//             {/* ANIMATED NAME */}
//             <SplitText
//               text="Hello, I'm Gopal"
//               className="hero-name"
//               delay={200}
//               duration={1}
//               ease="power3.out"
//               splitType="chars"
//               from={{ opacity: 0, y: 40 }}
//               to={{ opacity: 1, y: 0 }}
//               threshold={0.1}
//               rootMargin="-100px"
//               textAlign="center"
//               tag="h2"
//             />

//             {/* ROTATING TITLE */}
//             <p className="title">
//               I am a{" "}
//               <RotatingText
//                 texts={[
//                   "Frontend Web Developer",
//                   "Designer"
//                 ]}
//                 mainClassName="rotating-title"
//                 splitBy="words"
//                 staggerFrom="last"
//                 staggerDuration={0.03}
//                 initial={{ y: "100%", opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 exit={{ y: "-120%", opacity: 0 }}
//                 transition={{ type: "spring", damping: 30, stiffness: 400 }}
//                 rotationInterval={2500}
//               />
//             </p>

//             {/* DESCRIPTION */}
//             <p className="description">
//               Building elegant web experiences with React, Node.js, and modern technologies.
//             </p>

//             {/* CTA */}
//             <div className="hero-buttons">
//               <a href="#contact" id="contact-btn" className="btn-secondary">
//                 Get in Touch

//                 <span className="cta-circle">
//                   <Lottie
//                     animationData={ctaCircleAnimation}
//                     loop
//                     autoplay
//                     style={{ width: "100%", height: "100%" }}
//                   />

//                 </span>
//               </a>

//             </div>



//           </div>
//         </section>
//       </div>
//     </div >
//   );
// };

// export default Home;
import React, { useEffect, useRef } from 'react';
import '../CSS/home.css';

const Home = () => {
  const starsRef = useRef(null);
  const earthRef = useRef(null);

  // ====================== STARS CANVAS ======================
  useEffect(() => {
    const canvas = starsRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let stars = [];
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];

      const n = Math.floor((canvas.width * canvas.height) / 3500);
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.7,
          r: Math.random() * 1.2 + 0.4,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.005 + 0.001,
        });
      }
    };

    const frame = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const parallaxStrength = 0.012;
      const offsetX = (mouseX - window.innerWidth / 2) * parallaxStrength;
      const offsetY = (mouseY - window.innerHeight / 2) * parallaxStrength * 0.5;

      targetX += (offsetX - targetX) * 0.07;
      targetY += (offsetY - targetY) * 0.07;

      for (const s of stars) {
        let a = 0.1 + 0.6 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        if (!Number.isFinite(a)) a = 0;
        ctx.beginPath();
        ctx.arc(
          s.x + targetX * (s.r * 6),
          s.y + targetY * (s.r * 4),
          s.r,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      }

      requestAnimationFrame(frame);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Shooting Star Function - Swapped Purple for Bento Indigo/Blue
    const spawnShootingStar = (isMeteor = false) => {
      const W = canvas.width;
      const H = canvas.height;
      const startX = Math.random() * W * 0.65;
      const startY = Math.random() * H * 0.25;

      const angle = Math.random() * 0.8 + 0.35;
      const len = isMeteor ? Math.random() * 280 + 180 : Math.random() * 140 + 90;
      const dur = isMeteor ? Math.random() * 700 + 550 : Math.random() * 950 + 650;
      const thickness = isMeteor ? 3.2 : 1.9;

      const vx = Math.cos(angle) * len;
      const vy = Math.sin(angle) * len;

      let startT = performance.now();

      const draw = (time) => {
        const elapsed = time - startT;

        let p = elapsed / dur;
        if (!Number.isFinite(p)) p = 0;
        p = Math.max(0, Math.min(p, 1));

        let op = Math.sin(p * Math.PI) ** 1.4 * (isMeteor ? 0.95 : 0.75);
        if (!Number.isFinite(op)) op = 0;

        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        const grd = ctx.createLinearGradient(
          startX + vx * (p - 0.18),
          startY + vy * (p - 0.18),
          startX + vx * (p + 0.18),
          startY + vy * (p + 0.18)
        );

        grd.addColorStop(0, "rgba(255,255,255,0)");
        // Matches --text-primary and --accent-indigo
        grd.addColorStop(0.35, isMeteor ? `rgba(255,240,200,${op})` : `rgba(241, 240, 255, ${op})`);
        grd.addColorStop(0.75, isMeteor ? `rgba(255,200,180,${op * 0.7})` : `rgba(99, 102, 241, ${op * 0.75})`);
        grd.addColorStop(1, "rgba(79, 70, 229, 0)"); // Fades into deep blue

        ctx.strokeStyle = grd;
        ctx.lineWidth = thickness;
        ctx.lineCap = "round";
        ctx.shadowBlur = isMeteor ? 25 : 12;
        // Shadow matches --accent-indigo
        ctx.shadowColor = isMeteor ? "rgba(255, 220, 180, 0.9)" : "rgba(99, 102, 241, 0.6)";

        ctx.beginPath();
        ctx.moveTo(startX + vx * (p - 0.18), startY + vy * (p - 0.18));
        ctx.lineTo(startX + vx * (p + 0.18), startY + vy * (p + 0.18));
        ctx.stroke();
        ctx.restore();

        if (p < 1) requestAnimationFrame(draw);
      };

      requestAnimationFrame(draw);
    };

    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);

    resize();
    requestAnimationFrame(frame);

    const shootingInterval = setInterval(() => spawnShootingStar(false), 5000);
    const meteorInterval = setInterval(() => spawnShootingStar(true), 15000);

    setTimeout(() => spawnShootingStar(false), 800);
    setTimeout(() => spawnShootingStar(true), 4500);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      clearInterval(shootingInterval);
      clearInterval(meteorInterval);
    };
  }, []);

  // ====================== EARTH CANVAS (Color Sync to Bento) ======================
  useEffect(() => {
    const canvas = earthRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const render = () => {
      const dpr = devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;

      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const cx = W * 0.5;
      const arcTopY = H * 0.3;
      const R = (cx * cx + arcTopY * arcTopY) / (2 * arcTopY); 
      const cy = R;

      const glowCX = cx;
      const glowCY = arcTopY + 4;

      // Core Glow - Shifted to Cool Blue/White
      {
        const g = ctx.createRadialGradient(glowCX, glowCY, 0, glowCX, glowCY, W * 0.12);
        g.addColorStop(0, "rgba(255,255,255, 0.85)");
        g.addColorStop(0.2, "rgba(230,240,255, 0.65)");
        g.addColorStop(0.5, "rgba(99, 102, 241, 0.25)"); // Indigo
        g.addColorStop(0.8, "rgba(79, 70, 229, 0.06)"); // Deep Blue
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      // Atmosphere Bloom - Matches Bento Indigo/Blue
      {
        ctx.save();
        ctx.translate(glowCX, glowCY);
        ctx.scale(0.32, 1.0);
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, W * 0.5);
        g.addColorStop(0, "rgba(167, 139, 250, 0.35)"); // --accent-soft
        g.addColorStop(0.2, "rgba(99, 102, 241, 0.25)"); // --accent-indigo
        g.addColorStop(0.45, "rgba(79, 70, 229, 0.15)"); // Deep Blue
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(-W * 2, -H * 2, W * 4, H * 4);
        ctx.restore();
      }

      // Planet Body - Darkened for 'Void' feel
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      const bodyGrad = ctx.createRadialGradient(cx, cy - R * 0.12, 0, cx, cy, R);
      bodyGrad.addColorStop(0, "#0e0e1a"); // --bg-surface
      bodyGrad.addColorStop(0.5, "#070710"); 
      bodyGrad.addColorStop(1, "#000000"); // --bg-void
      ctx.fillStyle = bodyGrad;
      ctx.fill();
      ctx.restore();

      // Atmosphere Rim (The Curve) - Sync to Indigo
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      const rimGrad = ctx.createRadialGradient(cx, cy, R * 0.97, cx, cy, R);
      rimGrad.addColorStop(0, "rgba(0,0,0,0)");
      rimGrad.addColorStop(0.5, "rgba(99, 102, 241, 0.10)");
      rimGrad.addColorStop(0.80, "rgba(99, 102, 241, 0.30)");
      rimGrad.addColorStop(1, "rgba(167, 139, 250, 0.50)");

      ctx.fillStyle = rimGrad;
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = "destination-in";
      const sf = ctx.createLinearGradient(0, 0, W, 0);
      sf.addColorStop(0, "rgba(0,0,0,0.0)");
      sf.addColorStop(0.5, "rgba(0,0,0,1.0)");
      sf.addColorStop(1, "rgba(0,0,0,0.0)");
      ctx.fillStyle = sf;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      // Horizon Glow Line - Sharp Indigo/White
      {
        const lg = ctx.createLinearGradient(0, 0, W, 0);
        lg.addColorStop(0, "rgba(0,0,0,0)");
        lg.addColorStop(0.30, "rgba(79, 70, 229, 0.45)"); // Deep Blue
        lg.addColorStop(0.5, "rgba(230, 240, 255, 0.85)"); // Highlight
        lg.addColorStop(0.70, "rgba(79, 70, 229, 0.45)");
        lg.addColorStop(1, "rgba(0,0,0,0)");

        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.strokeStyle = lg;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }

      // Upward Bloom
      {
        ctx.save();
        ctx.translate(cx, arcTopY);
        ctx.scale(0.20, 1.0);
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, H * 0.5);
        g.addColorStop(0, "rgba(230, 240, 255, 0.20)");
        g.addColorStop(0.4, "rgba(99, 102, 241, 0.08)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = g;
        ctx.fillRect(-W * 2, -H * 2, W * 4, H * 4);
        ctx.restore();
      }

      // Bottom Fade
      {
        const g = ctx.createLinearGradient(0, H * 0.28, 0, H);
        g.addColorStop(0, "rgba(0,0,0,0)");
        g.addColorStop(1, "rgba(0,0,0,1)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    const ro = new ResizeObserver(render);
    ro.observe(canvas);
    render();

    return () => ro.disconnect();
  }, []);

  return (
    <section className="hero">
      <canvas ref={starsRef} id="stars" />
      <canvas ref={earthRef} id="earth" />

      <div className="hero-content">
        <h1 className="hero-title">
          Your vision, my code — let’s <br />
          turn static concepts into <br />
          interactive experiences
        </h1>
        <h2 className="hero-body">
          Hello World, I'm Joe, a passionate frontend developer
        </h2>
      </div>

      <div className="connect-btn-wrapper">
        <button className="connect-btn">
          Let's Connect
          <span className="arrow" />
        </button>
      </div>
    </section>
  );
};

export default Home;