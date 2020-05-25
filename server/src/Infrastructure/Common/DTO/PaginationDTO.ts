import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsNumberString} from 'class-validator';

export class PaginationDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  public page: string;
}
