// @ts-nocheck
// Generado desde el tablero CasoBancaMovil y revisado a mano: lógica, textos y estilos tal cual.
import { Fragment } from 'preact';
import { DCLogic, conTema } from '../../lib/dclogic';
import { HoloDiferido } from '../../components/HoloDiferido';
import './Mobile.css';

class Logica extends DCLogic {

  inView(sel) {
    try { const el = document.querySelector(sel); if (!el) { return false; } const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < window.innerHeight; } catch (e) { return false; }
  }
  componentDidMount() {
    try { this.reduce = this.reduce || window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    let reduce = false;
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    this.reduce = reduce;
    this.check = () => {
      const h = window.innerHeight;
      const st = this.state || {};
      if (this.reduce) {
        if (!st.seenAll) { this.setState({ seenAll: true, seenDesk: true, seenStory: true, seenChat: true, seenGen: true, seenNums: true, cnt: 1, chatK: 20, genP: 1, genDone: true, genRan: true }); }
        return;
      }
      const upd = {};
      document.querySelectorAll('[data-seen]').forEach((el) => {
        const k = 'seen' + el.getAttribute('data-seen');
        const r = el.getBoundingClientRect();
        if (!st[k] && r.top < h * 0.75 && r.bottom > h * 0.1) { upd[k] = true; }
      });
      if (Object.keys(upd).length) { this.setState(upd); }
      if (upd.seenNums) { this.countUp(); }
      if (upd.seenChat) { this.revealChat(); }
      if (upd.seenGen && !st.genRan) { setTimeout(() => this.startGen(), 500); }
    };
    this.onScrollRaf = () => { if (this.rqS) { return; } this.rqS = requestAnimationFrame(() => { this.rqS = 0; this.check(); }); }; window.addEventListener('scroll', this.onScrollRaf, { capture: true, passive: true });
    window.addEventListener('resize', this.check);
    setTimeout(this.check, 300);
    this.check();
    this.formT = setInterval(() => { if (document.hidden || this.reduce) { return; }
      const s = this.state || {};
      if (!s.seenDesk || s.seenAll || this.reduce || !this.inView('[data-seen="Desk"]')) { return; }
      this.setState({ fk: (s.fk || 0) + 1 });
    }, 120);
    this.stT = setInterval(() => { if (document.hidden || this.reduce) { return; }
      const s = this.state || {};
      if (s.stTouched || !s.seenStory || this.reduce || (s.story || 0) >= 3 || !this.inView('[data-seen="Story"]')) { return; }
      this.setState({ story: (s.story || 0) + 1 });
    }, 6000);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollRaf, true); cancelAnimationFrame(this.rqS);
    window.removeEventListener('resize', this.check);
    clearInterval(this.formT); clearInterval(this.stT); clearInterval(this.chatT); clearInterval(this.genT); clearInterval(this.cntT);
  }
  countUp() {
    clearInterval(this.cntT);
    let k = 0;
    this.setState({ cnt: 0 });
    this.cntT = setInterval(() => { if (document.hidden || this.reduce) { return; } k += 1; const v = Math.min(1, k / 30); this.setState({ cnt: v }); if (v >= 1) { clearInterval(this.cntT); } }, 40);
  }
  revealChat() {
    clearInterval(this.chatT);
    if (this.reduce) { this.setState({ chatK: 20 }); return; }
    this.setState({ chatK: 0 });
    this.chatT = setInterval(() => { if (document.hidden || this.reduce) { return; }
      const s = this.state || {};
      const L = this.chatData(s.chatB ? 'b' : 'a').lines.length;
      const k = s.chatK || 0;
      if (k >= L) { clearInterval(this.chatT); return; }
      this.setState({ chatK: k + 1 });
    }, 280);
  }
  startGen() {
    clearInterval(this.genT);
    const t0 = Date.now();
    const dur = 3800;
    this.setState({ genP: 0, genDone: false, genRan: true });
    this.genT = setInterval(() => { if (document.hidden || this.reduce) { return; }
      const p = Math.min(1, (Date.now() - t0) / dur);
      const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      this.setState({ genP: e, genDone: p >= 1 });
      if (p >= 1) { clearInterval(this.genT); }
    }, 80);
  }
  chatData(m) {
    if (m === 'b') {
      return {
        q: [
          { k: 'CONTEXTO', t: 'Origen SFTP con un CSV diario de 40 columnas. Destino: lago de datos, capa bruta. Carga a las 06:00.' },
          { k: 'LO QUE NECESITO', t: 'Los pasos en orden, una configuración de ejemplo y cómo validarla.' },
          { k: 'REGLA', t: 'Si falta un dato, pregúntamelo antes de seguir.' }
        ],
        note: 'La misma duda, con todo lo que el asistente necesita saber.',
        lines: [
          { n: '1', t: 'Crea el esquema con las 40 columnas: tipo de cada una y si admite vacíos.' },
          { n: '2', t: 'Define el objeto de origen: ruta, patrón del fichero y separador «;».' },
          { n: '3', t: 'Define el objeto de destino en la capa bruta del lago de datos.' },
          { n: '4', t: 'Crea la transferencia que los une y prográmala a las 06:00.' },
          { code: true, t: '"frecuencia": "diaria", "hora": "06:00"' },
          { n: '5', t: 'Valídala: lanza un fichero de prueba y compara el número de filas.' },
          { src: true, t: 'Fuentes: guía de usuario §4.2 y §5.1 (documentación ficticia)' },
          { ask: true, t: 'Antes de seguir: ¿el fichero trae cabecera?' }
        ]
      };
    }
    return {
      q: [{ t: '¿Cómo creo una transferencia?' }],
      note: 'Así se usaba: como un buscador.',
      lines: [
        { t: 'Las transferencias permiten mover datos entre sistemas de origen y de destino.' },
        { t: 'Para crear una, consulte la sección «Transferencias» de la guía de usuario, donde se describen los tipos de origen y destino disponibles.' },
        { muted: true, t: 'Correcto, pero no dice qué hacer en tu caso.' }
      ]
    };
  }
  renderVals() {
    const s = this.state || {};
    const dark = s.dark !== undefined ? s.dark : (this.props.dark ?? true);
    const night = { bg: '#0B0B0C', fg: '#F2F0EB', muted: '#A09D96', line: '#29292B', panel: '#141415', inner: '#202022', accent: '#FF5B2E', accentText: '#FF7A55', accentSoft: 'rgba(255,91,46,0.14)', onAccent: '#0B0B0C', paper: '#EDEAE3', paperFg: '#1A1A1A', paperLine: '#CFCAC0', paperMuted: '#5E5A52', bubble: '#26262A', sweep: 'rgba(255,91,46,0.30)', accentOnFg: '#B8350F' };
    const light = { bg: '#F3F1EC', fg: '#111111', muted: '#55524C', line: '#DAD6CC', panel: '#FFFFFF', inner: '#ECE9E2', accent: '#B8350F', accentText: '#B8350F', accentSoft: 'rgba(184,53,15,0.10)', onAccent: '#FFFFFF', paper: '#FFFFFF', paperFg: '#1A1A1A', paperLine: '#DCD8CF', paperMuted: '#5E5A52', bubble: '#FFFFFF', sweep: 'rgba(184,53,15,0.22)', accentOnFg: '#FF7A55' };
    const t = dark ? night : light;
    const IC = {
      repeat: 'M17 2l4 4-4 4 M3 11V9a3 3 0 0 1 3-3h15 M7 22l-4-4 4-4 M21 13v2a3 3 0 0 1-3 3H3',
      warn: 'M12 9v4 M12 17h.01 M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
      heads: 'M9 11a4 4 0 1 0 0-8a4 4 0 0 0 0 8z M2 21c1-4 4-6 7-6s6 2 7 6 M17 11a3 3 0 1 0 0-6 M22 21c-.5-3-2-4.5-4-5',
      book: 'M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4z M20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z'
    };
    const fk = s.seenAll ? 30 : (s.fk || 0);
    const FV = (n) => [['Nombre', 'ing_cuentas_' + String(n).padStart(4, '0')], ['Origen', 'SFTP · /entrada/cuentas/'], ['Formato', 'CSV · separador ;'], ['Destino', 'Lago de datos · bruta'], ['Frecuencia', 'Diaria · 06:00']];
    const totalC = FV(1).reduce((a, f) => a + f[1].length, 0);
    const cycle = Math.ceil(totalC / 3) + 12;
    const formN = Math.min(412, 37 + Math.floor(fk / cycle));
    let typed = (fk % cycle) * 3;
    let activeSet = false;
    const formFields = FV(formN).map((f) => {
      const take = Math.max(0, Math.min(f[1].length, typed));
      typed -= f[1].length;
      const active = !activeSet && take < f[1].length;
      if (active) { activeSet = true; }
      return { l: f[0], v: f[1].slice(0, take), active, border: active ? t.accent : t.paperLine };
    });
    const secs = 8076 + Math.floor(fk * 1.2);
    const pad = (x) => String(x).padStart(2, '0');
    const clock = pad(Math.floor(secs / 3600)) + ':' + pad(Math.floor((secs % 3600) / 60)) + ':' + pad(secs % 60);
    const bi = Math.floor(fk / 25) % 3;
    const BB = [
      { t: '¿Cómo se configuraba un origen nuevo?', i: 'M', av: '#FFE38A', align: 'flex-start' },
      { t: 'Copia la de ayer y cambia el nombre', i: 'J', av: '#CDE7FF', align: 'flex-end' },
      { t: 'Me quedan 300. Hasta el viernes no salgo', i: 'L', av: '#FFC9D6', align: 'flex-start' }
    ];
    const bubbles = BB.map((b, i) => { const on = s.seenAll || this.reduce || i === bi; return Object.assign({}, b, { blur: 0, o: on ? 1 : 0.8 }); });
    const SD = [
      { k: 'La petición', wasK: 'lo que pedían', was: 'Un asistente generativo que configure en masa cientos de ingestas.', now: 'Un modelo generativo no garantiza cientos de configuraciones exactas. Para eso hace falta código.', det: 'Decir que no a la idea tal cual fue el primer paso. La intención, ahorrar horas, era buena: había que llevarla a otro sitio.', shape: 'cloud', label: 'petición borrosa' },
      { k: 'Lo que ya había', wasK: 'cómo se usaba', was: 'Un asistente documental con toda la documentación de la herramienta, usado como un buscador.', now: 'Bien preguntado, podía guiar el desarrollo paso a paso.', det: 'No había que comprar nada. Había que aprender a pedirle.', shape: 'sphere', label: 'asistente documental' },
      { k: 'Lo que se repetía', wasK: 'cómo se hacía', was: 'Cientos de configuraciones casi iguales, hechas a mano una a una.', now: 'Con un inventario y unas plantillas, un programa las genera todas de golpe.', det: 'Siempre iguales, sin errores de copia y en segundos.', shape: 'grid', label: 'estructura' },
      { k: 'Lo que nadie veía', wasK: 'dónde estaba', was: 'El conocimiento, en la cabeza de dos personas.', now: 'Convertirlo en método y enseñárselo al equipo.', det: 'Lo que funciona para uno se queda en anécdota si no se enseña.', shape: 'radar', label: 'oportunidades' }
    ];
    const story = s.story || 0;
    const sd = SD[story];
    const goSt = (i) => this.setState({ story: (i + 4) % 4, stTouched: true, stK: Date.now() });
    const BL = [
      { name: 'Configurar en masa con IA generativa', short: 'la petición', verdict: 'Descartada tal cual', ok: false, r: 0.72, a: 300, sc: [95, 90, 20, 80], text: 'La necesidad era real; la herramienta, no. Un error inventado en una de cientos de configuraciones no avisa. Pasa al generador.' },
      { name: 'Generador de configuraciones', short: 'generador', verdict: 'Prototipo · código', ok: true, r: 0.2, a: 40, sc: [95, 92, 85, 92], text: 'Lo repetitivo y exacto lo hace el código: siempre igual y en segundos. Eficiencia estimada del 90 % frente a hacerlo a mano.' },
      { name: 'Asistente documental con método', short: 'asistente', verdict: 'Prototipo · IA y persona', ok: true, r: 0.38, a: 150, sc: [70, 60, 80, 70], text: 'Dudas, incidencias y casos nuevos: la IA guía paso a paso, cita la documentación y la persona valida.' },
      { name: 'Formación interna en IA', short: 'formación', verdict: 'Hecha · para el equipo', ok: true, r: 0.55, a: 228, sc: [60, 55, 90, 65], text: 'El método se convirtió en una formación sobre el uso de IA y la detección de oportunidades de mejora.' },
      { name: 'Aprobar lo que se publica', short: 'aprobación', verdict: 'Se queda en la persona', ok: false, r: 0.72, a: 100, sc: [50, 40, 25, 30], text: 'Lo que cuesta caro si sale mal lo decide una persona. La IA y el código preparan; la persona aprueba.' }
    ];
    const bix = s.blip === undefined ? 1 : s.blip;
    const blips = BL.map((b, i) => {
      const rad = (b.a * Math.PI) / 180;
      const x = 50 + Math.sin(rad) * b.r * 46, y = 50 - Math.cos(rad) * b.r * 46;
      const on = i === bix;
      const right = Math.sin(rad) >= 0;
      return { name: b.name, short: b.short, x: x.toFixed(1), y: y.toFixed(1), lx: (x + (right ? 6 : -6)).toFixed(1), ly: y.toFixed(1), tx: right ? '0' : '-100%', c: b.ok ? t.accent : t.muted, lc: on ? t.fg : t.muted, s: on ? 18 : 13, ring: on ? 4 : 0, ring2: on ? 6 : 0, pressed: on ? 'true' : 'false', pick: () => this.setState({ blip: i }) };
    });
    const B = BL[bix];
    const words = (v) => (v >= 80 ? 'alta' : v >= 55 ? 'media' : 'baja');
    const bl = { name: B.name, verdict: B.verdict, text: B.text, tagCls: B.ok ? '' : 'mut', border: B.ok ? t.accent : t.line,
      bars: [['Se repite', B.sc[0]], ['Reglas claras', B.sc[1]], ['Error controlable', B.sc[2]], ['Tiempo que devuelve', B.sc[3]]].map((x) => ({ l: x[0], v: x[1], word: words(x[1]), c: B.ok ? t.accent : t.muted })) };
    const chatB = !!s.chatB;
    const cd = this.chatData(chatB ? 'b' : 'a');
    const ck = s.chatK || 0;
    const chatLines = cd.lines.slice(0, ck).map((l) => {
      const base = { t: l.t, n: l.n || '', hasN: !!l.n, pad: '4px 4px', bg: 'transparent', col: t.fg, ff: 'Inter, sans-serif', fs: 14.5, fw: 500 };
      if (l.code) { return Object.assign(base, { ff: "'IBM Plex Mono', ui-monospace, monospace", fs: 12, bg: t.inner, pad: '8px 10px' }); }
      if (l.src) { return Object.assign(base, { ff: "'IBM Plex Mono', ui-monospace, monospace", fs: 11.5, col: t.muted }); }
      if (l.ask) { return Object.assign(base, { bg: t.accentSoft, col: t.accentText, fw: 700, pad: '8px 10px' }); }
      if (l.muted) { return Object.assign(base, { col: t.muted, fs: 13.5, fw: 600 }); }
      return base;
    });
    const genP = s.genP || 0;
    const ln = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const built = Math.round(412 * genP);
    const tiles = [];
    for (let i = 0; i < 60; i++) { tiles.push({ bg: i < Math.round(60 * genP) ? t.accent : t.inner }); }
    const hotRow = s.genDone || !s.genRan ? -1 : Math.floor((genP * 16) % 4);
    const inv = [['cuentas', 'SFTP', 'diaria'], ['movimientos', 'SFTP', 'diaria'], ['tarjetas', 'base de datos', 'diaria'], ['saldos', 'base de datos', 'mensual']].map((r, i) => ({ a: r[0], b: r[1], c: r[2], bg: i === hotRow ? t.accentSoft : 'transparent' }));
    const genCount = [[built, 'esquemas'], [built * 2, 'objetos'], [built, 'transferencias'], [built * 4, 'ficheros en total']].map((g, i) => ({ v: ln(g[0]), l: g[1], c: i === 3 ? t.accentText : t.fg, border: i === 3 ? t.accent : t.line }));
    const vol = s.vol || 300;
    const sl = s.sl === undefined ? 0 : s.sl;
    const a = sl / 100;
    const manual = (vol * 20) / 60;
    const est = manual * (1 - 0.9 * a);
    const fmtH = (h) => (h >= 10 ? ln(h) : h.toFixed(1).replace('.', ','));
    const done = Math.round(a * 20);
    const icons = [];
    for (let i = 0; i < 20; i++) { const on = i < done; icons.push({ bg: on ? t.accent : 'transparent', border: on ? t.accent : t.line, line: on ? t.onAccent : t.muted }); }
    const cnt = s.cnt === undefined ? 1 : s.cnt;
    const e3 = 1 - Math.pow(1 - cnt, 3);
    return {
      t, dark, darkStr: dark ? 'true' : 'false', holoS: 300, no: false, yes: true, one: 1,
      modeLabel: dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro',
      toggle: () => this.setState({ dark: !dark }),
      formN, formFields, clock, bubbles,
      pains: [
        { title: 'Se repite cientos de veces', text: 'Casi igual cada vez: cambia un nombre, una ruta, una fecha.', icon: IC.repeat },
        { title: 'Un error al copiar sale caro', text: 'Un campo mal pegado no avisa: se descubre cuando falla la carga.', icon: IC.warn },
        { title: 'El saber está en dos cabezas', text: 'Las mismas dudas llegan siempre a las mismas personas.', icon: IC.heads },
        { title: 'La documentación está, pero no ayuda', text: 'Cientos de páginas que se consultan como un buscador, a ciegas.', icon: IC.book }
      ],
      st: { n: String(story + 1).padStart(2, '0'), k: sd.k, wasK: sd.wasK, was: sd.was, now: sd.now, det: sd.det },
      stGo: s.seenStory || s.seenAll ? (story % 2 ? 'goB' : 'goA') : '',
      storyShape: sd.shape, storyLabel: sd.label,
      storyDots: SD.map((d, i) => ({ bg: i <= story ? t.accent : t.line, aria: 'Paso ' + (i + 1) + ': ' + d.k, cur: i === story ? 'step' : 'false', go: () => goSt(i) })),
      prevSt: () => goSt(story - 1), nextSt: () => goSt(story + 1),
      blips, bl,
      toA: () => { this.setState({ chatB: false }); setTimeout(() => this.revealChat(), 0); },
      toB: () => { this.setState({ chatB: true }); setTimeout(() => this.revealChat(), 0); },
      aStr: chatB ? 'false' : 'true', bStr: chatB ? 'true' : 'false',
      aBg: chatB ? 'transparent' : t.fg, aFg: chatB ? t.fg : t.bg, bBg: chatB ? t.accent : 'transparent', bFg: chatB ? t.onAccent : t.fg,
      chatQ: cd.q.map((q) => ({ k: q.k || '', hasK: !!q.k, t: q.t })), chatNote: cd.note, chatLines, chatBorder: chatB ? t.accent : t.line,
      method: [
        { n: '01', t: 'Contexto completo', s: 'Origen, destino, formato, volumen y restricciones.', c: chatB ? t.accent : t.line },
        { n: '02', t: 'Pregunta con plantilla', s: 'Qué necesitas y en qué orden, siempre igual.', c: chatB ? t.accent : t.line },
        { n: '03', t: 'Guía que se valida', s: 'Pasos, ejemplo, cómo comprobarlo y qué falta.', c: chatB ? t.accent : t.line }
      ],
      inv, tiles, genCount,
      genStatus: s.genDone ? 'Listo: 1.648 ficheros en 3,8 segundos · 0 errores de copia.' : s.genRan ? 'Generando… ' + ln(built) + ' de 412 ingestas' : 'Preparado para generar 412 ingestas.',
      genBtn: s.genDone ? 'Generar otra vez' : s.genRan ? 'Generando…' : 'Generar 412 ingestas',
      runGen: () => this.startGen(),
      milestones: [
        { n: '01', t: 'Prototipo del método', s: 'Contexto completo, preguntas con plantilla y guías paso a paso sobre el asistente documental.' },
        { n: '02', t: 'Formación interna', s: 'El método se convirtió en una formación para el equipo sobre el uso de IA y la detección de oportunidades.' },
        { n: '03', t: 'Asistente de cada día', s: 'Hoy lo uso a diario como experto de la plataforma para resolver dudas e incidencias.' },
        { n: '04', t: 'Generador en Python', s: 'Prototipo que genera esquemas, objetos y transferencias en masa: 90 % de eficiencia estimada.' }
      ],
      vols: [50, 300, 1000].map((v) => ({ l: ln(v), pressed: v === vol ? 'true' : 'false', bg: v === vol ? t.fg : 'transparent', fg: v === vol ? t.bg : t.fg, border: v === vol ? t.fg : t.line, pick: () => this.setState({ vol: v }) })),
      sl, manH: fmtH(manual), slH: fmtH(est), icons,
      slMsg: sl < 34 ? 'La persona lo hace todo: copiar, pegar, revisar y volver a empezar.' : sl < 85 ? 'El generador hace una parte; el resto sigue siendo copiar y pegar.' : 'El generador hace lo repetitivo. La persona revisa y aprueba.',
      slText: sl + ' % automatizado: ' + fmtH(est) + ' horas frente a ' + fmtH(manual) + ' a mano',
      onSl: (e) => this.setState({ sl: Number(e.target.value) }),
      numsCls: s.seenNums ? 'go' : '',
      nums: [
        { v: Math.round(90 * e3), u: ' %', title: 'Eficiencia estimada', text: 'Del generador frente a la construcción manual.', d: 0 },
        { v: Math.round(3 * e3), u: ' tipos', title: 'De configuración, en masa', text: 'Esquemas, objetos y transferencias, desde un inventario.', d: 0.15 },
        { v: Math.round(1 * e3), u: ' formación', title: 'Interna, para el equipo', text: 'Sobre el uso de IA y la detección de oportunidades.', d: 0.3 },
        { v: 0, u: ' licencias', title: 'Nuevas que comprar', text: 'Se aprovechó el asistente que ya existía.', d: 0.45 }
      ],
      proto: [
        { t: 'Scripts en Python que leen un inventario y escriben las configuraciones' },
        { t: 'Un método para preguntar al asistente documental que ya existía' },
        { t: 'Una formación interna para el equipo' },
        { t: 'Sin implantar de forma masiva' },
        { t: 'Eficiencia estimada, no medida en producción' }
      ],
      prod: [
        { t: 'Conectado a tu herramienta o a su API' },
        { t: 'Validación automática antes de publicar nada' },
        { t: 'Una interfaz para que el equipo lo use sin tocar código' },
        { t: 'Registro de qué se generó y quién lo aprobó' },
        { t: 'Asistente con tu documentación y tus casos reales' },
        { t: 'Formación y método para tu equipo' },
        { t: 'Y lo que tu caso necesite, si es viable' }
      ],
      line3: [
        { n: '01 · Tú traes', title: 'Lo que se repite', text: 'Aunque no sepas si se puede automatizar. Con eso basta.', bg: 'transparent', fg: t.fg, border: t.line, numColor: t.muted },
        { n: '02 · Yo lo enfoco', title: 'La oportunidad real', text: 'Miro el proceso entero y decido qué hace el código, qué la IA y qué la persona.', bg: t.accent, fg: t.onAccent, border: t.accent, numColor: t.onAccent },
        { n: '03 · Te llevas', title: 'Generador, asistente o los dos', text: 'Primero un prototipo para demostrarlo; después, en producción si lo necesitas.', bg: t.fg, fg: t.bg, border: t.fg, numColor: t.accentOnFg }
      ],
      uses: [{ t: 'Altas y configuraciones masivas' }, { t: 'Migraciones de datos' }, { t: 'Soporte con tu documentación' }, { t: 'Documentos repetitivos' }, { t: 'Formación en IA para equipos' }]
    };
  }

