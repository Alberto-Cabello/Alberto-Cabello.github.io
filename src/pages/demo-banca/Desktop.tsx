// @ts-nocheck
// Generado desde el tablero DemoBanca y revisado a mano: lógica, textos y estilos tal cual.
import { Fragment } from 'preact';
import { DCLogic, conTema } from '../../lib/dclogic';
import { HoloDiferido } from '../../components/HoloDiferido';
import './Desktop.css';

class Logica extends DCLogic {

  fresh() { return { testP: 0, testRan: false, testDone: false, scr: 'inv', lot: 412, org: 'SFTP', dst: 'Lago de datos', freq: 'diaria', genP: 0, genRan: false, genDone: false, fixes: {}, ftab: 0, published: false, showToast: false, chatM: true, msgs: [], draft: '', sel: { 1: true, 2: true }, focus: null, seenRev: false, seenChat: false, seenRadar: false }; }
  componentWillUnmount() { clearInterval(this.testT); clearInterval(this.genT); clearTimeout(this.toastT); clearTimeout(this.typT); clearInterval(this.revT); }
  st() { return Object.assign(this.fresh(), this.state || {}); }
  go(scr) {
    const u = { scr };
    if (scr === 'rev') { u.seenRev = true; }
    if (scr === 'chat') { u.seenChat = true; }
    if (scr === 'radar') { u.seenRadar = true; }
    this.setState(u);
    const s = this.st();
    if (scr === 'gen' && !s.genRan) { setTimeout(() => this.startGen(), 350); }
    if (scr === 'test' && s.genDone && !s.testRan) { setTimeout(() => this.runTests(), 350); }
  }
  startGen() {
    clearInterval(this.genT);
    const s = this.st();
    const dur = 1200 + (s.lot / 412) * 2600;
    const t0 = Date.now();
    clearInterval(this.testT);
    this.setState({ genP: 0, genRan: true, genDone: false, genDur: dur, fixes: {}, published: false, testP: 0, testRan: false, testDone: false, testEl: 0 });
    this.genT = setInterval(() => {
      const p = Math.min(1, (Date.now() - t0) / dur);
      const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      this.setState({ genP: e, genEl: Math.min(dur, Date.now() - t0), genDone: p >= 1 });
      if (p >= 1) { clearInterval(this.genT); }
    }, 50);
  }
  runTests() {
    const s0 = this.st();
    if (!s0.genDone) { return; }
    clearInterval(this.testT);
    const dur = 3200;
    const t0 = Date.now();
    this.setState({ testP: 0, testRan: true, testDone: false, fixes: {}, published: false });
    this.testT = setInterval(() => {
      const p = Math.min(1, (Date.now() - t0) / dur);
      this.setState({ testP: p, testEl: Math.min(dur, Date.now() - t0), testDone: p >= 1 });
      if (p >= 1) { clearInterval(this.testT); }
    }, 50);
  }
  toast(text) {
    clearTimeout(this.toastT);
    this.setState({ showToast: true, toastText: text, toastK: ((this.state && this.state.toastK) || 0) + 1 });
    this.toastT = setTimeout(() => this.setState({ showToast: false }), 4100);
  }
  answers(s) {
    const orgSlug = { 'SFTP': 'sftp', 'Base de datos': 'base_de_datos', 'API': 'api' }[s.org];
    return [
      { q: '¿Cómo doy de alta un origen nuevo?', re: /origen|alta|nuev/,
        loose: [{ t: 'Los orígenes se configuran desde el apartado de objetos de datos.' }, { t: 'Consulte la sección 3 de la guía de usuario para más información.' }],
        method: [{ n: '1', t: 'Crea el objeto de origen de tipo ' + s.org + ' con su ruta y el patrón del fichero.' }, { n: '2', t: 'Asócialo al esquema que ya generaste para esa tabla.' }, { n: '3', t: 'Prueba la conexión con un fichero de muestra antes de programar nada.' }, { code: true, t: '"tipo": "' + orgSlug + '", "patron": "cuentas_*.csv"' }, { src: true, t: 'Fuentes: guía de usuario §3.1 y §3.4 (ficticias)' }, { ask: true, t: '¿El origen necesita credenciales nuevas o usa las del equipo?' }] },
      { q: 'La carga de anoche falló: ¿por dónde empiezo?', re: /fall|error|incid|carga|rot/,
        loose: [{ t: 'Los errores de carga pueden deberse a múltiples causas.' }, { t: 'Revise el registro de ejecuciones y la documentación de errores.' }],
        method: [{ n: '1', t: 'Abre el registro de la ejecución de anoche y busca el primer error, no el último.' }, { n: '2', t: 'Si es de formato, compara la cabecera del fichero con el esquema.' }, { n: '3', t: 'Si es de conexión, comprueba la ruta y los permisos del origen.' }, { n: '4', t: 'Corrige y relanza solo esa transferencia.' }, { src: true, t: 'Fuentes: guía de errores §2 (ficticia)' }, { ask: true, t: '¿Qué código de error aparece en el registro?' }] },
      { q: '¿Cómo cambio la frecuencia de una transferencia?', re: /frecu|horari|program|mensual|diari|semanal/,
        loose: [{ t: 'La frecuencia se define en la configuración de la transferencia.' }, { t: 'Consulte la sección 5 de la guía de usuario.' }],
        method: [{ n: '1', t: 'Edita la transferencia, no el objeto: la frecuencia vive ahí.' }, { n: '2', t: 'Comprueba que el origen entrega datos con esa frecuencia.' }, { n: '3', t: 'Si cambias de diaria a mensual, decide qué pasa con los ficheros intermedios.' }, { code: true, t: '"frecuencia": "' + s.freq + '", "hora": "06:00"' }, { src: true, t: 'Fuentes: guía de usuario §5.2 (ficticia)' }, { ask: true, t: '¿Quieres que prepare el cambio para todas las ingestas del lote a la vez?' }] }
    ];
  }
  ask(text) {
    const q = (text || '').trim();
    if (!q) { return; }
    const s = this.st();
    const A = this.answers(s);
    const low = q.toLowerCase();
    const hit = A.find((a) => a.re.test(low));
    const lines = hit ? (s.chatM ? hit.method : hit.loose) : (s.chatM ? [{ t: 'En esta demo, la documentación (ficticia) cubre altas de origen, cargas que fallan y cambios de frecuencia.' }, { muted: true, t: 'Prueba con una de las preguntas sugeridas.' }] : [{ t: 'No he encontrado nada exacto en la documentación.' }]);
    const ctx = s.org + ' · CSV · ' + s.dst.toLowerCase() + ' · ' + s.freq;
    const msgs = s.msgs.concat([{ who: 'yo', text: q, ctx: s.chatM ? ctx : '' }, { who: 'ia', lines, shown: 0, typing: true }]);
    this.setState({ msgs: msgs.slice(-8), draft: '', busy: true });
    this.scrollLog();
    clearTimeout(this.typT);
    const reveal = () => {
      const cur = this.st();
      const ms = cur.msgs.slice();
      const last = Object.assign({}, ms[ms.length - 1]);
      if (!last || last.who !== 'ia') { this.setState({ busy: false }); return; }
      last.typing = false;
      last.shown = (last.shown || 0) + 1;
      ms[ms.length - 1] = last;
      const more = last.shown < last.lines.length;
      this.setState({ msgs: ms, busy: more });
      this.scrollLog();
      if (more) { this.typT = setTimeout(reveal, 260); }
    };
    this.typT = setTimeout(reveal, 850);
  }
  scrollLog() { setTimeout(() => { try { const el = document.querySelector('[data-chatlog]'); if (el) { el.scrollTop = el.scrollHeight; } } catch (e) {} }, 40); }
  renderVals() {
    const s = this.st();
    const dark = s.dark !== undefined ? s.dark : (this.props.dark ?? true);
    const night = { bg: '#0B0B0C', fg: '#F2F0EB', muted: '#A09D96', line: '#29292B', panel: '#141415', inner: '#222224', grid: 'rgba(255,255,255,0.04)', accent: '#FF5B2E', accentText: '#FF7A55', accentSoft: 'rgba(255,91,46,0.13)', onAccent: '#0B0B0C', good: '#5FCB8E', warn: '#FFC24B', shadow: 'rgba(0,0,0,0.85)', sweep: 'rgba(255,91,46,0.30)', bubble: '#26262A' };
    const light = { bg: '#F3F1EC', fg: '#111111', muted: '#55524C', line: '#DAD6CC', panel: '#FFFFFF', inner: '#ECE9E2', grid: 'rgba(0,0,0,0.05)', accent: '#B8350F', accentText: '#B8350F', accentSoft: 'rgba(184,53,15,0.09)', onAccent: '#FFFFFF', good: '#1F7A4D', warn: '#8A5600', shadow: 'rgba(60,40,20,0.35)', sweep: 'rgba(184,53,15,0.22)', bubble: '#ECE9E2' };
    const t = dark ? night : light;
    const ln = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const fmtH = (h) => (h >= 10 ? ln(h) : h.toFixed(1).replace('.', ','));
    const scr = s.scr;
    const lot = s.lot;
    const pickOpt = (key, vals, cur) => vals.map((v) => ({ l: typeof v === 'number' ? ln(v) : v, pressed: v === cur ? 'true' : 'false', bg: v === cur ? t.fg : 'transparent', fg: v === cur ? t.bg : t.fg, border: v === cur ? t.fg : t.line, pick: () => { clearInterval(this.genT); clearInterval(this.testT); this.setState({ [key]: v, genRan: false, genDone: false, genP: 0, fixes: {}, published: false, testP: 0, testRan: false, testDone: false }); } }));
    const pickers = [
      { l: 'Lote a dar de alta', opts: pickOpt('lot', [24, 120, 412], lot) },
      { l: 'Origen de los datos', opts: pickOpt('org', ['SFTP', 'Base de datos', 'API'], s.org) },
      { l: 'Destino', opts: pickOpt('dst', ['Lago de datos', 'Almacén en la nube'], s.dst) },
      { l: 'Frecuencia', opts: pickOpt('freq', ['diaria', 'semanal', 'mensual'], s.freq) }
    ];
    const tables = ['cuentas', 'movimientos', 'tarjetas', 'saldos', 'oficinas'];
    const invRows = tables.map((x) => ({ a: x, b: s.org, c: s.dst.toLowerCase(), d: s.freq }));
    const manual = (lot * 20) / 60;
    const files = lot * 4;
    const genP = s.genP;
    const built = Math.round(lot * genP);
    const KINDS = [['esq', 'esquema', 'esq_'], ['obj', 'origen', 'obj_origen_'], ['obj', 'destino', 'obj_destino_'], ['trf', 'transf.', 'trf_']];
    const stream = [];
    const writtenFiles = Math.round(files * genP);
    for (let j = 0; j < 6; j++) {
      const idx = writtenFiles - 1 - j;
      if (idx < 0) { break; }
      const row = Math.floor(idx / 4), kind = KINDS[idx % 4];
      const name = kind[2] + tables[row % 5] + '_' + String(row + 1).padStart(4, '0') + '.json';
      stream.push({ k: kind[1], n: name, o: (1 - j * 0.14).toFixed(2), bg: j === 0 ? t.accent : t.inner, fg: j === 0 ? t.onAccent : t.fg });
    }
    const genSecs = ((s.genEl || 0) / 1000).toFixed(1).replace('.', ',');
    const nn = (f) => String(Math.max(1, Math.ceil(lot * f))).padStart(4, '0');
    const W = [
      { id: 'w1', where: 'esq_tarjetas_hist_' + nn(0.29) + '.json', what: 'El inventario no trae el tipo de la columna fecha_alta.', acts: [['Corregir', 'Corregido: tipo fecha, confirmado con el equipo y anotado en el inventario.']] },
      { id: 'w2', where: 'trf_movimientos_internacionales_detalle_diario_' + nn(0.56) + '.json', what: 'El nombre pasa de 40 caracteres.', acts: [['Corregir', 'Corregido: trf_mov_intl_det_diario_' + nn(0.56) + ', según la convención del equipo.']] },
      { id: 'w3', where: 'trf_saldos_' + nn(0.75) + '.json', what: s.freq === 'mensual' ? 'El fichero de saldos llega a diario, pero el lote está como mensual.' : 'El fichero de saldos llega a fin de mes, pero el lote está como ' + s.freq + '.', human: true, acts: [['Mantener ' + s.freq, 'Decidido por ti: se mantiene ' + s.freq + '.'], ['Cambiar a ' + (s.freq === 'mensual' ? 'diaria' : 'mensual'), 'Decidido por ti: pasa a ' + (s.freq === 'mensual' ? 'diaria' : 'mensual') + '.']] }
    ];
    const fixes = s.fixes || {};
    const pending = W.filter((w) => !fixes[w.id]).length;
    const warns = !s.testDone ? [] : W.map((w, wi) => {
      const done = fixes[w.id];
      return {
        where: w.where, what: w.what, human: !!w.human, open: !done, closed: !!done, res: done || '',
        mark: done ? '✓' : '!', dot: done ? t.good : t.warn, dotFg: '#111111', border: done ? t.line : t.warn,
        acts: w.acts.map((a, ai) => ({ l: a[0], bg: ai === 0 ? t.fg : 'transparent', fg: ai === 0 ? t.bg : t.fg, border: ai === 0 ? t.fg : t.line, go: () => { const nf = Object.assign({}, fixes, { [w.id]: a[1] }); this.setState({ fixes: nf }); } }))
      };
    });
    const allResolved = !!s.testDone && pending === 0;
    const orgObj = { 'SFTP': { tipo: 'sftp', ruta: '/entrada/cuentas/', patron: 'cuentas_*.csv', separador: ';' }, 'Base de datos': { tipo: 'base_de_datos', tabla: 'CUENTAS', esquema_origen: 'OPERACIONES' }, 'API': { tipo: 'api', url: 'https://api.ejemplo.test/cuentas', paginado: true } }[s.org];
    const FJ = [
      ['Esquema', 'esq_cuentas_0001.json', { nombre: 'esq_cuentas_0001', campos: [{ nombre: 'id_cuenta', tipo: 'texto', vacio: false }, { nombre: 'fecha_alta', tipo: 'fecha', vacio: false }, { nombre: 'saldo', tipo: 'decimal', vacio: true }, { nombre: 'oficina', tipo: 'texto', vacio: true }] }],
      ['Objeto', 'obj_origen_cuentas_0001.json', Object.assign({ nombre: 'obj_origen_cuentas_0001' }, orgObj, { esquema: 'esq_cuentas_0001' })],
      ['Transferencia', 'trf_cuentas_0001.json', { nombre: 'trf_cuentas_0001', origen: 'obj_origen_cuentas_0001', destino: 'obj_destino_cuentas_0001', destino_tipo: s.dst.toLowerCase(), frecuencia: s.freq, hora: '06:00', validar_filas: true }]
    ];
    const ft = s.ftab || 0;
    const fileTabs = FJ.map((f, i) => ({ l: f[0], pressed: i === ft ? 'true' : 'false', bg: i === ft ? t.fg : t.inner, fg: i === ft ? t.bg : t.fg, go: () => this.setState({ ftab: i }) }));
    const mkLine = (l) => {
      const base = { t: l.t, n: l.n || '', hasN: !!l.n, pad: '3px 2px', bg: 'transparent', col: t.fg, ff: 'Inter, sans-serif', fs: 14, fw: 500 };
      if (l.code) { return Object.assign(base, { ff: "'IBM Plex Mono', ui-monospace, monospace", fs: 12, bg: t.inner, pad: '8px 10px' }); }
      if (l.src) { return Object.assign(base, { ff: "'IBM Plex Mono', ui-monospace, monospace", fs: 11, col: t.muted }); }
      if (l.ask) { return Object.assign(base, { bg: t.accentSoft, col: t.accentText, fw: 700, pad: '8px 10px' }); }
      if (l.muted) { return Object.assign(base, { col: t.muted, fs: 13 }); }
      return base;
    };
    const msgs = s.msgs.map((m) => (m.who === 'yo'
      ? { align: 'flex-end', radius: '14px 14px 4px 14px', bg: t.accent, fg: t.onAccent, border: t.accent, hasCtx: !!m.ctx, ctx: m.ctx, typing: false, lines: [{ t: m.text, n: '', hasN: false, pad: '0', bg: 'transparent', col: t.onAccent, ff: 'Inter, sans-serif', fs: 14, fw: 600 }] }
      : { align: 'flex-start', radius: '14px 14px 14px 4px', bg: t.bubble, fg: t.fg, border: t.line, hasCtx: false, ctx: '', typing: !!m.typing, lines: m.lines.slice(0, m.shown || 0).map(mkLine) }));
    const A = this.answers(s);
    const TK = [
      { t: 'Dar de alta lo mismo, una y otra vez', sc: 0.92, sol: 'Un generador desde un inventario', why: 'Se repite, tiene reglas claras y un error de copia sale caro: lo exacto, para el código.' },
      { t: 'Copiar datos entre hojas y sistemas', sc: 0.88, sol: 'Una automatización entre tus herramientas', why: 'Mismo origen, mismo destino, mismas columnas: no necesita a una persona.' },
      { t: 'Responder las mismas dudas del equipo', sc: 0.78, sol: 'Un asistente con tu documentación', why: 'La respuesta ya existe en algún sitio: el asistente la encuentra y la explica paso a paso.' },
      { t: 'Preparar el mismo informe cada semana', sc: 0.84, sol: 'Informes que se hacen solos', why: 'Los datos y el formato son siempre los mismos; solo cambia la fecha.' },
      { t: 'Revisar documentos buscando lo mismo', sc: 0.68, sol: 'Un agente que revisa; tú apruebas', why: 'La IA marca lo que encaja o no encaja; la decisión sigue siendo tuya.' },
      { t: 'Clasificar correos o incidencias', sc: 0.72, sol: 'Un agente que clasifica y deriva', why: 'Muchas entradas, pocas categorías: el agente propone y la persona corrige.' },
      { t: 'Formar a cada persona nueva desde cero', sc: 0.6, sol: 'Una app de formación a medida', why: 'El mismo contenido para cada persona, con su ritmo y su progreso.' },
      { t: 'Aprobar precios, pagos o excepciones', sc: 0.22, sol: 'Se queda en la persona', why: 'Lo que cuesta caro si sale mal lo decide alguien. La IA puede preparar los datos.' }
    ];
    const sel = s.sel || {};
    const tasks = TK.map((k, i) => { const on = !!sel[i]; return { t: k.t, pressed: on ? 'true' : 'false', mark: on ? '✓' : '', fill: on ? t.accent : 'transparent', box: on ? t.accent : t.muted, bg: on ? t.accentSoft : 'transparent', border: on ? t.accent : t.line, toggle: () => this.setState({ sel: Object.assign({}, sel, { [i]: !on }), focus: on ? null : i }) }; });
    const chosen = TK.map((k, i) => Object.assign({ i }, k)).filter((k) => sel[k.i]);
    const ranked = chosen.slice().sort((p, q) => q.sc - p.sc);
    const focusI = s.focus !== null && s.focus !== undefined && sel[s.focus] ? s.focus : ranked.length ? ranked[0].i : null;
    const rblips = chosen.map((k) => {
      const ang = (k.i * 45 + 20) * Math.PI / 180;
      const r = Math.min(0.92, 0.15 + (1 - k.sc) * 1.5);
      const on = k.i === focusI;
      return { n: String(k.i + 1), x: (50 + Math.sin(ang) * r * 48).toFixed(1), y: (50 - Math.cos(ang) * r * 48).toFixed(1), s: on ? 20 : 16, c: k.sc >= 0.5 ? t.accent : t.muted, pressed: on ? 'true' : 'false', aria: k.t, pick: () => this.setState({ focus: k.i }) };
    });
    const F = focusI !== null ? TK[focusI] : null;
    const isTop = F && ranked.length && ranked[0].i === focusI;
    const TS = [
      ['Esquema = inventario', 'Columnas, tipos y vacíos coinciden con el inventario.', 1],
      ['Convención de nombres', 'Prefijos del equipo y 40 caracteres como máximo.', 1],
      ['Origen y destino enlazados', 'Cada transferencia apunta a objetos que existen.', 0],
      ['Frecuencia coherente', 'Lo programado cuadra con lo que entrega el origen.', 1],
      ['Carga de muestra', 'Un fichero de prueba por tabla: filas leídas = filas escritas.', 0]
    ];
    const tP = s.testP || 0;
    const testTotal = lot * TS.length;
    let failFound = 0;
    const tests = TS.map((x, i) => {
      const a = i / TS.length, b = (i + 1) / TS.length;
      const done = s.testRan && tP >= b;
      const run = s.testRan && tP >= a && tP < b;
      if (done) { failFound += x[2]; }
      const bad = done && x[2] > 0;
      return { t: x[0], s: x[1], mark: done ? (bad ? '!' : '✓') : run ? '…' : String(i + 1), dot: done ? (bad ? t.warn : t.good) : run ? t.accent : t.inner, dotFg: done || run ? '#111111' : t.fg, border: bad ? t.warn : run ? t.accent : t.line, st: done ? (bad ? x[2] + ' fallo' : ln(lot) + ' ok') : run ? 'probando…' : 'pendiente', stC: bad ? t.warn : done ? t.good : t.muted };
    });
    const testPass = Math.max(0, Math.round(testTotal * tP) - failFound);
    const holo = {
      inv: { shape: 'cloud', name: 'nube de datos', big: ln(lot), sub: 'tablas sueltas, sin estructura' },
      gen: { shape: 'build', name: s.genDone ? 'estructura lista' : 'construyendo', big: ln(built), sub: 'de ' + ln(lot) + ' ingestas encajadas' },
      test: { shape: 'grid', name: s.testDone ? 'probado' : 'probando', big: ln(testPass), sub: 'pruebas superadas de ' + ln(testTotal) },
      rev: { shape: 'grid', name: 'estructura', big: String(s.testDone ? pending : 0), sub: !s.testDone ? 'sin pruebas todavía' : pending ? 'fallos por revisar' : 'todo revisado' },
      chat: { shape: 'sphere', name: 'documentación', big: '128', sub: s.busy ? 'consultando…' : 'páginas indexadas (ficticias)' },
      radar: { shape: 'radar', name: 'radar', big: String(chosen.length), sub: chosen.length === 1 ? 'tarea en el radar' : 'tareas en el radar' }
    }[scr];
    const visited = { inv: true, gen: s.genDone, test: !!s.testDone, rev: allResolved || s.published, chat: s.msgs.length > 0, radar: !!s.seenRadar };
    const TD = [
      ['inv', 'Inventario', 'Elige el lote y mira cuánto costaría a mano'],
      ['gen', 'Generar', 'Cientos de configuraciones en segundos'],
      ['test', 'Plan de pruebas', 'Cada configuración se prueba antes de revisarla', 'Pruebas'],
      ['rev', 'Revisar', 'Solo lo que falla; lo importante, lo decides tú'],
      ['chat', 'Asistente', 'La misma pregunta, suelta o con método'],
      ['radar', 'Tu radar', 'Pasa por el radar lo que tu equipo hace a mano']
    ];
    const tour = TD.map((d, i) => {
      const on = scr === d[0];
      const ok = d[0] !== 'inv' && visited[d[0]];
      return { title: d[1], sub: d[2], mark: ok ? '✓' : String(i + 1), cur: on ? 'step' : 'false', bg: on ? t.accentSoft : 'transparent', border: on ? t.accent : t.line, numBg: on || ok ? t.accent : t.inner, numFg: on || ok ? t.onAccent : t.fg, arrow: on ? t.accentText : t.muted, go: () => this.go(d[0]) };
    });
    const tabs = TD.map((d) => { const on = scr === d[0]; return { l: d[3] || d[1], cur: on ? 'page' : 'false', bg: on ? t.fg : 'transparent', fg: on ? t.bg : t.muted, go: () => this.go(d[0]) }; });
    const explain = {
      inv: 'El punto de partida: un inventario de tablas que hay que dar de alta. Cambia el lote, el origen o la frecuencia y mira cuánto costaría a mano.',
      test: 'El plan de pruebas sale del inventario y de las reglas del equipo. ' + ln(testTotal) + ' comprobaciones en segundos: solo lo que falla llega a una persona.',
      gen: 'El generador escribe un esquema, dos objetos y una transferencia por cada tabla, siempre con las mismas plantillas. El holograma encaja cada pieza.',
      rev: 'Solo llega lo que falló en las pruebas. Lo automático se corrige con un clic. Lo que tiene consecuencias de negocio lo decide una persona, y nadie publica sin revisar.',
      chat: 'La misma pregunta, suelta o con método: con contexto, el asistente responde con pasos, ejemplo, fuentes y lo que le falta saber.',
      radar: 'Marca lo que tu equipo hace a mano. Cuanto más cerca del centro, mejor candidata a automatizar, y te digo con qué.'
    }[scr];
    const chatM = !!s.chatM;
    return {
      t, dark, darkStr: dark ? 'true' : 'false', holoPulseStr: scr === 'chat' && !!s.busy ? 'true' : 'false', no: false, yes: true, holoSize: 280,
      modeLabel: dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro',
      toggle: () => this.setState({ dark: !dark }),
      reset: () => { clearInterval(this.testT); clearInterval(this.genT); clearTimeout(this.typT); this.setState(this.fresh()); },
      tour, tabs, explain,
      isInv: scr === 'inv', isGen: scr === 'gen', isTest: scr === 'test', isRev: scr === 'rev', isChat: scr === 'chat', isRadar: scr === 'radar',
      pickers, invRows, lotStr: ln(lot), lotRest: ln(lot - 5), manH: fmtH(manual), autoH: fmtH(manual * 0.1),
      goGen: () => { this.setState({ scr: 'gen' }); this.startGen(); },
      genTitle: s.genDone ? 'Listo' : s.genRan ? 'Generando ' + ln(lot) + ' ingestas…' : 'Preparado para generar',
      genPct: Math.round(genP * 100), genSecs,
      genCount: [[built, 'esquemas'], [built * 2, 'objetos'], [built, 'transferencias'], [built * 4, 'ficheros']].map((g, i) => ({ v: ln(g[0]), l: g[1], c: i === 3 ? t.accentText : t.fg, border: i === 3 ? t.accent : t.line })),
      stream, genIdle: !s.genRan, genDone: !!s.genDone,
      genDoneText: ln(files) + ' ficheros en ' + genSecs + ' s · 0 errores de copia. A mano, ≈ ' + fmtH(manual) + ' h.',
      startGen: () => this.startGen(),
      goRev: () => this.go('rev'),
      goTest: () => this.go('test'),
      runTests: () => this.runTests(),
      testTitle: !s.genRan ? 'Primero, genera el lote' : s.testDone ? 'Plan superado, con 3 fallos' : s.testRan ? 'Probando…' : 'Antes de revisar, se prueba todo',
      tests, testTotalStr: ln(testTotal), testPassStr: ln(testPass), testPct: Math.round(tP * 100), testSecs: ((s.testEl || 0) / 1000).toFixed(1).replace('.', ','),
      testIdle: !!s.genDone && !s.testRan, testDone: !!s.testDone,
      testDoneText: ln(testTotal - 3) + ' de ' + ln(testTotal) + ' pruebas superadas en ' + ((s.testEl || 0) / 1000).toFixed(1).replace('.', ',') + ' s. Los 3 fallos pasan a revisión.',
      needTest: !!s.genRan && !s.testDone,
      revTitle: !s.genRan ? 'Primero, genera el lote' : !s.testDone ? 'Primero, el plan de pruebas' : allResolved ? 'Revisado' : pending + ' fallos de ' + ln(testTotal) + ' pruebas',
      revStats: [[ln(s.genRan ? files : 0), 'ficheros', t.fg, t.line], [ln(s.testDone ? files - pending : 0), 'correctos', t.good, t.line], [String(s.testDone ? pending : 0), 'fallos', s.testDone && pending ? t.warn : t.good, s.testDone && pending ? t.warn : t.line]].map((x) => ({ v: x[0], l: x[1], c: x[2], border: x[3] })),
      warns, fileTabs, fileName: FJ[ft][1], fileJson: JSON.stringify(FJ[ft][2], null, 2),
      allResolved, pubText: s.published ? 'Publicado en el entorno de pruebas. Lo aprobó una persona.' : 'Todo revisado. El generador no publica: lo apruebas tú.',
      pubBtn: s.published ? 'Publicado ✓' : 'Aprobar y publicar', pubBg: s.published ? t.muted : t.accent, pubDis: s.published ? 'true' : 'false',
      publish: () => { if (this.st().published) { return; } this.setState({ published: true }); this.toast(ln(files) + ' configuraciones publicadas (ficticio)'); },
      showToast: !!s.showToast, toastText: s.toastText || '',
      toLoose: () => this.setState({ chatM: false }), toMethod: () => this.setState({ chatM: true }),
      looseStr: chatM ? 'false' : 'true', methodStr: chatM ? 'true' : 'false',
      looseBg: chatM ? 'transparent' : t.fg, looseFg: chatM ? t.fg : t.bg, methodBg: chatM ? t.accent : 'transparent', methodFg: chatM ? t.onAccent : t.fg,
      msgs, noMsgs: s.msgs.length === 0,
      sugg: A.map((a) => ({ t: a.q, ask: () => { if (!this.st().busy) { this.ask(a.q); } } })),
      draft: s.draft || '',
      onDraft: (e) => this.setState({ draft: e.target.value }),
      onKey: (e) => { if (e.key === 'Enter') { e.preventDefault(); if (!this.st().busy) { this.ask(e.target.value); } } },
      sendDraft: () => { if (!this.st().busy) { this.ask(this.st().draft); } },
      tasks, rblips,
      bestK: F ? (isTop ? 'TU MEJOR OPORTUNIDAD' : 'TAREA SELECCIONADA') : 'TU RADAR, VACÍO',
      bestT: F ? F.t + ' → ' + F.sol : 'Marca a la izquierda lo que tu equipo hace a mano.',
      bestS: F ? F.why : 'Aparecerá en el radar y te diré con qué se puede automatizar.',
      bestBorder: F && F.sc >= 0.5 ? t.accent : t.line, hasBest: !!F && F.sc >= 0.5,
      holoShape: holo.shape, holoLevel: scr === 'gen' ? genP : 1, holoAlerts: scr === 'rev' && s.testDone ? pending : scr === 'test' ? failFound : 0, holoPulse: scr === 'chat' && !!s.busy,
      holoName: holo.name, holoBig: holo.big, holoSub: holo.sub
    };
  }

