import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  public id: string;
}
