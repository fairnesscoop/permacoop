import {ApiModelProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class CustomerDTO {
  @ApiModelProperty()
  @IsNotEmpty()
  public readonly name: string;
}
