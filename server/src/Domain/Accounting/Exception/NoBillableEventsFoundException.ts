export class NoBillableEventsFoundException extends Error {
  constructor() {
    super('accounting.invoices.errors.no_billable_events_found');
  }
}
