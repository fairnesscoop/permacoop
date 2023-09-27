import { IsNotEmpty, IsISO8601, IsOptional } from 'class-validator';

export class MealTicketRemovalDTO {
  @IsNotEmpty()
  @IsISO8601()
  public date: string;
}
