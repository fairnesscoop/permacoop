import {ApiModelProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsNumberString} from 'class-validator';

export class PaginationDTO {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsNumberString()
  public page: string;
}
