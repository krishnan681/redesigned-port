// src/components/AboutMe.jsx
import React from "react";
import "../CSS/AboutMe.css";

const AboutMe = () => {
  return (
    <section className="am-section-root">
      <div className="am-container">

        <div className="am-header-block">
          <h1 className="am-title">About Me</h1>
          <p className="am-subtitle">
            Full Stack Developer passionate about building scalable web and mobile applications.
          </p>
        </div>

        <div className="am-content-grid">

          {/* LEFT SIDE */}
          <div className="am-text-block">
            <p className="am-description">
              I specialize in crafting modern user interfaces and integrating them with powerful backend systems.
              With experience in React, React Native, Flutter, and Supabase, I build performant and scalable solutions.
            </p>

            <p className="am-description">
              My focus is on clean architecture, optimized performance, and delivering real-world business value.
            </p>

            <div className="am-skills">
              <span className="am-skill-chip">React</span>
              <span className="am-skill-chip">React Native</span>
              <span className="am-skill-chip">Flutter</span>
              <span className="am-skill-chip">Supabase</span>
              <span className="am-skill-chip">SQL</span>
              <span className="am-skill-chip">API Integration</span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="am-card-block">
            <div className="am-card">
              <h3 className="am-card-title">Experience</h3>
              <p className="am-card-text">
                Building full-stack applications with modern technologies and scalable backend systems.
              </p>
            </div>

            <div className="am-card">
              <h3 className="am-card-title">Focus</h3>
              <p className="am-card-text">
                Performance optimization, UI/UX quality, and production-ready code.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutMe;