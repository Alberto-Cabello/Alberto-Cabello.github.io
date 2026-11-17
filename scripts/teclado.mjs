// Pasada solo con teclado: recorre cada página con Tab y comprueba que el foco avanza en orden,
// que siempre se ve (contorno o sombra) y que no hay trampas. Uso: npx vite preview y node scripts/teclado.mjs
import { chromium } from 'playwright';
const BASE = process.argv[2] || 'http://localhost:4173/';
const RUTAS = ['', 'casos/red-de-agentes/', 'casos/red-de-agentes/demo/', 'casos/app-de-estudio/', 'casos/app-de-estudio/demo/', 'casos/automatizacion-y-asistente-ia/', 'casos/automatizacion-y-asistente-ia/demo/', '404.html'];
const b = await chromium.launch();
const informe = [];
for (const [w, h, n] of [[1440, 900, 'escritorio'], [390, 844, 'móvil']]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } });
  for (const r of RUTAS) {
    const p = await ctx.newPage();
    await p.route('https://api.web3forms.com/**', (x) => x.abort());
    await p.goto(BASE + r, { waitUntil: 'networkidle' });
    const vistos = []; const sinFoco = []; let repetido = 0; let fin = false;
    for (let i = 0; i < 400; i++) {
      await p.keyboard.press('Tab');
      const d = await p.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const cs = getComputedStyle(el);
        const visible = (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || (cs.boxShadow && cs.boxShadow !== 'none');
        const r = el.getBoundingClientRect();
        const txt = (el.getAttribute('aria-label') || el.textContent || el.getAttribute('name') || el.tagName).trim().replace(/\s+/g, ' ').slice(0, 40);
        return { id: el.tagName + ':' + txt + ':' + Math.round(r.top + scrollY), visible, en: r.width > 0 && r.height > 0 };
      });
      if (!d) { fin = true; break; }
      if (vistos.length && vistos[0] === d.id) { fin = true; break; }
      if (vistos.includes(d.id)) repetido++;
      vistos.push(d.id);
      if (!d.visible && d.en) sinFoco.push(d.id.split(':').slice(0, 2).join(':'));
      if (repetido > 5) break;
    }
    // Shift+Tab debe volver atrás sin quedarse atrapado.
    await p.keyboard.press('Shift+Tab');
    informe.push(`${n} /${r}: ${vistos.length} paradas de foco${fin ? ', vuelve al inicio (sin trampas)' : ', NO llega al final'}${repetido > 5 ? ', REPITE (posible trampa)' : ''}${sinFoco.length ? `, sin foco visible: ${[...new Set(sinFoco)].slice(0, 6).join(' | ')}` : ', foco siempre visible'}`);
    await p.close();
  }
  await ctx.close();
}
await b.close();
console.log(informe.join('\n'));
