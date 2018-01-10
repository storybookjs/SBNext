# SB [![Greenkeeper badge](https://badges.greenkeeper.io/elmasse/SB.svg)](https://greenkeeper.io/) [![Build Status](https://travis-ci.org/elmasse/SB.svg?branch=master)](https://travis-ci.org/elmasse/SB)

A static site generator based in Next.js



## What is it?
`SB` is  a wrapper around `next.js` that allows you to write static sites using `markdown` and `react`. 

### Requirements
*NodeJS* __v8.x__+ is required to run `SB` commands.

## Getting Started
There are a few steps you have to follow to get your site up and running with `SB`

- Create a project:
    -  `mkdir my-site`
    -  `cd my-site`
    -  `npm init -y` 
- Install Dependencies
    -  `npm i SB next react react-dom`
- Add a `next.config.js` config file 

    ```js
        const SBConfig = require('SB/config').default

        module.exports = SBConfig({

        })

    ```
- Create `pages/index.js`

    ```js

        import React from 'react'

        import withDocs from 'SB/docs'
        import { Content } from 'SB/doc'

        export default withDocs( ({ docs }) => {
            return (
                <section>
                {
                    docs.map(doc => <Content {...doc} />)
                }
                </section>

            )
        })

    ```
- Create a `markdown` doc entry under `docs` folder (`docs/my-first-doc.md`)

    ```md
    ---
    title: First Doc
    category: doc
    ---

    This is the first paragraph and it will be used as an excerpt when loaded in a `<Content excerpt />` tag.

    This paragraph should *not* appear in that list.

    ```
- Add npm scripts to run dev mode to your `package.json`

    ```json
    {
        "scripts": {
            "dev": "SB"
        }
    }
    ```
- Run the development server
    - `npm run dev`
    - open http://localhost:3000
- Add another npm script to your `package.json` to export the site

    ```json
    {
        "scripts": {
            "dev": "SB",
            "export": "SB build && SB export"
        }
    }
    ```

