// @ts-nocheck
// Generado desde el tablero CasoBanca y revisado a mano: lógica, textos y estilos tal cual.
import { Fragment } from 'preact';
import { DCLogic, conTema } from '../../lib/dclogic';
import { HoloDiferido } from '../../components/HoloDiferido';
import './Desktop.css';

class Logica extends DCLogic {

  componentDidMount() {
    this.check = () => {
      const h = window.innerHeight;
      const st = this.state || {};
      if (h > 2000) {
        if (!st.seenAll) { this.setState({ seenAll: true, seenDesk: true, seenBig: true, seenChat: true, seenGen: true, seenTl: true, seenNums: true, cnt: 1, chatK: 20, genP: 1, genDone: true }); }
        return;
      }
      const upd = {};
      document.querySelectorAll('[data-seen]').forEach((el) => {
        const k = 'seen' + el.getAttribute('data-seen');
        const r = el.getBoundingClientRect();
        if (!st[k] && r.top < h * 0.75 && r.bottom > h * 0.1) { upd[k] = true; }
      });
      let act = 0;
      document.querySelectorAll('[data-step]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < h * 0.58) { act = Math.max(act, Number(el.getAttribute('data-step')) || 0); }
      });
      if (act !== (st.story || 0)) { upd.story = act; }
      if (Object.keys(upd).length) { this.setState(upd); }
      if (upd.seenNums) { this.countUp(); }
      if (upd.seenGen && !st.genRan) { setTimeout(() => this.startGen(), 500); }
    };
    this.onResize = () => this.check();
    this.onScrollRaf = () => { if (this.rqS) { return; } this.rqS = requestAnimationFrame(() => { this.rqS = 0; this.check(); }); }; window.addEventListener('scroll', this.onScrollRaf, { capture: true, passive: true });
    window.addEventListener('resize', this.onResize);
    setTimeout(this.check, 300);
    this.check();
    this.formT = setInterval(() => {
      const s = this.state || {};
      if (!s.seenDesk || s.seenAll) { return; }
      const el = document.querySelector('[data-seen="Desk"]');
      if (el) { const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > window.innerHeight) { return; } }
      this.setState({ fk: (s.fk || 0) + 1 });
    }, 90);
    this.chatT = setInterval(() => {
      const s = this.state || {};
      if (!s.seenChat || s.seenAll) { return; }
      let red = false; try { red = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
      if (red) { if ((s.chatK || 0) < 20) { this.setState({ chatK: 20 }); } return; }
      const ce = document.querySelector('[data-seen="Chat"]'); if (ce) { const r = ce.getBoundingClientRect(); if (r.bottom < 0 || r.top > window.innerHeight) { return; } }
      const L = this.chatData(s.chatB ? 'b' : 'a').lines.length;
      const k = s.chatK || 0;
      if (k < L) { this.setState({ chatK: k + 1 }); return; }
      const hold = (s.chatHold || 0) + 1;
      if (!s.chatTouched && (s.chatCycles || 0) < 3 && hold > 18) { this.setState({ chatB: !s.chatB, chatK: 0, chatHold: 0, chatCycles: (s.chatCycles || 0) + 1 }); return; }
      if (hold > 18) { return; }
      this.setState({ chatHold: hold });
    }, 280);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollRaf, true); cancelAnimationFrame(this.rqS);
    window.removeEventListener('resize', this.onResize);
    clearInterval(this.formT); clearInterval(this.chatT); clearInterval(this.genT); clearInterval(this.cntT);
  }
  countUp() {
    clearInterval(this.cntT);
    let k = 0;
    this.setState({ cnt: 0 });
    this.cntT = setInterval(() => {
      k += 1;
      const v = Math.min(1, k / 34);
      this.setState({ cnt: v });
      if (v >= 1) { clearInterval(this.cntT); }
    }, 40);
  }
  startGen() {
    clearInterval(this.genT);
    const t0 = Date.now();
    const dur = 3800;
    this.setState({ genP: 0, genDone: false, genRan: true });
    this.genT = setInterval(() => {
      const p = Math.min(1, (Date.now() - t0) / dur);
      const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      this.setState({ genP: e, genDone: p >= 1 });
      if (p >= 1) { clearInterval(this.genT); }
    }, 60);
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
    const night = { bg: '#0B0B0C', fg: '#F2F0EB', muted: '#A09D96', line: '#29292B', panel: '#141415', inner: '#202022', grid: 'rgba(255,255,255,0.05)', accent: '#FF5B2E', accentText: '#FF7A55', accentSoft: 'rgba(255,91,46,0.14)', onAccent: '#0B0B0C', warn: '#FFC24B', paper: '#EDEAE3', paperFg: '#1A1A1A', paperLine: '#CFCAC0', paperMuted: '#5E5A52', bubble: '#26262A', sweep: 'rgba(255,91,46,0.30)', accentOnFg: '#B8350F' };
    const light = { bg: '#F3F1EC', fg: '#111111', muted: '#55524C', line: '#DAD6CC', panel: '#FFFFFF', inner: '#ECE9E2', grid: 'rgba(0,0,0,0.06)', accent: '#B8350F', accentText: '#B8350F', accentSoft: 'rgba(184,53,15,0.10)', onAccent: '#FFFFFF', warn: '#8A5600', paper: '#FFFFFF', paperFg: '#1A1A1A', paperLine: '#DCD8CF', paperMuted: '#5E5A52', bubble: '#FFFFFF', sweep: 'rgba(184,53,15,0.22)', accentOnFg: '#FF7A55' };
    const t = dark ? night : light;
    const IC = {
      repeat: 'M17 2l4 4-4 4 M3 11V9a3 3 0 0 1 3-3h15 M7 22l-4-4 4-4 M21 13v2a3 3 0 0 1-3 3H3',
      warn: 'M12 9v4 M12 17h.01 M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
      heads: 'M9 11a4 4 0 1 0 0-8a4 4 0 0 0 0 8z M2 21c1-4 4-6 7-6s6 2 7 6 M17 11a3 3 0 1 0 0-6 M22 21c-.5-3-2-4.5-4-5',
      book: 'M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4z M20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z'
    };
    const fk = s.seenAll ? 30 : (s.fk || 0);
    const FV = (n) => [
      ['Nombre', 'ing_cuentas_' + String(n).padStart(4, '0')],
      ['Origen', 'SFTP · /entrada/cuentas/'],
      ['Formato', 'CSV · separador ;'],
      ['Destino', 'Lago de datos · capa bruta'],
      ['Frecuencia', 'Diaria · 06:00']
    ];
    const totalC = FV(1).reduce((a, f) => a + f[1].length, 0);
    const cycle = Math.ceil(totalC / 2) + 18;
    const formN = Math.min(412, 37 + Math.floor(fk / cycle));
    let typed = (fk % cycle) * 2;
    let activeSet = false;
    const formFields = FV(formN).map((f) => {
      const take = Math.max(0, Math.min(f[1].length, typed));
      typed -= f[1].length;
      const active = !activeSet && take < f[1].length;
      if (active) { activeSet = true; }
      return { l: f[0], v: f[1].slice(0, take), active, border: active ? t.accent : t.paperLine };
    });
    const secs = 8076 + Math.floor(fk * 0.9);
    const pad = (x) => String(x).padStart(2, '0');
    const clock = pad(Math.floor(secs / 3600)) + ':' + pad(Math.floor((secs % 3600) / 60)) + ':' + pad(secs % 60);
    const story = s.seenAll ? 3 : (s.story || 0);
    const SD = [
      { k: 'La petición', wasK: 'lo que pedían', was: 'Un asistente generativo que configure en masa cientos de ingestas.', now: 'Un modelo generativo no garantiza cientos de configuraciones exactas. Para eso hace falta código.', det: 'Decir que no a la idea tal cual fue el primer paso. La intención, ahorrar horas, era buena: había que llevarla a otro sitio.', shape: 'cloud', label: 'petición borrosa' },
      { k: 'Lo que ya había', wasK: 'cómo se usaba', was: 'Un asistente documental con toda la documentación de la herramienta, usado como un buscador.', now: 'Bien preguntado, podía guiar el desarrollo paso a paso.', det: 'No había que comprar nada. Había que aprender a pedirle.', shape: 'sphere', label: 'asistente documental' },
      { k: 'Lo que se repetía', wasK: 'cómo se hacía', was: 'Cientos de configuraciones casi iguales, hechas a mano una a una.', now: 'Con un inventario y unas plantillas, un programa las genera todas de golpe.', det: 'Siempre iguales, sin errores de copia y en segundos.', shape: 'grid', label: 'estructura' },
      { k: 'Lo que nadie veía', wasK: 'dónde estaba', was: 'El conocimiento, en la cabeza de dos personas.', now: 'Convertirlo en método y enseñárselo al equipo.', det: 'Lo que funciona para uno se queda en anécdota si no se enseña.', shape: 'radar', label: 'oportunidades' }
    ];
    const storyList = SD.map((d, i) => ({
      i, n: String(i + 1).padStart(2, '0'), k: d.k, wasK: d.wasK, was: d.was, now: d.now, det: d.det,
      cls: s.seenAll || i <= story ? 'go' : '',
      op: s.seenAll || i === story ? 1 : 0.32, blur: s.seenAll || i === story ? 0 : 2.5
    }));
    const BL = [
      { name: 'Configurar en masa con IA generativa', short: 'la petición', verdict: 'Descartada tal cual', ok: false, r: 0.82, a: 300, sc: [95, 90, 20, 80], text: 'La necesidad era real; la herramienta, no. Un error inventado en una de cientos de configuraciones no avisa. Pasa al generador.' },
      { name: 'Generador de configuraciones', short: 'generador', verdict: 'Prototipo · código', ok: true, r: 0.2, a: 40, sc: [95, 92, 85, 92], text: 'Lo repetitivo y exacto lo hace el código: siempre igual y en segundos. Eficiencia estimada del 90 % frente a hacerlo a mano.' },
      { name: 'Asistente documental con método', short: 'asistente', verdict: 'Prototipo · IA y persona', ok: true, r: 0.38, a: 150, sc: [70, 60, 80, 70], text: 'Dudas, incidencias y casos nuevos: la IA guía paso a paso, cita la documentación y la persona valida.' },
      { name: 'Formación interna en IA', short: 'formación', verdict: 'Hecha · para el equipo', ok: true, r: 0.55, a: 228, sc: [60, 55, 90, 65], text: 'El método se convirtió en una formación sobre el uso de IA y la detección de oportunidades de mejora.' },
      { name: 'Aprobar lo que se publica', short: 'aprobación', verdict: 'Se queda en la persona', ok: false, r: 0.72, a: 100, sc: [50, 40, 25, 30], text: 'Lo que cuesta caro si sale mal lo decide una persona. La IA y el código preparan; la persona aprueba.' }
    ];
    const bi = s.blip === undefined ? 1 : s.blip;
    const blips = BL.map((b, i) => {
      const rad = (b.a * Math.PI) / 180;
      const x = 50 + Math.sin(rad) * b.r * 48, y = 50 - Math.cos(rad) * b.r * 48;
      const on = i === bi;
      const right = Math.sin(rad) >= 0;
      return { name: b.name, short: b.short, x: x.toFixed(1), y: y.toFixed(1), lx: (x + (right ? 4 : -4)).toFixed(1), ly: y.toFixed(1), tx: right ? '0' : '-100%', c: b.ok ? t.accent : t.muted, lc: on ? t.fg : t.muted, s: on ? 18 : 13, ring: on ? 4 : 0, ring2: on ? 6 : 0, d: ((b.a / 360) * 4).toFixed(2), pressed: on ? 'true' : 'false', pick: () => this.setState({ blip: i }) };
    });
    const B = BL[bi];
    const words = (v) => (v >= 80 ? 'alta' : v >= 55 ? 'media' : 'baja');
    const bl = {
      name: B.name, verdict: B.verdict, text: B.text, tagCls: B.ok ? '' : 'mut', border: B.ok ? t.accent : t.line,
      bars: [['Se repite', B.sc[0]], ['Reglas claras', B.sc[1]], ['Error controlable', B.sc[2]], ['Tiempo que devuelve', B.sc[3]]].map((x) => ({ l: x[0], v: x[1], word: words(x[1]), c: B.ok ? t.accent : t.muted }))
    };
    const chatB = !!s.chatB;
    const cd = this.chatData(chatB ? 'b' : 'a');
    const ck = s.chatK || 0;
    const chatLines = cd.lines.slice(0, ck).map((l) => {
      const base = { t: l.t, n: l.n || '', hasN: !!l.n, pad: '6px 8px', bg: 'transparent', col: t.fg, ff: 'Inter, sans-serif', fs: 16, fw: 500 };
      if (l.code) { return Object.assign(base, { ff: "'IBM Plex Mono', ui-monospace, monospace", fs: 13, bg: t.inner, pad: '10px 12px' }); }
      if (l.src) { return Object.assign(base, { ff: "'IBM Plex Mono', ui-monospace, monospace", fs: 12, col: t.muted }); }
      if (l.ask) { return Object.assign(base, { bg: t.accentSoft, col: t.accentText, fw: 700, pad: '10px 12px' }); }
      if (l.muted) { return Object.assign(base, { col: t.muted, fs: 14, fw: 600 }); }
      return base;
    });
    const genP = s.genP || 0;
    const ln = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const built = Math.round(412 * genP);
    const tiles = [];
    for (let i = 0; i < 420; i++) { tiles.push({ bg: i < built ? t.accent : i < 412 ? t.inner : 'transparent' }); }
    const invRows = [
      ['cuentas', 'SFTP', 'diaria'], ['movimientos', 'SFTP', 'diaria'], ['tarjetas', 'base de datos', 'diaria'],
      ['saldos', 'base de datos', 'mensual'], ['oficinas', 'API', 'semanal'], ['productos', 'SFTP', 'mensual']
    ];
    const hotRow = s.genDone || !s.genRan ? -1 : Math.floor((genP * 24) % 6);
    const inv = invRows.map((r, i) => ({ a: r[0], b: r[1], c: r[2], bg: i === hotRow ? t.accentSoft : 'transparent' }));
    const gc = [[built, 'esquemas'], [built * 2, 'objetos'], [built, 'transferencias'], [built * 4, 'ficheros en total']];
    const genCount = gc.map((g, i) => ({ v: ln(g[0]), l: g[1], c: i === 3 ? t.accentText : t.fg, border: i === 3 ? t.accent : t.line }));
    const genStatus = s.genDone ? 'Listo: 1.648 ficheros en 3,8 segundos · 0 errores de copia.' : s.genRan ? 'Generando… ' + ln(built) + ' de 412 ingestas' : 'Preparado para generar 412 ingestas.';
    const vol = s.vol || 300;
    const sl = s.sl === undefined ? 0 : s.sl;
    const a = sl / 100;
    const manual = (vol * 20) / 60;
    const est = manual * (1 - 0.9 * a);
    const fmtH = (h) => (h >= 10 ? ln(h) : h.toFixed(1).replace('.', ','));
    const nIcons = 30;
    const done = Math.round(a * nIcons);
    const icons = [];
    for (let i = 0; i < nIcons; i++) {
      const on = i < done;
      icons.push({ bg: on ? t.accent : 'transparent', border: on ? t.accent : t.line, line: on ? t.onAccent : t.muted, tf: on ? 'translateY(-3px)' : 'none' });
    }
    const slMsg = sl < 34 ? 'La persona lo hace todo: copiar, pegar, revisar y volver a empezar.' : sl < 85 ? 'El generador hace una parte; el resto sigue siendo copiar y pegar.' : 'El generador hace lo repetitivo. La persona revisa y aprueba.';
    const cnt = s.cnt === undefined ? 1 : s.cnt;
    const e3 = 1 - Math.pow(1 - cnt, 3);
    const tlOn = !!s.seenTl;
    return {
      t, dark, darkStr: dark ? 'true' : 'false', holoLevel: 1, holoS: 500, no: false,
      modeLabel: dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro',
      toggle: () => this.setState({ dark: !dark }),
      formN, formFields, clock,
      bubbles: [
        { t: '¿Cómo se configuraba un origen nuevo?', x: 50, y: 10, r: -2, i: 'M', av: '#FFE38A', d: 0 },
        { t: 'Copia la de ayer y cambia el nombre', x: 72, y: 24, r: 3, i: 'J', av: '#CDE7FF', d: 0.8 },
        { t: 'Ojo: esta era mensual, no diaria', x: 49, y: 38, r: 2, i: 'L', av: '#FFC9D6', d: 1.6 },
        { t: '¿Quién sabe por qué falla esta carga?', x: 69, y: 52, r: -3, i: 'M', av: '#FFE38A', d: 2.4 },
        { t: 'Está en la documentación… en algún sitio', x: 47, y: 68, r: -1, i: 'A', av: '#D7F2C4', d: 3.2 },
        { t: 'Me quedan 300. Hasta el viernes no salgo', x: 70, y: 80, r: 2, i: 'J', av: '#CDE7FF', d: 4 }
      ],
      pains: [
        { title: 'Se repite cientos de veces', text: 'Casi igual cada vez: cambia un nombre, una ruta, una fecha.', icon: IC.repeat },
        { title: 'Un error al copiar sale caro', text: 'Un campo mal pegado no avisa: se descubre cuando falla la carga.', icon: IC.warn },
        { title: 'El saber está en dos cabezas', text: 'Las mismas dudas llegan siempre a las mismas personas.', icon: IC.heads },
        { title: 'La documentación está, pero no ayuda', text: 'Cientos de páginas que se consultan como un buscador, a ciegas.', icon: IC.book }
      ],
      story: storyList, storyShape: SD[story].shape, storyLabel: SD[story].label,
      storyDots: SD.map((d, i) => ({ bg: i <= story ? t.accent : t.line })),
      blips, bl,
      bigCls: s.seenBig ? 'go' : '',
      toA: () => this.setState({ chatB: false, chatK: 0, chatHold: 0, chatTouched: true }),
      toB: () => this.setState({ chatB: true, chatK: 0, chatHold: 0, chatTouched: true }),
      aStr: chatB ? 'false' : 'true', bStr: chatB ? 'true' : 'false',
      aBg: chatB ? 'transparent' : t.fg, aFg: chatB ? t.fg : t.bg, bBg: chatB ? t.accent : 'transparent', bFg: chatB ? t.onAccent : t.fg,
      chatQ: cd.q.map((q) => ({ k: q.k || '', hasK: !!q.k, t: q.t })), chatNote: cd.note, chatLines, chatBorder: chatB ? t.accent : t.line,
      method: [
        { n: '01', t: 'Contexto completo', s: 'Origen, destino, formato, volumen y restricciones.', c: chatB ? t.accent : t.line },
        { n: '02', t: 'Pregunta con plantilla', s: 'Qué necesitas y en qué orden, siempre igual.', c: chatB ? t.accent : t.line },
        { n: '03', t: 'Guía que se valida', s: 'Pasos, ejemplo, cómo comprobarlo y qué falta.', c: chatB ? t.accent : t.line }
      ],
      inv, tiles, genCount, genStatus,
      genBtn: s.genDone ? 'Generar otra vez' : s.genRan ? 'Generando…' : 'Generar 412 ingestas',
      runGen: () => this.startGen(),
      tlCls: tlOn ? 'go' : '',
      milestones: [
        { n: '01', t: 'Prototipo del método', s: 'Contexto completo, preguntas con plantilla y guías paso a paso sobre el asistente documental.', d: 0.2 },
        { n: '02', t: 'Formación interna', s: 'El método se convirtió en una formación para el equipo sobre el uso de IA y la detección de oportunidades.', d: 1.3 },
        { n: '03', t: 'Asistente de cada día', s: 'Hoy lo uso a diario como experto de la plataforma para resolver dudas e incidencias.', d: 2.4 },
        { n: '04', t: 'Generador en Python', s: 'Prototipo que genera esquemas, objetos y transferencias en masa: 90 % de eficiencia estimada.', d: 3.5 }
      ].map((m) => Object.assign(m, { dot: tlOn ? t.accent : t.bg, dotFg: tlOn ? t.onAccent : t.accentText })),
      vols: [50, 300, 1000].map((v) => ({ l: ln(v), pressed: v === vol ? 'true' : 'false', bg: v === vol ? t.fg : 'transparent', fg: v === vol ? t.bg : t.fg, border: v === vol ? t.fg : t.line, pick: () => this.setState({ vol: v }) })),
      sl, manH: fmtH(manual), slH: fmtH(est), icons, slMsg,
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
<div class="caso v-esc" style="background: var(--bg); color: var(--fg); font-family: Inter, 'Helvetica Neue', Arial, sans-serif; font-size: 18px; line-height: 1.55; min-height: 100vh; overflow-x: clip">

<header style="max-width: 1320px; margin: 0 auto; padding: 22px clamp(20px, 4vw, 48px); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px">
<a href="/#casos" style="display: inline-flex; align-items: center; min-height: 44px; font-weight: 600; text-decoration: none">← Volver</a>
<span style="font-weight: 800; font-size: 18px; letter-spacing: -0.02em">Alberto Cabello<span style="color: var(--accent)">.</span></span>
<button onClick={v.toggle} aria-label={v.modeLabel} style="display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 999px; border: 1px solid var(--line); background: transparent; color: var(--fg); cursor: pointer">
<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"></circle><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"></path></svg>
</button>
</header>

<section style="max-width: 1320px; margin: 0 auto; padding: clamp(40px, 8vw, 110px) clamp(20px, 4vw, 48px) clamp(48px, 8vw, 100px)">
<p class="fade" style="margin: 0 0 24px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 14px; color: var(--accent-text)">Caso 03 · Automatización y asistentes IA</p>
<h1 style="margin: 0; font-weight: 800; font-size: clamp(44px, 7.4vw, 120px); line-height: 0.95; letter-spacing: -0.05em">
<span class="ln"><span class="w">Me</span> <span class="w" style="animation-delay: .08s">pidieron</span> <span class="w" style="animation-delay: .16s">automatizar.</span></span>
<span class="ln"><span class="w" style="animation-delay: .3s; color: var(--accent-text)">Vi</span> <span class="w" style="animation-delay: .38s; color: var(--accent-text)">algo</span> <span class="w" style="animation-delay: .46s; color: var(--accent-text)">mejor.</span></span>
</h1>
<p class="fade" style="margin: 32px 0 0; max-width: 840px; font-size: clamp(19px, 2vw, 26px); line-height: 1.35; text-wrap: pretty">En una entidad bancaria internacional, un equipo de datos configuraba a mano, una a una, cientos de ingestas casi iguales. La petición fue automatizarlo con un asistente generativo. Mirando el proceso entero vi dos oportunidades mejores: <strong>exprimir el asistente documental que ya existía</strong> y <strong style="color: var(--accent-text)">un generador que hace en segundos el trabajo de días, con un 90 % de eficiencia estimada</strong>.</p>
<div class="fade" style="display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; margin-top: 28px">
<span class="tag">Línea · Automatización y asistentes IA</span>
<span aria-hidden="true" style="color: var(--muted)">→</span>
<span class="tag">Enfoque · Detección de oportunidades</span>
<span class="tag mut">Entidad anónima · herramientas y datos ficticios</span>
</div>
<nav class="fade" aria-label="Capítulos" style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 36px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 14px">
<a href="#problema" style="display: inline-flex; align-items: center; min-height: 44px; padding: 0 16px; border-radius: 999px; border: 1px solid var(--line); text-decoration: none">01 El problema</a>
<a href="#vi" style="display: inline-flex; align-items: center; min-height: 44px; padding: 0 16px; border-radius: 999px; border: 1px solid var(--line); text-decoration: none">02 Lo que vi</a>
<a href="#solucion" style="display: inline-flex; align-items: center; min-height: 44px; padding: 0 16px; border-radius: 999px; border: 1px solid var(--line); text-decoration: none">03 La solución</a>
<a href="#cambio" style="display: inline-flex; align-items: center; min-height: 44px; padding: 0 16px; border-radius: 999px; border: 1px solid var(--line); text-decoration: none">04 El cambio</a>
</nav>
</section>

<section id="problema" style="border-top: 1px solid var(--line)">
<div style="max-width: 1320px; margin: 0 auto; padding: clamp(56px, 9vw, 120px) clamp(20px, 4vw, 48px)">
<p style="margin: 0 0 16px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 14px; color: var(--muted)">01 — El problema</p>
<h2 style="margin: 0 0 20px; font-weight: 800; font-size: clamp(34px, 4.6vw, 68px); line-height: 1; letter-spacing: -0.045em"><span class="rvl"><span>Lo que llega: «esto lo hacemos a mano.</span></span><span class="rvl"><span style="color: var(--muted)">¿Se puede automatizar?»</span></span></h2>
<p class="rv" style="margin: 0 0 36px; max-width: 700px; color: var(--muted)">Pasa en casi cualquier equipo: un trabajo que se repite cientos de veces, casi igual cada vez, que solo dominan dos personas y que nadie quiere hacer. En este caso, dar de alta una a una las ingestas de datos en una herramienta low-code: esquemas, objetos y transferencias.</p>

<div data-seen="Desk" class="desk" role="img" aria-label={`Mesa de trabajo borrosa: un formulario de configuración que se rellena a mano una y otra vez, la número ${v.formN} de 412, mientras llegan mensajes del equipo con dudas repetidas`} style="position: relative; height: clamp(460px, 42vw, 540px); border-radius: 28px; border: 1px dashed var(--line); background: var(--panel); overflow: hidden">
<span aria-hidden="true" class="tag solid" style="position: absolute; right: 20px; top: 18px; z-index: 6">Pasa el ratón: enfoca cada mensaje</span>
<div class="it" aria-hidden="true" style="left: 7%; top: 15%; width: clamp(300px, 30vw, 400px); height: 300px; transform: translate(26px, 22px) rotate(3deg); border-radius: 16px; background: var(--inner); border: 1px solid var(--line)"></div>
<div class="it" aria-hidden="true" style="left: 7%; top: 15%; width: clamp(300px, 30vw, 400px); height: 300px; transform: translate(13px, 11px) rotate(1.5deg); border-radius: 16px; background: var(--inner); border: 1px solid var(--line)"></div>
<div class="it front" aria-hidden="true" style="left: 7%; top: 15%; width: clamp(300px, 30vw, 400px); border-radius: 16px; background: var(--paper); color: var(--paper-fg); border: 1px solid var(--line); overflow: hidden">
<div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 12px 16px; border-bottom: 1px solid var(--paper-line); font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--paper-muted)"><span>Nueva ingesta</span><strong style="color: var(--paper-fg)">{v.formN} de 412</strong></div>
<div style="display: flex; flex-direction: column; gap: 10px; padding: 16px">
{(v.formFields).map((f: any, f_i: number) => (<Fragment key={f_i}>
<div style="display: flex; flex-direction: column; gap: 4px">
<span style="font-size: 11px; font-weight: 600; color: var(--paper-muted)">{f.l}</span>
<span style={`display: flex; align-items: center; min-height: 32px; padding: 0 10px; border-radius: 8px; border: 1.5px solid ${f.border}; background: #FFFFFF; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 13px; color: #1A1A1A; white-space: nowrap; overflow: hidden`}>{f.v}{(f.active) && (<><span class="caret"></span></>)}</span>
</div>
</Fragment>))}
<div style="display: flex; gap: 8px; margin-top: 4px"><span style="padding: 7px 14px; border-radius: 8px; background: #1A1A1A; color: #FFFFFF; font-size: 12px; font-weight: 700">Guardar</span><span style="padding: 7px 14px; border-radius: 8px; border: 1px solid var(--paper-line); font-size: 12px; font-weight: 700">Copiar la anterior</span></div>
</div>
</div>
{(v.bubbles).map((b: any, b_i: number) => (<Fragment key={b_i}>
<div class="it drift" aria-hidden="true" style={`left: ${b.x}%; top: ${b.y}%; max-width: 260px; display: flex; align-items: flex-end; gap: 8px; transform: rotate(${b.r}deg); animation-delay: ${b.d}s`}>
<span style={`flex: 0 0 30px; width: 30px; height: 30px; border-radius: 99px; background: ${b.av}; color: #1A1A1A; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px`}>{b.i}</span>
<span style="padding: 12px 14px; border-radius: 16px 16px 16px 4px; background: var(--bubble); color: var(--fg); font-size: 16px; font-weight: 600; line-height: 1.25; box-shadow: 0 14px 28px -16px rgba(0,0,0,.6)">{b.t}</span>
</div>
</Fragment>))}
<span aria-hidden="true" class="tag solid" style="position: absolute; left: 20px; top: 18px; z-index: 6"><span style="width: 8px; height: 8px; border-radius: 99px; background: var(--accent)"></span>{v.clock} · copiando y pegando</span>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr)); gap: 14px; margin-top: 16px">
{(v.pains).map((p: any, p_i: number) => (<Fragment key={p_i}>
<div class="rv" style="padding: 26px; border-radius: 24px; border: 1px solid var(--line); display: flex; flex-direction: column; gap: 10px">
<span style="width: 44px; height: 44px; border-radius: 12px; background: var(--inner); display: flex; align-items: center; justify-content: center"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d={p.icon}></path></svg></span>
<strong style="font-weight: 800; font-size: 21px; line-height: 1.15; letter-spacing: -0.02em">{p.title}</strong>
<span style="color: var(--muted); font-size: 16px">{p.text}</span>
</div>
</Fragment>))}
</div>
<p class="rv" style="margin: 44px 0 0; font-weight: 800; font-size: clamp(30px, 4.2vw, 60px); line-height: 1; letter-spacing: -0.045em">Muchas horas copiando. <span style="color: var(--accent-text)">Ninguna pensando.</span></p>
</div>
</section>

