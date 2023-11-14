/**
 * @file
 * Copy button link definition for mailto (and probably more later).
 */

(function copyButtonCreator(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  // How can I get this from compoenent-library-twig????
  const copyButtonFunctionality = (event) => {
    const copiedText = "&nbsp;(Copied to clipboard; select to copy again)";
    const elem = event.target;

    // Only fire if the target has id copy
    if (!elem.matches(".text-copy-button__button")) return;

    if (!navigator.clipboard) {
      // Clipboard API not available
      return;
    }
    const text = event.target.parentNode
      .querySelector(".pre-text__text")
      .textContent.trim();
    try {
      navigator.clipboard.writeText(text);
      const triggerValue = event.target;
      triggerValue.innerHTML = copiedText;
    } catch (error) {
      const triggerValue = elem;
      triggerValue.innerHTML = "(error)";
    }
  };

  Drupal.ys_links.createCopyButton = (
    clickEventHandler = copyButtonFunctionality
  ) => {
    const button = document.createElement("button");
    button.classList.add("text-copy-button__button");
    button.innerHTML = "&nbsp;(copy)";
    button.addEventListener("click", clickEventHandler);
    return button;
  };
})(Drupal, drupalSettings);