  render() {
    const v = this.renderVals();
    return (
      <>
<div class="movil-raiz caso" style=" min-height: 844px; background: var(--bg); color: var(--fg); font-family: Inter, 'Helvetica Neue', Arial, sans-serif; font-size: 16px; line-height: 1.5; overflow-x: clip; position: relative">

<header style="position: sticky; top: 0; z-index: 50; background: var(--bg); border-bottom: 1px solid var(--line); padding: 6px 12px 6px 6px; display: flex; align-items: center; justify-content: space-between; gap: 8px">
<a href="/#casos" style="display: inline-flex; align-items: center; min-height: 44px; padding: 0 10px; font-weight: 600; text-decoration: none">← Volver</a>
<span style="font-weight: 800; font-size: 16px; letter-spacing: -0.02em">Alberto Cabello<span style="color: var(--accent)">.</span></span>
<button type="button" onClick={v.toggle} aria-label={v.modeLabel} style="display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 999px; border: 1px solid var(--line); background: transparent; color: var(--fg); cursor: pointer"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"></circle><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"></path></svg></button>
</header>
<main>

<section style="padding: 36px 16px 32px; display: flex; flex-direction: column; gap: 18px">
<p class="fade" style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--accent-text)">Caso 03 · Automatización y asistentes IA</p>
<h1 style="margin: 0; font-weight: 800; font-size: 44px; line-height: 0.96; letter-spacing: -0.05em">
<span class="ln"><span class="w">Me</span> <span class="w" style="animation-delay: .08s">pidieron</span></span>
<span class="ln"><span class="w" style="animation-delay: .16s">automatizar.</span></span>
<span class="ln"><span class="w" style="animation-delay: .3s; color: var(--accent-text)">Vi</span> <span class="w" style="animation-delay: .38s; color: var(--accent-text)">algo</span> <span class="w" style="animation-delay: .46s; color: var(--accent-text)">mejor.</span></span>
</h1>
<p class="fade" style="margin: 0; font-size: 17px; line-height: 1.42">En una entidad bancaria internacional, un equipo de datos configuraba a mano, una a una, cientos de ingestas casi iguales. La petición fue automatizarlo con un asistente generativo. Mirando el proceso entero vi dos oportunidades mejores: <strong>exprimir el asistente documental que ya existía</strong> y <strong style="color: var(--accent-text)">un generador que hace en segundos el trabajo de días, con un 90 % de eficiencia estimada</strong>.</p>
<div class="fade" style="display: flex; flex-wrap: wrap; gap: 8px">
<span class="tag">Enfoque · Detección de oportunidades</span>
<span class="tag mut">Entidad anónima · herramientas y datos ficticios</span>
</div>
<a href="/casos/automatizacion-y-asistente-ia/demo/" class="fade pulse" style="display: flex; align-items: center; justify-content: center; min-height: 54px; border-radius: 999px; background: var(--accent); color: var(--on-accent); text-decoration: none; font-weight: 600">Probar la demo →</a>
<nav class="fade hsc" aria-label="Capítulos" style="margin: 0 -16px; padding: 0 16px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 13px">
<a href="#problema" style="display: inline-flex; align-items: center; min-height: 44px; padding: 0 14px; border-radius: 999px; border: 1px solid var(--line); text-decoration: none">01 El problema</a>
<a href="#vi" style="display: inline-flex; align-items: center; min-height: 44px; padding: 0 14px; border-radius: 999px; border: 1px solid var(--line); text-decoration: none">02 Lo que vi</a>
<a href="#solucion" style="display: inline-flex; align-items: center; min-height: 44px; padding: 0 14px; border-radius: 999px; border: 1px solid var(--line); text-decoration: none">03 La solución</a>
<a href="#cambio" style="display: inline-flex; align-items: center; min-height: 44px; padding: 0 14px; border-radius: 999px; border: 1px solid var(--line); text-decoration: none">04 El cambio</a>
</nav>
</section>

<section id="problema" style="border-top: 1px solid var(--line); padding: 48px 16px; scroll-margin-top: 60px">
<p style="margin: 0 0 12px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)">01 — El problema</p>
<h2 style="margin: 0 0 14px; font-weight: 800; font-size: 32px; line-height: 1.02; letter-spacing: -0.045em">Lo que llega: «esto lo hacemos a mano. <span style="color: var(--muted)">¿Se puede automatizar?»</span></h2>
<p style="margin: 0 0 22px; color: var(--muted)">Pasa en casi cualquier equipo: un trabajo que se repite cientos de veces, casi igual cada vez, que solo dominan dos personas y que nadie quiere hacer. En este caso, dar de alta una a una las ingestas de datos en una herramienta low-code.</p>
<div data-seen="Desk" role="img" aria-label={`Un formulario de configuración que se rellena a mano una y otra vez, la número ${v.formN} de 412, mientras llegan mensajes del equipo con dudas repetidas`} style="position: relative; padding: 14px; border-radius: 22px; border: 1px dashed var(--line); background: var(--panel); display: flex; flex-direction: column; gap: 12px">
<span aria-hidden="true" class="tag solid" style="align-self: flex-start"><span style="width: 7px; height: 7px; border-radius: 99px; background: var(--accent)"></span>{v.clock} · copiando y pegando</span>
<div aria-hidden="true" style="border-radius: 14px; background: var(--paper); color: var(--paper-fg); border: 1px solid var(--line); overflow: hidden">
<div style="display: flex; justify-content: space-between; gap: 8px; padding: 10px 14px; border-bottom: 1px solid var(--paper-line); font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11.5px; color: var(--paper-muted)"><span>Nueva ingesta</span><strong style="color: var(--paper-fg)">{v.formN} de 412</strong></div>
<div style="display: flex; flex-direction: column; gap: 8px; padding: 12px 14px">
{(v.formFields).map((f: any, f_i: number) => (<Fragment key={f_i}>
<div style="display: grid; grid-template-columns: 74px minmax(0, 1fr); gap: 8px; align-items: center">
<span style="font-size: 11px; font-weight: 600; color: var(--paper-muted)">{f.l}</span>
<span style={`display: flex; align-items: center; min-height: 28px; padding: 0 8px; border-radius: 7px; border: 1.5px solid ${f.border}; background: #FFFFFF; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11.5px; color: #1A1A1A; white-space: nowrap; overflow: hidden`}>{f.v}{(f.active) && (<><span class="caret"></span></>)}</span>
</div>
</Fragment>))}
</div>
</div>
<div aria-hidden="true" style="display: flex; flex-direction: column; gap: 8px">
{(v.bubbles).map((b: any, b_i: number) => (<Fragment key={b_i}>
<div class="bub" style={`align-self: ${b.align}; max-width: 82%; display: flex; align-items: flex-end; gap: 8px; filter: blur(${b.blur}px); opacity: ${b.o}`}>
<span style={`flex: 0 0 26px; width: 26px; height: 26px; border-radius: 99px; background: ${b.av}; color: #1A1A1A; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 12px`}>{b.i}</span>
<span style="padding: 9px 12px; border-radius: 14px 14px 14px 4px; background: var(--bubble); font-size: 14px; font-weight: 600; line-height: 1.25">{b.t}</span>
</div>
</Fragment>))}
</div>
</div>
<div style="display: flex; flex-direction: column; gap: 10px; margin-top: 14px">
{(v.pains).map((p: any, p_i: number) => (<Fragment key={p_i}>
<div class="rv" style="padding: 16px; border-radius: 18px; border: 1px solid var(--line); display: grid; grid-template-columns: 40px minmax(0, 1fr); gap: 2px 12px">
<span style="grid-row: span 2; width: 40px; height: 40px; border-radius: 11px; background: var(--inner); display: flex; align-items: center; justify-content: center"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d={p.icon}></path></svg></span>
<strong style="font-weight: 800; font-size: 18px; line-height: 1.15; letter-spacing: -0.02em">{p.title}</strong>
<span style="color: var(--muted); font-size: 15px">{p.text}</span>
</div>
</Fragment>))}
</div>
<p class="rv" style="margin: 28px 0 0; font-weight: 800; font-size: 30px; line-height: 1.02; letter-spacing: -0.045em">Muchas horas copiando. <span style="color: var(--accent-text)">Ninguna pensando.</span></p>
</section>

<section id="vi" style="background: var(--panel); padding: 52px 16px; scroll-margin-top: 60px">
<p style="margin: 0 0 12px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)">02 — Lo que vi</p>
<h2 style="margin: 0 0 14px; font-weight: 800; font-size: 34px; line-height: 1; letter-spacing: -0.045em">Me pidieron una cosa. <span style="color: var(--accent-text)">Vi tres oportunidades.</span></h2>
<p style="margin: 0 0 20px; color: var(--muted)">La petición llegó así: «haz un asistente que lo configure todo en masa». Antes de construir nada, miré el proceso entero. Pasa los pasos: el holograma toma la forma de lo que fui viendo.</p>
<div data-seen="Story" style="display: flex; flex-direction: column; gap: 12px">
<div class={`pc ${v.stGo}`} style="min-height: 238px; padding: 18px 16px; border-radius: 20px; background: var(--bg); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 10px; box-sizing: border-box">
<span class="tag" style="align-self: flex-start">{v.st.n} · {v.st.k}</span>
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)">{v.st.wasK}</span>
<span style="font-size: 16px; line-height: 1.35"><span class="was" style="color: var(--muted); -webkit-box-decoration-break: clone; box-decoration-break: clone">{v.st.was}</span></span>
<strong class="now" style="font-weight: 800; font-size: 23px; line-height: 1.08; letter-spacing: -0.03em">{v.st.now}</strong>
<span class="now" style="color: var(--muted); font-size: 14.5px">{v.st.det}</span>
</div>
<div style="position: relative; height: 300px; border-radius: 20px; border: 1px solid var(--line); background: var(--bg); overflow: hidden; display: flex; align-items: center; justify-content: center">
<div data-holo-cfg="1" data-shape={v.storyShape} data-level="1" data-dark={v.darkStr} data-lite="true" style="width: 300px; height: 300px"><HoloDiferido shape={v.storyShape} level={v.one} dark={v.dark} size={v.holoS} lite={v.yes} backdrop={v.no} frame={v.no} /></div>
<span class="tag solid" style="position: absolute; left: 12px; top: 12px">enfoque · {v.storyLabel}</span>
</div>
<div style="display: flex; align-items: center; justify-content: space-between; gap: 10px">
<button type="button" onClick={v.prevSt} aria-label="Paso anterior" style="width: 48px; height: 48px; border-radius: 999px; border: 1px solid var(--line); background: transparent; color: var(--fg); cursor: pointer; font: inherit; font-size: 18px">←</button>
<span role="group" aria-label="Pasos" style="display: flex; gap: 4px">
{(v.storyDots).map((d: any, d_i: number) => (<Fragment key={d_i}><button type="button" onClick={d.go} aria-label={d.aria} aria-current={d.cur} style="width: 44px; height: 44px; border: 0; padding: 0; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center"><span style={`width: 26px; height: 5px; border-radius: 99px; background: ${d.bg}`}></span></button></Fragment>))}
</span>
<button type="button" onClick={v.nextSt} aria-label="Paso siguiente" style="width: 48px; height: 48px; border-radius: 999px; border: 0; background: var(--accent); color: var(--on-accent); cursor: pointer; font: inherit; font-size: 18px">→</button>
</div>
</div>

<h3 style="margin: 52px 0 10px; font-weight: 800; font-size: 30px; line-height: 1; letter-spacing: -0.04em">Así miro un proceso: <span style="color: var(--accent-text)">el radar de oportunidades.</span></h3>
<p style="margin: 0 0 18px; color: var(--muted)">Cada idea pasa por las mismas preguntas: ¿se repite?, ¿tiene reglas claras?, ¿qué pasa si sale mal?, ¿cuánto tiempo devuelve? Cuanto más cerca del centro, mejor oportunidad. Toca cada punto.</p>
<div style="position: relative; width: 100%; max-width: 330px; aspect-ratio: 1; margin: 0 auto">
<div aria-hidden="true" style="position: absolute; inset: 0; border-radius: 50%; background: var(--bg); border: 1px solid var(--line)"></div>
<div aria-hidden="true" style="position: absolute; inset: 16.5%; border-radius: 50%; border: 1px dashed var(--line)"></div>
<div aria-hidden="true" style="position: absolute; inset: 33%; border-radius: 50%; border: 1px dashed var(--line)"></div>
<div aria-hidden="true" style="position: absolute; inset: 44%; border-radius: 50%; background: var(--accent-soft); border: 1px solid var(--accent)"></div>
<div aria-hidden="true" class="sweepr" style="position: absolute; inset: 0; border-radius: 50%; background: conic-gradient(from 0deg, transparent 0deg 290deg, var(--sweep) 360deg)"></div>
{(v.blips).map((b: any, b_i: number) => (<Fragment key={b_i}>
<button type="button" onClick={b.pick} aria-pressed={b.pressed} aria-label={b.name} style={`position: absolute; left: ${b.x}%; top: ${b.y}%; width: 44px; height: 44px; margin: -22px 0 0 -22px; border: 0; padding: 0; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center`}>
<span aria-hidden="true" style={`width: ${b.s}px; height: ${b.s}px; border-radius: 99px; background: ${b.c}; box-shadow: 0 0 0 ${b.ring}px var(--bg), 0 0 0 ${b.ring2}px ${b.c}`}></span>
</button>
<span aria-hidden="true" style={`position: absolute; left: ${b.lx}%; top: ${b.ly}%; transform: translate(${b.tx}, -50%); font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px; color: ${b.lc}; white-space: nowrap; pointer-events: none`}>{b.short}</span>
</Fragment>))}
</div>
<div style={`margin-top: 14px; padding: 18px 16px; border-radius: 20px; background: var(--bg); border: 1px solid ${v.bl.border}; display: flex; flex-direction: column; gap: 12px`}>
<span class={`tag ${v.bl.tagCls}`} style="align-self: flex-start">{v.bl.verdict}</span>
<strong style="font-weight: 800; font-size: 22px; line-height: 1.08; letter-spacing: -0.03em">{v.bl.name}</strong>
<div style="display: flex; flex-direction: column; gap: 8px">
{(v.bl.bars).map((x: any, x_i: number) => (<Fragment key={x_i}>
<div style="display: flex; flex-direction: column; gap: 3px">
<span style="display: flex; justify-content: space-between; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11.5px; color: var(--muted)"><span>{x.l}</span><span>{x.word}</span></span>
<span style="height: 7px; border-radius: 99px; background: var(--inner)"><span class="bar" style={`display: block; height: 7px; width: ${x.v}%; border-radius: 99px; background: ${x.c}`}></span></span>
</div>
</Fragment>))}
</div>
<p style="margin: 0; font-size: 15px; line-height: 1.45">{v.bl.text}</p>
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)">Valoración cualitativa, no una medición.</span>
</div>
<p class="rv" style="margin: 36px 0 0; font-weight: 800; font-size: 30px; line-height: 1.04; letter-spacing: -0.045em">No me quedo en la petición. <span style="color: var(--accent-text)">Busco la oportunidad.</span></p>
</section>

