export class ContactNotFoundException extends Error {
  constructor() {
    super('crm.contacts.errors.not_found');
  }
}
