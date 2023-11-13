import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CustomerDTO {
  @ApiProperty()
  @IsNotEmpty()
  public name: string;
}
