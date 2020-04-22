import {ApiModelProperty} from '@nestjs/swagger';
import {IsPositive, IsNotEmpty, IsInt} from 'class-validator';
import {ICreateQuote} from 'src/Application/Accounting/Command/Quote/CreateQuoteItemsCommand';

export class CreateQuoteItemDTO implements ICreateQuote {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  public quantity: number;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsPositive()
  public dailyRate: number;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsPositive()
  public vat: number;

  @ApiModelProperty()
  @IsNotEmpty()
  public title: string;
}
