/**
 * @file
 * Yalesites link icon generation.
 */

(function (_$, Drupal, _drupalSettings) {

    'use strict';

    Drupal.ys_links = Drupal.ys_links || {};

    Drupal.ys_links.createIcon = (classes = [], aria = { hidden: true }, role = 'img') => {
        const faicon = document.createElement('i');
        classes.forEach((className) => faicon.classList.add(className));
        for (const [key, value] of Object.entries(aria)) {
            faicon.setAttribute(`aria-${key}`, value);
        };
        faicon.setAttribute('role', role);

        return faicon;
    };

})(jQuery, Drupal, drupalSettings);