import Calendar from '@event-calendar/core';
import DayGrid from '@event-calendar/day-grid';
import Interaction from '@event-calendar/interaction';
import { format, subDays } from 'date-fns';

export default class extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const events = JSON.parse(this.dataset.eventsJson);
    const addUrlTemplate = this.dataset.addUrlTemplate;

    this.classList.add('pc-eventcalendar');

    let ec = new Calendar({
      target: this,
      props: {
        plugins: [DayGrid, Interaction],
        options: {
          view: 'dayGridMonth',
          events,
          locale: 'fr',
          hiddenDays: [
            0, // Sunday
            6 // Saturday
          ],
          date: this.dataset.date,
          headerToolbar: { start: '', center: '', end: '' },
          dayMaxEvents: true,
          selectable: true,
          selectBackgroundColor: 'var(--background-action-violet)',
          select: info => {
            const startDate = format(info.start, 'yyyy-MM-dd');
            const endDate = format(subDays(info.end, 1), 'yyyy-MM-dd');

            const url = addUrlTemplate
              .replace(':startDate', startDate)
              .replace(':endDate', endDate);

            // By default, range will stay selected if navigating using the
            // back button.
            ec.unselect();

            window.location = url;
          }
        }
      }
    });
  }
}