  render() {
    const v = this.renderVals();
    return (
      <>
<div class="demo v-esc" style="min-height: 100vh; box-sizing: border-box; background: var(--bg); color: var(--fg); font-family: Inter, 'Helvetica Neue', Arial, sans-serif; font-size: 16px; line-height: 1.5; display: flex; flex-direction: column; overflow-x: clip">

<header style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; padding: 14px clamp(16px, 3vw, 32px); border-bottom: 1px solid var(--line)">
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 14px">
<strong style="font-weight: 800; letter-spacing: -0.02em">Demo · De a mano a automático</strong>
<span class="tag">Herramienta y datos ficticios</span>
</div>
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 10px">
<button type="button" onClick={v.reset} style="min-height: 44px; padding: 0 16px; border-radius: 999px; border: 1px solid var(--line); background: transparent; color: var(--fg); font: inherit; font-weight: 600; cursor: pointer">Reiniciar</button>
<button onClick={v.toggle} aria-label={v.modeLabel} style="display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 999px; border: 1px solid var(--line); background: transparent; color: var(--fg); cursor: pointer"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"></circle><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"></path></svg></button>
<a href="/casos/automatizacion-y-asistente-ia/" style="display: inline-flex; align-items: center; min-height: 44px; padding: 0 16px; border-radius: 999px; border: 1px solid var(--line); text-decoration: none; font-weight: 600">Cerrar</a>
</div>
</header>

<main style="flex: 1; display: flex; flex-wrap: wrap; gap: 24px 36px; padding: clamp(16px, 2.2vw, 28px) clamp(16px, 3vw, 44px); align-items: center">

<section aria-label="Guía de la demo" style="flex: 1 1 340px; min-width: 0; display: flex; flex-direction: column; gap: 14px">
<p style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 13px; color: var(--accent-text)">Entidad de ejemplo · equipo de datos</p>
<h1 style="margin: 0; font-weight: 800; font-size: clamp(34px, 3.6vw, 56px); line-height: 0.95; letter-spacing: -0.05em">Cientos de configuraciones, <span style="color: var(--accent-text)">en segundos.</span></h1>
<p style="margin: 0; max-width: 500px; color: var(--muted); font-size: 16px">Tócala: todo funciona. El generador es el del prototipo; las pruebas, la revisión y la publicación muestran cómo sería en producción. Herramienta, datos y documentación, inventados.</p>
<nav aria-label="Recorre la demo" style="display: flex; flex-direction: column; gap: 6px">
{(v.tour).map((p: any, p_i: number) => (<Fragment key={p_i}>
<button type="button" class="navb" onClick={p.go} aria-current={p.cur} style={`display: flex; align-items: center; gap: 12px; min-height: 46px; padding: 5px 14px; border-radius: 14px; border: 1px solid ${p.border}; background: ${p.bg}; color: var(--fg); font: inherit; text-align: left; cursor: pointer`}>
<span aria-hidden="true" style={`flex: 0 0 30px; width: 30px; height: 30px; border-radius: 9px; background: ${p.numBg}; color: ${p.numFg}; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 13px`}>{p.mark}</span>
<span style="flex: 1; display: flex; flex-direction: column; min-width: 0"><strong style="font-weight: 700; font-size: 15px">{p.title}</strong><span style="font-size: 13px; color: var(--muted)">{p.sub}</span></span>
<span aria-hidden="true" style={`color: ${p.arrow}`}>→</span>
</button>
</Fragment>))}
</nav>
<div role="status" style="padding: 14px 16px; border-left: 3px solid var(--accent); background: var(--panel); display: flex; flex-direction: column; gap: 2px">
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--accent-text)">LO QUE ESTÁS VIENDO</span>
<span style="font-weight: 600; font-size: 15px">{v.explain}</span>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 10px">
<a href="/?para=clientes#contacto" class="btn" style="display: inline-flex; align-items: center; min-height: 48px; padding: 0 22px; border-radius: 999px; background: var(--accent); color: var(--on-accent); text-decoration: none; font-weight: 600">Quiero algo así</a>
<a href="/casos/automatizacion-y-asistente-ia/" style="display: inline-flex; align-items: center; min-height: 48px; padding: 0 18px; border-radius: 999px; border: 1px solid var(--line); text-decoration: none; font-weight: 600">Volver al caso</a>
</div>
</section>

<section aria-label="Consola de automatización" class="console" style="flex: 1.75 1 640px; min-width: 0; height: clamp(620px, calc(100vh - 120px), 790px); border-radius: 26px; border: 1px solid var(--line); background: var(--panel); overflow: hidden; display: flex; flex-direction: column; position: relative; box-shadow: 0 40px 90px -50px var(--shadow)">
<div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; padding: 10px 14px; border-bottom: 1px solid var(--line)">
<span style="display: flex; align-items: center; gap: 10px"><span aria-hidden="true" style="display: flex; gap: 6px"><span style="width: 10px; height: 10px; border-radius: 99px; background: var(--inner)"></span><span style="width: 10px; height: 10px; border-radius: 99px; background: var(--inner)"></span><span style="width: 10px; height: 10px; border-radius: 99px; background: var(--accent)"></span></span><strong style="font-size: 14px">Consola de automatización</strong></span>
<nav aria-label="Pestañas de la consola" style="display: flex; flex-wrap: wrap; gap: 4px">
{(v.tabs).map((n: any, n_i: number) => (<Fragment key={n_i}>
<button type="button" class="tap" onClick={n.go} aria-current={n.cur} style={`min-height: 44px; padding: 0 12px; border-radius: 10px; border: 0; background: ${n.bg}; color: ${n.fg}; font: inherit; font-size: 13px; font-weight: 700; cursor: pointer`}>{n.l}</button>
</Fragment>))}
</nav>
</div>

<div style="flex: 1; min-height: 0; display: flex; flex-wrap: wrap">
<div class="scrollb" style="flex: 1 1 380px; min-width: 0; height: 100%; overflow-y: auto; padding: 20px 22px; box-sizing: border-box">

{(v.isInv) && (<>
<div class="scr" style="display: flex; flex-direction: column; gap: 16px">
<div><p style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)">PASO 1 · INVENTARIO</p><h2 style="margin: 4px 0 0; font-weight: 800; font-size: 26px; letter-spacing: -0.03em">¿Qué hay que dar de alta?</h2></div>
{(v.pickers).map((g: any, g_i: number) => (<Fragment key={g_i}>
<fieldset style="margin: 0; padding: 0; border: 0">
<legend style="padding: 0; margin-bottom: 8px; font-size: 13px; font-weight: 700">{g.l}</legend>
<div style="display: flex; flex-wrap: wrap; gap: 6px">
{(g.opts).map((o: any, o_i: number) => (<Fragment key={o_i}><button type="button" class="tap" onClick={o.pick} aria-pressed={o.pressed} style={`min-height: 44px; padding: 0 14px; border-radius: 10px; border: 1.5px solid ${o.border}; background: ${o.bg}; color: ${o.fg}; font: inherit; font-size: 14px; font-weight: 700; cursor: pointer`}>{o.l}</button></Fragment>))}
</div>
</fieldset>
</Fragment>))}
<div style="border-radius: 14px; border: 1px solid var(--line); background: var(--bg); overflow: hidden">
<div style="display: flex; justify-content: space-between; padding: 9px 14px; border-bottom: 1px solid var(--line); font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)"><span>inventario_ingestas.csv</span><span>{v.lotStr} filas</span></div>
<div style="overflow-x: auto">
<table style="width: 100%; border-collapse: collapse; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px">
<thead><tr><th scope="col" style="text-align: left; padding: 7px 14px; color: var(--muted); font-weight: 500">tabla</th><th scope="col" style="text-align: left; padding: 7px 8px; color: var(--muted); font-weight: 500">origen</th><th scope="col" style="text-align: left; padding: 7px 8px; color: var(--muted); font-weight: 500">destino</th><th scope="col" style="text-align: left; padding: 7px 14px 7px 8px; color: var(--muted); font-weight: 500">frecuencia</th></tr></thead>
<tbody>{(v.invRows).map((r: any, r_i: number) => (<Fragment key={r_i}><tr style="border-top: 1px solid var(--line)"><td style="padding: 7px 14px">{r.a}</td><td style="padding: 7px 8px">{r.b}</td><td style="padding: 7px 8px">{r.c}</td><td style="padding: 7px 14px 7px 8px">{r.d}</td></tr></Fragment>))}</tbody>
</table>
</div>
<div style="padding: 7px 14px; border-top: 1px solid var(--line); font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)">… y {v.lotRest} más</div>
</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr)); gap: 10px">
<div style="padding: 14px 16px; border-radius: 14px; border: 1px dashed var(--muted); display: flex; flex-direction: column; gap: 2px"><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)">A MANO</span><strong style="font-weight: 800; font-size: 28px; letter-spacing: -0.03em; color: var(--muted)">≈ {v.manH} h</strong><span style="font-size: 12px; color: var(--muted)">a 20 minutos por ingesta</span></div>
<div style="padding: 14px 16px; border-radius: 14px; border: 2px solid var(--accent); display: flex; flex-direction: column; gap: 2px"><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--accent-text)">CON EL GENERADOR</span><strong style="font-weight: 800; font-size: 28px; letter-spacing: -0.03em; color: var(--accent-text)">≈ {v.autoH} h</strong><span style="font-size: 12px; color: var(--muted)">segundos para generar; el resto, revisar</span></div>
</div>
<button type="button" class="tap btn" onClick={v.goGen} style="align-self: flex-start; min-height: 50px; padding: 0 24px; border-radius: 999px; border: 0; background: var(--accent); color: var(--on-accent); font: inherit; font-weight: 700; cursor: pointer">Generar {v.lotStr} ingestas →</button>
</div>
</>)}

