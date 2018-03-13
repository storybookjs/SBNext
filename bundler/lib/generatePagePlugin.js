const fs = require('fs');

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
          const dlls = [...value.chunks]
            .reduce((acc, c) => acc.concat([...c._modules]), [])
            .filter(
              m => m.external && m.externalType === 'var' && m.userRequest.includes('dll-reference')
            )
            .map(m => `${m.request}.js`);

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
