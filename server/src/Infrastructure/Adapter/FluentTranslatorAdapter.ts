import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fluent from '@fluent/bundle';
import { ITranslator } from 'src/Application/ITranslations';

@Injectable()
export class FluentTranslatorAdapter implements ITranslator {
  private path: string;
  private locale: string;
  private bundle: fluent.FluentBundle = null;

  constructor(private readonly configService: ConfigService) {
    this.path = this.configService.get<string>('FLUENT_PATH');
    this.locale = this.configService.get<string>('FLUENT_LOCALE');
    this.bundle = _readBundle(this.path, this.locale);
  }

  public translate(key: string, params: Record<string, any> = {}): string {
    if (process.env.NODE_ENV !== 'production') {
      // Refresh during development
      this.bundle = _readBundle(this.path, this.locale);
    }

    return _translate(this.bundle, key, params);
  }
}

const _readBundle = (path: string, locale: string) => {
  const content = fs.readFileSync(path).toString();

  const resource = new fluent.FluentResource(content);

  const bundle = new fluent.FluentBundle(locale);
  const errors = bundle.addResource(resource);

  if (errors.length > 0) {
    throw errors[0];
  }

  return bundle;
};

const _translate = (
  bundle: fluent.FluentBundle,
  key: string,
  params: Record<string, any> = {}
): string | null => {
  const message = bundle.getMessage(key);

  if (message && message.value) {
    return bundle.formatPattern(message.value, params);
  } else {
    return key;
  }
};
