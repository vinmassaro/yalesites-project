/**
 * @file
 * Mailto link definition.
 */

(function (_$, Drupal, _drupalSettings) {

    'use strict';

    Drupal.ys_links = Drupal.ys_links || {};
    Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

    Drupal.ys_links.linkTypes.relative = {
        evaluator: (link) => link.getAttribute('href').startsWith('/'),
        render: (link) => {
            console.log(`${link.getAttribute('href')} is relative`);
        },
    };

})(jQuery, Drupal, drupalSettings);

