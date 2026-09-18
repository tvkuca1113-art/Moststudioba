import { build } from 'esbuild';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';
import { readFile, writeFile, mkdir, readdir, unlink } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

// Source is versioned with the Next app. Assets retain their original URLs.
const out = 'public/webshop-assets';
await mkdir(`${out}/assets`, { recursive: true });
const bundled = await build({
  entryPoints: ['webshop/main.tsx'], bundle: true, minify: true, write: false,
  format: 'esm', jsx: 'automatic', target: ['es2020'], legalComments: 'eof',
  define: { 'process.env.NODE_ENV': '"production"' },
  alias: { '@shop': path.resolve('webshop') },
});
const cssFile = path.resolve('webshop/app/globals.css');
const styles = await postcss([tailwind({ optimize: true })]).process(await readFile(cssFile, 'utf8'), { from: cssFile });
const hash = data => createHash('sha256').update(data).digest('hex').slice(0, 12);
const js = bundled.outputFiles[0].contents;
const jsName = `shop-${hash(js)}.js`, cssName = `shop-${hash(styles.css)}.css`;
for (const file of await readdir(`${out}/assets`)) {
  if (/^shop-.+\.(js|css)$/.test(file)) await unlink(`${out}/assets/${file}`);
}
await writeFile(`${out}/assets/${jsName}`, js);
await writeFile(`${out}/assets/${cssName}`, styles.css);
await writeFile(`${out}/index.html`, `<!doctype html><html lang="bs"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#293a30"><meta name="robots" content="noindex,follow"><meta name="description" content="MOST Studio demo webshop sa 50 artikala. Isprobajte pretragu, veličine, korpu i probnu kupovinu bez naplate."><title>MOST Studio Webshop</title><link rel="icon" type="image/svg+xml" href="/webshop-assets/favicon.svg"><link rel="stylesheet" href="/webshop-assets/assets/${cssName}"><script type="module" src="/webshop-assets/assets/${jsName}"></script></head><body><div id="root"></div><noscript>Za isprobavanje webshopa uključite JavaScript. <a href="/#top">Nazad na MOST Studio</a></noscript></body></html>\n`);
console.log(`Webshop built from source: ${jsName}, ${cssName}`);
