import {ApiModelPropertyOptional} from '@nestjs/swagger';
import {IsUUID, IsOptional} from 'class-validator';

export class FiltersDTO {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsUUID()
  public customerId?: string;
}
