import {ICommand} from 'src/Application/ICommand';

export class UpdateTaskCommand implements ICommand {
  constructor(public readonly id: string, public readonly name: string) {}
}
