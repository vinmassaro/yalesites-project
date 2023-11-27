/**
 * @file
 * External menu link definition.
 */

(function externalMenuLink(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  const urlIsLocal = (url) =>
    url.indexOf(document.location.hostname) > -1 || url.startsWith("/");

  Drupal.ys_links.linkTypes.externalMenu = {
    weight: 9,
    name: "External menu link",

    evaluator: (link) => {
      return (
        link.classList.contains("primary-nav__link") &&
        !urlIsLocal(link.getAttribute("href"))
      );
    },
    render: (link) => {
      if (link.classList.contains("ys_linked")) {
        return;
      }

      [
        "ys_linked",
        "ys_linked-external-menu",
        "link",
        "link--with-icon",
        "external-link",
      ].forEach((className) => link.classList.add(className));

      if (!link.dataset.linkType) {
        link.dataset.linkType = "external";
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
            "fa-arrow-up-right",
          ])
        );
        link.appendChild(
          Drupal.ys_links.createSrOnlySpan("(link is external)")
        );
      }

      if (drupalSettings.ys_links.debug) {
        // eslint-disable-next-line no-console
        console.log(`${link.getAttribute("href")} is an external menu item`);
      }
    },
  };
})(Drupal);
