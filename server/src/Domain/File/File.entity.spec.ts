import {File} from './File.entity';

describe('File.entity', () => {
  it('testGetters', () => {
    const file = new File(
      'file-mathieu-marchois.pdf',
      600,
      'application/pdf',
      'azerty'
    );

    expect(file.getId()).toBe(undefined);
    expect(file.getMimeType()).toBe('application/pdf');
    expect(file.getName()).toBe('file-mathieu-marchois.pdf');
    expect(file.getSize()).toBe(600);
    expect(file.getPassword()).toBe('azerty');
  });
});
