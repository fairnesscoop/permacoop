// The 'connectedCallback' on customElements is fired when the opening tag
// is processed. So children may not be available. If custom elements need to
// process them, then they need to wait for the rest of the DOM to be processed.
// This can be done by waiting for the next step in the event loop.
// This function encapsulates this oddity so the resulting code in custom
// elements is cleaner.
export function onParsed(cb) {
  requestAnimationFrame(cb);
}
