import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CustomerDTO {
  @ApiProperty()
  @IsNotEmpty()
  public name: string;
}