<section id="solucion" style="padding: 52px 16px; scroll-margin-top: 60px">
<p style="margin: 0 0 12px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)">03 — La solución</p>
<h2 style="margin: 0 0 14px; font-weight: 800; font-size: 34px; line-height: 1; letter-spacing: -0.045em">Dos piezas. <span style="color: var(--muted)">Ninguna herramienta nueva.</span></h2>
<p style="margin: 0 0 20px; color: var(--muted)">Aprovechar lo que ya existía y escribir código solo donde hace falta exactitud. Lo exacto, para el código. Lo dudoso, para el asistente. Lo importante, para la persona.</p>

<div data-seen="Chat" style="padding: 18px 14px; border-radius: 22px; background: var(--panel); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 14px">
<p style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--accent-text)">A · el asistente que ya existía</p>
<h3 style="margin: 0; font-weight: 800; font-size: 28px; line-height: 1; letter-spacing: -0.04em">De buscador <span style="color: var(--accent-text)">a copiloto.</span></h3>
<p style="margin: 0; color: var(--muted); font-size: 15px">El equipo ya tenía un asistente con toda la documentación de la herramienta, pero le preguntaba como a un buscador. Con un método (contexto completo, pregunta con plantilla y respuesta que se valida) pasa a guiar el trabajo paso a paso.</p>
<div role="group" aria-label="Cómo se pregunta" style="display: flex; padding: 4px; border-radius: 999px; border: 1px solid var(--line); background: var(--bg)">
<button type="button" onClick={v.toA} aria-pressed={v.aStr} style={`flex: 1; min-height: 44px; border: 0; border-radius: 999px; background: ${v.aBg}; color: ${v.aFg}; font: inherit; font-size: 14px; font-weight: 700; cursor: pointer`}>Como se usaba</button>
<button type="button" onClick={v.toB} aria-pressed={v.bStr} style={`flex: 1; min-height: 44px; border: 0; border-radius: 999px; background: ${v.bBg}; color: ${v.bFg}; font: inherit; font-size: 14px; font-weight: 700; cursor: pointer`}>Con método</button>
</div>
<div style="padding: 14px; border-radius: 16px; background: var(--bg); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 8px">
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)">Tu pregunta</span>
{(v.chatQ).map((q: any, q_i: number) => (<Fragment key={q_i}>
<div style="display: flex; flex-direction: column; gap: 2px; padding: 10px 12px; border-radius: 12px; background: var(--inner)">
{(q.hasK) && (<><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px; color: var(--accent-text)">{q.k}</span></>)}
<span style="font-size: 14.5px; font-weight: 600; line-height: 1.38">{q.t}</span>
</div>
</Fragment>))}
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)">{v.chatNote}</span>
</div>
<div aria-live="off" style={`padding: 14px; border-radius: 16px; background: var(--bg); border: 1px solid ${v.chatBorder}; display: flex; flex-direction: column; gap: 6px; min-height: 160px; box-sizing: border-box`}>
<span style="display: flex; align-items: center; gap: 8px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)"><span style="width: 7px; height: 7px; border-radius: 99px; background: var(--accent)"></span>Asistente documental · respuesta</span>
{(v.chatLines).map((l: any, l_i: number) => (<Fragment key={l_i}>
<div class="ln2" style={`display: flex; gap: 8px; align-items: baseline; padding: ${l.pad}; border-radius: 8px; background: ${l.bg}; color: ${l.col}; font-family: ${l.ff}; font-size: ${l.fs}px; font-weight: ${l.fw}; line-height: 1.4`}>
{(l.hasN) && (<><span style="flex: 0 0 22px; width: 22px; height: 22px; border-radius: 7px; background: var(--accent); color: var(--on-accent); display: inline-flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px">{l.n}</span></>)}
<span style="min-width: 0; overflow-wrap: anywhere">{l.t}</span>
</div>
</Fragment>))}
</div>
<div style="display: flex; flex-direction: column; gap: 4px">
{(v.method).map((m: any, m_i: number) => (<Fragment key={m_i}>
<div style={`display: flex; gap: 10px; align-items: baseline; padding: 10px 4px; border-top: 2px solid ${m.c}`}><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--accent-text)">{m.n}</span><span style="display: flex; flex-direction: column"><strong style="font-size: 15.5px">{m.t}</strong><span style="font-size: 13.5px; color: var(--muted)">{m.s}</span></span></div>
</Fragment>))}
</div>
</div>

