import React, { useEffect } from "react";

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

    </div>
  );
};

export default LinksPage;
