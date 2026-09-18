/* eslint-disable @typescript-eslint/no-require-imports -- Load the standalone TypeScript catalog in Node. */
const fs = require('node:fs'), assert = require('node:assert/strict'), ts = require('typescript');
const Module = require('node:module');
const file = require('node:path').resolve('webshop/lib/catalog.ts');
const mod = new Module(file);mod.paths=module.paths;
mod._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,file);
const {products,addLines,recoverCart,subtotal,shipping,normalize}=mod.exports;
assert.equal(products.length,50);assert.equal(new Set(products.map(p=>p.id)).size,50);
assert.deepEqual([...new Set(products.map(p=>p.category))].map(c=>products.filter(p=>p.category===c).length),[10,10,10,10,10]);
for(const p of products){assert(fs.existsSync('public'+p.image),p.image);assert(p.sizes.length);}
assert.equal(normalize('Košulja smeđa'),'kosulja smeda');
const original=[{id:'shirt-01',size:'M',quantity:1}];
const next=addLines(original,[{id:'shirt-01',size:'M',quantity:1}]);
assert.equal(original[0].quantity,1);assert.equal(next[0].quantity,2);assert.equal(subtotal(next),178);assert.equal(shipping(178),8);assert.equal(shipping(200),0);
assert.throws(()=>addLines([],[{id:'shirt-01',size:'S',quantity:1}]));assert.throws(()=>addLines([],[{id:'shirt-01',size:'M',quantity:99}]));
assert.deepEqual(recoverCart(JSON.parse(JSON.stringify(next))),next);
assert.deepEqual(recoverCart([{id:'missing',size:'M',quantity:2},null]),[]);
const shop=fs.readFileSync('public/webshop-assets/index.html','utf8');assert.match(shop,/noindex,follow/);
const jsFile=shop.match(/src="([^\"]+\.js)"/)[1];const js=fs.readFileSync('public'+jsFile,'utf8');
assert(!js.includes('moststudioba.vercel.app'));assert(js.includes('O ovom primjeru'));assert(js.includes('most-demo-cart-v1'));
assert(js.includes('/#top'));console.log('PASS: all 50 products and image files, size/stock guards, immutable cart quantities, shipping thresholds, stored-cart recovery, source-built noindex shop and home links.');
