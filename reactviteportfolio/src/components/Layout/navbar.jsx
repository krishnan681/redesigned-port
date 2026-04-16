import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../CSS/navbar.css";

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </svg>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <>
      <nav className="nav-wrapper">
        {/* Logo outside the glass bar */}
        <Link to="/" className="nav-logo-left">
          <div className="logo-box">G</div>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu} aria-label="Toggle menu">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Desktop Navigation */}
        <div className="glass-nav desktop-nav">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
          <NavLink to="/projects" className="nav-link">Projects</NavLink>
          <NavLink to="/links" className="nav-link">Contact Me</NavLink>
        </div>
      </nav>

      {/* Mobile Bottom Sheet & Overlay */}
      <div className={`sheet-overlay ${menuOpen ? "open" : ""}`} onClick={closeMenu}></div>
      
      <div className={`bottom-sheet ${menuOpen ? "open" : ""}`}>
        <div className="sheet-drag-handle" onClick={closeMenu}></div>
        
        <div className="sheet-bento-grid">
          {/* Main Navigation Block */}
          <div className="sheet-bento-card bento-nav">
            <NavLink to="/" className="sheet-nav-link" onClick={closeMenu}>Home</NavLink>
            <NavLink to="/about" className="sheet-nav-link" onClick={closeMenu}>About</NavLink>
            <NavLink to="/projects" className="sheet-nav-link" onClick={closeMenu}>Projects</NavLink>
            <NavLink to="/links" className="sheet-nav-link" onClick={closeMenu}>Contact Me</NavLink>
          </div>

          {/* Resume Block */}
          <a href="#" className="sheet-bento-card bento-resume" onClick={closeMenu}>
            <h3>Resume</h3>
            <p>View my CV</p>
            <div className="bento-arrow">↗</div>
          </a>

          {/* Social Blocks */}
          <div className="bento-socials-container">
            <a href="https://www.linkedin.com/in/gopalakrishnan-b-5357b4228/" target="_blank" rel="noreferrer" className="sheet-bento-card bento-social flex-center" onClick={closeMenu}>
              <LinkedInIcon />
            </a>
            <a href="https://github.com/krishnan681" target="_blank" rel="noreferrer" className="sheet-bento-card bento-social flex-center" onClick={closeMenu}>
              <GitHubIcon />
            </a>
            <a href="mailto:gopalakrishnan0614@gmail.com" className="sheet-bento-card bento-social flex-center" onClick={closeMenu}>
              <EmailIcon />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
