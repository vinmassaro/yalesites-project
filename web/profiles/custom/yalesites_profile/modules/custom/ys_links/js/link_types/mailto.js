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
    span.classList.add("pre-text__text", "visually-hidden");
    span.setAttribute("aria-hidden", true);
    span.innerHTML = sanitizeEmailAddress(link.getAttribute("href"));
    return span;
  };

  // Moving the button inside the span so things like grand hero will behave
  const renderCopyInsideOfElement = (element) => {
    element.innerHTML += " ";
    element.appendChild(Drupal.ys_links.createCopyButtonWithIcon());
  };

  const isMailToLink = (link) => {
    return link.getAttribute("href").startsWith("mailto:");
  };

  Drupal.ys_links.linkTypes.mailto = {
    weight: 30,
    name: "Mailto",

    evaluator: isMailToLink,
    render: (link) => {
      if (link.classList.contains("ys_linked")) {
        return;
      }

      // Remove these two lines when we're ready to actually use.
      link.classList.add("ys_skipped");
      return;

      if (!navigator.clipboard) {
        link.classList.add("ys_skipped", "ys_linked", "link--with-icon");
        return;
      }

      const clonedLink = link.cloneNode(true);
      clonedLink.classList.add("ys_mailto", "ys_linked", "link--with-icon");

      clonedLink.appendChild(document.createTextNode(" "));
      renderCopyInsideOfElement(clonedLink);
      clonedLink.appendChild(createMailtoLinkHrefSpan(link));

      link.insertAdjacentElement("afterend", clonedLink);
      link.remove();

      Drupal.ys_links.debugLog(`${link.getAttribute("href")} is mailto`);
    },
  };
})(Drupal);
