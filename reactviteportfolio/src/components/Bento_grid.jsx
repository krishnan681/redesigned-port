import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Lottie from "lottie-react";
import LightRays from "../components/UI/LightRays";
import RobotSaludando from "../assets/lottie/RobotSaludando.json";
import ProfilePhoto from "../assets/images/profile.png"; // ← replace with your actual image path
import "../CSS/BentoGrid.css";

import { useState } from "react";

import ConnectModal from "./UI/ConnectModal";


/* ─── INLINE SVG TECH ICONS (accurate brand logos) ──────── */
const TechIcons = {
  HTML: (
    <svg viewBox="0 0 452 520" xmlns="http://www.w3.org/2000/svg">
      <path d="M41.1 460.9L0 0h452l-41.1 460.8-184.9 51z" fill="#e34f26" />
      <path d="M226 472.6l149.4-41.5 35.1-393.2H226z" fill="#ef652a" />
      <path d="M226 208H122.4l-7.6-84.8H226V41.8H45.9l2 21.6 20.4 228.2H226zm0 147.2l-.3.1-79.9-21.6-5.1-57.3H58.8l10 111.7 157.1 43.6.1-.2z" fill="#fff" />
      <path d="M226 208v81.8h71.9l-6.8 75.8-65.1 17.6v84.9l157.2-43.6.2-2 24.3-272.5H226zm0-166.2v81.4h135.2l1.1-12.3 2.5-27.8 1.3-14.2H226z" fill="#ebebeb" />
    </svg>
  ),
  CSS: (
    <svg viewBox="0 0 452 520" xmlns="http://www.w3.org/2000/svg">
      <path d="M41.1 460.9L0 0h452l-41.1 460.8-184.9 51z" fill="#0d73bb" />
      <path d="M226 472.6l149.4-41.5 35.1-393.2H226z" fill="#1a86c6" />
      <path d="M226 289H123.3l-3.6-40.9H226v-41.8H78.2l1 11.3 10.5 118.1H226zm0-126.6v41.8H82.9l-3.7-41.8H226zM226 382.9l-.3.1-79.4-21.5-5.1-56.7H99.4l10.1 112.1 116.4 32.3.1-.2z" fill="#fff" />
      <path d="M226 289v41.8h69.3l-6.5 73.1-62.8 17v42l116.4-32.2 .9-9.6 13.3-148.1H226zm0-126.6v41.8h134.3l1.1-12.3 2.5-27.9 1.3-1.6H226z" fill="#ebebeb" />
    </svg>
  ),
  Bootstrap: (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="24" fill="#7952B3" />
      <path d="M37 29h33.6c7.3 0 12.9 1.9 16.5 5.4 3.1 2.9 4.7 6.7 4.7 11.3 0 3.5-.9 6.5-2.7 8.9-1.1 1.5-2.7 2.9-4.7 4 3.2 1 5.7 2.7 7.4 5.1 1.8 2.5 2.7 5.6 2.7 9.4 0 3.6-.9 6.8-2.7 9.5-1.1 1.8-2.7 3.2-4.6 4.4-2.1 1.3-4.6 2.2-7.4 2.6-2.9.5-6 .7-9.4.7H37V29zm18.7 25.2h12.4c3.5 0 5.8-.6 7.1-1.8 1.3-1.2 1.9-2.9 1.9-5.1 0-2.1-.6-3.7-1.9-4.9-1.3-1.2-3.6-1.7-7-1.7H55.7v13.5zm0 26.3h14.5c3.7 0 6.3-.7 7.8-2 1.5-1.3 2.2-3.2 2.2-5.6 0-2.3-.8-4.1-2.3-5.4-1.5-1.3-4.1-1.9-7.8-1.9H55.7v14.9z" fill="#fff" />
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 38 57" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 28.5A9.5 9.5 0 0 1 28.5 19 9.5 9.5 0 0 1 38 28.5 9.5 9.5 0 0 1 28.5 38 9.5 9.5 0 0 1 19 28.5z" fill="#1abcfe" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5A9.5 9.5 0 0 1 9.5 57 9.5 9.5 0 0 1 0 47.5z" fill="#0acf83" />
      <path d="M19 0v19h9.5A9.5 9.5 0 0 0 28.5 0H19z" fill="#ff7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#f24e1e" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#a259ff" />
    </svg>
  ),
  React: (
    <svg viewBox="-11.5 -10.232 23 20.463" xmlns="http://www.w3.org/2000/svg">
      <circle r="2.05" fill="#61dafb" />
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  "React Native": (
    <svg viewBox="-11.5 -10.232 23 20.463" xmlns="http://www.w3.org/2000/svg">
      <circle r="2.05" fill="#61dafb" />
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  Git: (
    <svg viewBox="0 0 97 97" xmlns="http://www.w3.org/2000/svg">
      <path d="M92.71 44.408L52.591 4.29c-2.31-2.311-6.057-2.311-8.369 0l-8.33 8.332 10.566 10.566c2.454-.83 5.272-.273 7.229 1.685 1.969 1.97 2.521 4.81 1.67 7.275l10.186 10.185c2.465-.85 5.307-.3 7.275 1.671 2.75 2.75 2.75 7.206 0 9.958-2.752 2.751-7.208 2.751-9.961 0-2.068-2.07-2.58-5.11-1.531-7.658l-9.5-9.499v24.997c.67.332 1.303.774 1.854 1.328 2.75 2.75 2.75 7.206 0 9.959-2.749 2.749-7.208 2.749-9.954 0-2.75-2.753-2.75-7.209 0-9.959.68-.679 1.467-1.193 2.307-1.537V36.332c-.84-.344-1.625-.858-2.307-1.537-2.083-2.082-2.584-5.14-1.516-7.698L31.798 16.53 4.289 44.041c-2.311 2.311-2.311 6.058 0 8.369l40.118 40.118c2.311 2.311 6.055 2.311 8.369 0L92.71 52.779c2.311-2.311 2.311-6.067 0-8.371z" fill="#f05033" />
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f" />
    </svg>
  ),
  Expo: (
    <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <circle cx="128" cy="128" r="128" fill="#000020" />
      <path d="M54.8 167.2c-2.1 3.6-1.7 8 1.1 10.3 2.7 2.2 6.7 1.6 9.8-1.5l62.3-68.3 62.3 68.3c3.1 3.1 7.1 3.7 9.8 1.5 2.8-2.3 3.2-6.7 1.1-10.3L128 88.8 54.8 167.2z" fill="#fff" />
    </svg>
  ),
  Postman: (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#ff6c37" />
      <path d="M20.3 9.3c-3.7-1.7-8-.1-9.7 3.6s-.1 8 3.6 9.7 8 .1 9.7-3.6.1-8-3.6-9.7zm-6.5 12.1c-3-.9-4.7-4.1-3.8-7.1.7-2.3 2.7-3.9 5-4.1l-5.2 5.2 1.4 1.4 5.2-5.2c.2 2.3-1.1 4.5-3.3 5.5l.7-2.3-1.5-.5-1 3.5 3.5 1 .5-1.5-2.3-.7c2.4-1.3 3.9-3.8 3.8-6.5l2 2-1.1 1.1 1.1 1.1 2.5-2.5-3.7-3.7c3 .9 4.7 4.1 3.8 7.1-.7 2.4-2.8 4-5.1 4.2l1.5-1.5-1.1-1.1z" fill="#fff" />
    </svg>
  ),
  Supabase: (
    <svg viewBox="0 0 109 113" xmlns="http://www.w3.org/2000/svg">
      <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874l-43.151 54.347z" fill="url(#supabase_a)" />
      <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874l-43.151 54.347z" fill="url(#supabase_b)" fillOpacity=".2" />
      <path d="M45.317 2.071C48.178-1.53 53.976.443 54.045 5.041l.753 67.251H9.578c-8.19 0-12.758-9.46-7.665-15.875L45.317 2.071z" fill="#3ecf8e" />
      <defs>
        <linearGradient id="supabase_a" x1="53.974" y1="54.974" x2="94.163" y2="71.829" gradientUnits="userSpaceOnUse">
          <stop stopColor="#249361" />
          <stop offset="1" stopColor="#3ecf8e" />
        </linearGradient>
        <linearGradient id="supabase_b" x1="36.156" y1="30.578" x2="54.48" y2="65.081" gradientUnits="userSpaceOnUse">
          <stop />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),
  Auth0: (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="64" fill="#eb5424" />
      <path d="M82.5 37H45.5L34 64l11.5 27h37L96 64zm-17.3 43.7L54.8 64l10.4-16.7L75.2 64zm-21.6 0L35.8 64l7.8-10.7 6.6 10.7-6.6 10.7zm6.6-21.4L44.5 48.8l10.7.6zm15 21.4l6.6-10.7-6.6-10.7-6.6 10.7zm6.6-21.4l-6.6-5.1 6.6-.6z" fill="#fff" />
    </svg>
  ),
  Photoshop: (
    <svg viewBox="0 0 240 234" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.3 0h207.4C232.7 0 240 7.3 240 16.3v201.4c0 9-7.3 16.3-16.3 16.3H16.3C7.3 234 0 226.7 0 217.7V16.3C0 7.3 7.3 0 16.3 0z" fill="#001e36" />
      <path d="M54.5 164.3V61.5c0-.7.3-1.1 1-1.1 1.7 0 3.3 0 5.6-.1 2.4-.1 4.9-.1 7.6-.2 2.7-.1 5.6-.1 8.6-.2 3-.1 5.9-.1 8.7-.1 8.1 0 14.8 1 20.1 3 4.7 1.6 9 4.4 12.4 8 3 3.3 5.2 7.2 6.5 11.4 1.2 4.1 1.9 8.4 1.8 12.7 0 8.8-2 15.8-6 21-4 5.2-9.3 9.1-15.4 11.1-6.4 2.2-13.1 3.2-19.8 3.1-2.1 0-3.5 0-4.4-.1-.8-.1-2-.1-3.3-.1v34.3c.1.8-.5 1.5-1.3 1.6h-21c-.8 0-1.1-.4-1.1-1.3zm22.4-82.5v30.7c1.1.1 2.1.2 3 .2h4.2c3.2 0 6.3-.4 9.4-1.3 2.7-.7 5.1-2.1 7.1-4 1.9-1.9 2.8-4.7 2.8-8.4.1-2.8-.6-5.5-1.9-7.9-1.4-2.2-3.4-3.9-5.8-4.8-3.2-1.2-6.5-1.7-9.9-1.6-2.3 0-4.3 0-5.8.1-1.6 0-2.6.1-3.1.1v-3.1zm82.8 3.6c-3.2-1.6-6.6-2.7-10.1-3.3-3.8-.7-7.7-1.1-11.6-1.1-2.2 0-4.4.2-6.5.6-1.5.3-2.9.7-4.3 1.3-.9.4-1.7 1-2.3 1.8-.5.6-.7 1.4-.7 2.2 0 1 .4 2 1.1 2.7 1 1.1 2.3 2 3.7 2.6 1.9.9 3.9 1.7 5.9 2.4 2.1.7 4.3 1.5 6.7 2.3 3.4 1.1 6.7 2.5 9.9 4.1 2.8 1.4 5.3 3.2 7.5 5.4 2 2.1 3.5 4.5 4.5 7.2 1 2.9 1.5 6.2 1.5 9.8.1 5.1-1.1 10.2-3.4 14.8-2.3 4.3-5.6 7.9-9.7 10.4-4.3 2.7-9 4.5-14 5.4-5.4 1-10.9 1.5-16.4 1.5-4.5 0-9-.3-13.4-1-3.6-.5-7.1-1.3-10.5-2.4-.7-.3-1.1-.9-1.1-1.7v-19c0-.4.2-.8.5-1 .4-.2.8-.1 1.2.1 3.9 2.1 8 3.6 12.3 4.4 4.1.9 8.3 1.3 12.5 1.3 4.3 0 7.4-.5 9.3-1.5 1.8-.9 2.9-2.8 2.8-4.8 0-1.3-.5-2.6-1.4-3.5-1.1-1.2-2.5-2.1-4-2.7-2-.9-4-1.7-6.1-2.4l-5.8-1.9c-3.2-1-6.3-2.3-9.3-3.9-2.6-1.4-5-3.2-7-5.4-1.9-2.1-3.4-4.6-4.3-7.2-1-3-1.5-6.1-1.5-9.3-.1-4.8 1-9.6 3.2-13.9 2.2-4.1 5.2-7.6 9-10.2 4-2.8 8.5-4.8 13.3-5.9 5.2-1.2 10.5-1.8 15.9-1.8 4.2 0 8.4.3 12.5.9 3.1.4 6.1 1.1 9.1 2 .6.2 1.1.5 1.5.9.3.5.4 1 .4 1.5v18c0 .4-.2.8-.5 1-.5.1-1 .1-1.5-.2z" fill="#31a8ff" />
    </svg>
  ),
};

/* ─── ACCENT COLORS PER TECH ──────────────────────────────── */
const techColors = {
  HTML: { bg: "#ffffff", border: "rgba(227,79,38,0.32)", text: "#1f2937" },
  CSS: { bg: "#ffffff", border: "rgba(21,114,182,0.32)", text: "#1f2937" },
  Bootstrap: { bg: "#ffffff", border: "rgba(121,82,179,0.32)", text: "#1f2937" },
  Figma: { bg: "#ffffff", border: "rgba(162,89,255,0.28)", text: "#1f2937" },
  React: { bg: "#ffffff", border: "rgba(97,218,251,0.28)", text: "#1f2937" },
  "React Native": { bg: "#ffffff", border: "rgba(97,218,251,0.28)", text: "#1f2937" },
  Git: { bg: "#ffffff", border: "rgba(240,80,50,0.32)", text: "#1f2937" },
  GitHub: { bg: "#ffffff", border: "rgba(255,255,255,0.18)", text: "#1f2937" },
  Expo: { bg: "#ffffff", border: "rgba(255,255,255,0.15)", text: "#1f2937" },
  Postman: { bg: "#ffffff", border: "rgba(255,108,55,0.32)", text: "#1f2937" },
  Supabase: { bg: "#ffffff", border: "rgba(62,207,142,0.30)", text: "#1f2937" },
  Auth0: { bg: "#ffffff", border: "rgba(235,84,36,0.32)", text: "#1f2937" },
  Photoshop: { bg: "#ffffff", border: "rgba(49,168,255,0.30)", text: "#1f2937" },
};

/* ─── TECH STACK DATA ─────────────────────────────────────── */
const techItems = [
  { name: "HTML" }, { name: "CSS" }, { name: "Bootstrap" },
  { name: "Figma" }, { name: "React" }, { name: "React Native" },
  { name: "Git" }, { name: "GitHub" }, { name: "Expo" },
  { name: "Postman" }, { name: "Supabase" }, { name: "Auth0" },
  { name: "Photoshop" },
];

/* ─── CERTIFICATION DATA ──────────────────────────────────── */
const certifications = [
  { id: 1, title: "Frontend Professional", issuer: "Meta", year: "2024" },
  { id: 2, title: "UI/UX Design Specialist", issuer: "Google", year: "2023" },
  { id: 3, title: "Full Stack Development", issuer: "Internshala", year: "2023" },
  { id: 4, title: "Responsive Web Design", issuer: "freeCodeCamp", year: "2023" },
  { id: 5, title: "JavaScript Mastery", issuer: "Udemy", year: "2024" },
];

/* ─── CHECK ICON ──────────────────────────────────────────── */
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

/* ─── TECH PILL COMPONENT ─────────────────────────────────── */
const TechPill = ({ name }) => {
  const icon = TechIcons[name];
  const color = techColors[name] || {
    bg: "rgba(139,92,246,0.1)",
    border: "rgba(139,92,246,0.3)",
    text: "#a78bfa",
  };

  return (
    <div className="tech-pill" style={{ background: color.bg, borderColor: color.border }}>
      {icon && (
        <span className="tech-pill-icon" aria-hidden="true">
          {React.cloneElement(icon, {
            style: { width: 15, height: 15, flexShrink: 0, display: "block" },
          })}
        </span>
      )}
      <span style={{ color: color.text }}>{name}</span>
    </div>
  );
};

/* ─── HORIZONTAL CERT CAROUSEL ────────────────────────────── */
const HorizontalCarousel = () => (
  <div className="carousel-horizontal-container">
    <div className="carousel-horizontal-track">
      {[...certifications, ...certifications].map((cert, i) => (
        <div className="cert-card-horizontal" key={`${cert.id}-${i}`}>
          <span className="cert-year">{cert.year}</span>
          <div className="cert-info">
            <h3>{cert.title}</h3>
            <p>{cert.issuer}</p>
          </div>
          <div className="cert-icon"><CheckIcon /></div>
        </div>
      ))}
    </div>
  </div>
);

/* ─── 3D TILT CARD ────────────────────────────────────────── */
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 22 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      className={`bento-item ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="tilt-inner" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
};



/* ─── MAIN SECTION ────────────────────────────────────────── */
const BentoGridSection = () => {
const [showModal, setShowModal] = useState(false);

  

  return(
  <section id="about" className="bento-grid-section">
    <div className="bento-container">

      {/* BENTO E: PROFILE PHOTO — NEW FIRST CARD */}
      <TiltCard className="bento-e">
        <div className="bento-e-content">
          <div className="bento-e-photo-wrap">
            <img
              src={ProfilePhoto}
              alt="Profile"
              className="bento-e-photo"
            />

          </div>
          <div className="bento-e-meta">
            <span className="bento-e-name">Gopalakrishnan</span>
            <span className="bento-e-role">Frontend Web Developer</span>
          </div>
        </div>
        {/* Decorative blobs */}
        <div className="bento-e-blob bento-e-blob-1" />
        <div className="bento-e-blob bento-e-blob-2" />
      </TiltCard>

      {/* BENTO A: IDENTITY */}
      <TiltCard className="bento-a">
        <div className="bento-a-content">
          <span className="badge">Collaboration First</span>
          <h2>I prioritize client communication&nbsp;&amp; open feedback loops.</h2>
          <p className="bento-subtitle">Based in India — building for the world.</p>
        </div>
        <div className="bento-a-lottie">
          <Lottie animationData={RobotSaludando} loop autoplay />
        </div>
      </TiltCard>

      {/* BENTO B: MANIFESTO + CERTS */}
      <TiltCard className="bento-b">
        <div className="bento-b-inner">
          <p className="gradient-text">
            &lt; <span className="highlight">Frontend Developer</span> crafting
            immersive digital experiences. Merging technical performance with
            aesthetic precision to build the&nbsp;
            <span className="highlight">future of web interfaces</span>. /&gt;
          </p>
          <div className="certifications-section-horizontal">
            <span className="cert-heading">Certifications &amp; Credentials</span>
            <HorizontalCarousel />
          </div>
        </div>
      </TiltCard>

      {/* BENTO C: CURRENT PROJECT + TECH MARQUEE */}
      <TiltCard className="bento-c">
        <div className="bento-c-rays">
          <LightRays raysColor="#8b5cf6" raysSpeed={0.8} />
        </div>
        <div className="bento-c-content">
          <div className="bento-c-text">
            <span className="bento-c-label">Current Project</span>
            <h2>Building a Directory Website</h2>
            <p>Scalable architecture, modular components, performance-first development.</p>
            <span className="bento-c-status">In progress</span>
          </div>

          <div className="tech-marquee">
            <div className="tech-row move-right">
              {[...techItems, ...techItems].map((item, i) => (
                <TechPill key={`r1-${i}`} name={item.name} />
              ))}
            </div>
            <div className="tech-row move-left">
              {[...techItems, ...techItems].reverse().map((item, i) => (
                <TechPill key={`r2-${i}`} name={item.name} />
              ))}
            </div>
          </div>
        </div>
      </TiltCard>

      {/* BENTO D: CTA */}
      <TiltCard className="bento-d">
        <div className="bento-d-content">
          <p className="bento-d-headline">
            Let's build something <span>remarkable</span> together.
          </p>
          <p className="bento-d-sub">
            Open to freelance projects, full-time roles, and creative collabs.
          </p>
          {/* <a href="#contact" className=""></a> */}
          <button className="cta-button" onClick={() => setShowModal(true)}>
            Start a conversation
            <span className="arrow" />
          </button>

          <span className="avail-badge">Available for work</span>
        </div>
      </TiltCard>

      {showModal && <ConnectModal onClose={() => setShowModal(false)} />}
    </div>
  </section>
  );
};
export default BentoGridSection;











// import "../CSS/BentoGrid.css";
// import bentoImg from "../assets/images/bento-a.png";

// const BentoGrid = () => {
//   return (
//     <div className="bento-container">

//       {/* LEFT CARD */}
//       <div className="bento-card card-1">
//         <h2>
//           Parth <span>Sharma</span>
//         </h2>
//         <p>Noida, IN • 06:20 PM</p>

//         <div className="card-image">
//           <img src={bentoImg} alt="visual" />
//         </div>
//       </div>

//       {/* CENTER TOP */}
//       <div className="bento-card card-2">
//         <p className="tag">DETAIL-DRIVEN UI</p>
//         <h1>
//           Interfaces <br />
//           <span>you can feel.</span>
//         </h1>
//         <p className="desc">
//           I sweat spacing, timing, and feedback — the tiny stuff.
//         </p>
//       </div>

//       {/* RIGHT CARD */}
//       <div className="bento-card card-3">
//         <div className="status">● Available for work</div>
//         <h2>
//           LET'S BUILD SOMETHING <br />
//           <span>that actually works.</span>
//         </h2>

//         <button className="connect-btn">Connect Now →</button>
//       </div>

//       {/* BOTTOM LEFT */}
//       <div className="bento-card card-4">
//         <h3>Adaptable across time zones</h3>
//         <p>Available globally</p>
//       </div>

//       {/* CENTER BIG CLOCK (fake visual) */}
//       <div className="bento-card card-5">
//         <div className="clock-circle"></div>
//       </div>

//       {/* BOTTOM RIGHT */}
//       <div className="bento-card card-6">
//         <h3>Projects</h3>
//         <p>Interactive, modern, scalable builds.</p>
//       </div>

//     </div>
//   );
// };

// export default BentoGrid;