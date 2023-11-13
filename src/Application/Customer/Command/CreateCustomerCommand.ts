import { ICommand } from 'src/Application/ICommand';

export class CreateCustomerCommand implements ICommand {
  constructor(public readonly name: string) {}
}
