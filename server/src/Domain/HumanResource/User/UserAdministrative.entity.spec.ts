import {UserAdministrative, ContractType} from './UserAdministrative.entity';

describe('UserAdministrative.entity', () => {
  it('testGetters', () => {
    const admin = new UserAdministrative(
      5000000,
      true,
      true,
      ContractType.CDD,
      '2020-01-01',
      '2021-01-01',
      75500
    );

    expect(admin.getId()).toBe(undefined);
    expect(admin.getAnnualEarnings()).toBe(5000000);
    expect(admin.getContract()).toBe(ContractType.CDD);
    expect(admin.getJoiningDate()).toBe('2020-01-01');
    expect(admin.getLeavingDate()).toBe('2021-01-01');
    expect(admin.getTransportFee()).toBe(75500);
    expect(admin.isExecutivePosition()).toBe(true);
    expect(admin.haveHealthInsurance()).toBe(true);
  });
});
