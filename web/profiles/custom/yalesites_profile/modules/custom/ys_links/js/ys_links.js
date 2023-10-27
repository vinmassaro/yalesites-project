/**
 * @file
 * Yalesites link treatment js main entry point.
 */

(function (_$, Drupal, _drupalSettings) {
   
    'use strict';

    Drupal.ys_links = Drupal.ys_links || {};
    Drupal.ys_links.debugging = true;

    Drupal.ys_links.attach = function(context, _drupalSettings) {
        const pageContext = context.querySelector('#main-content');
        const excludedClasses = [
            '.site-header__yale-branding',  // Yale header logo
            '.site-footer__site-branding',  // Yale footer logo
        ].join(', ');

        const links = pageContext.querySelectorAll(`a:not(${excludedClasses})`);

        links.forEach(function(link) {
            var linkRenderer = Drupal.ys_links.getLinkRenderer(link);
            linkRenderer(link);
        });
    };

    Drupal.behaviors.ys_links = Drupal.behaviors.ys_links || {};
    Drupal.behaviors.ys_links.attach = function (context, drupalSettings) {
        Drupal.ys_links.attach(context, drupalSettings);
    };
})(jQuery, Drupal, drupalSettings);
