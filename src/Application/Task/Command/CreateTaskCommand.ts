import { ICommand } from 'src/Application/ICommand';

export class CreateTaskCommand implements ICommand {
  constructor(public readonly name: string) {}
}
