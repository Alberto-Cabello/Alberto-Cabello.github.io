import { useEffect, useRef, useState } from 'preact/hooks';
import { useTema } from '../../lib/theme';
import { reduceMotion } from '../../lib/inView';
import { useIntervalo, useVistos } from '../../lib/vistos';

// Lógica y textos de CasoStudy / CasoStudyMovil (renderVals del tablero).
const Y = '#FFE38A', P = '#FFC9D6', B = '#CDE7FF', G = '#D7F2C4';
const IC = {
  exit: 'M14 4h5v16h-5 M10 8l-4 4 4 4 M6 12h10',
  clock: 'M12 7v5l3 3 M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18z',
  ask: 'M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.7v.5 M12 17.5v.5 M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18z',
  same: 'M4 7h16 M4 12h16 M4 17h16',
  route: 'M6 19a2 2 0 1 0 0-4a2 2 0 0 0 0 4z M18 9a2 2 0 1 0 0-4a2 2 0 0 0 0 4z M8 17h6a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h6',
  sun: 'M12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8z M12 2v2 M12 20v2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M2 12h2 M20 12h2 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4',
  shapes: 'M4 4h7v7H4z M17.5 4a3.5 3.5 0 1 1 0 7a3.5 3.5 0 0 1 0-7z M4 20l3.5-6 3.5 6z M14 14h6v6h-6z',
  list: 'M10 6h10 M10 12h10 M10 18h10 M4 6l1 1 2-2 M4 12l1 1 2-2 M4 18l1 1 2-2',
  redo: 'M20 11a8 8 0 1 0-2.3 5.7 M20 4v7h-7',
  grid: 'M4 4h7v7H4z M13 4h7v4h-7z M13 10h7v10h-7z M4 13h7v7H4z',
  flame: 'M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-9z',
  lang: 'M3 5h8 M7 3v2 M5 5c0 4 3 7 6 8 M9 5c-.5 3-2.5 6-6 8 M13 20l4-9 4 9 M14.5 17h5',
};
const D = [
  { short: 'Ideas y planteamiento', title: 'Lluvia de ideas y planteamiento', text: 'Convertir la idea a medias en un planteamiento potente: para quién es, qué tiene que conseguir y por qué se va a terminar.', out: ['Idea afilada', 'Público y objetivo claros'] },
  { short: 'Diseño y funciones', title: 'Diseño y funcionalidades', text: 'Qué hace la app y cómo se siente al usarla: plan, lecciones, práctica, repaso, progreso y motivación.', out: ['Mapa de pantallas', 'Lista de funciones'] },
  { short: 'Afilar la base', title: 'Afilar y mejorar la base', text: 'Revisar el planteamiento antes de construir. Lo que no aporta, fuera.', out: ['Base revisada', 'Prioridades cerradas'] },
  { short: 'App y red de agentes', title: 'Construcción de la app y de la red de agentes', text: 'Se construye la app y el equipo de agentes que va a crear el contenido.', out: ['App funcionando', 'Red de agentes lista'] },
  { short: 'Contenido y puesta a punto', title: 'Generación del contenido y puesta a punto', text: 'La red de agentes escribe y revisa el contenido, y el prototipo queda listo para usarse en el equipo.', out: ['44 lecciones en un día', '206 pruebas automáticas'] },
];
const ROWS = [
  { was: 'Todos siguen el mismo plan, tengan dos semanas o dos meses.', now: 'Un plan personal que se recalcula cada día con tu tiempo, tu acierto y lo que queda.', icon: IC.route },
  { was: 'Abres el curso y no sabes por dónde seguir.', now: 'Un inicio que te dice qué toca hoy, y por qué.', icon: IC.sun },
  { was: 'Páginas y páginas de texto plano.', now: 'Lecciones condensadas, con esquemas y gráficos que se pueden tocar.', icon: IC.shapes },
  { was: 'Un test al final, y si fallas no sabes por qué.', now: 'Práctica que explica cada opción: por qué la correcta lo es y por qué fallan las demás.', icon: IC.list },
  { was: 'Lo que estudias hoy se olvida en una semana.', now: 'Repaso espaciado: lo que fallas vuelve en el momento justo.', icon: IC.redo },
  { was: 'No sabes si estás preparado hasta el día del examen.', now: 'Un mapa del temario, simulacros con reloj y un progreso que se entiende.', icon: IC.grid },
  { was: 'A la segunda semana, se abandona.', now: 'Logros, rachas que perdonan y un personaje que te anima a volver.', icon: IC.flame },
  { was: 'Términos técnicos, o en otro idioma, que frenan la lectura.', now: 'Glosario y traducción al vuelo, sin salir de la lección.', icon: IC.lang },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useVals(movil: boolean): any {
  const [tema, alternar] = useTema();
  const dark = tema === 'dark';
  const reduce = reduceMotion();
  const { vistos, enPantalla } = useVistos(movil ? '-10% 0px -20% 0px' : '-10% 0px -25% 0px');
  const [day, setDay] = useState(1);
  const [dayTouched, setDayTouched] = useState(false);
  const [ba, setBa] = useState({ pos: 50, dir: 1, hold: 0, flips: 0 });
  const [baTouched, setBaTouched] = useState(false);
  const [lk, setLk] = useState(0);
  const [nf, setNf] = useState(0);
  const [cnt, setCnt] = useState(reduce ? 1 : 0);
  const [rowsOpen, setRowsOpen] = useState(false);
  const cntT = useRef(0);

  // Cifras que cuentan al entrar en pantalla.
  useEffect(() => {
    if (!vistos.Nums || reduce) return;
    let k = 0;
    const total = movil ? 30 : 34;
    cntT.current = window.setInterval(() => { k += 1; const x = Math.min(1, k / total); setCnt(x); if (x >= 1) clearInterval(cntT.current); }, 40);
    return () => clearInterval(cntT.current);
  }, [vistos.Nums]);

  useIntervalo(() => { if (!dayTouched && vistos.Tl && enPantalla.current.Tl) setDay((d) => (d % 5) + 1); }, 3400, !reduce);
  useIntervalo(() => {
    if (baTouched) return;
    const clave = movil ? 'Ba' : 'Ba';
    if (!enPantalla.current[clave]) return;
    setBa((b) => {
      if (!movil && b.flips >= 4) return b;
      if (b.hold > 0) return { ...b, hold: b.hold - 1 };
      let v = b.pos + b.dir * 2, dir = b.dir, hold = 0, flips = b.flips;
      if (v >= 78) { v = 78; dir = -1; hold = 14; flips += 1; }
      if (v <= 22) { v = 22; dir = 1; hold = 14; flips += 1; }
      return { pos: !movil && flips >= 4 ? 50 : v, dir, hold, flips };
    });
  }, movil ? 100 : 90, !reduce);
  useIntervalo(() => { if (vistos.Loop && enPantalla.current.Loop) setLk((k) => (k + 1) % 80); }, movil ? 200 : 180);
  useIntervalo(() => { if (enPantalla.current.Desk) setNf((n) => (n + 1) % 5); }, 1800, movil && !reduce);

  const T = (n: string) => `var(--${n})`;
  const e3 = 1 - Math.pow(1 - cnt, 3);
  const loopCount = Math.min(44, Math.round((lk / 64) * 44));
  const mapFill = [0.9, 0.7, 0.45, 0.2, 0.8, 0.55, 0.3, 0.1];
  const cur = D[day - 1];
  const baPos = ba.pos;
  const rowsAll = ROWS.map((r, i) => ({
    ...r, n: String(i + 1).padStart(2, '0'),
    d1: (movil ? 0.1 + (i % 4) * 0.3 : 0.15 + i * 0.32).toFixed(2),
    d2: (0.45 + i * 0.32).toFixed(2),
    d3: (movil ? 0.5 + (i % 4) * 0.3 : 0.62 + i * 0.32).toFixed(2),
  }));
  const NOTES_M = [
    { text: '¿Algo tipo app? ¿Que se use en el móvil?', x: 48, y: 6, r: 5, w: 150, bg: Y },
    { text: 'La gente lo abre… y no lo termina', x: 50, y: 34, r: -4, w: 150, bg: P },
    { text: 'Cada año cambia algo y nadie lo actualiza', x: 6, y: 58, r: -3, w: 160, bg: G },
    { text: '¿Cómo sé si lo han aprendido?', x: 52, y: 64, r: 6, w: 140, bg: B },
    { text: 'Que no sea otro curso aburrido', x: 22, y: 82, r: 3, w: 150, bg: Y },
  ];

  return {
    modeLabel: dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro',
    toggle: alternar,
    pdfLines: (movil ? [92, 78, 88, 64, 84, 70] : [92, 78, 88, 64, 84, 70, 90, 56]).map((w) => ({ w })),
    notes: movil
      ? NOTES_M.map((n, i) => { const on = reduce || i === nf; return { ...n, blur: 0, o: on ? 1 : 0.55, z: on ? 5 : 1 }; })
      : [
        { text: '¿Algo tipo app? ¿Que se use en el móvil?', x: 31, y: 7, r: 5, w: 230, bg: Y, tr: -4 },
        { text: 'La gente lo abre… y no lo termina', x: 56, y: 12, r: -4, w: 220, bg: P, tr: 3 },
        { text: '¿Cómo sé si de verdad lo han aprendido?', x: 79, y: 22, r: 6, w: 210, bg: B, tr: -2 },
        { text: 'Cada año cambia algo y nadie lo actualiza', x: 36, y: 50, r: -3, w: 230, bg: G, tr: 2 },
        { text: 'Que no sea otro curso aburrido', x: 61, y: 52, r: 4, w: 200, bg: Y, tr: -3 },
        { text: 'Cada uno tiene su ritmo y su tiempo…', x: 18, y: 70, r: 3, w: 220, bg: B, tr: 4 },
        { text: 'Ideas sueltas, sin orden', x: 78, y: 66, r: -6, w: 190, bg: P, tr: -2 },
      ],
    pains: [
      { title: 'Se abre y no se termina', text: 'Un manual largo o un curso de horas se abandona antes de llegar al final.', icon: IC.exit },
      { title: 'Todos estudian igual', text: 'El mismo plan para quien tiene dos semanas y para quien tiene dos meses.', icon: IC.same },
      { title: 'Nadie sabe cuánto le falta', text: 'Sin práctica ni progreso, el examen o la evaluación es el primer aviso.', icon: IC.ask },
      { title: 'El contenido envejece', text: 'Lo que se escribió una vez se queda desactualizado y nadie lo revisa.', icon: IC.clock },
    ],
    rows: movil && !rowsOpen ? rowsAll.slice(0, 4) : rowsAll,
    rowsCls: vistos.Rows ? 'go' : '',
    rowsStr: rowsOpen ? 'true' : 'false', rowsBtn: rowsOpen ? 'Ver menos' : 'Ver los 8 problemas',
    toggleRows: () => setRowsOpen(!rowsOpen),
    dayLive: dayTouched ? 'polite' : 'off',
    days: D.map((d, i) => {
      const n = i + 1; const on = n === day;
      return {
        n, short: d.short, pressed: on ? 'true' : 'false', bg: on ? T('fg') : 'transparent',
        color: on ? T('bg') : movil ? T('fg') : n < day ? T('fg') : T('muted'), border: on ? T('fg') : T('line'),
        bar: n <= day ? 100 : 0, pick: () => { setDay(n); setDayTouched(true); },
      };
    }),
    dayN: day, dayTitle: cur.title, dayText: cur.text, dayOut: cur.out.map((x) => ({ t: x })), focusPct: day * 20,
    pv: {
      notesOp: day === 1 ? 1 : 0, notesBlur: day === 1 ? 2 : 8,
      phoneOp: day >= 2 ? 1 : 0, phoneBlur: movil ? (day === 2 ? 5 : day === 3 ? 2 : 0) : (day === 2 ? 6 : day === 3 ? 2.5 : 0),
      skelOp: day >= 2 && day < 5 ? 1 : 0, contentOp: day === 5 ? 1 : 0,
      labelsOp: day >= 3 ? 1 : 0, netOp: day >= 4 ? 1 : 0,
      heroBg: day >= 4 ? T('accent') : '#E6E6EA',
      status: day === 5 ? '● enfocado' : '● enfocando…', stColor: day === 5 ? T('accent-text') : T('muted'),
    },
    lockInset: day === 5 ? (movil ? 12 : 18) : (movil ? 40 : 60), lockOp: day === 5 ? 1 : 0.25,
    d1notes: movil
      ? [
        { text: 'que se termine', x: 30, y: 26, r: -4, bg: T('accent'), fg: T('on-accent') },
        { text: 'plan para cada uno', x: 6, y: 48, r: 5, bg: Y, fg: '#2A2410' },
        { text: 'repasar sin pensar', x: 44, y: 64, r: -6, bg: P, fg: '#2A2410' },
        { text: '¿para quién?', x: 56, y: 12, r: 7, bg: B, fg: '#2A2410' },
        { text: 'saber cuánto falta', x: 10, y: 80, r: -3, bg: G, fg: '#2A2410' },
      ]
      : [
        { text: 'que se termine', x: 30, y: 30, r: -4, bg: T('accent'), fg: T('on-accent') },
        { text: 'plan para cada uno', x: 10, y: 54, r: 5, bg: Y, fg: '#2A2410' },
        { text: 'repasar sin pensar', x: 52, y: 62, r: -6, bg: P, fg: '#2A2410' },
        { text: '¿para quién?', x: 60, y: 16, r: 7, bg: B, fg: '#2A2410' },
        { text: 'saber cuánto falta', x: 18, y: 78, r: -3, bg: G, fg: '#2A2410' },
        { text: '¡que enganche!', x: 62, y: 40, r: 4, bg: Y, fg: '#2A2410' },
      ],
    badges: movil
      ? [{ c: '#B07A4A', o: 1 }, { c: '#9DA3AE', o: 1 }, { c: '#D8A520', o: 0.4 }, { c: T('accent'), o: 0.4 }]
      : [{ c: '#B07A4A', d: 0 }, { c: '#9DA3AE', d: 1.4 }, { c: '#D8A520', d: 2.8 }, { c: T('accent'), d: 4.2 }],
    streak: ['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((l, i) => ({
      l, cls: i === 3 ? '' : 'dayd', d: (i * 0.45).toFixed(2), miss: i === 3,
      bg: i === 3 ? T('inner') : i < 6 ? T('accent') : T('inner'),
    })),
    ideasForYou: [{ t: 'Retos por equipos' }, { t: 'Certificado al terminar' }, { t: 'Avisos al móvil' }, { t: 'Tu marca y tu tono' }, { t: 'Modo examen' }],
    loopCount, loopPct: Math.round((loopCount / 44) * 100),
    baPos, hintBa: !baTouched,
    baLabel: baPos > 66 ? 'casi todo: cómo se estudia hoy' : baPos < 34 ? 'casi todo: cómo se estudia con la app' : 'mitad y mitad',
    onBa: (e: Event) => { setBa((b) => ({ ...b, pos: Number((e.currentTarget as HTMLInputElement).value) })); setBaTouched(true); },
    touchBa: () => setBaTouched(true),
    beforeNotes: movil
      ? [{ text: '¿Por dónde sigo?', x: 50, y: 10, r: 4, bg: Y }, { text: '¿Voy bien? Ni idea', x: 54, y: 40, r: -5, bg: P }, { text: 'Esto ya lo leí y no me acuerdo', x: 52, y: 70, r: 3, bg: B }]
      : [{ text: '¿Por dónde sigo?', x: 36, y: 14, r: 4, bg: Y }, { text: '¿Voy bien? Ni idea', x: 60, y: 30, r: -5, bg: P }, { text: 'Mañana sigo… (otra vez)', x: 38, y: 50, r: -2, bg: B }, { text: 'Esto ya lo leí y no me acuerdo', x: 66, y: 62, r: 5, bg: G }],
    mapCells: mapFill.map((f) => ({ bg: f > 0.6 ? T('accent') : f > 0.35 ? '#F5A98F' : '#ECECF0' })),
    numsCls: vistos.Nums || reduce ? 'go' : '',
    nums: [
      { v: Math.round(5 * e3), u: ' días', title: 'De idea a prototipo', text: 'Sin jornada completa, para mi equipo.', d: 0 },
      { v: Math.round(44 * e3), u: ' lecciones', title: 'Escritas y revisadas en un día', text: 'Por la red de agentes: uno escribe y otro revisa.', d: 0.15 },
      { v: Math.round(206 * e3), u: ' pruebas', title: 'Automáticas en cada cambio', text: 'Para que mejorar algo no rompa lo que ya funciona.', d: 0.3 },
      { v: 'AA', u: '', title: 'Accesibilidad', text: 'Contraste, teclado y lectores de pantalla.', d: 0.45 },
    ],
    proto: [
      { t: 'Una app completa en un enlace, sin instalar nada' },
      { t: 'Cada persona lleva su propio progreso' },
      { t: 'Contenido escrito y revisado por agentes, comprobado dato a dato' },
      { t: 'Pruebas automáticas y accesibilidad AA' },
      { t: 'Ideal para validar la idea con un equipo pequeño' },
    ],
    prod: [
      { t: 'Cuentas de alumno y acceso seguro' },
      { t: 'Panel del formador con el progreso del grupo' },
      { t: 'Datos en servidor, con copias de seguridad' },
      { t: 'Tu dominio, tu marca y conexión con tu plataforma o tus pagos' },
      { t: 'Contenido que se actualiza cuando cambia el temario' },
      { t: 'Y lo que tu caso necesite, si es viable' },
      { t: 'Alcance y plazos que se dimensionan contigo' },
    ],
    line3: [
      { n: '01 · Tú traes', title: 'El temario y la idea', text: 'Aunque esté a medias. Con eso basta para empezar.', bg: 'transparent', fg: T('fg'), border: T('line'), numColor: T('muted') },
      { n: '02 · Yo la enfoco', title: 'Una idea potente', text: 'Convierto la idea en un planteamiento sólido y diseño la app a la medida de tu gente.', bg: T('accent'), fg: T('on-accent'), border: T('accent'), numColor: T('on-accent') },
      { n: '03 · Te llevas', title: 'Una app pensada para terminarse', text: 'Primero un prototipo en días para validarla; después, el producto en producción si lo necesitas.', bg: T('fg'), fg: T('bg'), border: T('fg'), numColor: T('accent-on-fg') },
    ],
    uses: [{ t: 'Certificaciones' }, { t: 'Formación interna' }, { t: 'Onboarding de equipos' }, { t: 'Academias' }],
  };
}
