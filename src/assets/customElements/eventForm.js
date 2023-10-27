import { onParsed } from '../lib/customElements';

export default class extends HTMLFormElement {
  connectedCallback() {
    onParsed(() => {
      const missionFields = this.querySelector('#mission-fields');

      this.type.addEventListener('change', event => {
        const isMission = event.target.value === 'mission';
        missionFields.hidden = !isMission;
        this.projectId.disabled = !isMission;
        this.taskId.disabled = !isMission;
      });
    });
  }
}
