import { IsOptional, IsUUID, IsNumber } from 'class-validator';

// TODO test
export class FairCalendarControllerDTO {
  @IsUUID()
  @IsOptional()
  public userId?: string;

  @IsNumber()
  @IsOptional()
  public month?: number;

  @IsNumber()
  @IsOptional()
  public year?: number;
}
