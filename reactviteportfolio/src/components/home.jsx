import { useState } from "react";
import HeroCanvas from "./UI/HeroCanvas/HeroCanvas";
import RotatingText from "./UI/RotatingText";
import ConnectModal from "./UI/ConnectModal";
import "../CSS/home.css";

function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="hero" id="home">
      <HeroCanvas />

      <div className="hero-content">
        <span className="hero-greeting">HI THERE, IT'S</span>

        <h1 className="hero-name">GOPALAKRISHNAN</h1>

        <div className="hero-divider" />

        <div className="hero-role">
          <RotatingText
            texts={["Frontend Developer", "Designer", "Creative Developer"]}
            auto
            loop
          />
        </div>

        <div className="hero-divider small" />

        <p className="hero-description">
          Transforming ideas into fast, scalable and visually engaging digital
          experiences with thoughtful design and modern web technologies.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn" onClick={() => setShowModal(true)}>
            Let's Connect
          </button>
        </div>

        {showModal && <ConnectModal onClose={() => setShowModal(false)} />}
      </div>
    </section>
  );
}

export default Home;
