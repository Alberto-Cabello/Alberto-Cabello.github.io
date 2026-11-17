// @ts-nocheck
// Generado desde el tablero DemoStudy y revisado a mano: lógica, textos y estilos tal cual.
import { Fragment } from 'preact';
import { DCLogic, conTema } from '../../lib/dclogic';
import './Desktop.css';

class Logica extends DCLogic {

  content(en) {
    const T = (es, e) => (en ? e : es);
    return {
      kicker: T('LECCIÓN 2 · 6 MIN · CONDENSADA', 'LESSON 2 · 6 MIN · CONDENSED'),
      title: T('Cómo reconocer un correo trampa', 'How to spot a phishing email'),
      intro1: T('El', 'Most'),
      intro2: T('casi siempre se delata por tres señales. Encuéntralas en el correo:', 'emails give themselves away with three signs. Find them in the email:'),
      term: T('Engaño por correo o mensaje que suplanta a alguien de confianza para robarte datos o dinero.', 'A message that impersonates someone you trust to steal your data or money.'),
      scheme: T('ESQUEMA INTERACTIVO · TOCA LOS NÚMEROS', 'INTERACTIVE DIAGRAM · TAP THE NUMBERS'),
      from: T('De:', 'From:'), subj: T('Asunto:', 'Subject:'),
      subjText: T('Tu cuenta se bloqueará HOY', 'Your account will be locked TODAY'),
      btn: T('Verificar cuenta', 'Verify account'),
      signals: [
        { t: T('Remitente que imita a una marca', 'A sender imitating a brand'), s: T('«nubem4il»: un 4 en vez de una a.', '“nubem4il”: a 4 instead of an a.') },
        { t: T('Prisa o amenaza', 'Urgency or threats'), s: T('Te meten prisa para que no lo pienses.', 'They rush you so you don’t think.') },
        { t: T('Un botón que no lleva a donde dice', 'A button that goes somewhere else'), s: T('Mira la dirección antes de pulsar.', 'Check the address before tapping.') }
      ],
      qs: [
        { q: T('Un proveedor te pide con prisa pagar una factura a una cuenta bancaria nueva. ¿Qué haces?', 'A supplier urgently asks you to pay an invoice into a new bank account. What do you do?'), ok: 1,
          tip: T('Si hay prisa y dinero de por medio, confirma siempre por un canal que ya conocías.', 'If there’s urgency and money involved, always confirm through a channel you already knew.'),
          o: [[T('La pago para no retrasar el pedido', 'Pay it so the order isn’t delayed'), T('La prisa es justo la palanca del engaño.', 'Urgency is exactly the lever of the scam.')],
              [T('Lo confirmo por otro canal con mi contacto de siempre', 'Confirm through another channel with my usual contact'), T('Una llamada al número de siempre corta el fraude.', 'A call to the usual number stops the fraud.')],
              [T('Respondo al correo para preguntar', 'Reply to the email to ask'), T('Si el correo es falso, te contestará el atacante.', 'If the email is fake, the attacker will answer.')]] },
        { q: T('¿Qué enlace es el de verdad?', 'Which link is the real one?'), ok: 1,
          tip: T('Lee el dominio de derecha a izquierda desde la primera barra: lo último antes de la barra manda.', 'Read the domain right to left from the first slash: the last part before the slash rules.'),
          o: [['tubanco-seguro.com/acceso', T('Que diga «seguro» no lo hace seguro: no es el dominio de tu banco.', 'Saying “secure” doesn’t make it secure: it isn’t your bank’s domain.')],
              ['www.tubanco.es/acceso', T('Es el dominio oficial, escrito igual que siempre.', 'It’s the official domain, spelled as always.')],
              ['tubanco.es.verificar-datos.net', T('El dominio real es verificar-datos.net; «tubanco.es» es un disfraz.', 'The real domain is verificar-datos.net; “tubanco.es” is a disguise.')]] }
      ],
      cards: [
        { q: T('¿Qué tres señales delatan un correo trampa?', 'Which three signs give away a phishing email?'), a: T('Remitente que imita a una marca, prisa o amenaza, y un enlace que no lleva a donde dice.', 'A sender imitating a brand, urgency or threats, and a link that goes somewhere else.') },
        { q: T('¿Qué haces si te piden pagar a una cuenta nueva?', 'What do you do if asked to pay a new account?'), a: T('Confirmarlo por otro canal con tu contacto de siempre.', 'Confirm it through another channel with your usual contact.') },
        { q: T('¿Qué parte de un enlace dice adónde lleva?', 'Which part of a link tells you where it goes?'), a: T('El dominio justo antes de la primera barra.', 'The domain right before the first slash.') }
      ]
    };
  }
  planFor(mins) {
    const L = { key: 'lesson', title: 'Lección 2 · Correos trampa', why: 'Es la siguiente del temario', m: 6 };
    const Q = { key: 'quiz', title: 'Práctica · 2 preguntas', why: 'Fijarla mientras está fresca', m: 7 };
    const R = { key: 'review', title: 'Repaso · 3 fichas', why: 'Te tocan hoy', m: 5 };
    const P = { key: 'progress', title: 'Mira tu mapa del temario', why: 'Ver qué tema flojea', m: 3 };
    if (mins === 15) { return [L, R]; }
    if (mins === 45) { return [L, Q, R, P]; }
    return [L, Q, R];
  }
  componentWillUnmount() { clearTimeout(this.toastT); }
  complete(key, nextScr) {
    const s = this.state || {};
    const done = Object.assign({}, s.done || {}, { [key]: true });
    const plan = this.planFor(s.mins || 30);
    const all = plan.every((p) => done[p.key]);
    const upd = { done, scr: nextScr || 'home' };
    if (all && !s.streakOn) {
      upd.streakOn = true; upd.toastK = (s.toastK || 0) + 1; upd.showToast = true;
      clearTimeout(this.toastT);
      this.toastT = setTimeout(() => this.setState({ showToast: false }), 4200);
    }
    this.setState(upd);
  }
  fresh() { return { scr: 'home', mins: 30, done: {}, hot: {}, termOpen: false, qi: 0, ans: {}, ci: 0, flipped: false, rv: [], streakOn: false, showToast: false, topic: 0 }; }
  renderVals() {
    const s = this.state || {};
    const dark = s.dark !== undefined ? s.dark : (this.props.dark ?? true);
    const night = { bg: '#0B0B0C', fg: '#F2F0EB', muted: '#A09D96', line: '#29292B', panel: '#141415', inner: '#222224', accent: '#FF5B2E', accentText: '#FF7A55', accentSoft: 'rgba(255,91,46,0.12)', onAccent: '#0B0B0C', shadow: 'rgba(0,0,0,0.75)' };
    const light = { bg: '#F3F1EC', fg: '#111111', muted: '#55524C', line: '#DAD6CC', panel: '#FFFFFF', inner: '#ECE9E2', accent: '#B8350F', accentText: '#B8350F', accentSoft: 'rgba(184,53,15,0.09)', onAccent: '#FFFFFF', shadow: 'rgba(60,40,20,0.35)' };
    const t = dark ? night : light;
    const en = s.lang === 'en';
    const C = this.content(en);
    const BR = [{ name: 'Marca naranja', c: '#C2410C' }, { name: 'Marca azul', c: '#1D4ED8' }, { name: 'Marca verde', c: '#047857' }, { name: 'Marca violeta', c: '#6D28D9' }];
    const bi = s.brand || 0;
    const b = BR[bi].c;
    const bSoft = b + '1A';
    const scr = s.scr || 'home';
    const mins = s.mins || 30;
    const done = s.done || {};
    const plan = this.planFor(mins);
    const doneN = plan.filter((p) => done[p.key]).length;
    const GOOD = '#1F7A4D', BAD = '#B42318';
    const go = (x) => () => this.setState({ scr: x });
    const tasks = plan.map((p) => {
      const d = !!done[p.key];
      return { title: p.title, why: p.why, m: p.m, mark: d ? '✓' : '', dot: d ? GOOD : 'transparent', ring: d ? GOOD : '#C9C9D0', bg: d ? '#F1F7F3' : '#FFFFFF', deco: d ? 'line-through' : 'none', go: go(p.key) };
    });
    const mascot = doneN === 0 ? (mins === 15 ? 'Con 15 minutos, lo esencial: la lección y un repaso corto.' : mins === 45 ? 'Hoy da para todo: lección, práctica, repaso y un vistazo al mapa.' : 'Hoy toca lección, práctica y repaso. ¡Vamos!')
      : doneN < plan.length ? 'Llevas ' + doneN + ' de ' + plan.length + '. ¡Ya casi lo tienes!' : '¡Día completo! Racha encendida. Mañana, más.';
    const minChips = [15, 30, 45].map((m) => ({ l: m + '′', pressed: m === mins ? 'true' : 'false', bg: m === mins ? b : '#FFFFFF', fg: m === mins ? '#FFFFFF' : '#121214', border: m === mins ? b : '#E2E2E7', pick: () => this.setState({ mins: m }) }));
    const topics = [
      { name: 'Correos trampa', c: 2, r: 2, w: 25, acc: 80 },
      { name: 'Contraseñas', c: 2, r: 1, w: 20, acc: 55 },
      { name: 'Wifi y viajes', c: 1, r: 1, w: 15, acc: 30 },
      { name: 'Móvil', c: 1, r: 1, w: 15, acc: 0 },
      { name: 'Si algo sale mal', c: 2, r: 1, w: 15, acc: 0 },
      { name: 'Redes sociales', c: 2, r: 1, w: 10, acc: 20 }
    ];
    const fillOf = (acc) => (acc >= 70 ? b : acc >= 40 ? b + 'A6' : acc > 0 ? b + '40' : '#ECECF0');
    const ti = s.topic || 0;
    const mapMini = topics.map((x) => ({ c: x.c, r: x.r, bg: fillOf(x.acc) }));
    const mapBig = topics.map((x, i) => ({ name: x.name, c: x.c, r: x.r, bg: fillOf(x.acc), fg: x.acc >= 70 ? '#FFFFFF' : '#121214', ring: i === ti ? '#121214' : 'transparent', aria: x.name + ': pesa ' + x.w + ' %, acierto ' + x.acc + ' %', pick: () => this.setState({ topic: i }) }));
    const tp = topics[ti];
    const mapDetail = tp.name + ' · pesa un ' + tp.w + ' % del temario · tu acierto: ' + (tp.acc ? tp.acc + ' %' : 'sin empezar') + (tp.acc >= 70 ? '. Dominado.' : tp.acc > 0 ? '. El plan lo refuerza esta semana.' : '. Entra en el plan cuando toque.');
    const hot = s.hot || {};
    const hotN = [1, 2, 3].filter((k) => hot[k]).length;
    const hk = (k) => () => this.setState({ hot: Object.assign({}, hot, { [k]: true }) });
    const hotBg = (k) => (hot[k] ? GOOD : b);
    const found = [1, 2, 3].filter((k) => hot[k]).map((k) => ({ n: k, t: C.signals[k - 1].t, s: C.signals[k - 1].s }));
    const qPlan = plan.some((p) => p.key === 'quiz');
    const qi = s.qi || 0;
    const ans = s.ans || {};
    const q = C.qs[Math.min(qi, 1)];
    const my = ans[qi];
    const answered = scr === 'quiz' && my !== undefined;
    const opts = q.o.map((o, i) => {
      const isOk = i === q.ok, mine = i === my;
      let border = '#E2E2E7', bg = '#FFFFFF', mark = String.fromCharCode(65 + i), markBg = '#EEEEF2', markFg = '#121214';
      if (answered) {
        if (isOk) { border = GOOD; bg = '#E9F5EE'; mark = '✓'; markBg = GOOD; markFg = '#FFFFFF'; }
        else if (mine) { border = BAD; bg = '#FDECEA'; mark = '✗'; markBg = BAD; markFg = '#FFFFFF'; }
        else { mark = '✗'; markFg = '#6A6A72'; }
      }
      return { label: o[0], exp: o[1], mark, markBg, markFg, border, bg, showExp: answered, expHead: isOk ? 'Correcta.' : 'Falla:', expColor: isOk ? GOOD : BAD, disabled: answered ? 'true' : 'false', cursor: answered ? 'default' : 'pointer', pick: () => { if (answered) { return; } this.setState({ ans: Object.assign({}, ans, { [qi]: i }) }); } };
    });
    const ci = s.ci || 0;
    const rv = s.rv || [];
    const rvDone = ci >= C.cards.length;
    const card = C.cards[Math.min(ci, C.cards.length - 1)];
    const rate = (knew) => () => { const nrv = rv.concat([knew]); const nci = ci + 1; this.setState({ rv: nrv, ci: nci, flipped: false }); if (nci >= C.cards.length && !done.review) { const nd = Object.assign({}, done, { review: true }); const all = plan.every((p) => nd[p.key]); const u = { done: nd }; if (all && !s.streakOn) { u.streakOn = true; u.showToast = true; clearTimeout(this.toastT); this.toastT = setTimeout(() => this.setState({ showToast: false }), 4200); } this.setState(u); } };
    const accTotal = Math.round(topics.reduce((a, x) => a + x.w * x.acc, 0) / 100);
    const ringPct = scr === 'progress' ? accTotal : 0;
    const visited = { home: true, lesson: !!done.lesson, quiz: !!done.quiz, review: !!done.review, progress: !!done.progress || scr === 'progress' };
    const tourDefs = [
      ['home', 'Inicio y plan del día', 'Cambia los minutos y mira cómo se adapta'],
      ['lesson', 'Lección con esquema interactivo', 'Toca los puntos y el término subrayado'],
      ['quiz', 'Práctica que explica cada opción', 'Y cómo acertarla la próxima vez'],
      ['review', 'Repaso con fichas', 'Gira la ficha y dile si la sabías'],
      ['progress', 'Progreso, mapa y logros', 'Toca un tema del mapa']
    ];
    const tour = tourDefs.map((d, i) => {
      const on = scr === d[0];
      const ok = d[0] !== 'home' && visited[d[0]];
      return { title: d[1], sub: d[2], mark: ok ? '✓' : String(i + 1), cur: on ? 'true' : 'false', bg: on ? t.accentSoft : 'transparent', border: on ? t.accent : t.line, numBg: on || ok ? t.accent : t.inner, numFg: on || ok ? t.onAccent : t.fg, arrow: on ? t.accentText : t.muted, go: () => this.setState({ scr: d[0], flipped: false }) };
    });
    const explain = {
      home: 'El plan del día se recalcula con el tiempo que tienes. Cambia los minutos arriba y mira cómo se adapta. Toca una tarea para hacerla.',
      lesson: 'Lecciones condensadas con esquemas que se tocan, y el glosario al vuelo: toca los números del correo y la palabra subrayada.',
      quiz: 'Cada opción explica por qué es correcta o por qué falla, y una pista de cómo acertarla la próxima vez.',
      review: 'Repaso espaciado: lo que sabes se aleja en el tiempo y lo que fallas vuelve pronto. Toca la ficha para girarla.',
      progress: 'El mapa del temario: el tamaño es lo que pesa cada tema y el color, tu acierto. Los logros se ganan estudiando.'
    }[scr];
    const NAV = [
      ['home', 'Inicio', 'M4 11l8-7 8 7v9H4z M10 20v-6h4v6'],
      ['lesson', 'Estudiar', 'M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4z M20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z'],
      ['review', 'Repaso', 'M20 11a8 8 0 1 0-2.3 5.7 M20 4v7h-7'],
      ['progress', 'Progreso', 'M4 20V10 M10 20V4 M16 20v-7 M22 20H2']
    ];
    const tabs = NAV.map((n) => { const on = scr === n[0] || (n[0] === 'lesson' && scr === 'quiz'); return { l: n[1], icon: n[2], cur: on ? 'page' : 'false', color: on ? b : '#6A6A72', go: () => this.setState({ scr: n[0], flipped: false }) }; });
    const streakOn = !!s.streakOn;
    return {
      t, b, bSoft, C,
      modeLabel: dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro',
      toggle: () => this.setState({ dark: !dark }),
      langTag: en ? 'EN' : 'ES',
      streak: streakOn ? 1 : 0, streakColor: streakOn ? '#C2410C' : '#6A6A72', flameCls: streakOn ? 'flame' : '',
      isHome: scr === 'home', isLesson: scr === 'lesson', isQuiz: scr === 'quiz', isReview: scr === 'review', isProgress: scr === 'progress',
      tour, explain, tabs,
      brands: BR.map((x, i) => ({ name: x.name, c: x.c, pressed: i === bi ? 'true' : 'false', ring: i === bi ? t.fg : 'transparent', pick: () => this.setState({ brand: i }) })),
      toES: () => this.setState({ lang: 'es' }), toEN: () => this.setState({ lang: 'en' }),
      esStr: en ? 'false' : 'true', enStr: en ? 'true' : 'false',
      esBg: en ? 'transparent' : t.fg, esColor: en ? t.fg : t.bg, enBg: en ? t.fg : 'transparent', enColor: en ? t.bg : t.fg,
      mascot, minChips, mins, tasks, doneN, taskN: plan.length, planPct: Math.round((doneN / plan.length) * 100),
      mapMini, mapBig, mapDetail,
      toProgress: go('progress'),
      termOpen: !!s.termOpen, termStr: s.termOpen ? 'true' : 'false', toggleTerm: () => this.setState({ termOpen: !s.termOpen }),
      hot1: hk(1), hot2: hk(2), hot3: hk(3), hot1Bg: hotBg(1), hot2Bg: hotBg(2), hot3Bg: hotBg(3),
      hot1Cls: hot[1] ? '' : 'hot', hot2Cls: hot[2] ? '' : 'hot', hot3Cls: hot[3] ? '' : 'hot',
      found, foundText: hotN + ' de 3 señales encontradas' + (hotN === 3 ? ' ✓' : ''),
      lessonBtn: hotN < 3 ? 'Encuentra las 3 señales' : qPlan ? 'Hecho · ir a la práctica' : 'Hecho · volver al plan',
      lessonBtnBg: hotN < 3 ? '#E4E4E9' : b, lessonBtnFg: hotN < 3 ? '#3D3D44' : '#FFFFFF', lessonDis: hotN < 3 ? 'true' : 'false',
      lessonDone: () => { if (hotN < 3) { return; } this.complete('lesson', qPlan ? 'quiz' : 'home'); },
      qKicker: 'PRÁCTICA · ' + (qi + 1) + ' DE 2', qText: q.q, qTip: q.tip, opts, answered,
      qDots: [0, 1].map((k) => ({ bg: k < qi || (k === qi && answered) ? b : k === qi ? '#9A9AA2' : '#E4E4E9' })),
      nextLabel: qi >= 1 ? 'Terminar práctica' : 'Siguiente pregunta',
      nextQ: () => { if (qi >= 1) { this.setState({ qi: 0, ans: {} }); this.complete('quiz', 'home'); } else { this.setState({ qi: qi + 1 }); } },
      rvActive: !rvDone, rvDone, card, flipped: !!s.flipped, flipCls: s.flipped ? 'on' : '',
      rvPos: Math.min(ci + 1, C.cards.length) + ' DE ' + C.cards.length,
      flipCard: () => this.setState({ flipped: !s.flipped }), flipStr: s.flipped ? 'true' : 'false', frontHidden: s.flipped ? 'true' : 'false', backHidden: s.flipped ? 'false' : 'true', langAttr: en ? 'en' : 'es',
      rvKnew: rate(true), rvAgain: rate(false),
      rvSummary: C.cards.map((c, i) => ({ q: 'Ficha ' + (i + 1), when: rv[i] === false ? 'mañana' : 'en 4 días', c: rv[i] === false ? BAD : GOOD })),
      toHome: go('home'),
      ringPct, ringOff: Math.round(163 * (1 - ringPct / 100)),
      badges: [
        { n: 'Bronce', c: '#B07A4A', op: streakOn ? 1 : 0.35, filter: streakOn ? 'none' : 'grayscale(1)' },
        { n: 'Plata', c: '#9DA3AE', op: 0.35, filter: 'grayscale(1)' },
        { n: 'Oro', c: '#D8A520', op: 0.35, filter: 'grayscale(1)' },
        { n: 'Leyenda', c: b, op: 0.35, filter: 'grayscale(1)' }
      ],
      progressDone: () => this.complete('progress', 'home'),
      showToast: !!s.showToast,
      reset: () => this.setState(this.fresh())
    };
  }

