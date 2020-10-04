export const errorNormalizer = e => {
  if (!e.response) {
    return ['Une erreur est survenue'];
  }

  let message = e.response.data.message;

  if (Array.isArray(message)) {
    return message;
  }

  return [message];
};
