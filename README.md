# Pagevamp UI #

Pagevamp UI is a UI kit built on top of Bootstrap and AngularJS.

The CSS styles are scoped, so they will not mess up the existing styles on the page.

The AngularJS directives make it easy and scalable to use the various components.

## Build the CSS ##

### global scope ###

1. cd into `/bootstrap`
2. Execute `grunt global --force`
3. Build exported in `/bootstrap/dist`
4. 
### private scope ###

1. cd into `/bootstrap`
2. Execute `grunt private --force`
3. Build exported in `/bootstrap/dist`

## Build the JS ##

1. install sbuild CLI: `npm install -g sbuild`
2. cd into `/angular`
3. Execute `sbuild build`

## Demo ##

The CSS demos are located in `/tests`.

The Angular demos are located in `/angular`.

## Editing the CSS ##

Before you edit the CSS, please read the original [Boostrap documentation](http://getbootstrap.com/getting-started/#grunt) which explains how to install the dependencies (NPM, Grunt, ...).

Please also read the [CSS Style Guide](https://github.com/26medias/CssStyleGuide). The chapter [Isolating the scope](https://github.com/26medias/CssStyleGuide#isolating-the-scope) explains why we have a modified build script that generates a CSS with a private scope.

### Private scope ###

By default, Bootstrap's CSS has a global scope. Its CSS rules will apply to the whole page.

For Ecommerce, we need to have the same theme across all sites.

We do not want the Ecommerce's CSS to interact and break the site's CSS.
We do not want the site's CSS to break the ecommerce CSS neither.

The solution to this problem is to have our Ecommerce CSS behind a private scope.

In our case, the Ecommerce CSS will only apply to elements that are the descendants of any DOM element that has the `.pagevamp-theme` class.

To prevent the site's CSS to interact and break the Ecommerce CSS, our CSS resets and overwrite all the main CSS properties.

### Helpers ###

To help with complex CSS rules (rounded corners, gradients, inset effect, ...) I have included a set of helper functions into Boostrap.

You can find those helpers in `/bootstrap/less/helpers.less`

Use them when it applies, it makes the code more maintainable.

### Variables ###

The theme uses a lot fo variables (text color, ...)

Use those variables (and create new ones) when it's relevant.

You can find the variables in `/bootstrap/less/variables.less`

### Grouping your code ###

Always group your code in a logical way when possible.

If you work on navigation, then write your code in `nav.less`

If you work on tables, then write your code in `tables.less`

Create new files if required. Don't forget to then include your file in `bootstrap.less`

### Write tests ###

If you implement new code, please write a test in `/test`.

It helps to know how to use the CSS, what it is for, and we can verify that it works and wasn't broken by another change somewhere else.