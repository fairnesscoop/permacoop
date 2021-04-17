import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { IFileRepository } from 'src/Domain/File/Repository/IFileRepository';
import { DownloadFileQuery } from './DownloadFileQuery';
import { IFileStorage } from 'src/Application/IFileStorage';
import { DownloadedFileView } from '../View/DownloadedFileView';
import { FileNotFoundException } from 'src/Domain/File/Exception/FileNotFoundException';

@QueryHandler(DownloadFileQuery)
export class DownloadFileQueryHandler {
  constructor(
    @Inject('IFileRepository')
    private readonly fileRepository: IFileRepository,
    @Inject('IFileStorage')
    public readonly fileStorage: IFileStorage
  ) {}

  public async execute(query: DownloadFileQuery): Promise<DownloadedFileView> {
    const file = await this.fileRepository.findOneById(query.id);
    if (!file) {
      throw new FileNotFoundException();
    }

    const buffer = await this.fileStorage.download(file);
    if (!buffer) {
      throw new FileNotFoundException();
    }

    return new DownloadedFileView(
      file.getOriginalName(),
      file.getMimeType(),
      buffer
    );
  }
}
