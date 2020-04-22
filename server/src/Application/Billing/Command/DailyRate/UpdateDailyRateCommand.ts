import {ICommand} from 'src/Application/ICommand';

export class UpdateDailyRateCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly amount: number,
    public readonly userId: string,
    public readonly customerId: string,
    public readonly taskId: string
  ) {}
}
