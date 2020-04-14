export const errorNormalizer = (e) => {
  let message = e.message;

  if (e.response) {
    message = e.response.data.message
      ? e.response.data.message
      : e.response.data.error;
  }

  if (Array.isArray(message)) {
    const errors = [];

    for (const msg of message) {
      if (msg.children) {
        for (const children of Object.values(msg.children)) {
          for (const constraint of Object.values(children.constraints)) {
            errors.push(constraint);
          }
        }
      }

      if (msg.constraints) {
        for (const constraint of Object.values(msg.constraints)) {
          errors.push(constraint);
        }
      }
    }

    return errors;
  }

  return [message];
};
