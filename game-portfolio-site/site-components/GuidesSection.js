class GuidesSection {
  render() {
    return `
          <section id="guides" class="section">
            <h2>Guides</h2>
            <div class="demo-list">
            <div class="demo-item">
                <h3>WebGL OpenGL Guide</h3>
                <p>Learn WebGL basics with OpenGL comparisons.</p>
                <a href="guides/webgl-opengl.html">View Guide</a>
            </div>
            <div class="demo-item">
                <h3>WebGPU Guide</h3>
                <p>Introduction to WebGPU for modern graphics.</p>
                <a href="guides/webgpu-guide.html">View Guide</a>
            </div>
            <div class="demo-item">
                <h3>RPG 2.5HD Guide</h3>
                <p>Tips on building a 2.5D RPG.</p>
                <a href="guides/rpg-25hd.html">View Guide</a>
            </div>
            <div class="demo-item">
                <h3>Disgaea Clone Game Guide</h3>
                <p>Tips on designing Tactical RPGs like Disgaea and Final Fantasy Tactics.</p>
                <a href="guides/disagea-guide.html">View Guide</a>
            </div>
            <div class="demo-item">
                <h3>Game Engine Patterns Guide</h3>
                <p>Learn Game engine basics with architecture overviews.</p>
                <a href="guides/game-engine-guide.html">View Guide</a>
            </div>
            <div class="demo-item">
                <h3>Advanced Game Engine Patterns Guide</h3>
                <p>Learn additional Game engine patterns with additional case studies.</p>
                <a href="guides/game-engine-guide-2.html">View Guide</a>
            </div>

            <div class="demo-item">
                <h3>Additional Game Engine Tutorials</h3>
                <p>Tutorials on building game engines with WebGL/WebGPU.</p>
                <a href="guides/game-engine-guide-pro.html">View Tutorials</a>
            </div>
            </div>
          </section>
        `;
  }
}


export default GuidesSection;
