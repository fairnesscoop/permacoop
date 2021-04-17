import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsDateString } from 'class-validator';

export class MonthlyEventsDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  public userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  public date: string;
}
