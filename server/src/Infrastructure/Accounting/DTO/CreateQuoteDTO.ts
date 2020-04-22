import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsIn,
  IsArray,
  ValidateNested,
  ArrayNotEmpty
} from 'class-validator';
import {Quote} from 'src/Domain/Accounting/Quote.entity';
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
  @ArrayNotEmpty()
  @Type(() => CreateQuoteItemDTO)
  @ValidateNested({each: true})
  public items: CreateQuoteItemDTO[];
}
