import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../CSS/footer.css";

/* ─── CROWD CANVAS COMPONENT (OPEN PEEPS) ─────────────────── */
const CrowdCanvas = ({ src = "/images/peeps/all-peeps.png", rows = 15, cols = 7 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = {
      src,
      rows,
      cols,
    };

    // UTILS
    const randomRange = (min, max) => min + Math.random() * (max - min);
    const randomIndex = (array) => (randomRange(0, array.length) | 0);
    const removeFromArray = (array, i) => array.splice(i, 1)[0];
    const removeItemFromArray = (array, item) => removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = (array) => removeFromArray(array, randomIndex(array));
    const getRandomFromArray = (array) => array[randomIndex(array) | 0];

    // TWEEN FACTORIES
    const resetPeep = ({ stage, peep }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      // Slight perspective depth variance (ground baseline)
      const offsetY = randomRange(-5, 20);
      const startY = Math.max(stage.height - peep.height + offsetY, 12);
      let startX;
      let endX;

      if (direction === 1) {
        startX = -peep.width;
        endX = stage.width;
        peep.scaleX = 1;
      } else {
        startX = stage.width + peep.width;
        endX = 0;
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return {
        startX,
        startY,
        endX,
      };
    };

    const normalWalk = ({ peep, props }) => {
      const { startX, startY, endX } = props;
      const xDuration = 10;
      const yDuration = 0.25;

      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.6, 1.4));
      tl.to(
        peep,
        {
          duration: xDuration,
          x: endX,
          ease: "none",
        },
        0
      );
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: Math.floor(xDuration / yDuration),
          yoyo: true,
          y: Math.max(startY - 8, 4),
        },
        0
      );

      return tl;
    };

    const walks = [normalWalk];

    // FACTORY FUNCTIONS
    const createPeep = ({ image, rect }) => {
      const peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        drawArgs: [],
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        setRect: (r) => {
          peep.rect = r;
          peep.width = r[2];
          peep.height = r[3];
          peep.drawArgs = [peep.image, ...r, 0, 0, peep.width, peep.height];
        },
        render: (c) => {
          c.save();
          c.translate(peep.x, peep.y);
          c.scale(peep.scaleX, 1);
          c.drawImage(
            peep.image,
            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],
            0,
            0,
            peep.width,
            peep.height
          );
          c.restore();
        },
      };

      peep.setRect(rect);
      return peep;
    };

    // MAIN
    const img = document.createElement("img");
    const stage = {
      width: 0,
      height: 0,
    };

    const allPeeps = [];
    const availablePeeps = [];
    const crowd = [];

    const createPeeps = () => {
      const { rows, cols } = config;
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: img,
            rect: [
              (i % rows) * rectWidth,
              ((i / rows) | 0) * rectHeight,
              rectWidth,
              rectHeight,
            ],
          })
        );
      }
    };

    const addPeepToCrowd = () => {
      if (availablePeeps.length === 0) return null;
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({
          peep,
          stage,
        }),
      }).eventCallback("onComplete", () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;

      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);

      return peep;
    };

    const initCrowd = () => {
      while (availablePeeps.length) {
        const added = addPeepToCrowd();
        if (added && added.walk) {
          added.walk.progress(Math.random());
        }
      }
    };

    const removePeepFromCrowd = (peep) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    };

    const render = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      crowd.forEach((peep) => {
        peep.render(ctx);
      });

      ctx.restore();
    };

    const resize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * dpr;
      canvas.height = stage.height * dpr;

      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });

      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      initCrowd();
    };

    const init = () => {
      createPeeps();
      resize();
      gsap.ticker.add(render);
    };

    img.onload = init;
    img.src = config.src;

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });
    };
  }, [src, rows, cols]);

  return <canvas ref={canvasRef} className="footer-crowd-canvas" />;
};

/* ─── FOOTER COMPONENT ────────────────────────────────────── */
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
          <p className="sub-text">
            Hi, I'm Gopalakrishnan, Full Stack Developer. <br />
            Thanks for checking out my site!
          </p>
        </div>

        {/* CENTER */}
        <div className="footer-center">
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
        </div>

        {/* RIGHT */}
        <div className="footer-right">
          <a href="mailto:gopalakrishnan0614@gmail.com">Email</a>
          <a href="https://github.com/krishnan681" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/gopalakrishnan-b-5357b4228/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Copyright Line (Placed Above Canvas) */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Krishna. All rights reserved.
      </div>

      {/* Animated Walking Crowd at the Very Bottom */}
      <div className="footer-crowd-wrapper">
        <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} />
      </div>
    </footer>
  );
};

export default Footer;
export { CrowdCanvas };