# The bundler

This subproject is an experiment on efficient webpack building, rebuilding, caching.

## Goals

### bundler
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
### core
- [x] add renderer
      maybe rename e.g. react_dll to renderer, or detect and inject additional module
- [x] create the renderer packages
  - [x] write react renderer
    - [x] render all examples
    - [ ] preserve order
    - [ ] keep state
  - [ ] write other renderer - support for other frameworks
- [ ] runtime with communication-layer
- [ ] write outer frame with runtime
- [ ] share data from inner-bundle to outer
- [ ] allow passing data to renderer

### Server
- [ ] split into serve-package and bundle-package
- [ ] serve outer and inner in 1 command
- [ ] serve on localhost and local IP

### Demo
- [ ] create external demo run from example-package in and out
- [ ] support for multiple frameworks in 1 config