  render() {
    const v = this.renderVals();
    return (
      <>
<div class="demo v-esc" style={`--b: ${v.b}; min-height: 100vh; box-sizing: border-box; background: var(--bg); color: var(--fg); font-family: Inter, 'Helvetica Neue', Arial, sans-serif; font-size: 16px; line-height: 1.5; display: flex; flex-direction: column; overflow-x: clip`}>

<header style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; padding: 14px clamp(16px, 3vw, 32px); border-bottom: 1px solid var(--line)">
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 14px">
<strong style="font-weight: 800; letter-spacing: -0.02em">Demo · App de estudio a medida</strong>
<span class="tag">Curso ficticio</span>
</div>
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 10px">
<button type="button" onClick={v.reset} style="min-height: 44px; padding: 0 16px; border-radius: 999px; border: 1px solid var(--line); background: transparent; color: var(--fg); font: inherit; font-weight: 600; cursor: pointer">Reiniciar</button>
<button onClick={v.toggle} aria-label={v.modeLabel} style="display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 999px; border: 1px solid var(--line); background: transparent; color: var(--fg); cursor: pointer"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"></circle><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"></path></svg></button>
<a href="/casos/app-de-estudio/" style="display: inline-flex; align-items: center; min-height: 44px; padding: 0 16px; border-radius: 999px; border: 1px solid var(--line); text-decoration: none; font-weight: 600">Cerrar</a>
</div>
</header>

<main style="flex: 1; display: flex; flex-wrap: wrap; gap: 24px 40px; padding: clamp(18px, 2.6vw, 32px) clamp(16px, 4vw, 56px); align-items: center">

<section aria-label="Guía de la demo" style="flex: 1 1 400px; min-width: 0; display: flex; flex-direction: column; gap: 16px">
<p style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 13px; color: var(--accent-text)">Curso ficticio · Ciberseguridad para tu equipo</p>
<h1 style="margin: 0; font-weight: 800; font-size: clamp(36px, 4vw, 62px); line-height: 0.95; letter-spacing: -0.05em">Tu temario, <span style="color: var(--accent-text)">convertido en una app.</span></h1>
<p style="margin: 0; max-width: 540px; color: var(--muted); font-size: 17px">Tócala: todo lo que ves funciona. Las funciones son las del Study Engine y el contenido es inventado. Simulacros con reloj, escudo de racha y traducción dentro de la lección están en la app completa.</p>

<nav aria-label="Recorre la app" style="display: flex; flex-direction: column; gap: 6px">
{(v.tour).map((p: any, p_i: number) => (<Fragment key={p_i}>
<button type="button" class="navb" onClick={p.go} aria-current={p.cur} style={`display: flex; align-items: center; gap: 12px; min-height: 52px; padding: 8px 14px; border-radius: 14px; border: 1px solid ${p.border}; background: ${p.bg}; color: var(--fg); font: inherit; text-align: left; cursor: pointer`}>
<span aria-hidden="true" style={`flex: 0 0 30px; width: 30px; height: 30px; border-radius: 9px; background: ${p.numBg}; color: ${p.numFg}; display: flex; align-items: center; justify-content: center; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 13px; font-weight: 500`}>{p.mark}</span>
<span style="flex: 1; display: flex; flex-direction: column; min-width: 0"><strong style="font-weight: 700; font-size: 15px">{p.title}</strong><span style="font-size: 13px; color: var(--muted)">{p.sub}</span></span>
<span aria-hidden="true" style={`color: ${p.arrow}`}>→</span>
</button>
</Fragment>))}
</nav>

<div role="status" style="padding: 14px 16px; border-left: 3px solid var(--accent); background: var(--panel); display: flex; flex-direction: column; gap: 2px">
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--accent-text)">LO QUE ESTÁS VIENDO</span>
<span style="font-weight: 600; font-size: 16px">{v.explain}</span>
</div>

<div style="display: flex; flex-wrap: wrap; align-items: flex-end; gap: 14px 28px">
<fieldset style="margin: 0; padding: 0; border: 0">
<legend style="padding: 0; margin-bottom: 8px; font-size: 14px; font-weight: 700">Ponle tu marca</legend>
<div style="display: flex; gap: 10px">
{(v.brands).map((x: any, x_i: number) => (<Fragment key={x_i}>
<button type="button" class="sw" onClick={x.pick} aria-pressed={x.pressed} aria-label={x.name} style={`width: 44px; height: 44px; border-radius: 99px; border: 3px solid ${x.ring}; background: ${x.c}; cursor: pointer; box-shadow: inset 0 0 0 3px var(--bg)`}></button>
</Fragment>))}
</div>
</fieldset>
<fieldset style="margin: 0; padding: 0; border: 0">
<legend style="padding: 0; margin-bottom: 8px; font-size: 14px; font-weight: 700">Idioma del contenido</legend>
<div style="display: inline-flex; padding: 3px; border-radius: 999px; border: 1px solid var(--line)">
<button type="button" onClick={v.toES} aria-pressed={v.esStr} style={`min-height: 44px; min-width: 50px; border: 0; border-radius: 999px; background: ${v.esBg}; color: ${v.esColor}; font: inherit; font-size: 14px; font-weight: 700; cursor: pointer`}>ES</button>
<button type="button" onClick={v.toEN} aria-pressed={v.enStr} style={`min-height: 44px; min-width: 50px; border: 0; border-radius: 999px; background: ${v.enBg}; color: ${v.enColor}; font: inherit; font-size: 14px; font-weight: 700; cursor: pointer`}>EN</button>
</div>
</fieldset>
<a href="/?para=clientes#contacto" class="btn" style="margin-left: auto; display: inline-flex; align-items: center; min-height: 48px; padding: 0 22px; border-radius: 999px; background: var(--accent); color: var(--on-accent); text-decoration: none; font-weight: 600">Quiero una app así</a>
</div>
</section>

<section aria-label="App de estudio" class="stage" style="flex: 1.2 1 480px; min-width: 0; position: relative; min-height: 780px; display: flex; align-items: center; justify-content: center">
<div aria-hidden="true" style="position: absolute; left: 50%; bottom: 26px; width: 340px; height: 44px; margin-left: -170px; border-radius: 50%; background: radial-gradient(closest-side, var(--shadow), transparent)"></div>
<div class="tilt">
<div class="float">
<div class="phone" style="position: relative; width: 352px; height: 736px; border-radius: 54px; background: #19191B; padding: 11px; box-sizing: border-box; box-shadow: 0 0 0 1.5px #3A3A3E, 14px 18px 0 -2px #0E0E10">
<div style="position: relative; height: 100%; border-radius: 44px; background: #FFFFFF; color: #121214; overflow: hidden; display: flex; flex-direction: column">
<div aria-hidden="true" style="position: absolute; left: 50%; top: 10px; width: 92px; height: 26px; margin-left: -46px; border-radius: 99px; background: #0E0E10; z-index: 3"></div>

<div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 46px 18px 8px">
<span style="display: flex; align-items: center; gap: 8px"><span aria-hidden="true" style={`width: 26px; height: 26px; border-radius: 8px; background: ${v.b}; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px`}>C</span><strong style="font-size: 14px; letter-spacing: -0.01em">Ciberseguridad</strong></span>
<span style="display: flex; align-items: center; gap: 10px; font-size: 12px; font-weight: 700"><span title="Racha" style={`display: flex; align-items: center; gap: 3px; color: ${v.streakColor}`}><svg class={v.flameCls} aria-hidden="true" width="16" height="16" viewBox="0 0 24 24"><path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-9z" fill={v.streakColor}></path></svg>{v.streak}</span><span style="color: #55555C">{v.langTag}</span></span>
</div>

<div class="appscroll" lang={v.langAttr} style="flex: 1; min-height: 0; overflow-y: auto; padding: 4px 16px 14px">

{(v.isHome) && (<>
<div class="scr" style="display: flex; flex-direction: column; gap: 11px">
<div style="display: flex; align-items: flex-end; gap: 8px">
<svg class="bob" aria-hidden="true" width="46" height="46" viewBox="0 0 80 80" style="flex: 0 0 46px"><path d="M40 8 C60 8 72 22 72 42 C72 62 58 74 40 74 C22 74 8 62 8 42 C8 22 20 8 40 8 Z" fill={v.b}></path><ellipse cx="30" cy="38" rx="5" ry="7" fill="#FFF"></ellipse><ellipse cx="50" cy="38" rx="5" ry="7" fill="#FFF"></ellipse><path d="M30 54 Q40 62 50 54" fill="none" stroke="#FFF" stroke-width="4" stroke-linecap="round"></path></svg>
<p class="pop" style="margin: 0; padding: 9px 12px; border-radius: 14px 14px 14px 4px; background: #F2F2F5; font-size: 12.5px; font-weight: 600; line-height: 1.3">{v.mascot}</p>
</div>
<div style="display: flex; align-items: center; justify-content: space-between; gap: 8px">
<span style="font-size: 12px; font-weight: 700">¿Cuánto tiempo tienes hoy?</span>
<span style="display: inline-flex; gap: 4px">
{(v.minChips).map((m: any, m_i: number) => (<Fragment key={m_i}><button type="button" class="tap" onClick={m.pick} aria-pressed={m.pressed} style={`min-height: 36px; min-width: 40px; padding: 0 9px; border-radius: 8px; border: 1.5px solid ${m.border}; background: ${m.bg}; color: ${m.fg}; font: inherit; font-size: 12px; font-weight: 700; cursor: pointer`}>{m.l}</button></Fragment>))}
</span>
</div>
<div style={`padding: 12px; border-radius: 16px; background: ${v.b}; color: #FFFFFF; display: flex; flex-direction: column; gap: 8px`}>
<span style="display: flex; justify-content: space-between; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px"><span>PLAN DE HOY · {v.mins} MIN</span><span>{v.doneN} de {v.taskN}</span></span>
<span style="height: 6px; border-radius: 9px; background: rgba(255,255,255,.3)"><span class="bar" style={`display: block; height: 6px; width: ${v.planPct}%; border-radius: 9px; background: #FFFFFF`}></span></span>
{(v.tasks).map((k: any, k_i: number) => (<Fragment key={k_i}>
<button type="button" class="tap pop" onClick={k.go} style={`display: flex; align-items: center; gap: 9px; min-height: 46px; padding: 7px 10px; border: 0; border-radius: 11px; background: ${k.bg}; color: #121214; font: inherit; text-align: left; cursor: pointer`}>
<span aria-hidden="true" style={`flex: 0 0 22px; width: 22px; height: 22px; border-radius: 99px; border: 2px solid ${k.ring}; background: ${k.dot}; color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; box-sizing: border-box`}>{k.mark}</span>
<span style="flex: 1; display: flex; flex-direction: column; min-width: 0"><strong style={`font-size: 12.5px; line-height: 1.2; text-decoration: ${k.deco}`}>{k.title}</strong><span style="font-size: 10.5px; color: #55555C">{k.why}</span></span>
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px; color: #55555C">{k.m}′</span>
</button>
</Fragment>))}
</div>
<button type="button" class="tap" onClick={v.toProgress} style="display: flex; flex-direction: column; gap: 6px; padding: 11px; border-radius: 14px; border: 1px solid #E6E6EA; background: #FFFFFF; color: #121214; font: inherit; text-align: left; cursor: pointer">
<span style="display: flex; justify-content: space-between; font-size: 11.5px; font-weight: 700"><span>Mapa del temario</span><span style="color: #55555C; font-weight: 600">Objetivo en 30 días →</span></span>
<span aria-hidden="true" style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); grid-auto-rows: 15px; gap: 3px; width: 100%">
{(v.mapMini).map((c: any, c_i: number) => (<Fragment key={c_i}><span style={`grid-column: span ${c.c}; grid-row: span ${c.r}; border-radius: 4px; background: ${c.bg}`}></span></Fragment>))}
</span>
</button>
</div>
</>)}

{(v.isLesson) && (<>
<div class="scr" style="display: flex; flex-direction: column; gap: 10px">
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px; color: #55555C">{v.C.kicker}</span>
<p style="margin: 0; font-weight: 800; font-size: 20px; line-height: 1.1; letter-spacing: -0.03em">{v.C.title}</p>
<p style="margin: 0; font-size: 13px; color: #3D3D44; line-height: 1.4">{v.C.intro1} <button type="button" class="tap" onClick={v.toggleTerm} aria-expanded={v.termStr} style={`padding: 0; border: 0; background: transparent; color: ${v.b}; font: inherit; font-weight: 700; text-decoration: underline dotted; text-underline-offset: 3px; cursor: pointer`}>phishing</button> {v.C.intro2}</p>
{(v.termOpen) && (<>
<div class="pop" style="padding: 10px 12px; border-radius: 12px; background: #121214; color: #FFFFFF; font-size: 12px; line-height: 1.35"><strong style="display: block; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px; color: #FFD7C7">GLOSARIO · PHISHING</strong>{v.C.term}</div>
</>)}
<div style="position: relative; padding: 12px; border-radius: 14px; border: 1px solid #E4E4E9; background: #FAFAFB; display: flex; flex-direction: column; gap: 6px; font-size: 11.5px">
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10px; color: #55555C">{v.C.scheme}</span>
<div style="display: flex; align-items: center; gap: 6px"><span style="color: #55555C">{v.C.from}</span><strong style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-weight: 500; font-size: 11px">soporte@nubem4il-cuentas.com</strong><button type="button" class={`tap ${v.hot1Cls}`} onClick={v.hot1} aria-label="Señal 1" style={`margin-left: auto; flex: 0 0 32px; width: 32px; height: 32px; border-radius: 99px; border: 0; background: ${v.hot1Bg}; color: #FFF; font: inherit; font-size: 12px; font-weight: 800; cursor: pointer`}>1</button></div>
<div style="display: flex; align-items: center; gap: 6px"><span style="color: #55555C">{v.C.subj}</span><strong>{v.C.subjText}</strong><button type="button" class={`tap ${v.hot2Cls}`} onClick={v.hot2} aria-label="Señal 2" style={`margin-left: auto; flex: 0 0 32px; width: 32px; height: 32px; border-radius: 99px; border: 0; background: ${v.hot2Bg}; color: #FFF; font: inherit; font-size: 12px; font-weight: 800; cursor: pointer`}>2</button></div>
<span style="height: 5px; width: 86%; border-radius: 4px; background: #E6E6EA"></span><span style="height: 5px; width: 64%; border-radius: 4px; background: #E6E6EA"></span>
<div style="display: flex; align-items: center; gap: 6px; margin-top: 2px"><span style="padding: 6px 12px; border-radius: 8px; background: #2B5CD6; color: #FFF; font-weight: 700">{v.C.btn}</span><button type="button" class={`tap ${v.hot3Cls}`} onClick={v.hot3} aria-label="Señal 3" style={`margin-left: auto; flex: 0 0 32px; width: 32px; height: 32px; border-radius: 99px; border: 0; background: ${v.hot3Bg}; color: #FFF; font: inherit; font-size: 12px; font-weight: 800; cursor: pointer`}>3</button></div>
</div>
<span style={`font-size: 11.5px; font-weight: 700; color: ${v.b}`}>{v.foundText}</span>
{(v.found).map((f: any, f_i: number) => (<Fragment key={f_i}>
<div class="pop" style="display: flex; gap: 8px; padding: 9px 10px; border-radius: 11px; background: #F2F2F5"><span aria-hidden="true" style={`flex: 0 0 20px; width: 20px; height: 20px; border-radius: 99px; background: ${v.b}; color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800`}>{f.n}</span><span style="display: flex; flex-direction: column"><strong style="font-size: 12px">{f.t}</strong><span style="font-size: 11px; color: #4A4A52">{f.s}</span></span></div>
</Fragment>))}
<span style={`align-self: flex-start; display: inline-flex; align-items: center; gap: 6px; padding: 4px 9px; border-radius: 6px; background: ${v.bSoft}; color: ${v.b}; font-size: 10.5px; font-weight: 700`}><svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M8.5 12.5l2.5 2.5 4.5-5"></path></svg>escrita por un agente · revisada por otro</span>
<button type="button" class="tap" onClick={v.lessonDone} aria-disabled={v.lessonDis} style={`min-height: 46px; border: 0; border-radius: 13px; background: ${v.lessonBtnBg}; color: ${v.lessonBtnFg}; font: inherit; font-size: 14px; font-weight: 700; cursor: pointer`}>{v.lessonBtn}</button>
</div>
</>)}

{(v.isQuiz) && (<>
<div class="scr" style="display: flex; flex-direction: column; gap: 9px">
<div style="display: flex; justify-content: space-between; align-items: center"><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px; color: #55555C">{v.qKicker}</span><span style="display: flex; gap: 4px">{(v.qDots).map((dt: any, dt_i: number) => (<Fragment key={dt_i}><span style={`width: 20px; height: 5px; border-radius: 99px; background: ${dt.bg}`}></span></Fragment>))}</span></div>
<p style="margin: 0; font-weight: 800; font-size: 15.5px; line-height: 1.22; letter-spacing: -0.02em">{v.qText}</p>
{(v.opts).map((o: any, o_i: number) => (<Fragment key={o_i}>
<div style="display: flex; flex-direction: column; gap: 3px">
<button type="button" class="tap" onClick={o.pick} aria-disabled={o.disabled} style={`display: flex; align-items: center; gap: 9px; min-height: 44px; padding: 8px 10px; border-radius: 12px; border: 2px solid ${o.border}; background: ${o.bg}; color: #121214; font: inherit; font-size: 12.5px; font-weight: 600; text-align: left; line-height: 1.25; cursor: ${o.cursor}`}>
<span aria-hidden="true" style={`flex: 0 0 22px; width: 22px; height: 22px; border-radius: 99px; background: ${o.markBg}; color: ${o.markFg}; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800`}>{o.mark}</span>
<span>{o.label}</span>
</button>
{(o.showExp) && (<>
<p class="pop" style="margin: 0; padding: 0 4px 0 36px; font-size: 11px; line-height: 1.35; color: #3D3D44"><strong style={`color: ${o.expColor}`}>{o.expHead}</strong> {o.exp}</p>
</>)}
</div>
</Fragment>))}
{(v.answered) && (<>
<div class="pop" style={`padding: 10px 12px; border-radius: 12px; background: ${v.bSoft}; font-size: 11.5px; line-height: 1.35`}><strong style={`display: block; color: ${v.b}`}>Cómo acertarla</strong>{v.qTip}</div>
<button type="button" class="tap pop" onClick={v.nextQ} style={`min-height: 46px; border: 0; border-radius: 13px; background: ${v.b}; color: #FFFFFF; font: inherit; font-size: 14px; font-weight: 700; cursor: pointer`}>{v.nextLabel}</button>
</>)}
</div>
</>)}

{(v.isReview) && (<>
<div class="scr" style="display: flex; flex-direction: column; gap: 10px">
<div style="display: flex; justify-content: space-between; align-items: center"><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px; color: #55555C">REPASO DE HOY · {v.rvPos}</span><span style="font-size: 11px; color: #55555C">toca la ficha</span></div>
{(v.rvActive) && (<>
<div class="flipw" style="height: 250px">
<button type="button" class={`flip ${v.flipCls}`} onClick={v.flipCard} aria-pressed={v.flipStr} style="width: 100%; height: 250px; padding: 0; border: 0; background: transparent; font: inherit; cursor: pointer; display: block">
<span class="face" aria-hidden={v.frontHidden} style={`border-radius: 18px; background: ${v.b}; color: #FFFFFF; display: flex; flex-direction: column; justify-content: space-between; padding: 18px; box-sizing: border-box; text-align: left`}><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px; opacity: .85">PREGUNTA</span><strong style="font-size: 19px; line-height: 1.2; letter-spacing: -0.02em">{v.card.q}</strong><span style="font-size: 11px; opacity: .85">Toca para ver la respuesta ↻</span></span>
<span class="face back" aria-hidden={v.backHidden} style="border-radius: 18px; background: #121214; color: #FFFFFF; display: flex; flex-direction: column; justify-content: space-between; padding: 18px; box-sizing: border-box; text-align: left"><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px; color: #FFD7C7">RESPUESTA</span><strong style="font-size: 16px; line-height: 1.3">{v.card.a}</strong><span style="font-size: 11px; opacity: .8">¿La sabías?</span></span>
</button>
</div>
{(v.flipped) && (<>
<div class="pop" style="display: flex; gap: 8px">
<button type="button" class="tap" onClick={v.rvAgain} style="flex: 1; min-height: 46px; border-radius: 12px; border: 2px solid #E2E2E7; background: #FFFFFF; color: #121214; font: inherit; font-size: 13px; font-weight: 700; cursor: pointer">Otra vez<span style="display: block; font-size: 10px; font-weight: 500; color: #55555C">vuelve mañana</span></button>
<button type="button" class="tap" onClick={v.rvKnew} style={`flex: 1; min-height: 46px; border-radius: 12px; border: 0; background: ${v.b}; color: #FFFFFF; font: inherit; font-size: 13px; font-weight: 700; cursor: pointer`}>Lo sabía<span style="display: block; font-size: 10px; font-weight: 500; opacity: .85">vuelve en 4 días</span></button>
</div>
</>)}
</>)}
{(v.rvDone) && (<>
<div class="pop" style="display: flex; flex-direction: column; gap: 10px">
<p style="margin: 6px 0 0; font-weight: 800; font-size: 19px; letter-spacing: -0.02em">Repaso hecho</p>
{(v.rvSummary).map((r: any, r_i: number) => (<Fragment key={r_i}><span style="display: flex; justify-content: space-between; padding: 10px 12px; border-radius: 11px; background: #F2F2F5; font-size: 12px"><strong>{r.q}</strong><span style={`color: ${r.c}; font-weight: 700; white-space: nowrap; margin-left: 8px`}>{r.when}</span></span></Fragment>))}
<p style="margin: 0; font-size: 11.5px; color: #4A4A52">Repaso espaciado: lo que sabes se aleja, lo que fallas vuelve pronto.</p>
<button type="button" class="tap" onClick={v.toHome} style={`min-height: 46px; border: 0; border-radius: 13px; background: ${v.b}; color: #FFFFFF; font: inherit; font-size: 14px; font-weight: 700; cursor: pointer`}>Volver al plan</button>
</div>
</>)}
</div>
</>)}

{(v.isProgress) && (<>
<div class="scr" style="display: flex; flex-direction: column; gap: 10px">
<p style="margin: 0; font-weight: 800; font-size: 19px; letter-spacing: -0.02em">Tu progreso <span style="font-size: 11px; font-weight: 600; color: #55555C">· solo lo ves tú</span></p>
<div style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 14px; background: #F2F2F5">
<svg aria-hidden="true" width="62" height="62" viewBox="0 0 64 64"><circle cx="32" cy="32" r="26" fill="none" stroke="#E3E3E8" stroke-width="8"></circle><circle class="ring" cx="32" cy="32" r="26" fill="none" stroke={v.b} stroke-width="8" stroke-linecap="round" stroke-dasharray="163" stroke-dashoffset={v.ringOff} transform="rotate(-90 32 32)"></circle><text x="32" y="37" text-anchor="middle" font-family="Inter, sans-serif" font-size="14" font-weight="800" fill="#121214">{v.ringPct}%</text></svg>
<span style="display: flex; flex-direction: column; font-size: 11.5px; line-height: 1.35"><strong style="font-size: 13px">Acierto ponderado</strong><span style="color: #4A4A52">Tu objetivo: 75 %. Cada tema cuenta según lo que pesa.</span></span>
</div>
<span style="font-size: 11.5px; font-weight: 700">Mapa del temario <span style="font-weight: 500; color: #55555C">· tamaño = peso, color = acierto</span></span>
<div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); grid-auto-rows: 42px; gap: 4px">
{(v.mapBig).map((c: any, c_i: number) => (<Fragment key={c_i}>
<button type="button" class="tap" onClick={c.pick} aria-label={c.aria} style={`grid-column: span ${c.c}; grid-row: span ${c.r}; border-radius: 9px; border: 2px solid ${c.ring}; background: ${c.bg}; color: ${c.fg}; font: inherit; font-size: 10.5px; font-weight: 700; line-height: 1.15; text-align: left; padding: 6px 7px; display: flex; align-items: flex-start; cursor: pointer`}>{c.name}</button>
</Fragment>))}
</div>
<div class="pop" style="padding: 9px 11px; border-radius: 11px; border: 1px solid #E4E4E9; font-size: 11.5px; line-height: 1.35">{v.mapDetail}</div>
<span style="font-size: 11.5px; font-weight: 700">Logros</span>
<div style="display: flex; gap: 8px">
{(v.badges).map((g: any, g_i: number) => (<Fragment key={g_i}>
<span style={`flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; opacity: ${g.op}; filter: ${g.filter}`}><svg aria-hidden="true" width="36" height="42" viewBox="0 0 60 70"><path d="M30 3 L55 17 L55 46 L30 67 L5 46 L5 17 Z" fill={g.c}></path><path d="M22 35 l6 6 l11 -13" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg><span style="font-size: 9.5px; font-weight: 700">{g.n}</span></span>
</Fragment>))}
</div>
<div style="display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 12px; background: #121214; color: #FFFFFF; font-size: 11.5px"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4l3 2 M12 21a8 8 0 1 0 0-16a8 8 0 0 0 0 16z M9 2h6"></path></svg><span><strong style="display: block; font-size: 12.5px">Simulacro con reloj</strong>20 preguntas · 30 min · al terminar el módulo 2</span></div>
<button type="button" class="tap" onClick={v.progressDone} style={`min-height: 46px; border: 0; border-radius: 13px; background: ${v.b}; color: #FFFFFF; font: inherit; font-size: 14px; font-weight: 700; cursor: pointer`}>Volver al plan</button>
</div>
</>)}

