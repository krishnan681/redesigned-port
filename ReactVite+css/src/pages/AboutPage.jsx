import React, { useEffect } from "react";
import { motion } from "framer-motion";

import "../CSS/AboutPage.css";

// Icons reused
import { FaReact, FaHtml5, FaCss3Alt, FaBootstrap, FaNodeJs } from "react-icons/fa";
import { SiJavascript, SiFlutter, SiExpo, SiSupabase, SiPostman, SiCpanel } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { DiAndroid } from "react-icons/di";
import { FiCode, FiSmartphone, FiDatabase, FiPenTool } from "react-icons/fi";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="about-page-root">
      <motion.div
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Area */}
        <div className="about-hero">
          {/* Avatar Card */}
          <motion.div className="about-avatar-card" variants={itemVariants}>
            <img src="https://picsum.photos/seed/suresh/300/300" alt="Suresh Profile" className="avatar-image" />
            <h1 className="about-name">Suresh</h1>
            <p className="about-role">Frontend Web Developer</p>

            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-num">1.8</span>
                <span className="stat-label">Years Exp</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">20+</span>
                <span className="stat-label">Projects</span>
              </div>
            </div>
          </motion.div>

          {/* Bio Text */}
          <motion.div className="about-bio-card" variants={itemVariants}>
            <p className="about-bio">
              Hello! I'm a passionate <span>Frontend Web Developer</span> with professional experience since September 2024. I specialize in designing and developing responsive, highly interactive web applications that leave a lasting impression.
              <br /><br />
              My journey involves pushing the boundaries of web development, seamlessly fusing clean logic with premium <span>dynamic UI designs</span>. Whether it's crafting cinematic scrolling experiences or architecting robust mobile apps, I bring a unique blend of creativity and technical rigor to every project I touch.
            </p>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div className="about-skills-section" variants={itemVariants}>
          <h2 className="skills-title">Technical Arsenal</h2>

          <div className="skills-grid-new">
            {/* Frontend */}
            <motion.div className="skill-card-modern" variants={itemVariants}>
              <div className="skill-card-header">
                <div className="skill-card-icon"><FiCode /></div>
                <h3 className="skill-card-title">Frontend Development</h3>
              </div>
              <div className="skill-chips">
                <span className="skill-chip"><FaReact /> React.js</span>
                <span className="skill-chip"><SiJavascript /> JavaScript</span>
                <span className="skill-chip"><FaHtml5 /> HTML5</span>
                <span className="skill-chip"><FaCss3Alt /> CSS3</span>
                <span className="skill-chip"><FaBootstrap /> Bootstrap</span>
              </div>
            </motion.div>

            {/* Mobile */}
            <motion.div className="skill-card-modern" variants={itemVariants}>
              <div className="skill-card-header">
                <div className="skill-card-icon"><FiSmartphone /></div>
                <h3 className="skill-card-title">Mobile Ecosystem</h3>
              </div>
              <div className="skill-chips">
                <span className="skill-chip"><TbBrandReactNative /> React Native</span>
                <span className="skill-chip"><SiFlutter /> Flutter</span>
                <span className="skill-chip"><SiExpo /> Expo</span>
                <span className="skill-chip"><DiAndroid /> Android Studio</span>
              </div>
            </motion.div>

            {/* Backend & DB */}
            <motion.div className="skill-card-modern" variants={itemVariants}>
              <div className="skill-card-header">
                <div className="skill-card-icon"><FiDatabase /></div>
                <h3 className="skill-card-title">Backend & Data</h3>
              </div>
              <div className="skill-chips">
                <span className="skill-chip"><FaNodeJs /> Node.js</span>
                <span className="skill-chip"><SiSupabase /> Supabase</span>
                <span className="skill-chip"><SiPostman /> APIs</span>
              </div>
            </motion.div>

            {/* Design */}
            <motion.div className="skill-card-modern" variants={itemVariants}>
              <div className="skill-card-header">
                <div className="skill-card-icon"><FiPenTool /></div>
                <h3 className="skill-card-title">Creative & DevOps</h3>
              </div>
              <div className="skill-chips">
                <span className="skill-chip">Figma</span>
                <span className="skill-chip">Photoshop</span>
                <span className="skill-chip">Illustrator</span>
                <span className="skill-chip">Git / GitHub</span>
                <span className="skill-chip"><SiCpanel /> cPanel</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default AboutPage;
