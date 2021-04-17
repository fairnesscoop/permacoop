import { ICommand } from 'src/Application/ICommand';

export class CreatePaySlipCommand implements ICommand {
  constructor(
    public readonly date: string,
    public readonly userId: string,
    public readonly fileId: string
  ) {}
}
