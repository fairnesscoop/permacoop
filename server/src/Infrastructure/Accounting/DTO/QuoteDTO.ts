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
import {QuoteStatus} from 'src/Domain/Accounting/Quote.entity';
import {QuoteItemDTO} from './QuoteItemDTO';

export class QuoteDTO {
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

  @ApiModelProperty({type: [QuoteItemDTO]})
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => QuoteItemDTO)
  @ValidateNested({each: true})
  public items: QuoteItemDTO[];
}
