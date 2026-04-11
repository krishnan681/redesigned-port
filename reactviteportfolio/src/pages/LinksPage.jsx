import React, { useState, useEffect, useRef } from "react";
import "../CSS/LinksPage.css";

/* ─── Social link data ──────────────────────────────────────── */
const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/gopalakrishnan-b-5357b4228/",
    bg: "#dbeafe",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="#1d4ed8">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com/krishnan681",
    bg: "#ede9fe",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="#5b21b6">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },

  {
    name: "Email",
    url: "mailto:gopalakrishnan0614@gmail.com",
    bg: "#fce7f3",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9d174d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 7L2 7" />
      </svg>
    ),
  },
];

/* ─── Particle config (generated once) ─────────────────────── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 5.5) % 90}%`,
  duration: `${12 + (i * 1.3) % 18}s`,
  delay: `-${(i * 1.1) % 20}s`,
  size: i % 3 === 0 ? 3 : 2,
  opacity: 0.2 + (i % 5) * 0.08,
}));

/* ─── Icons ─────────────────────────────────────────────────── */
const SendIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

/* ─── Component ─────────────────────────────────────────────── */
const INITIAL_FORM = { name: "", message: "" };

const ContactPage = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState("");
  const glowRef = useRef(null);

  /* Track cursor for glow */
  useEffect(() => {
    const onMove = (e) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSend = async () => {
    const { name, message } = form;
    setErrMsg("");

    if (!name.trim() || !message.trim()) {
      setStatus("error");
      setErrMsg("Please fill in both fields.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      setErrMsg(err.message || "Failed to send. Please try again.");
      setStatus("error");
    }
  };

  const isBusy = status === "loading";

  return (
    <div className="contact-page">

      {/* ── Animated background ── */}
      <div className="bg-canvas">
        <div className="bg-grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>

      {/* ── Floating particles ── */}
      <div className="particles">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* ── Cursor glow ── */}
      <div className="cursor-glow" ref={glowRef} />

      {/* ── Content ── */}
      <div className="contact-content">

        <p className="contact-eyebrow">Get in touch</p>
        <h1 className="contact-headline">
          Let's build something <span>together</span>
        </h1>
        <p className="contact-sub">
          Have a project in mind or just want to say hi?
          I'd love to hear from you.
        </p>

        {/* Social grid */}
        <div className="social-grid">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="soc-btn"
            >
              <div className="soc-icon-wrap" style={{ background: link.bg }}>
                {link.icon}
              </div>
              <span className="soc-label">{link.name}</span>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="section-divider">
          <span>or send a message</span>
        </div>

        {/* Form card */}
        <div className="form-card">
          <p className="form-card-title">Drop a message</p>

          <div className="field-group">
            <div className="field">
              <label className="field-label">Your name</label>
              <input
                className="field-input"
                name="name"
                type="text"
                placeholder="Jane Smith"
                value={form.name}
                onChange={handleChange}
                disabled={isBusy}
              />
            </div>
            <div className="field">
              <label className="field-label">Message</label>
              <textarea
                className="field-textarea"
                name="message"
                placeholder="How can I help?"
                value={form.message}
                onChange={handleChange}
                disabled={isBusy}
              />
            </div>
          </div>

          <div className="form-footer">
            {status === "error" && (
              <p className="form-feedback error">⚠ {errMsg}</p>
            )}
            {status === "success" && (
              <p className="form-feedback success">
                Message sent — I'll be in touch soon.
              </p>
            )}
            {(status === "idle" || status === "loading") && (
              <p className="form-footnote">Usually responds within 24 hours.</p>
            )}

            <button
              className="send-btn"
              onClick={handleSend}
              disabled={isBusy}
            >
              <SendIcon />
              <span>{isBusy ? "Sending…" : "Send message"}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;