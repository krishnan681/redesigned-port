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
              <h3>Signpost Celfon.in Technology</h3>
              <h3>Frontend Developer</h3>
              <ul className="exp-list">
                <li>Developed responsive and high-performance user interfaces</li>
                <li>Implemented smooth animations and interactive UI</li>
                <li>Collaborated on scalable frontend architecture</li>
                <li>Optimized performance and rendering</li>
                <li>Bridged design and development workflows</li>
                <li>Created a design book with diverse UI systems</li>
              </ul>
            </div>


          </div>

          {/* CENTER DIVIDER */}
          <div className="timeline-divider"></div>

          {/* RIGHT SIDE - EDUCATION */}
          <div className="timeline-column right-education">
            <h2 className="section-title">Education</h2>

            <div className="section-content">
              <h3>B.Sc Computer Science</h3>
              <p>
                Built a strong foundation in core computer science concepts including
                data structures, algorithms, database systems, and software engineering principles.
              </p>
            </div>

            <div className="section-content">
              <h3>MCA (Master of Computer Applications)</h3>
              <p>
                Advanced specialization in full-stack development, system architecture,
                and scalable application design with a focus on real-world problem solving.
              </p>
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