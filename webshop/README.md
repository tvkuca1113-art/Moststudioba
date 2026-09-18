# Webshop source

Recovered from the existing MOST Studio Demo webshop source, commit
`1d3772407c4c1660e17e26a43b633db355dc440b` on 2026-09-18.
Only the shop, its catalog and the UI primitives it uses are included here.
The original Sites deployment is not the production target for this repository.

Run `npm run build:webshop` from the repository root. `npm run build` does this
automatically before building Next.js. The script bundles React with esbuild,
compiles the shop's isolated Tailwind stylesheet and writes content-hashed
assets to `public/webshop-assets`. Do not edit those generated files.

The 50 original product images, product IDs, prices, stock and storage key
`most-demo-cart-v1` remain compatible with the published demo. Personal checkout
details stay in memory; only product IDs, sizes and quantities are stored locally.
No orders, payments or messages are sent. The demo remains `noindex,follow`.
