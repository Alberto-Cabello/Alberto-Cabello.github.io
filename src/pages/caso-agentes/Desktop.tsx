import { useRef, useState } from 'preact/hooks';
import { HeaderCaso } from '../../components/Header';
import { useDiferido } from '../../lib/diferido';
import { COMPARA, DECISIONES, PRINCIPIOS, REGLAS, SECTORES, SEMANA } from './datos';

const MONO = "font-family: 'IBM Plex Mono', ui-monospace, monospace";
export const RUTAS_CASO = { demo: '/casos/red-de-agentes/demo/', contacto: '/?para=clientes#contacto', siguiente: '/casos/app-de-estudio/', volver: '/#casos' };

export function Desktop() {
  const [sector, setSector] = useState(0);
  const [horas, setHoras] = useState(6);
  const [tocado, setTocado] = useState(false);
  const rSol = useRef<HTMLElement>(null);
  const rCambio = useRef<HTMLDivElement>(null);
  const Constelacion = useDiferido(() => import('../../components/Constelacion'), rSol);
  const Dia = useDiferido(() => import('../../components/Dia'), rCambio);
  const anuales = horas * 46;

  return (
    <div class="caso">
      <HeaderCaso volverHref={RUTAS_CASO.volver} />
      <main>
        <section style="max-width: 1320px; margin: 0 auto; padding: clamp(40px, 8vw, 110px) clamp(20px, 4vw, 48px) clamp(48px, 8vw, 100px)">
          <p class="fade" style={`margin: 0 0 24px; ${MONO}; font-size: 14px; color: var(--accent-text)`}>Caso 01 · Agentes de IA</p>
          <h1 style="margin: 0; font-weight: 800; font-size: clamp(44px, 7.4vw, 120px); line-height: 0.95; letter-spacing: -0.05em">
            <span class="ln"><span class="w">Red</span> <span class="w" style="animation-delay: .08s">de</span> <span class="w" style="animation-delay: .16s">agentes</span></span>
            <span class="ln"><span class="w" style="animation-delay: .24s">para</span> <span class="w" style="animation-delay: .32s">un</span> <span class="w" style="animation-delay: .4s">e-commerce</span></span>
          </h1>
          <p class="fade" style="margin: 32px 0 0; max-width: 760px; font-size: clamp(19px, 2vw, 26px); line-height: 1.35; text-wrap: pretty">Lo construí para mi propio negocio. Antes perdía una tarde entera en validar un solo producto; ahora me despierto con <strong style="color: var(--accent-text)">2–3 productos validados al día</strong>.</p>
          <nav class="fade capitulos" aria-label="Capítulos">
            <a href="#problema">01 El problema</a><a href="#vi">02 Lo que vi</a><a href="#solucion">03 La solución</a><a href="#cambio">04 El cambio</a>
          </nav>
        </section>

        <section id="problema" style="border-top: 1px solid var(--line)">
          <div style="max-width: 1320px; margin: 0 auto; padding: clamp(56px, 9vw, 120px) clamp(20px, 4vw, 48px)">
            <p style={`margin: 0 0 16px; ${MONO}; font-size: 14px; color: var(--muted)`}>01 — El problema</p>
            <h2 style="margin: 0 0 20px; font-weight: 800; font-size: clamp(34px, 4.6vw, 68px); line-height: 1; letter-spacing: -0.045em"><span class="rvl"><span>Mis tardes de la semana.</span></span><span class="rvl"><span style="color: var(--muted)">Un solo producto se las comía.</span></span></h2>
            <p class="rv" style="margin: 0 0 40px; max-width: 620px; color: var(--muted)">Mis tardes van de 16 a 20 h. Buscar entre miles de anuncios, validarlo en varias webs, pedir presupuestos, montar la ficha, preparar creativos y lanzar la campaña. Todo a mano, con herramientas dispersas.</p>
            <div role="img" aria-label="Calendario de tardes de lunes a viernes: el lunes, buscar y validar; el martes, presupuestos, ficha y estrategia; el miércoles, creativos; el jueves, revisar y lanzar. Unas 13 horas y media para un solo producto." class="cal" style="display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: clamp(6px, 1vw, 14px); font-size: 15px">
              {SEMANA.map((d) => (
                <div key={d.day} style="display: flex; flex-direction: column; gap: 10px">
                  <div style={`align-self: flex-start; padding: 6px 14px; border-radius: 999px; background: ${d.on ? 'var(--accent)' : 'var(--inner)'}; color: ${d.on ? 'var(--on-accent)' : 'var(--fg)'}; font-weight: 800; font-size: 16px; letter-spacing: -0.01em`}>{d.day}</div>
                  <div style="position: relative; height: clamp(180px, 22vw, 260px); border-radius: 16px; border: 1px dashed var(--line); background: var(--panel); display: flex; flex-direction: column; gap: 6px; padding: 6px; box-sizing: border-box; overflow: hidden">
                    {d.blocks.map((b) => (
                      <div key={b[0]} class="fillb calb" style={`--r1: ${b[3]}; --r2: ${b[4]}; flex: ${b[2]}; border-radius: 12px; background: var(--manual); color: var(--on-manual); padding: 12px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; font-weight: 600; line-height: 1.2`}>
                        <span>{b[0]}</span><span style="font-weight: 800; font-size: clamp(18px, 2vw, 30px); letter-spacing: -0.02em">{b[1]}</span>
                      </div>
                    ))}
                    {d.free && <div style="flex: 1; display: flex; align-items: center; justify-content: center; text-align: center; padding: 8px; color: var(--muted); font-size: 14px">{d.free}</div>}
                  </div>
                </div>
              ))}
            </div>
            <div class="total" style="display: flex; flex-wrap: wrap; align-items: center; gap: 16px 28px; margin-top: 40px">
              <svg aria-hidden="true" width="64" height="64" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="var(--accent)" stroke-width="1.6" /><g class="spin"><path d="M12 12 L12 5" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" /></g><path d="M12 12 L16 14" stroke="var(--fg)" stroke-width="1.8" stroke-linecap="round" /></svg>
              <p style="flex: 1 1 420px; margin: 0; font-weight: 800; font-size: clamp(30px, 4.2vw, 60px); line-height: 1; letter-spacing: -0.045em">Un producto: <span style="color: var(--accent-text)">más de 3 de mis 5 tardes</span> y más de 13 horas.</p>
            </div>
          </div>
        </section>

        <section id="vi" style="background: var(--panel)">
          <div style="max-width: 1320px; margin: 0 auto; padding: clamp(72px, 11vw, 150px) clamp(20px, 4vw, 48px)">
            <p style={`margin: 0 0 24px; ${MONO}; font-size: 14px; color: var(--muted)`}>02 — Lo que vi</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr)); gap: 20px; margin-bottom: clamp(56px, 8vw, 96px)">
              <div style="padding: clamp(20px, 3vw, 32px); border-radius: 24px; border: 1px solid var(--line); background: var(--bg)">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px">
                  <span style="width: 44px; height: 44px; border-radius: 12px; background: var(--inner); display: flex; align-items: center; justify-content: center"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--fg)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></svg></span>
                  <div><p style="margin: 0; font-weight: 800; font-size: 24px; letter-spacing: -0.02em">Reglas</p><p style="margin: 4px 0 0; font-size: 17px; font-weight: 600">Se pueden enseñar: <span style="color: var(--muted)">las hacen los agentes.</span></p></div>
                </div>
                <ul style="list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(170px, 100%), 1fr)); gap: 10px">
                  {REGLAS.map((r) => (
                    <li key={r.label} class="sort" style={`--fx: ${r.fx}px; --fy: ${r.fy}px; --fr: ${r.fr}deg; padding: 14px; border-radius: 14px; background: var(--inner); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 10px`}>
                      <span style="display: flex; justify-content: space-between; align-items: center"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d={r.icon} /></svg><span style={`${MONO}; font-size: 11px; color: var(--muted)`}>regla</span></span>
                      <span style="font-weight: 600; font-size: 15px; line-height: 1.25">{r.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style="padding: clamp(20px, 3vw, 32px); border-radius: 24px; border: 2px solid var(--accent); background: var(--bg)">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px">
                  <span style="width: 44px; height: 44px; border-radius: 12px; background: var(--accent); display: flex; align-items: center; justify-content: center"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--on-accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg></span>
                  <div><p style="margin: 0; font-weight: 800; font-size: 24px; letter-spacing: -0.02em; color: var(--accent-text)">Decisiones</p><p style="margin: 4px 0 0; font-size: 17px; font-weight: 600">Dependen de tu criterio: <span style="color: var(--accent-text)">son tuyas.</span></p></div>
                </div>
                <ul style="list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(170px, 100%), 1fr)); gap: 10px">
                  {DECISIONES.map((d) => (
                    <li key={d.label} class="sort" style={`--fx: ${d.fx}px; --fy: ${d.fy}px; --fr: ${d.fr}deg; padding: 14px; border-radius: 14px; background: var(--accent-soft); border: 1px solid var(--accent); display: flex; flex-direction: column; gap: 10px`}>
                      <span style="display: flex; justify-content: space-between; align-items: center"><span aria-hidden="true" style="width: 22px; height: 22px; border-radius: 99px; background: var(--accent); color: var(--on-accent); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px">?</span><span style={`${MONO}; font-size: 11px; color: var(--accent-text)`}>decisión</span></span>
                      <span style="font-weight: 700; font-size: 15px; line-height: 1.25">{d.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p class="focus" style="margin: 0; max-width: 1100px; font-weight: 800; font-size: clamp(34px, 5vw, 76px); line-height: 1.02; letter-spacing: -0.045em; text-wrap: balance">Casi todo el trabajo sigue reglas que se pueden enseñar. <span style="color: var(--accent-text)">Lo único que no se delega son las decisiones.</span></p>
          </div>
        </section>

        <section id="solucion" ref={rSol} style="max-width: 1320px; margin: 0 auto; padding: clamp(56px, 9vw, 120px) clamp(20px, 4vw, 48px)">
          <p style={`margin: 0 0 16px; ${MONO}; font-size: 14px; color: var(--muted)`}>03 — La solución</p>
          <div style="display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 28px">
            <div style="flex: 999 1 560px; min-width: 0">
              <h2 style="margin: 0 0 16px; font-weight: 800; font-size: clamp(34px, 4.6vw, 68px); line-height: 1; letter-spacing: -0.045em"><span class="rvl"><span>Un equipo de agentes.</span></span><span class="rvl"><span style="color: var(--accent-text)">Una persona decide.</span></span></h2>
              <p class="rv" style="margin: 0; max-width: 640px; color: var(--muted)">El de mi e-commerce es solo un ejemplo. Cada tarea viaja de agente en agente, en orden. Cuando hace falta tu criterio, el equipo se para y te espera. Elige un negocio y gira la constelación:</p>
            </div>
            <a href={RUTAS_CASO.demo} class="cta pulse" style="display: inline-flex; align-items: center; min-height: 60px; padding: 0 32px; border-radius: 999px; background: var(--accent); color: var(--on-accent); text-decoration: none; font-weight: 600; font-size: 18px"><span>Probar la demo →</span></a>
          </div>
          {Constelacion ? <Constelacion sector={sector} onSector={setSector} /> : <div class="hueco-cn" />}
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr)); gap: 28px; margin-top: 48px">
            {PRINCIPIOS.map((p) => (
              <div key={p.title} class="rv" style="display: flex; flex-direction: column; gap: 8px; padding-top: 18px; border-top: 2px solid var(--fg)">
                <strong style="font-weight: 800; font-size: 20px; letter-spacing: -0.02em">{p.title}</strong>
                <span style="color: var(--muted); font-size: 16px">{p.text}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="cambio" style="border-top: 1px solid var(--line)">
          <div style="max-width: 1320px; margin: 0 auto; padding: clamp(56px, 9vw, 120px) clamp(20px, 4vw, 48px)">
            <p style={`margin: 0 0 16px; ${MONO}; font-size: 14px; color: var(--accent-text)`}>04 — El cambio</p>
            <h2 class="focus" style="margin: 0 0 28px; font-weight: 800; font-size: clamp(44px, 7vw, 112px); line-height: 0.95; letter-spacing: -0.05em">De ejecutar <span style="color: var(--accent-text)">a decidir.</span></h2>
            <div style="display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 16px 32px; margin-bottom: 22px">
              <h3 style="margin: 0; flex: 999 1 560px; font-weight: 800; font-size: clamp(30px, 3.6vw, 54px); line-height: 1; letter-spacing: -0.045em">Ellos hacen el trabajo. <span style="color: var(--accent-text)">Tú vives tu día.</span></h3>
              <p style="margin: 0; flex: 1 1 320px; max-width: 420px; color: var(--muted); font-size: 15px">Un día cualquiera con un equipo de agentes: el trabajo manual pasa solo, y a ti te llegan informes ordenados con lo hecho y lo que necesita tu decisión. Arrastra la línea del día o déjala correr.</p>
            </div>
            <div role="group" aria-label="Tu negocio" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px">
              {SECTORES.map((x, i) => <button type="button" key={x.key} class="chip-s" style="padding: 0 14px; font-size: 14px" aria-pressed={i === sector ? 'true' : 'false'} onClick={() => setSector(i)}>{x.l}</button>)}
            </div>
            <div ref={rCambio}>{Dia ? <Dia sector={sector} /> : <div class="hueco-dia" />}</div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr)); gap: 12px; margin-top: 16px">
              {COMPARA.map((c) => (
                <div key={c.task} class="rv lift" style="padding: 28px; border-radius: 24px; border: 1px solid var(--line); display: flex; flex-direction: column; gap: 10px">
                  <span style={`${MONO}; font-size: 13px; color: var(--muted)`}>{c.task}</span>
                  <span style="color: var(--muted); text-decoration: line-through">{c.before}</span>
                  <strong style="font-weight: 800; font-size: clamp(26px, 2.8vw, 40px); line-height: 1.02; letter-spacing: -0.035em; color: var(--accent-text)">{c.after}</strong>
                </div>
              ))}
            </div>

            <h3 style="margin: clamp(72px, 9vw, 120px) 0 12px; font-weight: 800; font-size: clamp(32px, 4vw, 60px); line-height: 1; letter-spacing: -0.045em"><span class="rvl"><span>Y en tu negocio,</span></span><span class="rvl"><span style="color: var(--muted)">¿qué cambiaría?</span></span></h3>
            <p class="rv" style="margin: 0 0 32px; max-width: 620px; color: var(--muted)">Lo que gana cualquiera con un equipo de agentes montado como el mío: el trabajo repetitivo pasa a los agentes y tú te quedas con lo que hace crecer el negocio.</p>

            <div class="ganancias" style="display: flex; flex-wrap: wrap; gap: 14px">
              <div class="cards-in lift" style="flex: 2 1 460px; min-width: 0; padding: 32px; border-radius: 28px; background: var(--accent); color: var(--on-accent); display: flex; flex-wrap: wrap; gap: 24px; align-items: center">
                <div style="flex: 1 1 240px; min-width: 0; display: flex; flex-direction: column; gap: 10px"><span style={`${MONO}; font-size: 13px`}>01</span><strong style="font-weight: 800; font-size: clamp(28px, 3vw, 40px); line-height: 1; letter-spacing: -0.035em">Trabaja mientras duermes</strong><span style="font-size: 16px">Por la mañana tienes resultados, no tareas.</span></div>
                <div aria-hidden="true" style="flex: 1 1 200px; min-width: 0; display: flex; flex-direction: column; gap: 12px">
                  <svg class="g-moon" width="56" height="56" viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" fill="var(--on-accent)" /></svg>
                  <div style="height: 12px; border-radius: 99px; background: rgba(0,0,0,0.18)"><div class="g-fill" style="height: 12px; border-radius: 99px; background: var(--on-accent)" /></div>
                  <span style={`${MONO}; font-size: 13px`}>08:00 · 3 productos validados</span>
                </div>
              </div>
              <div class="cards-in lift" style="flex: 1 1 300px; min-width: 0; padding: 32px; border-radius: 28px; background: var(--panel); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 14px">
                <svg aria-hidden="true" width="120" height="120" viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="none" stroke="var(--inner)" stroke-width="8" /><circle class="g-pie" cx="32" cy="32" r="28" fill="none" stroke="var(--accent)" stroke-width="8" stroke-dasharray="176" transform="rotate(-90 32 32)" /></svg>
                <span style={`${MONO}; font-size: 13px; color: var(--accent-text)`}>02</span><strong style="font-weight: 800; font-size: 26px; line-height: 1.05; letter-spacing: -0.03em">Tu tiempo, para lo que importa</strong><span style="color: var(--muted); font-size: 16px">Dejas de ejecutar y decides, vendes y creces.</span>
              </div>
              <div class="cards-in lift" style="flex: 1 1 300px; min-width: 0; padding: 32px; border-radius: 28px; background: var(--panel); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 14px">
                <svg aria-hidden="true" width="100%" height="140" viewBox="0 0 120 72"><path class="g-link" d="M12 50 L44 18 L76 46 L108 16" fill="none" stroke="var(--accent)" stroke-width="2" /><circle class="g-node" cx="12" cy="50" r="7" fill="var(--fg)" /><circle class="g-node" style="animation-delay: .4s" cx="44" cy="18" r="7" fill="var(--accent)" /><circle class="g-node" style="animation-delay: .8s" cx="76" cy="46" r="7" fill="var(--fg)" /><circle class="g-node" style="animation-delay: 1.2s" cx="108" cy="16" r="7" fill="var(--accent)" /></svg>
                <span style={`${MONO}; font-size: 13px; color: var(--accent-text)`}>03</span><strong style="font-weight: 800; font-size: 26px; line-height: 1.05; letter-spacing: -0.03em">El conocimiento no se pierde</strong><span style="color: var(--muted); font-size: 16px">Todo lo aprendido queda en una memoria común.</span>
              </div>
              <div class="cards-in lift" style="flex: 1 1 300px; min-width: 0; padding: 32px; border-radius: 28px; background: var(--fg); color: var(--bg); display: flex; flex-direction: column; gap: 14px">
                <svg aria-hidden="true" width="100%" height="140" viewBox="0 0 140 72"><path class="g-line" d="M4 64 L30 54 L52 58 L78 36 L100 40 L136 8" fill="none" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" /></svg>
                <span style={`${MONO}; font-size: 13px; color: var(--accent-on-fg)`}>04</span><strong style="font-weight: 800; font-size: 26px; line-height: 1.05; letter-spacing: -0.03em">Mejora cada semana</strong><span style="font-size: 16px; opacity: .8">Cada decisión tuya enseña a los agentes.</span>
              </div>
              <div class="cards-in lift" style="flex: 1 1 300px; min-width: 0; padding: 32px; border-radius: 28px; background: var(--panel); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 14px">
                <span style="display: flex; align-items: center; gap: 12px"><svg aria-hidden="true" width="56" height="56" viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.6" /><path d="M8.5 12.5l2.5 2.5 4.5-5" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" /></svg><span class="waitp tag" style="--accent: var(--warn)">espera tu OK</span></span>
                <span style={`${MONO}; font-size: 13px; color: var(--accent-text)`}>05</span><strong style="font-weight: 800; font-size: 26px; line-height: 1.05; letter-spacing: -0.03em">Sin sustos</strong><span style="color: var(--muted); font-size: 16px">Lo irreversible siempre pasa por ti.</span>
              </div>
              <div class="cards-in lift" style="flex: 2 1 460px; min-width: 0; padding: 32px; border-radius: 28px; background: var(--panel); border: 2px solid var(--accent); display: flex; flex-wrap: wrap; gap: 24px; align-items: center">
                <div style="flex: 1 1 240px; min-width: 0; display: flex; flex-direction: column; gap: 10px"><span style={`${MONO}; font-size: 13px; color: var(--accent-text)`}>06</span><strong style="font-weight: 800; font-size: clamp(28px, 3vw, 40px); line-height: 1; letter-spacing: -0.035em">Creces sin contratar</strong><span style="color: var(--muted); font-size: 16px">Más volumen de trabajo, la misma persona al mando.</span></div>
                <svg aria-hidden="true" width="200" height="110" viewBox="0 0 200 110"><g fill="var(--accent)"><rect class="g-bar" x="10" y="70" width="26" height="30" rx="4" /><rect class="g-bar" style="animation-delay: .2s" x="46" y="52" width="26" height="48" rx="4" /><rect class="g-bar" style="animation-delay: .4s" x="82" y="34" width="26" height="66" rx="4" /><rect class="g-bar" style="animation-delay: .6s" x="118" y="12" width="26" height="88" rx="4" /></g><circle cx="176" cy="66" r="9" fill="var(--fg)" /><ellipse cx="176" cy="92" rx="14" ry="10" fill="var(--fg)" /></svg>
              </div>
            </div>

            <div class="rv" style="margin-top: 16px; padding: clamp(20px, 4vw, 48px); border-radius: 28px; border: 2px solid var(--accent); display: flex; flex-wrap: wrap; gap: 32px; align-items: center">
              <div style="flex: 1 1 340px; min-width: 0">
                <p style="margin: 0 0 8px; font-weight: 800; font-size: 26px; letter-spacing: -0.02em">Haz la cuenta {!tocado && <span class="hint tag" style="margin-left: 10px; vertical-align: middle">↔ mueve la barra</span>}</p>
                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 16px; color: var(--muted)">¿Cuántas horas a la semana dedicas a tareas repetitivas? <strong style="color: var(--fg); font-size: 20px">{horas} h/semana</strong>
                  <input type="range" class="rng" min="1" max="40" value={horas} onInput={(e) => { setHoras(Number(e.currentTarget.value)); setTocado(true); }} onPointerDown={() => setTocado(true)} />
                </label>
              </div>
              <div style="flex: 1 1 340px; min-width: 0">
                <p style="margin: 0; font-weight: 800; font-size: clamp(44px, 5.4vw, 80px); line-height: 0.95; letter-spacing: -0.05em; color: var(--accent-text)">{anuales} h al año</p>
                <p style="margin: 10px 0 0; color: var(--muted)">Son {Math.round(anuales / 8)} jornadas completas dedicadas a tareas repetitivas (46 semanas laborables). ¿Cuántas podría asumir un agente?</p>
              </div>
            </div>
          </div>
        </section>

        <section style="max-width: 1320px; margin: 0 auto; padding: 0 clamp(20px, 4vw, 48px) clamp(56px, 8vw, 96px)">
          <div class="rv" style="padding: clamp(32px, 6vw, 72px); border-radius: 32px; background: var(--fg); color: var(--bg); display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 28px">
            <h2 style="flex: 999 1 520px; min-width: 0; margin: 0; font-weight: 800; font-size: clamp(34px, 5vw, 76px); line-height: 0.98; letter-spacing: -0.05em">¿Qué haría un equipo de agentes en tu negocio?</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 12px">
              <a href={RUTAS_CASO.contacto} style="display: inline-flex; align-items: center; min-height: 56px; padding: 0 28px; border-radius: 999px; background: var(--accent); color: var(--on-accent); text-decoration: none; font-weight: 600">Cuéntame tu idea</a>
              <a href={RUTAS_CASO.siguiente} style="display: inline-flex; align-items: center; min-height: 56px; padding: 0 28px; border-radius: 999px; border: 1px solid var(--bg); text-decoration: none; font-weight: 600">Siguiente caso: Study Engine →</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
