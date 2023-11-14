/**
 * @file
 * External link definition.
 */

(function external(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  const urlHasCurrentDomain = (url) =>
    url.indexOf(document.location.hostname) > -1;

  Drupal.ys_links.linkTypes.external = {
    weight: 900,
    name: "External",

    evaluator: (link) => {
      const url = link.getAttribute("href");
      return !urlHasCurrentDomain(url);
    },
    render: (link) => {
      if (link.classList.contains("ys_linked")) {
        return;
      }

      [
        "link",
        "link--with-icon",
        "external-link",
        "ys_external",
        "ys_linked",
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
        console.log(`${link.getAttribute("href")} is external`);
      }
    },
  };
})(Drupal);
