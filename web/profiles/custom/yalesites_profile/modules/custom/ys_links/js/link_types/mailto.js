/**
 * @file
 * Mailto link definition.
 */

(function (_$, Drupal, _drupalSettings) {

    'use strict';

    Drupal.ys_links = Drupal.ys_links || {};
    Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

    Drupal.ys_links.linkTypes.mailto = {
        evaluator: (link) => link.getAttribute('href').startsWith('mailto:'),
        render: (link) => {
            link.classList.add('pre-text__text');
            link.insertAdjacentElement('afterend', Drupal.ys_links.copyButton());
            console.log(`${link.getAttribute('href')} is mailto`);
        }
    };

})(jQuery, Drupal, drupalSettings);
