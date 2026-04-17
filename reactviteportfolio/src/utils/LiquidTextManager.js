import * as THREE from 'three';

export class LiquidTextManager {
  constructor(canvas, text1, text2, options = {}) {
    this.canvas = canvas;
    this.text1 = text1;
    this.text2 = text2;
    this.options = {
      fontSize: options.fontSize || 100,
      fontFamily: options.fontFamily || "'Playfair Display', serif",
      fontFamily1: options.fontFamily1,
      fontFamily2: options.fontFamily2,
      color: options.color || '#ffffff',
      autoPeriod: options.autoPeriod || 20.0, // Defaulted to 10s for slower movement
      ...options
    };

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 10);
    this.camera.position.z = 1;

    this.clock = new THREE.Clock();
    this.gu = {
      time: { value: 0 },
      dTime: { value: 0 },
      aspect: { value: canvas.clientWidth / canvas.clientHeight }
    };

    this.pointer = new THREE.Vector2(0, 0);
    this.autoPointer = new THREE.Vector2(0, 0);
    this.pointerDown = 1.0;

    try {
      this.initBlob();
      this.initText();
      this.initMainScene();

      this.animate = this.animate.bind(this);
      this.requestID = requestAnimationFrame(this.animate);
    } catch (e) {
      console.error("LiquidTextManager Init Error:", e);
    }
  }

  initBlob() {
    const dpr = this.renderer.getPixelRatio();
    const w = Math.max(1, Math.floor(this.canvas.clientWidth * dpr));
    const h = Math.max(1, Math.floor(this.canvas.clientHeight * dpr));

    // Ping-Pong Render Targets for persistence
    this.rtA = new THREE.WebGLRenderTarget(w, h);
    this.rtB = new THREE.WebGLRenderTarget(w, h);
    this.currentRT = this.rtA;
    this.previousRT = this.rtB;

    this.blobUniforms = {
      pointer: { value: this.pointer },
      autoPointer: { value: this.autoPointer },
      pointerDown: { value: this.pointerDown },
      pointerRadius: { value: 0.35 },
      pointerDuration: { value: 2.5 },
      texPrevious: { value: this.previousRT.texture },
      aspect: this.gu.aspect,
      dTime: this.gu.dTime
    };

    this.blobMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      onBeforeCompile: (shader) => {
        shader.uniforms.dTime = this.blobUniforms.dTime;
        shader.uniforms.aspect = this.blobUniforms.aspect;
        shader.uniforms.pointer = this.blobUniforms.pointer;
        shader.uniforms.autoPointer = this.blobUniforms.autoPointer;
        shader.uniforms.pointerDown = this.blobUniforms.pointerDown;
        shader.uniforms.pointerRadius = this.blobUniforms.pointerRadius;
        shader.uniforms.pointerDuration = this.blobUniforms.pointerDuration;
        shader.uniforms.texPrevious = this.blobUniforms.texPrevious;
        shader.fragmentShader = `
          uniform float dTime;
          uniform float aspect;
          uniform vec2 pointer;
          uniform vec2 autoPointer;
          uniform float pointerDown;
          uniform float pointerRadius;
          uniform float pointerDuration;
          uniform sampler2D texPrevious;
          ${shader.fragmentShader}
        `.replace(
          `#include <color_fragment>`,
          `#include <color_fragment>
          float duration = pointerDuration;
          float rVal = texture(texPrevious, vUv).r;
          rVal -= clamp(dTime / duration, 0.0, 0.05);
          rVal = clamp(rVal, 0.0, 1.0);
          
          float f = 0.0;
          vec2 uvCoords = (vUv - 0.5) * 2.0 * vec2(aspect, 1.0);
          
          if (pointerDown > 0.5){
            vec2 mouse = pointer * vec2(aspect, 1.0);
            f += 1.0 - smoothstep(pointerRadius * 0.1, pointerRadius, distance(uvCoords, mouse));
          }

          // Auto movement influence
          vec2 autoPos = autoPointer * vec2(aspect, 1.0);
          f += 1.0 - smoothstep(pointerRadius * 0.1, pointerRadius, distance(uvCoords, autoPos));

          rVal += f * 0.2;
          rVal = clamp(rVal, 0.0, 1.0);
          diffuseColor.rgb = vec3(rVal);
          `
        );
      }
    });
    this.blobMaterial.defines = { USE_UV: "" };

    const blobGeometry = new THREE.PlaneGeometry(2, 2);
    this.blobMesh = new THREE.Mesh(blobGeometry, this.blobMaterial);
    this.blobScene = new THREE.Scene();
    this.blobScene.add(this.blobMesh);
    this.blobCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  }

  initText() {
    const dpr = window.devicePixelRatio || 1;
    const w = Math.max(1, Math.floor(this.canvas.clientWidth * dpr));
    const h = Math.max(1, Math.floor(this.canvas.clientHeight * dpr));

    const createTextTexture = (isReveal) => {
      const textCanvas = document.createElement('canvas');
      const ctx = textCanvas.getContext('2d');
      textCanvas.width = w;
      textCanvas.height = h;

      ctx.scale(dpr, dpr);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const fontSize = this.options.fontSize;
      const fontName = isReveal ? (this.options.fontFamily2 || this.options.fontFamily) : (this.options.fontFamily1 || this.options.fontFamily);
      ctx.font = `italic 600 ${fontSize}px ${fontName}`;

      const gradient = ctx.createLinearGradient(0, 0, 0, this.canvas.clientHeight);

      const targetText = isReveal ? this.text2 : this.text1;

      if (!isReveal) {
        // SILVER (metallic base)
        gradient.addColorStop(0.0, '#ffffff');   // Highlight
        gradient.addColorStop(0.2, '#e5e5e5');   // Light silver
        gradient.addColorStop(0.45, '#c0c0c0');  // True silver
        gradient.addColorStop(0.7, '#8a8a8a');   // Mid grey
        gradient.addColorStop(1.0, '#1f1f1f');   // Deep shadow
      } else {
        // BLUE + INDIGO (space reveal)
        gradient.addColorStop(0.0, '#ffffff');   // Light source
        gradient.addColorStop(0.25, '#c7d2fe');  // Indigo-100
        gradient.addColorStop(0.5, '#818cf8');   // Indigo-400
        gradient.addColorStop(0.75, '#4f46e5');  // Indigo-600
        gradient.addColorStop(1.0, '#0b0f3a');   // Deep space indigo
      }

      ctx.fillStyle = gradient;

      const lines = targetText.split('<br />');
      const lineHeight = fontSize * 1.05; // Increased line spacing for "neat" look
      const totalHeight = lines.length * lineHeight;
      const startY = (this.canvas.clientHeight - totalHeight) / 2 + lineHeight / 2;

      lines.forEach((line, i) => {
        ctx.fillText(line.trim(), this.canvas.clientWidth / 2, startY + i * lineHeight);
      });

      return new THREE.CanvasTexture(textCanvas);
    };

    if (this.textTexture) this.textTexture.dispose();
    if (this.strokeTexture) this.strokeTexture.dispose();

    this.textTexture = createTextTexture(true); // Reveal (Maroon-White)
    this.strokeTexture = createTextTexture(false); // Background (White-Blue)
  }

  initMainScene() {
    const geometry = new THREE.PlaneGeometry(2, 2);

    // 1. Background Layer (Hides under cursor)
    this.bgMaterial = new THREE.MeshBasicMaterial({
      map: this.strokeTexture,
      transparent: true,
      onBeforeCompile: (shader) => {
        shader.uniforms.texBlob = { value: null };
        this.bgShader = shader; // Reference to update uniform
        shader.fragmentShader = `
          uniform sampler2D texBlob;
          ${shader.fragmentShader}
        `.replace(
          `#include <map_fragment>`,
          `
          #include <map_fragment>
          vec4 blobData = texture(texBlob, vUv);
          // Inverse mask: hide where blob is present
          diffuseColor.a *= (1.0 - smoothstep(0.005, 0.4, blobData.r));
          `
        );
      }
    });
    this.bgMaterial.defines = { USE_UV: "" };
    this.bgMesh = new THREE.Mesh(geometry, this.bgMaterial);
    this.bgMesh.position.z = 0;
    this.scene.add(this.bgMesh);

    // 2. Foreground Layer (Shows under cursor)
    this.mainMaterial = new THREE.MeshBasicMaterial({
      map: this.textTexture,
      transparent: true,
      onBeforeCompile: (shader) => {
        shader.uniforms.texBlob = { value: null };
        this.fgShader = shader; // Reference to update uniform
        shader.fragmentShader = `
          uniform sampler2D texBlob;
          ${shader.fragmentShader}
        `.replace(
          `#include <map_fragment>`,
          `
          #include <map_fragment>
          vec4 blobData = texture(texBlob, vUv);
          if (blobData.r < 0.005) discard;
          // Reveal mask: show where blob is present
          diffuseColor.a *= smoothstep(0.005, 0.1, blobData.r);
          `
        );
      }
    });
    this.mainMaterial.defines = { USE_UV: "" };

    this.fgMesh = new THREE.Mesh(geometry, this.mainMaterial);
    this.fgMesh.position.z = 0.1;
    this.scene.add(this.fgMesh);
  }

  updatePointer(x, y) {
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.x = ((x - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((y - rect.top) / rect.height) * 2 + 1;
  }

  setSize(newFontSize) {
    if (newFontSize) this.options.fontSize = newFontSize;

    const dpr = this.renderer.getPixelRatio();
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    if (w <= 0 || h <= 0) return;

    this.renderer.setSize(w, h);
    this.gu.aspect.value = w / h;

    const exportW = Math.max(1, Math.floor(w * dpr));
    const exportH = Math.max(1, Math.floor(h * dpr));

    this.rtA.setSize(exportW, exportH);
    this.rtB.setSize(exportW, exportH);

    this.initText();
    this.bgMaterial.map = this.strokeTexture;
    this.mainMaterial.map = this.textTexture;
  }

  animate() {
    const dt = this.clock.getDelta();
    this.gu.time.value += dt;
    this.gu.dTime.value = dt;

    // Automatic movement logic: configurable horizontal cycle, drifting vertically
    const xPeriod = this.options.autoPeriod;
    const angleX = (this.gu.time.value * 2.0 * Math.PI) / xPeriod;
    this.autoPointer.x = Math.sin(angleX) * 0.85; // Move across 85% of width

    // Vertical "drift" to cover different lines of text over time
    // Using a different frequency so it doesn't repeat the same circular path
    this.autoPointer.y = Math.sin(this.gu.time.value * 0.8) * 0.45;

    // Ping-Pong Render
    // Step 1: Render new state into currentRT, reading from previousRT
    this.blobUniforms.texPrevious.value = this.previousRT.texture;
    this.renderer.setRenderTarget(this.currentRT);
    this.renderer.render(this.blobScene, this.blobCamera);

    // Step 2: Update masks for both background and foreground
    if (this.bgShader) {
      this.bgShader.uniforms.texBlob.value = this.currentRT.texture;
    }
    if (this.fgShader) {
      this.fgShader.uniforms.texBlob.value = this.currentRT.texture;
    }

    this.renderer.setRenderTarget(null);
    this.renderer.render(this.scene, this.camera);

    // Swap RTs
    const temp = this.currentRT;
    this.currentRT = this.previousRT;
    this.previousRT = temp;

    this.requestID = requestAnimationFrame(this.animate);
  }

  dispose() {
    cancelAnimationFrame(this.requestID);
    this.renderer.dispose();
    this.textTexture.dispose();
    this.strokeTexture.dispose();
    this.rtA.dispose();
    this.rtB.dispose();
  }
}
