import { Component } from "./Component.js";
import { WebGLService } from "./WebGLService.js";
import { store } from "./store.js";

const vertexShaderSource = `#version 300 es
precision highp float;

in vec2 aPosition;
in vec2 aVelocity;

uniform float uTime;
uniform float uDelta;
uniform vec2 uMouse;
uniform float uInteractionRadius;
uniform float uInterVizForce;
uniform float uScale;
uniform float uRotation;
uniform float uLineDistance;

out vec3 vColor;

void main() {
    vec2 pos = aPosition;
    vec2 vel = aVelocity;

    // Rotation
    float cosR = cos(uRotation * uTime);
    float sinR = sin(uRotation * uTime);
    pos = vec2(pos.x * cosR - pos.y * sinR, pos.x * sinR + pos.y * cosR);

    // Mouse interaction (repulsion)
    vec2 diff = pos - uMouse;
    float dist = length(diff);
    if(dist < uInteractionRadius && dist > 0.0){
        vel -= normalize(diff) * 0.05; // Repel particles away from mouse
    }

    // Inter-visualization "force" (attraction to center)
    vel += normalize(-pos) * uInterVizForce;

    // Update position
    pos += vel * uDelta;

    // Damping
    vel *= 0.95;

    vColor = vec3(0.5 + 0.5 * sin(uTime + pos.x), 0.2, 1.0 - pos.y * 0.5);

    gl_Position = vec4(pos * uScale, 0.0, 1.0);
      gl_PointSize = 4.0;
}`;

const fragmentShaderSource = `#version 300 es
precision highp float;

in vec3 vColor;
out vec4 fragColor;

uniform float uLineOpacity;

void main() {
    // Draw points as circles
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;
    fragColor = vec4(vColor, uLineOpacity);
}`;

class Visualization extends Component {
  constructor() {
    super();
    this.webgl = null;
    this.buffers = null;
    this.animationFrame = null;
  }

  connectedCallback() {
    this.mount(`<canvas width="600" height="600"></canvas>`);
    const canvas = this.shadowRoot.querySelector('canvas');
    const gl = canvas.getContext('webgl2');
    if (!gl) {
      console.error('WebGL2 not supported');
      return;
    }
    this.webgl = new WebGLService(gl);

    // Compile and link program
    this.program = this.webgl.createProgram(vertexShaderSource, fragmentShaderSource);
    gl.useProgram(this.program);

    // Create particle positions and velocities
    const numParticles = store.pointCount.value;
    const data = new Float32Array(numParticles * 4);
    for (let i = 0; i < numParticles; i++) {
      data[i * 4] = (Math.random() * 2 - 1);
      data[i * 4 + 1] = (Math.random() * 2 - 1);
      data[i * 4 + 2] = 0; // vx
      data[i * 4 + 3] = 0; // vy
    }

    // Create ping-pong buffers
    this.buffers = this.webgl.createPingPongBuffers(data);

    // Bind reactive signals to uniforms
    this.bindSignal(store.scale, val => this.webgl.setUniform(this.program, 'uScale', val));
    this.bindSignal(store.rotationSpeed, val => this.webgl.setUniform(this.program, 'uRotation', val));
    this.bindSignal(store.colorIntensity, val => this.webgl.setUniform(this.program, 'uIntensity', val));
    this.bindSignal(store.interactionRadius, val => this.webgl.setUniform(this.program, 'uInteractionRadius', val));
    this.bindSignal(store.mouseX, val => this.webgl.setUniform(this.program, 'uMouse', [val, store.mouseY.value], '2fv'));
    this.bindSignal(store.mouseY, val => this.webgl.setUniform(this.program, 'uMouse', [store.mouseX.value, val], '2fv'));
    this.bindSignal(store.interVizForce, val => this.webgl.setUniform(this.program, 'uInterVizForce', val));
    this.bindSignal(store.lineDistance, val => this.webgl.setUniform(this.program, 'uLineDistance', val));
    this.bindSignal(store.lineOpacity, val => this.webgl.setUniform(this.program, 'uLineOpacity', val));
    // Bind totalVisualIntensity to uIntensity for color modulation
    this.bindSignal(store.totalVisualIntensity, val => this.webgl.setUniform(this.program, 'uIntensity', val));

    // Register self
    store.visualizations.value = [...store.visualizations.value, this];

    // Mouse tracking is handled globally in main.js

    // Animation loop
    const render = (time) => {
      const seconds = time * 0.001;
      const delta = 0.016; // 60 FPS delta
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(this.program);
      this.webgl.setUniform(this.program, 'uTime', seconds);
      this.webgl.setUniform(this.program, 'uDelta', delta);

      // Swap buffers
      const activeBuffer = this.webgl.swapBuffers();
      gl.bindBuffer(gl.ARRAY_BUFFER, activeBuffer);

      const aPos = gl.getAttribLocation(this.program, 'aPosition');
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0);

      const aVel = gl.getAttribLocation(this.program, 'aVelocity');
      gl.enableVertexAttribArray(aVel);
      gl.vertexAttribPointer(aVel, 2, gl.FLOAT, false, 16, 8);

      // Draw particles
      gl.drawArrays(gl.POINTS, 0, numParticles);

      // Draw lines between nearby particles (simplified)
      // Note: This is a basic implementation; for full line rendering, transform feedback or compute shaders would be better
      // For now, lines are not rendered to keep it simple and performant
      this.animationFrame = requestAnimationFrame(render);
    };
    this.animationFrame = requestAnimationFrame(render);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    if (this.webgl) this.webgl.cleanup();
    store.visualizations.value = store.visualizations.value.filter(v => v !== this);
  }
}

customElements.define('x-visualization', Visualization);
