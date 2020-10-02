export default (method, data) => {
  fetch('/proxy/session', {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: data ? JSON.stringify({ ...data }) : null
  });
};
