// Datos del caso 01, copiados del tablero CasoAgentes (iguales en CasoAgentesMovil salvo donde se indica).

export interface Carril { name: string; agents: string[]; acts: string[]; groups?: number[]; dec: number; q: string; qs: string; out: string }
export interface Tarea { path: number[]; q: string; qs: string; out: string }
export interface Sector {
  key: string; l: string; mode: 'lanes' | 'star'; packet: string; unit: string; gnames: string[];
  lanes?: Carril[]; center?: string; sgroups?: number[]; spec?: string[]; acts?: string[]; tasks?: Tarea[];
}

export const SECTORES: Sector[] = [
  { key: 'ecom', l: 'E-commerce', mode: 'lanes', packet: 'producto', unit: 'productos validados', gnames: ['Encontrar', 'Preparar', 'Lanzar', 'Medir'],
    lanes: [{ name: 'Tienda', groups: [0, 0, 1, 1, 2, 2, 2, 3, 3], agents: ['Búsqueda', 'Validación', 'Presupuestos', 'Listado', 'Estratega', 'Productor', 'Crítico', 'Analista', 'Auditor'], acts: ['rastreando anuncios', 'comprobando demanda', 'pidiendo precio', 'montando la ficha', 'planteando el testeo', 'generando vídeos', 'revisando creativos', 'leyendo campañas', 'midiendo al equipo'], dec: 1, q: '¿Paso este producto a presupuestos?', qs: 'Validación lo ve viable: demanda real y margen sano.', out: 'Testeo lanzado' }] },
  { key: 'clin', l: 'Clínica', mode: 'lanes', packet: 'tarea', unit: 'tareas cerradas', gnames: ['Pacientes', 'Marketing', 'Equipo'], lanes: [
    { name: 'Pacientes', agents: ['Citas', 'Recordatorios', 'Historiales', 'Informes'], acts: ['confirmando citas', 'avisando pacientes', 'preparando historial', 'redactando informe'], dec: 3, q: '¿Envío este informe al paciente?', qs: 'Informes lo ha redactado con el historial del día.', out: 'Informe enviado' },
    { name: 'Marketing', agents: ['Redes', 'Reseñas'], acts: ['preparando un post', 'respondiendo reseñas'], dec: 1, q: '¿Publico esta respuesta a una reseña?', qs: 'Reseñas ha preparado una respuesta amable.', out: 'Publicado' },
    { name: 'Equipo', agents: ['Turnos', 'Nóminas', 'Facturación'], acts: ['cuadrando turnos', 'preparando nóminas', 'emitiendo facturas'], dec: 1, q: '¿Doy por buenas las nóminas?', qs: 'Nóminas ha cuadrado horas y turnos.', out: 'Nóminas listas' }] },
  { key: 'gest', l: 'Gestoría', mode: 'star', packet: 'encargo', unit: 'encargos cerrados', center: 'Coordinador', gnames: ['Recoger', 'Preparar', 'Clientes'], sgroups: [0, 0, 1, 1, 2, 2],
    spec: ['Documentación', 'Clasificación', 'Borradores', 'Plazos', 'Consultas', 'Cobros'], acts: ['recogiendo facturas', 'ordenando gastos', 'preparando el borrador', 'revisando plazos', 'leyendo la consulta', 'emitiendo cuotas'],
    tasks: [{ path: [0, 1, 2], q: '¿Presento el trimestral de este cliente?', qs: 'Borradores lo ha preparado con sus facturas.', out: 'Trimestral presentado' }, { path: [4, 3], q: '¿Envío esta respuesta al cliente?', qs: 'Consultas ha resuelto su duda sobre la renta.', out: 'Cliente respondido' }, { path: [5, 3], q: '', qs: '', out: 'Cuotas emitidas' }] },
  { key: 'rest', l: 'Restaurante', mode: 'lanes', packet: 'tarea', unit: 'tareas cerradas', gnames: ['Sala', 'Cocina', 'Marketing', 'Equipo'], lanes: [
    { name: 'Sala', agents: ['Reservas', 'Reseñas'], acts: ['confirmando mesas', 'respondiendo reseñas'], dec: -1, q: '', qs: '', out: 'Mesas confirmadas' },
    { name: 'Cocina', agents: ['Inventario', 'Pedidos', 'Mermas'], acts: ['contando existencias', 'preparando el pedido', 'controlando mermas'], dec: 1, q: '¿Confirmo el pedido al proveedor?', qs: 'Pedidos lo ha calculado con el inventario de hoy.', out: 'Pedido enviado' },
    { name: 'Marketing', agents: ['Redes', 'Promociones'], acts: ['preparando la carta', 'oferta del finde'], dec: 1, q: '¿Publicamos la oferta del fin de semana?', qs: 'Promociones propone un 2×1 en postres.', out: 'Oferta publicada' },
    { name: 'Equipo', agents: ['Turnos', 'Caja'], acts: ['cuadrando horarios', 'cerrando la caja'], dec: -1, q: '', qs: '', out: 'Día cerrado' }] },
  { key: 'mkt', l: 'Marketing', mode: 'star', packet: 'encargo', unit: 'encargos cerrados', center: 'Coordinador', gnames: ['Investigar', 'Crear', 'Lanzar y medir'], sgroups: [0, 0, 1, 1, 2, 2],
    spec: ['Competencia', 'Ideas', 'Contenidos', 'Diseño', 'Campañas', 'Medición'], acts: ['analizando competencia', 'proponiendo ángulos', 'redactando textos', 'creando piezas', 'preparando la campaña', 'midiendo resultados'],
    tasks: [{ path: [0, 1, 2, 3], q: '¿Lanzamos la campaña de Navidad?', qs: 'El equipo ha preparado ángulos, textos y piezas.', out: 'Campaña lanzada' }, { path: [5, 2], q: '', qs: '', out: 'Informe enviado' }] },
];

