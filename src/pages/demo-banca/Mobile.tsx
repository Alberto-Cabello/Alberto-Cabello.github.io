// @ts-nocheck
// Generado desde el tablero DemoBancaMovil y revisado a mano: lógica, textos y estilos tal cual.
import { Fragment } from 'preact';
import { DCLogic, conTema } from '../../lib/dclogic';
import { HoloDiferido } from '../../components/HoloDiferido';
import './Mobile.css';

class Logica extends DCLogic {

  fresh() { return { testP: 0, testRan: false, testDone: false, scr: 'inv', lot: 412, org: 'SFTP', dst: 'Lago de datos', freq: 'diaria', genP: 0, genRan: false, genDone: false, fixes: {}, ftab: 0, published: false, showToast: false, chatM: true, msgs: [], draft: '', sel: { 1: true, 2: true }, focus: null, seenRadar: false }; }
  componentWillUnmount() { clearInterval(this.testT); clearInterval(this.genT); clearTimeout(this.toastT); clearTimeout(this.typT); }
  st() { return Object.assign(this.fresh(), this.state || {}); }
  toConsole() { setTimeout(() => { try { const el = document.querySelector('[data-console]'); if (el) { el.scrollIntoView({ block: 'start', behavior: 'smooth' }); } } catch (e) {} }, 60); }
  go(scr) {
    this.toConsole();
    const u = { scr };
    if (scr === 'radar') { u.seenRadar = true; }
    this.setState(u);
    const s = this.st();
    if (scr === 'gen' && !s.genRan) { setTimeout(() => this.startGen(), 350); }
    if (scr === 'test' && s.genDone && !s.testRan) { setTimeout(() => this.runTests(), 350); }
  }
  startGen() {
    clearInterval(this.genT); clearInterval(this.testT);
    const s = this.st();
    const dur = 1200 + (s.lot / 412) * 2600;
    const t0 = Date.now();
    this.setState({ genP: 0, genRan: true, genDone: false, genDur: dur, fixes: {}, published: false, testP: 0, testRan: false, testDone: false, testEl: 0 });
    this.genT = setInterval(() => {
      const p = Math.min(1, (Date.now() - t0) / dur);
      const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      this.setState({ genP: e, genEl: Math.min(dur, Date.now() - t0), genDone: p >= 1 });
      if (p >= 1) { clearInterval(this.genT); }
    }, 70);
  }
  runTests() {
    if (!this.st().genDone) { return; }
    clearInterval(this.testT);
    const dur = 3200;
    const t0 = Date.now();
    this.setState({ testP: 0, testRan: true, testDone: false, fixes: {}, published: false });
    this.testT = setInterval(() => {
      const p = Math.min(1, (Date.now() - t0) / dur);
      this.setState({ testP: p, testEl: Math.min(dur, Date.now() - t0), testDone: p >= 1 });
      if (p >= 1) { clearInterval(this.testT); }
    }, 70);
  }
  toast(text) {
    clearTimeout(this.toastT);
    this.setState({ showToast: true, toastText: text });
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
    const hit = this.answers(s).find((a) => a.re.test(q.toLowerCase()));
    const lines = hit ? (s.chatM ? hit.method : hit.loose) : (s.chatM ? [{ t: 'En esta demo, la documentación (ficticia) cubre altas de origen, cargas que fallan y cambios de frecuencia.' }, { muted: true, t: 'Prueba con una de las preguntas sugeridas.' }] : [{ t: 'No he encontrado nada exacto en la documentación.' }]);
    const ctx = s.org + ' · CSV · ' + s.dst.toLowerCase() + ' · ' + s.freq;
    const msgs = s.msgs.concat([{ who: 'yo', text: q, ctx: s.chatM ? ctx : '' }, { who: 'ia', lines, shown: 0, typing: true }]);
    this.setState({ msgs: msgs.slice(-6), draft: '', busy: true });
    this.scrollLog();
    clearTimeout(this.typT);
    const reveal = () => {
      const ms = this.st().msgs.slice();
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
    const night = { bg: '#0B0B0C', fg: '#F2F0EB', muted: '#A09D96', line: '#29292B', panel: '#141415', inner: '#222224', accent: '#FF5B2E', accentText: '#FF7A55', accentSoft: 'rgba(255,91,46,0.13)', onAccent: '#0B0B0C', good: '#5FCB8E', warn: '#FFC24B', sweep: 'rgba(255,91,46,0.30)', bubble: '#26262A' };
    const light = { bg: '#F3F1EC', fg: '#111111', muted: '#55524C', line: '#DAD6CC', panel: '#FFFFFF', inner: '#ECE9E2', accent: '#B8350F', accentText: '#B8350F', accentSoft: 'rgba(184,53,15,0.09)', onAccent: '#FFFFFF', good: '#1F7A4D', warn: '#8A5600', sweep: 'rgba(184,53,15,0.22)', bubble: '#ECE9E2' };
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
    const invRows = tables.slice(0, 4).map((x) => ({ a: x, b: s.org, d: s.freq }));
    const manual = (lot * 20) / 60;
    const files = lot * 4;
    const genP = s.genP;
    const built = Math.round(lot * genP);
    const KINDS = [['esq', 'esquema', 'esq_'], ['obj', 'origen', 'obj_origen_'], ['obj', 'destino', 'obj_destino_'], ['trf', 'transf.', 'trf_']];
    const stream = [];
    const writtenFiles = Math.round(files * genP);
    for (let j = 0; j < 4; j++) {
      const idx = writtenFiles - 1 - j;
      if (idx < 0) { break; }
      const row = Math.floor(idx / 4), kind = KINDS[idx % 4];
      stream.push({ k: kind[1], n: kind[2] + tables[row % 5] + '_' + String(row + 1).padStart(4, '0') + '.json', o: (1 - j * 0.18).toFixed(2), bg: j === 0 ? t.accent : t.inner, fg: j === 0 ? t.onAccent : t.fg });
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
    const warns = !s.testDone ? [] : W.map((w) => {
      const done = fixes[w.id];
      return { where: w.where, what: w.what, human: !!w.human, open: !done, closed: !!done, res: done || '', mark: done ? '✓' : '!', dot: done ? t.good : t.warn, dotFg: '#111111', border: done ? t.line : t.warn,
        acts: w.acts.map((a, ai) => ({ l: a[0], bg: ai === 0 ? t.fg : 'transparent', fg: ai === 0 ? t.bg : t.fg, border: ai === 0 ? t.fg : t.line, go: () => this.setState({ fixes: Object.assign({}, fixes, { [w.id]: a[1] }) }) })) };
    });
    const allResolved = !!s.testDone && pending === 0;
    const orgObj = { 'SFTP': { tipo: 'sftp', ruta: '/entrada/cuentas/', patron: 'cuentas_*.csv', separador: ';' }, 'Base de datos': { tipo: 'base_de_datos', tabla: 'CUENTAS', esquema_origen: 'OPERACIONES' }, 'API': { tipo: 'api', url: 'https://api.ejemplo.test/cuentas', paginado: true } }[s.org];
    const FJ = [
      ['Esquema', 'esq_cuentas_0001.json', { nombre: 'esq_cuentas_0001', campos: [{ nombre: 'id_cuenta', tipo: 'texto', vacio: false }, { nombre: 'fecha_alta', tipo: 'fecha', vacio: false }, { nombre: 'saldo', tipo: 'decimal', vacio: true }] }],
      ['Objeto', 'obj_origen_cuentas_0001.json', Object.assign({ nombre: 'obj_origen_cuentas_0001' }, orgObj, { esquema: 'esq_cuentas_0001' })],
      ['Transferencia', 'trf_cuentas_0001.json', { nombre: 'trf_cuentas_0001', origen: 'obj_origen_cuentas_0001', destino: 'obj_destino_cuentas_0001', destino_tipo: s.dst.toLowerCase(), frecuencia: s.freq, hora: '06:00', validar_filas: true }]
    ];
    const ft = s.ftab || 0;
    const fileTabs = FJ.map((f, i) => ({ l: f[0], pressed: i === ft ? 'true' : 'false', bg: i === ft ? t.fg : t.inner, fg: i === ft ? t.bg : t.fg, go: () => this.setState({ ftab: i }) }));
    const mkLine = (l) => {
      const base = { t: l.t, n: l.n || '', hasN: !!l.n, pad: '3px 2px', bg: 'transparent', col: t.fg, ff: 'Inter, sans-serif', fs: 13.5, fw: 500 };
      if (l.code) { return Object.assign(base, { ff: "'IBM Plex Mono', ui-monospace, monospace", fs: 11.5, bg: t.inner, pad: '7px 9px' }); }
      if (l.src) { return Object.assign(base, { ff: "'IBM Plex Mono', ui-monospace, monospace", fs: 11, col: t.muted }); }
      if (l.ask) { return Object.assign(base, { bg: t.accentSoft, col: t.accentText, fw: 700, pad: '7px 9px' }); }
      if (l.muted) { return Object.assign(base, { col: t.muted, fs: 12.5 }); }
      return base;
    };
    const msgs = s.msgs.map((m) => (m.who === 'yo'
      ? { align: 'flex-end', radius: '14px 14px 4px 14px', bg: t.accent, fg: t.onAccent, border: t.accent, hasCtx: !!m.ctx, ctx: m.ctx, typing: false, lines: [{ t: m.text, n: '', hasN: false, pad: '0', bg: 'transparent', col: t.onAccent, ff: 'Inter, sans-serif', fs: 13.5, fw: 600 }] }
      : { align: 'flex-start', radius: '14px 14px 14px 4px', bg: t.bubble, fg: t.fg, border: t.line, hasCtx: false, ctx: '', typing: !!m.typing, lines: m.lines.slice(0, m.shown || 0).map(mkLine) }));
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
    const tasks = TK.map((k, i) => { const on = !!sel[i]; return { t: k.t, n: String(i + 1), pressed: on ? 'true' : 'false', mark: on ? '✓' : '', fill: on ? t.accent : 'transparent', box: on ? t.accent : t.muted, bg: on ? t.accentSoft : 'transparent', border: on ? t.accent : t.line, toggle: () => this.setState({ sel: Object.assign({}, sel, { [i]: !on }), focus: on ? null : i }) }; });
    const chosen = TK.map((k, i) => Object.assign({ i }, k)).filter((k) => sel[k.i]);
    const ranked = chosen.slice().sort((p, q) => q.sc - p.sc);
    const focusI = s.focus !== null && s.focus !== undefined && sel[s.focus] ? s.focus : ranked.length ? ranked[0].i : null;
    const rblips = chosen.map((k) => {
      const ang = (k.i * 45 + 20) * Math.PI / 180;
      const r = Math.min(0.9, 0.15 + (1 - k.sc) * 1.5);
      const on = k.i === focusI;
      return { n: String(k.i + 1), x: (50 + Math.sin(ang) * r * 46).toFixed(1), y: (50 - Math.cos(ang) * r * 46).toFixed(1), s: on ? 20 : 16, c: k.sc >= 0.5 ? t.accent : t.muted, pressed: on ? 'true' : 'false', aria: k.t, pick: () => this.setState({ focus: k.i }) };
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
    const TD = [['inv', 'Inventario'], ['gen', 'Generar'], ['test', 'Pruebas'], ['rev', 'Revisar'], ['chat', 'Asistente'], ['radar', 'Tu radar']];
    const tour = TD.map((d, i) => { const on = scr === d[0]; const ok = d[0] !== 'inv' && visited[d[0]]; return { short: d[1], mark: ok ? '✓' : String(i + 1), cur: on ? 'step' : 'false', bg: on ? t.accentSoft : 'transparent', border: on ? t.accent : t.line, numBg: on || ok ? t.accent : t.inner, numFg: on || ok ? t.onAccent : t.fg, go: () => this.go(d[0]) }; });
    const explain = {
      inv: 'El punto de partida: un inventario de tablas que hay que dar de alta. Cambia el lote, el origen o la frecuencia y mira cuánto costaría a mano.',
      gen: 'El generador escribe un esquema, dos objetos y una transferencia por cada tabla, siempre con las mismas plantillas. El holograma encaja cada pieza.',
      test: 'El plan de pruebas sale del inventario y de las reglas del equipo. ' + ln(testTotal) + ' comprobaciones en segundos: solo lo que falla llega a una persona.',
      rev: 'Solo llega lo que falló en las pruebas. Lo automático se corrige con un toque. Lo que tiene consecuencias de negocio lo decide una persona.',
      chat: 'La misma pregunta, suelta o con método: con contexto, el asistente responde con pasos, ejemplo, fuentes y lo que le falta saber.',
      radar: 'Marca lo que tu equipo hace a mano. Cuanto más cerca del centro, mejor candidata a automatizar, y te digo con qué.'
    }[scr];
    const chatM = !!s.chatM;
    return {
      t, dark, darkStr: dark ? 'true' : 'false', holoPulseStr: scr === 'chat' && !!s.busy ? 'true' : 'false', no: false, yes: true, holoSize: 160,
      modeLabel: dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro',
      toggle: () => this.setState({ dark: !dark }),
      reset: () => { clearInterval(this.testT); clearInterval(this.genT); clearTimeout(this.typT); this.setState(this.fresh()); },
      tour, explain,
      isInv: scr === 'inv', isGen: scr === 'gen', isTest: scr === 'test', isRev: scr === 'rev', isChat: scr === 'chat', isRadar: scr === 'radar',
      pickers, invRows, lotStr: ln(lot), lotRest: ln(lot - 4), dstLow: s.dst.toLowerCase(), manH: fmtH(manual), autoH: fmtH(manual * 0.1),
      goGen: () => { this.setState({ scr: 'gen' }); this.toConsole(); this.startGen(); },
      genTitle: s.genDone ? 'Listo' : s.genRan ? 'Generando ' + ln(lot) + ' ingestas…' : 'Preparado para generar',
      genPct: Math.round(genP * 100), genSecs,
      genCount: [[built, 'esquemas'], [built * 2, 'objetos'], [built, 'transferencias'], [built * 4, 'ficheros']].map((g, i) => ({ v: ln(g[0]), l: g[1], c: i === 3 ? t.accentText : t.fg, border: i === 3 ? t.accent : t.line })),
      stream, genIdle: !s.genRan, genDone: !!s.genDone,
      genDoneText: ln(files) + ' ficheros en ' + genSecs + ' s · 0 errores de copia. A mano, ≈ ' + fmtH(manual) + ' h.',
      startGen: () => this.startGen(), goRev: () => this.go('rev'), goTest: () => this.go('test'), runTests: () => this.runTests(),
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
      sugg: this.answers(s).map((a) => ({ t: a.q, ask: () => { if (!this.st().busy) { this.ask(a.q); } } })),
      draft: s.draft || '',
      onDraft: (e) => this.setState({ draft: e.target.value }),
      onKey: (e) => { if (e.key === 'Enter') { e.preventDefault(); if (!this.st().busy) { this.ask(e.target.value); } } },
      sendDraft: () => { if (!this.st().busy) { this.ask(this.st().draft); } },
      tasks, rblips,
      bestK: F ? (isTop ? 'TU MEJOR OPORTUNIDAD' : 'TAREA SELECCIONADA') : 'TU RADAR, VACÍO',
      bestT: F ? F.t + ' → ' + F.sol : 'Marca arriba lo que tu equipo hace a mano.',
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
<div class="movil-raiz demo" style=" min-height: 844px; box-sizing: border-box; background: var(--bg); color: var(--fg); font-family: Inter, 'Helvetica Neue', Arial, sans-serif; font-size: 16px; line-height: 1.5; overflow-x: clip; position: relative">

<header style="position: sticky; top: 0; z-index: 50; background: var(--bg); border-bottom: 1px solid var(--line); padding: 6px 12px 6px 6px; display: flex; align-items: center; justify-content: space-between; gap: 8px">
<a href="/casos/automatizacion-y-asistente-ia/" style="display: inline-flex; align-items: center; min-height: 44px; padding: 0 10px; font-weight: 600; text-decoration: none">← Cerrar</a>
<strong style="font-weight: 800; font-size: 15px; letter-spacing: -0.02em">De a mano a automático</strong>
<button type="button" onClick={v.toggle} aria-label={v.modeLabel} style="display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 999px; border: 1px solid var(--line); background: transparent; color: var(--fg); cursor: pointer"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"></circle><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"></path></svg></button>
</header>

<section aria-label="Guía de la demo" style="padding: 22px 16px 10px; display: flex; flex-direction: column; gap: 12px">
<span class="tag" style="align-self: flex-start">Herramienta y datos ficticios</span>
<h1 style="margin: 0; font-weight: 800; font-size: 34px; line-height: 0.96; letter-spacing: -0.05em">Cientos de configuraciones, <span style="color: var(--accent-text)">en segundos.</span></h1>
<p style="margin: 0; color: var(--muted); font-size: 15px">Tócala: todo funciona. El generador es el del prototipo; las pruebas, la revisión y la publicación muestran cómo sería en producción. Herramienta, datos y documentación, inventados.</p>
<nav aria-label="Pasos de la demo" class="hsc" style="margin: 0 -16px; padding: 0 16px">
{(v.tour).map((p: any, p_i: number) => (<Fragment key={p_i}>
<button type="button" onClick={p.go} aria-current={p.cur} style={`display: flex; align-items: center; gap: 8px; min-height: 46px; padding: 0 12px 0 8px; border-radius: 14px; border: 1px solid ${p.border}; background: ${p.bg}; color: var(--fg); font: inherit; font-size: 14px; font-weight: 700; cursor: pointer`}><span aria-hidden="true" style={`width: 26px; height: 26px; border-radius: 8px; background: ${p.numBg}; color: ${p.numFg}; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px`}>{p.mark}</span>{p.short}</button>
</Fragment>))}
</nav>
<div style="padding: 12px 14px; border-left: 3px solid var(--accent); background: var(--panel); display: flex; flex-direction: column; gap: 2px">
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--accent-text)">LO QUE ESTÁS VIENDO</span>
<span style="font-weight: 600; font-size: 14.5px">{v.explain}</span>
</div>
</section>

<section data-console="1" aria-label="Consola de automatización" style="margin: 0 12px 28px; border-radius: 22px; border: 1px solid var(--line); background: var(--panel); overflow: hidden; position: relative">
<div style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-bottom: 1px solid var(--line); background: var(--bg)">
<div data-holo-cfg="1" data-shape={v.holoShape} data-level={v.holoLevel} data-alerts={v.holoAlerts} data-pulse={v.holoPulseStr} data-dark={v.darkStr} data-lite="true" style="flex: 0 0 160px; width: 160px; height: 160px"><HoloDiferido shape={v.holoShape} level={v.holoLevel} alerts={v.holoAlerts} pulse={v.holoPulse} dark={v.dark} size={v.holoSize} lite={v.yes} backdrop={v.no} frame={v.yes} /></div>
<div aria-live="off" style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px">
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px; color: var(--muted)">núcleo · {v.holoName}</span>
<strong style="font-weight: 800; font-size: 36px; line-height: 1; letter-spacing: -0.05em; color: var(--accent-text)">{v.holoBig}</strong>
<span style="font-size: 12.5px; color: var(--muted); line-height: 1.3">{v.holoSub}</span>
</div>
</div>

<div style="padding: 16px 14px 18px">

{(v.isInv) && (<>
<div class="scr" style="display: flex; flex-direction: column; gap: 14px">
<div><p style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)">PASO 1 · INVENTARIO</p><h2 style="margin: 2px 0 0; font-weight: 800; font-size: 23px; letter-spacing: -0.03em">¿Qué hay que dar de alta?</h2></div>
{(v.pickers).map((g: any, g_i: number) => (<Fragment key={g_i}>
<fieldset style="margin: 0; padding: 0; border: 0">
<legend style="padding: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700">{g.l}</legend>
<div style="display: flex; flex-wrap: wrap; gap: 6px">{(g.opts).map((o: any, o_i: number) => (<Fragment key={o_i}><button type="button" class="tap" onClick={o.pick} aria-pressed={o.pressed} style={`min-height: 44px; padding: 0 13px; border-radius: 10px; border: 1.5px solid ${o.border}; background: ${o.bg}; color: ${o.fg}; font: inherit; font-size: 14px; font-weight: 700; cursor: pointer`}>{o.l}</button></Fragment>))}</div>
</fieldset>
</Fragment>))}
<div style="border-radius: 12px; border: 1px solid var(--line); background: var(--bg); overflow: hidden">
<div style="display: flex; justify-content: space-between; padding: 8px 12px; border-bottom: 1px solid var(--line); font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px; color: var(--muted)"><span>inventario_ingestas.csv</span><span>{v.lotStr} filas</span></div>
<table style="width: 100%; border-collapse: collapse; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11.5px">
<thead><tr><th scope="col" style="text-align: left; padding: 6px 12px; color: var(--muted); font-weight: 500">tabla</th><th scope="col" style="text-align: left; padding: 6px 6px; color: var(--muted); font-weight: 500">origen</th><th scope="col" style="text-align: left; padding: 6px 12px 6px 6px; color: var(--muted); font-weight: 500">frecuencia</th></tr></thead>
<tbody>{(v.invRows).map((r: any, r_i: number) => (<Fragment key={r_i}><tr style="border-top: 1px solid var(--line)"><td style="padding: 6px 12px">{r.a}</td><td style="padding: 6px 6px">{r.b}</td><td style="padding: 6px 12px 6px 6px">{r.d}</td></tr></Fragment>))}</tbody>
</table>
<div style="padding: 6px 12px; border-top: 1px solid var(--line); font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px; color: var(--muted)">… y {v.lotRest} más · destino: {v.dstLow}</div>
</div>
<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px">
<div style="padding: 12px; border-radius: 12px; border: 1px dashed var(--muted); display: flex; flex-direction: column"><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px; color: var(--muted)">A MANO</span><strong style="font-weight: 800; font-size: 24px; letter-spacing: -0.03em; color: var(--muted)">≈ {v.manH} h</strong><span style="font-size: 11.5px; color: var(--muted)">a 20 min por ingesta</span></div>
<div style="padding: 12px; border-radius: 12px; border: 2px solid var(--accent); display: flex; flex-direction: column"><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px; color: var(--accent-text)">CON EL GENERADOR</span><strong style="font-weight: 800; font-size: 24px; letter-spacing: -0.03em; color: var(--accent-text)">≈ {v.autoH} h</strong><span style="font-size: 11.5px; color: var(--muted)">generar y revisar</span></div>
</div>
<button type="button" class="tap" onClick={v.goGen} style="min-height: 52px; border-radius: 999px; border: 0; background: var(--accent); color: var(--on-accent); font: inherit; font-weight: 700; cursor: pointer">Generar {v.lotStr} ingestas →</button>
</div>
</>)}

{(v.isGen) && (<>
<div class="scr" style="display: flex; flex-direction: column; gap: 14px">
<div><p style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)">PASO 2 · GENERAR</p><h2 style="margin: 2px 0 0; font-weight: 800; font-size: 23px; letter-spacing: -0.03em">{v.genTitle}</h2></div>
<div style="display: flex; flex-direction: column; gap: 5px">
<div style="display: flex; justify-content: space-between; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11.5px; color: var(--muted)"><span>{v.genPct} %</span><span>{v.genSecs} s</span></div>
<div style="height: 9px; border-radius: 99px; background: var(--inner); overflow: hidden"><div class="bar" style={`height: 9px; width: ${v.genPct}%; background: var(--accent)`}></div></div>
</div>
<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px">
{(v.genCount).map((g: any, g_i: number) => (<Fragment key={g_i}><div style={`padding: 10px 12px; border-radius: 12px; border: 1px solid ${g.border}; background: var(--bg); display: flex; flex-direction: column`}><strong style={`font-weight: 800; font-size: 24px; line-height: 1.05; letter-spacing: -0.04em; color: ${g.c}`}>{g.v}</strong><span style="font-size: 11.5px; color: var(--muted)">{g.l}</span></div></Fragment>))}
</div>
<div style="border-radius: 12px; border: 1px solid var(--line); background: var(--bg); padding: 9px 10px; display: flex; flex-direction: column; gap: 4px; min-height: 128px; box-sizing: border-box">
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px; color: var(--muted)">ficheros escritos</span>
{(v.stream).map((f: any, f_i: number) => (<Fragment key={f_i}><span style={`display: flex; align-items: center; gap: 6px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; opacity: ${f.o}; min-width: 0`}><span style={`flex: 0 0 auto; padding: 1px 5px; border-radius: 4px; background: ${f.bg}; color: ${f.fg}; font-size: 9.5px`}>{f.k}</span><span style="min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">{f.n}</span><span style="margin-left: auto; color: var(--good)">✓</span></span></Fragment>))}
</div>
{(v.genIdle) && (<><button type="button" class="tap" onClick={v.startGen} style="min-height: 50px; border-radius: 999px; border: 0; background: var(--accent); color: var(--on-accent); font: inherit; font-weight: 700; cursor: pointer">Empezar a generar</button></>)}
{(v.genDone) && (<>
<div class="pop" style="display: flex; flex-direction: column; gap: 10px; padding: 12px 14px; border-radius: 14px; background: var(--accent-soft)">
<strong style="font-size: 15px">{v.genDoneText}</strong>
<button type="button" class="tap" onClick={v.goTest} style="min-height: 48px; border-radius: 999px; border: 0; background: var(--accent); color: var(--on-accent); font: inherit; font-weight: 700; cursor: pointer">Probar →</button>
<button type="button" class="tap" onClick={v.startGen} style="min-height: 46px; border-radius: 999px; border: 1px solid var(--line); background: transparent; color: var(--fg); font: inherit; font-weight: 700; cursor: pointer">Generar otra vez</button>
</div>
</>)}
</div>
</>)}

{(v.isTest) && (<>
<div class="scr" style="display: flex; flex-direction: column; gap: 12px">
<div><p style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)">PASO 3 · PLAN DE PRUEBAS</p><h2 style="margin: 2px 0 0; font-weight: 800; font-size: 23px; letter-spacing: -0.03em">{v.testTitle}</h2></div>
<p style="margin: 0; font-size: 13.5px; color: var(--muted)">El generador también escribe las pruebas: cada configuración se comprueba contra el inventario y las reglas del equipo antes de que nadie la mire.</p>
<div style="display: flex; flex-direction: column; gap: 5px">
<div style="display: flex; justify-content: space-between; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11.5px; color: var(--muted)"><span>{v.testPassStr} de {v.testTotalStr} superadas</span><span>{v.testSecs} s</span></div>
<div style="height: 9px; border-radius: 99px; background: var(--inner); overflow: hidden"><div class="bar" style={`height: 9px; width: ${v.testPct}%; background: var(--accent)`}></div></div>
</div>
<ol style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px">
{(v.tests).map((x: any, x_i: number) => (<Fragment key={x_i}>
<li style={`display: flex; align-items: center; gap: 9px; padding: 9px 10px; border-radius: 12px; border: 1px solid ${x.border}; background: var(--bg)`}>
<span aria-hidden="true" style={`flex: 0 0 22px; width: 22px; height: 22px; border-radius: 99px; background: ${x.dot}; color: ${x.dotFg}; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px; font-weight: 700`}>{x.mark}</span>
<span style="flex: 1; display: flex; flex-direction: column; min-width: 0"><strong style="font-size: 13.5px; line-height: 1.25">{x.t}</strong><span style="font-size: 11.5px; color: var(--muted)">{x.s}</span></span>
<span style={`flex: 0 0 auto; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px; color: ${x.stC}; text-align: right`}>{x.st}</span>
</li>
</Fragment>))}
</ol>
{(v.genIdle) && (<><button type="button" class="tap" onClick={v.goGen} style="min-height: 48px; border-radius: 999px; border: 0; background: var(--accent); color: var(--on-accent); font: inherit; font-weight: 700; cursor: pointer">Generar el lote primero →</button></>)}
{(v.testIdle) && (<><button type="button" class="tap" onClick={v.runTests} style="min-height: 50px; border-radius: 999px; border: 0; background: var(--accent); color: var(--on-accent); font: inherit; font-weight: 700; cursor: pointer">Ejecutar {v.testTotalStr} pruebas</button></>)}
{(v.testDone) && (<>
<div class="pop" style="display: flex; flex-direction: column; gap: 10px; padding: 12px 14px; border-radius: 14px; background: var(--accent-soft)">
<strong style="font-size: 15px">{v.testDoneText}</strong>
<button type="button" class="tap" onClick={v.goRev} style="min-height: 48px; border-radius: 999px; border: 0; background: var(--accent); color: var(--on-accent); font: inherit; font-weight: 700; cursor: pointer">Revisar los 3 fallos →</button>
<button type="button" class="tap" onClick={v.runTests} style="min-height: 46px; border-radius: 999px; border: 1px solid var(--line); background: transparent; color: var(--fg); font: inherit; font-weight: 700; cursor: pointer">Volver a probar</button>
</div>
</>)}
</div>
</>)}

{(v.isRev) && (<>
<div class="scr" style="display: flex; flex-direction: column; gap: 12px">
<div><p style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)">PASO 4 · REVISAR</p><h2 style="margin: 2px 0 0; font-weight: 800; font-size: 23px; letter-spacing: -0.03em">{v.revTitle}</h2></div>
<div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px">
{(v.revStats).map((g: any, g_i: number) => (<Fragment key={g_i}><div style={`padding: 9px 10px; border-radius: 12px; border: 1px solid ${g.border}; background: var(--bg); display: flex; flex-direction: column`}><strong style={`font-weight: 800; font-size: 19px; letter-spacing: -0.03em; color: ${g.c}`}>{g.v}</strong><span style="font-size: 11.5px; color: var(--muted)">{g.l}</span></div></Fragment>))}
</div>
{(v.genIdle) && (<><button type="button" class="tap" onClick={v.goGen} style="min-height: 48px; border-radius: 999px; border: 0; background: var(--accent); color: var(--on-accent); font: inherit; font-weight: 700; cursor: pointer">Generar el lote primero →</button></>)}
{(v.needTest) && (<><button type="button" class="tap" onClick={v.goTest} style="min-height: 48px; border-radius: 999px; border: 0; background: var(--accent); color: var(--on-accent); font: inherit; font-weight: 700; cursor: pointer">Pasar antes el plan de pruebas →</button></>)}
{(v.warns).map((w: any, w_i: number) => (<Fragment key={w_i}>
<div style={`padding: 11px 12px; border-radius: 14px; border: 1.5px solid ${w.border}; background: var(--bg); display: flex; flex-direction: column; gap: 8px`}>
<div style="display: flex; align-items: flex-start; gap: 9px">
<span aria-hidden="true" style={`flex: 0 0 22px; width: 22px; height: 22px; border-radius: 99px; background: ${w.dot}; color: ${w.dotFg}; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800`}>{w.mark}</span>
<span style="flex: 1; display: flex; flex-direction: column; min-width: 0"><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted); overflow-wrap: anywhere">{w.where}</span><strong style="font-size: 14px; line-height: 1.3">{w.what}</strong>{(w.human) && (<><span class="tag" style="align-self: flex-start; margin-top: 6px">decide una persona</span></>)}</span>
</div>
{(w.open) && (<><div style="display: flex; flex-wrap: wrap; gap: 6px; padding-left: 31px">{(w.acts).map((x: any, x_i: number) => (<Fragment key={x_i}><button type="button" class="tap" onClick={x.go} style={`min-height: 44px; padding: 0 13px; border-radius: 10px; border: 1.5px solid ${x.border}; background: ${x.bg}; color: ${x.fg}; font: inherit; font-size: 13px; font-weight: 700; cursor: pointer`}>{x.l}</button></Fragment>))}</div></>)}
{(w.closed) && (<><span class="pop" style="padding-left: 31px; font-size: 13px; color: var(--good); font-weight: 600">{w.res}</span></>)}
</div>
</Fragment>))}
<div style="border-radius: 12px; border: 1px solid var(--line); background: var(--bg); overflow: hidden">
<div style="display: flex; flex-direction: column; gap: 6px; padding: 8px 10px; border-bottom: 1px solid var(--line)">
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px; color: var(--muted); overflow-wrap: anywhere">{v.fileName}</span>
<span role="group" aria-label="Fichero de ejemplo" style="display: flex; gap: 4px">{(v.fileTabs).map((f: any, f_i: number) => (<Fragment key={f_i}><button type="button" class="tap" onClick={f.go} aria-pressed={f.pressed} style={`flex: 1; min-height: 44px; border-radius: 8px; border: 0; background: ${f.bg}; color: ${f.fg}; font: inherit; font-size: 12.5px; font-weight: 700; cursor: pointer`}>{f.l}</button></Fragment>))}</span>
</div>
<pre style="margin: 0; padding: 10px 12px; max-height: 200px; overflow: auto; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; line-height: 1.5; color: var(--fg); white-space: pre">{v.fileJson}</pre>
</div>
{(v.allResolved) && (<>
<div class="pop" style="display: flex; flex-direction: column; gap: 10px; padding: 12px 14px; border-radius: 14px; background: var(--accent-soft)">
<strong style="font-size: 14.5px">{v.pubText}</strong>
<button type="button" class="tap" onClick={v.publish} aria-disabled={v.pubDis} style={`min-height: 48px; border-radius: 999px; border: 0; background: ${v.pubBg}; color: var(--on-accent); font: inherit; font-weight: 700; cursor: pointer`}>{v.pubBtn}</button>
</div>
</>)}
</div>
</>)}

{(v.isChat) && (<>
<div class="scr" style="display: flex; flex-direction: column; gap: 10px">
<div><p style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)">PASO 5 · ASISTENTE</p><h2 style="margin: 2px 0 0; font-weight: 800; font-size: 23px; letter-spacing: -0.03em">Pregúntale a la documentación</h2></div>
<div role="group" aria-label="Cómo se pregunta" style="display: flex; padding: 3px; border-radius: 999px; border: 1px solid var(--line); background: var(--bg)">
<button type="button" class="tap" onClick={v.toLoose} aria-pressed={v.looseStr} style={`flex: 1; min-height: 44px; border: 0; border-radius: 999px; background: ${v.looseBg}; color: ${v.looseFg}; font: inherit; font-size: 13.5px; font-weight: 700; cursor: pointer`}>Pregunta suelta</button>
<button type="button" class="tap" onClick={v.toMethod} aria-pressed={v.methodStr} style={`flex: 1; min-height: 44px; border: 0; border-radius: 999px; background: ${v.methodBg}; color: ${v.methodFg}; font: inherit; font-size: 13.5px; font-weight: 700; cursor: pointer`}>Con método</button>
</div>
<div data-chatlog="1" role="log" aria-live="polite" style="height: 300px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding: 10px; border-radius: 14px; background: var(--bg); border: 1px solid var(--line); box-sizing: border-box">
{(v.noMsgs) && (<><p style="margin: auto; max-width: 260px; text-align: center; color: var(--muted); font-size: 13.5px">Elige una pregunta o escribe la tuya. Prueba la misma con y sin método.</p></>)}
{(v.msgs).map((m: any, m_i: number) => (<Fragment key={m_i}>
<div style={`align-self: ${m.align}; max-width: 90%; display: flex; flex-direction: column; gap: 5px; padding: 9px 11px; border-radius: ${m.radius}; background: ${m.bg}; color: ${m.fg}; border: 1px solid ${m.border}`}>
{(m.hasCtx) && (<><span style="align-self: flex-start; padding: 2px 7px; border-radius: 6px; background: rgba(0,0,0,.18); font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10px">+ contexto: {m.ctx}</span></>)}
{(m.lines).map((l: any, l_i: number) => (<Fragment key={l_i}>
<div class="pop" style={`display: flex; gap: 7px; align-items: baseline; padding: ${l.pad}; border-radius: 8px; background: ${l.bg}; color: ${l.col}; font-family: ${l.ff}; font-size: ${l.fs}px; font-weight: ${l.fw}; line-height: 1.4`}>
{(l.hasN) && (<><span style="flex: 0 0 20px; width: 20px; height: 20px; border-radius: 6px; background: var(--accent); color: var(--on-accent); display: inline-flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px">{l.n}</span></>)}
<span style="min-width: 0; overflow-wrap: anywhere">{l.t}</span>
</div>
</Fragment>))}
{(m.typing) && (<><span role="status" style="display: flex; gap: 4px; padding: 4px 2px"><span style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)">El asistente está escribiendo</span><span class="dot" aria-hidden="true"></span><span class="dot" aria-hidden="true" style="animation-delay: .15s"></span><span class="dot" aria-hidden="true" style="animation-delay: .3s"></span></span></>)}
</div>
</Fragment>))}
</div>
<div style="display: flex; flex-direction: column; gap: 6px">
{(v.sugg).map((q: any, q_i: number) => (<Fragment key={q_i}><button type="button" class="tap" onClick={q.ask} style="min-height: 44px; padding: 6px 12px; border-radius: 10px; border: 1px solid var(--line); background: var(--bg); color: var(--fg); font: inherit; font-size: 13.5px; font-weight: 600; text-align: left; cursor: pointer">{q.t}</button></Fragment>))}
</div>
<div style="display: flex; gap: 6px">
<label style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)" for="dqm">Tu pregunta</label>
<input id="dqm" class="field" type="text" value={v.draft} onInput={v.onDraft} onKeyDown={v.onKey} placeholder="Escribe tu pregunta…" autocomplete="off" style="flex: 1; min-width: 0; height: 46px" />
<button type="button" class="tap" onClick={v.sendDraft} style="min-height: 46px; padding: 0 16px; border-radius: 12px; border: 0; background: var(--accent); color: var(--on-accent); font: inherit; font-weight: 700; cursor: pointer">Enviar</button>
</div>
</div>
</>)}

