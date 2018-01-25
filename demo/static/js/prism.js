/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+bash+css-extras+json+markdown+jsx */
let _self =
    typeof window !== 'undefined'
      ? window
      : typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self : {},
  Prism = (function() {
    var e = /\blang(?:uage)?-(\w+)\b/i,
      t = 0,
      n = (_self.Prism = {
        manual: _self.Prism && _self.Prism.manual,
        util: {
          encode(e) {
            return e instanceof a
              ? new a(e.type, n.util.encode(e.content), e.alias)
              : n.util.type(e) === 'Array'
                ? e.map(n.util.encode)
                : e
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/\u00a0/g, ' ');
          },
          type(e) {
            return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1];
          },
          objId(e) {
            return e.__id || Object.defineProperty(e, '__id', { value: ++t }), e.__id;
          },
          clone(e) {
            const t = n.util.type(e);
            switch (t) {
              case 'Object':
                var a = {};
                for (const r in e) e.hasOwnProperty(r) && (a[r] = n.util.clone(e[r]));
                return a;
              case 'Array':
                return e.map && e.map(e => n.util.clone(e));
            }
            return e;
          },
        },
        languages: {
          extend(e, t) {
            const a = n.util.clone(n.languages[e]);
            for (const r in t) a[r] = t[r];
            return a;
          },
          insertBefore(e, t, a, r) {
            r = r || n.languages;
            const i = r[e];
            if (arguments.length == 2) {
              a = arguments[1];
              for (var l in a) a.hasOwnProperty(l) && (i[l] = a[l]);
              return i;
            }
            const o = {};
            for (const s in i)
              if (i.hasOwnProperty(s)) {
                if (s == t) for (var l in a) a.hasOwnProperty(l) && (o[l] = a[l]);
                o[s] = i[s];
              }
            return (
              n.languages.DFS(n.languages, function(t, n) {
                n === r[e] && t != e && (this[t] = o);
              }),
              (r[e] = o)
            );
          },
          DFS(e, t, a, r) {
            r = r || {};
            for (const i in e)
              e.hasOwnProperty(i) &&
                (t.call(e, i, e[i], a || i),
                n.util.type(e[i]) !== 'Object' || r[n.util.objId(e[i])]
                  ? n.util.type(e[i]) !== 'Array' ||
                    r[n.util.objId(e[i])] ||
                    ((r[n.util.objId(e[i])] = !0), n.languages.DFS(e[i], t, i, r))
                  : ((r[n.util.objId(e[i])] = !0), n.languages.DFS(e[i], t, null, r)));
          },
        },
        plugins: {},
        highlightAll(e, t) {
          const a = {
            callback: t,
            selector:
              'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          };
          n.hooks.run('before-highlightall', a);
          for (
            var r, i = a.elements || document.querySelectorAll(a.selector), l = 0;
            (r = i[l++]);

          )
            n.highlightElement(r, e === !0, a.callback);
        },
        highlightElement(t, a, r) {
          for (var i, l, o = t; o && !e.test(o.className); ) o = o.parentNode;
          o && ((i = (o.className.match(e) || [, ''])[1].toLowerCase()), (l = n.languages[i])),
            (t.className = `${t.className.replace(e, '').replace(/\s+/g, ' ')} language-${i}`),
            (o = t.parentNode),
            /pre/i.test(o.nodeName) &&
              (o.className = `${o.className.replace(e, '').replace(/\s+/g, ' ')} language-${i}`);
          let s = t.textContent,
            u = { element: t, language: i, grammar: l, code: s };
          if ((n.hooks.run('before-sanity-check', u), !u.code || !u.grammar))
            return (
              u.code &&
                (n.hooks.run('before-highlight', u),
                (u.element.textContent = u.code),
                n.hooks.run('after-highlight', u)),
              n.hooks.run('complete', u),
              void 0
            );
          if ((n.hooks.run('before-highlight', u), a && _self.Worker)) {
            const g = new Worker(n.filename);
            (g.onmessage = function(e) {
              (u.highlightedCode = e.data),
                n.hooks.run('before-insert', u),
                (u.element.innerHTML = u.highlightedCode),
                r && r.call(u.element),
                n.hooks.run('after-highlight', u),
                n.hooks.run('complete', u);
            }),
              g.postMessage(
                JSON.stringify({ language: u.language, code: u.code, immediateClose: !0 })
              );
          } else
            (u.highlightedCode = n.highlight(u.code, u.grammar, u.language)),
              n.hooks.run('before-insert', u),
              (u.element.innerHTML = u.highlightedCode),
              r && r.call(t),
              n.hooks.run('after-highlight', u),
              n.hooks.run('complete', u);
        },
        highlight(e, t, r) {
          const i = n.tokenize(e, t);
          return a.stringify(n.util.encode(i), r);
        },
        matchGrammar(e, t, a, r, i, l, o) {
          const s = n.Token;
          for (const u in a)
            if (a.hasOwnProperty(u) && a[u]) {
              if (u == o) return;
              let g = a[u];
              g = n.util.type(g) === 'Array' ? g : [g];
              for (let c = 0; c < g.length; ++c) {
                let h = g[c],
                  f = h.inside,
                  d = !!h.lookbehind,
                  m = !!h.greedy,
                  p = 0,
                  y = h.alias;
                if (m && !h.pattern.global) {
                  const v = h.pattern.toString().match(/[imuy]*$/)[0];
                  h.pattern = RegExp(h.pattern.source, `${v}g`);
                }
                h = h.pattern || h;
                for (let b = r, k = i; b < t.length; k += t[b].length, ++b) {
                  let w = t[b];
                  if (t.length > e.length) return;
                  if (!(w instanceof s)) {
                    h.lastIndex = 0;
                    var _ = h.exec(w),
                      P = 1;
                    if (!_ && m && b != t.length - 1) {
                      if (((h.lastIndex = k), (_ = h.exec(e)), !_)) break;
                      for (
                        var A = _.index + (d ? _[1].length : 0),
                          j = _.index + _[0].length,
                          x = b,
                          O = k,
                          S = t.length;
                        S > x && (j > O || (!t[x].type && !t[x - 1].greedy));
                        ++x
                      )
                        (O += t[x].length), A >= O && (++b, (k = O));
                      if (t[b] instanceof s || t[x - 1].greedy) continue;
                      (P = x - b), (w = e.slice(k, O)), (_.index -= k);
                    }
                    if (_) {
                      d && (p = _[1].length);
                      var A = _.index + p,
                        _ = _[0].slice(p),
                        j = A + _.length,
                        N = w.slice(0, A),
                        C = w.slice(j),
                        E = [b, P];
                      N && (++b, (k += N.length), E.push(N));
                      const L = new s(u, f ? n.tokenize(_, f) : _, y, _, m);
                      if (
                        (E.push(L),
                        C && E.push(C),
                        Array.prototype.splice.apply(t, E),
                        P != 1 && n.matchGrammar(e, t, a, b, k, !0, u),
                        l)
                      )
                        break;
                    } else if (l) break;
                  }
                }
              }
            }
        },
        tokenize(e, t) {
          let a = [e],
            r = t.rest;
          if (r) {
            for (const i in r) t[i] = r[i];
            delete t.rest;
          }
          return n.matchGrammar(e, a, t, 0, 0, !1), a;
        },
        hooks: {
          all: {},
          add(e, t) {
            const a = n.hooks.all;
            (a[e] = a[e] || []), a[e].push(t);
          },
          run(e, t) {
            const a = n.hooks.all[e];
            if (a && a.length) for (var r, i = 0; (r = a[i++]); ) r(t);
          },
        },
      }),
      a = (n.Token = function(e, t, n, a, r) {
        (this.type = e),
          (this.content = t),
          (this.alias = n),
          (this.length = 0 | (a || '').length),
          (this.greedy = !!r);
      });
    if (
      ((a.stringify = function(e, t, r) {
        if (typeof e === 'string') return e;
        if (n.util.type(e) === 'Array') return e.map(n => a.stringify(n, t, e)).join('');
        const i = {
          type: e.type,
          content: a.stringify(e.content, t, r),
          tag: 'span',
          classes: ['token', e.type],
          attributes: {},
          language: t,
          parent: r,
        };
        if ((i.type == 'comment' && (i.attributes.spellcheck = 'true'), e.alias)) {
          const l = n.util.type(e.alias) === 'Array' ? e.alias : [e.alias];
          Array.prototype.push.apply(i.classes, l);
        }
        n.hooks.run('wrap', i);
        const o = Object.keys(i.attributes)
          .map(e => `${e}="${(i.attributes[e] || '').replace(/"/g, '&quot;')}"`)
          .join(' ');
        return `<${i.tag} class="${i.classes.join(' ')}"${o ? ` ${o}` : ''}>${i.content}</${
          i.tag
        }>`;
      }),
      !_self.document)
    )
      return _self.addEventListener
        ? (_self.addEventListener(
            'message',
            e => {
              let t = JSON.parse(e.data),
                a = t.language,
                r = t.code,
                i = t.immediateClose;
              _self.postMessage(n.highlight(r, n.languages[a], a)), i && _self.close();
            },
            !1
          ),
          _self.Prism)
        : _self.Prism;
    const r =
      document.currentScript || [].slice.call(document.getElementsByTagName('script')).pop();
    return (
      r &&
        ((n.filename = r.src),
        !document.addEventListener ||
          n.manual ||
          r.hasAttribute('data-manual') ||
          (document.readyState !== 'loading'
            ? window.requestAnimationFrame
              ? window.requestAnimationFrame(n.highlightAll)
              : window.setTimeout(n.highlightAll, 16)
            : document.addEventListener('DOMContentLoaded', n.highlightAll))),
      _self.Prism
    );
  })();