<div data-seen="Gen" style="margin-top: 12px; padding: 18px 14px; border-radius: 22px; background: var(--panel); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 14px">
<p style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--accent-text)">B · el generador</p>
<h3 style="margin: 0; font-weight: 800; font-size: 28px; line-height: 1; letter-spacing: -0.04em">Lo que eran días, <span style="color: var(--accent-text)">en segundos.</span></h3>
<p style="margin: 0; color: var(--muted); font-size: 15px">Un prototipo en Python lee un inventario y escribe todas las configuraciones siguiendo las mismas plantillas: siempre igual, sin errores de copia. Pulsa el botón.</p>
<div style="border-radius: 14px; border: 1px solid var(--line); background: var(--bg); overflow: hidden">
<div style="display: flex; justify-content: space-between; gap: 8px; padding: 9px 12px; border-bottom: 1px solid var(--line); font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)"><span>inventario_ingestas.csv</span><span>412 filas · ficticio</span></div>
<table style="width: 100%; border-collapse: collapse; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px">
<thead><tr><th scope="col" style="text-align: left; padding: 7px 12px; color: var(--muted); font-weight: 500">tabla</th><th scope="col" style="text-align: left; padding: 7px 6px; color: var(--muted); font-weight: 500">origen</th><th scope="col" style="text-align: left; padding: 7px 12px 7px 6px; color: var(--muted); font-weight: 500">frecuencia</th></tr></thead>
<tbody>{(v.inv).map((r: any, r_i: number) => (<Fragment key={r_i}><tr style={`border-top: 1px solid var(--line); background: ${r.bg}`}><td style="padding: 7px 12px">{r.a}</td><td style="padding: 7px 6px">{r.b}</td><td style="padding: 7px 12px 7px 6px">{r.c}</td></tr></Fragment>))}</tbody>
</table>
<div style="padding: 7px 12px; border-top: 1px solid var(--line); font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)">… y 408 filas más</div>
</div>
<button type="button" onClick={v.runGen} style="min-height: 52px; border-radius: 999px; border: 0; background: var(--accent); color: var(--on-accent); font: inherit; font-weight: 700; cursor: pointer">{v.genBtn}</button>
<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px">
{(v.genCount).map((g: any, g_i: number) => (<Fragment key={g_i}>
<div style={`padding: 10px 12px; border-radius: 14px; border: 1px solid ${g.border}; background: var(--bg); display: flex; flex-direction: column`}><strong style={`font-weight: 800; font-size: 26px; line-height: 1; letter-spacing: -0.04em; color: ${g.c}`}>{g.v}</strong><span style="font-size: 12px; color: var(--muted)">{g.l}</span></div>
</Fragment>))}
</div>
<div aria-hidden="true" style="display: grid; grid-template-columns: repeat(15, minmax(0, 1fr)); gap: 3px; padding: 10px; border-radius: 14px; background: var(--bg); border: 1px solid var(--line)">
{(v.tiles).map((x: any, x_i: number) => (<Fragment key={x_i}><span style={`aspect-ratio: 1; border-radius: 2px; background: ${x.bg}`}></span></Fragment>))}
</div>
<div style="display: flex; flex-direction: column; gap: 2px">
<strong style="font-size: 15.5px">{v.genStatus}</strong>
<span style="font-size: 13px; color: var(--muted)">Cada cuadro, unas 7 ingestas. A mano serían unas 137 horas (supuesto ilustrativo: 20 minutos por ingesta).</span>
</div>
</div>