{(v.isGen) && (<>
<div class="scr" style="display: flex; flex-direction: column; gap: 16px">
<div><p style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)">PASO 2 · GENERAR</p><h2 style="margin: 4px 0 0; font-weight: 800; font-size: 26px; letter-spacing: -0.03em">{v.genTitle}</h2></div>
<div style="display: flex; flex-direction: column; gap: 6px">
<div style="display: flex; justify-content: space-between; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)"><span>{v.genPct} %</span><span>{v.genSecs} s</span></div>
<div style="height: 10px; border-radius: 99px; background: var(--inner); overflow: hidden"><div class="bar" style={`height: 10px; width: ${v.genPct}%; background: var(--accent)`}></div></div>
</div>
<div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px">
{(v.genCount).map((g: any, g_i: number) => (<Fragment key={g_i}>
<div style={`padding: 12px 14px; border-radius: 14px; border: 1px solid ${g.border}; background: var(--bg); display: flex; flex-direction: column`}><strong style={`font-weight: 800; font-size: 26px; line-height: 1.05; letter-spacing: -0.04em; color: ${g.c}`}>{g.v}</strong><span style="font-size: 12px; color: var(--muted)">{g.l}</span></div>
</Fragment>))}
</div>
<div style="border-radius: 14px; border: 1px solid var(--line); background: var(--bg); padding: 10px 12px; display: flex; flex-direction: column; gap: 4px; min-height: 196px; box-sizing: border-box">
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)">ficheros escritos</span>
{(v.stream).map((f: any, f_i: number) => (<Fragment key={f_i}>
<span style={`display: flex; align-items: center; gap: 8px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12.5px; opacity: ${f.o}`}><span style={`flex: 0 0 auto; padding: 1px 6px; border-radius: 4px; background: ${f.bg}; color: ${f.fg}; font-size: 10px`}>{f.k}</span>{f.n}<span style="margin-left: auto; color: var(--good)">✓</span></span>
</Fragment>))}
</div>
{(v.genIdle) && (<>
<button type="button" class="tap btn" onClick={v.startGen} style="align-self: flex-start; min-height: 50px; padding: 0 24px; border-radius: 999px; border: 0; background: var(--accent); color: var(--on-accent); font: inherit; font-weight: 700; cursor: pointer">Empezar a generar</button>
</>)}
{(v.genDone) && (<>
<div class="pop" style="display: flex; flex-direction: column; gap: 12px; padding: 14px 16px; border-radius: 14px; background: var(--accent-soft)">
<strong style="font-size: 16px">{v.genDoneText}</strong>
<div style="display: flex; flex-wrap: wrap; gap: 8px">
<button type="button" class="tap" onClick={v.goTest} style="min-height: 46px; padding: 0 20px; border-radius: 999px; border: 0; background: var(--accent); color: var(--on-accent); font: inherit; font-weight: 700; cursor: pointer">Probar →</button>
<button type="button" class="tap" onClick={v.startGen} style="min-height: 46px; padding: 0 18px; border-radius: 999px; border: 1px solid var(--line); background: transparent; color: var(--fg); font: inherit; font-weight: 700; cursor: pointer">Generar otra vez</button>
</div>
</div>
</>)}
</div>
</>)}

