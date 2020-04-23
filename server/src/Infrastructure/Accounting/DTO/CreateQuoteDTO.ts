import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsArray,
  ValidateNested,
  ArrayNotEmpty,
  IsEnum
} from 'class-validator';
import {Quote, QuoteStatus} from 'src/Domain/Accounting/Quote.entity';
import {CreateQuoteItemDTO} from './CreateQuoteItemDTO';

export class CreateQuoteDTO {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsUUID()
  public projectId: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsUUID()
  public customerId: string;

  @ApiModelProperty({enum: QuoteStatus})
  @IsNotEmpty()
  @IsEnum(QuoteStatus)
  public status: QuoteStatus;

  @ApiModelProperty({type: [CreateQuoteItemDTO]})
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => CreateQuoteItemDTO)
  @ValidateNested({each: true})
  public items: CreateQuoteItemDTO[];
}