### Example
see [SB-example](https://github.com/elmasse/SB-example) for a working example

## Documentation

### `withDocs`

HOC for `/pages` components that renders a list of docs. It makes the doc list available thru the `docs` property.

```js
import withDocs from 'SB/docs'

export default withDocs( ({ docs }) => { /* render your docs here */ } )

```

### `inCategory(category, options)`

Filter function to be applied to docs to retrieve docs in a given category.

- `category`: `{String}` The category to filter results.
- `options` : `{Object}` Optional
    - `includeSubCategories:` `Boolean` true to include docs in sub categories. Default: `false`

Categories are resolved by the folder structure by default. This means that a doc located at `docs/categoryA/subOne` will have a category `categoryA/subOne` unless you specify the category name in frontmatter. 

```js
import withDocs, { inCategory } from 'SB/docs'

export default withDocs( ({ docs }) => { 
    const homeDocs = docs.filter(inCategory('home'))
    /* render your homeDocs here */ 
} )

```

If you want to retrieve all docs under a certain category, let's say `categoryA` which will include all those under `subOne`, use the options `includeSubCategories: true`. 

```js
import withDocs, { inCategory } from 'SB/docs'

export default withDocs( ({ docs }) => { 
    const categoryADocs = docs
        .filter(inCategory('categoryA', { includeSubCategories: true }))
    /* render your categoryADocsmeDocs here */ 
} )

```

### `withDocsFilterBy(filter)`

Returns an HOC that gets all docs filtered out by the given filter function. This can be used in conjunction with `inCategory` to get only the desired docs in a certain category.

 ```js
import { withDocsFilterBy, inCategory } from 'SB/docs'

const withCategoryADocs = withDocsFilterBy(inCategory('categoryA'))

export default withCategoryADocs(({ docs }) => { 
    /* render your docs here */ 
})

```

### `sortByDate`

Sort function to be applied to docs to sort by date (newest on top). This requires the doc contains a `date` in `frontmatter` or in the file name (ala jekyll)

```js
import withDocs, { sortByDate } from 'SB/docs'

export default withDocs( ({ docs }) => { 
    docs.sort(sortByDate)
    /* render your docs here */ 
} )

```

### `withDoc`

HOC for `/pages` components that renders a single doc. It makes the doc available thru the `doc` property.

```js
import withDoc from 'SB/doc'

export default withDoc( ({ doc }) => { /* render your doc here */ } )

```

### `Content`

Component to render a `doc` object. This component receive the `content` from the doc as a property.
Use the `excerpt` property to only render the first paragraph (this is useful when rendering a list of docs).

- `content`: `{String}` Markdown content to be render. This is provided by `doc.content`
- `excerpt`: `{Boolean}` true to only render the first paragraph. Optional. Default: `false`
- `renderers`: `{Object}` A set of custom renderers for Markdown elements with the form of `[tagName]: renderer`.
- `prefix`: `{String}` Prefix to use for the generated React elements. Optional. Default: `'entry-'`


```js
import withDoc, { Content } from 'SB/doc'

export default withDoc( ({ doc }) => { return (<Content {...doc} />) } )

```

Using the `excerpt` property

```js
import withDocs, {inCategory} from 'SB/docs'

export default withDocs( ({ docs }) => { 
    const homeDocs = docs.filter(inCategory('home'))
    return (
        <section>
        {
            homeDocs.map( (doc, idx) => <Content key={idx} {...doc} excerpt/> )
        }
        </section>
    )
} )

```

Using `renderers` to change/style the `<p>` tag

```js
export default withDoc( ({ doc }) => { 
    return (
        <Content {...doc} 
            renderers={{
                p: Paragraph 
            }}
        />
    ) 
} )

const Paragraph = ({ children }) => (<p style={{padding:10, background: 'silver'}}> { children } </p> )


```


### `Link`

`next/link` will work out of the box. You can use `SB/link` instead with the exact same parameters. This component wraps the `next/link` one to simplify creating a _Link_ for a given doc object.

- `data`: `{Object}` Doc frontmatter object. This is provided by `doc.data`


```js
import withDocs from 'SB/docs'
import Link from 'SB/link'


export default withDocs( ({ docs }) => { 
    return (
        <section>
        {
            docs.map( (doc, idx) => {
                return (
                    <div>
                        <h1>{doc.data.title}</h1>
                        <Content key={idx} {...doc} excerpt/>
                        <Link {...doc}><a>Read More...</a></Link>
                    </div>
                    )
            })    
        }
        </section>
    )
} )


```

### `doc`

- `data` is the frontmatter object containig the doc meta information (title, page, category, etc)
    - `data.url` is the generated url for the doc
    - `data.category` is the doc's category. When not specified, if the doc is inside a folder, the directory structure under `docs` will be used. 
    - `data.date`: JSON date from frontmatter's date or date in file name or file creation date
- `content` is markdown content of the doc

```js

{ data, content } = doc

```

### frontmatter

There are only a few defined properties in the frontmatter metadata that is used by `SB`

```md
---
page: my-awesome-doc
category: categoryOne
date: 2017-06-23

---

Doc Content...

```

- `page`: the component under `/pages` that will be used to render the doc (default to `doc` which reads `/pages/doc` component) **Note:** If you have an entry that should not be rendered by its own page (such as a part of an index file only) use `page: false` to avoid generating the url and exporting entry.
- `category`: the category name (optional)
- `date`: date string in YYYY-MM-DD format. Used to sort docs list. (optional)
- `published`: Set to `false` to remove this doc from entries.
- `permalink`: Set the url using any parameter in the frontmatter object. Default value `/:category?/:name`. The `?` means the parameter will be optional.
- `name`: **Read Only** The doc file name. Date is removed from name if present.
- `url`: **Read Only** The doc url.


### `SBConfig`

A wrapper configuration function to be applied into the `next.config.js`. It provides a way to add your own `next.js` config along with `SB` internal next.js config.

> next.config.js

```js

const SBConfig = require('SB/config').default

module.exports = SBConfig({
    // Your own next.js config here
})

```
