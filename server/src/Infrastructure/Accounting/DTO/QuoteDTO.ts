import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsArray,
  ValidateNested,
  ArrayNotEmpty,
  IsEnum
} from 'class-validator';
import { QuoteStatus } from 'src/Domain/Accounting/Quote.entity';
import { QuoteItemDTO } from './QuoteItemDTO';

export class QuoteDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  public projectId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  public customerId: string;

  @ApiProperty({ enum: QuoteStatus })
  @IsNotEmpty()
  @IsEnum(QuoteStatus)
  public status: QuoteStatus;

  @ApiProperty({ type: [QuoteItemDTO] })
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => QuoteItemDTO)
  @ValidateNested({ each: true })
  public items: QuoteItemDTO[];
}
