/**
 * @file
 * Yalesites link treatment js main entry point.
 */

(function init(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.debug = false;

  const getExclusionParams = (excludedClasses) => {
    let queryParams = "a";
    if (excludedClasses.length > 0) {
      queryParams = `a:not(${excludedClasses})`;
    }

    // Ensure we only get links that have hrefs on the tag.
    queryParams += ":not(:not([href]))";

    return queryParams;
  };

  const getContextParams = (contexts) => {
    return contexts.join(", ");
  };

  const defaultConfiguration = () => ({
    contextStart: ["#main-content"],
    excludedClasses: [],
    debug: false,
  });

  const setConfiguration = (newSettings) => {
    const settings = newSettings || defaultConfiguration();
    return Object.assign(defaultConfiguration(), settings);
  };

  const retrieveAllLinksFromContexts = (contexts, excludedClasses) => {
    return (
      contexts
        .map(function findLinks(linkContext) {
          return Array.from(
            linkContext.querySelectorAll(getExclusionParams(excludedClasses))
          );
        })
        .flat() || []
    );
  };

  Drupal.ys_links.attach = function attach(context, drupalSettings) {
    drupalSettings.ys_links = setConfiguration(drupalSettings.ys_links || {});

    if (drupalSettings.ys_links.debug) {
      // eslint-disable-next-line no-console
      console.log("Drupal settings: ", drupalSettings.ys_links);
    }

    const contextStart = getContextParams(
      [drupalSettings.ys_links.contextStart].flat()
    );
    const pageContexts = Array.from(context.querySelectorAll(contextStart));
    const excludedClasses = drupalSettings.ys_links.excludedClasses.join(", ");

    const links = retrieveAllLinksFromContexts(pageContexts, excludedClasses);

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
