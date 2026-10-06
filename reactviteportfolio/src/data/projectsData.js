import conferconnect from "../assets/images/ConferConnect/ConferConnect.png";
import conferconnectMobile from "../assets/images/ConferConnect/Mobile_ConferConnect.png";

import BookNovel from "../assets/images/BookNovel/BookNovel.png";
import BookNovelMobile from "../assets/images/BookNovel/Mobile_BookNovel.png";

import InteriorDesigns from "../assets/images/InteriorDesigns/InteriorDesigns.png";
import InteriorDesignsMobile from "../assets/images/InteriorDesigns/Mobile_InteriorDesigns.png";

export const dataSet = [
  {
    title: "ConferConnect",
    bg: "CONFERENCE",
    cardDesc: "A complete conference management platform for events.",
    desc: "ConferConnect is a static and interactive web application designed to showcase the schedule, speakers, and services of a fictional conference. The project leverages modern web technologies to create an engaging user experience with smooth animations and responsive design.",
    features: [
      "Interactive conference schedule display system",
      "Speaker profiles with dynamic presentation",
      "User-friendly navigation and layout",
      "Bootstrap-based modern UI components",
    ],
    tech: ["HTML", "CSS", "JAVASCRIPT", "BOOTSTRAP"],
    image: conferconnect,
    imageMobile: conferconnectMobile,
    link: "https://conferconnect.netlify.app/",
  },
  {
    title: "Good Work, Secret Seven",
    bg: "BOOK EXPERIENCE",
    cardDesc: "A cinematic landing page for a classic mystery novel.",
    desc: "A visually rich and interactive landing page inspired by the book 'Good Work, Secret Seven' by Enid Blyton. The project transforms a traditional book summary into a modern storytelling experience, featuring immersive sections, smooth navigation, and engaging UI elements that highlight the plot, characters, and author legacy.",
    features: [
      "Fully responsive modern landing page design",
      "Interactive navigation with smooth scrolling",
      "Story-driven sections (hero, preview, highlights)",
      "Character showcase with structured profiles",
    ],
    tech: ["HTML", "CSS", "JAVASCRIPT"],
    image: BookNovel,
    imageMobile: BookNovelMobile,
    link: "https://book-novel.vercel.app/",
  },
  {
    title: "Havenly Spaces",
    bg: "INTERIOR DESIGN",
    cardDesc: "A premium interior design website with immersive animations.",
    desc: "Havenly Spaces is a visually rich interior design landing page that combines canvas-based animations with GSAP-powered scroll interactions to deliver a cinematic user experience. A high-end digital presence for a luxury interior brand.",
    features: [
      "Canvas-based animated hero section",
      "GSAP + ScrollTrigger powered scroll animations",
      "Horizontal scrolling design showcase",
      "Responsive layout using Bootstrap 5",
    ],
    tech: ["HTML", "CSS", "JAVASCRIPT", "BOOTSTRAP", "GSAP", "CANVAS API"],
    image: InteriorDesigns,
    imageMobile: InteriorDesignsMobile,
    link: "https://construction-brown-delta.vercel.app/",
  },
];