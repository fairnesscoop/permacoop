import { Environment } from 'nunjucks';
import { ITranslator } from 'src/Application/ITranslations';
import { formatHtmlDate, minutesToHours } from '../Utils/dateUtils';
import { formatFullName } from '../Utils/formatUtils';
import { ArrayUtils } from '../Utils/ArrayUtils';

export const registerFilters = (env: Environment, translator: ITranslator) => {
  env.addFilter('trans', (key, params = {}) =>
    translator.translate(key, params)
  );
  env.addFilter('startswith', (value: string | null, other: string) =>
    value ? value.startsWith(other) : false
  );
  env.addFilter('minutesToHours', minutes => minutesToHours(minutes));
  env.addFilter('fullName', obj => formatFullName(obj));
  env.addFilter('htmlDate', value => formatHtmlDate(value));
  env.addFilter('zip', (left, right) => ArrayUtils.zip(left, right));
  env.addFilter('merge', (left, right) => {
    const result = {};
    for (const key in left) {
      result[key] = left[key];
    }
    for (const key in right) {
      result[key] = right[key];
    }
    return result;
  });
};
