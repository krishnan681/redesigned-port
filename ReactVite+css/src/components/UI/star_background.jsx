// import React, { useEffect, useRef } from "react";
// import "../../CSS/UI-CSS/star_background.css";
// import Aurora from "./Aurora";

// const StarBackground = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const updateSize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     updateSize();
//     window.addEventListener("resize", updateSize);

//     const stars = [];
//     const numStars = 400;

//     for (let i = 0; i < numStars; i++) {
//       stars.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         radius: Math.random() * 1.2 + 0.5,
//         alpha: Math.random(),
//         fading: Math.random() > 0.5,
//         vx: (Math.random() - 0.5) * 0.2,
//         vy: (Math.random() - 0.5) * 0.2,
//       });
//     }

//     let animationFrameId;

//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       stars.forEach((star) => {
//         ctx.beginPath();
//         ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
//         ctx.fill();

//         if (star.fading) {
//           star.alpha -= 0.008;
//           if (star.alpha <= 0.1) star.fading = false;
//         } else {
//           star.alpha += 0.008;
//           if (star.alpha >= 1) star.fading = true;
//         }

//         star.x += star.vx;
//         star.y += star.vy;

//         if (star.x < 0) star.x = canvas.width;
//         if (star.x > canvas.width) star.x = 0;
//         if (star.y < 0) star.y = canvas.height;
//         if (star.y > canvas.height) star.y = 0;
//       });

//       animationFrameId = requestAnimationFrame(draw);
//     };

//     draw();

//     return () => {
//       window.removeEventListener("resize", updateSize);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   return (
//     <div className="star-bg-container">
//       <div className="star-bg-gradient" />
//       <canvas ref={canvasRef} className="star-canvas" />

//       {/* Curved Aurora */}
//       <div className="aurora-wrapper">
//         <Aurora
//           colorStops={["#1e3a8a", "#22d3ee", "#86efac"]}  // Deep blue → cyan → green (classic aurora)
//           // Or keep yours but softer: ["#3A29FF", "#7cff67", "#ff94b4"]
//           blend={0.8}
//           amplitude={1.4}
//           speed={0.3}
//         />
//       </div>

//       {/* Horizon with strong upward-facing glow */}
//       <div className="horizon-container">
//         <div className="horizon-curve">
//           <div className="horizon-line" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StarBackground;


// import React, { useEffect, useRef } from "react";
// import "../../CSS/UI-CSS/star_background.css";
// import Aurora from "./Aurora";

// const StarBackground = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const resize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     resize();
//     window.addEventListener("resize", resize);

//     /* ==============================
//         CONFIG
//     ============================== */
//     const STAR_COUNT = window.innerWidth < 768 ? 120 : 200;
//     const stars = [];
//     let shootingStar = null;
//     let lastShootTime = 0;

//     // Adjusted horizon ratio just for spawn logic if needed, or remove it
//     // We can spawn everywhere now since horizon is gone
//     const createStar = (randomY = false) => {
//       return {
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height, // Spawn everywhere

//         radius: Math.random() * 0.8 + 0.4,
//         speedY: Math.random() * 0.55 + 0.25,
//         driftX: (Math.random() - 0.5) * 0.22,

//         alpha: 0,
//         maxAlpha: Math.random() * 0.55 + 0.55,

//         twinklePhase: Math.random() * Math.PI * 2,
//         twinkleSpeed: Math.random() * 0.004 + 0.002,
//         twinkleDepth: Math.random() * 0.15 + 0.05,
//       };
//     };

//     for (let i = 0; i < STAR_COUNT; i++) {
//       stars.push(createStar(true));
//     }

//     const spawnShootingStar = () => {
//       shootingStar = {
//         x: Math.random() * canvas.width * 0.7,
//         y: Math.random() * canvas.height * 0.25,
//         vx: Math.random() * 6 + 8,
//         vy: Math.random() * 3 + 4,
//         life: 0,
//         maxLife: 40,
//       };
//     };

//     let raf;

//     const draw = (time) => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       const fadeInZone = 160;
//       const fadeOutStart = canvas.height * 0.18;
//       // We can adjust fading logic if we want them to go all the way down,
//       // or keep the top fade. Let's keep it simple.

//       /* STARS */
//       stars.forEach((star) => {
//         star.y -= star.speedY;
//         star.x += star.driftX;
//         star.x += Math.sin(star.y * 0.002) * 0.02;

//         // Simplified alpha logic for full screen
//         if (star.alpha < star.maxAlpha) {
//           star.alpha += 0.01;
//         }

//         star.twinklePhase += star.twinkleSpeed;
//         const twinkle = 1 + Math.sin(star.twinklePhase) * star.twinkleDepth;

//         ctx.beginPath();
//         ctx.arc(star.x, star.y, star.radius * twinkle, 0, Math.PI * 2);

