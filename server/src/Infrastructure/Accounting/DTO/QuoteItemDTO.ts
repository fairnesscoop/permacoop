import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, IsNotEmpty, IsInt } from 'class-validator';
import { ICreateQuote } from 'src/Application/Accounting/Command/Quote/CreateQuoteItemsCommand';

export class QuoteItemDTO implements ICreateQuote {
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  public quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  public dailyRate: number;

  @ApiProperty()
  @IsNotEmpty()
  public title: string;
}
