import {
  ContractType,
  WorkingTimeType
} from 'src/Domain/HumanResource/User/UserAdministrative.entity';

export class UserAdministrativeView {
  constructor(
    public readonly annualEarnings: number,
    public readonly contract: ContractType,
    public readonly workingTime: WorkingTimeType,
    public readonly executivePosition: string,
    public readonly healthInsurance: string,
    public readonly joiningDate: string,
    public readonly leavingDate: string,
    public readonly transportFee: number
  ) {}
}
