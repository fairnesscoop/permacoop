export default class extends HTMLAnchorElement {
  connectedCallback() {
    const blob = new Blob([this.dataset.blobContent], {
      type: this.dataset.blobMimeType
    });

    this.href = URL.createObjectURL(blob);
  }
}
