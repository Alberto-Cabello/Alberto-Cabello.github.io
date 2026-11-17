import { useEffect, useRef } from 'preact/hooks';
import { BotonModo } from '../../components/BotonModo';
import { CIUDADES, MANUAL_OUT, PLAN, hm, reloj, useSimulador } from './simulador';

const MONO = "font-family: 'IBM Plex Mono', ui-monospace, monospace";
export const RUTAS_DEMO = { caso: '/casos/red-de-agentes/', contacto: '/?para=clientes#contacto' };
const CANDS = [{ name: 'Lámpara de mesa recargable', score: 'encaja', d: 0 }, { name: 'Organizador de escritorio', score: 'alternativa', d: 0.4 }, { name: 'Botella térmica', score: 'saturado', d: 0.8 }];
const CHECKS = [{ label: 'Calidad comprobada', d: 0 }, { label: 'Demanda real', d: 0.4 }, { label: 'Competencia asumible', d: 0.8 }, { label: 'Margen suficiente', d: 1.2 }];
const QUOTE = [{ k: 'Precio', v: '8,40 €', d: 0 }, { k: 'Envío', v: '3,10 €', d: 0.3 }, { k: 'Plazo', v: '6–9 días', d: 0.6 }, { k: 'Margen', v: '41 %', d: 0.9 }];
export const brief = (alt: boolean) => [
  { k: 'Público', v: alt ? 'Teletrabajo y estudiantes, 22–40' : 'Hogar y teletrabajo, 28–45', d: 0 },
  { k: 'Ángulo', v: alt ? 'Escritorio ordenado en segundos' : 'Luz cálida, sin cables', d: 0.4 },
  { k: 'Plan', v: '5 creativos · imagen y vídeo', d: 0.8 },
];
export { CANDS, CHECKS, QUOTE };

