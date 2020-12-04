import { ContractType } from 'src/Domain/HumanResource/User/UserAdministrative.entity';

export class UserAdministrativeView {
  constructor(
    public readonly annualEarnings: number,
    public readonly contract: ContractType,
    public readonly executivePosition: boolean,
    public readonly healthInsurance: boolean,
    public readonly joiningDate: string,
    public readonly leavingDate: string,
    public readonly transportFee: number,
  ) {}
}
