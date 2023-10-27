/**
 * @file
 * Yalesites link icon generation.
 */

/* Main entrypoint
 *
* Other files used:
*   - link_types.js: 
*     - Defines the types of links, evaluators, and rendrers.
*     - Allows you to retrieve the right link renderer for a link.
*   - icon_creator.js:
*     - Defines a function to create an icon element.
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
