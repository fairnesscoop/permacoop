import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ModerationDTO {
  @IsOptional()
  @ApiPropertyOptional()
  public comment: string;
}
