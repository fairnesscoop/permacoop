import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ProjectDTO {
  @ApiProperty()
  @IsNotEmpty()
  public name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform((_, { active }) => active === 'true')
  @IsBoolean()
  public active? = false;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  public customerId: string;
}
