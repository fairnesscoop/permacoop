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

  it('testUpdate', () => {
    const contact = new Contact(
      'Sarah',
      'Conor',
      'Aperture Science',
      'sarah.conor@aperture.org',
      '0612345678',
      'Lorem ipsum'
    );

    contact.update(
      'first_name',
      'last_name',
      'company',
      'first.last@org.coop',
      '0687654321',
      'Et dolor sit amet'
    );

    expect(contact.getId()).toBe(undefined);
    expect(contact.getFirstName()).toBe('first_name');
    expect(contact.getLastName()).toBe('last_name');
    expect(contact.getCompany()).toBe('company');
    expect(contact.getEmail()).toBe('first.last@org.coop');
    expect(contact.getPhoneNumber()).toBe('0687654321');
    expect(contact.getNotes()).toBe('Et dolor sit amet');
  });
});