<h3 style="margin: 52px 0 10px; font-weight: 800; font-size: 30px; line-height: 1; letter-spacing: -0.04em">Del prototipo <span style="color: var(--muted)">al día a día.</span></h3>
<p style="margin: 0 0 16px; color: var(--muted)">Lo que empezó como una prueba acabó convirtiéndose en una formación interna sobre IA y en el asistente que uso cada día. Desliza:</p>
<ol class="hsc" tabIndex={0} aria-label="Del prototipo al día a día" style="list-style: none; margin: 0 -16px; padding: 0 16px 4px">
{(v.milestones).map((m: any, m_i: number) => (<Fragment key={m_i}>
<li style="width: 250px; padding: 16px; border-radius: 18px; border: 1px solid var(--line); background: var(--panel); display: flex; flex-direction: column; gap: 8px; box-sizing: border-box">
<span aria-hidden="true" style="width: 30px; height: 30px; border-radius: 99px; background: var(--accent); color: var(--on-accent); display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px">{m.n}</span>
<strong style="font-weight: 800; font-size: 19px; line-height: 1.12; letter-spacing: -0.02em">{m.t}</strong>
<span style="color: var(--muted); font-size: 14.5px">{m.s}</span>
</li>
</Fragment>))}
</ol>
</section>

<section id="cambio" style="border-top: 1px solid var(--line); padding: 52px 16px; scroll-margin-top: 60px">
<p style="margin: 0 0 12px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--accent-text)">04 — El cambio</p>
<h2 style="margin: 0 0 14px; font-weight: 800; font-size: 42px; line-height: 0.96; letter-spacing: -0.05em">De días copiando <span style="color: var(--accent-text)">a horas revisando.</span></h2>
<p style="margin: 0 0 18px; color: var(--muted)">Mueve el deslizador: de hacerlo todo a mano a dejar que el generador haga lo repetitivo. Elige también cuántas configuraciones tiene tu equipo por delante.</p>
<div style="padding: 18px 14px; border-radius: 22px; background: var(--panel); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 16px">
<fieldset style="margin: 0; padding: 0; border: 0">
<legend style="padding: 0; margin-bottom: 8px; font-size: 14px; font-weight: 700">¿Cuántas configuraciones?</legend>
<div style="display: flex; gap: 8px">
{(v.vols).map((v: any, v_i: number) => (<Fragment key={v_i}><button type="button" onClick={v.pick} aria-pressed={v.pressed} style={`flex: 1; min-height: 44px; border-radius: 999px; border: 1px solid ${v.border}; background: ${v.bg}; color: ${v.fg}; font: inherit; font-size: 15px; font-weight: 700; cursor: pointer`}>{v.l}</button></Fragment>))}
</div>
</fieldset>
<div role="status" style="display: flex; align-items: flex-end; justify-content: space-between; gap: 12px">
<div style="display: flex; flex-direction: column"><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)">a mano</span><span style="font-weight: 800; font-size: 26px; letter-spacing: -0.03em; color: var(--muted)">{v.manH} h</span></div>
<div style="display: flex; flex-direction: column; align-items: flex-end"><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--accent-text)">tiempo estimado</span><span style="font-weight: 800; font-size: 54px; line-height: 0.9; letter-spacing: -0.055em; color: var(--accent-text)">{v.slH} h</span></div>
</div>
<div aria-hidden="true" style="display: grid; grid-template-columns: repeat(10, minmax(0, 1fr)); gap: 5px">
{(v.icons).map((i: any, i_i: number) => (<Fragment key={i_i}><span style={`height: 28px; border-radius: 5px; border: 1.5px solid ${i.border}; background: ${i.bg}; display: flex; flex-direction: column; justify-content: center; gap: 3px; padding: 0 4px; box-sizing: border-box`}><span style={`height: 2px; width: 80%; background: ${i.line}`}></span><span style={`height: 2px; width: 55%; background: ${i.line}`}></span></span></Fragment>))}
</div>
<div style="display: flex; flex-direction: column; gap: 4px">
<input class="rng" type="range" min="0" max="100" value={v.sl} onInput={v.onSl} onChange={v.onSl} aria-label="Cuánto se automatiza, de todo a mano a lo repetitivo generado" aria-valuetext={v.slText} style="accent-color: var(--accent)" />
<div style="display: flex; justify-content: space-between; gap: 12px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)"><span>Todo a mano</span><span>Lo repetitivo, generado</span></div>
</div>
<p style="margin: 0; font-weight: 700; font-size: 16.5px">{v.slMsg}</p>
<p style="margin: 0; font-size: 12.5px; color: var(--muted)">Ejemplo ilustrativo con 20 minutos por configuración a mano. El 90 % es la eficiencia estimada del prototipo frente a la construcción manual, no una medición en producción.</p>
</div>

