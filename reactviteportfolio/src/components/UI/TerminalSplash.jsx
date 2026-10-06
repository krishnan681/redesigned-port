import { useEffect, useState } from "react";
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
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Prevent touch scrolling during splash overlay
    const handleTouchMove = (e) => {
      if (!fadeOut) e.preventDefault();
    };
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [fadeOut]);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      const exitTimer = setTimeout(() => {
        setFadeOut(true);
        // Wait for exit transition to complete before unmounting
        const finishTimer = setTimeout(() => {
          onFinish?.();
          window.dispatchEvent(new Event("resize"));
        }, 800);
        return () => clearTimeout(finishTimer);
      }, 400);
      return () => clearTimeout(exitTimer);
    }

    if (charIndex < lines[lineIndex].length) {
      const timeout = setTimeout(() => {
        setCurrentLine((prev) => prev + lines[lineIndex][charIndex]);
        setCharIndex((prev) => prev + 1);

        const totalChars = lines.join("").length;
        const typedChars =
          lines.slice(0, lineIndex).join("").length + charIndex + 1;

        setProgress(Math.min(100, Math.floor((typedChars / totalChars) * 100)));
      }, 22);

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => [...prev, currentLine]);
        setCurrentLine("");
        setCharIndex(0);
        setLineIndex((prev) => prev + 1);
      }, 220);

      return () => clearTimeout(timeout);
    }
  }, [charIndex, lineIndex, currentLine, onFinish]);

  return (
    <aside
      className={`terminal-wrapper ${fadeOut ? "fade-out" : ""}`}
      aria-label="Loading sequence"
      role="status"
    >
      <div className="terminal-box">
        <div className="terminal-header">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
          <span className="terminal-header-title">system-init</span>
        </div>

        <div className="terminal-content">
          {displayedText.map((line, i) => (
            <div key={i} className="terminal-line">
              <span className="terminal-prompt">&gt;</span> {line}
            </div>
          ))}

          {lineIndex < lines.length && (
            <div className="terminal-line active">
              <span className="terminal-prompt">&gt;</span> {currentLine}
              <span className="cursor">█</span>
            </div>
          )}
        </div>
      </div>

      {/* FULL WIDTH PROGRESS BAR */}
      <div className="progress-line">
        <div
          className="progress-line-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* PERCENTAGE BADGE */}
      <div className="progress-outside">{progress}%</div>
    </aside>
  );
};

export default TerminalSplash;