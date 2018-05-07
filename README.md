
# SBnext

## Goal: a new architecture:
Provide a working prototype of the possibly future UI & Server for SB.

## Plan:

Todo
## Checklist

### bundler
This subproject is about efficient webpack building, rebuilding, caching.

- [x] find and watch all `**/*.example.js`
- [x] extract & precompile common parts
- [x] write an HTML file for every `**/*.example.js`
- [x] static build of html files
- [x] HMR on every page
- [x] wrap every example with HMR catcher code
  - [x] rebuild
  - [x] refresh
  - [x] recover from fatal parse error
  - [x] recover from fatal webpack error
  - [x] changing example 1 has no side-effects in example 2
- [ ] support for pre-build html-files
- [x] support DLL vendor in production mode
- [ ] investigate optimization plugins
      https://webpack.js.org/plugins/module-concatenation-plugin/
  - [ ] Measure real difference between 'development' and 'production'
- [ ] run some experiments with bundle-splitting
- [ ] fix bug with multiple DLLs

### core
The main infrastructure and low level modules, not directly interacted with by users

- [x] add renderer
      maybe rename e.g. react_dll to renderer, or detect and inject additional module
- [x] create the renderer packages
  - [x] write react renderer
    - [x] render all examples
    - [ ] preserve order
    - [ ] keep state
  - [ ] write other renderer - support for other frameworks
- [ ] write stateful renderer
- [ ] write stateful runtime
- [ ] runtime with communication-layer
- [ ] write outer frame with runtime
- [ ] share data from inner-bundle to outer
- [ ] allow passing data to renderer

### CLI
Command Line interface that users use

- [x] create cli package with multiple commands
- [ ] create an interactive choose your command to run
      https://github.com/ruyadorno/ntl
- [ ] write a awesome help command
- [ ] write static build command
- [ ] write start command
  - [ ] --public --port
- [ ] write deploy command
- [ ] write help command
- [ ] write migrate command
- [ ] write init command
  - [ ] --react --vue
  - [ ] auto detect & confirmation
  - [ ] ability to skip interactivity
- [ ] write install-addon command
- [x] validate config/...
- [x] validate config/renderers
  - [x] friendly errors
- [ ] dashboard for serve
  - [ ] Add logo http://paradoxxxzero.github.io/2014/02/28/butterfly.html
- [ ] write credits/thanks command
- [ ] logger should write to disk

### Config
The storybook configuration file, the parsing and validation of it

- [x] use cosmiconfig - https://github.com/davidtheclark/cosmiconfig
- [x] create first config in example
- [x] accept shorthand-renderers
- [x] use config in bundler
- [ ] reload config in real time

### Server
The thing responsible for serving things to the browser

- [ ] split into serve-package and bundle-package
- [ ] serve outer and inner in 1 command
- [ ] serve on localhost and local IP
- [ ] Have some standard way of fetching and caching data
      GraphQL?
  - [ ] consider a static build and how to handle fetching data

### Examples
How users interact with storybook, on a code-level. how are they supposed to structure their code to work with storybook.

- [x] create external demo run from example-package in and out
- [ ] support for multiple frameworks in 1 config

### Concepts
The key new features sbnext introduces

- [ ] Tokens / Entities (design elements)
  - [ ] Typography
  - [ ] Spacing & Grid
  - [ ] Icons
  - [ ] Colors
- [ ] Documentation pages
- [ ] Reports

### UI / App
- [ ] view-modes
  - [ ] isolated
  - [ ] multiple
  - [ ] documentation + report
- [ ] Routing
- [ ] State management
- [ ] Add, move, resize, rescale previews
- [ ] Auto size preview to fit content
      <details>If the current solution falls short we could add this: https://developer.mozilla.org/nl/docs/Web/API/MutationObserver
      </details>
- [ ] View all stories of component on 1 page
- [ ] Panels & Content
- [ ] Settings Panel
- [ ] Keyboard shortcuts
- [ ] Support for (infinite) deep hierarchy
- [ ] Search of components
- [ ] Search of other things (docs, settings, etc)
- [ ] multiple addons visisble

### Addon API
- [x] Override or wrap any component in component-registry
- [ ] basics
- [ ] ability to add panel & content
- [ ] add search
- [ ] add shortcuts
- [ ] add settings
- [ ] provide/add new sections to documentation view
- [ ] Allow addons to integrate into global state manager?

### Bonus (maybe as addons)
- [ ] dependency graph for components
- [ ] visualization for dependency graph
      <details>
      http://js.cytoscape.org/demos/cose-bilkent-layout-compound/
      </details>
- [ ] context providers, maybe as renderer-addons ?

### Api
- [ ] In example files, a pretty name as first comment above export
- [ ] a slash in pretty name might create hierarchy
- [ ] directory structure might create hierarchy
- [ ] How to add decorators
  - [ ] modifiers - mutate html in preview
  - [ ] inspectors - read html and listen to events
  - [ ] providers - place props, or context
- [ ] Api for fetching all or querying for example/components & variants
  - [ ] result could be data, urls
- [ ] Api for subscribing to changes
  - [ ] change / delete / add of example

## Notes
nothing yet

## Challenge

- [ ] backwards compatibility with story api
- [ ] backwards compatibility with decorators
- [ ] backwards compatibility with existing addons in manager
  - [ ] notes
  - [ ] backgrounds
- [ ] backwards compatibility with addons with decorators
  - [ ] knobs
