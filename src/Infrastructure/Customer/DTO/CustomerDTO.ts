import { IsNotEmpty } from 'class-validator';

export class CustomerDTO {
  @IsNotEmpty()
  public name: string;
}