<section id="vi" style="background: var(--panel)">
<div style="max-width: 1320px; margin: 0 auto; padding: clamp(72px, 11vw, 150px) clamp(20px, 4vw, 48px)">
<p style="margin: 0 0 16px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 14px; color: var(--muted)">02 — Lo que vi</p>
<h2 style="margin: 0 0 20px; font-weight: 800; font-size: clamp(34px, 4.6vw, 68px); line-height: 1; letter-spacing: -0.045em"><span class="rvl"><span>Me pidieron una cosa.</span></span><span class="rvl"><span style="color: var(--accent-text)">Vi tres oportunidades.</span></span></h2>
<p class="rv" style="margin: 0; max-width: 720px; color: var(--muted)">La petición llegó así: «haz un asistente que lo configure todo en masa». Antes de construir nada, miré el proceso entero. Baja despacio: el holograma va tomando la forma de lo que fui viendo.</p>

<div style="display: flex; flex-wrap: wrap; gap: 24px 56px; align-items: flex-start; margin-top: 24px">
<div style="flex: 1 1 500px; min-width: 0; display: flex; flex-direction: column">
{(v.story).map((st: any, st_i: number) => (<Fragment key={st_i}>
<div data-step={st.i} class={`stepb pc ${st.cls}`} style={`min-height: 600px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; gap: 14px; opacity: ${st.op}`}>
<span class="tag" style="align-self: flex-start">{st.n} · {st.k}</span>
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)">{st.wasK}</span>
<span style="font-size: 20px; line-height: 1.35"><span class="was" style="color: var(--muted); -webkit-box-decoration-break: clone; box-decoration-break: clone">{st.was}</span></span>
<span class="arw" aria-hidden="true" style="width: 56px; height: 2px; background: var(--accent)"></span>
<strong class="now" style="font-weight: 800; font-size: clamp(28px, 3vw, 44px); line-height: 1.05; letter-spacing: -0.035em">{st.now}</strong>
<span class="det" style="max-width: 520px; color: var(--muted); font-size: 17px">{st.det}</span>
</div>
</Fragment>))}
</div>
<div class="stickyh" style="flex: 1 1 480px; min-width: 0; align-self: flex-start; position: sticky; top: 110px; display: flex; flex-direction: column; align-items: center; gap: 14px; padding-top: 40px">
<div style="position: relative; width: 100%; max-width: 520px; aspect-ratio: 1; border-radius: 28px; border: 1px solid var(--line); background: var(--bg); overflow: hidden; display: flex; align-items: center; justify-content: center">
<div aria-hidden="true" style="position: absolute; inset: 0; background-image: linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px); background-size: 32px 32px"></div>
<div data-holo-cfg="1" data-shape={v.storyShape} data-level="1" data-dark={v.darkStr} style="width: 500px; height: 500px"><HoloDiferido shape={v.storyShape} level={v.holoLevel} dark={v.dark} size={v.holoS} backdrop={v.no} frame={v.no} /></div>
<span class="tag solid" style="position: absolute; left: 18px; top: 16px">enfoque · {v.storyLabel}</span>
<span aria-hidden="true" style="position: absolute; right: 18px; top: 22px; display: flex; gap: 6px">{(v.storyDots).map((d: any, d_i: number) => (<Fragment key={d_i}><span style={`width: 22px; height: 4px; border-radius: 99px; background: ${d.bg}; transition: background .4s`}></span></Fragment>))}</span>
</div>
<p style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)">Arrástralo para girarlo · al hacer scroll se deforma</p>
</div>
</div>

