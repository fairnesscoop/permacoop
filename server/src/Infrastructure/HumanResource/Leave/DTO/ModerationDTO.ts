import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export enum ModerationAction {
  ACCEPT = 'accept',
  DENY = 'deny'
}

export class ModerationDTO {
  @IsOptional()
  public comment: string;

  @IsNotEmpty()
  @IsEnum(ModerationAction)
  public action: ModerationAction;
}
