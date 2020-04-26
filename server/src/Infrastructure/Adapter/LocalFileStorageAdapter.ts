import * as fs from 'fs';
import * as shortid from 'shortid';
import {Injectable, Inject} from '@nestjs/common';
import {IFileStorage} from 'src/Application/IFileStorage';
import {IUploadedFile} from 'src/Domain/File/IUploadedFile';
import {FileDirectoryStrategy} from 'src/Domain/File/Strategy/FileDirectoryStrategy';
import {IDateUtils} from 'src/Application/IDateUtils';

@Injectable()
export class LocalFileStorageAdapter implements IFileStorage {
  constructor(
    @Inject('IDateUtils')
    private readonly dateUtils: IDateUtils,
    private readonly fileDirectoryStrategy: FileDirectoryStrategy
  ) {}

  public async upload(file: IUploadedFile): Promise<string> {
    const fileName = `${shortid()}_${file.originalname}`;
    const directory = await this.fileDirectoryStrategy.location(
      this.dateUtils.getCurrentDate()
    );
    const relativeDirectory = `${__dirname}/../../../../${directory}`;

    if (!fs.existsSync(relativeDirectory)) {
      fs.mkdirSync(relativeDirectory, {recursive: true});
    }

    fs.writeFileSync(`${relativeDirectory}/${fileName}`, file.buffer);

    return fileName;
  }
}