{(v.isTest) && (<>
<div class="scr" style="display: flex; flex-direction: column; gap: 14px">
<div><p style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)">PASO 3 · PLAN DE PRUEBAS</p><h2 style="margin: 4px 0 0; font-weight: 800; font-size: 26px; letter-spacing: -0.03em">{v.testTitle}</h2></div>
<p style="margin: 0; font-size: 14px; color: var(--muted)">El generador también escribe las pruebas: cada configuración se comprueba contra el inventario y las reglas del equipo antes de que nadie la mire.</p>
<div style="display: flex; flex-direction: column; gap: 6px">
<div style="display: flex; justify-content: space-between; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)"><span>{v.testPassStr} de {v.testTotalStr} superadas</span><span>{v.testSecs} s</span></div>
<div style="height: 10px; border-radius: 99px; background: var(--inner); overflow: hidden"><div class="bar" style={`height: 10px; width: ${v.testPct}%; background: var(--accent)`}></div></div>
</div>
<ol style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px">
{(v.tests).map((x: any, x_i: number) => (<Fragment key={x_i}>
<li style={`display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 12px; border: 1px solid ${x.border}; background: var(--bg)`}>
<span aria-hidden="true" style={`flex: 0 0 24px; width: 24px; height: 24px; border-radius: 99px; background: ${x.dot}; color: ${x.dotFg}; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; font-weight: 700`}>{x.mark}</span>
<span style="flex: 1; display: flex; flex-direction: column; min-width: 0"><strong style="font-size: 14px; line-height: 1.25">{x.t}</strong><span style="font-size: 12px; color: var(--muted)">{x.s}</span></span>
<span style={`flex: 0 0 auto; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: ${x.stC}; text-align: right`}>{x.st}</span>
</li>
</Fragment>))}
</ol>
{(v.genIdle) && (<><button type="button" class="tap" onClick={v.goGen} style="align-self: flex-start; min-height: 46px; padding: 0 20px; border-radius: 999px; border: 0; background: var(--accent); color: var(--on-accent); font: inherit; font-weight: 700; cursor: pointer">Generar el lote primero →</button></>)}
{(v.testIdle) && (<><button type="button" class="tap btn" onClick={v.runTests} style="align-self: flex-start; min-height: 50px; padding: 0 24px; border-radius: 999px; border: 0; background: var(--accent); color: var(--on-accent); font: inherit; font-weight: 700; cursor: pointer">Ejecutar {v.testTotalStr} pruebas</button></>)}
{(v.testDone) && (<>
<div class="pop" style="display: flex; flex-direction: column; gap: 12px; padding: 14px 16px; border-radius: 14px; background: var(--accent-soft)">
<strong style="font-size: 16px">{v.testDoneText}</strong>
<div style="display: flex; flex-wrap: wrap; gap: 8px">
<button type="button" class="tap" onClick={v.goRev} style="min-height: 46px; padding: 0 20px; border-radius: 999px; border: 0; background: var(--accent); color: var(--on-accent); font: inherit; font-weight: 700; cursor: pointer">Revisar los 3 fallos →</button>
<button type="button" class="tap" onClick={v.runTests} style="min-height: 46px; padding: 0 18px; border-radius: 999px; border: 1px solid var(--line); background: transparent; color: var(--fg); font: inherit; font-weight: 700; cursor: pointer">Volver a probar</button>
</div>
</div>
</>)}
</div>
</>)}