{(v.isRadar) && (<>
<div class="scr" style="display: flex; flex-direction: column; gap: 12px">
<div><p style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)">PASO 6 · TU RADAR</p><h2 style="margin: 2px 0 0; font-weight: 800; font-size: 23px; letter-spacing: -0.03em">¿Qué hace tu equipo a mano?</h2></div>
<div role="group" aria-label="Tareas de tu equipo" style="display: flex; flex-direction: column; gap: 5px">
{(v.tasks).map((k: any, k_i: number) => (<Fragment key={k_i}>
<button type="button" class="tap" onClick={k.toggle} aria-pressed={k.pressed} style={`display: flex; align-items: center; gap: 9px; min-height: 44px; padding: 5px 11px; border-radius: 12px; border: 1.5px solid ${k.border}; background: ${k.bg}; color: var(--fg); font: inherit; font-size: 13.5px; font-weight: 600; text-align: left; cursor: pointer`}><span aria-hidden="true" style={`flex: 0 0 20px; width: 20px; height: 20px; border-radius: 6px; border: 2px solid ${k.box}; background: ${k.fill}; color: var(--on-accent); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; box-sizing: border-box`}>{k.mark}</span><span style="flex: 1">{k.t}</span><span aria-hidden="true" style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)">{k.n}</span></button>
</Fragment>))}
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 8px">
<div style="position: relative; flex: 0 0 220px; width: 220px; height: 220px">
<div aria-hidden="true" style="position: absolute; inset: 0; border-radius: 50%; background: var(--bg); border: 1px solid var(--line)"></div>
<div aria-hidden="true" style="position: absolute; inset: 17%; border-radius: 50%; border: 1px dashed var(--line)"></div>
<div aria-hidden="true" style="position: absolute; inset: 34%; border-radius: 50%; border: 1px dashed var(--line)"></div>
<div aria-hidden="true" style="position: absolute; inset: 45%; border-radius: 50%; background: var(--accent-soft); border: 1px solid var(--accent)"></div>
<div aria-hidden="true" class="sweepr" style="position: absolute; inset: 0; border-radius: 50%; background: conic-gradient(from 0deg, transparent 0deg 290deg, var(--sweep) 360deg)"></div>
{(v.rblips).map((b: any, b_i: number) => (<Fragment key={b_i}><button type="button" class="tap" onClick={b.pick} aria-label={b.aria} aria-pressed={b.pressed} style={`position: absolute; left: ${b.x}%; top: ${b.y}%; width: 44px; height: 44px; margin: -22px 0 0 -22px; border: 0; padding: 0; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center`}><span aria-hidden="true" style={`width: ${b.s}px; height: ${b.s}px; border-radius: 99px; background: ${b.c}; color: var(--on-accent); display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10px`}>{b.n}</span></button></Fragment>))}
</div>
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)">Cerca del centro: mejor oportunidad. Toca un punto para verla.</span>
</div>
<div role="status" style={`padding: 12px 14px; border-radius: 14px; border: 2px solid ${v.bestBorder}; background: var(--bg); display: flex; flex-direction: column; gap: 5px`}>
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px; color: var(--accent-text)">{v.bestK}</span>
<strong style="font-size: 16.5px; line-height: 1.25">{v.bestT}</strong>
<span style="font-size: 13.5px; color: var(--muted)">{v.bestS}</span>
{(v.hasBest) && (<><a href="/?para=clientes#contacto" style="align-self: flex-start; display: inline-flex; align-items: center; min-height: 44px; font-weight: 700; color: var(--accent-text); text-underline-offset: 5px">Cuéntame esta idea →</a></>)}
</div>
</div>
</>)}

