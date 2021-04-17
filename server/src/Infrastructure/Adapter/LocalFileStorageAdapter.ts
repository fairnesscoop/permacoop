import * as fs from 'fs';
import * as shortid from 'shortid';
import { Injectable, Inject } from '@nestjs/common';
import { IFileStorage } from 'src/Application/IFileStorage';
import { IUploadedFile } from 'src/Domain/File/IUploadedFile';
import { FileDirectoryStrategy } from 'src/Domain/File/Strategy/FileDirectoryStrategy';
import { IDateUtils } from 'src/Application/IDateUtils';
import { IFileEncryption } from 'src/Application/IFileEncryption';
import { File } from 'src/Domain/File/File.entity';

@Injectable()
export class LocalFileStorageAdapter implements IFileStorage {
  constructor(
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    @Inject('IFileEncryption')
    private readonly fileEncryptionAdapter: IFileEncryption,
    private readonly fileDirectoryStrategy: FileDirectoryStrategy
  ) {}

  public async upload(file: IUploadedFile): Promise<string | null> {
    const fileName = `${this.getShortId()}_${file.originalname}`;
    const date = this.dateUtils.getCurrentDate();
    const dir = await this.fileDirectoryStrategy.location(date);
    const directory = `${__dirname}/../../../../${dir}`;

    try {
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }

      const encryptedBuffer = await this.fileEncryptionAdapter.encrypt(
        file.buffer
      );

      fs.writeFileSync(`${directory}/${fileName}`, encryptedBuffer);

      return fileName;
    } catch (e) {
      return null;
    }
  }

  public async download(file: File): Promise<Buffer | null> {
    const dir = await this.fileDirectoryStrategy.location(file.getUploadedAt());
    const directory = `${__dirname}/../../../../${dir}`;

    try {
      const buffer = fs.readFileSync(`${directory}/${file.getName()}`);

      return await this.fileEncryptionAdapter.decrypt(buffer);
    } catch (e) {
      return null;
    }
  }

  private getShortId(): string {
    shortid.characters(
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@'
    );

    return shortid();
  }
}
