import { useEffect, useRef } from 'preact/hooks';
import { HeaderCasoMovil } from '../../components/Header';
import { reduceMotion } from '../../lib/inView';
import { CIUDADES, MANUAL_OUT, PLAN, hm, reloj, useSimulador } from './simulador';
import { CANDS, CHECKS, QUOTE, RUTAS_DEMO, brief } from './Desktop';

const MONO = "font-family: 'IBM Plex Mono', ui-monospace, monospace";
const btn = 'display: flex; align-items: center; justify-content: center; border-radius: 999px; font: inherit; font-weight: 600; cursor: pointer; text-decoration: none';

export function Mobile() {
  const sim = useSimulador();
  const { s, cur, isRedo, energy, dec, prodName } = sim;
  const aprobarRef = useRef<HTMLButtonElement>(null);
  const asking = s.ph === 'ask';
  const sales = s.ph === 'sales';
  useEffect(() => {
    if (!asking) return;
    setTimeout(() => {
      const b = aprobarRef.current; if (!b) return;
      b.scrollIntoView({ block: 'center', behavior: reduceMotion() ? 'auto' : 'smooth' });
      b.focus({ preventScroll: true });
    }, 120);
  }, [asking, s.step, s.redo]);
  const run = s.started && !s.done;
  const step = s.step;
  const ventas = Array.from({ length: s.saleCount }, (_, i) => ({ city: CIUDADES[i % CIUDADES.length], n: 1041 + i }));

  return (
    <div class="demo movil-raiz">
      <HeaderCasoMovil volverHref={RUTAS_DEMO.caso} volverTexto="← Cerrar" titulo="A mano frente a agentes" />

      {!s.started && (
        <main class="in" style="flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 20px; padding: 40px 18px">
          <span class="tag" style="align-self: flex-start">Simulador · datos ficticios</span>
          <p style={`margin: 0; ${MONO}; font-size: 13px; color: var(--accent-text)`}>Lunes, 16:00 · 7 de los 9 agentes · 3 decisiones</p>
          <h1 style="margin: 0; font-weight: 800; font-size: 46px; line-height: 0.95; letter-spacing: -0.05em">Lanzar un producto. <span style="color: var(--muted)">Dos formas de hacerlo.</span></h1>
          <p style="margin: 0; font-size: 17px; color: var(--muted)">Se van dando el relevo: primero ves lo que te cuesta cada paso a mano y luego cómo lo hace el equipo de agentes. Fíjate en los relojes.</p>
          <button type="button" class="pulse" onClick={sim.empezar} style={`${btn}; min-height: 58px; border: 0; background: var(--accent); color: var(--on-accent); font-size: 18px`}>Empezar</button>
        </main>
      )}

      {run && (
        <>
          <div style="padding: 12px 14px 0; display: flex; flex-direction: column; gap: 10px">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px">
              <span style={`${MONO}; font-size: 12px; color: var(--muted)`}>Paso {Math.min(step + 1, 7)} de 7 · {cur.agent}</span>
              <button type="button" onClick={sim.saltar} style="min-height: 44px; padding: 0 14px; border-radius: 999px; border: 1px solid var(--line); background: transparent; color: var(--fg); font: inherit; font-size: 14px; font-weight: 600; cursor: pointer">Saltar al final</button>
            </div>
            <ol aria-label="Pasos" style="list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 4px">
              {PLAN.map((p, i) => {
                const hecho = i < step || sales; const enCurso = i === step && !sales;
                return <li key={p.agent} aria-current={enCurso ? 'step' : undefined} style={`height: 5px; border-radius: 99px; background: ${hecho ? 'var(--accent)' : enCurso ? 'var(--warn)' : 'var(--line)'}`}><span class="sr-only">{p.agent}: {hecho ? 'hecho' : enCurso ? 'en curso' : 'pendiente'}</span></li>;
              })}
            </ol>
          </div>
          <main style="flex: 1; display: flex; flex-direction: column; gap: 12px; padding: 12px 14px 24px">
            <section aria-label="A mano" class="panel" style={`position: relative; padding: 14px; border-radius: 20px; background: var(--manual-bg); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 10px; opacity: ${s.ph === 'agents' || asking || sales ? 0.72 : 1}`}>
              <div style="display: flex; align-items: flex-end; justify-content: space-between; gap: 10px">
                <div style="display: flex; flex-direction: column"><span style={`${MONO}; font-size: 11px; color: var(--muted)`}>A MANO · tardes de 16 a 20 h</span><span style="font-weight: 800; font-size: 30px; line-height: 1.05; letter-spacing: -0.04em; color: var(--muted)">{reloj(s.manualMin)}</span></div>
                <span style="font-size: 12.5px; color: var(--muted); text-align: right">{hm(s.manualMin)}<br />acumuladas</span>
              </div>
              <span style="font-size: 14px; font-weight: 600">{cur.manual} <span style="font-weight: 500; color: var(--muted)">· ≈ {hm(cur.min)} a mano</span></span>
              <div style="display: flex; flex-direction: column; gap: 4px">
                <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600"><span>Tu energía</span><span>{energy} %</span></div>
                <div style="height: 10px; border-radius: 99px; background: var(--bg)"><div style={`width: ${energy}%; height: 10px; border-radius: 99px; background: ${energy > 50 ? 'var(--warn)' : 'var(--danger)'}; transition: width .8s ease`} /></div>
                <span style="font-size: 13px; color: var(--muted)">{sim.mood}</span>
              </div>
              {sales && <div class="in" style="position: absolute; inset: 0; border-radius: 20px; background: var(--overlay); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 16px; text-align: center"><p style="margin: 0; font-weight: 800; font-size: 24px; letter-spacing: -0.03em">Sin energía.</p><p style="margin: 0; color: var(--muted); font-size: 14px">{reloj(s.manualMin)} y la campaña aún no ha salido.</p></div>}
            </section>

            <section aria-label="Con agentes" class="panel" style={`position: relative; flex: 1; padding: 14px; border-radius: 20px; border: 2px solid var(--accent); display: flex; flex-direction: column; gap: 12px; opacity: ${s.ph === 'manual' ? 0.72 : 1}`}>
              <div style="display: flex; align-items: flex-end; justify-content: space-between; gap: 10px">
                <div style="display: flex; flex-direction: column"><span style={`${MONO}; font-size: 11px; color: var(--accent-text)`}>CON AGENTES · tú decides</span><span style="font-weight: 800; font-size: 30px; line-height: 1.05; letter-spacing: -0.04em; color: var(--accent-text)">{reloj(s.agentMin)}</span></div>
                {s.ph === 'manual' && <span style={`${MONO}; font-size: 11px; color: var(--muted)`}>esperando turno…</span>}
              </div>
              {!sales && (
                <div style="display: flex; flex-direction: column; gap: 12px; flex: 1">
                  <p style="margin: 0; display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 8px; font-weight: 800; font-size: 21px; letter-spacing: -0.03em"><span class="pulse" aria-hidden="true" style="width: 9px; height: 9px; border-radius: 99px; background: var(--accent); align-self: center" />{cur.agent} <span style="font-weight: 500; font-size: 15px; color: var(--muted); letter-spacing: 0">{isRedo ? cur.redo : cur.doing}</span></p>
                  <div style="display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 16px; background: var(--accent); color: var(--on-accent)">
                    <span style="flex: 0 0 42px; width: 42px; height: 42px; border-radius: 12px; background: rgba(0,0,0,0.16); display: flex; align-items: center; justify-content: center"><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--on-accent)" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d={cur.icon} /></svg></span>
                    <span style="min-width: 0"><span style={`display: block; ${MONO}; font-size: 10.5px; letter-spacing: 0.06em`}>MIENTRAS TANTO, TÚ</span><strong style="display: block; font-size: 18px; line-height: 1.15; letter-spacing: -0.02em">{cur.life}</strong></span>
                  </div>
                  {isRedo && <p style="margin: 0; padding: 8px 12px; border-radius: 10px; border: 1px dashed var(--warn); font-size: 13.5px; font-weight: 600">Rechazado por ti: {cur.redo}.</p>}
                  <div aria-live="polite">
                    {asking && dec && (
                      <div class="in" role="group" aria-label="Decisión pendiente" style="padding: 16px; border-radius: 18px; background: var(--panel); border: 2px solid var(--warn); display: flex; flex-direction: column; gap: 10px">
                        <p class="waitp" style={`margin: 0; ${MONO}; font-size: 12px; color: var(--warn)`}>{cur.agent} espera tu OK</p>
                        <h2 style="margin: 0; font-weight: 800; font-size: 24px; line-height: 1.05; letter-spacing: -0.035em">{dec.title}</h2>
                        <p style="margin: 0; color: var(--muted); font-size: 15px">{dec.text}</p>
                        <p style="margin: 0; padding: 8px 12px; border-radius: 10px; background: var(--bg); font-size: 13px">A mano vas por <strong>{reloj(s.manualMin)}</strong> con un <strong>{energy} %</strong> de energía.</p>
                        <div style="display: flex; gap: 8px">
                          <button type="button" ref={aprobarRef} onClick={sim.aprobar} style={`${btn}; flex: 1; min-height: 50px; border: 0; background: var(--accent); color: var(--on-accent)`}>Aprobar</button>
                          <button type="button" onClick={sim.rechazar} style={`${btn}; flex: 1; min-height: 50px; border: 1px solid var(--fg); background: transparent; color: var(--fg)`}>Rechazar</button>
                        </div>
                      </div>
                    )}
                  </div>
                  {!asking && (
                    <div style="padding: 14px; border-radius: 16px; background: var(--panel); min-height: 170px; box-sizing: border-box">
                      <SalidaMovil step={step} prodName={prodName} alt={s.alt1} />
                    </div>
                  )}
                </div>
              )}
              {sales && (
                <div class="in" style="display: flex; flex-direction: column; gap: 10px">
                  <p style={`margin: 0; ${MONO}; font-size: 12px; color: var(--accent-text)`}>campaña lanzada · ventas simuladas</p>
                  <div><p style="margin: 0; font-weight: 800; font-size: 52px; line-height: 0.95; letter-spacing: -0.05em; color: var(--accent-text)">{(s.saleCount * 34.9).toFixed(2).replace('.', ',')} €</p><p style="margin: 4px 0 0; color: var(--muted); font-size: 14px">simulación · {s.saleCount} pedidos desde el lanzamiento</p></div>
                  <ul aria-live="off" style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px">
                    {ventas.map((v) => <li key={v.n} class="in" style="min-height: 36px; display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 0 12px; border-radius: 10px; background: var(--panel); font-size: 13.5px"><span>Pedido #{v.n} · {v.city}</span><strong style="color: var(--accent-text)">+34,90 €</strong></li>)}
                  </ul>
                  <div style="display: flex; align-items: center; gap: 10px; padding: 12px 14px; border-radius: 14px; background: var(--accent-soft)"><span><span style={`${MONO}; font-size: 11px; color: var(--accent-text)`}>mientras tanto, tú</span><strong style="display: block; font-size: 16px">celebrándolo con los tuyos</strong></span></div>
                </div>
              )}
            </section>
          </main>
        </>
      )}

      {s.done && (
        <main class="in" style="flex: 1; display: flex; flex-direction: column; gap: 16px; padding: 28px 14px 32px">
          <h1 style="margin: 0; font-weight: 800; font-size: 40px; line-height: 0.96; letter-spacing: -0.05em">Más productos probados, menos horas <span style="color: var(--accent-text)">y más ganas.</span></h1>
          <section aria-label="Resultado con agentes" style="padding: 18px 16px; border-radius: 20px; border: 2px solid var(--accent); display: flex; flex-direction: column; gap: 10px">
            <p style={`margin: 0; ${MONO}; font-size: 12px; color: var(--accent-text)`}>CON AGENTES</p>
            <p style="margin: 0; font-weight: 800; font-size: 36px; line-height: 0.95; letter-spacing: -0.05em; color: var(--accent-text)">{reloj(s.agentMin)}</p>
            <p style="margin: 0; color: var(--muted); font-size: 14px">{hm(s.agentMin)} de agentes · {s.decSec} s de tus decisiones · {s.saleCount} ventas simuladas</p>
            <ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px">
              {sim.agentOut.map((o) => <li key={o.title} style="display: flex; gap: 10px; align-items: baseline; padding-top: 8px; border-top: 1px solid var(--line)"><span aria-hidden="true" style="font-weight: 800; color: var(--accent-text)">+</span><span><strong style="display: block; font-size: 15px">{o.title}</strong><span style="color: var(--muted); font-size: 14px">{o.text}</span></span></li>)}
            </ul>
          </section>
          <section aria-label="Resultado a mano" style="padding: 18px 16px; border-radius: 20px; background: var(--manual-bg); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 10px">
            <p style={`margin: 0; ${MONO}; font-size: 12px; color: var(--muted)`}>A MANO</p>
            <p style="margin: 0; font-weight: 800; font-size: 36px; line-height: 0.95; letter-spacing: -0.05em; color: var(--muted)">Jueves 17:20</p>
            <p style="margin: 0; color: var(--muted); font-size: 14px">13 h 20 min de trabajo · energía 0 % · 0 ventas</p>
            <ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px">
              {MANUAL_OUT.map((o) => <li key={o.title} style="display: flex; gap: 10px; align-items: baseline; padding-top: 8px; border-top: 1px solid var(--line)"><span aria-hidden="true" style="font-weight: 800; color: var(--warn)">−</span><span><strong style="display: block; font-size: 15px">{o.title}</strong><span style="color: var(--muted); font-size: 14px">{o.text}</span></span></li>)}
            </ul>
          </section>
          <a href={RUTAS_DEMO.contacto} style={`${btn}; min-height: 54px; background: var(--accent); color: var(--on-accent)`}>Quiero esto en mi negocio</a>
          <button type="button" onClick={sim.empezar} style={`${btn}; min-height: 54px; border: 1px solid var(--fg); background: transparent; color: var(--fg)`}>Repetir</button>
          <a href={RUTAS_DEMO.caso} style={`${btn}; min-height: 48px`}>Volver al caso</a>
        </main>
      )}
    </div>
  );
}

function SalidaMovil({ step, prodName, alt }: { step: number; prodName: string; alt: boolean }) {
  if (step === 0) return (
    <div class="st" style="display: flex; flex-direction: column; gap: 8px">
      <span style={`${MONO}; font-size: 11px; color: var(--muted)`}>1.240 anuncios analizados · 3 candidatos</span>
      {CANDS.map((c) => <div key={c.name} class="st" style={`display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; background: var(--inner); animation-delay: ${c.d}s`}><span style="font-weight: 600; font-size: 14px">{c.name}</span><span style={`${MONO}; font-size: 12px; color: var(--accent-text)`}>{c.score}</span></div>)}
    </div>
  );
  if (step === 1) return (
    <div class="st" style="display: flex; flex-direction: column; gap: 6px">
      <strong style="font-size: 17px; letter-spacing: -0.02em">{prodName}</strong>
      {CHECKS.map((k) => <span key={k.label} class="st" style={`display: flex; align-items: center; gap: 8px; font-size: 14px; animation-delay: ${k.d}s`}><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="var(--accent)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" /></svg>{k.label}</span>)}
    </div>
  );
  if (step === 2) return (
    <div class="st" style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px">
      {QUOTE.map((q) => <div key={q.k} class="st" style={`padding: 10px 12px; border-radius: 10px; background: var(--inner); display: flex; flex-direction: column; animation-delay: ${q.d}s`}><span style="font-size: 12px; color: var(--muted)">{q.k}</span><strong style="font-size: 20px; letter-spacing: -0.02em">{q.v}</strong></div>)}
    </div>
  );
  if (step === 3) return (
    <div class="st" style="display: flex; gap: 12px">
      <div aria-hidden="true" style="flex: 0 0 90px; height: 110px; border-radius: 12px; background: var(--inner)" />
      <div style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px">
        <span style={`${MONO}; font-size: 11px; color: var(--muted)`}>vista previa · borrador</span>
        <strong style="font-size: 16px; line-height: 1.2">{prodName}</strong>
        <span style="font-size: 22px; font-weight: 800; color: var(--accent-text)">34,90 €</span>
        <span aria-hidden="true" style="height: 8px; border-radius: 6px; background: var(--inner)" /><span aria-hidden="true" style="height: 8px; width: 80%; border-radius: 6px; background: var(--inner)" />
      </div>
    </div>
  );
  if (step === 4) return (
    <div class="st" style="display: flex; flex-direction: column; gap: 8px">
      {brief(alt).map((b) => <div key={b.k} class="st" style={`display: flex; flex-direction: column; padding: 10px 12px; border-radius: 10px; background: var(--inner); animation-delay: ${b.d}s`}><span style="font-size: 12px; color: var(--muted)">{b.k}</span><strong style="font-size: 14.5px">{b.v}</strong></div>)}
    </div>
  );
  if (step === 5) return (
    <div class="st" style="display: flex; flex-direction: column; gap: 8px">
      <span style={`${MONO}; font-size: 11px; color: var(--muted)`}>5 creativos · imagen y vídeo</span>
      <div aria-hidden="true" style="display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 6px">{[0, 1, 2, 3, 4].map((i) => <div key={i} class="st" style={`aspect-ratio: 9 / 16; border-radius: 9px; background: ${i % 2 ? 'var(--inner)' : 'var(--bg)'}; border: 1px solid var(--line); animation-delay: ${i * 0.3}s`} />)}</div>
    </div>
  );
  return (
    <div class="st" style="display: flex; flex-direction: column; gap: 10px">
      <div style="display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 6px">
        {[0, 1, 2, 3, 4].map((i) => <div key={i} class="st" style={`aspect-ratio: 9 / 16; border-radius: 9px; background: var(--inner); border: 2px solid ${i === 2 ? 'var(--warn)' : 'var(--accent)'}; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 6px; box-sizing: border-box; ${MONO}; font-size: 9px; color: ${i === 2 ? 'var(--warn)' : 'var(--accent-text)'}; animation-delay: ${i * 0.25}s`}>{i === 2 ? 'rehacer' : 'ok'}</div>)}
      </div>
      <span style="font-weight: 600; font-size: 14px">4 de 5 creativos pasan la rúbrica. Copys y campaña listos.</span>
    </div>
  );
}
