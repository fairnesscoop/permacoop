import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IFileEncryption } from 'src/Application/IFileEncryption';

@Injectable()
export class FileEncryptionAdapter implements IFileEncryption {
  constructor(private readonly configService: ConfigService) {}

  public async encrypt(buffer: Buffer): Promise<Buffer> {
    const iv = crypto.randomBytes(16);
    const key = await this.getEncryptionKey();
    const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);

    return Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
  }

  public async decrypt(buffer: Buffer): Promise<Buffer> {
    const key = await this.getEncryptionKey();
    const iv = buffer.slice(0, 16);
    const decipher = crypto.createDecipheriv('aes-256-ctr', key, iv);

    return Buffer.concat([decipher.update(buffer.slice(16)), decipher.final()]);
  }

  private async getEncryptionKey(): Promise<string> {
    const key = await this.configService.get<string>('FILE_ENCRYPTION_KEY');

    return crypto
      .createHash('sha256')
      .update(key)
      .digest('base64')
      .substr(0, 32);
  }
}
