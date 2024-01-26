// @ts-check
import { onParsed } from '../lib/customElements';

export default class extends HTMLElement {
  connectedCallback() {
    onParsed(() => {
      const missionFields = document.getElementById('mission-fields');

      if (!missionFields) {
        throw new Error('#mission-fields is missing');
      }

      const form = /** @type {HTMLFormElement} */ (this.querySelector('form'));
      const type = /** @type {HTMLSelectElement} */ (form.type);

      type.addEventListener('change', event => {
        if (!event.target) {
          return;
        }
        const isMission = event.target['value'] === 'mission';
        missionFields.hidden = !isMission;
        form.projectId.disabled = !isMission;
        form.taskId.disabled = !isMission;
      });
    });
  }
}
