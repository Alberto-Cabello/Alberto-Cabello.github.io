// Hoja de contacto: junta capturas en una sola imagen para revisarlas.
import { chromium } from 'playwright';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const [pref, cols, ancho] = [process.argv[2], Number(process.argv[3]), Number(process.argv[4])];
const dir = resolve('capturas/prueba');
const fs = readdirSync(dir).filter((f) => f.startsWith(pref + '-') && /-\d\d\.png$/.test(f)).sort();
const imgs = fs.map((f) => `<img src="${pathToFileURL(resolve(dir, f)).href}" style="width:${ancho}px">`).join('');
const html = `<body style="margin:0;display:grid;grid-template-columns:repeat(${cols},${ancho}px);gap:4px;background:#888">${imgs}</body>`;
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: cols * (ancho + 4), height: 400 } })).newPage();
await p.goto(pathToFileURL(resolve(dir, '..', '..', 'package.json')).href);
await p.setContent(html, { waitUntil: 'load' });
await p.screenshot({ path: `capturas/prueba/${pref}-hoja.png`, fullPage: true });
await b.close();
console.log(fs.length, 'capturas');
