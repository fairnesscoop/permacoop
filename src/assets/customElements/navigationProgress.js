// @ts-check

export default class extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const progress = document.createElement('progress');
    progress.max = 100;
    progress.value = 0;
    progress.hidden = true;
    progress.setAttribute('aria-hidden', 'true');
    shadowRoot.appendChild(progress);

    const style = document.createElement('style');

    // Credit: https://stackoverflow.com/a/42292476
    style.textContent = `
      progress {
        position: fixed;
        width: 100vw;
        height: 4px;
        background: none;
        border: none;
      }
      progress::-webkit-progress-bar {
        background: none;
      }
      progress::-webkit-progress-value {
        background-color: var(--background-action-violet);
      }
      progress::-moz-progress-bar {
        background-color: var(--background-action-violet);
      }
    `;
    shadowRoot.appendChild(style);

    document.addEventListener('pc:fetchStart', () => {
      progress.hidden = false;
    });

    document.addEventListener('pc:fetchProgress', event => {
      if (event instanceof CustomEvent) {
        progress.value = event.detail.value;
      }
    });

    const finishProgress = () => {
      return new Promise(resolve => {
        const advance = (/** @type {number} */ value) => {
          // Credit: https://easings.net/#easeInOutCubic
          const x = value / progress.max;
          const tween =
            x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

          progress.value = tween * progress.max;

          if (progress.value < 100) {
            setTimeout(() => advance(value + 2), 1);
          } else {
            resolve(null);
          }
        };

        advance(progress.value);
      });
    };

    document.addEventListener('pc:fetchEnd', () => {
      finishProgress().then(() => {
        progress.hidden = true;
        progress.value = 0;
      });
    });
  }
}
