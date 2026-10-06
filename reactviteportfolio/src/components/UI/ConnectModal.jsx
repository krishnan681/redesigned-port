import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "../../CSS/UI-CSS/ConnectModal.css";

const ConnectModal = ({ onClose }) => {
  const [inputVal, setInputVal] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  const [emailError, setEmailError] = useState("");
  const [inputError, setInputError] = useState("");

  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "You",
      text: "Hey, I have a project idea!",
      type: "user",
    },
    {
      sender: "Gopalakrishnan",
      text: "Sounds great, tell me more…",
      type: "them",
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const isValidEmail = (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSend = async () => {
    if (isSending) return;

    let valid = true;

    if (!userEmail.trim()) {
      setEmailError("Email is required.");
      emailRef.current?.focus();
      valid = false;
    } else if (!isValidEmail(userEmail)) {
      setEmailError("Enter a valid email address.");
      emailRef.current?.focus();
      valid = false;
    }

    if (!inputVal.trim()) {
      setInputError("Message cannot be empty.");
      if (valid) inputRef.current?.focus();
      valid = false;
    }

    if (!valid) return;

    const trimmedMessage = inputVal.trim();

    setMessages((prev) => [
      ...prev,
      {
        sender: userName.trim() || "You",
        text: trimmedMessage,
        type: "user",
      },
    ]);

    setInputVal("");
    setIsTyping(true);
    setIsSending(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName.trim(),
          email: userEmail.trim(),
          message: trimmedMessage,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      setTimeout(() => {
        setIsTyping(false);

        setMessages((prev) => [
          ...prev,
          {
            sender: "Gopalakrishnan",
            text: "Message received! I'll get back to you soon 🚀",
            type: "them",
          },
        ]);
      }, 900);
    } catch (err) {
      setIsTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          sender: "Gopalakrishnan",
          text: "Something went wrong. Please try again later.",
          type: "them",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return createPortal(
    <div className="cm-overlay" onClick={handleOverlayClick}>
      <div
        className="cm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="connect-modal-title"
      >
        {/* HEADER */}
        <div className="cm-header">
          <p className="cm-title" id="connect-modal-title">
            Let's build something together
          </p>

          <button
            className="cm-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="cm-bento">
          {/* CHAT CARD */}
          <div className="cm-card cm-card-chat">
            <div className="cm-fields">
              <input
                type="text"
                className="cm-input"
                placeholder="Your name (optional)"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />

              <div className="cm-field-wrap">
                <input
                  ref={emailRef}
                  type="email"
                  className={`cm-input ${
                    emailError ? "cm-input-error" : ""
                  }`}
                  placeholder="Your email *"
                  value={userEmail}
                  onChange={(e) => {
                    setUserEmail(e.target.value);
                    setEmailError("");
                  }}
                />

                {emailError && (
                  <p className="cm-error">{emailError}</p>
                )}
              </div>
            </div>

            {/* CHAT */}
            <div className="cm-chat-messages">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`cm-msg cm-msg-${msg.type}`}
                >
                  <span className="cm-msg-label">
                    {msg.sender}
                  </span>

                  <div className="cm-bubble">
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="cm-msg cm-msg-them">
                  <span className="cm-msg-label">
                    Gopalakrishnan
                  </span>

                  <div className="cm-bubble cm-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* INPUT */}
            <div className="cm-input-row">
              <div className="cm-field-wrap cm-message-wrap">
                <input
                  ref={inputRef}
                  type="text"
                  className={`cm-input ${
                    inputError ? "cm-input-error" : ""
                  }`}
                  placeholder="Project, role, or just a hey"
                  value={inputVal}
                  onChange={(e) => {
                    setInputVal(e.target.value);
                    setInputError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSend();
                    }
                  }}
                />

                {inputError && (
                  <p className="cm-error">{inputError}</p>
                )}
              </div>

              <button
                className="cm-send-btn"
                onClick={handleSend}
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>

          {/* CONTACT */}
          <div className="cm-card cm-card-contact">
            <p className="cm-section-label">Contact</p>

            <a
              className="cm-contact-opt"
              href="mailto:gopalakrishnan0614@gmail.com"
            >
              <div className="cm-opt-icon">✉</div>

              <div className="cm-opt-text">
                <span className="cm-opt-title">
                  Email me
                </span>

                <span className="cm-opt-detail">
                  gopalakrishnan0614@gmail.com
                </span>
              </div>

              <span className="cm-opt-arrow">↗</span>
            </a>
          </div>

          {/* SOCIAL */}
          <div className="cm-card cm-card-social">
            <p className="cm-section-label">Socials</p>

            <div className="cm-social-links">
              <a
                className="cm-social-link"
                href="https://www.linkedin.com/in/gopalakrishnan-b-5357b4228/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>

              <a
                className="cm-social-link"
                href="https://github.com/krishnan681"
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConnectModal;