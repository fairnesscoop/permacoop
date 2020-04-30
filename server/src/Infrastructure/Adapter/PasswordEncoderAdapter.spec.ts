import {PasswordEncoderAdapter} from './PasswordEncoderAdapter';

describe('PasswordEncoderAdapter', () => {
  it('testHash', async () => {
    const passwordEncoder = new PasswordEncoderAdapter();
    expect(await passwordEncoder.hash('azerty')).toBeDefined();
  });

  it('testCompare', async () => {
    const passwordEncoder = new PasswordEncoderAdapter();
    expect(
      await passwordEncoder.compare(
        '$argon2i$v=19$m=4096,t=3,p=1$xdb+H/PaT7ys/DPduRrRqg$tU4DS0X7pQiOFCvaD2vcfFbq+v6uu/RICEhfWNVCvHA',
        'azerty'
      )
    ).toBe(true);

    expect(
      await passwordEncoder.compare(
        '$argon2i$v=19$m=4096,t=3,p=1$lWA4TKtTogBJIRV9RNvcgA$w7GIPwzmJgFv1gPykpX63wE1OIdccNg6EwyHySql+BE',
        'azerty'
      )
    ).toBe(false);
  });
});
