/**
 * @file
 * Mailto link definition.
 */

(function (_$, Drupal, _drupalSettings) {

    'use strict';

    Drupal.ys_links = Drupal.ys_links || {};
    Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

    Drupal.ys_links.linkTypes.anchor = {
        evaluator: (link) => link.getAttribute('href').startsWith('#'),
        render: (link) => {
            console.log(`${link.getAttribute('href')} is anchor`);
        },
    };

})(jQuery, Drupal, drupalSettings);

