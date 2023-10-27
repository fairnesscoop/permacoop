import { IsNotEmpty } from 'class-validator';

export class TaskDTO {
  @IsNotEmpty()
  public name: string;
}
