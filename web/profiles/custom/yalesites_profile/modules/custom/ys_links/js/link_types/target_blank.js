/**
 * @file
 * Blank target link definition.
 * Note: Not really used, but in storybook.
 */

(function targetBlank(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  const hasBlankTarget = (link) => link.getAttribute("target") === "_blank";

  Drupal.ys_links.linkTypes.targetBlank = {
    weight: 10,
    name: "Blank target",

    evaluator: (link) => {
      return hasBlankTarget(link);
    },
    render: (link) => {
      if (link.classList.contains("ys_linked")) {
        return;
      }

      [
        "link",
        "link--with-icon",
        "external-link",
        "ys_target-blank",
        "ys_linked",
      ].forEach((className) => link.classList.add(className));

      if (!link.dataset.linkType) {
        link.dataset.linkType = "target-blank";
      }

      if (!link.dataset.linkStyle) {
        link.dataset.linkStyle = "underline-with-icon";
      }

      link.innerHTML = link.innerHTML.trim();
      if (link.querySelectorAll(".fa-icon").length === 0) {
        link.appendChild(
          Drupal.ys_links.createIcon([
            "fa-icon",
            "fa-solid",
            "fa-arrow-up-right-from-square",
          ])
        );
        link.appendChild(
          Drupal.ys_links.createSrOnlySpan("(opens in a new window/tab)")
        );
      }

      if (drupalSettings.ys_links.debug) {
        // eslint-disable-next-line no-console
        console.log(`${link.getAttribute("href")} is target blank`);
      }
    },
  };
})(Drupal);