<div style="margin-top: clamp(72px, 9vw, 120px)">
<h3 style="margin: 0 0 12px; font-weight: 800; font-size: clamp(30px, 3.6vw, 52px); line-height: 1; letter-spacing: -0.04em"><span class="rvl"><span>Así miro un proceso:</span></span><span class="rvl"><span style="color: var(--accent-text)">el radar de oportunidades.</span></span></h3>
<p class="rv" style="margin: 0 0 32px; max-width: 700px; color: var(--muted)">Cada idea pasa por las mismas preguntas: ¿se repite?, ¿tiene reglas claras?, ¿qué pasa si sale mal?, ¿cuánto tiempo devuelve? Cuanto más cerca del centro, mejor oportunidad. Toca cada punto.</p>
<div style="display: flex; flex-wrap: wrap; gap: 28px 56px; align-items: center">
<div style="flex: 1 1 420px; min-width: 0; display: flex; justify-content: center">
<div style="position: relative; width: 100%; max-width: 500px; aspect-ratio: 1">
<div aria-hidden="true" style="position: absolute; inset: 0; border-radius: 50%; background: var(--bg); border: 1px solid var(--line)"></div>
<div aria-hidden="true" style="position: absolute; inset: 16.5%; border-radius: 50%; border: 1px dashed var(--line)"></div>
<div aria-hidden="true" style="position: absolute; inset: 33%; border-radius: 50%; border: 1px dashed var(--line)"></div>
<div aria-hidden="true" style="position: absolute; inset: 44%; border-radius: 50%; background: var(--accent-soft); border: 1px solid var(--accent)"></div>
<div aria-hidden="true" style="position: absolute; left: 50%; top: 2%; bottom: 2%; width: 1px; background: var(--line)"></div>
<div aria-hidden="true" style="position: absolute; top: 50%; left: 2%; right: 2%; height: 1px; background: var(--line)"></div>
<div aria-hidden="true" class="sweepr" style="position: absolute; inset: 0; border-radius: 50%; background: conic-gradient(from 0deg, transparent 0deg 285deg, var(--sweep) 360deg)"></div>
<span aria-hidden="true" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10px; color: var(--accent-text); text-align: center; line-height: 1.1">más<br />valor</span>
{(v.blips).map((b: any, b_i: number) => (<Fragment key={b_i}>
<button type="button" class="blip" onClick={b.pick} aria-pressed={b.pressed} aria-label={b.name} style={`position: absolute; left: ${b.x}%; top: ${b.y}%; width: 44px; height: 44px; margin: -22px 0 0 -22px; border: 0; padding: 0; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center`}>
<span class="ping" aria-hidden="true" style={`position: absolute; width: 16px; height: 16px; border-radius: 99px; border: 2px solid ${b.c}; animation-delay: ${b.d}s`}></span>
<span aria-hidden="true" style={`width: ${b.s}px; height: ${b.s}px; border-radius: 99px; background: ${b.c}; box-shadow: 0 0 0 ${b.ring}px var(--bg), 0 0 0 ${b.ring2}px ${b.c}`}></span>
</button>
<span aria-hidden="true" style={`position: absolute; left: ${b.lx}%; top: ${b.ly}%; transform: translate(${b.tx}, -50%); font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: ${b.lc}; white-space: nowrap; pointer-events: none`}>{b.short}</span>
</Fragment>))}
</div>
</div>
<div role="status" style={`flex: 1 1 420px; min-width: 0; padding: clamp(24px, 3vw, 36px); border-radius: 26px; background: var(--bg); border: 1px solid ${v.bl.border}; display: flex; flex-direction: column; gap: 16px`}>
<span class={`tag ${v.bl.tagCls}`} style="align-self: flex-start">{v.bl.verdict}</span>
<strong style="font-weight: 800; font-size: clamp(26px, 2.6vw, 36px); line-height: 1.05; letter-spacing: -0.03em">{v.bl.name}</strong>
<div style="display: flex; flex-direction: column; gap: 10px">
{(v.bl.bars).map((x: any, x_i: number) => (<Fragment key={x_i}>
<div style="display: flex; flex-direction: column; gap: 4px">
<span style="display: flex; justify-content: space-between; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)"><span>{x.l}</span><span>{x.word}</span></span>
<span style="height: 8px; border-radius: 99px; background: var(--inner)"><span class="bar" style={`display: block; height: 8px; width: ${x.v}%; border-radius: 99px; background: ${x.c}`}></span></span>
</div>
</Fragment>))}
</div>
<p style="margin: 0; font-size: 17px; line-height: 1.45">{v.bl.text}</p>
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)">Valoración cualitativa, no una medición.</span>
</div>
</div>
</div>
<p data-seen="Big" class={`bigf ${v.bigCls}`} style="margin: clamp(56px, 8vw, 96px) 0 0; max-width: 1100px; font-weight: 800; font-size: clamp(34px, 5vw, 76px); line-height: 1.02; letter-spacing: -0.045em; text-wrap: balance">No me quedo en la petición. <span style="color: var(--accent-text)">Busco la oportunidad.</span></p>
</div>
</section>

