import { IsOptional, IsUUID, IsISO8601 } from 'class-validator';

// TODO test
export class FairCalendarControllerDTO {
  @IsUUID()
  @IsOptional()
  public userId?: string;

  @IsISO8601()
  @IsOptional()
  public date?: string;
}
