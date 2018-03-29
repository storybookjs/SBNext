# The bundler

This subproject is an experiment on efficient webpack building, rebuilding, caching.

## Goals

- [x] find and watch all `**/*.example.js`
- [x] extract & precompile common parts
- [x] write an HTML file for every `**/*.example.js`
- [x] HMR on every page
- [x] wrap every example with HMR catcher code
  - [x] rebuild
  - [x] refresh
  - [x] recover from fatal parse error
  - [x] recover from fatal webpack error
- [x] add renderer
      maybe rename e.g. react_dll to renderer, or detect and inject additional module
- [x] render first example
- [ ] runtime with communication-layer
- [ ] write outer frame with runtime
- [ ] split into serve-package and bundle-package
- [ ] run from example-package in and out
- [ ] support for other frameworks
- [x] create the renderer packages
- [ ] support for multiple frameworks in 1 config
- [ ] serve outer and inner in 1 command
- [ ] serve on localhost and local IP
- [ ] share data from inner-bundle to outer
- [ ] support for prebuild html-files
- [ ] allow passing data to renderer
