// Validate the actual production HTML produced by `next build`, without JS hydration.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import ts from 'typescript';
const policyJs=ts.transpileModule(fs.readFileSync('src/lib/site-url.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
for(const [env,flag,expected] of [['preview','true',false],['development',undefined,false],['production',undefined,true],['production','false',false]]){const result={};new Function('exports','process',policyJs)(result,{env:{VERCEL_ENV:env,NEXT_PUBLIC_ALLOW_INDEXING:flag}});assert.equal(result.indexingAllowed,expected);assert.equal(result.siteUrl,'https://moststudioba.com');}

const root = path.resolve('.next/server/app');
const origin = 'https://moststudioba.com';
const verification = 'eExoCdIgROmTlK9gPPFqpIQpTvrDImDbRYYXujw_kz4';
const normalize = value => new URL(value, origin).href.replace(/\/$/, '');
const sitemap = new JSDOM(fs.readFileSync(path.join(root, 'sitemap.xml.body'), 'utf8'), { contentType: 'text/xml' });
const entries = [...sitemap.window.document.getElementsByTagName('url')];
const urls = entries.map(entry => normalize(entry.getElementsByTagName('loc')[0].textContent));
assert.equal(new Set(urls).size, urls.length, 'No duplicate sitemap URLs');
assert(urls.length >= 24, 'Service pages and both translations must be discoverable');
const docs = new Map();
const titles=new Set(),descriptions=new Set();
assert.equal(sitemap.window.document.getElementsByTagName("lastmod").length,0,"No fabricated lastmod");
for (const url of urls) {
  assert.equal(new URL(url).origin, origin);
  const pathname = new URL(url).pathname;
  const file = pathname === '/' ? 'index.html' : `${pathname.slice(1)}.html`;
  const dom = new JSDOM(fs.readFileSync(path.join(root, file), 'utf8'));
  docs.set(url, dom);
  const doc = dom.window.document;
  const title = doc.querySelector('head title')?.textContent;
  assert(!titles.has(title),`Duplicate title: ${url}`);titles.add(title);
  const description=doc.querySelector('head meta[name="description"]')?.content;assert(!descriptions.has(description),`Duplicate description: ${url}`);descriptions.add(description);
  assert.equal(doc.querySelector('meta[name="google-site-verification"]')?.content,verification);
  assert(title?.trim(), `Missing initial title: ${url}`);
  assert(doc.querySelector('head meta[name="description"]')?.content, `Missing description: ${url}`);
  assert.equal(doc.querySelectorAll('h1').length, 1, `One H1: ${url}`);
  assert.equal(doc.querySelectorAll('head link[rel="canonical"]').length, 1);
  assert.equal(normalize(doc.querySelector('head link[rel="canonical"]').href), url, `Self canonical: ${url}`);
  assert.equal(normalize(doc.querySelector('head meta[property="og:url"]').content), url, `OG URL: ${url}`);
  assert(!doc.querySelector('head meta[name="robots"]').content.includes('noindex'), `Sitemap must contain indexable URLs: ${url}`);
  assert(doc.querySelector('head meta[property="og:image"]').content.startsWith(origin + '/'));
  assert.equal(doc.documentElement.lang, pathname.startsWith('/de') ? 'de' : 'bs');
  for (const lang of ['bs', 'de', 'x-default']) {
    const alternate = doc.querySelector(`head link[rel="alternate"][hreflang="${lang}"]`);
    assert(alternate && urls.includes(normalize(alternate.href)), `Missing valid ${lang} alternate: ${url}`);
  }
  for (const script of doc.querySelectorAll('script[type="application/ld+json"]')) {
    const data = JSON.parse(script.textContent);
    assert.equal(data['@context'], 'https://schema.org');
    assert(!script.textContent.includes('moststudioba.vercel.app'));
    for (const entity of data['@graph'] ?? [data]) {
      assert(!('aggregateRating' in entity), 'No fabricated ratings');
      if (entity['@type'] === 'BreadcrumbList') {
        entity.itemListElement.forEach((item, i) => {
          assert.equal(item.position, i + 1);
          assert(urls.includes(normalize(item.item)), 'Breadcrumb resolves to a published route');
        });
      }
    }
  }
}
for (const [url, dom] of docs) {
  const doc = dom.window.document;
  const otherLang = doc.documentElement.lang === 'bs' ? 'de' : 'bs';
  const counterpart = normalize(doc.querySelector(`link[hreflang="${otherLang}"]`).href);
  const back = docs.get(counterpart).window.document.querySelector(`link[hreflang="${doc.documentElement.lang}"]`).href;
  assert.equal(normalize(back), url, `Reciprocal hreflang: ${url}`);
}
// Follow actual HTML links. A sitemap alone must not be the only way to find a page.
const reached = new Set([origin]);
const queue = [origin];
while (queue.length) {
  const current = queue.shift();
  for (const link of docs.get(current).window.document.querySelectorAll('a[href]')) {
    const target = new URL(link.getAttribute('href'), current);
    target.hash = ''; target.search = '';
    const next = normalize(target.href);
    if (docs.has(next) && !reached.has(next)) { reached.add(next); queue.push(next); }
  }
}
assert.equal(reached.size, urls.length, 'All sitemap pages reachable from the homepage');
const home = docs.get(origin).window.document;
assert.equal(home.querySelectorAll("iframe").length,0,"No embedded demo apps");
assert.equal(home.querySelectorAll("[data-demo-cover]").length,0,"Previews are static screenshots");
assert(!home.documentElement.innerHTML.includes("--preview-scale"));
assert(home.querySelector('img[srcset][width][height]'));
const tags = home.querySelectorAll('head meta[name="google-site-verification"]');
assert.equal(tags.length, 1);
assert.equal(tags[0].content, verification);
assert(home.body.textContent.includes('Mostara'));
assert(home.querySelector('a[href="mailto:moststudioba@gmail.com"]'));
assert(home.querySelector('a[href="https://www.instagram.com/moststudioba/"]'));
for (const lang of ['', 'de/']) {
  for (const slug of ['stolarija-hrast', 'ordinacija-lipa', 'meridijan-savjetovanje']) {
    const dom = new JSDOM(fs.readFileSync(path.join(root, `${lang}demo/${slug}.html`), 'utf8'));
    assert(dom.window.document.querySelector('meta[name="robots"]').content.includes('noindex'));
    assert(!urls.includes(`${origin}/${lang}demo/${slug}`));
    dom.window.close();
  }
}
const shop = new JSDOM(fs.readFileSync('public/webshop-assets/index.html', 'utf8'));
assert(shop.window.document.querySelector('meta[name="robots"]').content.includes('noindex'));
shop.window.close();
for (const dom of docs.values()) dom.window.close();
sitemap.window.close();
console.log(`PASS: ${urls.length} initial HTML pages; canonical, OG, reciprocal BS/DE/x-default, schema and breadcrumbs, one H1, crawlable internal links, verification token and noindex demo boundaries.`);
