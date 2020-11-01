import {mock, instance, when, verify, anything} from 'ts-mockito';
import {FileRepository} from 'src/Infrastructure/File/Repository/FileRepository';
import {LocalFileStorageAdapter} from 'src/Infrastructure/Adapter/LocalFileStorageAdapter';
import {File} from 'src/Domain/File/File.entity';
import {DownloadFileQueryHandler} from './DownloadFileQueryHandler';
import {DownloadFileQuery} from './DownloadFileQuery';
import {DownloadedFileView} from '../View/DownloadedFileView';
import {FileNotFoundException} from 'src/Domain/File/Exception/FileNotFoundException';

describe('DownloadFileQueryHandler', () => {
  let handler: DownloadFileQueryHandler;
  let localFileStorageAdapter: LocalFileStorageAdapter;
  let fileRepository: FileRepository;

  beforeEach(() => {
    localFileStorageAdapter = mock(LocalFileStorageAdapter);
    fileRepository = mock(FileRepository);

    handler = new DownloadFileQueryHandler(
      instance(fileRepository),
      instance(localFileStorageAdapter)
    );
  });

  it('testDownloadFile', async () => {
    const buffer = mock(Buffer);
    const file = mock(File);
    when(file.getOriginalName()).thenReturn('file_mathieu_marchois.pdf');
    when(file.getMimeType()).thenReturn('application/pdf');

    when(
      fileRepository.findOneById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
    ).thenResolve(instance(file));
    when(localFileStorageAdapter.download(instance(file))).thenResolve(
      instance(buffer)
    );
    expect(
      await handler.execute(
        new DownloadFileQuery('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
      )
    ).toMatchObject(
      new DownloadedFileView(
        'file_mathieu_marchois.pdf',
        'application/pdf',
        instance(buffer)
      )
    );

    verify(
      fileRepository.findOneById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
    ).once();
    verify(localFileStorageAdapter.download(instance(file))).once();
    verify(file.getOriginalName()).once();
    verify(file.getMimeType()).once();
  });

  it('testBufferNullable', async () => {
    const file = mock(File);
    when(file.getOriginalName()).thenReturn('file_mathieu_marchois.pdf');
    when(file.getMimeType()).thenReturn('application/pdf');

    when(
      fileRepository.findOneById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
    ).thenResolve(instance(file));
    when(localFileStorageAdapter.download(instance(file))).thenResolve(null);

    try {
      await handler.execute(
        new DownloadFileQuery('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
      );
    } catch (e) {
      expect(e).toBeInstanceOf(FileNotFoundException);
      expect(e.message).toBe('common.errors.file_not_found');
      verify(
        fileRepository.findOneById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
      ).once();
      verify(file.getOriginalName()).never();
      verify(file.getMimeType()).never();
      verify(localFileStorageAdapter.download(instance(file))).once();
    }
  });

  it('testFileNotFound', async () => {
    when(
      fileRepository.findOneById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
    ).thenResolve(null);

    try {
      await handler.execute(
        new DownloadFileQuery('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
      );
    } catch (e) {
      expect(e).toBeInstanceOf(FileNotFoundException);
      expect(e.message).toBe('common.errors.file_not_found');
      verify(
        fileRepository.findOneById('cfdd06eb-cd71-44b9-82c6-46110b30ce05')
      ).once();
      verify(localFileStorageAdapter.download(anything())).never();
    }
  });
});
