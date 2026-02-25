import React, { useState, useRef } from "react";
import gsap from "gsap";
import "../CSS/ScrollExperience.css";
import ProjectsScroll from "./ProjectsScroll";

const images = [
  { src: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546", top: "-5%", left: "2%", size: 300, depth: -1.2 },
  { src: "https://images.unsplash.com/photo-1518770660439-4636190af475", top: "15%", left: "12%", size: 180, depth: 0.5 },
  { src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d", top: "2%", right: "5%", size: 280, depth: -0.8 },
  { src: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa", top: "20%", right: "18%", size: 160, depth: 1.4 },
  { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa", bottom: "8%", left: "4%", size: 320, depth: 1.6 },
  { src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429", bottom: "22%", left: "20%", size: 200, depth: -0.4 },
  { src: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1", bottom: "-2%", right: "6%", size: 340, depth: 0.9 },
  { src: "https://images.unsplash.com/photo-1506765515384-028b60a970df", bottom: "18%", right: "22%", size: 190, depth: -1.5 },
  { src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee", top: "45%", left: "-8%", size: 240, depth: 2.0 },
  { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470", top: "40%", right: "-8%", size: 260, depth: 1.8 },
];

const ScrollExperience = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [showProjects, setShowProjects] = useState(false);

  const cameraRef = useRef(null);
  const stageRef = useRef(null);

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setMouse({ x, y });
  };

  const startDive = () => {
    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onComplete: () => setShowProjects(true),
    });

    tl.to(cameraRef.current, { scale: 3, duration: 2 })
      .to(stageRef.current, { z: 3000, duration: 2 }, "<")
      .to(".floating-image", {
        opacity: 0,
        scale: 1.5,
        duration: 1,
        stagger: 0.02,
      }, "-=1.5")
      .to(".glass-modal", {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
      }, "-=1");
  };

  if (showProjects) {
    return <ProjectsScroll />;
  }

  return (
    <div
      className="experience-root experience-root-camera"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouse({ x: 0, y: 0 })}
    >
      <div className="stars-overlay" />

      <div className="camera" ref={cameraRef}>
        <div className="stage-3d" ref={stageRef}>
          <div className="world">
            {images.map((img, i) => (
              <img
                key={i}
                src={img.src}
                className="floating-image"
                style={{
                  width: img.size,
                  top: img.top,
                  bottom: img.bottom,
                  left: img.left,
                  right: img.right,
                  transform: `
                    translate3d(
                      ${-mouse.x * 100 * img.depth}px,
                      ${-mouse.y * 100 * img.depth}px,
                      ${img.depth * -600}px
                    )
                    scale(${1 + img.depth * 0.05})
                  `,
                  filter: `blur(${Math.abs(img.depth) * 1.5}px) brightness(${img.depth < 0 ? 0.6 : 1.1})`,
                  zIndex: Math.floor(img.depth * 10) + 50,
                }}
                alt=""
              />
            ))}

            <div
              className="glass-modal"
              style={{
                transform: `
                  translate3d(${-mouse.x * 40}px, ${-mouse.y * 40}px, 200px)
                  rotateY(${-mouse.x * 10}deg)
                  rotateX(${mouse.y * 10}deg)
                `,
              }}
            >
              <div className="logo-container">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_2019.svg"
                  className="edge-icon"
                  alt="logo"
                />
                <span className="brand-name">Portfolio Experience</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollExperience;