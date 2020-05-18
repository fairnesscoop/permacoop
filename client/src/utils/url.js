export const historyPushState = (uri, params) => {
  window.history.pushState(
    {},
    null,
    `/${uri}?${new URLSearchParams(params).toString()}`
  );
};
