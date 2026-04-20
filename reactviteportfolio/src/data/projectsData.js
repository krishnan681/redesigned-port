// export const dataSet = [
//   {
//     title: "Next Ventures",
//     bg: "NEXT",
//     desc: "A full-stack startup discovery platform built with Next.js 15, featuring Partial Pre-Rendering, GitHub OAuth authentication, and a Sanity CMS-powered content pipeline for pitches and founders.",
//     features: [
//       "Partial Pre-Rendering (PPR) for instant page loads",
//       "GitHub OAuth via NextAuth.js",
//       "Sanity Studio CMS for dynamic pitch content",
//       "Server Actions & live view counters",
//     ],
//     tech: ["Next.js 15", "React 19", "Sanity CMS", "NextAuth.js", "TypeScript", "Tailwind CSS"],
//     image: "https://picsum.photos/seed/101/800/600",
//   },
//   {
//     title: "Nova Mobile",
//     bg: "NOVA",
//     desc: "A cross-platform personal finance tracking app with animated charts, biometric authentication, and an offline-first architecture. Built in Flutter for both Android and iOS with a clean Material 3 design system.",
//     features: [
//       "Biometric login (fingerprint / Face ID)",
//       "Animated spending breakdown charts",
//       "Offline-first with Hive local storage",
//       "Adaptive dark/light theme",
//     ],
//     tech: ["Flutter", "Dart", "Android Studio", "Hive", "Provider", "Material 3"],
//     image: "https://picsum.photos/seed/102/800/600",
//   },
//   {
//     title: "CyberMesh",
//     bg: "CYBER",
//     desc: "A real-time decentralized networking dashboard with live node monitoring, smart contract interaction, and an integrated terminal. Rust powers the backend relay while a TypeScript frontend keeps latency under 50ms.",
//     features: [
//       "Live node health monitoring with WebSockets",
//       "Smart contract read/write via ethers.js",
//       "Built-in REPL terminal interface",
//       "Rust relay server for sub-50ms latency",
//     ],
//     tech: ["TypeScript", "Rust", "React", "WebSockets", "ethers.js", "Tailwind CSS"],
//     image: "https://picsum.photos/seed/103/800/600",
//   },
//   {
//     title: "FitPulse",
//     bg: "PULSE",
//     desc: "A health & workout companion app with adaptive training plans, native sensor integration (accelerometer, GPS), and offline workout logging. Designed with Flutter for seamless performance on both platforms.",
//     features: [
//       "Adaptive training plans via ML model",
//       "Native accelerometer & GPS integration",
//       "Offline-first workout session logging",
//       "Push notification reminders",
//     ],
//     tech: ["Flutter", "Dart", "Android Studio", "Firebase", "TensorFlow Lite", "Riverpod"],
//     image: "https://picsum.photos/seed/104/800/600",
//   },
// ];



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
    link: "https://book-novel.vercel.app/"
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
    link: "https://construction-brown-delta.vercel.app/"
  },
  // {
  //   title: "FitPulse",
  //   bg: "PULSE",
  //   cardDesc: "Smart health companion app with adaptive training.",
  //   desc: "A health & workout companion app with adaptive training plans, native sensor integration (accelerometer, GPS), and offline workout logging. Designed with Flutter for seamless performance on both platforms.",
  //   features: [
  //     "Adaptive training plans via ML model",
  //     "Native accelerometer & GPS integration",
  //     "Offline-first workout session logging",
  //     "Push notification reminders",
  //   ],
  //   tech: ["Flutter", "Dart", "Android Studio", "Firebase", "TensorFlow Lite", "Riverpod"],
  //   image: "https://picsum.photos/seed/104/800/600",
  //   imageMobile: "https://picsum.photos/seed/104/400/700",
  //   link: "https://your-fitpulse-url.com",
  // },
];