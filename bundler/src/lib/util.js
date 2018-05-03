export const webpackRegex = /(webpack)/;

export const toSafeFilename = packageName => packageName.replace('@', '').replace(/[^a-z]/g, '_');

export const isWebpackRelated = ({ request, issuer }) => {
  // if request itself is webpack related
  if (request && request.match && request.match(webpackRegex)) {
    return true;
  }

  // recursively walk into issuer
  if (issuer) {
    return isWebpackRelated(issuer);
  }

  return false;
};

export const toStore = compilation => {
  /* We take a complex 'webpack-compilation-instance'-Object,
   * and turn it into something that we can use:
   * 
   * Object<{
   *   [component/component.example]: Object<{
   *     examples: Array<string> // exports of entry modules
   *     main: Module // webpack entry module
   *     modules: Array<{
   *       as: "./button" // the path as it was imported from parent
   *       id: "./in/button/button.js" // shortest possible unique path-like
   *       resource: "/Users/.../examples/react/in/button/button.js" // full path
   *       exports: Array<string> // exports of module
   *       hash: "f4d296a83b9803a143b7c6fe35f474bd"
   *     }>
   *   }>
   * }>
   * 
   * This should give us enough information to render and connect manager & preview in an efficient way
   */
  const stats = compilation.getStats().toJson();

  const entryModules = stats.modules
    .filter(m => m.reasons.find(r => r.type === 'single entry'))
    .filter(m => !(m.name && m.name.match(webpackRegex)));

  const entryPoints = Array.from(compilation.entrypoints).reduce((acc, [k, e]) => {
    const modules = e.chunks
      .reduce((acc, c) => acc.concat(c.getModules()), [])
      .filter(m => !isWebpackRelated(m))
      .filter(m => !(m.constructor.name !== 'DelegatedModule' && m.context === null))
      .filter(m => m.request || (m.originalRequest && m.originalRequest.request))
      .map(
        m =>
          m.originalRequest
            ? {
                as: m.originalRequest.rawRequest,
                hash: m.originalRequest.hash || m.hash,
                id: m.originalRequest.id || m.id,
                resource: m.originalRequest.resource,
              }
            : {
                as: m.rawRequest,
                hash: m.hash,
                id: m.id,
                resource: m.resource,
                exports: m.buildMeta && m.buildMeta.providedExports,
              }
      );

    const main = entryModules.find(m => m.chunks.find(c => c === k));
    const examples = main.providedExports;

    const posixKey = k.replace(/\\/g, '/');

    return Object.assign(acc, {
      [posixKey]: {
        modules,
        main,
        examples,
      },
    });
  }, {});

  return entryPoints;
};
