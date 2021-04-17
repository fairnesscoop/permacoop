import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class IdDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  public id: string;
}
