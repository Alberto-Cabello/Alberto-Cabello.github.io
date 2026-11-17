import { useRef, useState } from 'preact/hooks';
import { HeaderCasoMovil } from '../../components/Header';
import { useDiferido } from '../../lib/diferido';
import { COMPARA, DECISIONES, PRINCIPIOS, REGLAS, SECTORES } from './datos';
import { RUTAS_CASO } from './Desktop';

const MONO = "font-family: 'IBM Plex Mono', ui-monospace, monospace";
const IC = {
  moon: 'M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z', clock: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z M12 7v5l3 3', link: 'M12 5a3 3 0 1 0 0 6a3 3 0 1 0 0-6z M5 16a3 3 0 1 0 0 6 M19 16a3 3 0 1 0 0 6 M12 11v3 M7 18l5-4 5 4',
  up: 'M4 18l6-6 4 4 6-8 M14 8h6v6', shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M8.5 12.5l2.5 2.5 4.5-5', grow: 'M4 20V14 M10 20V10 M16 20V6 M3 20h18',
};
const GANANCIAS = [
  { title: 'Trabaja mientras duermes', text: 'Por la mañana tienes resultados, no tareas.', icon: IC.moon, bg: 'var(--accent)', fg: 'var(--on-accent)', border: '0', icBg: 'rgba(0,0,0,0.16)', icFg: 'var(--on-accent)' },
  { title: 'Tu tiempo, para lo que importa', text: 'Dejas de ejecutar y decides, vendes y creces.', icon: IC.clock, bg: 'var(--panel)', fg: 'var(--fg)', border: '1px solid var(--line)', icBg: 'var(--inner)', icFg: 'var(--accent-text)' },
  { title: 'El conocimiento no se pierde', text: 'Todo lo aprendido queda en una memoria común.', icon: IC.link, bg: 'var(--panel)', fg: 'var(--fg)', border: '1px solid var(--line)', icBg: 'var(--inner)', icFg: 'var(--accent-text)' },
  { title: 'Mejora cada semana', text: 'Cada decisión tuya enseña a los agentes.', icon: IC.up, bg: 'var(--fg)', fg: 'var(--bg)', border: '0', icBg: 'var(--accent)', icFg: 'var(--on-accent)' },
  { title: 'Sin sustos', text: 'Lo irreversible siempre pasa por ti.', icon: IC.shield, bg: 'var(--panel)', fg: 'var(--fg)', border: '1px solid var(--line)', icBg: 'var(--inner)', icFg: 'var(--accent-text)' },
  { title: 'Creces sin contratar', text: 'Más volumen de trabajo, la misma persona al mando.', icon: IC.grow, bg: 'var(--panel)', fg: 'var(--fg)', border: '2px solid var(--accent)', icBg: 'var(--accent-soft)', icFg: 'var(--accent-text)' },
];
const SEMANA_M = [
  { day: 'Lunes', on: true, blocks: [['Buscar y validar', '≈ 4 h', '1']], free: '' },
  { day: 'Martes', on: true, blocks: [['Presup. y ficha', '≈ 2 h', '1'], ['Estrategia', '≈ 2 h', '1']], free: '' },
  { day: 'Miércoles', on: true, blocks: [['Creativos', '≈ 4 h', '1']], free: '' },
  { day: 'Jueves', on: true, blocks: [['Revisar y lanzar', '≈ 1,5 h', '0 0 52%']], free: 'Y vuelta a empezar' },
  { day: 'Viernes', on: false, blocks: [] as string[][], free: '¿Y el resto del negocio?' },
];

