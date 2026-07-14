export default class VideoLayer {

    constructor(video) {

        this.video = video;

    }

    draw(ctx, width, height) {

        if (this.video.readyState < 2) return;

        const vw = this.video.videoWidth;
        const vh = this.video.videoHeight;

        if (!vw || !vh) return;

        const scale = Math.max(
            width / vw,
            height / vh
        );

        const dw = vw * scale;
        const dh = vh * scale;

        const dx = (width - dw) * 0.5;
        const dy = (height - dh) * 0.5;

        ctx.drawImage(
            this.video,
            dx,
            dy,
            dw,
            dh
        );

    }

}