import {ApiModelProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsUUID, IsOptional, IsPositive} from 'class-validator';

export class DailyRateDTO {
  @ApiModelProperty()
  @IsOptional()
  @IsUUID()
  public userId: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsUUID()
  public customerId: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsUUID()
  public taskId: string;

  @ApiModelProperty()
  @IsPositive()
  @IsNotEmpty()
  public amount: number;
}
