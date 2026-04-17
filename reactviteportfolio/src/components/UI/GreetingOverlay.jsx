import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../CSS/GreetingOverlay.css";

const GreetingOverlay = ({ onComplete }) => {
  const [greeting, setGreeting] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Determine time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning.");
    else if (hour < 18) setGreeting("Good afternoon.");
    else setGreeting("Good evening.");

    // Sequence timing
    const timer1 = setTimeout(() => {
      setIsVisible(false); // start fade out
    }, 2200);

    const timer2 = setTimeout(() => {
      onComplete(); // alert Layout that it's done so Navbar can show
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="greeting-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="greeting-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {greeting}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GreetingOverlay;
