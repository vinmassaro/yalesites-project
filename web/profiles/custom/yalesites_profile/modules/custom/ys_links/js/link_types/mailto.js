/**
 * @file
 * Mailto link definition.
 */

(function mailto(Drupal) {
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
    weight: 30,
    name: "Mailto",

    evaluator: (link) => link.getAttribute("href").startsWith("mailto:"),
    render: (link) => {
      if (link.classList.contains("ys_linked")) {
        return;
      }

      if (!navigator.clipboard) {
        link.classList.add("ys_skipped");
        link.classList.add("ys_linked");
        return;
      }

      const span = document.createElement("span");
      const clonedLink = link.cloneNode(true);
      clonedLink.classList.add("ys_mailto");
      clonedLink.classList.add("ys_linked");
      span.appendChild(clonedLink);

      span.appendChild(createMailtoLinkHrefSpan(link));

      link.insertAdjacentElement("afterend", span);
      span.insertAdjacentElement(
        "afterend",
        Drupal.ys_links.createCopyButton()
      );
      link.remove();

      if (drupalSettings.ys_links.debug) {
        // eslint-disable-next-line no-console
        console.log(`${link.getAttribute("href")} is mailto`);
      }
    },
  };
})(Drupal);
