import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class TaskDTO {
  @ApiProperty()
  @IsNotEmpty()
  public name: string;
}