{(v.isRev) && (<>
<div class="scr" style="display: flex; flex-direction: column; gap: 14px">
<div><p style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)">PASO 4 · REVISAR</p><h2 style="margin: 4px 0 0; font-weight: 800; font-size: 26px; letter-spacing: -0.03em">{v.revTitle}</h2></div>
<div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px">
{(v.revStats).map((g: any, g_i: number) => (<Fragment key={g_i}><div style={`padding: 10px 12px; border-radius: 12px; border: 1px solid ${g.border}; background: var(--bg); display: flex; flex-direction: column`}><strong style={`font-weight: 800; font-size: 22px; letter-spacing: -0.03em; color: ${g.c}`}>{g.v}</strong><span style="font-size: 12px; color: var(--muted)">{g.l}</span></div></Fragment>))}
</div>
{(v.genIdle) && (<><button type="button" class="tap" onClick={v.goGen} style="align-self: flex-start; min-height: 46px; padding: 0 20px; border-radius: 999px; border: 0; background: var(--accent); color: var(--on-accent); font: inherit; font-weight: 700; cursor: pointer">Generar el lote primero →</button></>)}
{(v.needTest) && (<><button type="button" class="tap" onClick={v.goTest} style="align-self: flex-start; min-height: 46px; padding: 0 20px; border-radius: 999px; border: 0; background: var(--accent); color: var(--on-accent); font: inherit; font-weight: 700; cursor: pointer">Pasar antes el plan de pruebas →</button></>)}
{(v.warns).map((w: any, w_i: number) => (<Fragment key={w_i}>
<div style={`padding: 12px 14px; border-radius: 14px; border: 1.5px solid ${w.border}; background: var(--bg); display: flex; flex-direction: column; gap: 8px`}>
<div style="display: flex; align-items: flex-start; gap: 10px">
<span aria-hidden="true" style={`flex: 0 0 24px; width: 24px; height: 24px; border-radius: 99px; background: ${w.dot}; color: ${w.dotFg}; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800`}>{w.mark}</span>
<span style="flex: 1; display: flex; flex-direction: column; min-width: 0"><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted); overflow-wrap: anywhere">{w.where}</span><strong style="font-size: 15px; line-height: 1.3">{w.what}</strong></span>
{(w.human) && (<><span class="tag" style="font-size: 11px; padding: 4px 9px">decide una persona</span></>)}
</div>
{(w.open) && (<>
<div style="display: flex; flex-wrap: wrap; gap: 6px; padding-left: 34px">
{(w.acts).map((x: any, x_i: number) => (<Fragment key={x_i}><button type="button" class="tap" onClick={x.go} style={`min-height: 44px; padding: 0 14px; border-radius: 10px; border: 1.5px solid ${x.border}; background: ${x.bg}; color: ${x.fg}; font: inherit; font-size: 13px; font-weight: 700; cursor: pointer`}>{x.l}</button></Fragment>))}
</div>
</>)}
{(w.closed) && (<><span class="pop" style="padding-left: 34px; font-size: 13px; color: var(--good); font-weight: 600">{w.res}</span></>)}
</div>
</Fragment>))}
<div style="border-radius: 14px; border: 1px solid var(--line); background: var(--bg); overflow: hidden">
<div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px; padding: 8px 10px 8px 14px; border-bottom: 1px solid var(--line)">
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)">{v.fileName}</span>
<span role="group" aria-label="Fichero de ejemplo" style="display: flex; gap: 4px">{(v.fileTabs).map((f: any, f_i: number) => (<Fragment key={f_i}><button type="button" class="tap" onClick={f.go} aria-pressed={f.pressed} style={`min-height: 44px; padding: 0 10px; border-radius: 8px; border: 0; background: ${f.bg}; color: ${f.fg}; font: inherit; font-size: 12px; font-weight: 700; cursor: pointer`}>{f.l}</button></Fragment>))}</span>
</div>
<pre style="margin: 0; padding: 12px 14px; max-height: 210px; overflow: auto; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; line-height: 1.5; color: var(--fg); white-space: pre">{v.fileJson}</pre>
</div>
{(v.allResolved) && (<>
<div class="pop" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; padding: 14px 16px; border-radius: 14px; background: var(--accent-soft)">
<strong style="font-size: 15px">{v.pubText}</strong>
<button type="button" class="tap" onClick={v.publish} aria-disabled={v.pubDis} style={`min-height: 46px; padding: 0 20px; border-radius: 999px; border: 0; background: ${v.pubBg}; color: var(--on-accent); font: inherit; font-weight: 700; cursor: pointer`}>{v.pubBtn}</button>
</div>
</>)}
</div>
</>)}

