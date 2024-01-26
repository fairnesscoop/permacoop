import { IsNotEmpty, IsUUID } from 'class-validator';

export class ProjectDTO {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  @IsUUID()
  public customerId: string;
}
