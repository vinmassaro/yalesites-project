/**
 * @file
 * Internal (same domain) link definition.
 */

(function internal(Drupal, _drupalSettings) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  const urlHasCurrentDomain = (url) =>
    url.indexOf(document.location.hostname) > -1;

  Drupal.ys_links.linkTypes.internal = {
    evaluator: (link) => urlHasCurrentDomain(link.getAttribute("href")),
    render: (link) => {
      if (Drupal.ys_links.debugging) {
        console.log(`${link.getAttribute("href")} is internal`);
      }
    },
  };
})(Drupal, drupalSettings);