export function Desktop() {
  const sim = useSimulador();
  const { s, cur, isRedo, energy, dec, prodName } = sim;
  const aprobarRef = useRef<HTMLButtonElement>(null);
  const asking = s.ph === 'ask';
  const sales = s.ph === 'sales';
  useEffect(() => { if (asking) setTimeout(() => aprobarRef.current?.focus(), 120); }, [asking, s.step, s.redo]);
  const run = s.started && !s.done;
  const step = s.step;
  const energyColor = energy > 50 ? 'var(--warn)' : 'var(--danger)';
  const flash = asking ? 'flash' : '';
  const ventas = Array.from({ length: s.saleCount }, (_, i) => ({ city: CIUDADES[i % CIUDADES.length], n: 1041 + i }));

  return (
    <div class="demo">
      <header class="demo-hdr">
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 12px">
          <strong style="font-weight: 800; letter-spacing: -0.02em">Simulador · A mano frente a con agentes</strong>
          <span class="tag">Datos ficticios</span>
        </div>
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 10px">
          {run && <button type="button" class="btn-linea" onClick={sim.saltar}>Saltar al final</button>}
          <BotonModo />
          <a href={RUTAS_DEMO.caso} class="btn-linea">Cerrar</a>
        </div>
      </header>

      {!s.started && (
        <main class="in" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 24px; padding: 48px 24px">
          <p style={`margin: 0; ${MONO}; font-size: 14px; color: var(--accent-text)`}>Lunes, 16:00 · 7 de los 9 agentes · 3 decisiones</p>
          <h1 style="margin: 0; max-width: 1000px; font-weight: 800; font-size: clamp(40px, 6vw, 96px); line-height: 0.95; letter-spacing: -0.05em">Lanzar un producto. <span style="color: var(--muted)">Dos formas de hacerlo.</span></h1>
          <p style="margin: 0; max-width: 640px; font-size: 19px; color: var(--muted)">Se van dando el relevo: primero ves lo que te cuesta cada paso a mano y luego cómo lo hace el equipo de agentes. Fíjate en los relojes.</p>
          <button type="button" class="btn pulse" onClick={sim.empezar} style="min-height: 60px; padding: 0 40px; border-radius: 999px; border: 0; background: var(--accent); color: var(--on-accent); font: inherit; font-size: 18px; font-weight: 600; cursor: pointer">Empezar</button>
        </main>
      )}

      {run && (
        <>
          <div style="padding: 14px clamp(16px, 3vw, 32px) 0">
            <ol aria-label="Pasos" style="list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 6px">
              {PLAN.map((p, i) => (
                <li key={p.agent} aria-current={i === step && !sales ? 'step' : undefined} style="display: flex; flex-direction: column; gap: 6px">
                  <span style={`height: 4px; border-radius: 99px; background: ${i < step || sales ? 'var(--accent)' : i === step ? 'var(--warn)' : 'var(--line)'}`} />
                  <span style={`font-size: 12px; font-weight: 600; color: ${i <= step ? 'var(--fg)' : 'var(--muted)'}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap`}>{p.agent}</span>
                </li>
              ))}
            </ol>
          </div>
          <main style="flex: 1; display: flex; flex-wrap: wrap; gap: 16px; padding: 16px clamp(16px, 3vw, 32px) 24px; align-items: stretch">
            <section aria-label="A mano" class={'panel' + (s.ph === 'agents' ? ' off' : '')} style="flex: 1 1 360px; min-width: 0; position: relative; padding: clamp(20px, 2.6vw, 32px); border-radius: 24px; background: var(--manual-bg); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 16px">
              <div style="display: flex; align-items: center; gap: 12px">
                <span style="width: 44px; height: 44px; border-radius: 12px; background: var(--bg); display: flex; align-items: center; justify-content: center"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg></span>
                <div><h2 style="margin: 0; font-weight: 800; font-size: 22px; letter-spacing: -0.02em; color: var(--muted)">A mano</h2><p style={`margin: 0; ${MONO}; font-size: 12px; color: var(--muted)`}>tú solo, cada paso</p></div>
              </div>
              <div class={flash} style="padding: 16px; border-radius: 16px; background: var(--bg); display: flex; flex-direction: column; gap: 2px">
                <span style={`${MONO}; font-size: 12px; color: var(--muted)`}>reloj · tardes de 16 a 20 h</span>
                <span style="font-weight: 800; font-size: clamp(40px, 4.4vw, 64px); line-height: 1; letter-spacing: -0.04em; color: var(--muted)">{reloj(s.manualMin)}</span>
                <span style="font-size: 14px; color: var(--muted)">{hm(s.manualMin)} de trabajo acumulado</span>
              </div>
              <div style="padding: 16px; border-radius: 16px; border: 1px dashed var(--line); display: flex; flex-direction: column; gap: 4px">
                <span style={`${MONO}; font-size: 12px; color: var(--muted)`}>ahora mismo</span>
                <span style="font-weight: 600">{cur.manual}</span>
                <span style="font-size: 14px; color: var(--muted)">≈ {hm(cur.min)} a mano</span>
              </div>
              <div class={flash} style="margin-top: auto; padding: 12px; border-radius: 14px; display: flex; flex-direction: column; gap: 8px">
                <div style="display: flex; justify-content: space-between; font-size: 14px; font-weight: 600"><span>Tu energía</span><span>{energy} %</span></div>
                <div style="height: 12px; border-radius: 99px; background: var(--bg)"><div style={`width: ${energy}%; height: 12px; border-radius: 99px; background: ${energyColor}; transition: width .8s ease`} /></div>
                <p style="margin: 0; font-size: 14px; color: var(--muted)">{sim.mood}</p>
              </div>
              {s.ph === 'agents' && <p class="esperando">turno de los agentes…</p>}
              {sales && (
                <div class="in" style="position: absolute; inset: 0; border-radius: 24px; background: var(--overlay); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 24px; text-align: center">
                  <p style="margin: 0; font-weight: 800; font-size: 32px; letter-spacing: -0.03em">Sin energía.</p>
                  <p style="margin: 0; color: var(--muted)">{reloj(s.manualMin)} y la campaña aún no ha salido.</p>
                </div>
              )}
            </section>

            <section aria-label="Con agentes" class={'panel' + (s.ph === 'manual' ? ' off' : '')} style="flex: 2 1 480px; min-width: 0; position: relative; padding: clamp(20px, 2.6vw, 32px); border-radius: 24px; border: 2px solid var(--accent); display: flex; flex-direction: column; gap: 16px">
              <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px">
                <div style="display: flex; align-items: center; gap: 12px">
                  <span style="width: 44px; height: 44px; border-radius: 12px; background: var(--accent); display: flex; align-items: center; justify-content: center"><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--on-accent)" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="5" r="2.5" /><circle cx="5" cy="18" r="2.5" /><circle cx="19" cy="18" r="2.5" /><path d="M12 7.5v4M12 11.5L6.5 16M12 11.5l5.5 4.5" /></svg></span>
                  <div><h2 style="margin: 0; font-weight: 800; font-size: 22px; letter-spacing: -0.02em; color: var(--accent-text)">Con agentes</h2><p style={`margin: 0; ${MONO}; font-size: 12px; color: var(--muted)`}>tu equipo trabaja; tú decides</p></div>
                </div>
                <div style="text-align: right"><span style={`display: block; ${MONO}; font-size: 12px; color: var(--muted)`}>reloj</span><span style="font-weight: 800; font-size: clamp(28px, 3vw, 44px); line-height: 1; letter-spacing: -0.03em; color: var(--accent-text)">{reloj(s.agentMin)}</span></div>
              </div>

              {!sales && (
                <div style="display: flex; flex-direction: column; gap: 14px; flex: 1">
                  <p style="margin: 0; display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: clamp(22px, 2.2vw, 30px); letter-spacing: -0.03em"><span class="pulse" aria-hidden="true" style="width: 10px; height: 10px; border-radius: 99px; background: var(--accent)" />{cur.agent} <span style="font-weight: 500; font-size: 17px; color: var(--muted); letter-spacing: 0">{isRedo ? cur.redo : cur.doing}</span></p>
                  {isRedo && <p style="margin: 0; padding: 8px 12px; border-radius: 10px; border: 1px dashed var(--warn); font-size: 15px; font-weight: 600">Rechazado por ti: {cur.redo}.</p>}
                  <div class="lifeb" style="display: flex; align-items: center; gap: 16px; padding: 16px 20px; border-radius: 18px; background: var(--accent); color: var(--on-accent)">
                    <span style="flex: 0 0 auto; width: 56px; height: 56px; border-radius: 16px; background: rgba(0,0,0,0.16); display: flex; align-items: center; justify-content: center"><svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--on-accent)" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d={cur.icon} /></svg></span>
                    <span style="min-width: 0"><span style={`display: flex; align-items: center; gap: 8px; ${MONO}; font-size: 12px; font-weight: 500; letter-spacing: 0.06em`}><span class="live" aria-hidden="true" style="width: 8px; height: 8px; border-radius: 99px; background: var(--on-accent)" />MIENTRAS TANTO, TÚ</span><strong style="display: block; font-size: clamp(20px, 2.2vw, 28px); line-height: 1.15; letter-spacing: -0.02em">{cur.life}</strong></span>
                  </div>
                  <div style="flex: 1; padding: 18px; border-radius: 18px; background: var(--panel); min-height: 220px">
                    <Salida step={step} prodName={prodName} alt={s.alt1} />
                  </div>
                </div>
              )}

              {sales && (
                <div class="in" style="flex: 1; display: flex; flex-direction: column; gap: 14px">
                  <p style={`margin: 0; display: flex; align-items: center; gap: 8px; ${MONO}; font-size: 13px; color: var(--accent-text)`}><span class="live" aria-hidden="true" style="width: 8px; height: 8px; border-radius: 99px; background: var(--accent)" />campaña lanzada · ventas simuladas</p>
                  <div><p style="margin: 0; font-weight: 800; font-size: clamp(52px, 6vw, 96px); line-height: 0.95; letter-spacing: -0.05em; color: var(--accent-text)">{(s.saleCount * 34.9).toFixed(2).replace('.', ',')} €</p><p style="margin: 6px 0 0; color: var(--muted)">simulación · {s.saleCount} pedidos desde el lanzamiento</p></div>
                  <div aria-live="polite" class="ventas">
                    <ul>
                      {ventas.map((v) => (
                        <li key={v.n} class="grow">
                          <span style="display: flex; align-items: center; gap: 8px"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2l2.5 11h11L21 7H6.2 M9 20a1 1 0 1 0 0-2a1 1 0 0 0 0 2z M18 20a1 1 0 1 0 0-2a1 1 0 0 0 0 2z" /></svg>Pedido #{v.n} · {v.city}</span><strong style="color: var(--accent-text)">+34,90 €</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style="margin-top: auto; display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-radius: 16px; background: var(--accent-soft)">
                    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" /></svg>
                    <span><span style={`${MONO}; font-size: 12px; color: var(--accent-text)`}>mientras tanto, tú</span><strong style="display: block; font-size: 17px">celebrándolo con los tuyos</strong></span>
                  </div>
                </div>
              )}

              {s.ph === 'manual' && <p class="esperando">esperando su turno…</p>}

              {asking && dec && (
                <div class="in" style="position: absolute; inset: 0; border-radius: 22px; background: var(--overlay); display: flex; align-items: center; justify-content: center; padding: 24px">
                  <div role="dialog" aria-modal="true" aria-labelledby="dec-h" style="max-width: 560px; padding: clamp(24px, 3vw, 40px); border-radius: 24px; background: var(--bg); border: 2px solid var(--warn); display: flex; flex-direction: column; gap: 14px">
                    <p class="waitp" style={`margin: 0; ${MONO}; font-size: 13px; color: var(--warn)`}>{cur.agent} espera tu OK</p>
                    <h3 id="dec-h" style="margin: 0; font-weight: 800; font-size: clamp(26px, 3vw, 40px); line-height: 1; letter-spacing: -0.04em">{dec.title}</h3>
                    <p style="margin: 0; color: var(--muted); font-size: 17px">{dec.text}</p>
                    <p style="margin: 0; padding: 10px 14px; border-radius: 12px; background: var(--panel); font-size: 14px">Antes de decidir, mira a la izquierda: a mano vas por <strong>{reloj(s.manualMin)}</strong> con un <strong>{energy} %</strong> de energía.</p>
                    <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 4px">
                      <button type="button" ref={aprobarRef} class="btn" onClick={sim.aprobar} style="min-height: 54px; padding: 0 30px; border-radius: 999px; border: 0; background: var(--accent); color: var(--on-accent); font: inherit; font-weight: 600; cursor: pointer">Aprobar</button>
                      <button type="button" class="btn" onClick={sim.rechazar} style="min-height: 54px; padding: 0 30px; border-radius: 999px; border: 1px solid var(--fg); background: transparent; color: var(--fg); font: inherit; font-weight: 600; cursor: pointer">Rechazar</button>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </main>
        </>
      )}

      {s.done && (
        <main class="in" style="flex: 1; display: flex; flex-direction: column; gap: 28px; padding: clamp(28px, 4vw, 56px) clamp(16px, 4vw, 56px)">
          <h1 style="margin: 0; max-width: 1100px; font-weight: 800; font-size: clamp(38px, 5.4vw, 88px); line-height: 0.95; letter-spacing: -0.05em">Más productos probados, menos horas <span style="color: var(--accent-text)">y más ganas.</span></h1>
          <div style="display: flex; flex-wrap: wrap; gap: 16px">
            <section aria-label="Resultado a mano" style="flex: 1 1 360px; min-width: 0; padding: clamp(24px, 3vw, 40px); border-radius: 24px; background: var(--manual-bg); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 16px">
              <p style={`margin: 0; ${MONO}; font-size: 13px; color: var(--muted)`}>A MANO</p>
              <p style="margin: 0; font-weight: 800; font-size: clamp(40px, 4.6vw, 72px); line-height: 0.95; letter-spacing: -0.05em; color: var(--muted)">Jueves 17:20</p>
              <p style="margin: 0; color: var(--muted)">13 h 20 min de trabajo · energía 0 % · 0 ventas</p>
              <ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px">
                {MANUAL_OUT.map((o) => <li key={o.title} style="display: flex; gap: 12px; align-items: baseline; padding-top: 12px; border-top: 1px solid var(--line)"><span aria-hidden="true" style="flex: 0 0 auto; font-weight: 800; color: var(--warn)">−</span><span><strong style="display: block">{o.title}</strong><span style="color: var(--muted); font-size: 15px">{o.text}</span></span></li>)}
              </ul>
            </section>
            <section aria-label="Resultado con agentes" style="flex: 1 1 360px; min-width: 0; padding: clamp(24px, 3vw, 40px); border-radius: 24px; border: 2px solid var(--accent); display: flex; flex-direction: column; gap: 16px">
              <p style={`margin: 0; ${MONO}; font-size: 13px; color: var(--accent-text)`}>CON AGENTES</p>
              <p style="margin: 0; font-weight: 800; font-size: clamp(40px, 4.6vw, 72px); line-height: 0.95; letter-spacing: -0.05em; color: var(--accent-text)">{reloj(s.agentMin)}</p>
              <p style="margin: 0; color: var(--muted)">{hm(s.agentMin)} de agentes · {s.decSec} s de tus decisiones · {s.saleCount} ventas simuladas</p>
              <ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px">
                {sim.agentOut.map((o) => <li key={o.title} style="display: flex; gap: 12px; align-items: baseline; padding-top: 12px; border-top: 1px solid var(--line)"><span aria-hidden="true" style="flex: 0 0 auto; font-weight: 800; color: var(--accent-text)">+</span><span><strong style="display: block">{o.title}</strong><span style="color: var(--muted); font-size: 15px">{o.text}</span></span></li>)}
              </ul>
            </section>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 12px">
            <a href={RUTAS_DEMO.contacto} class="btn" style="display: inline-flex; align-items: center; min-height: 56px; padding: 0 30px; border-radius: 999px; background: var(--accent); color: var(--on-accent); text-decoration: none; font-weight: 600">Quiero esto en mi negocio</a>
            <button type="button" class="btn" onClick={sim.empezar} style="min-height: 56px; padding: 0 30px; border-radius: 999px; border: 1px solid var(--fg); background: transparent; color: var(--fg); font: inherit; font-weight: 600; cursor: pointer">Repetir</button>
            <a href={RUTAS_DEMO.caso} class="btn" style="display: inline-flex; align-items: center; min-height: 56px; padding: 0 30px; text-decoration: none; font-weight: 600">Volver al caso</a>
          </div>
        </main>
      )}
    </div>
  );
}

/** Lo que produce cada agente en su turno (escritorio). */
function Salida({ step, prodName, alt }: { step: number; prodName: string; alt: boolean }) {
  if (step === 0) return (
    <div class="st" style="display: flex; flex-direction: column; gap: 10px">
      <span style={`${MONO}; font-size: 12px; color: var(--muted)`}>1.240 anuncios analizados · 3 candidatos</span>
      {CANDS.map((c) => <div key={c.name} class="st" style={`display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 12px; background: var(--inner); animation-delay: ${c.d}s`}><span style="font-weight: 600">{c.name}</span><span style={`${MONO}; font-size: 13px; color: var(--accent-text)`}>{c.score}</span></div>)}
    </div>
  );
  if (step === 1) return (
    <div class="st" style="display: flex; flex-wrap: wrap; gap: 20px; align-items: center">
      <div class="shim" style="flex: 0 0 110px; height: 110px; border-radius: 16px; background-color: var(--inner)" />
      <div style="flex: 1 1 220px; display: flex; flex-direction: column; gap: 8px">
        <strong style="font-size: 21px; letter-spacing: -0.02em">{prodName}</strong>
        {CHECKS.map((k) => <span key={k.label} class="st" style={`display: flex; align-items: center; gap: 8px; font-size: 15px; animation-delay: ${k.d}s`}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="var(--accent)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" /></svg>{k.label}</span>)}
      </div>
    </div>
  );
  if (step === 2) return (
    <div class="st" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px">
      {QUOTE.map((q) => <div key={q.k} class="st" style={`padding: 14px; border-radius: 12px; background: var(--inner); display: flex; flex-direction: column; gap: 2px; animation-delay: ${q.d}s`}><span style="font-size: 13px; color: var(--muted)">{q.k}</span><strong style="font-size: 24px; letter-spacing: -0.02em">{q.v}</strong></div>)}
    </div>
  );
  if (step === 3) return (
    <div class="st" style="display: flex; flex-wrap: wrap; gap: 20px">
      <div class="shim" style="flex: 0 0 140px; height: 160px; border-radius: 16px; background-color: var(--inner)" />
      <div style="flex: 1 1 220px; display: flex; flex-direction: column; gap: 10px">
        <span style={`${MONO}; font-size: 12px; color: var(--muted)`}>vista previa · borrador</span>
        <strong style="font-size: 21px; letter-spacing: -0.02em">{prodName}</strong>
        <span style="font-size: 26px; font-weight: 800; color: var(--accent-text)">34,90 €</span>
        <span class="shim" style="height: 10px; border-radius: 6px; background-color: var(--inner)" />
        <span class="shim" style="height: 10px; width: 80%; border-radius: 6px; background-color: var(--inner)" />
      </div>
    </div>
  );
  if (step === 4) return (
    <div class="st" style="display: flex; flex-direction: column; gap: 10px">
      {brief(alt).map((b) => <div key={b.k} class="st" style={`display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; padding: 14px; border-radius: 12px; background: var(--inner); animation-delay: ${b.d}s`}><span style="color: var(--muted)">{b.k}</span><strong>{b.v}</strong></div>)}
    </div>
  );
  if (step === 5) return (
    <div class="st" style="display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px">
      {[0, 1, 2, 3, 4].map((i) => <div key={i} class="st shim" style={`aspect-ratio: 9 / 16; border-radius: 12px; background-color: ${i % 2 ? 'var(--inner)' : 'var(--panel)'}; animation-delay: ${i * 0.3}s`} />)}
    </div>
  );
  return (
    <div class="st" style="display: flex; flex-direction: column; gap: 12px">
      <div style="display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px">
        {[0, 1, 2, 3, 4].map((i) => <div key={i} class="st" style={`aspect-ratio: 9 / 16; border-radius: 12px; background: var(--inner); border: 2px solid ${i === 2 ? 'var(--warn)' : 'var(--accent)'}; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 10px; ${MONO}; font-size: 11px; color: ${i === 2 ? 'var(--warn)' : 'var(--accent-text)'}; animation-delay: ${i * 0.25}s`}>{i === 2 ? 'rehacer' : 'aprobado'}</div>)}
      </div>
      <span style="font-weight: 600">4 de 5 creativos pasan la rúbrica. Copys y campaña listos.</span>
    </div>
  );
}
