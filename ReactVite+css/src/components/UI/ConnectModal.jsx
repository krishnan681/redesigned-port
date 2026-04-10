import React, { useState, useEffect, useRef } from 'react';
import '../../CSS/UI-CSS/ConnectModal.css';

const ConnectModal = ({ onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'User', text: 'Hey, I have a project idea!', type: 'user' },
    { sender: 'Gopalakrishnan', text: 'Sounds great, tell me more...', type: 'them' },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Scroll chat to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter') handleSend();
  };

  const handleSend = () => {
    const val = inputVal.trim();
    if (!val) return;

    setMessages((prev) => [...prev, { sender: 'You', text: val, type: 'user' }]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'Gopalakrishnan',
          text: "Got it! I'll get back to you shortly ✌",
          type: 'them',
        },
      ]);
    }, 1200);
  };

  return (
    <div className="cm-overlay" onClick={handleOverlayClick} onKeyDown={handleKeyDown}>
      <div className="cm-modal" role="dialog" aria-modal="true" aria-label="Contact modal">

        {/* Header */}
        <div className="cm-header">
          <div className="cm-header-text">
            <h2 className="cm-title">LET'S BUILD SOMETHING TOGETHER</h2>
            
          </div>
          <button className="cm-close" onClick={onClose} aria-label="Close modal">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Bento Grid */}
        <div className="cm-bento">

          {/* Chat Card — full width */}
          <div className="cm-card cm-card-chat">
            <div className="cm-chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`cm-msg cm-msg-${msg.type}`}>
                  <span className="cm-msg-label">{msg.sender}</span>
                  <div className="cm-bubble">{msg.text}</div>
                </div>
              ))}
              {isTyping && (
                <div className="cm-msg cm-msg-them">
                  <span className="cm-msg-label">Gopalakrishnan</span>
                  <div className="cm-bubble cm-typing">
                    <span /><span /><span />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="cm-input-row">
              <input
                ref={inputRef}
                type="text"
                className="cm-input"
                placeholder="Project, role, or just a hey"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button className="cm-send-btn" onClick={handleSend}>
                Send message
              </button>
            </div>
          </div>

          {/* Contact Card */}
          <div className="cm-card cm-card-contact">
            <p className="cm-section-label">Contact</p>

           
            <a
              className="cm-contact-opt"
              href="mailto:gopalakrishnan0614@gmail.com"
            >
              <div className="cm-opt-icon cm-opt-icon-mail">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <rect x="1" y="3" width="13" height="9" rx="2" stroke="#0284c7" strokeWidth="1.2"/>
                  <path d="M1 5.5l6.5 4.5L14 5.5" stroke="#0284c7" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="cm-opt-text">
                <span className="cm-opt-title">Email me</span>
                <span className="cm-opt-detail">gopalakrishnan0614@gmail.com</span>
              </div>
              <span className="cm-opt-arrow">↗</span>
            </a>
          </div>

          {/* Social Card */}
          <div className="cm-card cm-card-social">
            <p className="cm-section-label">Socials</p>
            <div className="cm-social-links">

              <a className="cm-social-link" href="https://www.linkedin.com/in/gopalakrishnan-b-5357b4228/" target="_blank" rel="noreferrer">
                <div className="cm-social-icon cm-si-li">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M1.5 4h2v7.5h-2V4zm1-2.8a1.05 1.05 0 100 2.1 1.05 1.05 0 000-2.1zM5 4h1.7v1C7.05 4.35 7.85 3.8 9 3.8c1.9 0 2.5 1.1 2.5 3v4.7H9.8V7.1c0-.75-.25-1.1-.85-1.1-.75 0-1.1.5-1.1 1.5v4H5V4z" fill="white"/>
                  </svg>
                </div>
                <span className="cm-social-name">LinkedIn</span>
                <span className="cm-social-arrow">↗</span>
              </a>

             

              <a className="cm-social-link" href="https://github.com/krishnan681" target="_blank" rel="noreferrer">
                <div className="cm-social-icon cm-si-gh">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M6.5 0C2.9 0 0 2.9 0 6.5c0 2.87 1.86 5.3 4.44 6.16.32.06.44-.14.44-.3v-1.05c-1.8.39-2.18-.87-2.18-.87-.3-.75-.72-.95-.72-.95-.59-.4.04-.39.04-.39.65.05 1 .67 1 .67.58.99 1.52.7 1.9.54.06-.42.23-.7.41-.86-1.44-.16-2.95-.72-2.95-3.2 0-.7.25-1.28.67-1.73-.07-.16-.29-.82.06-1.7 0 0 .54-.17 1.77.66a6.17 6.17 0 013.24 0c1.23-.83 1.77-.66 1.77-.66.35.88.13 1.54.06 1.7.42.45.67 1.03.67 1.73 0 2.49-1.51 3.04-2.96 3.2.23.2.44.6.44 1.22v1.8c0 .17.11.37.44.3A6.502 6.502 0 0013 6.5C13 2.9 10.1 0 6.5 0z" fill="white"/>
                  </svg>
                </div>
                <span className="cm-social-name">GitHub</span>
                <span className="cm-social-arrow">↗</span>
              </a>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ConnectModal;