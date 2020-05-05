import {CommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {UploadFileCommand} from './UploadFileCommand';
import {IFileStorage} from 'src/Application/IFileStorage';
import {IFileRepository} from 'src/Domain/File/Repository/IFileRepository';
import {File} from 'src/Domain/File/File.entity';
import {FileNotFoundException} from 'src/Domain/File/Exception/FileNotFoundException';

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

    const fileName = await this.fileStorage.upload(uploadedFile);
    if (!fileName) {
      throw new FileNotFoundException();
    }

    const file = await this.fileRepository.save(
      new File(fileName, uploadedFile.size, uploadedFile.mimetype)
    );

    return file.getId();
  }
}
