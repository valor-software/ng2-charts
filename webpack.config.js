/* eslint no-process-env: 0, global-require:0 */
'use strict';

const reqPrism = require('prismjs');
const marked = require('marked');

marked.Renderer.prototype.code = function renderCode(code, lang) {
  const out = this.options.highlight(code, lang);
  const classMap = this.options.langPrefix + lang;

  if (!lang) {
    return `<pre><code>${out}\n</code></pre>`;
  }
  return `<pre class="${classMap}"><code class="${classMap}">${out}\n</code></pre>\n`;
};

// Look in ./config folder for webpack.dev.js
const conf = getWebpackConfig(process.env.NODE_ENV, require('./.ng2-config'));

conf.markdownLoader = {
  langPrefix: 'language-',
  highlight(code, lang) {
    const language = !lang || lang === 'html' ? 'markup' : lang;
    const Prism = global.Prism || reqPrism;

    if (!Prism.languages[language]) {
      require(`prismjs/components/prism-${language}.js`);
    }
    return Prism.highlight(code, Prism.languages[language]);
  }
};

module.exports = conf;

function getWebpackConfig(env, config) {
  switch (env) {
  case 'prod':
  case 'production':
    return require('ng2-webpack-config').webpack.prod(config);
  case 'test':
  case 'testing':
    return require('ng2-webpack-config').webpack.test(config);
  case 'dev':
  case 'development':
  default:
    return require('ng2-webpack-config').webpack.dev(config);
  }
}
