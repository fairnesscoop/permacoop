// @ts-check
import { onParsed } from '../lib/customElements';

export default class extends HTMLFormElement {
  connectedCallback() {
    onParsed(() => {
      const missionFields = document.getElementById('mission-fields');

      if (!missionFields) {
        throw new Error('#mission-fields is missing');
      }

      const type = /** @type {HTMLSelectElement} */ (this.type);

      type.addEventListener('change', event => {
        if (!event.target) {
          return;
        }
        const isMission = event.target['value'] === 'mission';
        missionFields.hidden = !isMission;
        this.projectId.disabled = !isMission;
        this.taskId.disabled = !isMission;
      });
    });
  }
}
