import {mock, instance, when, verify, deepEqual, anything} from 'ts-mockito';
import {FileRepository} from 'src/Infrastructure/File/Repository/FileRepository';
import {UploadFileCommandHandler} from './UploadFileCommandHandler';
import {LocalFileStorageAdapter} from 'src/Infrastructure/Adapter/LocalFileStorageAdapter';
import {IUploadedFile} from 'src/Domain/File/IUploadedFile';
import {UploadFileCommand} from './UploadFileCommand';
import {File} from 'src/Domain/File/File.entity';
import {FileNotFoundException} from 'src/Domain/File/Exception/FileNotFoundException';

describe('UpdateFileCommandHandler', () => {
  let handler: UploadFileCommandHandler;
  let localFileStorageAdapter: LocalFileStorageAdapter;
  let fileRepository: FileRepository;

  beforeEach(() => {
    localFileStorageAdapter = mock(LocalFileStorageAdapter);
    fileRepository = mock(FileRepository);

    handler = new UploadFileCommandHandler(
      instance(localFileStorageAdapter),
      instance(fileRepository)
    );
  });

  it('testUploadFile', async () => {
    const uploadedFile: IUploadedFile = {
      originalname: 'file.pdf',
      mimetype: 'application/pdf',
      buffer: instance(mock(Buffer)),
      size: 120
    };
    const file = mock(File);
    when(file.getId()).thenReturn('cfdd06eb-cd71-44b9-82c6-46110b30ce05');

    when(localFileStorageAdapter.upload(uploadedFile)).thenResolve(
      'prefix_file.pdf'
    );
    when(
      fileRepository.save(
        deepEqual(new File('prefix_file.pdf', 120, 'application/pdf'))
      )
    ).thenResolve(instance(file));

    expect(await handler.execute(new UploadFileCommand(uploadedFile))).toBe(
      'cfdd06eb-cd71-44b9-82c6-46110b30ce05'
    );

    verify(localFileStorageAdapter.upload(uploadedFile)).once();
    verify(
      fileRepository.save(
        deepEqual(new File('prefix_file.pdf', 120, 'application/pdf'))
      )
    ).once();
    verify(file.getId()).once();
  });

  it('testFileNotFound', async () => {
    const uploadedFile: IUploadedFile = {
      originalname: 'file.pdf',
      mimetype: 'application/pdf',
      buffer: instance(mock(Buffer)),
      size: 120
    };
    when(localFileStorageAdapter.upload(uploadedFile)).thenResolve(null);

    try {
      await handler.execute(new UploadFileCommand(uploadedFile));
    } catch (e) {
      expect(e).toBeInstanceOf(FileNotFoundException);
      expect(e.message).toBe('file.errors.not_found');
      verify(localFileStorageAdapter.upload(uploadedFile)).once();
      verify(fileRepository.save(anything())).never();
    }
  });
});
