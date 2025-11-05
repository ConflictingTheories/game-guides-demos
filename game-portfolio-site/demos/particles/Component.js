export class Component extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._subscriptions = new Set();
  }

  mount(template, style = '') {
    this.shadowRoot.innerHTML = `<style>${style}</style>${template}`;
  }

  bindSignal(signal, callback) {
    const unsubscribe = signal.subscribe(callback);
    this._subscriptions.add(unsubscribe);
    return unsubscribe;
  }

  emit(eventName, detail) {
    this.dispatchEvent(new CustomEvent(eventName, { detail, bubbles: true }));
  }

  disconnectedCallback() {
    this._subscriptions.forEach(unsub => unsub());
    this._subscriptions.clear();
  }

  clearSubscriptions() {
    this._subscriptions.forEach(unsub => unsub());
    this._subscriptions.clear();
  }
}
