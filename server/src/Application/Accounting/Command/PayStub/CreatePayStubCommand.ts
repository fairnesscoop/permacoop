import {ICommand} from 'src/Application/ICommand';

export class CreatePayStubCommand implements ICommand {
  constructor(
    public readonly date: string,
    public readonly userId: string,
    public readonly fileId: string
  ) {}
}
