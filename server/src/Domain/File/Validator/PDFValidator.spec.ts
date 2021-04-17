import { mock, instance } from 'ts-mockito';
import { PDFValidator } from './PDFValidator';
import { IUploadedFile } from 'src/Domain/File/IUploadedFile';

describe('PDFValidator', () => {
  it('testPdfFile', async () => {
    const file: IUploadedFile = {
      originalname: 'file.pdf',
      mimetype: 'application/pdf',
      buffer: instance(mock(Buffer)),
      size: 120
    };

    expect(PDFValidator.isValid(file)).toBeTruthy();
  });

  it('testNotPdfFile', async () => {
    const file: IUploadedFile = {
      originalname: 'file.jpg',
      mimetype: 'application/jpg',
      buffer: instance(mock(Buffer)),
      size: 120
    };

    expect(PDFValidator.isValid(file)).toBeFalsy();
  });
});
