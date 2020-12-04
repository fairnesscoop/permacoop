import { _ } from 'svelte-i18n';

export const errorNormalizer = (e) => {
  if (!e.response) {
    // eslint-disable-next-line no-console
    console.error('Non standard error', e);
    return [_('error_generic')];
  }

  const {message} = e.response.data;

  if (Array.isArray(message)) {
    return message;
  }

  return [message];
};
