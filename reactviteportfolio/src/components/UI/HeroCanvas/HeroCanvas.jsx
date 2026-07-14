import { useEffect, useRef } from "react";

import heroVideo from "../../../assets/video/herosection.mp4";

import HeroRenderer from "./HeroRenderer";

import "../../../CSS/UI-CSS/HeroCanvas.css";

export default function HeroCanvas() {

    const canvasRef = useRef();

    useEffect(() => {

        const canvas = canvasRef.current;

        const video = document.createElement("video");

        video.src = heroVideo;

        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.preload = "auto";

        video.style.display = "none";

        document.body.appendChild(video);

        const renderer = new HeroRenderer(
            canvas,
            video
        );

        renderer.start();

        video.play().catch(() => {});

        return () => {

            renderer.destroy();

            video.pause();

            video.remove();

        };

    }, []);

    return (

        <canvas
            ref={canvasRef}
            className="hero-canvas"
        />

    );

}