/**
 * @file
 * Copy button link definition for mailto (and probably more later).
 */

(function copyButtonCreator(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  // How can I get this from compoenent-library-twig????
  const copyButtonFunctionality = (event) => {
    const copyText = [
      "&nbsp;(Copied again to clipboard; select to copy again)",
      "&nbsp;(Copied to clipboard; select to copy again)",
    ];
    const elem = event.target;

    if (drupalSettings.ys_links.debug) {
      // eslint-disable-next-line
      console.log("elem: ", elem);
    }

    // Only fire if the target has id copy
    if (!elem.matches(".text-copy-button__button")) return;

    if (!navigator.clipboard) {
      // Clipboard API not available
      return;
    }

    if (drupalSettings.ys_links.debug) {
      // eslint-disable-next-line no-console
      console.log(
        ".pre-text__text found: ",
        event.target.previousElementSibling.querySelector(".pre-text__text")
      );
    }

    const text = event.target.previousElementSibling
      .querySelector(".pre-text__text")
      .textContent.trim();
    try {
      navigator.clipboard.writeText(text);
      const triggerValue = event.target;

      // Update the copyIndex used for toggling.
      let copyIndex = parseInt(triggerValue.dataset.copyIndex, 10) || 0;
      copyIndex = copyIndex === 1 ? 0 : 1;
      triggerValue.dataset.copyIndex = copyIndex;

      triggerValue.innerHTML = copyText[copyIndex];
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
