import { IsOptional, IsUUID, IsDateString } from 'class-validator';

// TODO test
export class FairCalendarControllerDTO {
  @IsUUID()
  @IsOptional()
  public userId?: string;

  @IsDateString()
  @IsOptional()
  public date?: string;
}
