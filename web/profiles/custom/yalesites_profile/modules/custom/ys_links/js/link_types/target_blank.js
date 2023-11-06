/**
 * @file
 * Blank target link definition.
 * Note: Not really used, but in storybook.
 */

(function targetBlank(Drupal, _drupalSettings) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  const hasBlankTarget = (link) => link.getAttribute("target") === "_blank";
  const linkTypeIsTarget = (link) => link.dataset.linkType === "target-blank";

  Drupal.ys_links.linkTypes.targetBlank = {
    evaluator: (link) => {
      return hasBlankTarget(link) || linkTypeIsTarget(link);
    },
    render: (link) => {
      if (Drupal.ys_links.debugging) {
        console.log(`${link.getAttribute("href")} is target blank`);
      }
    },
  };
})(Drupal, drupalSettings);
