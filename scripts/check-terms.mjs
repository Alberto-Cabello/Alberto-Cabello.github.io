#!/usr/bin/env node
// Busca términos prohibidos en lo que se publica.
// Uso:
//   node scripts/check-terms.mjs          → todo lo versionado o pendiente de versionar (gancho pre-commit)
//   node scripts/check-terms.mjs src      → src/, public/ (menos public/cv/) y los index.html (prebuild)
//   node scripts/check-terms.mjs dist     → dist/ (menos dist/cv/) (postbuild)
// La lista vive en _referencia/terminos-prohibidos.txt, que no se sube. Sin lista, falla salvo con CI=true.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep, extname } from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const LISTA = join(ROOT, '_referencia', 'terminos-prohibidos.txt');
const BINARIOS = new Set(['.pdf', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.ico', '.woff', '.woff2', '.ttf', '.otf', '.eot', '.zip', '.mp4', '.webm']);
const IGNORADOS = ['node_modules', '.git', '_referencia'];

if (!existsSync(LISTA)) {
  if (process.env.CI === 'true') {
    console.log('check-terms: sin lista de términos en CI; se omite (se revisa en local con el gancho pre-commit).');
    process.exit(0);
  }
  console.error(`check-terms: no encuentro ${relative(ROOT, LISTA)}. Sin la lista no se puede comprobar nada.`);
  process.exit(1);
}

const terminos = readFileSync(LISTA, 'utf8')
  .split(/\r?\n/)
  .map((t) => t.trim())
  .filter((t) => t && !t.startsWith('#'));

const escapar = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Palabra completa: ni letra, ni número, ni guion bajo a los lados (así una sigla no salta dentro de «sentTitle» o «accentText»).
const patrones = terminos.map((t) => ({
  t,
  re: new RegExp(`(?<![\\p{L}\\p{N}_])${t.split(/\s+/).map(escapar).join('\\s+')}(?![\\p{L}\\p{N}_])`, 'iu'),
}));

const norm = (p) => p.split(sep).join('/');

function recorrer(dir, excluir = []) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const nombre of readdirSync(dir)) {
    const ruta = join(dir, nombre);
    const rel = norm(relative(ROOT, ruta));
    if (IGNORADOS.includes(nombre) || excluir.some((e) => rel === e || rel.startsWith(e + '/'))) continue;
    if (statSync(ruta).isDirectory()) out.push(...recorrer(ruta, excluir));
    else out.push(ruta);
  }
  return out;
}

function indexHtml() {
  const out = [];
  for (const f of ['index.html', '404.html']) if (existsSync(join(ROOT, f))) out.push(join(ROOT, f));
  for (const f of recorrer(join(ROOT, 'casos'))) if (f.endsWith('.html')) out.push(f);
  return out;
}

function versionados() {
  const txt = execSync('git ls-files -z --cached --others --exclude-standard', { cwd: ROOT, encoding: 'utf8' });
  return txt
    .split('\0')
    .filter(Boolean)
    .filter((f) => !f.startsWith('public/cv/') && !f.startsWith('_referencia/'))
    .map((f) => join(ROOT, f))
    .filter((f) => existsSync(f));
}

const modo = process.argv[2] || 'repo';
let archivos;
if (modo === 'src') archivos = [...recorrer(join(ROOT, 'src')), ...recorrer(join(ROOT, 'public'), ['public/cv']), ...indexHtml()];
else if (modo === 'dist') archivos = recorrer(join(ROOT, 'dist'), ['dist/cv']);
else archivos = versionados();

const fallos = [];
for (const f of archivos) {
  const rel = norm(relative(ROOT, f));
  // Comprueba también el nombre del archivo.
  for (const { t, re } of patrones) if (re.test(rel)) fallos.push(`${rel}: el nombre contiene «${t}»`);
  if (BINARIOS.has(extname(f).toLowerCase())) continue;
  const lineas = readFileSync(f, 'utf8').split(/\r?\n/);
  lineas.forEach((linea, i) => {
    for (const { t, re } of patrones) if (re.test(linea)) fallos.push(`${rel}:${i + 1}: «${t}»`);
  });
}

if (fallos.length) {
  console.error(`check-terms: ${fallos.length} término(s) prohibido(s):`);
  for (const l of fallos) console.error('  ' + l);
  process.exit(1);
}
console.log(`check-terms (${modo}): ${archivos.length} archivos revisados, ningún término prohibido.`);
