/**
 * @file
 * Link type render finder.
 */

(function linkRenderer(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  // Given a link, determines which renderer should be used.
  Drupal.ys_links.getLinkRenderer = function getLinkRenderer(link) {
    // Find the first render whose evalulate returns true.
    const linkDefinition = Object.values(Drupal.ys_links.linkTypes).find(
      (linkDefinitions) => linkDefinitions.evaluator(link)
    );

    if (linkDefinition) {
      return linkDefinition.render;
    }

    // When I ran into this issue, it was due to not returning the renderer.
    // Hope you don't get here.  ;)
    console.error(
      "No link renderer found for link--are you missing a return in a custom link definition?",
      link
    );
    // Catch-all don't modify the link
    return (_) => link;
  };
})(Drupal, drupalSettings);
