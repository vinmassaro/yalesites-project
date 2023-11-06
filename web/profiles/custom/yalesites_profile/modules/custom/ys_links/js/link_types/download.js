/**
 * @file
 * Download link definition.
 */

(function download(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  Drupal.ys_links.linkTypes.download = {
    evaluator: (link) => {
      const url = link.getAttribute("href");
      const fileExtensions = [
        "pdf",
        "doc",
        "docx",
        "xls",
        "xlsx",
        "ppt",
        "pptx",
        "zip",
        "csv",
      ];
      const extension = url.split(".").pop();
      return (
        fileExtensions.includes(extension) ||
        link.dataset.linkType === "download"
      );
    },
    render: (link) => {
      if (link.classList.contains("ys_linked")) {
        return;
      }

      const fileExtension = link
        .getAttribute("href")
        .split(".")
        .pop()
        .toUpperCase();
      ["link", "link--with-icon", "external-link", "ys_linked"].forEach(
        (className) => link.classList.add(className)
      );

      if (!link.dataset.linkType) {
        link.dataset.linkType = "download";
      }

      if (!link.dataset.linkStyle) {
        link.dataset.linkStyle = "underline-with-icon";
      }

      link.innerHTML = link.innerHTML.trim();

      if (!link.innerHTML.toUpperCase().includes(fileExtension)) {
        link.innerHTML += ` (${fileExtension})`;
      }

      // if the icon has not already been applied, apply it.
      if (link.querySelectorAll(".fa-icon").length === 0) {
        link.appendChild(
          Drupal.ys_links.createIcon(
            ["fa-icon", "fa-regular", "fa-circle-down"],
            { hidden: true }
          )
        );
        link.appendChild(Drupal.ys_links.createSrOnlySpan("(file download)"));
      }
      if (Drupal.ys_links.debugging) {
        console.log(`${link.getAttribute("href")} is download`);
      }
    },
  };
})(Drupal, drupalSettings);
