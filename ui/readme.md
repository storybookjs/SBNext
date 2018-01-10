
# A prototype

## Goal description:
Provide a working prototype of the possibly future UI & Server for SB.

## Plan:

Use Next.js for everything besides the preview. The previews require some special handling because of multi-framework support but also performance. The previews are and should stay real iframes. To get JS & CSS isolation and correctly functioning media-queries. CSS encapsulation would also be possible using tooling and the use of shadow-dom, but the other 2 are as of yet not possible without.

We'll create a main server (framework-agnotic) that is in control of a preview-server and a manager-server (next.js). The main server will proxy and connect both.

For performance reasons we don't want every iframe to create it's own websocket and HMR. Perhaps we can relay the data to the existing websocket next.js/manager uses and pass it to the iframe via postmessage.

## Goal checklist

### UI
- [x] Multiple previews
- [x] Add, move, resize, rescale previews
- [x] Auto size preview to fit content
      <details>If the current solution falls short we could add this: https://developer.mozilla.org/nl/docs/Web/API/MutationObserver
      </details>
- [ ] View all stories of component on 1 page
- [x] Panels & Content
- [x] Settings Panel
- [x] Keyboard shortcuts
- [ ] Support for (infinite) deep hierarchy
- [ ] Search of components
- [ ] Search of other things (docs, settings, etc)

### Architecture
- [ ] Main server communicating with nextjs (updating data) about stories
      <details>
      Generating pages? or maybe some channel to push HMR events
      </details>
- [x] Bundling and watching infinite entries (for stories)
- [ ] Lazy bundling for previews
- [x] Lazy bundling for manager
      <detail>
      Next pages are bundled lazily, but we can't really have nextJS clinetside-script in previews.
      so that makes so we can't use it for previews
      </details>
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
- [ ] add sections to documentation view

### Bonus
- [ ] dependency graph for components
- [ ] visualisation for dependency graph
      <details>
      http://js.cytoscape.org/demos/cose-bilkent-layout-compound/
      </details>

## Notes
For infrastructure this seems to be a good candidate to see how they've abstracted next.js:
https://github.com/elmasse/nextein

> I have a WIP branch that has taken the source of nextein, a nextein demo and the current ui, and placed them in a monorepo.

## Badges
[![Greenkeeper badge](https://badges.greenkeeper.io/ndelangen/SB4.svg)](https://greenkeeper.io/)