<section id="solucion" style="max-width: 1320px; margin: 0 auto; padding: clamp(56px, 9vw, 120px) clamp(20px, 4vw, 48px)">
<p style="margin: 0 0 16px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 14px; color: var(--muted)">03 — La solución</p>
<div style="display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 32px">
<div style="flex: 999 1 560px; min-width: 0">
<h2 style="margin: 0 0 16px; font-weight: 800; font-size: clamp(34px, 4.6vw, 68px); line-height: 1; letter-spacing: -0.045em"><span class="rvl"><span>Dos piezas.</span></span><span class="rvl"><span style="color: var(--muted)">Ninguna herramienta nueva.</span></span></h2>
<p class="rv" style="margin: 0; max-width: 640px; color: var(--muted)">Aprovechar lo que ya existía y escribir código solo donde hace falta exactitud. Lo exacto, para el código. Lo dudoso, para el asistente. Lo importante, para la persona.</p>
</div>
<a href="/casos/automatizacion-y-asistente-ia/demo/" class="cta pulse" style="display: inline-flex; align-items: center; min-height: 60px; padding: 0 32px; border-radius: 999px; background: var(--accent); color: var(--on-accent); text-decoration: none; font-weight: 600; font-size: 18px"><span>Probar la demo →</span></a>
</div>

