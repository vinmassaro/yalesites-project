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

  const prependProtocol = (link) => {
    if (link.getAttribute("href").match(/^tel:/)) {
      return link.getAttribute("href");
    }
    return `tel:${link.getAttribute("href")}`;
  };

  const TELEPHONE_REGEX =
    /^(?:(?:tel:)?(?:(?:\+|00)\d{1,3}\s?)?[ -.()]*\d{1,4}[ -.()]*\d{1,4}[ -.()]*\d{1,4}[ -.()]*\d{1,4})$/;

  // Moving the button inside the span so things like grand hero will behave
  const renderCopyInsideOfElement = (element) => {
    element.innerHTML += " ";
    element.appendChild(Drupal.ys_links.createCopyButtonWithIcon());
  };

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

      const clonedLink = link.cloneNode(true);
      clonedLink.classList.add("ys_telephone", "ys_linked", "link--with-icon");
      clonedLink.setAttribute("href", prependProtocol(clonedLink));

      clonedLink.appendChild(document.createTextNode(" "));
      renderCopyInsideOfElement(clonedLink);
      clonedLink.appendChild(createTelephoneLinkHrefSpan(link));

      link.insertAdjacentElement("afterend", clonedLink);
      link.remove();

      Drupal.ys_links.debugLog(`${link.getAttribute("href")} is a telephone`);
    },
  };
})(Drupal, drupalSettings);
