// Textos y datos de la portada, copiados de PortadaD2 y PortadaMovil.

export const RUTAS = {
  agentes: '/casos/red-de-agentes/',
  study: '/casos/app-de-estudio/',
  banca: '/casos/automatizacion-y-asistente-ia/',
};

export const CV = {
  es: '/cv/CV-Alberto-Cabello-ES.pdf',
  en: '/cv/CV-Alberto-Cabello-EN.pdf',
};

export const IDEAS = [
  { vague: 'Mi equipo pierde horas en Excel', tag: 'Automatización', sol: 'Informes que se hacen solos' },
  { vague: 'Quiero una web que me traiga clientes', tag: 'Diseño web', sol: 'Web a medida que capta clientes' },
  { vague: 'Contestamos los mismos correos todo el día', tag: 'Agentes de IA', sol: 'Un agente responde; tú apruebas' },
  { vague: 'Mi formación interna no la termina nadie', tag: 'Apps de formación', sol: 'Una app de estudio que engancha' },
].map((x, i) => ({ ...x, delay: i * 7, cls: i === 0 ? 'idea0' : '' }));

export const PREGUNTA = '¿Por qué estás aquí?';

const IC = {
  bulb: 'M9 18h6 M10 21h4 M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z',
  team: 'M9 11a4 4 0 1 0 0-8a4 4 0 0 0 0 8z M2 21c1-4 4-6 7-6s6 2 7 6 M17 11a3 3 0 1 0 0-6 M22 21c-.5-3-2-4.5-4-5',
};

export const PUERTAS = [
  {
    n: '01', modo: 'cliente' as const, title: 'Tengo una idea o un negocio', text: 'Te enseño lo que puedo construirte.', go: 'Entrar como cliente',
    icon: IC.bulb, aria: 'Tengo una idea o un negocio: te enseño lo que puedo construirte',
    chips: ['Casos y demos', 'Cómo trabajo', 'Cuéntame tu idea'],
  },
  {
    n: '02', modo: 'empresa' as const, title: 'Busco talento para mi equipo', text: 'Te enseño mi perfil.', go: 'Entrar como empresa',
    icon: IC.team, aria: 'Busco talento para mi equipo: te enseño mi perfil',
    chips: ['Lo que busco', 'Lo que aporto, con cifras', 'Ficha rápida'],
  },
];

export const HABILIDADES: [string, string][] = [
  ['Detección de oportunidades', 'Donde otros veían una herramienta de consulta, vi un copiloto y un generador.'],
  ['Comunicación asertiva', 'Dije que no a una petición inviable, con argumentos, y propuse una alternativa que sí salió adelante.'],
  ['Escucha activa', 'Cada proyecto empieza por entender el proceso de quien lo vive, no por la tecnología.'],
  ['Capacidad de análisis', 'Antes de construir, cada idea pasa por las mismas preguntas: ¿se repite?, ¿hay reglas?, ¿qué cuesta un error?'],
  ['Aprendizaje rápido', 'De un curso intensivo de Java a construir redes de agentes de IA, en buena parte de forma autodidacta.'],
  ['Liderazgo y coordinación', 'Asumí el liderazgo de un equipo de 6 personas entre España y Perú, y la relación con el cliente, por encima de mi categoría.'],
  ['Visión de negocio', 'Llevo mi propio e-commerce: sé lo que cuesta cada hora y cada error.'],
  ['Proactividad', 'Me pidieron automatizar; el método y el generador fueron propuesta mía.'],
  ['Formar y explicar', 'Mi método acabó siendo una formación interna para el equipo.'],
  ['Mejora continua', 'Si algo no ahorra tiempo o no mejora la calidad, se rehace.'],
];

export const PRUEBAS = [
  { k: 'Automatización · banca', num: 90, unit: ' %', title: 'de eficiencia estimada', text: 'Un prototipo en Python que genera en masa la configuración de ingestas de datos, frente a hacerla a mano.', link: 'Caso 03 y demo', href: RUTAS.banca },
  { k: 'Agentes de IA', num: 9, unit: ' agentes', title: 'coordinados, con aprobación humana', text: 'Una red que lleva la operativa de un e-commerce: de buscar producto a analizar campañas.', link: 'Caso 01 y demo', href: RUTAS.agentes },
  { k: 'Apps de formación', num: 44, unit: ' lecciones', title: 'escritas y revisadas en un día', text: 'Por una red de agentes, para una app de estudio que construí en 5 días.', link: 'Caso 02 y demo', href: RUTAS.study },
];

export const PRUEBAS_MOVIL = [
  { num: 90, unit: ' %', title: 'de eficiencia estimada al automatizar configuraciones', link: 'Caso 03', href: RUTAS.banca },
  { num: 9, unit: ' agentes', title: 'coordinados, con aprobación humana', link: 'Caso 01', href: RUTAS.agentes },
  { num: 44, unit: ' lecciones', title: 'escritas y revisadas en un día', link: 'Caso 02', href: RUTAS.study },
];

