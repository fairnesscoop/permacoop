import { ConfigService } from '@nestjs/config';
import { IDateUtils } from 'src/Application/IDateUtils';

export abstract class AbstractGenerator {
  constructor(
    protected readonly dateUtils: IDateUtils,
    protected readonly configService: ConfigService
  ) {}

  protected async format(prefix: string, nbItem: number): Promise<string> {
    const pad = await this.configService.get<number>('ACCOUNTING_PAD');

    return `${prefix}-${this.getCurrentYear()}-${String(nbItem + 1).padStart(
      pad,
      '0'
    )}`;
  }

  protected getCurrentYear(): number {
    return this.dateUtils.getCurrentDate().getFullYear();
  }
}
