/**
 * @file
 * Mailto link definition.
 */

(function (_$, Drupal, _drupalSettings) {

    'use strict';

    Drupal.ys_links = Drupal.ys_links || {};
    Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

    const sanitizeEmailAddress = (emailLink) => {
        let link = emailLink.replace(/^mailto:/i, '');

        if (link.includes('?')) {
            link = link.split('?')[0];
        }

        return link;
    };

    Drupal.ys_links.linkTypes.mailto = {
        evaluator: (link) => link.getAttribute('href').startsWith('mailto:'),
        render: (link) => {
            if (link.classList.contains('ys_linked')) {
                return;
            }

            const span = document.createElement('span');
            span.innerHTML = link.innerHTML;

            const linkSpan = document.createElement('span');
            linkSpan.classList.add('pre-text__text');
            linkSpan.classList.add('visually-hidden');
            linkSpan.setAttribute('aria-hidden', true);
            linkSpan.innerHTML = sanitizeEmailAddress(link.getAttribute('href'));
            span.appendChild(linkSpan);
            link.classList.add('ys_linked');
            link.insertAdjacentElement('afterend', span);
            span.insertAdjacentElement('afterend', Drupal.ys_links.createCopyButton());
            link.remove();

            if (Drupal.ys_links.debugging) {
                console.log(`${link.getAttribute('href')} is mailto`);
            }
        }
    };

})(jQuery, Drupal, drupalSettings);
