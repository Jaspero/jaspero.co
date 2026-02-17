const {minify} = require('html-minifier');
const {copy, ensureDirSync} = require('fs-extra');
const {writeFileSync, readFileSync} = require('fs');
const {execSync} = require('child_process');

ensureDirSync('public');

execSync('npx tailwindcss -i src/styles.css -o assets/styles.css --minify', {stdio: 'inherit'});

writeFileSync(
  'public/index.html',
  minify(
    readFileSync('index.html').toString(),
    {
      removeAttributeQuotes: true,
      minifyCSS: true,
      minifyJS: true,
      collapseWhitespace: true,
      removeOptionalTags: true,
      removeComments: true,
      processScripts: ['application/ld+json'],
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
    }
  )
);

(async () => {
  await copy('assets', 'public/assets')
})();
