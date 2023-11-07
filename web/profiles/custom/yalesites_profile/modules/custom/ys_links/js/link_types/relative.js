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
      if (Drupal.ys_links.debugging) {
        // eslint-disable-next-line no-console
        console.log(`${link.getAttribute("href")} is relative`);
      }
    },
  };
})(Drupal);
