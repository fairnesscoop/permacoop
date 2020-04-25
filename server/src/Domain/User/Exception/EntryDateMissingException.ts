export class EntryDateMissingException extends Error {
  constructor() {
    super('user.errors.entry_date_missing');
  }
}
