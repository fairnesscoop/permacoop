import { IsISO8601, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddEventControllerDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  public startDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  public endDate: string;
}
