/**
 * @file
 * Relative (/node/2) link definition.
 */

(function relative(Drupal, _drupalSettings) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  Drupal.ys_links.linkTypes.relative = {
    evaluator: (link) => link.getAttribute("href").startsWith("/"),
    render: (link) => {
      if (Drupal.ys_links.debugging) {
        console.log(`${link.getAttribute("href")} is relative`);
      }
    },
  };
})(Drupal, drupalSettings);
