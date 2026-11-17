// Revisión de accesibilidad con axe-core en las 8 páginas (escritorio/móvil, oscuro/claro, movimiento normal/reducido). Uso: npx vite preview y node scripts/accesibilidad.mjs
import { chromium } from 'playwright';
const paginas = ['', 'casos/red-de-agentes/', 'casos/app-de-estudio/', 'casos/automatizacion-y-asistente-ia/', 'casos/app-de-estudio/demo/', 'casos/automatizacion-y-asistente-ia/demo/', 'casos/red-de-agentes/demo/', 'no-existe'];
const b = await chromium.launch();
const tot = {};
for (const [w, h, m, n] of [[1440, 900, false, 'esc'], [390, 844, true, 'mov']]) for (const tema of ['dark', 'light']) for (const reduce of [false, true]) {
  const ctx = await b.newContext({ bypassCSP: true, viewport: { width: w, height: h }, isMobile: m, hasTouch: m, reducedMotion: reduce ? 'reduce' : 'no-preference' });
  await ctx.addInitScript((t) => { try { localStorage.setItem('tema', t); } catch (e) {} }, tema);
  for (const ruta of paginas) {
    const p = await ctx.newPage();
    await p.goto('http://localhost:4173/' + ruta, { waitUntil: 'networkidle' });
    // recorre la página para disparar las entradas y vuelve arriba
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } window.scrollTo(0, 0); });
    await p.waitForTimeout(4500);
    await p.addScriptTag({ url: 'https://cdn.jsdelivr.net/npm/axe-core@4.10.2/axe.min.js' });
    const r = await p.evaluate(async () => (await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] })).violations.map((v) => [v.id, v.nodes.length, v.nodes.slice(0, 2).map((x) => x.target.join(' ')).join(' | ')]));
    for (const [id, k, ej] of r) { const key = `${id} · /${ruta} · ${n} ${tema}${reduce ? ' reducido' : ''}`; tot[key] = `${k} nodos · ${ej}`; }
    await p.close();
  }
  await ctx.close();
}
await b.close();
const ks = Object.keys(tot);
console.log(ks.length ? ks.map((k) => k + ' → ' + tot[k]).join('\n') : 'axe: sin infracciones');
