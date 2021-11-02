export class EmptyContactException extends Error {
  constructor() {
    super('crm.contacts.errors.empty');
  }
}