<div data-seen="Chat" style="padding: clamp(22px, 4vw, 48px); border-radius: 28px; background: var(--panel); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 24px">
<div style="display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 18px">
<div style="flex: 999 1 480px; min-width: 0; display: flex; flex-direction: column; gap: 10px">
<p style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 13px; color: var(--accent-text)">A · el asistente que ya existía</p>
<h3 style="margin: 0; font-weight: 800; font-size: clamp(30px, 3.6vw, 52px); line-height: 1; letter-spacing: -0.04em">De buscador <span style="color: var(--accent-text)">a copiloto.</span></h3>
<p style="margin: 0; max-width: 640px; color: var(--muted)">El equipo ya tenía un asistente con toda la documentación de la herramienta, pero le preguntaba como a un buscador. Con un método (contexto completo, pregunta con plantilla y respuesta que se valida) pasa a guiar el trabajo paso a paso.</p>
</div>
<div role="group" aria-label="Cómo se pregunta" style="display: inline-flex; padding: 4px; border-radius: 999px; border: 1px solid var(--line); background: var(--bg)">
<button type="button" class="seg" onClick={v.toA} aria-pressed={v.aStr} style={`min-height: 44px; padding: 0 18px; border: 0; border-radius: 999px; background: ${v.aBg}; color: ${v.aFg}; font: inherit; font-size: 15px; font-weight: 700; cursor: pointer`}>Como se usaba</button>
<button type="button" class="seg" onClick={v.toB} aria-pressed={v.bStr} style={`min-height: 44px; padding: 0 18px; border: 0; border-radius: 999px; background: ${v.bBg}; color: ${v.bFg}; font: inherit; font-size: 15px; font-weight: 700; cursor: pointer`}>Con método</button>
</div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: stretch">
<div style="flex: 1 1 360px; min-width: 0; padding: 22px; border-radius: 20px; background: var(--bg); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 12px">
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)">Tu pregunta</span>
{(v.chatQ).map((q: any, q_i: number) => (<Fragment key={q_i}>
<div style="display: flex; flex-direction: column; gap: 4px; padding: 12px 14px; border-radius: 14px; background: var(--inner)">
{(q.hasK) && (<><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--accent-text)">{q.k}</span></>)}
<span style="font-size: 16px; font-weight: 600; line-height: 1.4">{q.t}</span>
</div>
</Fragment>))}
<span style="margin-top: auto; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)">{v.chatNote}</span>
</div>
<div aria-live="off" style={`flex: 1.3 1 420px; min-width: 0; padding: 22px; border-radius: 20px; background: var(--bg); border: 1px solid ${v.chatBorder}; display: flex; flex-direction: column; gap: 10px; min-height: 340px; box-sizing: border-box`}>
<span style="display: flex; align-items: center; gap: 8px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)"><span style="width: 8px; height: 8px; border-radius: 99px; background: var(--accent)"></span>Asistente documental · respuesta</span>
{(v.chatLines).map((l: any, l_i: number) => (<Fragment key={l_i}>
<div class="ln2" style={`display: flex; gap: 10px; align-items: baseline; padding: ${l.pad}; border-radius: 10px; background: ${l.bg}; color: ${l.col}; font-family: ${l.ff}; font-size: ${l.fs}px; font-weight: ${l.fw}; line-height: 1.4`}>
{(l.hasN) && (<><span style="flex: 0 0 24px; width: 24px; height: 24px; border-radius: 8px; background: var(--accent); color: var(--on-accent); display: inline-flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; font-weight: 500">{l.n}</span></>)}
<span>{l.t}</span>
</div>
</Fragment>))}
</div>
</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr)); gap: 10px">
{(v.method).map((m: any, m_i: number) => (<Fragment key={m_i}>
<div style={`display: flex; gap: 12px; align-items: baseline; padding: 14px 16px; border-top: 2px solid ${m.c}`}><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 13px; color: var(--accent-text)">{m.n}</span><span style="display: flex; flex-direction: column"><strong style="font-size: 17px">{m.t}</strong><span style="font-size: 14px; color: var(--muted)">{m.s}</span></span></div>
</Fragment>))}
</div>
</div>

