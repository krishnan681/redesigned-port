import RendererConfig from "./RendererConfig";
import VideoLayer from "./VideoLayer";

export default class HeroRenderer {
  constructor(canvas, video) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.videoLayer = new VideoLayer(video);
    this.video = video;

    this.pixelRatio = Math.min(
      window.devicePixelRatio || 1,
      RendererConfig.MAX_PIXEL_RATIO
    );

    this.width = 0;
    this.height = 0;
    this.animationFrame = null;
    this.isRunning = false;

    this.render = this.render.bind(this);
    this.resize = this.resize.bind(this);
  }

  start() {
    this.resize();
    window.addEventListener("resize", this.resize, { passive: true });
    this.resume();
  }

  pause() {
    if (!this.isRunning) return;
    this.isRunning = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    if (this.video && !this.video.paused) {
      this.video.pause();
    }
  }

  resume() {
    if (this.isRunning) return;
    this.isRunning = true;
    if (this.video && this.video.paused) {
      this.video.play().catch(() => {});
    }
    this.render();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width * this.pixelRatio;
    this.canvas.height = this.height * this.pixelRatio;

    this.canvas.style.width = this.width + "px";
    this.canvas.style.height = this.height + "px";

    this.ctx.setTransform(
      this.pixelRatio,
      0,
      0,
      this.pixelRatio,
      0,
      0
    );
  }

  render() {
    if (!this.isRunning) return;

    this.ctx.fillStyle = RendererConfig.BACKGROUND;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.videoLayer.draw(this.ctx, this.width, this.height);

    this.animationFrame = requestAnimationFrame(this.render);
  }

  destroy() {
    this.pause();
    window.removeEventListener("resize", this.resize);
  }
}