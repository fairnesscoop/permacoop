import { ICommand } from 'src/Application/ICommand';

export class IncreaseUserSavingsRecordCommand implements ICommand {
  constructor(
    public readonly amount: number,
    public readonly userId: string,
  ) {}
}
