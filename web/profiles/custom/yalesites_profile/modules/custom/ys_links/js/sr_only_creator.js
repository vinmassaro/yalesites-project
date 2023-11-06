/**
 * @file
 * Screen reader only span for links.
 */

(function SrOnlyCreator(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};

  Drupal.ys_links.createSrOnlySpan = (
    content = "(unknown link--please let us know so we can add one)",
    classes = ["sr-only"]
  ) => {
    const span = document.createElement("span");
    classes.forEach((className) => span.classList.add(className));
    span.innerHTML = content;

    return span;
  };
})(Drupal, drupalSettings);
