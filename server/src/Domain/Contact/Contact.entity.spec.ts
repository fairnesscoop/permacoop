import { LeaveRequestAlreadyExistForThisPeriodException } from '../HumanResource/Leave/Exception/LeaveRequestAlreadyExistForThisPeriodException';
import { Contact } from './Contact.entity';
import { mock, instance } from 'ts-mockito';
import { User } from '../HumanResource/User/User.entity';

describe('Contact.entity', () => {
  it('testGetters', () => {
    const referent = mock(User);
    const contact = new Contact(
      'Sarah',
      'Conor',
      'Aperture Science',
      'sarah.conor@aperture.org',
      '0612345678',
      'Lorem ipsum',
      instance(referent)
    );

    expect(contact.getId()).toBe(undefined);
    expect(contact.getFirstName()).toBe('Sarah');
    expect(contact.getLastName()).toBe('Conor');
    expect(contact.getCompany()).toBe('Aperture Science');
    expect(contact.getEmail()).toBe('sarah.conor@aperture.org');
    expect(contact.getPhoneNumber()).toBe('0612345678');
    expect(contact.getNotes()).toBe('Lorem ipsum');
    expect(contact.getContactedBy()).toBe(instance(referent));
  });

  it('testUpdate', () => {
    const referent1 = mock(User);
    const referent2 = mock(User);
    const contact = new Contact(
      'Sarah',
      'Conor',
      'Aperture Science',
      'sarah.conor@aperture.org',
      '0612345678',
      'Lorem ipsum',
      instance(referent1)
    );

    contact.update(
      'first_name',
      'last_name',
      'company',
      'first.last@org.coop',
      '0687654321',
      'Et dolor sit amet',
      instance(referent2)
    );

    expect(contact.getId()).toBe(undefined);
    expect(contact.getFirstName()).toBe('first_name');
    expect(contact.getLastName()).toBe('last_name');
    expect(contact.getCompany()).toBe('company');
    expect(contact.getEmail()).toBe('first.last@org.coop');
    expect(contact.getPhoneNumber()).toBe('0687654321');
    expect(contact.getNotes()).toBe('Et dolor sit amet');
    expect(contact.getContactedBy()).toBe(instance(referent2));
  });
});
