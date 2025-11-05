import './Visualization.js';
import { store } from './store.js';

const visualizationsContainer = document.getElementById('visualizations');

// Initialize with one visualization
addVisualization();

function addVisualization() {
  const viz = document.createElement('x-visualization');
  visualizationsContainer.appendChild(viz);
}

function removeVisualization() {
  const vizs = visualizationsContainer.querySelectorAll('x-visualization');
  if (vizs.length > 1) {
    visualizationsContainer.removeChild(vizs[vizs.length - 1]);
  }
}

// Control panel bindings
document.getElementById('count').addEventListener('input', (e) => {
  store.pointCount.value = parseInt(e.target.value);
});

document.getElementById('scale').addEventListener('input', (e) => {
  store.scale.value = parseFloat(e.target.value);
});

document.getElementById('rot').addEventListener('input', (e) => {
  store.rotationSpeed.value = parseFloat(e.target.value);
});

document.getElementById('intensity').addEventListener('input', (e) => {
  store.colorIntensity.value = parseFloat(e.target.value);
});

document.getElementById('radius').addEventListener('input', (e) => {
  store.interactionRadius.value = parseFloat(e.target.value);
});

document.getElementById('line').addEventListener('input', (e) => {
  store.lineDistance.value = parseFloat(e.target.value);
});

document.getElementById('reset').addEventListener('click', () => {
  store.scale.value = 1;
  store.rotationSpeed.value = 0.02;
  store.colorIntensity.value = 1;
  store.interactionRadius.value = 0.08;
  store.lineDistance.value = 0.06;
  document.getElementById('scale').value = 1;
  document.getElementById('rot').value = 0.02;
  document.getElementById('intensity').value = 1;
  document.getElementById('radius').value = 0.08;
  document.getElementById('line').value = 0.06;
});

document.getElementById('add').addEventListener('click', addVisualization);
document.getElementById('remove').addEventListener('click', removeVisualization);

// Mouse tracking (global for all visualizations)
document.addEventListener('mousemove', (e) => {
  const rect = document.body.getBoundingClientRect();
  store.mouseX.value = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  store.mouseY.value = ((e.clientY - rect.top) / rect.height) * -2 + 1;
});