type Evento = [number, string, string, number];
type Informe = [string, string, string[]];
export const DIAS: Record<string, { ev: Evento[]; rep: Informe[] }> = {
  ecom: { ev: [[0.3, 'Búsqueda', 'Rastrea 1.240 anuncios y propone 6 candidatos', 6], [1.6, 'Validación', 'Comprueba demanda, calidad y competencia de los 6', 6], [3.1, 'Presupuestos', 'Pide precio a 3 proveedores', 3], [4.3, 'Listado', 'Deja 2 fichas listas en borrador', 2], [4.9, 'Estratega', 'Plantea el testeo de la semana', 1], [7.2, 'Productor', 'Genera 5 creativos de imagen y vídeo', 5], [9.6, 'Crítico', 'Revisa los creativos con la rúbrica', 5], [11, 'Analista', 'Lee las campañas y resume el día', 1], [12.6, 'Auditor', 'Comprueba que todo cuadra', 1]],
    rep: [['Informe de mediodía', '18 tareas hechas y 2 productos validados. Necesito tu decisión en:', ['¿Pasamos la lámpara recargable a presupuestos?', '¿Aprobamos el plan de testeo de la semana?']], ['Informe de la tarde', '5 creativos revisados: 4 pasan la rúbrica. Campañas al día.', ['¿Lanzamos el testeo con los 4 creativos aprobados?']]] },
  clin: { ev: [[0.2, 'Citas', 'Confirma las 34 citas del día', 34], [1.4, 'Recordatorios', 'Avisa a los pacientes de mañana', 28], [2.8, 'Historiales', 'Prepara los historiales de la tarde', 16], [4.2, 'Informes', 'Redacta 6 informes de consulta', 6], [7, 'Facturación', 'Emite 22 facturas', 22], [8.8, 'Reseñas', 'Responde 5 reseñas', 5], [10.2, 'Turnos', 'Cuadra los turnos de la semana', 1]],
    rep: [['Informe de mediodía', '84 tareas hechas. Hay dos huecos libres esta tarde.', ['¿Envío los 6 informes a los pacientes?', '¿Ofrezco los huecos a la lista de espera?']], ['Informe de la tarde', 'Facturación al día y turnos de la semana listos.', ['¿Doy por buenos los turnos?']]] },
  gest: { ev: [[0.4, 'Documentación', 'Recoge las facturas de 18 clientes', 18], [1.9, 'Clasificación', 'Ordena 240 gastos', 240], [3.3, 'Plazos', 'Avisa de 4 vencimientos', 4], [4.6, 'Borradores', 'Prepara 3 trimestrales', 3], [7.2, 'Consultas', 'Responde 9 dudas de clientes', 9], [9, 'Cobros', 'Emite 31 cuotas', 31]],
    rep: [['Informe de mediodía', '265 tareas hechas. 3 trimestrales listos para revisar.', ['¿Presento el trimestral que vence hoy?', '¿Recuerdo el plazo a los 4 clientes de esta semana?']], ['Informe de la tarde', 'Cuotas emitidas y consultas respondidas.', ['¿Envío la respuesta sobre la renta que necesita tu firma?']]] },
  rest: { ev: [[0.2, 'Reservas', 'Confirma 28 mesas para hoy', 28], [1.5, 'Inventario', 'Cuenta las existencias de cocina', 1], [2.6, 'Pedidos', 'Calcula el pedido de mañana', 1], [4, 'Redes', 'Prepara la carta del finde', 1], [7.5, 'Reseñas', 'Responde 14 reseñas', 14], [9.5, 'Turnos', 'Cuadra el turno de noche', 1], [13, 'Caja', 'Cuadra la caja del día', 1]],
    rep: [['Informe de mediodía', '31 tareas hechas. Pedido calculado con el inventario de hoy.', ['¿Confirmo el pedido al proveedor?', '¿Publicamos el 2×1 de postres del finde?']], ['Informe de la tarde', 'Sala completa esta noche y turnos listos.', ['¿Abrimos 4 mesas más en la terraza?']]] },
  mkt: { ev: [[0.5, 'Competencia', 'Analiza 5 marcas del sector', 5], [2, 'Ideas', 'Propone 8 ángulos de campaña', 8], [3.4, 'Contenidos', 'Redacta 12 publicaciones', 12], [4.7, 'Diseño', 'Crea las piezas de cada una', 12], [7.4, 'Campañas', 'Deja la campaña configurada', 1], [9.6, 'Medición', 'Resume los resultados de la semana', 1]],
    rep: [['Informe de mediodía', '37 entregables listos. El ángulo «ahorro de tiempo» gana en la prueba.', ['¿Lanzamos la campaña con este ángulo?', '¿Aprobamos las 12 publicaciones?']], ['Informe de la tarde', 'Resultados de la semana: coste por cliente un 14 % menor.', ['¿Subimos el presupuesto un 20 %?']]] },
};

