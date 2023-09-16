import { Environment } from 'nunjucks';
import { ITranslator } from 'src/Application/ITranslations';
import { minutesToHours } from '../Utils/dateUtils';

export const registerFilters = (env: Environment, translator: ITranslator) => {
  env.addFilter('trans', (key, params = {}) =>
    translator.translate(key, params)
  );
  env.addFilter('startswith', (value: string | null, other: string) =>
    value ? value.startsWith(other) : false
  );
  env.addFilter('minutesToHours', minutes => minutesToHours(minutes));
};
