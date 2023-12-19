// @ts-check
import Calendar from '@event-calendar/core';
import DayGrid from '@event-calendar/day-grid';
import Interaction from '@event-calendar/interaction';
import { format, subDays } from 'date-fns';

export default class extends HTMLElement {
  /** @type {string} */
  #addUrlTemplate;

  connectedCallback() {
    this.dataset.testid = 'pc-event-calendar';

    const events = JSON.parse(this.dataset.eventsJson || '{}');
    const addUrlTemplate = this.dataset.addUrlTemplate;
    const date = this.dataset.date || new Date('now').toISOString();

    if (!addUrlTemplate) {
      throw new Error('data-add-url-template is missing');
    }

    this.#addUrlTemplate = addUrlTemplate;
    this.#createCalendar(date, events);
  }

  /**
   * @param {Date} startDate
   * @param {Date} endDate
   */
  #goToEventCreate = (startDate, endDate) => {
    const url = this.#addUrlTemplate
      .replace(':startDate', format(startDate, 'yyyy-MM-dd'))
      .replace(':endDate', format(endDate, 'yyyy-MM-dd'));

    window.location.href = url;
  };

  /**
   * @param {string} date
   * @param {any[]} events
   */
  #createCalendar = (date, events) => {
    const ec = new Calendar({
      target: this,
      props: {
        plugins: [DayGrid, Interaction],
        options: {
          view: 'dayGridMonth',
          events,
          locale: 'fr',
          hiddenDays: [
            6, // Saturday
            0 // Sunday
          ],
          date,
          headerToolbar: { start: '', center: '', end: '' },
          dayMaxEvents: true,
          eventStartEditable: false,
          eventDurationEditable: false,
          // TODO: add testid on days
          eventContent: ({ event }) => {
            const url = event.extendedProps.url;
            if (url) {
              return {
                html: `<a href="${url}">${event.title}</a>`
              };
            }
            return event.title;
          },
          dateClick: ({ event, date }) => {
            this.#goToEventCreate(date, date);
          },
          selectable: true,
          selectBackgroundColor: 'var(--background-action-violet)',
          select: ({ start, end }) => {
            // By default, range will stay selected if navigating using the back button.
            ec.unselect();

            this.#goToEventCreate(start, subDays(end, 1));
          }
        }
      }
    });
  };
}
