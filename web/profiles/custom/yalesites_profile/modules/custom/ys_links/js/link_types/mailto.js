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

  // Original design
  const renderCopyOutsideOfSpan = (span) => {
    span.insertAdjacentElement("afterend", Drupal.ys_links.createCopyButton());
  };

  // Moving the button inside the span so things like grand hero will behave
  const renderCopyInsideOfSpan = (span) => {
    span.appendChild(Drupal.ys_links.createCopyButton());
  };

  // Playing with the idea that there are some links that should still be
  // treated, but not with the mailto, e.g. the grand-hero-banner__link
  // That class of link has a chevron already and would be problematic to add
  // a copy?
  const isNotSpecialLink = (link) => {
    // return !link.classList.includes("grand-hero-banner__link");
    return true;
  };

  const isMailToLink = (link) => {
    return (
      link.getAttribute("href").startsWith("mailto:") && isNotSpecialLink(link)
    );
  };

  Drupal.ys_links.linkTypes.mailto = {
    weight: 30,
    name: "Mailto",

    evaluator: isMailToLink,
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

      span.appendChild(document.createTextNode(" "));
      span.appendChild(createMailtoLinkHrefSpan(link));

      link.insertAdjacentElement("afterend", span);
      // renderCopyOutsideOfSpan(span);
      renderCopyInsideOfSpan(span);
      // span.insertAdjacentElement(
      //   "afterend",
      //   Drupal.ys_links.createCopyButton()
      // );
      link.remove();

      Drupal.ys_links.debugLog(`${link.getAttribute("href")} is mailto`);
    },
  };
})(Drupal);
