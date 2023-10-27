/**
 * @file
 * Yalesites link icon generation.
 */

(function (_$, Drupal, _drupalSettings) {

    'use strict';

    Drupal.ys_links = Drupal.ys_links || {};

    // Labelledby seems dirty; this is what was in storybook.
    Drupal.ys_links.createIcon = (classes = [], aria = { hidden: true, labelledby: 'title-arrow-up-right-1031352735' }, role = 'img') => {
        const faicon = document.createElement('i');
        classes.forEach((c) => faicon.classList.add(c));
        for (const [key, value] of Object.entries(aria)) {
            faicon.setAttribute(`aria-${key}`, value);
        };
        faicon.setAttribute('role', role);

        return faicon;
    };

})(jQuery, Drupal, drupalSettings);