export function Mobile() {
  const [sector, setSector] = useState(0);
  const [horas, setHoras] = useState(6);
  const rSol = useRef<HTMLElement>(null);
  const rCambio = useRef<HTMLElement>(null);
  const Constelacion = useDiferido(() => import('../../components/Constelacion'), rSol, '600px');
  const Dia = useDiferido(() => import('../../components/Dia'), rCambio, '600px');
  const anuales = horas * 46;
  const btn = 'display: flex; align-items: center; justify-content: center; min-height: 54px; border-radius: 999px; text-decoration: none; font-weight: 600';

  return (
    <div class="caso movil-raiz">
      <HeaderCasoMovil volverHref={RUTAS_CASO.volver} />
      <main>
        <section style="padding: 36px 16px 32px; display: flex; flex-direction: column; gap: 18px">
          <p class="fade" style={`margin: 0; ${MONO}; font-size: 12px; color: var(--accent-text)`}>Caso 01 · Agentes de IA</p>
          <h1 style="margin: 0; font-weight: 800; font-size: 44px; line-height: 0.96; letter-spacing: -0.05em">
            <span class="ln"><span class="w">Red</span> <span class="w" style="animation-delay: .08s">de</span> <span class="w" style="animation-delay: .16s">agentes</span></span>
            <span class="ln"><span class="w" style="animation-delay: .24s">para</span> <span class="w" style="animation-delay: .32s">un</span> <span class="w" style="animation-delay: .4s">e-commerce</span></span>
          </h1>
          <p class="fade" style="margin: 0; font-size: 18px; line-height: 1.4">Lo construí para mi propio negocio. Antes perdía una tarde entera en validar un solo producto; ahora me despierto con <strong style="color: var(--accent-text)">2–3 productos validados al día</strong>.</p>
          <a href={RUTAS_CASO.demo} class="fade pulse" style={`${btn}; background: var(--accent); color: var(--on-accent)`}>Probar la demo →</a>
          <nav class="fade hsc capitulos capitulos-m" aria-label="Capítulos">
            <a href="#problema">01 El problema</a><a href="#vi">02 Lo que vi</a><a href="#solucion">03 La solución</a><a href="#cambio">04 El cambio</a>
          </nav>
        </section>

        <section id="problema" style="border-top: 1px solid var(--line); padding: 48px 16px">
          <p style={`margin: 0 0 12px; ${MONO}; font-size: 12px; color: var(--muted)`}>01 — El problema</p>
          <h2 style="margin: 0 0 14px; font-weight: 800; font-size: 34px; line-height: 1; letter-spacing: -0.045em">Mis tardes de la semana. <span style="color: var(--muted)">Un solo producto se las comía.</span></h2>
          <p style="margin: 0 0 24px; color: var(--muted)">Mis tardes van de 16 a 20 h. Buscar entre miles de anuncios, validarlo en varias webs, pedir presupuestos, montar la ficha, preparar creativos y lanzar la campaña. Todo a mano, con herramientas dispersas.</p>
          <div role="img" aria-label="Tardes de lunes a viernes: el lunes, buscar y validar; el martes, presupuestos, ficha y estrategia; el miércoles, creativos; el jueves, revisar y lanzar. Unas 13 horas y media para un solo producto." style="display: flex; flex-direction: column; gap: 8px">
            {SEMANA_M.map((d) => (
              <div key={d.day} style="display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: 8px; align-items: stretch">
                <span style={`display: flex; align-items: center; padding: 0 10px; border-radius: 12px; background: ${d.on ? 'var(--accent)' : 'var(--inner)'}; color: ${d.on ? 'var(--on-accent)' : 'var(--fg)'}; font-weight: 800; font-size: 13px`}>{d.day}</span>
                <div style="display: flex; gap: 6px; min-height: 56px">
                  {d.blocks.map((b) => (
                    <div key={b[0]} class="fillb fillb-m" style={`flex: ${b[2]}; min-width: 0; border-radius: 12px; background: var(--manual); color: var(--on-manual); padding: 8px 10px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; line-height: 1.15`}><span style="font-size: 12.5px; font-weight: 600">{b[0]}</span><strong style="font-size: 17px; letter-spacing: -0.02em">{b[1]}</strong></div>
                  ))}
                  {d.free && <div style="flex: 1; display: flex; align-items: center; padding: 0 12px; border-radius: 12px; border: 1px dashed var(--line); color: var(--muted); font-size: 13px; line-height: 1.25">{d.free}</div>}
                </div>
              </div>
            ))}
          </div>
          <p class="rv" style="margin: 28px 0 0; font-weight: 800; font-size: 30px; line-height: 1.02; letter-spacing: -0.045em">Un producto: <span style="color: var(--accent-text)">más de 3 de mis 5 tardes</span> y más de 13 horas.</p>
        </section>

        <section id="vi" style="background: var(--panel); padding: 52px 16px">
          <p style={`margin: 0 0 16px; ${MONO}; font-size: 12px; color: var(--muted)`}>02 — Lo que vi</p>
          <div style="display: flex; flex-direction: column; gap: 14px">
            <div style="padding: 18px 16px; border-radius: 20px; border: 1px solid var(--line); background: var(--bg)">
              <p style="margin: 0; font-weight: 800; font-size: 22px; letter-spacing: -0.02em">Reglas</p>
              <p style="margin: 2px 0 14px; font-size: 15px; font-weight: 600">Se pueden enseñar: <span style="color: var(--muted)">las hacen los agentes.</span></p>
              <ul style="list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px">
                {REGLAS.map((r) => <li key={r.label} style="display: flex; align-items: center; gap: 8px; padding: 10px; border-radius: 12px; background: var(--inner); font-weight: 600; font-size: 13.5px; line-height: 1.2"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="flex: 0 0 18px"><path d={r.icon} /></svg>{r.label}</li>)}
              </ul>
            </div>
            <div style="padding: 18px 16px; border-radius: 20px; border: 2px solid var(--accent); background: var(--bg)">
              <p style="margin: 0; font-weight: 800; font-size: 22px; letter-spacing: -0.02em; color: var(--accent-text)">Decisiones</p>
              <p style="margin: 2px 0 14px; font-size: 15px; font-weight: 600">Dependen de tu criterio: <span style="color: var(--accent-text)">son tuyas.</span></p>
              <ul style="list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px">
                {DECISIONES.map((d) => <li key={d.label} style="display: flex; align-items: center; gap: 8px; padding: 10px; border-radius: 12px; background: var(--accent-soft); border: 1px solid var(--accent); font-weight: 700; font-size: 13.5px; line-height: 1.2"><span aria-hidden="true" style="flex: 0 0 20px; width: 20px; height: 20px; border-radius: 99px; background: var(--accent); color: var(--on-accent); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 12px">?</span>{d.label}</li>)}
              </ul>
            </div>
          </div>
          <p class="rv" style="margin: 32px 0 0; font-weight: 800; font-size: 30px; line-height: 1.04; letter-spacing: -0.045em">Casi todo el trabajo sigue reglas que se pueden enseñar. <span style="color: var(--accent-text)">Lo único que no se delega son las decisiones.</span></p>
        </section>

        <section id="solucion" ref={rSol} style="padding: 52px 16px">
          <p style={`margin: 0 0 12px; ${MONO}; font-size: 12px; color: var(--muted)`}>03 — La solución</p>
          <h2 style="margin: 0 0 14px; font-weight: 800; font-size: 34px; line-height: 1; letter-spacing: -0.045em">Un equipo de agentes. <span style="color: var(--accent-text)">Una persona decide.</span></h2>
          <p style="margin: 0 0 18px; color: var(--muted)">El de mi e-commerce es solo un ejemplo. Cada tarea viaja de agente en agente, en orden. Cuando hace falta tu criterio, el equipo se para y te espera. Elige un negocio:</p>
          {Constelacion ? <Constelacion sector={sector} onSector={setSector} movil /> : <div class="hueco-cn-m" />}
          <div style="display: flex; flex-direction: column; gap: 18px; margin-top: 36px">
            {PRINCIPIOS.map((p) => (
              <div key={p.title} class="rv" style="display: flex; flex-direction: column; gap: 4px; padding-top: 14px; border-top: 2px solid var(--fg)">
                <strong style="font-weight: 800; font-size: 19px; letter-spacing: -0.02em">{p.title}</strong>
                <span style="color: var(--muted); font-size: 15px">{p.text}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="cambio" ref={rCambio} style="border-top: 1px solid var(--line); padding: 52px 16px">
          <p style={`margin: 0 0 12px; ${MONO}; font-size: 12px; color: var(--accent-text)`}>04 — El cambio</p>
          <h2 style="margin: 0 0 24px; font-weight: 800; font-size: 46px; line-height: 0.95; letter-spacing: -0.05em">De ejecutar <span style="color: var(--accent-text)">a decidir.</span></h2>
          <h3 style="margin: 0 0 10px; font-weight: 800; font-size: 28px; line-height: 1.02; letter-spacing: -0.04em">Ellos hacen el trabajo. <span style="color: var(--accent-text)">Tú vives tu día.</span></h3>
          <p style="margin: 0 0 14px; color: var(--muted); font-size: 15px">Un día cualquiera con un equipo de agentes: el trabajo manual pasa solo y a ti te llegan informes con lo hecho y lo que necesita tu decisión. Arrastra la línea del día o déjala correr.</p>
          <div role="group" aria-label="Tu negocio" class="hsc" style="margin: 0 -16px 12px; padding: 0 16px">
            {SECTORES.map((x, i) => <button type="button" key={x.key} class="chip-s" style="padding: 0 14px; font-size: 14px" aria-pressed={i === sector ? 'true' : 'false'} onClick={() => setSector(i)}>{x.l}</button>)}
          </div>
          {Dia ? <Dia sector={sector} movil /> : <div class="hueco-dia-m" />}

          <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 14px">
            {COMPARA.map((c) => (
              <div key={c.task} class="rv" style="padding: 18px; border-radius: 20px; border: 1px solid var(--line); display: flex; flex-direction: column; gap: 4px">
                <span style={`${MONO}; font-size: 12px; color: var(--muted)`}>{c.task}</span>
                <span style="color: var(--muted); text-decoration: line-through; font-size: 15px">{c.before}</span>
                <strong style="font-weight: 800; font-size: 26px; line-height: 1.04; letter-spacing: -0.035em; color: var(--accent-text)">{c.after}</strong>
              </div>
            ))}
          </div>

          <h3 style="margin: 56px 0 10px; font-weight: 800; font-size: 32px; line-height: 1; letter-spacing: -0.045em">Y en tu negocio, <span style="color: var(--muted)">¿qué cambiaría?</span></h3>
          <p style="margin: 0 0 20px; color: var(--muted)">Lo que gana cualquiera con un equipo de agentes: el trabajo repetitivo pasa a los agentes y tú te quedas con lo que hace crecer el negocio.</p>
          <div style="display: flex; flex-direction: column; gap: 10px">
            {GANANCIAS.map((g) => (
              <div key={g.title} class="rv" style={`padding: 18px; border-radius: 20px; background: ${g.bg}; color: ${g.fg}; border: ${g.border}; display: grid; grid-template-columns: 38px minmax(0, 1fr); gap: 4px 12px; align-items: start`}>
                <span style={`grid-row: span 2; width: 38px; height: 38px; border-radius: 11px; background: ${g.icBg}; display: flex; align-items: center; justify-content: center`}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={g.icFg} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d={g.icon} /></svg></span>
                <strong style="font-weight: 800; font-size: 20px; line-height: 1.1; letter-spacing: -0.025em">{g.title}</strong>
                <span style="font-size: 15px; opacity: .85">{g.text}</span>
              </div>
            ))}
          </div>

          <div class="rv" style="margin-top: 14px; padding: 20px 16px; border-radius: 22px; border: 2px solid var(--accent); display: flex; flex-direction: column; gap: 10px">
            <p style="margin: 0; font-weight: 800; font-size: 22px; letter-spacing: -0.02em">Haz la cuenta</p>
            <label style="display: flex; flex-direction: column; gap: 2px; font-size: 15px; color: var(--muted)">¿Cuántas horas a la semana dedicas a tareas repetitivas? <strong style="color: var(--fg); font-size: 19px">{horas} h/semana</strong>
              <input class="rng" type="range" min="1" max="40" value={horas} onInput={(e) => setHoras(Number(e.currentTarget.value))} />
            </label>
            <p style="margin: 0; font-weight: 800; font-size: 46px; line-height: 0.95; letter-spacing: -0.05em; color: var(--accent-text)">{anuales} h al año</p>
            <p style="margin: 0; color: var(--muted); font-size: 15px">Son {Math.round(anuales / 8)} jornadas completas dedicadas a tareas repetitivas (46 semanas laborables). ¿Cuántas podría asumir un agente?</p>
          </div>
        </section>

        <section style="padding: 0 16px 40px">
          <div class="rv" style="padding: 28px 20px; border-radius: 26px; background: var(--fg); color: var(--bg); display: flex; flex-direction: column; gap: 18px">
            <h2 style="margin: 0; font-weight: 800; font-size: 34px; line-height: 1; letter-spacing: -0.05em">¿Qué haría un equipo de agentes en tu negocio?</h2>
            <a href={RUTAS_CASO.contacto} style={`${btn}; background: var(--accent); color: var(--on-accent)`}>Cuéntame tu idea</a>
            <a href={RUTAS_CASO.demo} style={`${btn}; border: 1px solid var(--bg)`}>Probar la demo</a>
            <a href={RUTAS_CASO.siguiente} style="display: flex; align-items: center; justify-content: center; min-height: 48px; text-decoration: none; font-weight: 600">Siguiente caso: Study Engine →</a>
          </div>
        </section>
      </main>
    </div>
  );
}
