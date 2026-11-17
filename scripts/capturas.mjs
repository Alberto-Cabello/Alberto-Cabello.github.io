// Capturas de revisión: 1440×900 y 390×844, en oscuro y en claro.
// Uso: node scripts/capturas.mjs [url-base] [carpeta]   (por defecto, la web publicada y capturas/)
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.argv[2] || 'https://alberto-cabello.github.io/';
const OUT = process.argv[3] || 'capturas';
const PAGINAS = [{ nombre: 'portada', ruta: '' }];
const VISTAS = [
  { nombre: 'escritorio', width: 1440, height: 900, isMobile: false },
  { nombre: 'movil', width: 390, height: 844, isMobile: true },
];
const TEMAS = ['dark', 'light'];

mkdirSync(OUT, { recursive: true });
const navegador = await chromium.launch();
for (const p of PAGINAS) {
  for (const v of VISTAS) {
    for (const tema of TEMAS) {
      const ctx = await navegador.newContext({
        viewport: { width: v.width, height: v.height },
        deviceScaleFactor: 1,
        isMobile: v.isMobile,
        hasTouch: v.isMobile,
      });
      await ctx.addInitScript((t) => { try { localStorage.setItem('tema', t); } catch (e) {} }, tema);
      const page = await ctx.newPage();
      await page.goto(BASE + p.ruta, { waitUntil: 'networkidle' });
      await page.waitForTimeout(3000); // deja terminar las animaciones de entrada
      const archivo = `${OUT}/${p.nombre}-${v.nombre}-${tema === 'dark' ? 'oscuro' : 'claro'}.png`;
      await page.screenshot({ path: archivo });
      console.log(archivo);
      await ctx.close();
    }
  }
}
await navegador.close();
