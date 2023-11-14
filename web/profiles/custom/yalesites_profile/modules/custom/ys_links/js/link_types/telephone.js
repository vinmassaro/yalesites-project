/**
 * @file
 * Telephone link definition.
 */

(function telephone(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  const createTelephoneLinkHrefSpan = (link) => {
    const span = document.createElement("span");
    span.classList.add("pre-text__text");
    span.classList.add("visually-hidden");
    span.setAttribute("aria-hidden", true);
    span.innerHTML = link.getAttribute("href");
    return span;
  };

  const TELEPHONE_REGEX =
    /^(?:(?:tel:)?(?:(?:\+|00)\d{1,3}\s?)?[ -.()]*\d{1,4}[ -.()]*\d{1,4}[ -.()]*\d{1,4}[ -.()]*\d{1,4})$/;

  Drupal.ys_links.linkTypes.telephone = {
    weight: 20,
    name: "Telephone",

    evaluator: (link) => link.getAttribute("href").match(TELEPHONE_REGEX),
    render: (link) => {
      if (link.classList.contains("ys_linked")) {
        return;
      }

      const hasTel = link.getAttribute("href").match(/^tel:/);

      if (!navigator.clipboard) {
        if (!hasTel) {
          link.setAttribute("href", `tel:${link.getAttribute("href")}`);
        }
        link.classList.add("ys_linked");
        return;
      }

      if (hasTel) {
        link.setAttribute(
          "href",
          link.getAttribute("href").replace(/^tel:/, "")
        );
      }

      const span = document.createElement("span");
      span.innerHTML = link.innerHTML;

      span.appendChild(createTelephoneLinkHrefSpan(link));

      link.classList.add("ys_telephone");
      link.classList.add("ys_linked");
      link.insertAdjacentElement("afterend", span);
      span.insertAdjacentElement(
        "afterend",
        Drupal.ys_links.createCopyButton()
      );
      link.remove();

      if (drupalSettings.ys_links.debug) {
        // eslint-disable-next-line no-console
        console.log(`${link.getAttribute("href")} is a telephone`);
      }
    },
  };
})(Drupal, drupalSettings);
