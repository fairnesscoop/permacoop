import { ICommand } from 'src/Application/ICommand';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { ContractType } from 'src/Domain/HumanResource/User/UserAdministrative.entity';

export interface IUserAdministrativeCommand {
  annualEarnings: number;
  contract: ContractType;
  executivePosition: boolean;
  healthInsurance: boolean;
  joiningDate: string;
  leavingDate: string;
  transportFee: number;
}

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: UserRole,
    public readonly userAdministrative?: IUserAdministrativeCommand
  ) {}
}
