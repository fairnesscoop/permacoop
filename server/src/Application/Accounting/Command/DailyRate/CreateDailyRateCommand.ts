import { ICommand } from 'src/Application/ICommand';

export class CreateDailyRateCommand implements ICommand {
  constructor(
    public readonly amount: number,
    public readonly userId: string,
    public readonly customerId: string,
    public readonly taskId: string
  ) {}
}
