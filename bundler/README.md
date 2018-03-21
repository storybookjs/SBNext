# The bundler

This subproject is an experiment on efficient webpack building, rebuilding, caching.

## Goals

- [x] find and watch all `**/*.example.js`
- [x] extract & precompile common parts
- [x] write an HTML file for every `**/*.example.js`
- [x] HMR on every page & refresh if uncaught
- [ ] wrap every example with HMR catcher code
