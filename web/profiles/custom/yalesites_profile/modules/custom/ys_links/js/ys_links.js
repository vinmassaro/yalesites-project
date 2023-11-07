/**
 * @file
 * Yalesites link treatment js main entry point.
 */

(function init(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.debugging = false;

  const getExclusionParams = (excludedClasses) => {
    let queryParams = "a";
    if (excludedClasses.length > 0) {
      queryParams = `a:not(${excludedClasses})`;
    }

    // Ensure we only get links that have hrefs on the tag.
    queryParams += ":not(:not([href]))";

    return queryParams;
  };

  Drupal.ys_links.attach = function attach(context, drupalSettings) {
    const defaultDrupalSettings = {
      contextStart: "#main-content",
      excludedClasses: [],
      debug: false,
    };

    drupalSettings.ys_links = drupalSettings.ys_links || defaultDrupalSettings;
    drupalSettings.ys_links = Object.assign(
      defaultDrupalSettings,
      drupalSettings.ys_links
    );
    Drupal.ys_links.debugging = drupalSettings.ys_links.debug;

    if (Drupal.ys_links.debugging) {
      // eslint-disable-next-line no-console
      console.log(drupalSettings.ys_links);
    }

    const { contextStart } = drupalSettings.ys_links;
    const pageContext = context.querySelector(contextStart);
    const excludedClasses = drupalSettings.ys_links.excludedClasses.join(", ");

    const links = pageContext.querySelectorAll(
      getExclusionParams(excludedClasses)
    );

    links.forEach(function findLinkRenderer(link) {
      const linkRenderer = Drupal.ys_links.getLinkRenderer(link);
      linkRenderer(link);
    });
  };

  Drupal.behaviors.ys_links = Drupal.behaviors.ys_links || {};
  Drupal.behaviors.ys_links.attach = function attacher(
    context,
    drupalSettings
  ) {
    Drupal.ys_links.attach(context, drupalSettings);
  };
})(Drupal, drupalSettings);
