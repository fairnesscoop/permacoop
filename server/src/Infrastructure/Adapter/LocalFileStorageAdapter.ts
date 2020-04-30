import * as fs from 'fs';
import * as shortid from 'shortid';
import {Injectable, Inject} from '@nestjs/common';
import {IFileStorage} from 'src/Application/IFileStorage';
import {IUploadedFile} from 'src/Domain/File/IUploadedFile';
import {FileDirectoryStrategy} from 'src/Domain/File/Strategy/FileDirectoryStrategy';
import {IDateUtils} from 'src/Application/IDateUtils';
import {IFileEncryption} from 'src/Application/IFileEncryption';

@Injectable()
export class LocalFileStorageAdapter implements IFileStorage {
  constructor(
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    @Inject('IFileEncryption')
    private readonly fileEncryptionAdapter: IFileEncryption,
    private readonly fileDirectoryStrategy: FileDirectoryStrategy
  ) {}

  public async upload(file: IUploadedFile, password: string): Promise<string> {
    const fileName = `${shortid()}_${file.originalname}`;
    const directory = await this.fileDirectoryStrategy.location(
      this.dateUtils.getCurrentDate()
    );
    const relativeDirectory = `${__dirname}/../../../../${directory}`;

    if (!fs.existsSync(relativeDirectory)) {
      fs.mkdirSync(relativeDirectory, {recursive: true});
    }

    const encryptedBuffer = await this.fileEncryptionAdapter.encrypt(
      file.buffer,
      password
    );
    fs.writeFileSync(`${relativeDirectory}/${fileName}`, encryptedBuffer);

    return fileName;
  }
}
