/**
 * @file
 * Yalesites link icon generation.
 */

(function iconCreator(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};

  const defaultOptions = {
    classes: [],
    aria: { hidden: true },
    role: "img",
    title: "",
  };

  Drupal.ys_links.createIcon = (options = {}) => {
    // Merge options with defaultOptions.
    const { classes, aria, role, title } = {
      ...defaultOptions,
      ...options,
    };

    const faicon = document.createElement("i");
    faicon.classList.add(...classes);
    Object.entries(aria).forEach(([key, value]) =>
      faicon.setAttribute(`aria-${key}`, value)
    );
    faicon.setAttribute("role", role);
    if (title.length > 0) {
      faicon.setAttribute("title", title);
    }

    return faicon;
  };
})(Drupal, drupalSettings);
