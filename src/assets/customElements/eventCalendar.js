// @ts-check
import * as Turbo from '@hotwired/turbo';
import Calendar from '@event-calendar/core';
import DayGrid from '@event-calendar/day-grid';
import Interaction from '@event-calendar/interaction';
import { format, subDays } from 'date-fns';

export default class extends HTMLElement {
  /** @type {Calendar} */
  #ec;

  /** @type{string} */
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
    this.#ec = this.#createCalendar(date, events);

    document.addEventListener('turbo:before-cache', this.#onTurboBeforeCache);
  }

  /**
   * @param {Date} startDate
   * @param {Date} endDate
   */
  #goToEventCreate = (startDate, endDate) => {
    const url = this.#addUrlTemplate
      .replace(':startDate', format(startDate, 'yyyy-MM-dd'))
      .replace(':endDate', format(endDate, 'yyyy-MM-dd'));

    Turbo.visit(url);
  };

  /**
   * @param {string} date
   * @param {any[]} events
   * @returns {Calendar}
   */
  #createCalendar = (date, events) => {
    return new Calendar({
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
                html: `<a href="${url}" data-turbo-frame="_top">${event.title}</a>`
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
            this.#goToEventCreate(start, subDays(end, 1));
          }
        }
      }
    });
  };

  #onTurboBeforeCache = () => {
    this.#ec.destroy();
  };

  disconnectedCallback() {
    document.removeEventListener(
      'turbo:before-cache',
      this.#onTurboBeforeCache
    );
  }
}
