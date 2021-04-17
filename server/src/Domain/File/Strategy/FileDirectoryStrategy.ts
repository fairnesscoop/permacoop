import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileDirectoryStrategy {
  constructor(private readonly configService: ConfigService) {}

  public async location(uploadedDate: Date): Promise<string> {
    const destination = await this.configService.get<string>('UPLOAD_LOCATION');
    const month = uploadedDate.getMonth() + 1;
    const year = uploadedDate.getFullYear();

    return `${destination}/${year}/${month}`;
  }
}
