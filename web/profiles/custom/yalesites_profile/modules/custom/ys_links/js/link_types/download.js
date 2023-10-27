/**
 * @file
 * Download link definition.
 */

(function (_$, Drupal, _drupalSettings) {

    'use strict';

    Drupal.ys_links = Drupal.ys_links || {};
    Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

    Drupal.ys_links.linkTypes.download = {
        evaluator: (link) => {
            const url=link.getAttribute('href');
            const fileExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'zip', 'csv'];
            const extension = url.split('.').pop();
            return fileExtensions.includes(extension) || link.dataset.linkType === "download"
        },
        render: (link) => {
            const fileExtension = link.getAttribute('href').split('.').pop().toUpperCase();
            [
                'link',
                'link--with-icon',
                'external-link',
            ].forEach((className) => link.classList.add(className));
            link.dataset.linkType = 'download';
            link.dataset.linkStyle = 'underline-with-icon';
            link.innerHTML = link.innerHTML.trim();

            if (!link.innerHTML.toUpperCase().includes(fileExtension)) {
                link.innerHTML += ` (${fileExtension})`;
            }

            link.appendChild(Drupal.ys_links.createIcon([
                'fa-icon',
                'fa-regular',
                'fa-circle-down'
            ],
                { hidden: true, labelledBy: 'title-circle-down-181881481' }
            ));
            link.appendChild(Drupal.ys_links.srOnlySpan('(file download)'));
            console.log(`${link.getAttribute('href')} is download`);
        },
    };

})(jQuery, Drupal, drupalSettings);

