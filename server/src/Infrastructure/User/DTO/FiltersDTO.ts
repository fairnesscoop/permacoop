import {ApiModelPropertyOptional} from '@nestjs/swagger';
import {IsOptional, IsBooleanString} from 'class-validator';

export class FiltersDTO {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsBooleanString()
  public withAccountant;
}
