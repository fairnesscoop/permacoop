import {File} from '../File.entity';

export interface IFileRepository {
  save(file: File): Promise<File>;
  remove(file: File): void;
  findOneById(id: string): Promise<File | undefined>;
}
