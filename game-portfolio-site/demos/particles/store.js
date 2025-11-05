import { signal } from './signals.js';
import { derivedSignal } from './derivedSignal.js';

export const store = {
  pointCount: signal(100_000),
  rotationSpeed: signal(0.01),
  scale: signal(1),
  colorIntensity: signal(1.0),
  mouseX: signal(0),
  mouseY: signal(0),
  interactionRadius: signal(0.05),
  interVizForce: signal(0.01),
  lineDistance: signal(0.05),
  lineOpacity: signal(0.5),
  visualizations: signal([]),
};

// Derived color intensity based on signals
store.totalVisualIntensity = derivedSignal(
  [store.scale, store.colorIntensity, store.rotationSpeed],
  () => store.scale.value * store.colorIntensity.value * (1 + store.rotationSpeed.value)
);
