import React from "react";
import "../CSS/home.css";
import Lottie from "lottie-react";
import ctaCircleAnimation from "../assets/lottie/cta-circle.json";

import StarBackground from "./UI/star_background";
import SplitText from "../components/UI/SplitText"; 
import RotatingText from "../components/UI/RotatingText";

const Home = () => {
  return (


    <>

    <StarBackground/>
      <div className="portfolio-container">
        <section className="hero">
          <div className="hero-content">

            {/* BIG CURSIVE TAGLINE */}
            <h1 className="hero-tagline">
              lets turn fresh ideas into <br />
              functional reality
            </h1>


            {/* ANIMATED NAME */}
            <SplitText
              text="Hello, I'm Gopal"
              className="hero-name"
              delay={200}
              duration={1}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              tag="h2"
            />

            {/* ROTATING TITLE */}
            <p className="title">
              I am a{" "}
              <RotatingText
                texts={[
                  "Frontend Web Developer",
                  "Designer"
                ]}
                mainClassName="rotating-title"
                splitBy="words"
                staggerFrom="last"
                staggerDuration={0.03}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-120%", opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2500}
              />
            </p>

            {/* DESCRIPTION */}
            <p className="description">
              Building elegant web experiences with React, Node.js, and modern technologies.
            </p>

            {/* CTA */}
            <div className="hero-buttons">
              <a href="#contact" id="contact-btn" className="btn-secondary">
                Get in Touch

                <span className="cta-circle">
                  <Lottie
                    animationData={ctaCircleAnimation}
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                  />

                </span>
              </a>

            </div>



          </div>
        </section>
      </div>
    </>
  );
};

export default Home;


