import { ICommand } from 'src/Application/ICommand';

export class CreateContactCommand implements ICommand {
  constructor(
    public readonly firstName?: string,
    public readonly lastName?: string,
    public readonly company?: string,
    public readonly email?: string,
    public readonly notes?: string,
    public readonly phoneNumber?: string
  ) {}
}
