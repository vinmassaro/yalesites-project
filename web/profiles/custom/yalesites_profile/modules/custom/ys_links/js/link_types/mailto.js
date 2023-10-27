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
            if (link.classList.contains('ys_linked')) {
                return;
            }

            const span = document.createElement('span');
            span.innerHTML = link.innerHTML;
            link.classList.add('ys_linked');
            span.classList.add('pre-text__text');
            link.insertAdjacentElement('afterend', span);
            span.insertAdjacentElement('afterend', Drupal.ys_links.copyButton());
            link.remove();

            if (Drupal.ys_links.debugging) {
                console.log(`${link.getAttribute('href')} is mailto`);
            }
        }
    };

})(jQuery, Drupal, drupalSettings);
