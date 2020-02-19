export const errorNormalizer = e => {
  let message = e.message;

  if (e.response) {
    message = e.response.data.message
      ? e.response.data.message
      : e.response.data.error;
  }

  if (Array.isArray(message)) {
    const errors = [];

    for (const msg of message) {
      for (const constraint of Object.values(msg.constraints)) {
        errors.push(constraint);
      }
    }

    return errors;
  }

  return [message];
};
