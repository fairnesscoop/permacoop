import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {IFileRepository} from 'src/Domain/File/Repository/IFileRepository';
import {File} from 'src/Domain/File/File.entity';

export class FileRepository implements IFileRepository {
  constructor(
    @InjectRepository(File)
    private readonly repository: Repository<File>
  ) {}

  public save(file: File): Promise<File> {
    return this.repository.save(file);
  }

  public remove(file: File): void {
    this.repository.delete(file.getId());
  }

  public findOneById(id: string): Promise<File | undefined> {
    return this.repository
      .createQueryBuilder('file')
      .select(['file.id', 'file.name', 'file.mimeType', 'file.uploadedAt'])
      .where('file.id = :id', {id})
      .getOne();
  }
}
