import React from "react";
import "../CSS/footer.css";

const Footer = () => {
    return (
        <footer className="footer-root">
            {/* Massive Background Text */}
            <div className="footer-big-text">
                <h1>KRISHNAN</h1>
            </div>

            <div className="footer-container">
                {/* LEFT */}
                <div className="footer-left">
                    <h2 className="brand-name">Krishna</h2>
                    <p className="sub-text">Hi, Im Gopalakrishnan Full Stack Developer. <br />Thanks for checking out my site!</p>
                </div>

                {/* CENTER */}
                <div className="footer-center">
                    <a href="#home">Home</a>
                    <a href="#projects">Projects</a>
                    <a href="#about">About</a>
                </div>

                {/* RIGHT */}
                <div className="footer-right">
                    <a href="mailto:yourmail@gmail.com">Email</a>
                    <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
                    <a href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
                </div>
            </div>

            <div className="footer-bottom">
                © {new Date().getFullYear()} Krishna. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;