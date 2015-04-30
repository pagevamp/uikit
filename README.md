# Pagevamp UI #

Pagevamp UI is a UI kit built on top of Bootstrap and AngularJS.

The CSS styles are scoped, so they will not mess up the existing styles on the page.

The AngularJS directives make it easy and scalable to use the various components.

## Build the CSS ##

1. cd into `/bootstrap`
2. Execute `grunt dist --force`
3. Build exported in `/bootstrap/dist`

## Build the JS ##

1. install sbuild CLI: `npm install -g sbuild`
2. cd into `/angular`
3. Execute `sbuild build`

## Demo ##

The demos are located in `/tests`.