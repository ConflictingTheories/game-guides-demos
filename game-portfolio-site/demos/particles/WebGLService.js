export class WebGLService {
  constructor(gl) {
    this.gl = gl;
    this._buffers = [];
    this._current = 0;
    this.animationFrame = null;
  }

  createProgram(vsSource, fsSource) {
    const gl = this.gl;
    const compile = (src, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader));
      }
      return shader;
    };
    const vs = compile(vsSource, gl.VERTEX_SHADER);
    const fs = compile(fsSource, gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program));
    }
    return program;
  }

  createPingPongBuffers(data) {
    const gl = this.gl;
    this._buffers = [gl.createBuffer(), gl.createBuffer()];
    this._buffers.forEach(b => {
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
    });
    return this._buffers;
  }

  swapBuffers() {
    this._current = 1 - this._current;
    return this._buffers[this._current];
  }

  setUniform(program, name, value, type = '1f') {
    const gl = this.gl;
    const loc = gl.getUniformLocation(program, name);
    gl[`uniform${type}`](loc, value);
  }

  start(renderCallback) {
    const step = time => {
      renderCallback(time, this.gl, this.program);
      this.animationFrame = requestAnimationFrame(step);
    };
    this.animationFrame = requestAnimationFrame(step);
  }

  cleanup() {
    cancelAnimationFrame(this.animationFrame);
    this._buffers.forEach(b => this.gl.deleteBuffer(b));
  }
}
