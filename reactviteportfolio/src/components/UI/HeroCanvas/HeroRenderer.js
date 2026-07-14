import RendererConfig from "./RendererConfig";
import VideoLayer from "./VideoLayer";

export default class HeroRenderer {

    constructor(canvas, video) {

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.videoLayer = new VideoLayer(video);

        this.pixelRatio = Math.min(
            window.devicePixelRatio,
            RendererConfig.MAX_PIXEL_RATIO
        );

        this.width = 0;
        this.height = 0;

        this.animationFrame = null;

        this.render = this.render.bind(this);
        this.resize = this.resize.bind(this);

    }

    start() {

        this.resize();

        window.addEventListener(
            "resize",
            this.resize
        );

        this.render();

    }

    resize() {

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.canvas.width =
            this.width * this.pixelRatio;

        this.canvas.height =
            this.height * this.pixelRatio;

        this.canvas.style.width =
            this.width + "px";

        this.canvas.style.height =
            this.height + "px";

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

        this.ctx.fillStyle =
            RendererConfig.BACKGROUND;

        this.ctx.fillRect(
            0,
            0,
            this.width,
            this.height
        );

        this.videoLayer.draw(
            this.ctx,
            this.width,
            this.height
        );

        this.animationFrame =
            requestAnimationFrame(
                this.render
            );

    }

    destroy() {

        cancelAnimationFrame(
            this.animationFrame
        );

        window.removeEventListener(
            "resize",
            this.resize
        );

    }

}