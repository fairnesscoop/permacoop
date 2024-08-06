import {
  UserAdministrative,
  ContractType,
  WorkingTimeType
} from './UserAdministrative.entity';

describe('UserAdministrative.entity', () => {
  it('testGetters', () => {
    const admin = new UserAdministrative(
      5000000,
      true,
      true,
      ContractType.CDD,
      WorkingTimeType.FULL_TIME,
      '2020-01-01',
      '2021-01-01',
      7550,
      7000,
      3000
    );

    expect(admin.getId()).toBe(undefined);
    expect(admin.getAnnualEarnings()).toBe(5000000);
    expect(admin.getContract()).toBe(ContractType.CDD);
    expect(admin.getWorkingTime()).toBe(WorkingTimeType.FULL_TIME);
    expect(admin.getJoiningDate()).toBe('2020-01-01');
    expect(admin.getLeavingDate()).toBe('2021-01-01');
    expect(admin.getTransportFee()).toBe(7550);
    expect(admin.isExecutivePosition()).toBe(true);
    expect(admin.haveHealthInsurance()).toBe(true);
    expect(admin.getSustainableMobilityFee()).toBe(7000);
    expect(admin.getSportsPassFee()).toBe(3000);
  });

  it('testUpdate', () => {
    const admin = new UserAdministrative(
      5000000,
      true,
      true,
      ContractType.CDD,
      WorkingTimeType.FULL_TIME,
      '2020-01-01',
      null,
      7550,
      7000,
      3000
    );

    admin.update(
      3000000,
      ContractType.APPRENTICESHIP,
      WorkingTimeType.PART_TIME,
      false,
      false,
      '2020-01-02',
      '2021-01-02',
      null,
      3000,
      2000
    );
    expect(admin.getAnnualEarnings()).toBe(3000000);
    expect(admin.getContract()).toBe(ContractType.APPRENTICESHIP);
    expect(admin.getWorkingTime()).toBe(WorkingTimeType.PART_TIME);
    expect(admin.isExecutivePosition()).toBe(false);
    expect(admin.haveHealthInsurance()).toBe(false);
    expect(admin.getJoiningDate()).toBe('2020-01-02');
    expect(admin.getLeavingDate()).toBe('2021-01-02');
    expect(admin.getTransportFee()).toBe(null);
    expect(admin.getSustainableMobilityFee()).toBe(3000);
    expect(admin.getSportsPassFee()).toBe(2000);
  });
});