typeof module !== 'undefined' && module.exports && (module.exports = Prism),
  typeof global !== 'undefined' && (global.Prism = Prism);
(Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: /<!DOCTYPE[\s\S]+?>/i,
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\s\S])*\1|[^\s'">=]+))?)*\s*\/?>/i,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/i,
        inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
      },
      'attr-value': {
        pattern: /=(?:('|")[\s\S]*?(\1)|[^\s>]+)/i,
        inside: { punctuation: /[=>"']/ },
      },
      punctuation: /\/?>/,
      'attr-name': { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } },
    },
  },
  entity: /&#?[\da-z]{1,8};/i,
}),
  (Prism.languages.markup.tag.inside['attr-value'].inside.entity = Prism.languages.markup.entity),
  Prism.hooks.add('wrap', a => {
    a.type === 'entity' && (a.attributes.title = a.content.replace(/&amp;/, '&'));
  }),
  (Prism.languages.xml = Prism.languages.markup),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup);
(Prism.languages.css = {
  comment: /\/\*[\s\S]*?\*\//,
  atrule: { pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i, inside: { rule: /@[\w-]+/ } },
  url: /url\((?:(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
  selector: /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
  string: { pattern: /("|')(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
  property: /(\b|\B)[\w-]+(?=\s*:)/i,
  important: /\B!important\b/i,
  function: /[-a-z0-9]+(?=\()/i,
  punctuation: /[(){};:]/,
}),
  (Prism.languages.css.atrule.inside.rest = Prism.util.clone(Prism.languages.css)),
  Prism.languages.markup &&
    (Prism.languages.insertBefore('markup', 'tag', {
      style: {
        pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
        lookbehind: !0,
        inside: Prism.languages.css,
        alias: 'language-css',
      },
    }),
    Prism.languages.insertBefore(
      'inside',
      'attr-value',
      {
        'style-attr': {
          pattern: /\s*style=("|').*?\1/i,
          inside: {
            'attr-name': { pattern: /^\s*style/i, inside: Prism.languages.markup.tag.inside },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            'attr-value': { pattern: /.+/i, inside: Prism.languages.css },
          },
          alias: 'language-css',
        },
      },
      Prism.languages.markup.tag
    ));
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?\*\//, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 },
  ],
  string: { pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
  'class-name': {
    pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /(\.|\\)/ },
  },
  keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(true|false)\b/,
  function: /[a-z0-9_]+(?=\()/i,
  number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
  operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
  punctuation: /[{}[\];(),.:]/,
};
(Prism.languages.javascript = Prism.languages.extend('clike', {
  keyword: /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
  number: /\b-?(0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
  function: /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,
  operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/,
})),
  Prism.languages.insertBefore('javascript', 'keyword', {
    regex: {
      pattern: /(^|[^\/])\/(?!\/)(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
      lookbehind: !0,
      greedy: !0,
    },
  }),
  Prism.languages.insertBefore('javascript', 'string', {
    'template-string': {
      pattern: /`(?:\\\\|\\?[^\\])*?`/,
      greedy: !0,
      inside: {
        interpolation: {
          pattern: /\$\{[^}]+\}/,
          inside: {
            'interpolation-punctuation': { pattern: /^\$\{|\}$/, alias: 'punctuation' },
            rest: Prism.languages.javascript,
          },
        },
        string: /[\s\S]+/,
      },
    },
  }),
  Prism.languages.markup &&
    Prism.languages.insertBefore('markup', 'tag', {
      script: {
        pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript,
        alias: 'language-javascript',
      },
    }),
  (Prism.languages.js = Prism.languages.javascript);
!(function(e) {
  const t = {
    variable: [
      {
        pattern: /\$?\(\([\s\S]+?\)\)/,
        inside: {
          variable: [{ pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 }, /^\$\(\(/],
          number: /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee]-?\d+)?)\b/,
          operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
          punctuation: /\(\(?|\)\)?|,|;/,
        },
      },
      { pattern: /\$\([^)]+\)|`[^`]+`/, inside: { variable: /^\$\(|^`|\)$|`$/ } },
      /\$(?:[a-z0-9_#\?\*!@]+|\{[^}]+\})/i,
    ],
  };
  e.languages.bash = {
    shebang: { pattern: /^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/, alias: 'important' },
    comment: { pattern: /(^|[^"{\\])#.*/, lookbehind: !0 },
    string: [
      {
        pattern: /((?:^|[^<])<<\s*)(?:"|')?(\w+?)(?:"|')?\s*\r?\n(?:[\s\S])*?\r?\n\2/g,
        lookbehind: !0,
        greedy: !0,
        inside: t,
      },
      { pattern: /(["'])(?:\\\\|\\?[^\\])*?\1/g, greedy: !0, inside: t },
    ],
    variable: t.variable,
    function: {
      pattern: /(^|\s|;|\||&)(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|npm|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)(?=$|\s|;|\||&)/,
      lookbehind: !0,
    },
    keyword: {
      pattern: /(^|\s|;|\||&)(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|\s|;|\||&)/,
      lookbehind: !0,
    },
    boolean: { pattern: /(^|\s|;|\||&)(?:true|false)(?=$|\s|;|\||&)/, lookbehind: !0 },
    operator: /&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,
    punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];]/,
  };
  const a = t.variable[1].inside;
  (a.function = e.languages.bash.function),
    (a.keyword = e.languages.bash.keyword),
    (a.boolean = e.languages.bash.boolean),
    (a.operator = e.languages.bash.operator),
    (a.punctuation = e.languages.bash.punctuation);
})(Prism);
(Prism.languages.css.selector = {
  pattern: /[^\{\}\s][^\{\}]*(?=\s*\{)/,
  inside: {
    'pseudo-element': /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
    'pseudo-class': /:[-\w]+(?:\(.*\))?/,
    class: /\.[-:\.\w]+/,
    id: /#[-:\.\w]+/,
    attribute: /\[[^\]]+\]/,
  },
}),
  Prism.languages.insertBefore('css', 'function', {
    hexcode: /#[\da-f]{3,8}/i,
    entity: /\\[\da-f]{1,8}/i,
    number: /[\d%\.]+/,
  });
(Prism.languages.json = {
  property: /"(?:\\.|[^\\"])*"(?=\s*:)/gi,
  string: /"(?!:)(?:\\.|[^\\"])*"(?!:)/g,
  number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee][+-]?\d+)?)\b/g,
  punctuation: /[{}[\]);,]/g,
  operator: /:/g,
  boolean: /\b(true|false)\b/gi,
  null: /\bnull\b/gi,
}),
  (Prism.languages.jsonp = Prism.languages.json);
(Prism.languages.markdown = Prism.languages.extend('markup', {})),
  Prism.languages.insertBefore('markdown', 'prolog', {
    blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: 'punctuation' },
    code: [
      { pattern: /^(?: {4}|\t).+/m, alias: 'keyword' },
      { pattern: /``.+?``|`[^`\n]+`/, alias: 'keyword' },
    ],
    title: [
      {
        pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
        alias: 'important',
        inside: { punctuation: /==+$|--+$/ },
      },
      {
        pattern: /(^\s*)#+.+/m,
        lookbehind: !0,
        alias: 'important',
        inside: { punctuation: /^#+|#+$/ },
      },
    ],
    hr: { pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m, lookbehind: !0, alias: 'punctuation' },
    list: { pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m, lookbehind: !0, alias: 'punctuation' },
    'url-reference': {
      pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
      inside: {
        variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
        string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
        punctuation: /^[\[\]!:]|[<>]/,
      },
      alias: 'url',
    },
    bold: {
      pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
      lookbehind: !0,
      inside: { punctuation: /^\*\*|^__|\*\*$|__$/ },
    },
    italic: {
      pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
      lookbehind: !0,
      inside: { punctuation: /^[*_]|[*_]$/ },
    },
    url: {
      pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
      inside: {
        variable: { pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
        string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ },
      },
    },
  }),
  (Prism.languages.markdown.bold.inside.url = Prism.util.clone(Prism.languages.markdown.url)),
  (Prism.languages.markdown.italic.inside.url = Prism.util.clone(Prism.languages.markdown.url)),
  (Prism.languages.markdown.bold.inside.italic = Prism.util.clone(Prism.languages.markdown.italic)),
  (Prism.languages.markdown.italic.inside.bold = Prism.util.clone(Prism.languages.markdown.bold));
!(function(a) {
  const e = a.util.clone(a.languages.javascript);
  (a.languages.jsx = a.languages.extend('markup', e)),
    (a.languages.jsx.tag.pattern = /<\/?[\w\.:-]+\s*(?:\s+(?:[\w\.:-]+(?:=(?:("|')(\\?[\s\S])*?\1|[^\s'">=]+|(\{[\s\S]*?\})))?|\{\.{3}\w+\}))*\s*\/?>/i),
    (a.languages.jsx.tag.inside['attr-value'].pattern = /=(?!\{)(?:('|")[\s\S]*?(\1)|[^\s>]+)/i),
    a.languages.insertBefore(
      'inside',
      'attr-name',
      {
        spread: {
          pattern: /\{\.{3}\w+\}/,
          inside: { punctuation: /\{|\}|\./, 'attr-value': /\w+/ },
        },
      },
      a.languages.jsx.tag
    );
  let s = a.util.clone(a.languages.jsx);
  delete s.punctuation,
    (s = a.languages.insertBefore(
      'jsx',
      'operator',
      { punctuation: /=(?={)|[{}[\];(),.:]/ },
      { jsx: s }
    )),
    a.languages.insertBefore(
      'inside',
      'attr-value',
      {
        script: { pattern: /=(\{(?:\{[^}]*\}|[^}])+\})/i, inside: s, alias: 'language-javascript' },
      },
      a.languages.jsx.tag
    );
})(Prism);