//         ctx.fillStyle = `rgba(235, 245, 255, ${Math.min(
//           0.95,
//           star.alpha * twinkle
//         )})`;
//         ctx.fill();

//         if (star.y < -60 || star.x < -80 || star.x > canvas.width + 80) {
//           Object.assign(star, createStar(false));
//           star.y = canvas.height + 10; // Reset to bottom
//         }
//       });

//       /* SHOOTING STAR */
//       if (!shootingStar && time - lastShootTime > 5000) { // More frequent for visual interest
//         if (Math.random() < 0.015) {
//           spawnShootingStar();
//           lastShootTime = time;
//         }
//       }

//       if (shootingStar) {
//         shootingStar.life++;
//         ctx.strokeStyle = `rgba(200, 220, 255, ${1 - shootingStar.life / shootingStar.maxLife
//           })`;
//         ctx.lineWidth = 2;
//         ctx.beginPath();
//         ctx.moveTo(shootingStar.x, shootingStar.y);
//         ctx.lineTo(
//           shootingStar.x - shootingStar.vx * 2,
//           shootingStar.y - shootingStar.vy * 2
//         );
//         ctx.stroke();

//         shootingStar.x += shootingStar.vx;
//         shootingStar.y += shootingStar.vy;

//         if (shootingStar.life > shootingStar.maxLife) {
//           shootingStar = null;
//         }
//       }

//       raf = requestAnimationFrame(draw);
//     };

//     raf = requestAnimationFrame(draw);

//     return () => {
//       cancelAnimationFrame(raf);
//       window.removeEventListener("resize", resize);
//     };
//   }, []);

//   return (
//     <div className="star-bg-container" style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
//       <div className="star-bg-gradient" />
//       <canvas ref={canvasRef} className="star-canvas" />
//     </div>
//   );
// };

// export default StarBackground;














import React, { useEffect, useRef } from "react";
import "../../CSS/UI-CSS/star_background.css";

const StarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    /* ==============================
        CONFIG & COLORS
    ============================== */
    const STAR_COUNT = window.innerWidth < 768 ? 150 : 250;
    const STAR_COLORS = ["#ffffff", "#e0f2fe", "#fff7ed", "#fafaf9", "#bae6fd"]; 
    const stars = [];
    let shootingStar = null;

    const createStar = (isInitial = false) => {
      return {
        x: Math.random() * canvas.width,
        y: isInitial ? Math.random() * canvas.height : canvas.height + 10,
        radius: Math.random() * 0.9 + 0.3,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        speedY: Math.random() * 0.4 + 0.1, // Slow upward drift
        driftX: (Math.random() - 0.5) * 0.15,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        alpha: Math.random(), // Random starting opacity
      };
    };

    // Initialize stars
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push(createStar(true));
    }

    const spawnShootingStar = () => {
      const side = Math.random() > 0.5;
      shootingStar = {
        x: side ? 0 : Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.5),
        vx: Math.random() * 10 + 10, // Fast
        vy: Math.random() * 4 + 2,
        size: Math.random() * 2 + 1,
        opacity: 1,
        trail: [] // Array to store previous positions for a tail
      };
    };

    let raf;
    const draw = () => {
      // Create a slight trail effect by not clearing perfectly (optional)
      // ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
      // ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* 1. DRAW BACKGROUND STARS */
      stars.forEach((star) => {
        // Movement
        star.y -= star.speedY;
        star.x += star.driftX;
        
        // Twinkle Effect
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 1 || star.alpha < 0.2) {
          star.twinkleSpeed *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0, star.alpha);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Reset if star goes off screen
        if (star.y < -10 || star.x < -10 || star.x > canvas.width + 10) {
          Object.assign(star, createStar(false));
        }
      });

      /* 2. SHOOTING STAR LOGIC */
      if (!shootingStar && Math.random() < 0.005) {
        spawnShootingStar();
      }

      if (shootingStar) {
        // Draw the trail
        ctx.beginPath();
        ctx.strokeStyle = `rgba(186, 230, 253, ${shootingStar.opacity})`;
        ctx.lineWidth = shootingStar.size;
        ctx.lineCap = "round";
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(shootingStar.x - shootingStar.vx * 3, shootingStar.y - shootingStar.vy * 3);
        ctx.stroke();

        // Update Position
        shootingStar.x += shootingStar.vx;
        shootingStar.y += shootingStar.vy;
        shootingStar.opacity -= 0.02; // Fade out

        if (shootingStar.opacity <= 0 || shootingStar.x > canvas.width) {
          shootingStar = null;
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="star-bg-container">
      {/* Visual Depth Gradients */}
      <div className="space-nebula" />
      <canvas ref={canvasRef} className="star-canvas" />
    </div>
  );
};

export default StarBackground;