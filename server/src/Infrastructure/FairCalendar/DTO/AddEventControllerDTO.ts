import { IsISO8601, IsNotEmpty } from 'class-validator';

export class AddEventControllerDTO {
  @IsNotEmpty()
  @IsISO8601()
  public startDate: string;

  @IsNotEmpty()
  @IsISO8601()
  public endDate: string;
}
