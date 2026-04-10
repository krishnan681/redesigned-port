// import React from "react";
// import "../CSS/AboutMe.css";

// const AboutMe = () => {
//   const skillGroups = [
//     {
//       title: "Core Technologies",
//       skills: ["Next.js", "React.js", "TypeScript", "Tailwind CSS"],
//     },
//     {
//       title: "Backend & Cloud",
//       skills: ["Convex", "Firebase", "MongoDB", "Supabase"],
//     },
//     {
//       title: "Development Tools",
//       skills: ["Docker", "GitHub", "REST APIs", "Figma"],
//     },
//   ];

//   return (
//     <section className="am-section-root">
//       <div className="am-wrapper">
//         {/* LEFT RECTANGLE - Untouched as requested */}
//         <div className="am-left-box">
//           <div className="yrs">1.8</div>
//           <div className="yrs-experience">years of Working Experience</div>
//         </div>

//         {/* RIGHT CONTENT AREA */}
//         <div className="am-right-box">
//           <div className="am-header">
//             <h1 className="am-title">About Me</h1>
//             <p className="am-intro">
//               I'm Suresh <br />
//               <span className="accent-text">Frontend Web Developer</span>
//             </p>
//             <p className="am-text">
//               Frontend Web Developer with professional experience since August 2023 in designing and developing responsive web applications. Proficient in modern UI development and a passion for learning new web technologies.
//             </p>
//             <div className="am-actions">
//               <button className="btn btn-primary">Download CV</button>
//               <button className="btn btn-outline">Let's Talk</button>
//             </div>
//           </div>

//           <hr className="am-divider" />


//         </div>
//       </div>

//         {/* TOOLS & SKILLS SECTION */}
//           <div className="am-skills-container">
//             <h2 className="skills-main-title">Tools & Skills</h2>
//             <div className="skills-grid">
//               {skillGroups.map((group, index) => (
//                 <div key={index} className="skill-group">
//                   <h3>{group.title}</h3>
//                   <div className="skill-tags">
//                     {group.skills.map((skill) => (
//                       <div key={skill} className="skill-item">
//                         <span className="dot"></span>
//                         {skill}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//     </section>
//   );
// };

// export default AboutMe;

import React from "react";
import "../CSS/AboutMe.css";

// ICON IMPORTS
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaGit,
  FaGithub,
  FaNodeJs,
  FaPaintBrush,
} from "react-icons/fa";

import {
  SiJavascript,
  SiFlutter,
  SiExpo,
  SiSupabase,
  SiPostman,
  SiCpanel,
} from "react-icons/si";

import { TbBrandReactNative } from "react-icons/tb";
import { DiAndroid } from "react-icons/di";

