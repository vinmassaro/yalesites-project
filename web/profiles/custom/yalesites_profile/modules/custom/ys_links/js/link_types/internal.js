/**
 * @file
 * Internal (same domain) link definition.
 */

(function internal(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  const urlHasCurrentDomain = (url) =>
    url.indexOf(document.location.hostname) > -1;

  Drupal.ys_links.linkTypes.internal = {
    evaluator: (link) => urlHasCurrentDomain(link.getAttribute("href")),
    render: (link) => {
      if (Drupal.ys_links.debugging) {
        // eslint-disable-next-line no-console
        console.log(`${link.getAttribute("href")} is internal`);
      }
    },
  };
})(Drupal);
