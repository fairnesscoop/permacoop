/**
 * [Turbo][0] / [htmx][1]-like functionality
 * [0]: https://turbo.hotwired.dev/
 * [1]: https://htmx.org/
 */

/**
 * Fetch a web page, then swap selected elements with theirs.
 * New <head> is NOT processed.
 *
 * @param {string} url
 * @param {{ init: RequestInit|undefined, select: string|string[] } options}
 * @returns {Promise<void>}
 */
export async function visit(url, options = { select: ['body'] }) {
  if (typeof options.select === 'string') {
    options.select = JSON.parse(options.select);
  }

  const response = await fetch(url, { headers: { 'X-Turbolite': 'true' } });

  // Inspiration: https://stackoverflow.com/a/10585079
  const tmpDoc = document.createElement('html');
  tmpDoc.innerHTML = await response.text();

  options.select.forEach(selector => {
    document
      .querySelector(selector)
      .replaceWith(tmpDoc.querySelector(selector));
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

/**
 * Make all links navigate to a web page without a full-page reload.
 * @param {Element} elt
 */
export function boostLinks(elt) {
  if (!elt.id) {
    throw new Error('element must have an id to enable link boosting');
  }

  elt.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', event => {
      event.preventDefault();
      visit(a.getAttribute('href'), { select: [`#${elt.id}`] });
    });
  });
}
