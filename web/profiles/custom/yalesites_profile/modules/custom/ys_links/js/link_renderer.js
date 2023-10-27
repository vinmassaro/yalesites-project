/**
 * @file
 * Link type definitions and renderings.
 */

(function (_$, Drupal, _drupalSettings) {

    'use strict';

    Drupal.ys_links = Drupal.ys_links || {};
    Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

    // Given a link, determines which renderer should be used.
    Drupal.ys_links.getLinkRenderer = function(link) {
        for (const [_linkType, linkDefinitions] of Object.entries(Drupal.ys_links.linkTypes)) {
            if (linkDefinitions.evaluator(link)) {
                return linkDefinitions.render;
            }
        }
        console.error("No link renderer found for link--are you missing a return in a custom link definition?", link);
        // Catch-all don't modify the link
        return (link) => link;
    };

})(jQuery, Drupal, drupalSettings);
