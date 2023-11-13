/**
 * [Turbo][0] / [htmx][1]-like functionality
 * [0]: https://turbo.hotwired.dev/
 * [1]: https://htmx.org/
 */
import { activateScripts } from './html';

/**
 * @param {string} url
 * @returns {Promise<string>}
 */
async function fetchHtmlTrackingProgress(url) {
  document.dispatchEvent(new CustomEvent('pc:fetchStart'));

  const response = await fetch(url, { headers: { 'X-Turbolite': 'true' } });

  // Credit: https://javascript.info/fetch-progress

  const reader = response.body.getReader();

  const contentLength = response.headers.get('Content-Length');
  let receivedLength = 0;

  const chunks = [];

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    chunks.push(value);
    receivedLength += value.length;

    document.dispatchEvent(
      new CustomEvent('pc:fetchProgress', {
        detail: { value: receivedLength / contentLength }
      })
    );
  }

  const chunksArr = new Uint8Array(receivedLength);

  let position = 0;

  for (const chunk of chunks) {
    chunksArr.set(chunk, position);
    position++;
  }

  const html = new TextDecoder('utf-8').decode(chunksArr);

  document.dispatchEvent(new CustomEvent('pc:fetchEnd'));

  return html;
}

/**
 * Fetch a web page, then swap selected elements and <head> with theirs.
 *
 * @param {string} url
 * @param {{ init: RequestInit|undefined, select: string|string[] } options}
 * @returns {Promise<void>}
 */
export async function visit(url, options = { select: ['body'] }) {
  if (typeof options.select === 'string') {
    options.select = JSON.parse(options.select);
  }

  const html = await fetchHtmlTrackingProgress(url);

  // Inspiration: https://stackoverflow.com/a/10585079
  const tmpDoc = document.createElement('html');
  tmpDoc.innerHTML = html;

  options.select.forEach(selector => {
    document
      .querySelector(selector)
      .replaceWith(tmpDoc.querySelector(selector));
  });

  const headHTML = tmpDoc.querySelector('head').innerHTML;

  if (headHTML) {
    document.querySelector('head').innerHTML = headHTML;
    activateScripts(document.querySelector('head'));
  }

  window.history.pushState({}, '', url);
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