</div>

<nav aria-label="Navegación de la app" style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border-top: 1px solid #ECECF0; padding: 6px 8px 14px; background: #FFFFFF">
{(v.tabs).map((n: any, n_i: number) => (<Fragment key={n_i}>
<button type="button" class="tap" onClick={n.go} aria-current={n.cur} style={`min-height: 46px; border: 0; background: transparent; color: ${n.color}; font: inherit; font-size: 10.5px; font-weight: 700; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; cursor: pointer`}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d={n.icon}></path></svg>{n.l}</button>
</Fragment>))}
</nav>

{(v.showToast) && (<>
<div class="toast" role="status" style="position: absolute; left: 12px; right: 12px; top: 44px; z-index: 4; display: flex; align-items: center; gap: 10px; padding: 12px; border-radius: 16px; background: #121214; color: #FFFFFF; box-shadow: 0 20px 40px -16px rgba(0,0,0,.6)">
<svg aria-hidden="true" width="40" height="46" viewBox="0 0 60 70" style="flex: 0 0 40px"><path d="M30 3 L55 17 L55 46 L30 67 L5 46 L5 17 Z" fill="#B07A4A"></path><path d="M22 35 l6 6 l11 -13" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg>
<span style="display: flex; flex-direction: column; font-size: 11.5px; line-height: 1.3"><strong style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10px; color: #FFD7C7">LOGRO DESBLOQUEADO</strong><strong style="font-size: 14px">Constancia · Bronce</strong><span style="opacity: .8">Primer día de plan completo. Racha encendida.</span></span>
</div>
</>)}

</div>
</div>
</div>
</div>
</section>
</main>
</div>

      </>
    );
  }
}

export const Desktop = conTema(Logica);
