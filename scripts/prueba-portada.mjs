// Prueba de la portada en local: recorridos, ?para=, transiciones, validación del formulario y cambio de versión.
// Uso: node scripts/prueba-portada.mjs [url-base] [carpeta]
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.argv[2] || 'http://localhost:4173/';
const OUT = process.argv[3] || 'capturas/prueba';
mkdirSync(OUT, { recursive: true });
const b = await chromium.launch();
const errores = [];
const ok = (c, m) => { console.log((c ? 'OK   ' : 'FALLO') + ' ' + m); if (!c) errores.push(m); };

async function nueva(w, h, movil = false) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: movil, hasTouch: movil });
  const p = await ctx.newPage();
  p.on('pageerror', (e) => errores.push('JS: ' + e.message));
  p.on('console', (m) => { if (m.type() === 'error') errores.push('consola: ' + m.text()); });
  // No enviamos de verdad en la prueba local.
  await p.route('https://api.web3forms.com/**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true,"message":"ok"}' }));
  return p;
}

// Escritorio
let p = await nueva(1440, 900);
await p.goto(BASE, { waitUntil: 'networkidle' });
ok(await p.locator('#puertas .door').count() === 2, 'escritorio: dos puertas sin elegir');
ok((await p.locator('.pill').innerText()).includes('visitante'), 'escritorio: píldora «visitante»');
await p.locator('.door').nth(1).click();
await p.waitForTimeout(2000);
ok(p.url().includes('para=empresas'), 'escritorio: la URL pasa a ?para=empresas');
ok(await p.locator('#perfil').count() === 1, 'escritorio: aparece el perfil de empresa');
ok((await p.locator('.hdr-cta').innerText()) === 'Hablemos de un puesto', 'escritorio: CTA de cabecera en modo empresa');
await p.screenshot({ path: `${OUT}/esc-empresa-respuesta.png` });
await p.locator('#perfil').scrollIntoViewIfNeeded();
await p.waitForTimeout(2500);
ok((await p.locator('#perfil .proof').first().innerText()).includes('90'), 'escritorio: la cifra 90 llega a su valor');
ok(await p.locator('a[href="/cv/CV-Alberto-Cabello-ES.pdf"][download]').count() === 1, 'escritorio: botón Descargar CV');
await p.screenshot({ path: `${OUT}/esc-perfil.png` });
// Cambio con la píldora (rack)
await p.evaluate(() => window.scrollTo(0, 0));
await p.locator('.pill').click();
await p.waitForTimeout(2000);
ok(p.url().includes('para=clientes'), 'escritorio: la píldora cambia a clientes');
ok(await p.locator('#perfil').count() === 0, 'escritorio: el perfil desaparece en cliente');
// Contacto con mira y foco en Nombre
await p.locator('.hdr-cta').click();
await p.waitForTimeout(1800);
ok(await p.evaluate(() => document.activeElement?.id) === 'f-nombre', 'escritorio: «Cuéntame tu idea» deja el foco en Nombre');
await p.locator('.f-enviar').click();
ok(await p.locator('[role=alert]').count() === 1, 'escritorio: error de validación sin nombre ni email');
await p.locator('#f-nombre').fill('Prueba');
await p.locator('input[name=email]').fill('prueba@example.com');
await p.locator('.chip').first().click();
await p.locator('.f-enviar').click();
await p.waitForTimeout(400);
ok((await p.locator('.enviado').innerText()).includes('Recibido. Ya está un poco más enfocada.'), 'escritorio: estado recibido');
await p.screenshot({ path: `${OUT}/esc-enviado.png` });
// Cambio de versión al estrechar sin perder el recorrido
await p.setViewportSize({ width: 390, height: 844 });
await p.waitForTimeout(300);
ok(await p.locator('.movil-raiz').count() === 1, 'cambio a móvil al estrechar');
ok((await p.locator('.pill-m').innerText()).includes('cliente'), 'móvil tras cambio: sigue en cliente');
await p.context().close();

// Página completa escritorio sin elegir y empresa (para revisión)
for (const [q, n] of [['', 'visitante'], ['?para=empresas', 'empresa']]) {
  p = await nueva(1440, 900);
  await p.goto(BASE + q, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${OUT}/esc-completa-${n}.png`, fullPage: true });
  await p.context().close();
}

// Móvil
p = await nueva(390, 844, true);
await p.goto(BASE + '?para=empresas#contacto', { waitUntil: 'networkidle' });
await p.waitForTimeout(500);
ok(await p.evaluate(() => document.activeElement?.id) === 'f-nombre', 'móvil: llegar con #contacto pone el foco en Nombre');
ok(await p.locator('input[name=puesto]').count() === 1, 'móvil empresa: campo Puesto');
ok(await p.locator('a[href="/cv/CV-Alberto-Cabello-EN.pdf"][lang=en]').count() === 1, 'móvil empresa: botón English version');
await p.locator('button[aria-label="Menú"]').click();
await p.waitForTimeout(200);
ok(await p.evaluate(() => document.activeElement?.textContent?.startsWith('Proyectos')) === true, 'móvil: el menú pone el foco en el primer enlace');
await p.keyboard.press('Escape');
await p.waitForTimeout(200);
ok(await p.evaluate(() => document.activeElement?.getAttribute('aria-label')) === 'Menú', 'móvil: Escape cierra y devuelve el foco');
await p.evaluate(() => window.scrollTo(0, 0));
await p.waitForTimeout(800);
await p.screenshot({ path: `${OUT}/mov-completa-empresa.png`, fullPage: true });
const ancho = await p.evaluate(() => document.documentElement.scrollWidth);
ok(ancho <= 390, 'móvil: sin desbordamiento horizontal (' + ancho + ')');
await p.context().close();

p = await nueva(390, 844, true);
await p.goto(BASE, { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
await p.screenshot({ path: `${OUT}/mov-completa-visitante.png`, fullPage: true });
await p.locator('.door-m').first().click();
await p.waitForTimeout(900);
ok(p.url().includes('para=clientes'), 'móvil: puerta 1 pasa a ?para=clientes');
await p.context().close();

await b.close();
console.log(errores.length ? `\n${errores.length} problema(s):\n` + errores.join('\n') : '\nTodo correcto.');
process.exit(errores.length ? 1 : 0);
