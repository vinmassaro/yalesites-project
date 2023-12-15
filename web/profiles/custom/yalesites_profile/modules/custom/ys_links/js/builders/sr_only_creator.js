/**
 * @file
 * Screen reader only span for links.
 */

(function SrOnlyCreator(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};

  Drupal.ys_links.createSrOnlySpan = (
    content = "(unknown link--please let us know so we can add one)",
    classes = ["sr-only", "visually-hidden"]
  ) => {
    const span = document.createElement("span");
    span.classList.add(...classes);
    span.innerHTML = content;

    return span;
  };
})(Drupal, drupalSettings);
