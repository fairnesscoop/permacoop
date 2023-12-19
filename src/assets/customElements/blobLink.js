// @ts-check

export default class extends HTMLAnchorElement {
  connectedCallback() {
    const blobContent = this.dataset.blobContent;

    if (!blobContent) {
      throw new Error('data-blob-content is missing or empty');
    }

    const blob = new Blob([blobContent], {
      type: this.dataset.blobMimeType
    });

    this.href = URL.createObjectURL(blob);
  }
}
