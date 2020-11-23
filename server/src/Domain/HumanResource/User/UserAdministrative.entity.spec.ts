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
      7550
    );

    expect(admin.getId()).toBe(undefined);
    expect(admin.getAnnualEarnings()).toBe(5000000);
    expect(admin.getContract()).toBe(ContractType.CDD);
    expect(admin.getJoiningDate()).toBe('2020-01-01');
    expect(admin.getLeavingDate()).toBe('2021-01-01');
    expect(admin.getTransportFee()).toBe(7550);
    expect(admin.isExecutivePosition()).toBe(true);
    expect(admin.haveHealthInsurance()).toBe(true);
  });

  it('testUpdate', () => {
    const admin = new UserAdministrative(
      5000000,
      true,
      true,
      ContractType.CDD,
      '2020-01-01',
      null,
      7550
    );

    admin.update(
      3000000,
      ContractType.APPRENTICESHIP,
      false,
      false,
      '2020-01-02',
      '2021-01-02',
      null
    );
    expect(admin.getAnnualEarnings()).toBe(3000000);
    expect(admin.getContract()).toBe(ContractType.APPRENTICESHIP);
    expect(admin.isExecutivePosition()).toBe(false);
    expect(admin.haveHealthInsurance()).toBe(false);
    expect(admin.getJoiningDate()).toBe('2020-01-02');
    expect(admin.getLeavingDate()).toBe('2021-01-02');
    expect(admin.getTransportFee()).toBe(null);
  });
});
