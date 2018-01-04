
# A prototype

## Goal description:
Provide a working prototype of the possibly future UI for SB.

## Goal checklist

### UI
- [x] Multiple previews
- [x] Add, move, resize, rescale previews
- [x] Auto size preview to fit content
      <details>If the current solution falls short we could add this: https://developer.mozilla.org/nl/docs/Web/API/MutationObserver</details>
- [ ] View all stories of component on 1 page
- [x] Panels & Content
- [x] Settings Panel
- [x] Keyboard shortcuts
- [ ] Support for (infinite) deep hierarchy
- [ ] Search of components
- [ ] Search of other things (docs, settings, etc)

### Architecture
- [x] Lazy bundling
- [ ] Create a package managing next.js
- [ ] Multiple frameworks
- [ ] State management  
      <details>
       - Redux or mobX, maybe mobx-state-tree?
       - a system for addons to have their state managed via this
       - allow addons to access this state, possibly via a Provider component we provide
      </details>

### Addon API
- [ ] basics
- [ ] ability to add panel & content
- [ ] add search
- [ ] add shortcuts
- [ ] add settings

## Notes
For infrastructure this seems to be a good candidate to see how they've abstracted next.js:
https://github.com/elmasse/nextein

## Badges
[![Greenkeeper badge](https://badges.greenkeeper.io/ndelangen/SB4.svg)](https://greenkeeper.io/)

