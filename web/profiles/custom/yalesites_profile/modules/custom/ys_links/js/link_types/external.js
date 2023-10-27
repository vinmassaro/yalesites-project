/**
 * @file
 * External link definition.
 */

(function (_$, Drupal, _drupalSettings) {

    'use strict';

    Drupal.ys_links = Drupal.ys_links || {};
    Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

    const urlHasCurrentDomain = (url) => url.indexOf(document.location.hostname) > -1;
    const notAnotherEvaluator = (evaluators, link) => evaluators.filter((fn) => fn(link)).length === 0;

    Drupal.ys_links.linkTypes.external = {
        evaluator: (link) => {
            const url = link.getAttribute('href')
            // External links could be other evaluators, so we need to be
            // careful that it is not one of those.  This is a guard in case we
            // have an evaluation that is out of order.
            const dependentEvaluators = [
                Drupal.ys_links.linkTypes.mailto.evaluator,
                Drupal.ys_links.linkTypes.relative.evaluator,
                Drupal.ys_links.linkTypes.download.evaluator,
            ];

            return !urlHasCurrentDomain(url) && 
                notAnotherEvaluator(dependentEvaluators, link)
        },
        render: function (link) { 
            [
                'link',
                'link--with-icon',
                'external-link'
            ].forEach((className) => link.classList.add(className));
            link.dataset.linkType = 'external';
            link.innerHTML = link.innerHTML.trim();
            link.appendChild(Drupal.ys_links.createIcon([
                'fa-icon',
                'fa-solid',
                'fa-arrow-up-right'
            ]));
            link.appendChild(Drupal.ys_links.srOnlySpan('(link is external)'));
            console.log(`${link.getAttribute('href')} is external`);
        },
    };

})(jQuery, Drupal, drupalSettings);

