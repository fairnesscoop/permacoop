import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class ProjectDTO {
  @IsNotEmpty()
  public name: string;
  @IsOptional()
  @Transform((_, { active }) => active === 'true')
  @IsBoolean()
  public active? = false;

  @IsNotEmpty()
  @IsUUID()
  public customerId: string;
}
