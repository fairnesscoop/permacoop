import * as uniqid from 'uniqid';
import {CommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {UploadFileCommand} from './UploadFileCommand';
import {IFileStorage} from 'src/Application/IFileStorage';
import {IFileRepository} from 'src/Domain/File/Repository/IFileRepository';
import {File} from 'src/Domain/File/File.entity';

@CommandHandler(UploadFileCommand)
export class UploadFileCommandHandler {
  constructor(
    @Inject('IFileStorage')
    public readonly fileStorage: IFileStorage,
    @Inject('IFileRepository')
    public readonly fileRepository: IFileRepository
  ) {}

  public async execute(command: UploadFileCommand): Promise<string> {
    const {uploadedFile} = command;
    const password = uniqid();
    const fileName = await this.fileStorage.upload(uploadedFile, password);
    const file = await this.fileRepository.save(
      new File(fileName, uploadedFile.size, uploadedFile.mimetype, password)
    );

    return file.getId();
  }
}
