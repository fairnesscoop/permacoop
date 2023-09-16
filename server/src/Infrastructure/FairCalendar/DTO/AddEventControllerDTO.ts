import { IsISO8601 } from 'class-validator';

export class AddEventControllerDTO {
  @IsISO8601()
  public date: string;
}
