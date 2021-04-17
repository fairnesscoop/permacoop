import { ICommand } from 'src/Application/ICommand';

export interface ICreateQuote {
  title: string;
  dailyRate: number;
  quantity: number;
}

export class CreateQuoteItemsCommand implements ICommand {
  constructor(
    public readonly quoteId: string,
    public readonly items: ICreateQuote[]
  ) {}
}