<div data-seen="Gen" style="margin-top: 16px; padding: clamp(22px, 4vw, 48px); border-radius: 28px; background: var(--panel); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 24px">
<div style="display: flex; flex-direction: column; gap: 10px; max-width: 760px">
<p style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 13px; color: var(--accent-text)">B · el generador</p>
<h3 style="margin: 0; font-weight: 800; font-size: clamp(30px, 3.6vw, 52px); line-height: 1; letter-spacing: -0.04em">Lo que eran días, <span style="color: var(--accent-text)">en segundos.</span></h3>
<p style="margin: 0; color: var(--muted)">Un prototipo en Python lee un inventario y escribe todas las configuraciones siguiendo las mismas plantillas: siempre igual, sin errores de copia. Pulsa el botón.</p>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 24px 40px; align-items: flex-start">
<div style="flex: 1 1 380px; min-width: 0; display: flex; flex-direction: column; gap: 14px">
<div style="border-radius: 18px; border: 1px solid var(--line); background: var(--bg); overflow: hidden">
<div style="display: flex; justify-content: space-between; gap: 8px; padding: 12px 16px; border-bottom: 1px solid var(--line); font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)"><span>inventario_ingestas.csv</span><span>412 filas · ficticio</span></div>
<div style="overflow-x: auto">
<table style="width: 100%; border-collapse: collapse; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 13px">
<thead><tr><th scope="col" style="text-align: left; padding: 9px 16px; color: var(--muted); font-weight: 500">tabla</th><th scope="col" style="text-align: left; padding: 9px 8px; color: var(--muted); font-weight: 500">origen</th><th scope="col" style="text-align: left; padding: 9px 16px 9px 8px; color: var(--muted); font-weight: 500">frecuencia</th></tr></thead>
<tbody>
{(v.inv).map((r: any, r_i: number) => (<Fragment key={r_i}><tr style={`border-top: 1px solid var(--line); background: ${r.bg}; transition: background .3s`}><td style="padding: 9px 16px">{r.a}</td><td style="padding: 9px 8px">{r.b}</td><td style="padding: 9px 16px 9px 8px">{r.c}</td></tr></Fragment>))}
</tbody>
</table>
</div>
<div style="padding: 10px 16px; border-top: 1px solid var(--line); font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)">… y 406 filas más</div>
</div>
<button type="button" onClick={v.runGen} class="cta" style="align-self: flex-start; min-height: 56px; padding: 0 28px; border-radius: 999px; border: 0; background: var(--accent); color: var(--on-accent); font: inherit; font-weight: 700; cursor: pointer"><span>{v.genBtn}</span></button>
</div>
<div style="flex: 1.3 1 440px; min-width: 0; display: flex; flex-direction: column; gap: 16px">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(130px, 100%), 1fr)); gap: 10px">
{(v.genCount).map((g: any, g_i: number) => (<Fragment key={g_i}>
<div style={`padding: 14px 16px; border-radius: 16px; border: 1px solid ${g.border}; background: var(--bg); display: flex; flex-direction: column; gap: 2px`}><strong style={`font-weight: 800; font-size: 30px; line-height: 1; letter-spacing: -0.04em; color: ${g.c}`}>{g.v}</strong><span style="font-size: 13px; color: var(--muted)">{g.l}</span></div>
</Fragment>))}
</div>
<div aria-hidden="true" style="display: grid; grid-template-columns: repeat(28, minmax(0, 1fr)); gap: 3px; padding: 14px; border-radius: 16px; background: var(--bg); border: 1px solid var(--line)">
{(v.tiles).map((x: any, x_i: number) => (<Fragment key={x_i}><span class="tile" style={`aspect-ratio: 1; border-radius: 2px; background: ${x.bg}`}></span></Fragment>))}
</div>
<div role="status" style="display: flex; flex-direction: column; gap: 4px">
<strong style="font-size: 17px">{v.genStatus}</strong>
<span style="font-size: 14px; color: var(--muted)">A mano serían unas 137 horas (supuesto ilustrativo: 20 minutos por ingesta).</span>
</div>
</div>
</div>
</div>

