import React, { useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import "../CSS/AboutPage.css";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page-root">
      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="about-image-wrap">
          <div className="scribble-container">
            <svg viewBox="0 0 1500 1062" className="scribble-svg">
              <defs>
                <mask id="scribbleMask">
                  <rect width="100%" height="100%" fill="black" />
                  <polyline
                    points="0,154 131,0 0,348 269,0 0,562 437,0 0,766 565,14 0,1062 719,0 289,1062 843,0 543,1062 995,0 729,1062 1161,0 947,1062 1307,0 1143,1062 1500,162 1299,1062 1500,830"
                    fill="none"
                    stroke="white"
                    strokeWidth="165"
                    className="scribble-line"
                  />
                </mask>
              </defs>
              <image
                href="https://i.pinimg.com/736x/3d/01/7f/3d017f4f7d517ee17018d81515b28b7f.jpg"
                width="1500"
                height="1062"
                preserveAspectRatio="xMidYMid cover"
                mask="url(#scribbleMask)"
              />
            </svg>
          </div>
        </div>
        <div className="about-bio-card">
          <p className="about-bio">
            Frontend Developer crafting immersive digital experiences. Merging technical performance with aesthetic precision to build the future of web interfaces.
          </p>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="timeline-section">
        <div className="timeline-container">

          {/* LEFT SIDE - EXPERIENCE */}
          <div className="timeline-column left-experience">
            <h2 className="section-title">Experience</h2>
            <div className="section-content">
              <h3>Frontend Developer</h3>
              <p>Built modern responsive UI with performance optimization.</p>
            </div>
            <div className="section-content">
              <h3>React Native Developer</h3>
              <p>Developed cross-platform mobile apps.</p>
            </div>
            <div className="section-content">
              <h3>Freelancer</h3>
              <p>Delivered custom dashboards and applications.</p>
            </div>
          </div>

          {/* CENTER DIVIDER */}
          <div className="timeline-divider"></div>

          {/* RIGHT SIDE - EDUCATION */}
          <div className="timeline-column right-education">
            <h2 className="section-title">Education</h2>
            <div className="section-content">
              <h3>B.Sc Computer Science</h3>
              <p>Strong foundation in algorithms and system design.</p>
            </div>
            <div className="section-content">
              <h3>Full Stack Development</h3>
              <p>Hands-on experience building scalable applications.</p>
            </div>
            <div className="section-content">
              <h3>UI/UX Design</h3>
              <p>Focused on intuitive and engaging user experiences.</p>
            </div>
          </div>

        </div>

        {/* GITHUB (FREE) */}
        <section className="about-section">
          <div className="section-left">
            <h2 className="section-title">GitHub</h2>

          </div>
          <div className="section-right">
            <div className="github-card">
              <GitHubCalendar
                username="krishnan681"
                blockSize={16}
                blockMargin={6}
                fontSize={16}
              />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default AboutPage;