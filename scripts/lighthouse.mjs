// Lighthouse en móvil sobre la web publicada (las 7 páginas). Abre Chromium con Playwright y conecta Lighthouse a su puerto.
// Uso: node scripts/lighthouse.mjs [url-base]
import { chromium } from 'playwright';
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
const BASE = process.argv[2] || 'https://alberto-cabello.github.io/';
const RUTAS = ['', 'casos/red-de-agentes/', 'casos/red-de-agentes/demo/', 'casos/app-de-estudio/', 'casos/app-de-estudio/demo/', 'casos/automatizacion-y-asistente-ia/', 'casos/automatizacion-y-asistente-ia/demo/'];
mkdirSync('capturas/lh', { recursive: true });
const b = await chromium.launch({ args: ['--remote-debugging-port=9333'] });
const filas = [];
for (const r of RUTAS) {
  const n = ('portada_' + r).replace(/\//g, '_');
  const out = `capturas/lh/${n}.json`;
  try {
    execSync(`npx -y lighthouse@13 "${BASE}${r}" --port=9333 --quiet --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=${out}`, { stdio: 'ignore', timeout: 240000 });
    const j = JSON.parse(readFileSync(out, 'utf8'));
    const c = j.categories;
    const fallos = Object.values(j.audits).filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== 'informative' && a.scoreDisplayMode !== 'manual' && a.scoreDisplayMode !== 'notApplicable').map((a) => a.id);
    filas.push(`/${r}  rend ${Math.round(c.performance.score * 100)} · acc ${Math.round(c.accessibility.score * 100)} · bp ${Math.round(c['best-practices'].score * 100)} · seo ${Math.round(c.seo.score * 100)}  | LCP ${j.audits['largest-contentful-paint'].displayValue} · TBT ${j.audits['total-blocking-time'].displayValue} · CLS ${j.audits['cumulative-layout-shift'].displayValue}  | ${fallos.join(', ')}`);
  } catch (e) { filas.push(`/${r}  error: ${String(e.message).slice(0, 120)}`); }
}
await b.close();
console.log(filas.join('\n'));