<div data-seen="Tl" class={`tl ${v.tlCls}`} style="margin-top: clamp(64px, 8vw, 104px)">
<h3 style="margin: 0 0 12px; font-weight: 800; font-size: clamp(30px, 3.6vw, 52px); line-height: 1; letter-spacing: -0.04em"><span class="rvl"><span>Del prototipo</span></span><span class="rvl"><span style="color: var(--muted)">al día a día.</span></span></h3>
<p class="rv" style="margin: 0 0 32px; max-width: 640px; color: var(--muted)">Lo que empezó como una prueba acabó convirtiéndose en una formación interna sobre IA y en el asistente que uso cada día.</p>
<div style="position: relative">
<div aria-hidden="true" class="honly" style="position: absolute; left: 0; right: 0; top: 15px; height: 2px; background: var(--line)"></div>
<div aria-hidden="true" class="honly tlbar" style="position: absolute; left: 0; right: 0; top: 15px; height: 2px; background: var(--accent)"></div>
<ol style="list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr)); gap: 24px">
{(v.milestones).map((m: any, m_i: number) => (<Fragment key={m_i}>
<li class="tli" style={`position: relative; display: flex; flex-direction: column; gap: 10px; animation-delay: ${m.d}s`}>
<span aria-hidden="true" style={`width: 32px; height: 32px; box-sizing: border-box; border-radius: 99px; border: 2px solid var(--accent); background: ${m.dot}; color: ${m.dotFg}; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px`}>{m.n}</span>
<strong style="font-weight: 800; font-size: 23px; line-height: 1.1; letter-spacing: -0.02em">{m.t}</strong>
<span style="color: var(--muted); font-size: 16px">{m.s}</span>
</li>
</Fragment>))}
</ol>
</div>
</div>
</section>

<section id="cambio" style="border-top: 1px solid var(--line)">
<div style="max-width: 1320px; margin: 0 auto; padding: clamp(56px, 9vw, 120px) clamp(20px, 4vw, 48px)">
<p style="margin: 0 0 16px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 14px; color: var(--accent-text)">04 — El cambio</p>
<h2 style="margin: 0 0 16px; font-weight: 800; font-size: clamp(44px, 7vw, 112px); line-height: 0.95; letter-spacing: -0.05em"><span class="rvl"><span>De días copiando</span></span><span class="rvl"><span style="color: var(--accent-text)">a horas revisando.</span></span></h2>
<p class="rv" style="margin: 0 0 36px; max-width: 640px; color: var(--muted)">Mueve el deslizador: de hacerlo todo a mano a dejar que el generador haga lo repetitivo. Elige también cuántas configuraciones tiene tu equipo por delante.</p>

<div style="padding: clamp(22px, 4vw, 48px); border-radius: 28px; background: var(--panel); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 28px">
<div style="display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 20px">
<fieldset style="margin: 0; padding: 0; border: 0">
<legend style="padding: 0; margin-bottom: 10px; font-size: 14px; font-weight: 700">¿Cuántas configuraciones?</legend>
<div style="display: flex; flex-wrap: wrap; gap: 8px">
{(v.vols).map((v: any, v_i: number) => (<Fragment key={v_i}><button type="button" onClick={v.pick} aria-pressed={v.pressed} style={`min-height: 44px; padding: 0 18px; border-radius: 999px; border: 1px solid ${v.border}; background: ${v.bg}; color: ${v.fg}; font: inherit; font-size: 15px; font-weight: 700; cursor: pointer`}>{v.l}</button></Fragment>))}
</div>
</fieldset>
<div role="status" style="display: flex; flex-wrap: wrap; gap: 14px 40px; align-items: flex-end">
<div style="display: flex; flex-direction: column"><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)">a mano</span><span style="font-weight: 800; font-size: 32px; letter-spacing: -0.03em; color: var(--muted)">{v.manH} h</span></div>
<div style="display: flex; flex-direction: column"><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--accent-text)">tiempo estimado</span><span style="font-weight: 800; font-size: clamp(56px, 6vw, 88px); line-height: 0.9; letter-spacing: -0.055em; color: var(--accent-text)">{v.slH} h</span></div>
</div>
</div>
<div aria-hidden="true" style="display: grid; grid-template-columns: repeat(15, minmax(0, 1fr)); gap: 8px">
{(v.icons).map((i: any, i_i: number) => (<Fragment key={i_i}>
<span class="ico" style={`height: 42px; border-radius: 6px; border: 1.5px solid ${i.border}; background: ${i.bg}; display: flex; flex-direction: column; justify-content: center; gap: 4px; padding: 0 6px; box-sizing: border-box; transform: ${i.tf}`}>
<span style={`height: 3px; width: 80%; border-radius: 2px; background: ${i.line}`}></span><span style={`height: 3px; width: 55%; border-radius: 2px; background: ${i.line}`}></span><span style={`height: 3px; width: 70%; border-radius: 2px; background: ${i.line}`}></span>
</span>
</Fragment>))}
</div>
<div style="display: flex; flex-direction: column; gap: 6px">
<input class="rng" type="range" min="0" max="100" value={v.sl} onInput={v.onSl} onChange={v.onSl} aria-label="Cuánto se automatiza, de todo a mano a lo repetitivo generado" aria-valuetext={v.slText} style="accent-color: var(--accent)" />
<div style="display: flex; justify-content: space-between; gap: 12px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)"><span>Todo a mano</span><span>Lo repetitivo, generado</span></div>
</div>
<p style="margin: 0; font-weight: 700; font-size: 19px">{v.slMsg}</p>
<p style="margin: 0; font-size: 13px; color: var(--muted)">Ejemplo ilustrativo con 20 minutos por configuración a mano. El 90 % es la eficiencia estimada del prototipo frente a la construcción manual, no una medición en producción.</p>
</div>

