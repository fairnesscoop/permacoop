import { IsOptional, IsUUID, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

// TODO test
export class FairCalendarControllerDTO {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  public userId?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  public month?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  public year?: number;
}
