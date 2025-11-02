class DemosSection {
  render() {
    return `
          <section id="demos" class="section">
            <h2>Demos</h2>
            <div class="demo-list">
            <div class="demo-item">
                <h3>CTF Demo</h3>
                <p>Capture the Flag demo.</p>
                <a href="demos/ctf.html">Play Demo</a>
            </div>
            <div class="demo-item">
                <h3>MMO Demo</h3>
                <p>Sample showing Area of Interest across simulated network.</p>
                <a href="demos/mmo-aoi.html">Play Demo</a>
            </div>
            <div class="demo-item">
                <h3>Shader Demo</h3>
                <p>Sample Shader Demo.</p>
                <a href="demos/shader.html">Play Demo</a>
            </div>
            <div class="demo-item">
                <h3>Melee Network Demo</h3>
                <p>Melee fighting latemcy simulation demo with server authority.</p>
                <a href="demos/melee.html">Play Demo</a>
            </div>
            <div class="demo-item">
                <h3>Wall Network Demo</h3>
                <p>Invisible Wall (overshoot) latemcy simulation demo with server authority.</p>
                <a href="demos/wall-rollback.html">Play Demo</a>
            </div>
            <div class="demo-item">
                <h3>Projectile Network Demo</h3>
                <p>Shooting latemcy simulation demo with server authority.</p>
                <a href="demos/projectile-rollback.html">Play Demo</a>
            </div>
            <div class="demo-item">
                <h3>Disgaea Prototype</h3>
                <p>Advanced WebGL2 SRPG with units, abilities, camera controls.</p>
                <a href="demos/dis.html">Play Demo</a>
            </div>
             <div class="demo-item">
                <h3>AOE Attack Demo</h3>
                <p>Spell Area attack demo.</p>
                <a href="demos/sprite2.html">Play Demo</a>
            </div>
            <div class="demo-item">
                <h3>Prinny SRPG Demo</h3>
                <p>Isometric grid demo with movement, lift/throw, geo panels.</p>
                <a href="demos/prinny.html">Play Demo</a>
            </div>
            <div class="demo-item">
                <h3>Dark Assembly Demo</h3>
                <p>Combined isometric SRPG with units, HP/MP, abilities, lift/throw, geo chain, prinny explosion.</p>
                <a href="demos/dark-assembly.html">Play Demo</a>
            </div>
            </div>
          </section>
        `;
  }
}

export default DemosSection;