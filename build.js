const {minify} = require('html-minifier');
const {copy} = require('fs-extra');
const {writeFileSync, readFileSync} = require('fs');

writeFileSync(
  'public/index.html',
  minify(
    readFileSync('index.html').toString(),
    {
      removeAttributeQuotes: true,
      collapseInlineTagWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      collapseWhitespace: true,
      removeOptionalTags: true,
      removeComments: true,
      processScripts: ['application/ld+json'],
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeTagWhitespace: true
    }
  )
);

(async () => {
  await copy('assets', 'public/assets')
})();