{(v.isChat) && (<>
<div class="scr" style="display: flex; flex-direction: column; gap: 12px; height: 100%">
<div style="display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 10px">
<div><p style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)">PASO 5 · ASISTENTE</p><h2 style="margin: 4px 0 0; font-weight: 800; font-size: 26px; letter-spacing: -0.03em">Pregúntale a la documentación</h2></div>
<div role="group" aria-label="Cómo se pregunta" style="display: inline-flex; padding: 3px; border-radius: 999px; border: 1px solid var(--line); background: var(--bg)">
<button type="button" class="tap" onClick={v.toLoose} aria-pressed={v.looseStr} style={`min-height: 44px; padding: 0 14px; border: 0; border-radius: 999px; background: ${v.looseBg}; color: ${v.looseFg}; font: inherit; font-size: 13px; font-weight: 700; cursor: pointer`}>Pregunta suelta</button>
<button type="button" class="tap" onClick={v.toMethod} aria-pressed={v.methodStr} style={`min-height: 44px; padding: 0 14px; border: 0; border-radius: 999px; background: ${v.methodBg}; color: ${v.methodFg}; font: inherit; font-size: 13px; font-weight: 700; cursor: pointer`}>Con método</button>
</div>
</div>
<div data-chatlog="1" class="scrollb" role="log" aria-live="polite" style="flex: 1; min-height: 240px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; padding: 12px; border-radius: 16px; background: var(--bg); border: 1px solid var(--line)">
{(v.noMsgs) && (<><p style="margin: auto; max-width: 340px; text-align: center; color: var(--muted); font-size: 14px">Elige una pregunta o escribe la tuya. Prueba la misma con y sin método.</p></>)}
{(v.msgs).map((m: any, m_i: number) => (<Fragment key={m_i}>
<div style={`align-self: ${m.align}; max-width: 88%; display: flex; flex-direction: column; gap: 6px; padding: 10px 12px; border-radius: ${m.radius}; background: ${m.bg}; color: ${m.fg}; border: 1px solid ${m.border}`}>
{(m.hasCtx) && (<><span style="align-self: flex-start; padding: 3px 8px; border-radius: 6px; background: rgba(0,0,0,.18); font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px">+ contexto: {m.ctx}</span></>)}
{(m.lines).map((l: any, l_i: number) => (<Fragment key={l_i}>
<div class="pop" style={`display: flex; gap: 8px; align-items: baseline; padding: ${l.pad}; border-radius: 8px; background: ${l.bg}; color: ${l.col}; font-family: ${l.ff}; font-size: ${l.fs}px; font-weight: ${l.fw}; line-height: 1.4`}>
{(l.hasN) && (<><span style="flex: 0 0 22px; width: 22px; height: 22px; border-radius: 7px; background: var(--accent); color: var(--on-accent); display: inline-flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px">{l.n}</span></>)}
<span>{l.t}</span>
</div>
</Fragment>))}
{(m.typing) && (<><span role="status" style="display: flex; gap: 4px; padding: 4px 2px"><span style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)">El asistente está escribiendo</span><span class="dot" aria-hidden="true"></span><span class="dot" aria-hidden="true" style="animation-delay: .15s"></span><span class="dot" aria-hidden="true" style="animation-delay: .3s"></span></span></>)}
</div>
</Fragment>))}
</div>
<div style="display: flex; flex-wrap: wrap; gap: 6px">
{(v.sugg).map((q: any, q_i: number) => (<Fragment key={q_i}><button type="button" class="tap" onClick={q.ask} style="min-height: 44px; padding: 0 12px; border-radius: 10px; border: 1px solid var(--line); background: var(--bg); color: var(--fg); font: inherit; font-size: 13px; font-weight: 600; text-align: left; cursor: pointer">{q.t}</button></Fragment>))}
</div>
<div style="display: flex; gap: 8px">
<label style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)" for="dq">Tu pregunta</label>
<input id="dq" class="field" type="text" value={v.draft} onInput={v.onDraft} onKeyDown={v.onKey} placeholder="Escribe tu pregunta…" autocomplete="off" style="flex: 1; min-width: 0; height: 46px" />
<button type="button" class="tap" onClick={v.sendDraft} style="min-height: 46px; padding: 0 18px; border-radius: 12px; border: 0; background: var(--accent); color: var(--on-accent); font: inherit; font-weight: 700; cursor: pointer">Enviar</button>
</div>
</div>
</>)}

