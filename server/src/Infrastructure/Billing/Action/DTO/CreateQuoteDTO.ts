import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsIn,
  IsArray,
  ValidateNested
} from 'class-validator';
import {Quote} from 'src/Domain/Billing/Quote.entity';
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

  @ApiModelProperty()
  @IsNotEmpty()
  @IsIn(Quote.getAvailableStatus())
  public status: string;

  @ApiModelProperty({type: [CreateQuoteItemDTO]})
  @IsArray()
  @ValidateNested({each: true})
  public items: CreateQuoteItemDTO[];
}
