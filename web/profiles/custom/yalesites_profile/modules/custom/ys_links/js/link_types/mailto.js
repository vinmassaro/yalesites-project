/**
 * @file
 * Mailto link definition.
 */

(function mailto(Drupal, _drupalSettings) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  const sanitizeEmailAddress = (emailLink) => {
    let link = emailLink.replace(/^mailto:/i, "");

    if (link.includes("?")) {
      [link] = link.split("?");
    }

    return link;
  };

  const createMailtoLinkHrefSpan = (link) => {
    const span = document.createElement("span");
    span.classList.add("pre-text__text");
    span.classList.add("visually-hidden");
    span.setAttribute("aria-hidden", true);
    span.innerHTML = sanitizeEmailAddress(link.getAttribute("href"));
    return span;
  };

  Drupal.ys_links.linkTypes.mailto = {
    evaluator: (link) => link.getAttribute("href").startsWith("mailto:"),
    render: (link) => {
      if (link.classList.contains("ys_linked")) {
        return;
      }

      if (!navigator.clipboard) {
        link.classList.add("ys_linked");
        return;
      }

      const span = document.createElement("span");
      span.innerHTML = link.innerHTML;

      span.appendChild(createMailtoLinkHrefSpan(link));

      link.classList.add("ys_linked");
      link.insertAdjacentElement("afterend", span);
      span.insertAdjacentElement(
        "afterend",
        Drupal.ys_links.createCopyButton()
      );
      link.remove();

      if (Drupal.ys_links.debugging) {
        console.log(`${link.getAttribute("href")} is mailto`);
      }
    },
  };
})(Drupal, drupalSettings);
