// Genera public/og.png (1200×630): el titular de la portada sobre el fondo oscuro con el subrayado de acento.
import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const fuente = (f) => pathToFileURL(resolve('node_modules', f)).href;
const html = `<!doctype html><html><head><style>
@font-face { font-family: Inter; font-weight: 800; src: url(${fuente('@fontsource/inter/files/inter-latin-800-normal.woff2')}); }
@font-face { font-family: Plex; font-weight: 400; src: url(${fuente('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2')}); }
html, body { margin: 0; width: 1200px; height: 630px; background: #0B0B0C; color: #F2F0EB; }
body { box-sizing: border-box; padding: 84px 88px; display: flex; flex-direction: column; justify-content: center; gap: 34px; font-family: Inter, sans-serif; }
.k { font-family: Plex, monospace; font-size: 26px; color: #A09D96; }
h1 { margin: 0; font-weight: 800; font-size: 118px; line-height: 0.96; letter-spacing: -0.05em; }
.soft { display: block; filter: blur(2.6px); opacity: .7; }
.sharp { position: relative; display: inline-block; }
.bar { position: absolute; left: 0; right: 0; bottom: 0.04em; height: 0.08em; background: #FF5B2E; }
</style></head><body>
<p class="k" style="margin:0">Alberto Cabello · AI Engineer · Málaga</p>
<h1><span class="soft">Las ideas llegan borrosas.</span><span>Yo las <span class="sharp">enfoco.<span class="bar"></span></span></span></h1>
</body></html>`;

const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1200, height: 630 } })).newPage();
await p.goto(pathToFileURL(resolve('package.json')).href);
await p.setContent(html, { waitUntil: 'load' });
await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: 'public/og.png' });
await b.close();
console.log('public/og.png');
