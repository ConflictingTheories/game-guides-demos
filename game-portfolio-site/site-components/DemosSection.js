class DemosSection {
  render() {
    return `
          <section id="demos" class="section">
            <h2>Demos</h2>
            <div class="demo-list">
            <div class="demo-item">
                <h3>Disgaea Prototype</h3>
                <p>Advanced WebGL2 SRPG with units, abilities, camera controls.</p>
                <a href="demos/dis.html">Play Demo</a>
            </div>
            <div class="demo-item">
                <h3>Prinny SRPG Demo</h3>
                <p>Isometric grid demo with movement, lift/throw, geo panels.</p>
                <a href="demos/prinny.html">Play Demo</a>
            </div>
            <div class="demo-item">
                <h3>Sample WebGL Games</h3>
                <p>Collection of sample games built with WebGL.</p>
                <a href="demos/sample-game-webgl/">View Games</a>
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