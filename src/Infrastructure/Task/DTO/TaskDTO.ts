import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class TaskDTO {
  @ApiProperty()
  @IsNotEmpty()
  public name: string;
}
