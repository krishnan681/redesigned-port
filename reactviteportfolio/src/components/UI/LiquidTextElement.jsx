import React, { useEffect, useRef } from 'react';
import { LiquidTextManager } from '../../utils/LiquidTextManager';

const LiquidTextElement = () => {
  const canvasRef = useRef(null);
  const managerRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // The two messages to be shown
    const text1 = "Your vision, my code — let’s\nturn static concepts into\ninteractive experiences";
    const text2 = "Let's take your concepts from\na simple sketch and bring\nthem to the browser";

    const formattedText1 = text1.replace(/\n/g, '<br />');
    const formattedText2 = text2.replace(/\n/g, '<br />');

    const getFontSize = () => {
      const w = window.innerWidth;
      if (w < 480) return 28;
      if (w < 768) return 42;
      if (w < 1024) return 38;
      return 60;
    };

    managerRef.current = new LiquidTextManager(
      canvasRef.current,
      formattedText1,
      formattedText2,
      {
        fontSize: getFontSize(),
        fontFamily1: "'Chakra Petch', sans-serif",
        fontFamily2: "'Playfair Display', serif",
        autoPeriod: 12.0, // Adjust this number to slow down (higher) or speed up (lower)
      }
    );

    const handleMouseMove = (e) => {
      if (managerRef.current) {
        managerRef.current.updatePointer(e.clientX, e.clientY);
      }
    };

    const handleResize = () => {
      if (managerRef.current) {
        managerRef.current.setSize(getFontSize());
      }
    };

    const handleTouchMove = (e) => {
      if (managerRef.current && e.touches[0]) {
        managerRef.current.updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      if (managerRef.current) {
        managerRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="liquid-text-container">
      <canvas
        ref={canvasRef}
        className="liquid-text-canvas"
      />
      {/* Fallback for SEO/Accessibility */}
      <h1 className="hero-title-hidden" style={{
        position: 'absolute',
        opacity: 0,
        pointerEvents: 'none',
        zIndex: -1
      }}>
        Let’s take your concepts out of the sketchbook and into the browser
      </h1>
    </div>
  );
};

export default LiquidTextElement;
