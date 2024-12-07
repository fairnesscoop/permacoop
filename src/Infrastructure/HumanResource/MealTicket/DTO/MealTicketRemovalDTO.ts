import { IsNotEmpty, IsISO8601, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class MealTicketRemovalDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  public date: string;
}
