/**
 * @file
 * Yalesites link icon generation.
 */

(function iconCreator(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};

  Drupal.ys_links.createIcon = (
    classes = [],
    aria = { hidden: true },
    role = "img"
  ) => {
    const faicon = document.createElement("i");
    classes.forEach((className) => faicon.classList.add(className));
    Object.entries(aria).forEach(([key, value]) =>
      faicon.setAttribute(`aria-${key}`, value)
    );
    faicon.setAttribute("role", role);

    return faicon;
  };
})(Drupal, drupalSettings);
