import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsUUID } from 'class-validator';
import { IUploadedFile } from 'src/Domain/File/IUploadedFile';

export class PaySlipDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  public date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  public userId: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  public file: IUploadedFile;
}