<h3 style="margin: 52px 0 16px; font-weight: 800; font-size: 28px; line-height: 1; letter-spacing: -0.04em">Lo que demostró el prototipo</h3>
<div data-seen="Nums" class={`nums ${v.numsCls}`} style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px">
{(v.nums).map((n: any, n_i: number) => (<Fragment key={n_i}>
<div style="padding: 16px 14px; border-radius: 18px; border: 1px solid var(--line); display: flex; flex-direction: column; gap: 4px">
<span class="num" style={`font-weight: 800; font-size: 44px; line-height: 0.9; letter-spacing: -0.055em; color: var(--accent-text); animation-delay: ${n.d}s`}>{n.v}<span style="font-size: 0.4em; letter-spacing: -0.02em">{n.u}</span></span>
<strong style="font-weight: 800; font-size: 15px; line-height: 1.2">{n.title}</strong>
<span style="color: var(--muted); font-size: 13px; line-height: 1.35">{n.text}</span>
</div>
</Fragment>))}
</div>

<div class="rv" style="margin-top: 14px; padding: 20px 16px; border-radius: 22px; background: var(--panel); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 14px">
<h3 style="margin: 0; font-weight: 800; font-size: 28px; line-height: 1.02; letter-spacing: -0.045em">Un prototipo que demostró la idea. <span style="color: var(--accent-text)">Un producto cuando lo necesites.</span></h3>
<p style="margin: 0; color: var(--muted); font-size: 15px">Lo que hice para mi equipo fueron prototipos: no se implantaron de forma masiva y la eficiencia es una estimación. Para tu equipo, el siguiente paso es llevarlo a producción, con el mismo método.</p>
<div style="padding: 18px 16px; border-radius: 18px; border: 1px dashed var(--muted); display: flex; flex-direction: column; gap: 10px">
<span class="tag mut" style="align-self: flex-start">Prototipo · lo que hice</span>
<ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px">
{(v.proto).map((p: any, p_i: number) => (<Fragment key={p_i}><li style="display: flex; gap: 8px; align-items: baseline; font-size: 15px"><span aria-hidden="true" style="color: var(--muted)">—</span><span>{p.t}</span></li></Fragment>))}
</ul>
</div>
<div style="padding: 18px 16px; border-radius: 18px; border: 2px solid var(--accent); background: var(--bg); display: flex; flex-direction: column; gap: 10px">
<span class="tag" style="align-self: flex-start">Producto · lo que haríamos para ti</span>
<ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px">
{(v.prod).map((p: any, p_i: number) => (<Fragment key={p_i}><li style="display: flex; gap: 8px; align-items: baseline; font-size: 15px"><svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" style="flex: 0 0 14px; position: relative; top: 2px"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="var(--accent)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>{p.t}</span></li></Fragment>))}
</ul>
</div>
</div>

