import React from "react";
import "../CSS/ScrollExperience.css";

// Assets
import img1 from "../assets/images/ScrollExperience_images/1.jpg";
import img2 from "../assets/images/ScrollExperience_images/2.jpg";
import img3 from "../assets/images/ScrollExperience_images/3.png";
import img4 from "../assets/images/ScrollExperience_images/4.jpg";
import img5 from "../assets/images/ScrollExperience_images/5.png";
import img6 from "../assets/images/ScrollExperience_images/6.png";
import img7 from "../assets/images/ScrollExperience_images/7.png";

const imagesRow1 = [img1, img2, img3, img4, img5, img6, img7];
const imagesRow2 = [img7, img6, img5, img4, img3, img2, img1];

const ScrollExperience = () => {
  // Repeating sets to guarantee seamless loop
  const loopRow1 = [...imagesRow1, ...imagesRow1, ...imagesRow1, ...imagesRow1];
  const loopRow2 = [...imagesRow2, ...imagesRow2, ...imagesRow2, ...imagesRow2];

  return (
    <section className="vintage-carousel-section" id="visual-works">
      {/* Vintage Atmosphere Overlays */}
      <div className="vintage-vignette-overlay" />
      <div className="vintage-grain-overlay" />

      {/* Row 1: Moves Right */}
      <div className="vintage-row-container">
        <div className="vintage-track-right">
          {loopRow1.map((src, i) => (
            <div className="vintage-image-card" key={`r1-${i}`}>
              <img src={src} alt={`Visual work row 1 - ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Moves Left */}
      <div className="vintage-row-container">
        <div className="vintage-track-left">
          {loopRow2.map((src, i) => (
            <div className="vintage-image-card" key={`r2-${i}`}>
              <img src={src} alt={`Visual work row 2 - ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollExperience;