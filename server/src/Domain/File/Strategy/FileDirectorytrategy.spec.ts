import {ConfigService} from '@nestjs/config';
import {mock, instance, when} from 'ts-mockito';
import {FileDirectoryStrategy} from './FileDirectoryStrategy';

describe('FileDirectoryStrategy', () => {
  it('testFileLocation', async () => {
    const configService: ConfigService = mock(ConfigService);
    const strategy: FileDirectoryStrategy = new FileDirectoryStrategy(
      instance(configService)
    );

    when(configService.get('UPLOAD_LOCATION')).thenResolve('uploads');
    expect(await strategy.location(new Date('2020-04-29'))).toBe(
      'uploads/2020/4'
    );
  });
});
