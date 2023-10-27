/**
 * @file
 * Mailto link definition.
 */

(function (_$, Drupal, _drupalSettings) {

    'use strict';

    Drupal.ys_links = Drupal.ys_links || {};
    Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

    const hasBlankTarget = (link) => link.getAttribute('target') === '_blank';
    const linkTypeIsTarget = (link) => link.dataset.linkType === 'target-blank';

    Drupal.ys_links.linkTypes.targetBlank = {
        evaluator: (link) => {
            return hasBlankTarget(link) || linkTypeIsTarget(link)
        },
        render: (link) => {
            console.log(`${link.getAttribute('href')} is anchor`);
        },
    };

})(jQuery, Drupal, drupalSettings);


