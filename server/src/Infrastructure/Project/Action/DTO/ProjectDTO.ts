import {ApiModelProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsUUID} from 'class-validator';

export class ProjectDTO {
  @ApiModelProperty()
  @IsNotEmpty()
  public readonly name: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsUUID()
  public readonly customerId: string;
}
