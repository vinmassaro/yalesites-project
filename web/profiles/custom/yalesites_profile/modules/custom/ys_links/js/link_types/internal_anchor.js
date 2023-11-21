/**
 * @file
 * Anchor link definition.
 */

(function Anchor(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  Drupal.ys_links.linkTypes.anchor = {
    weight: 70,
    name: "Anchor",
    evaluator: (link) => link.getAttribute("href").startsWith("#"),
    render: (link) => {
      if (link.classList.contains("ys_linked")) {
        return;
      }

      [
        "link",
        "link--with-icon",
        "external-link",
        "ys_anchor",
        "ys_linked",
      ].forEach((className) => link.classList.add(className));

      if (!link.dataset.linkType) {
        link.dataset.linkType = "with-chevron";
      }
      if (!link.dataset.linkStyle) {
        link.dataset.linkStyle = "underline-with-icon";
      }

      link.innerHTML = link.innerHTML.trim();
      if (link.querySelectorAll(".fa-icon").length === 0) {
        link.appendChild(
          Drupal.ys_links.createIcon(["fa-icon", "fa-solid", "fa-angle-right"])
        );
      }

      if (drupalSettings.ys_links.debug) {
        // eslint-disable-next-line no-console
        console.log(`${link.getAttribute("href")} is an internal anchor`);
      }
    },
  };
})(Drupal, drupalSettings);
