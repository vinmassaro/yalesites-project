/**
 * @file
 * Relative (/node/2) link definition.
 */

(function relative(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  Drupal.ys_links.linkTypes.relative = {
    evaluator: (link) => link.getAttribute("href").startsWith("/"),
    render: (link) => {
      if (drupalSettings.ys_links.debug) {
        // eslint-disable-next-line no-console
        console.log(`${link.getAttribute("href")} is relative`);
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
