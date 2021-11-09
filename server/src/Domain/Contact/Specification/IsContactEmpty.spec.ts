import { IsContactEmpty } from 'src/Domain/Contact/Specification/IsContactEmpty';

describe('IsContactEmpty', () => {
  const isContactEmpty = new IsContactEmpty();

  it('testContactEmpty', () => {
    expect(isContactEmpty.isSatisfiedBy('', '', '')).toBe(true);
  });

  it('testContactNotEmpty', () => {
    expect(isContactEmpty.isSatisfiedBy('Sarah', '', '')).toBe(false);
    expect(isContactEmpty.isSatisfiedBy('', 'Conor', '')).toBe(false);
    expect(isContactEmpty.isSatisfiedBy('', '', 'Aperture Science')).toBe(
      false
    );
  });
});
