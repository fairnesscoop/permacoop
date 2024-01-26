// @ts-check

/**
 * @param {HTMLElement} element
 * @param {string} url
 */
function triggerVisit(element, url) {
  element.dispatchEvent(
    new CustomEvent('frame:visit', { detail: { url }, bubbles: true })
  );
}

/**
 * @param {string} frameId
 */
function listenVisits(frameId) {
  const frameElement = document.querySelector(`#${frameId}`);

  if (!frameElement) {
    throw new Error(`element #${frameId} not found`);
  }

  frameElement.addEventListener('frame:visit', async event => {
    const { url } = /** @type {CustomEvent} */ (event).detail;

    const resp = await fetch(url);
    const html = await resp.text();

    const tmpDiv = document.createElement('div');
    tmpDiv.innerHTML = html;
    const newFrameElement = tmpDiv.querySelector(`#${frameId}`);

    if (!newFrameElement) {
      throw new Error(`<pc-frame> with id="${frameId}" not found in response`);
    }

    const parent = frameElement.parentElement;

    if (!parent) {
      throw new Error('unexpected: no parent element');
    }

    parent.replaceChild(newFrameElement, frameElement);

    window.history.pushState({}, '', url);
  });
}

export default { triggerVisit, listenVisits };