<h3 style="margin: clamp(64px, 8vw, 104px) 0 20px; font-weight: 800; font-size: clamp(28px, 3.4vw, 48px); line-height: 1; letter-spacing: -0.04em"><span class="rvl"><span>Lo que demostró el prototipo</span></span></h3>
<div data-seen="Nums" class={`nums ${v.numsCls}`} style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr)); gap: 12px">
{(v.nums).map((n: any, n_i: number) => (<Fragment key={n_i}>
<div class="lift" style="padding: 28px; border-radius: 24px; border: 1px solid var(--line); display: flex; flex-direction: column; gap: 8px">
<span class="num" style={`font-weight: 800; font-size: clamp(56px, 6vw, 92px); line-height: 0.9; letter-spacing: -0.055em; color: var(--accent-text); animation-delay: ${n.d}s`}>{n.v}<span style="font-size: 0.42em; letter-spacing: -0.03em">{n.u}</span></span>
<strong style="font-weight: 800; font-size: 19px; line-height: 1.2">{n.title}</strong>
<span style="color: var(--muted); font-size: 15px">{n.text}</span>
</div>
</Fragment>))}
</div>

<div class="rv" style="margin-top: 16px; padding: clamp(24px, 4vw, 52px); border-radius: 28px; background: var(--panel); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 28px">
<div style="max-width: 860px; display: flex; flex-direction: column; gap: 12px">
<h3 style="margin: 0; font-weight: 800; font-size: clamp(30px, 3.8vw, 56px); line-height: 1; letter-spacing: -0.045em">Un prototipo que demostró la idea. <span style="color: var(--accent-text)">Un producto cuando lo necesites.</span></h3>
<p style="margin: 0; color: var(--muted)">Lo que hice para mi equipo fueron prototipos: no se implantaron de forma masiva y la eficiencia es una estimación. Para tu equipo, el siguiente paso es llevarlo a producción, con el mismo método.</p>
</div>
<div style="display: flex; flex-wrap: wrap; align-items: stretch; gap: 14px">
<div style="flex: 1 1 340px; min-width: 0; padding: 28px; border-radius: 22px; border: 1px dashed var(--muted); display: flex; flex-direction: column; gap: 14px">
<span class="tag mut" style="align-self: flex-start">Prototipo · lo que hice</span>
<strong style="font-weight: 800; font-size: 24px; letter-spacing: -0.02em">Para demostrar que funciona</strong>
<ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px">
{(v.proto).map((p: any, p_i: number) => (<Fragment key={p_i}><li style="display: flex; gap: 10px; align-items: baseline; font-size: 16px"><span aria-hidden="true" style="color: var(--muted)">—</span><span>{p.t}</span></li></Fragment>))}
</ul>
</div>
<div class="honly" aria-hidden="true" style="flex: 0 0 auto; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: var(--accent-text)"><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; writing-mode: vertical-rl; transform: rotate(180deg)">mismo método</span><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14 M13 6l6 6-6 6"></path></svg></div>
<div style="flex: 1 1 340px; min-width: 0; padding: 28px; border-radius: 22px; border: 2px solid var(--accent); background: var(--bg); display: flex; flex-direction: column; gap: 14px">
<span class="tag" style="align-self: flex-start">Producto · lo que haríamos para ti</span>
<strong style="font-weight: 800; font-size: 24px; letter-spacing: -0.02em">Para tu equipo, en producción</strong>
<ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px">
{(v.prod).map((p: any, p_i: number) => (<Fragment key={p_i}><li style="display: flex; gap: 10px; align-items: baseline; font-size: 16px"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" style="flex: 0 0 16px; position: relative; top: 2px"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="var(--accent)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>{p.t}</span></li></Fragment>))}
</ul>
</div>
</div>
</div>

<h3 style="margin: clamp(72px, 9vw, 120px) 0 12px; font-weight: 800; font-size: clamp(32px, 4vw, 60px); line-height: 1; letter-spacing: -0.045em"><span class="rvl"><span>Una plantilla,</span></span><span class="rvl"><span style="color: var(--muted)">para cualquier trabajo repetitivo.</span></span></h3>
<p class="rv" style="margin: 0 0 32px; max-width: 640px; color: var(--muted)">Datos, documentos, altas, informes o dudas del equipo: el camino es el mismo.</p>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr)); gap: 14px">
{(v.line3).map((l: any, l_i: number) => (<Fragment key={l_i}>
<div class="rv lift" style={`padding: 32px; border-radius: 28px; background: ${l.bg}; color: ${l.fg}; border: 1px solid ${l.border}; display: flex; flex-direction: column; gap: 12px; min-height: 220px; box-sizing: border-box`}>
<span style={`font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 13px; color: ${l.numColor}`}>{l.n}</span>
<strong style="font-weight: 800; font-size: clamp(28px, 3vw, 40px); line-height: 1; letter-spacing: -0.035em">{l.title}</strong>
<span style="font-size: 16px; opacity: .85">{l.text}</span>
</div>
</Fragment>))}
</div>
<div class="rv" style="display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; margin-top: 18px">
<span style="font-size: 15px; color: var(--muted)">Sirve para:</span>
{(v.uses).map((u: any, u_i: number) => (<Fragment key={u_i}><span class="tag">{u.t}</span></Fragment>))}
</div>
</div>
</section>

<section style="max-width: 1320px; margin: 0 auto; padding: 0 clamp(20px, 4vw, 48px) clamp(56px, 8vw, 96px)">
<div class="rv" style="padding: clamp(32px, 6vw, 72px); border-radius: 32px; background: var(--fg); color: var(--bg); display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 28px">
<h2 style="flex: 999 1 520px; min-width: 0; margin: 0; font-weight: 800; font-size: clamp(34px, 5vw, 76px); line-height: 0.98; letter-spacing: -0.05em">¿Qué hace tu equipo a mano que no debería?</h2>
<div style="display: flex; flex-wrap: wrap; gap: 12px">
<a href="/?para=clientes#contacto" style="display: inline-flex; align-items: center; min-height: 56px; padding: 0 28px; border-radius: 999px; background: var(--accent); color: var(--on-accent); text-decoration: none; font-weight: 600">Cuéntame tu idea</a>
<a href="/casos/automatizacion-y-asistente-ia/demo/" style="display: inline-flex; align-items: center; min-height: 56px; padding: 0 28px; border-radius: 999px; border: 1px solid var(--bg); text-decoration: none; font-weight: 600">Probar la demo</a>
<a href="/casos/red-de-agentes/" style="display: inline-flex; align-items: center; min-height: 56px; padding: 0 20px; text-decoration: none; font-weight: 600">Siguiente caso: agentes →</a>
</div>
</div>
</section>

</div>

      </>
    );
  }
}

export const Desktop = conTema(Logica);
