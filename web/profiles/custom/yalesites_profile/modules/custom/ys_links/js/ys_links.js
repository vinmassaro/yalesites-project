/**
 * @file
 * Yalesites link treatment js main entry point.
 */

(function (_$, Drupal, _drupalSettings) {
   
    'use strict';

    Drupal.ys_links = Drupal.ys_links || {};
    Drupal.ys_links.debugging = false;

    const getExclusionParams = (excludedClasses) => {
        if (excludedClasses.length > 0) {
            return `a:not(${excludedClasses})`;
        }

        return 'a';
    };

    Drupal.ys_links.attach = function(context, drupalSettings) {
        const defaultDrupalSettings = {
            contextStart: '#main-content',
            excludedClasses: [],
            debug: false,
        };

        drupalSettings.ys_links = drupalSettings.ys_links || defaultDrupalSettings;
        drupalSettings.ys_links = Object.assign(defaultDrupalSettings, drupalSettings.ys_links);
        Drupal.ys_links.debugging = drupalSettings.ys_links.debug;

        const contextStart = drupalSettings.ys_links.contextStart;
        const pageContext = context.querySelector(contextStart);
        const excludedClasses = drupalSettings.ys_links.excludedClasses.join(', ');

        const links = pageContext.querySelectorAll(getExclusionParams(excludedClasses));

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