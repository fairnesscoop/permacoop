// @ts-check
import { format } from 'date-fns';
import { createCookie } from '../lib/cookie';

export default class extends HTMLElement {
  /** @type {string} */
  #addUrlTemplate;

  connectedCallback() {
    const events = JSON.parse(this.dataset.eventsJson || '{}');
    const addUrlTemplate = this.dataset.addUrlTemplate;
    const date = this.dataset.date || new Date('now').toISOString();

    if (!addUrlTemplate) {
      throw new Error('data-add-url-template is missing');
    }

    this.#addUrlTemplate = addUrlTemplate;

    const viewToggleFieldset = /** @type {HTMLFieldSetElement} */ (this.querySelector(
      '#view-toggle'
    ));
    viewToggleFieldset.hidden = false;

    const listView = /** @type {HTMLElement} */ (this.querySelector(
      '#list-view'
    ));
    listView.hidden = true;
    const listViewRadio = /** @type {HTMLInputElement} */ (this.querySelector(
      '#view-radio-list'
    ));

    const calendarView = /** @type {HTMLElement} */ (this.querySelector(
      '#calendar-view'
    ));
    const calendarViewRadio = /** @type {HTMLInputElement} */ (this.querySelector(
      '#view-radio-calendar'
    ));

    const initialView =
      this.getAttribute('data-view') || calendarViewRadio.value;

    const ensureCalendarCreated = async () => {
      if (!calendarView.hasAttribute('data-created')) {
        const { createCalendar } = await import('../lib/lazy/eventCalendar');
        createCalendar(calendarView, date, events, this.#goToEventCreate);
        calendarView.setAttribute('data-created', 'true');
      }
    };

    if (initialView === calendarViewRadio.value) {
      ensureCalendarCreated();
    }

    calendarView.hidden = initialView === listViewRadio.value;
    listView.hidden = initialView === calendarViewRadio.value;

    listViewRadio.addEventListener('change', () => {
      calendarView.hidden = true;
      listView.hidden = false;
      this._storePreferredView(listViewRadio.value);
    });

    calendarViewRadio.addEventListener('change', () => {
      listView.hidden = true;
      ensureCalendarCreated().then(() => {
        calendarView.hidden = false;
        this._storePreferredView(calendarViewRadio.value);
      });
    });
  }

  /**
   * @param {Date} startDate
   * @param {Date} endDate
   */
  #goToEventCreate = (startDate, endDate) => {
    if (this.dataset.isCalendarOfLoggedUser !== 'true') {
      return;
    }

    const url = this.#addUrlTemplate
      .replace(':startDate', format(startDate, 'yyyy-MM-dd'))
      .replace(':endDate', format(endDate, 'yyyy-MM-dd'));

    window.location.href = url;
  };

  /**
   * @param {string} viewName
   */
  _storePreferredView(viewName) {
    createCookie('faircalendar_view', viewName);
  }
}
