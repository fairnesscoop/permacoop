import { IsNotEmpty, IsUUID } from 'class-validator';

export class IdDTO {
  @IsNotEmpty()
  @IsUUID()
  public id: string;
}
