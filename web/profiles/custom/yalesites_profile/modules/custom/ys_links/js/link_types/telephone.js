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

  Drupal.ys_links.linkTypes.telephone = {
    evaluator: (link) => {
      const url = link.getAttribute("href");
      // https://ihateregex.io/expr/phone/
      return url.match(
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
      );
    },
    render: (link) => {
      if (link.classList.contains("ys_linked")) {
        return;
      }

      if (!navigator.clipboard) {
        link.setAttribute("href", `tel:${link.getAttribute("href")}`);
        link.classList.add('ys_linked');
        return;
      }

      const span = document.createElement("span");
      span.innerHTML = link.innerHTML;

      span.appendChild(createTelephoneLinkHrefSpan(link));

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