{(v.isRadar) && (<>
<div class="scr" style="display: flex; flex-direction: column; gap: 14px">
<div><p style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)">PASO 6 · TU RADAR</p><h2 style="margin: 4px 0 0; font-weight: 800; font-size: 26px; letter-spacing: -0.03em">¿Qué hace tu equipo a mano?</h2></div>
<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-start">
<div role="group" aria-label="Tareas de tu equipo" style="flex: 1 1 250px; min-width: 0; display: flex; flex-direction: column; gap: 5px">
{(v.tasks).map((k: any, k_i: number) => (<Fragment key={k_i}>
<button type="button" class="tap" onClick={k.toggle} aria-pressed={k.pressed} style={`display: flex; align-items: center; gap: 10px; min-height: 44px; padding: 5px 12px; border-radius: 12px; border: 1.5px solid ${k.border}; background: ${k.bg}; color: var(--fg); font: inherit; font-size: 13.5px; font-weight: 600; text-align: left; cursor: pointer`}>
<span aria-hidden="true" style={`flex: 0 0 20px; width: 20px; height: 20px; border-radius: 6px; border: 2px solid ${k.box}; background: ${k.fill}; color: var(--on-accent); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; box-sizing: border-box`}>{k.mark}</span>{k.t}
</button>
</Fragment>))}
</div>
<div style="flex: 0 0 190px; min-width: 0; display: flex; flex-direction: column; gap: 10px; align-items: center">
<div style="position: relative; width: 190px; height: 190px">
<div aria-hidden="true" style="position: absolute; inset: 0; border-radius: 50%; background: var(--bg); border: 1px solid var(--line)"></div>
<div aria-hidden="true" style="position: absolute; inset: 17%; border-radius: 50%; border: 1px dashed var(--line)"></div>
<div aria-hidden="true" style="position: absolute; inset: 34%; border-radius: 50%; border: 1px dashed var(--line)"></div>
<div aria-hidden="true" style="position: absolute; inset: 45%; border-radius: 50%; background: var(--accent-soft); border: 1px solid var(--accent)"></div>
<div aria-hidden="true" class="sweepr" style="position: absolute; inset: 0; border-radius: 50%; background: conic-gradient(from 0deg, transparent 0deg 290deg, var(--sweep) 360deg)"></div>
{(v.rblips).map((b: any, b_i: number) => (<Fragment key={b_i}>
<button type="button" class="tap" onClick={b.pick} aria-label={b.aria} aria-pressed={b.pressed} style={`position: absolute; left: ${b.x}%; top: ${b.y}%; width: 44px; height: 44px; margin: -22px 0 0 -22px; border: 0; padding: 0; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center`}>
<span class="ping" aria-hidden="true" style={`position: absolute; width: 14px; height: 14px; border-radius: 99px; border: 2px solid ${b.c}`}></span>
<span aria-hidden="true" style={`width: ${b.s}px; height: ${b.s}px; border-radius: 99px; background: ${b.c}; color: var(--on-accent); display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10px`}>{b.n}</span>
</button>
</Fragment>))}
</div>
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted); text-align: center">cerca del centro:<br />mejor oportunidad</span>
</div>
</div>
<div role="status" style={`padding: 14px 16px; border-radius: 14px; border: 2px solid ${v.bestBorder}; background: var(--bg); display: flex; flex-direction: column; gap: 6px`}>
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--accent-text)">{v.bestK}</span>
<strong style="font-size: 18px; line-height: 1.25">{v.bestT}</strong>
<span style="font-size: 14px; color: var(--muted)">{v.bestS}</span>
{(v.hasBest) && (<><a href="/?para=clientes#contacto" style="align-self: flex-start; display: inline-flex; align-items: center; min-height: 44px; font-weight: 700; color: var(--accent-text); text-underline-offset: 5px">Cuéntame esta idea →</a></>)}
</div>
</div>
</>)}

