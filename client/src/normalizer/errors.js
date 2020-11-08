export const errorNormalizer = (e) => {
  if (!e.response) {
    return ['Une erreur est survenue'];
  }

  const {message} = e.response.data;

  if (Array.isArray(message)) {
    return message;
  }

  return [message];
};
