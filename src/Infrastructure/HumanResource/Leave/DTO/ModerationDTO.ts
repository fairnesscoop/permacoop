import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export enum ModerationAction {
  ACCEPT = 'accept',
  DENY = 'deny'
}

export class ModerationDTO {
  @ApiPropertyOptional()
  @IsOptional()
  public comment: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ModerationAction)
  public action: ModerationAction;
}
