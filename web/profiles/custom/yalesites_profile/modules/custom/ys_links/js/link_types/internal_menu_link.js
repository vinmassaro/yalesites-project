/**
 * @file
 * External menu link definition.
 */

(function internalMenuLink(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  const urlIsLocal = (url) =>
    url.indexOf(document.location.hostname) > -1 || url.startsWith("/");

  Drupal.ys_links.linkTypes.internalMenu = {
    weight: 8,
    name: "External menu link",

    evaluator: (link) => {
      return (
        link.classList.contains("primary-nav__link") &&
        urlIsLocal(link.getAttribute("href"))
      );
    },
    render: (link) => {
      if (link.classList.contains("ys_linked")) {
        return;
      }

      ["ys_linked", "ys_linked-internal-menu"].forEach((className) =>
        link.classList.add(className)
      );

      if (drupalSettings.ys_links.debug) {
        // eslint-disable-next-line no-console
        console.log(`${link.getAttribute("href")} is an internal menu item`);
      }
    },
  };
})(Drupal);
