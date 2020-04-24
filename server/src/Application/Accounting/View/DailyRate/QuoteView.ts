import {CustomerView} from 'src/Application/Customer/View/CustomerView';
import {ProjectView} from 'src/Application/Project/View/ProjectView';
import {QuoteStatus} from 'src/Domain/Accounting/Quote.entity';

export class QuoteView {
  constructor(
    public readonly id: string,
    public readonly quoteId: string,
    public readonly status: QuoteStatus,
    public readonly createdAt: Date,
    public readonly amountInclusiveOfTaxe: number,
    public readonly customer: CustomerView,
    public readonly project?: ProjectView
  ) {}
}
