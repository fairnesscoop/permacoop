import { ICommand } from 'src/Application/ICommand';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { ContractType } from 'src/Domain/HumanResource/User/UserAdministrative.entity';

export class UpdateUserCommand implements ICommand {
  constructor(
    public readonly id: string,
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
