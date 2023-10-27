/**
 * @file
 * Copy button link definition for mailto (and probably more later).
 */

(function (_$, Drupal, _drupalSettings) {

    'use strict';

    Drupal.ys_links = Drupal.ys_links || {};
    Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

    Drupal.ys_links.copyButton = () => {
        const button = document.createElement('button');
        button.classList.add('text-copy-button__button');
        button.innerHTML = "&nbsp;(copy)";
        button.addEventListener('click', Drupal.ys_links.copyButtonFunctionality);
        return button;
    };

    // How can I get this from compoenent-library-twig????
    Drupal.ys_links.copyButtonFunctionality = (event) => {
        // Only fire if the target has id copy
        if (!event.target.matches('.text-copy-button__button')) return;

        if (!navigator.clipboard) {
            // Clipboard API not available
            return;
        }
        const text = event.target.parentNode
            .querySelector('.pre-text__text')
            .textContent.trim();
        try {
            navigator.clipboard.writeText(text);
            const triggerValue = event.target;
            triggerValue.innerHTML = '&nbsp;Copied to clipboard';
            setTimeout(() => {
                triggerValue.innerHTML = '&nbsp;(copy)';
            }, 1200);
        } catch (error) {
            const triggerValue = elem;
            triggerValue.innerHTML = '(error)';
        }
    };
})(jQuery, Drupal, drupalSettings);
