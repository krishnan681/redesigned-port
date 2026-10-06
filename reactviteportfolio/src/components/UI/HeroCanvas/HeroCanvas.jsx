import { useEffect, useRef } from "react";
import heroVideo from "../../../assets/video/herosection.mp4";
import HeroRenderer from "./HeroRenderer";
import "../../../CSS/UI-CSS/HeroCanvas.css";

export default function HeroCanvas() {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const video = document.createElement("video");
    video.src = heroVideo;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.style.display = "none";
    document.body.appendChild(video);

    const renderer = new HeroRenderer(canvas, video);
    rendererRef.current = renderer;
    renderer.start();

    // IntersectionObserver to pause when scrolled out of view (saves massive CPU/GPU)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          renderer.resume();
        } else {
          renderer.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      renderer.destroy();
      rendererRef.current = null;
      video.pause();
      video.remove();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}