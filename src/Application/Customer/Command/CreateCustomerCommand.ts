import { ICommand } from 'src/Application/ICommand';

export class CreateCustomerCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly street: string,
    public readonly city: string,
    public readonly zipCode: string,
    public readonly country: string
  ) {}
}