export const YO: [number, string, string][] = [[0, 'Desayunas sin prisa', 'El equipo ya lleva un rato trabajando.'], [1, 'Reunión con un cliente importante', 'Toda tu atención, sin mirar el correo.'], [3, 'Piensas la estrategia del trimestre', 'Lo que ningún agente puede hacer por ti.'], [5.5, 'Lees el informe de mediodía', 'Lo hecho, ordenado, y lo que necesita tu decisión.'], [6.2, 'Comes con calma', 'Nadie te necesita para que todo siga.'], [8, 'Visitas a un proveedor', 'O cierras una alianza, o formas a tu equipo.'], [10, 'Entrenas', 'Con la cabeza despejada se decide mejor.'], [11.5, 'Lees el informe de la tarde', 'Una decisión más y el día queda cerrado.'], [12.4, 'Tiempo con los tuyos', 'El trabajo manual ya está hecho.']];

export const PALETA = { dark: ['#FF7A45', '#4DA3FF', '#3DDC97', '#C08CFF'], light: ['#B8350F', '#1F5FBF', '#1A7F52', '#7A4CC2'] };

export const ICONOS = {
  search: 'M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14z M16 16l5 5', check: 'M5 12.5l4.5 4.5L19 7.5', euro: 'M17 6a6 6 0 1 0 0 12 M5 10h9 M5 14h9',
  video: 'M3 6h12v12H3z M15 10l6-3v10l-6-3', chart: 'M4 20V10 M10 20V4 M16 20v-7 M22 20H2', chat: 'M4 5h16v11H9l-5 4z', pen: 'M4 20l4-1 11-11-3-3L5 16z',
};

export const REGLAS = [
  { label: 'Rastrear anuncios', icon: ICONOS.search, fx: 120, fy: -160, fr: -14 }, { label: 'Comparar precios', icon: ICONOS.euro, fx: -80, fy: -120, fr: 10 },
  { label: 'Comprobar calidad', icon: ICONOS.check, fx: 200, fy: -60, fr: 18 }, { label: 'Pedir presupuestos', icon: ICONOS.chat, fx: -140, fy: -200, fr: -8 },
  { label: 'Redactar fichas', icon: ICONOS.pen, fx: 60, fy: -240, fr: 12 }, { label: 'Generar creativos', icon: ICONOS.video, fx: 260, fy: -140, fr: -20 },
  { label: 'Leer métricas', icon: ICONOS.chart, fx: -60, fy: -90, fr: 6 },
];
export const DECISIONES = [
  { label: '¿Qué producto pruebo?', fx: -220, fy: -150, fr: 14 }, { label: '¿Cuánto invierto?', fx: -320, fy: -60, fr: -10 },
  { label: '¿Qué mensaje lanzo?', fx: -160, fy: -230, fr: 8 }, { label: '¿Sigo o lo paro?', fx: -280, fy: -120, fr: -16 },
];
export const PRINCIPIOS = [
  { title: 'Tú decides lo importante', text: 'Nada irreversible ocurre sin tu aprobación.' },
  { title: 'Memoria compartida', text: 'Lo que aprende un agente lo saben todos, y no se olvida.' },
  { title: 'Aprende de su trabajo', text: 'Cada decisión y cada resultado afinan el siguiente ciclo.' },
  { title: 'Todo en un sitio', text: 'Un panel único para ver quién trabaja y qué espera de ti.' },
];
export const COMPARA = [
  { task: 'Producto validado', before: 'Una tarde por producto', after: '2–3 al día, al despertar' },
  { task: 'Ficha en la tienda', before: '1–2 horas', after: 'Minutos' },
  { task: 'Estrategia y creativos', before: '1 o 2 tardes', after: 'Generados en minutos' },
];
/** Semana de tardes: [día, bloques [texto, tiempo, flex, r1, r2], libre, texto libre] */
export const SEMANA = [
  { day: 'Lunes', on: true, blocks: [['Buscar y validar', '≈ 4 h', '1', 'entry 20%', 'entry 60%']], free: '' },
  { day: 'Martes', on: true, blocks: [['Presupuestos y ficha', '≈ 2 h', '1', 'entry 40%', 'entry 75%'], ['Estrategia', '≈ 2 h', '1', 'entry 55%', 'entry 90%']], free: '' },
  { day: 'Miércoles', on: true, blocks: [['Creativos', '≈ 4 h', '1', 'entry 70%', 'cover 40%']], free: '' },
  { day: 'Jueves', on: true, blocks: [['Revisar y lanzar', '≈ 1,5 h', '0 0 42%', 'entry 80%', 'cover 45%']], free: 'Y vuelta a empezar con el siguiente' },
  { day: 'Viernes', on: false, blocks: [] as string[][], free: '¿Y el resto del negocio?' },
];

