import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';

export class ModerationDTO {
  @IsOptional()
  @ApiModelPropertyOptional()
  public comment: string;
}
