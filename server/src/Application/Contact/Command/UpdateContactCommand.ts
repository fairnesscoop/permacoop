import { ICommand } from 'src/Application/ICommand';

export class UpdateContactCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly company: string,
    public readonly email: string,
    public readonly phoneNumber: string,
    public readonly notes: string
  ) {}
}
