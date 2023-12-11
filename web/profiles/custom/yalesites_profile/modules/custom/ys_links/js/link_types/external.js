/**
 * @file
 * External link definition.
 */

(function external(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  const urlHasCurrentDomain = (url) =>
    url.indexOf(document.location.hostname) > -1 ||
    url.startsWith("/") ||
    url.startsWith("#");

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

      link.classList.add(
        "link--with-icon",
        "external-link",
        "ys_external",
        "ys_linked"
      );

      link = Drupal.ys_links.addLinkClassIfChanged(link, (aLink) => {
        aLink = Drupal.ys_links.applyLinkStyle(aLink, "underline-with-icon");
        aLink = Drupal.ys_links.applyLinkType(aLink, "external");
        return aLink;
      });

      link.innerHTML = link.innerHTML.trim();
      if (link.querySelectorAll(".fa-icon").length === 0) {
        link.appendChild(
          Drupal.ys_links.createIcon({
            classes: ["fa-icon", "fa-solid", "fa-arrow-up-right"],
          })
        );
        link.appendChild(
          Drupal.ys_links.createSrOnlySpan("(link is external)")
        );
      }
      Drupal.ys_links.debugLog(`${link.getAttribute("href")} is external`);
    },
  };
})(Drupal);