<h3 style="margin: 52px 0 10px; font-weight: 800; font-size: 30px; line-height: 1; letter-spacing: -0.045em">Una plantilla, <span style="color: var(--muted)">para cualquier trabajo repetitivo.</span></h3>
<p style="margin: 0 0 18px; color: var(--muted)">Datos, documentos, altas, informes o dudas del equipo: el camino es el mismo.</p>
<div style="display: flex; flex-direction: column; gap: 10px">
{(v.line3).map((l: any, l_i: number) => (<Fragment key={l_i}>
<div class="rv" style={`padding: 20px 18px; border-radius: 22px; background: ${l.bg}; color: ${l.fg}; border: 1px solid ${l.border}; display: flex; flex-direction: column; gap: 8px`}>
<span style={`font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: ${l.numColor}`}>{l.n}</span>
<strong style="font-weight: 800; font-size: 26px; line-height: 1; letter-spacing: -0.035em">{l.title}</strong>
<span style="font-size: 15px; opacity: .88">{l.text}</span>
</div>
</Fragment>))}
</div>
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 14px">
<span style="font-size: 14px; color: var(--muted)">Sirve para:</span>
{(v.uses).map((u: any, u_i: number) => (<Fragment key={u_i}><span class="tag">{u.t}</span></Fragment>))}
</div>
</section>

<section style="padding: 0 16px 40px">
<div class="rv" style="padding: 28px 20px; border-radius: 26px; background: var(--fg); color: var(--bg); display: flex; flex-direction: column; gap: 18px">
<h2 style="margin: 0; font-weight: 800; font-size: 34px; line-height: 1; letter-spacing: -0.05em">¿Qué hace tu equipo a mano que no debería?</h2>
<a href="/?para=clientes#contacto" style="display: flex; align-items: center; justify-content: center; min-height: 54px; border-radius: 999px; background: var(--accent); color: var(--on-accent); text-decoration: none; font-weight: 600">Cuéntame tu idea</a>
<a href="/casos/automatizacion-y-asistente-ia/demo/" style="display: flex; align-items: center; justify-content: center; min-height: 54px; border-radius: 999px; border: 1px solid var(--bg); text-decoration: none; font-weight: 600">Probar la demo</a>
<a href="/casos/red-de-agentes/" style="display: flex; align-items: center; justify-content: center; min-height: 48px; text-decoration: none; font-weight: 600">Siguiente caso: agentes →</a>
</div>
</section>

</main>
</div>

      </>
    );
  }
}

export const Mobile = conTema(Logica);
