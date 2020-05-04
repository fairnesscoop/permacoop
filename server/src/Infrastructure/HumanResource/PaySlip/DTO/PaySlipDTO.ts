import {ApiModelProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsDateString, IsUUID} from 'class-validator';

export class PaySlipDTO {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsDateString()
  public date: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsUUID()
  public userId: string;
}
