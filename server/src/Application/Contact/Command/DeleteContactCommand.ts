import { ICommand } from 'src/Application/ICommand';

export class DeleteContactCommand implements ICommand {
  constructor(public readonly id: string) {}
}
