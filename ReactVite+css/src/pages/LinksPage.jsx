import React, { useEffect } from "react";
import Footer from "../components/Footer";

const LinksPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", paddingTop: "80px" }}>
      <div style={{ flex: 1 }}>
        <h1 style={{ textAlign: "center", color: "white", marginTop: "100px", fontFamily: "sans-serif" }}>Important Links</h1>
        {/* Placeholder for future links */}
      </div>
      <Footer />
    </div>
  );
};

export default LinksPage;
