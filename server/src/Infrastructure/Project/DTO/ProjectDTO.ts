import {ApiProperty} from '@nestjs/swagger';
import {IsIn, IsNotEmpty, IsUUID} from 'class-validator';

export class ProjectDTO {
  @ApiProperty()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsIn([7, 8])
  public dayDuration: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  public customerId: string;
}