export const BUSCO = [
  { k: 'Rol', v: 'AI Engineer o AI Solutions Engineer' },
  { k: 'Equipo', v: 'Un equipo que apueste por la innovación, las nuevas tecnologías y la IA aplicada al negocio, donde los proyectos lleguen a producción y su impacto se mida' },
  { k: 'Modalidad', v: 'Remoto, preferentemente; híbrido o presencial en Málaga según la oferta' },
  { k: 'Para crecer en', v: 'Agentes en producción, orquestación y evaluación' },
];

export const COMO = [
  { n: '01', t: 'Entiendo el proceso de negocio' },
  { n: '02', t: 'Decido qué hace la IA y qué decide la persona' },
  { n: '03', t: 'Construyo con IA como copiloto' },
  { n: '04', t: 'Mido y ajusto: si no ahorra tiempo, se rehace' },
];

const FICHA_BASE = [
  { k: 'Rol', v: 'AI Engineer' },
  { k: 'Experiencia', v: '+5 años en una de las mayores consultoras tecnológicas del mundo · datos para banca y coordinación de equipos' },
  { k: 'Stack', v: 'Python · Spark · Scala · SQL · Git · AWS · Claude Code · MCP' },
  { k: 'Certificaciones', v: 'AWS Certified Cloud Practitioner · Claude Certified Developer (en curso)' },
  { k: 'Idiomas', v: 'Español nativo · Inglés B2 (Cambridge PET con distinción)' },
  { k: 'Ubicación', v: 'Málaga · remoto preferente' },
];
export const FICHA = [...FICHA_BASE.map((x) => ({ ...x, dot: false })), { k: 'Disponibilidad', v: 'En activo · abierto a incorporarme ante la oferta adecuada', dot: true }];
export const FICHA_MOVIL = [...FICHA_BASE, { k: 'Disponibilidad', v: 'En activo · abierto a la oferta adecuada' }];

export const PASOS = [
  { n: '01', title: 'Detectar', text: 'Dónde se pierden horas o calidad sin que nadie lo vea.', vdelay: 0, split: false },
  { n: '02', title: 'Afilar la idea', text: 'De una intuición a un objetivo medible.', vdelay: 1.2, split: false },
  { n: '03', title: 'Repartir', text: 'Qué hace la IA y qué decides tú.', vdelay: 2.4, split: true },
  { n: '04', title: 'Construir', text: 'Prototipos que se tocan desde el primer día.', vdelay: 3.6, split: false },
  { n: '05', title: 'Medir', text: 'Si no ahorra tiempo o mejora la calidad, se rehace.', vdelay: 4.8, split: false },
];

/** Textos que cambian según el recorrido. */
export function textos(empresa: boolean) {
  return {
    ctaCorto: empresa ? 'Hablemos de un puesto' : 'Cuéntame tu idea',
    ctaSec: empresa ? 'Ver mi perfil' : 'Ver proyectos',
    ctaSecHref: empresa ? '#perfil' : '#casos',
    ansA: empresa ? 'buscas' : 'tienes',
    ansB: empresa ? 'talento.' : 'una idea.',
    ansCta: empresa ? 'Ver mi perfil ↓' : 'Ver lo que puedo construirte ↓',
    ansHref: empresa ? '#perfil' : '#casos',
  };
}

export const ANS_TEXT = {
  escritorio: {
    empresa: 'Perfecto. Justo debajo tienes mi perfil: lo que busco, lo que aporto con cifras y una ficha rápida. Y el contacto ahora es para hablar de un puesto.',
    cliente: 'Perfecto. He enfocado la web para ti: primero lo que he construido, después cómo trabajo y, al final, un sitio para contarme tu idea tal cual, aunque esté a medias.',
  },
  movil: {
    empresa: 'Justo debajo tienes mi perfil: lo que aporto con cifras y una ficha rápida.',
    cliente: 'He enfocado la web para ti: primero lo que he construido, después cómo trabajo y, al final, un sitio para contarme tu idea.',
  },
};

export const PILDORA = {
  quien: (m: string) => (m === 'none' ? 'visitante' : m === 'empresa' ? 'empresa' : 'cliente'),
  accion: (m: string) => (m === 'none' ? 'elegir' : 'cambiar'),
  aria: (m: string) =>
    m === 'none' ? 'Viendo como: elegir. Elige cómo quieres ver la web'
      : m === 'empresa' ? 'Viendo como empresa. Cambiar a cliente' : 'Viendo como cliente. Cambiar a empresa',
  quienMovil: (m: string) => (m === 'none' ? 'elegir' : m === 'empresa' ? 'empresa' : 'cliente'),
  ariaMovil: (m: string) =>
    m === 'none' ? 'Elegir: cómo quieres ver la web'
      : m === 'empresa' ? 'Viendo como empresa. Cambiar a cliente' : 'Viendo como cliente. Cambiar a empresa',
};
