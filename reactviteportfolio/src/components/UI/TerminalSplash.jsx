import { useEffect, useState, useRef } from "react";
import "../../CSS/UI-CSS/terminal.css";

const lines = [
  "Initializing portfolio...",
  "Loading components...",
  "Setting up experience...",
  "Fetching projects...",
  "Ready",
];

const TerminalSplash = ({ onFinish }) => {
  const [displayedText, setDisplayedText] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false); // 👈 NEW

  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/typing.mp3");
    audioRef.current.volume = 0.2;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      setTimeout(() => {
        setFadeOut(true); // 👈 trigger fade
        setTimeout(onFinish, 500); // wait for fade
      }, 500);
      return;
    }

    if (charIndex < lines[lineIndex].length) {
      const timeout = setTimeout(() => {
        setCurrentLine((prev) => prev + lines[lineIndex][charIndex]);
        setCharIndex((prev) => prev + 1);

        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }

        const totalChars = lines.join("").length;
        const typedChars =
          lines.slice(0, lineIndex).join("").length + charIndex;

        setProgress(Math.floor((typedChars / totalChars) * 100));
      }, 25);

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => [...prev, currentLine]);
        setCurrentLine("");
        setCharIndex(0);
        setLineIndex((prev) => prev + 1);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [charIndex, lineIndex, currentLine, onFinish]);

  return (
    <div className={`terminal-wrapper ${fadeOut ? "fade-out" : ""}`}>

      <div className="terminal-box">
        <div className="terminal-header">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>

        {displayedText.map((line, i) => (
          <div key={i} className="terminal-line">
            {line}
          </div>
        ))}

        <div className="terminal-line">
          {currentLine}
          <span className="cursor">|</span>
        </div>
      </div>

      {/* FULL WIDTH LINE */}
      <div className="progress-line">
        <div
          className="progress-line-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* % */}
      <div className="progress-outside">{progress}%</div>

    </div>
  );
};

export default TerminalSplash;