import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty, IsUUID, IsDateString, IsOptional} from 'class-validator';

export class MonthlyActivitiesDTO {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsUUID()
  public userId: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsUUID()
  public projectId?: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsDateString()
  public date: string;
}
