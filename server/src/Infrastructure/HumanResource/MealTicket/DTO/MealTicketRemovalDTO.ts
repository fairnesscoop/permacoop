import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString } from 'class-validator';

export class MealTicketRemovalDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  public date: string;

  @ApiProperty()
  @IsNotEmpty()
  public comment: string;
}
