/**
 * [Turbo][0] / [htmx][1]-like functionality
 * [0]: https://turbo.hotwired.dev/
 * [1]: https://htmx.org/
 */

/**
 * Fetch a web page, then swap targets with theirs.
 * New <head> is NOT processed.
 *
 * @param {string} url
 * @param {{ targets: string[] } options}
 * @returns {Promise<void>}
 */
export async function visit(url, options = { targets: ['body'] }) {
  const response = await fetch(url);

  // Inspiration: https://stackoverflow.com/a/10585079
  const tmpDoc = document.createElement('html');
  tmpDoc.innerHTML = await response.text();

  options.targets.forEach(target => {
    document.querySelector(target).replaceWith(tmpDoc.querySelector(target));
  });

  window.history.pushState({}, '', response.url);
}

/**
 * Build an URL suitable for submitting a <form method="GET" action> through the Fetch API.
 *
 * @param {HTMLFormElement} form
 * @returns {URL}
 */
export const buildFormFetchUrl = form => {
  const data = new FormData(form);

  const url = new URL(form.action);
  url.search = new URLSearchParams(data.entries()).toString();

  return url;
};
