const fs = require('fs');

const getDLLs = entrypoint => {
  const hash = entrypoint.chunks
    .reduce((acc, i) => acc.concat(i.getModules()), [])
    .reduce((acc, i) => acc.concat([...i.dependencies]), [])
    .map(i => i.module)
    .filter(i => !!i && i.constructor.name === 'DelegatedModule')
    .reduce((acc, i) => Object.assign(acc, { [i.hash]: i }), {});

  return Object.values(hash)
    .reduce((acc, i) => acc.concat(i.dependencies), [])
    .filter(i => i.module)
    .map(i => `${i.module.request}.js`);
};

class GeneratePagePlugin {
  constructor(options) {
    this.options = options;

    const engine = require(options.parser);
    const template = fs.readFileSync(options.template, 'utf-8');

    this.renderer = engine.compile(template);
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('GeneratePagePlugin', compilation => {
      compilation.hooks.additionalChunkAssets.tap('GeneratePagePlugin', () => {
        const { entrypoints } = compilation;

        [...entrypoints].forEach(([, value]) => {
          const dlls = getDLLs(value);

          const data = Object.assign({ options: this.options, compilation, dlls }, value);
          const html = this.renderer(data);

          compilation.assets[`${value.name}.html`] = {
            source: () => html,
            size: () => html.toString().length,
          };
        });
      });
    });
  }
}

module.exports = GeneratePagePlugin;

/* TODOS:
 * 
 * Investigate HMR
 * - [ ] perhaps I can add hot.accept to entrypoints themselves?
 * - [ ] not add html files during HMR?
 * 
 * Options
 * - [x] allow for a template compiler
 * - [x] allow for a template
 * 
 */
