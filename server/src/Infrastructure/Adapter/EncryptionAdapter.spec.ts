import {EncryptionAdapter} from './EncryptionAdapter';

describe('EncryptionAdapter', () => {
  it('testHash', async () => {
    const encryption = new EncryptionAdapter();
    expect(await encryption.hash('azerty')).toBeDefined();
  });

  it('testCompare', async () => {
    const encryption = new EncryptionAdapter();
    expect(
      await encryption.compare(
        '$argon2i$v=19$m=4096,t=3,p=1$xdb+H/PaT7ys/DPduRrRqg$tU4DS0X7pQiOFCvaD2vcfFbq+v6uu/RICEhfWNVCvHA',
        'azerty'
      )
    ).toBe(true);

    expect(
      await encryption.compare(
        '$argon2i$v=19$m=4096,t=3,p=1$lWA4TKtTogBJIRV9RNvcgA$w7GIPwzmJgFv1gPykpX63wE1OIdccNg6EwyHySql+BE',
        'azerty'
      )
    ).toBe(false);
  });
});
