import {File} from '../File.entity';

export interface IFileRepository {
  save(file: File): Promise<File>;
  findOneById(id: string): Promise<File | undefined>;
}
