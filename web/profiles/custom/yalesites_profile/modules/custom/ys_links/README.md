# YaleSites Links

## Purpose

This is a global way to take links on a page and convert them to more of the
look and feel of YaleSites design system.  This is particularly useful when
users use the WSYWIG editors to create links to make sure they receive proper
treatment to function similar to the YaleSites component library twig design
system.

## Overrides

To override settings, you'll want to target the 
`hook_page_attachments(array &$page)` hook. When doing so, you'll target the
`#attached->drupalSettings->ys_links` namespace.

Settings you can override:

- debug: (default: TRUE) - This will output debugging information to the console.
- contextStart: (default: #main-content) - This is the context in which the links will be converted.  This is a CSS selector.
- excludedClasses: (default: []) - This is an array of classes that will be excluded from the conversion.

## Layout

### JavaScript

- `ys_links.js`

The main entry point of the script is the `ys_links.js` file, which sets up any
configuration, and attempts to pull the links that should be targeted for
processing.

- `copy_button_creator.js`, `icon_creator.js`, and `sr_only_creator.js`

There are some helpers for creation of the copy button, the icon that
accompanies some links, and the screen reader only description that goes along
with links decorated.  These are almost always called with a create method,
passing in the relevant parameters needed to generate it.

- `link_renderer.js`

A link renderer is present, which takes a link, and attempts to find the
correct renderer by processing it through a list of link type possibilities.
Once one has been found, it returns the rendering method that should be used to
transform the link into the desired look and feel.

Keep in mind that order matters, as the link renderer will evaluate any and all
link types already defined in the `Drupal.ys_links.linkTypes` object, so the
link types must be defined before this.

- `link_types`

This is a folder containing each link type that a link could be in order to
produce a renderer.  These all have the same interface:
  - `evaluator(link)`: evaluates a link to see if it is this type to render.
  - `render(link`: the rendering method defining what to do to the link to
    decorate it.

### CSS

Currently the only CSS change is to not cause links decorated to appear on a
new line.  If upstream changes are made to component library twig, this could
be taken away in the future, but having it here ensures more control over what
gets the decoration.


## Adding a new link type

To add a new link type, you'll perform the following steps:

1. Create a new file in the `link_types` folder.
1. Copy the boilerplate code from one of the previously defined ones, ensuring
   to define `Drupal.ys_links` and `Drupal.ys_links.link_types` if they don't
   already exist.
1. Define an object implementing the evaluator and render methods on the
   `Drupal.ys_links.linkTypes` object.
1. Define the new link type in the `ys_links.libraries` file along side the
   other link types defined.
1. Attach the new link type library in the `ys_links.module` file inside of the
   `ys_links_page_attachments` hook.  Order matters here, so place them in the
   link type section.

## History

- 2023-10-30: Created (dtb)