</div>

<div class="holocol" style="flex: 0 0 300px; min-width: 0; height: 100%; box-sizing: border-box; border-left: 1px solid var(--line); background: var(--bg); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 16px 10px; position: relative; overflow: hidden">
<div aria-hidden="true" style="position: absolute; inset: 0; background-image: linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px); background-size: 28px 28px; pointer-events: none"></div>
<span class="tag" style="position: relative">núcleo · {v.holoName}</span>
<div data-holo-cfg="1" data-shape={v.holoShape} data-level={v.holoLevel} data-alerts={v.holoAlerts} data-pulse={v.holoPulseStr} data-dark={v.darkStr} style="position: relative; width: 280px; height: 280px">
<HoloDiferido shape={v.holoShape} level={v.holoLevel} alerts={v.holoAlerts} pulse={v.holoPulse} dark={v.dark} size={v.holoSize} backdrop={v.no} frame={v.yes} />
</div>
<div aria-live="off" style="position: relative; display: flex; flex-direction: column; align-items: center; text-align: center">
<strong style="font-weight: 800; font-size: 44px; line-height: 1; letter-spacing: -0.05em; color: var(--accent-text)">{v.holoBig}</strong>
<span style="font-size: 13px; color: var(--muted)">{v.holoSub}</span>
</div>
<span style="position: relative; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px; color: var(--muted); text-align: center">arrastra para girarlo · al hacer scroll se deforma</span>
</div>
</div>

{(v.showToast) && (<>
<div class="toast" role="status" style="position: absolute; left: 50%; top: 64px; transform: translateX(-50%); z-index: 5; display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: 14px; background: var(--fg); color: var(--bg); box-shadow: 0 20px 40px -16px rgba(0,0,0,.6); white-space: nowrap">
<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="var(--accent)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>
<strong style="font-size: 14px">{v.toastText}</strong>
</div>
</>)}
</section>
</main>
</div>

      </>
    );
  }
}

export const Desktop = conTema(Logica);
