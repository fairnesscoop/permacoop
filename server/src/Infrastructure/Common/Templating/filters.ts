import { Environment } from 'nunjucks';
import { ITranslator } from 'src/Application/ITranslations';
import { minutesToHours } from '../Utils/dateUtils';

const capitalize = (v: string): string =>
  v.charAt(0).toUpperCase() + v.slice(1);

export const registerFilters = (env: Environment, translator: ITranslator) => {
  env.addFilter('trans', (key, params = {}) =>
    translator.translate(key, params)
  );
  env.addFilter('startswith', (value: string | null, other: string) =>
    value ? value.startsWith(other) : false
  );
  env.addFilter('minutesToHours', minutes => minutesToHours(minutes));
  env.addFilter(
    'fullName',
    obj => `${capitalize(obj.firstName)} ${capitalize(obj.lastName)}`
  );
};
