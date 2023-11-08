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
      if (drupalSettings.ys_links.debug) {
        // eslint-disable-next-line no-console
        console.log(`${link.getAttribute("href")} is internal`);
      }

      link.classList.add("ys_linked");
      link.classList.add("link");

      if (!link.dataset.linkStyle) {
        link.dataset.linkStyle = "underline";
      }

      if (!link.dataset.linkType) {
        link.dataset.linkType = "normal";
      }
    },
  };
})(Drupal);
