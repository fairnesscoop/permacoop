import { Contact } from './Contact.entity';

describe('Contact.entity', () => {
  it('testGetters', () => {
    const contact = new Contact(
      'Sarah',
      'Conor',
      'Aperture Science',
      'sarah.conor@aperture.org',
      '0612345678',
      'Lorem ipsum'
    );

    expect(contact.getId()).toBe(undefined);
    expect(contact.getFirstName()).toBe('Sarah');
    expect(contact.getLastName()).toBe('Conor');
    expect(contact.getCompany()).toBe('Aperture Science');
    expect(contact.getEmail()).toBe('sarah.conor@aperture.org');
    expect(contact.getPhoneNumber()).toBe('0612345678');
    expect(contact.getNotes()).toBe('Lorem ipsum');
  });
});
