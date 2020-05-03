import {File} from './File.entity';

describe('File.entity', () => {
  it('testGetters', () => {
    const file = new File(
      'xbn7s_file_mathieu_marchois.pdf',
      600,
      'application/pdf'
    );

    expect(file.getId()).toBe(undefined);
    expect(file.getMimeType()).toBe('application/pdf');
    expect(file.getName()).toBe('xbn7s_file_mathieu_marchois.pdf');
    expect(file.getOriginalName()).toBe('file_mathieu_marchois.pdf');
    expect(file.getSize()).toBe(600);
  });
});
