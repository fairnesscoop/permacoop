import {ICommand} from 'src/Application/ICommand';

export class UpdateCustomerCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly street: string,
    public readonly city: string,
    public readonly zipCode: string,
    public readonly country: string
  ) {}
}