</div>

{(v.showToast) && (<>
<div class="toast" role="status" style="position: absolute; left: 12px; right: 12px; top: 12px; z-index: 5; display: flex; align-items: center; gap: 8px; padding: 11px 14px; border-radius: 14px; background: var(--fg); color: var(--bg)">
<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="var(--accent)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>
<strong style="font-size: 13.5px">{v.toastText}</strong>
</div>
</>)}
</section>

<section style="padding: 0 16px 36px; display: flex; flex-direction: column; gap: 10px">
<a href="/?para=clientes#contacto" style="display: flex; align-items: center; justify-content: center; min-height: 54px; border-radius: 999px; background: var(--accent); color: var(--on-accent); text-decoration: none; font-weight: 600">Quiero algo así</a>
<button type="button" onClick={v.reset} style="min-height: 48px; border-radius: 999px; border: 1px solid var(--line); background: transparent; color: var(--fg); font: inherit; font-weight: 600; cursor: pointer">Reiniciar la demo</button>
<a href="/casos/automatizacion-y-asistente-ia/" style="display: flex; align-items: center; justify-content: center; min-height: 48px; text-decoration: none; font-weight: 600">Volver al caso</a>
</section>
</div>

      </>
    );
  }
}

export const Mobile = conTema(Logica);
