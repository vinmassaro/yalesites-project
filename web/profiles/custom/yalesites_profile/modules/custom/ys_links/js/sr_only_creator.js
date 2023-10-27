/**
 * @file
 * Screen reader only span for links.
 */

(function (_$, Drupal, _drupalSettings) {

    'use strict';

    Drupal.ys_links = Drupal.ys_links || {};

    Drupal.ys_links.srOnlySpan = (content = '(unknown link--please let us know to add one)', classes = ['sr-only']) => {
        const span = document.createElement('span');
        classes.forEach((c) => span.classList.add(c));
        span.innerHTML = content;

        return span;
    };

})(jQuery, Drupal, drupalSettings);

