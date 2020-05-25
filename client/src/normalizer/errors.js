export const errorNormalizer = (e) => {
  let message = e.response.data.message;

  if (Array.isArray(message)) {
    return message;
  }

  return [message];
};
