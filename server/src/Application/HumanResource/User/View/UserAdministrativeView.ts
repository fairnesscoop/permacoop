import {UserRole} from 'src/Domain/HumanResource/User/User.entity';
import {ContractType} from 'src/Domain/HumanResource/User/UserAdministrative.entity';

export class UserAdministrativeView {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly role: UserRole,
    public readonly annualEarnings: number,
    public readonly contract: ContractType,
    public readonly executivePosition: boolean,
    public readonly healthInsurance: boolean,
    public readonly joiningDate: string,
    public readonly leavingDate: string,
    public readonly transportFee: number,
  ) {}
}
