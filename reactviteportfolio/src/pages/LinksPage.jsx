import React, { useEffect } from "react";

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const socialLinks = [
    { name: "LinkedIn", url: "#", icon: "🔗", color: "#0077b5" },
    { name: "GitHub", url: "#", icon: "💻", color: "#333" },
    { name: "Twitter / X", url: "#", icon: "🐦", color: "#1DA1F2" },
    { name: "Email", url: "mailto:hello@example.com", icon: "✉️", color: "#ea4335" },
  ];

  const glassStyle = {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    padding: "24px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#050505", 
      color: "white", 
      fontFamily: "'Inter', sans-serif",
      padding: "120px 20px 40px",
      backgroundImage: "radial-gradient(circle at 50% -20%, #1a1a2e 0%, #050505 80%)"
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "700", marginBottom: "10px" }}>
          Get in Touch
        </h1>
        <p style={{ color: "#aaa", marginBottom: "50px" }}>
          Looking to collaborate on a project or just want to say hi? 
        </p>

        {/* Social Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", 
          gap: "20px" 
        }}>
          {socialLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={glassStyle} className="contact-card">
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "12px" }}>
                  {link.icon}
                </span>
                <h3 style={{ fontSize: "1.1rem", margin: "0" }}>{link.name}</h3>
              </div>
            </a>
          ))}
        </div>

        {/* Quick Contact Form Placeholder */}
        <div style={{ ...glassStyle, marginTop: "40px", textAlign: "left" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Drop a Message</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input 
              type="text" 
              placeholder="Your Name" 
              style={inputStyle} 
            />
            <textarea 
              placeholder="How can I help?" 
              rows="4" 
              style={inputStyle} 
            ></textarea>
            <button style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              alignSelf: "flex-start"
            }}>
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px",
  color: "white",
  outline: "none",
  boxSizing: "border-box"
};

export default ContactPage;