/** Disposición 3D de los nodos según el sector (carriles o estrella). */
export interface Nodo { name: string; act?: string; lane?: number; idx?: number; g?: number; you?: boolean; center?: boolean; p: [number, number, number] }
export function disposicion(sec: Sector) {
  const nodes: Nodo[] = [];
  const edges: [number, number, 'chain' | 'spoke'][] = [];
  if (sec.mode === 'lanes') {
    const lanes = sec.lanes!;
    const L = lanes.length;
    lanes.forEach((ln, j) => {
      const n = ln.agents.length, y = L === 1 ? 0 : (j - (L - 1) / 2) * (L > 3 ? 0.5 : 0.62);
      const r = L === 1 ? 1.05 : 0.95;
      ln.agents.forEach((a, i) => {
        const ang = (i / n) * Math.PI * 2 + j * 0.9;
        const wave = (L === 1 ? 0.34 : 0.12) * Math.sin(ang * 2 + j);
        nodes.push({ name: a, act: ln.acts[i], lane: j, idx: i, g: ln.groups ? ln.groups[i] : j, p: [Math.cos(ang) * r, y + wave, Math.sin(ang) * r] });
      });
    });
    let base = 0;
    lanes.forEach((ln) => { for (let i = 0; i < ln.agents.length - 1; i++) edges.push([base + i, base + i + 1, 'chain']); base += ln.agents.length; });
    const you = nodes.length;
    nodes.push({ name: 'Tú decides', you: true, p: [0, 0, 0] });
    for (let i = 0; i < you; i++) edges.push([i, you, 'spoke']);
  } else {
    nodes.push({ name: sec.center!, act: 'repartiendo el trabajo', center: true, p: [0, -0.2, 0] });
    sec.spec!.forEach((a, i) => { const ang = (i / sec.spec!.length) * Math.PI * 2; nodes.push({ name: a, act: sec.acts![i], g: sec.sgroups![i], p: [Math.cos(ang) * 1.1, -0.2 + 0.22 * Math.sin(ang * 2), Math.sin(ang) * 1.1] }); });
    sec.spec!.forEach((_, i) => edges.push([0, i + 1, 'chain']));
    const you = nodes.length;
    nodes.push({ name: 'Tú decides', you: true, p: [0, 0.62, 0] });
    edges.push([0, you, 'spoke']);
  }
  return { nodes, edges };
}

export interface Flujo { lane: number; path: number[]; decAt: number; q: string; qs: string; out: string; packet: string }
export function flujo(sec: Sector, f: number): Flujo {
  if (sec.mode === 'lanes') {
    const lanes = sec.lanes!;
    const j = f % lanes.length;
    let base = 0; for (let k = 0; k < j; k++) base += lanes[k].agents.length;
    const ln = lanes[j];
    return { lane: j, path: ln.agents.map((_, i) => base + i), decAt: ln.dec, q: ln.q, qs: ln.qs, out: ln.out, packet: sec.packet };
  }
  const tk = sec.tasks![f % sec.tasks!.length];
  const path = [0];
  tk.path.forEach((s) => { path.push(s + 1); path.push(0); });
  return { lane: -1, path, decAt: tk.q ? path.length - 1 : -1, q: tk.q, qs: tk.qs, out: tk.out, packet: sec.packet };
}

/** Generador pseudoaleatorio con semilla (el mismo del tablero). */
export function aleatorio(seed: number) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
}
