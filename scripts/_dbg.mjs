import { chromium } from 'playwright';
const [ruta, pref] = [process.argv[2], process.argv[3]];
const b = await chromium.launch();
const err = [];
for (const [w, h, m, n] of [[1440, 900, false, 'esc'], [390, 844, true, 'mov']]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h }, isMobile: m, hasTouch: m })).newPage();
  p.on('pageerror', (e) => err.push(n + ' ' + e.message));
  p.on('console', (c) => { if (c.type() === 'error') err.push(n + ' consola ' + c.text()); });
  await p.goto('http://localhost:4173/' + ruta, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1200);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  let k = 0;
  for (let y = 0; y < H; y += h * 0.9) {
    await p.evaluate((yy) => window.scrollTo(0, yy), y);
    await p.waitForTimeout(900);
    await p.screenshot({ path: `capturas/prueba/${pref}-${n}-${String(k++).padStart(2, '0')}.png`, scale: 'css' });
  }
  console.log(n, 'alto', H, 'ancho', await p.evaluate(() => document.documentElement.scrollWidth), 'capturas', k);
}
await b.close();
console.log(err.join('\n') || 'sin errores JS');
