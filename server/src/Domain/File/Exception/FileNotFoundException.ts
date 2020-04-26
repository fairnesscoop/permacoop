export class FileNotFoundException extends Error {
  constructor() {
    super('file.errors.not_found');
  }
}