const AboutMe = () => {
  const skillGroups = [
    {
      title: "Frontend Development",
      description: "Technologies I use to build responsive and interactive user interfaces",
      skills: [
        { name: "React.js", icon: <FaReact color="#61DAFB" /> },
        { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" /> },
        { name: "HTML5", icon: <FaHtml5 color="#E34F26" /> },
        { name: "CSS3", icon: <FaCss3Alt color="#1572B6" /> },
        { name: "Bootstrap", icon: <FaBootstrap color="#7952B3" /> },
      ],
    },
    {
      title: "Mobile Development",
      description: "Frameworks and tools for building cross-platform mobile apps",
      skills: [
        { name: "React Native", icon: <TbBrandReactNative color="#61DAFB" /> },
        { name: "Flutter", icon: <SiFlutter color="#02569B" /> },
        { name: "Expo", icon: <SiExpo color="#000000" /> },
        { name: "Android Studio", icon: <DiAndroid color="#3DDC84" /> },
      ],
    },
    {
      title: "Backend & Database",
      description: "Backend services and database management experience",
      skills: [
        { name: "Node.js", icon: <FaNodeJs color="#339933" /> },
        { name: "Supabase", icon: <SiSupabase color="#3ECF8E" /> },
        { name: "Postman", icon: <SiPostman color="#FF6C37" /> },
      ],
    },
    {
      title: "Design & Creative Tools",
      description: "Tools I use for UI/UX design and graphic creation",
      skills: [
        {
          name: "Figma",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
              <path fill="#e64a19" d="M26,17h-8c-3.866,0-7-3.134-7-7v0c0-3.866,3.134-7,7-7h8V17z" />
              <path fill="#7c4dff" d="M25,31h-7c-3.866,0-7-3.134-7-7v0c0-3.866,3.134-7,7-7h7V31z" />
              <path fill="#66bb6a" d="M18,45c-3.866,0-7-3.134-7-7v0c0-3.866,3.134-7,7-7h7v7c0,3.866-3.134,7-7,7z" />
              <path fill="#ff7043" d="M32,17h-7V3h7c3.866,0,7,3.134,7,7v0C39,13.866,35.866,17,32,17z" />
              <circle cx="32" cy="24" r="7" fill="#29b6f6" />
            </svg>
          ),
        },
        {
          name: "Adobe Photoshop", icon: (<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
            <path fill="#03A9F4" d="M6,10c0-2.209,1.791-4,4-4h28c2.209,0,4,1.791,4,4v28c0,2.209-1.791,4-4,4H10c-2.209,0-4-1.791-4-4V10z"></path><path fill="#020F16" d="M20.016,19.174h-2.002v4.434h1.973c0.547,0,0.97-0.179,1.27-0.537s0.449-0.879,0.449-1.563c0-0.71-0.153-1.274-0.459-1.694S20.53,19.181,20.016,19.174z"></path><path fill="#020F16" d="M9,9v30h30V9H9z M23.365,24.789C22.539,25.597,21.393,26,19.928,26h-1.914v5h-2.871V16.781h4.844c1.406,0,2.528,0.437,3.364,1.309s1.255,2.005,1.255,3.398S24.192,23.981,23.365,24.789z M32.682,30.336c-0.709,0.573-1.641,0.859-2.793,0.859c-0.775,0-1.459-0.151-2.051-0.454s-1.057-0.725-1.392-1.265s-0.503-1.123-0.503-1.748h2.627c0.014,0.481,0.125,0.843,0.337,1.084s0.558,0.361,1.04,0.361c0.742,0,1.113-0.335,1.113-1.006c0-0.234-0.112-0.451-0.337-0.649S30,27.052,29.225,26.713c-1.139-0.462-1.922-0.94-2.349-1.436s-0.64-1.11-0.64-1.846c0-0.925,0.334-1.688,1.001-2.29s1.552-0.903,2.651-0.903c1.158,0,2.086,0.3,2.783,0.898s1.045,1.403,1.045,2.412h-2.764c0-0.859-0.357-1.289-1.074-1.289c-0.293,0-0.533,0.091-0.723,0.273s-0.283,0.437-0.283,0.762c0,0.234,0.104,0.441,0.313,0.62s0.699,0.435,1.475,0.767c1.127,0.417,1.922,0.881,2.388,1.392s0.698,1.174,0.698,1.987C33.746,29.005,33.391,29.763,32.682,30.336z"></path>
          </svg>)
        },
        {
          name: "Adobe Illustrator", icon: (<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
            <path fill="#FF5722" d="M6,10c0-2.209,1.791-4,4-4h28c2.209,0,4,1.791,4,4v28c0,2.209-1.791,4-4,4H10c-2.209,0-4-1.791-4-4V10z"></path><path fill="#1C0802" d="M9,9v30h30V9H9z M23.691,31l-0.762-2.91h-3.916L18.252,31h-3.037l4.443-14.219h2.627L26.758,31H23.691z M30.85,31h-2.773V20.434h2.773V31z M30.552,18.754c-0.271,0.28-0.636,0.42-1.099,0.42s-0.828-0.14-1.099-0.42s-0.405-0.632-0.405-1.055c0-0.43,0.137-0.781,0.41-1.055s0.639-0.41,1.094-0.41s0.82,0.137,1.094,0.41s0.41,0.625,0.41,1.055C30.957,18.122,30.822,18.474,30.552,18.754z"></path><path fill="#1C0802" d="M19.639 25.697L22.295 25.697 20.967 20.629z"></path>
          </svg>)
        },
        {
          name: "CorelDRAW",
          icon: <img src="https://img.icons8.com/?size=96&id=9kTbRIN6cDXX&format=png" alt="CorelDRAW" style={{ width: "1em", height: "1em" }} />
        },
      ],
    },
    {
      title: "DevOps & Tools",
      description: "Tools for version control, deployment, and workflow",
      skills: [
        {
          name: "Git", icon: (<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
            <path fill="#F4511E" d="M42.2,22.1L25.9,5.8C25.4,5.3,24.7,5,24,5c0,0,0,0,0,0c-0.7,0-1.4,0.3-1.9,0.8l-3.5,3.5l4.1,4.1c0.4-0.2,0.8-0.3,1.3-0.3c1.7,0,3,1.3,3,3c0,0.5-0.1,0.9-0.3,1.3l4,4c0.4-0.2,0.8-0.3,1.3-0.3c1.7,0,3,1.3,3,3s-1.3,3-3,3c-1.7,0-3-1.3-3-3c0-0.5,0.1-0.9,0.3-1.3l-4-4c-0.1,0-0.2,0.1-0.3,0.1v10.4c1.2,0.4,2,1.5,2,2.8c0,1.7-1.3,3-3,3s-3-1.3-3-3c0-1.3,0.8-2.4,2-2.8V18.8c-1.2-0.4-2-1.5-2-2.8c0-0.5,0.1-0.9,0.3-1.3l-4.1-4.1L5.8,22.1C5.3,22.6,5,23.3,5,24c0,0.7,0.3,1.4,0.8,1.9l16.3,16.3c0,0,0,0,0,0c0.5,0.5,1.2,0.8,1.9,0.8s1.4-0.3,1.9-0.8l16.3-16.3c0.5-0.5,0.8-1.2,0.8-1.9C43,23.3,42.7,22.6,42.2,22.1z"></path>
          </svg>)
        },
        {
          name: "GitHub", icon: (<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
            <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
          </svg>)
        },
        { name: "cPanel", icon: <SiCpanel color="#FF6C2C" /> },
      ],
    },
    {
      title: "Professional Skills",
      description: "Practical skills applied during development and project execution",
      isDetailed: true,
      skills: [
        {
          name: "Problem Solving",
          icon: "🧩",
          desc: "Breaking down real-world problems into working solutions",
        },
        {
          name: "API Integration",
          icon: "🔗",
          desc: "Working with REST APIs using Postman and frontend apps",
        },
        {
          name: "Database Management",
          icon: "🗄️",
          desc: "Managing Supabase and handling Excel data imports",
        },
        {
          name: "AI Tools Usage",
          icon: "🤖",
          desc: "Using AI tools to accelerate development and coding",
        },
      ],
    },
  ];

  return (
    <section className="am-section-root">
      <div className="am-wrapper">
        {/* LEFT BOX */}
        <div className="am-left-box">
          <div className="yrs">1.8</div>
          <div className="yrs-experience">years of Working Experience</div>
        </div>

        {/* RIGHT BOX */}
        <div className="am-right-box">
          <h1 className="am-title">About Me</h1>
          <p className="am-intro">
            I'm Gopalakrishnan <br />
            <span className="accent-text">Frontend Web Developer</span>
          </p>
          <p className="am-text">
            Frontend Web Developer with professional experience since September
            2024 in designing and developing responsive web applications.
          </p>
          <div className="am-actions">
            <button className="btn btn-primary">Download CV</button>
            <button className="btn btn-outline talkbtn">Let's Talk</button>
          </div>
        </div>
      </div>

      {/* SKILLS SECTION */}
      <div className="am-skills-container">
        <div className="skills-main-title">Tools & Skills</div>

        <p className="skills-main-description">
          My expertise combines technical proficiency with professional skills,
          enabling me to deliver complete solutions while collaborating
          effectively with teams.
        </p>

        <div className="skills-grid-wrapper">
          {skillGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="skill-category">
              <h2>{group.title}</h2>
              <p className="category-description">{group.description}</p>

              <div
                className={`skills-list ${group.isDetailed ? "detailed-list" : "icon-list"
                  }`}
              >
                {group.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className={`skill-box ${group.isDetailed ? "detailed-box" : ""
                      }`}
                  >
                    <div className="skill-icon-wrap">{skill.icon}</div>

                    <div className="skill-content">
                      <h3>{skill.name}</h3>
                      {group.isDetailed && (
                        <p className="skill-desc">{skill.desc}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;