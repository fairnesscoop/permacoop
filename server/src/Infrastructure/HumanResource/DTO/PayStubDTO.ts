import {ApiModelProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsDateString, IsUUID} from 'class-validator';

export class PayStubDTO {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsDateString()
  public date: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsUUID()
  public userId: string;
}
