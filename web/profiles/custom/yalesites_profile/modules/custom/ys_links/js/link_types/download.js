/**
 * @file
 * Download link definition.
 */

(function download(Drupal) {
  Drupal.ys_links = Drupal.ys_links || {};
  Drupal.ys_links.linkTypes = Drupal.ys_links.linkTypes || {};

  Drupal.ys_links.linkTypes.download = {
    weight: 10,
    name: "Download",

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
        "xml",
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
      link.classList.add(
        "link--with-icon",
        "external-link",
        "ys_download",
        "ys_linked"
      );

      link = Drupal.ys_links.addLinkClassIfChanged(link, (aLink) => {
        aLink = Drupal.ys_links.applyLinkStyle(aLink, "underline-with-icon");
        aLink = Drupal.ys_links.applyLinkType(aLink, "download");
        return aLink;
      });

      link.innerHTML = link.innerHTML.trim();

      if (!link.innerHTML.toUpperCase().includes(fileExtension)) {
        link.innerHTML += ` (${fileExtension})`;
      }

      // if the icon has not already been applied, apply it.
      if (link.querySelectorAll(".fa-icon").length === 0) {
        link.appendChild(
          Drupal.ys_links.createIcon({
            classes: ["fa-icon", "fa-regular", "fa-circle-down"],
            aria: { hidden: true },
          })
        );
        link.appendChild(Drupal.ys_links.createSrOnlySpan("(file download)"));
      }

      Drupal.ys_links.debugLog(`${link.getAttribute("href")} is download`);
    },
  };
})(Drupal, drupalSettings);
