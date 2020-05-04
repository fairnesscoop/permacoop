export class DownloadedFileView {
  constructor(
    public readonly originalName: string,
    public readonly mimeType: string,
    public readonly buffer: Buffer
  ) {}
}
