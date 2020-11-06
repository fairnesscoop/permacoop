export class FileNotFoundException extends Error {
  constructor() {
    super('common.errors.file_not_found');
  }
}
