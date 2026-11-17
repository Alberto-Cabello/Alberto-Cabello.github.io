import { Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { HeaderPortadaMovil } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { FormularioContacto } from '../../components/FormularioContacto';
import { VisorHabilidades } from '../../components/VisorHabilidades';
import { BotonesCV } from '../../components/BotonesCV';
import { reduceMotion, usePausa, useVisto } from '../../lib/inView';
import type { Modo } from '../../lib/audiencia';
import { LINKEDIN } from '../../config';
import { ANS_TEXT, BUSCO, COMO, FICHA_MOVIL, HABILIDADES, IDEAS, PASOS, PILDORA, PREGUNTA, PRUEBAS_MOVIL, PUERTAS, RUTAS, textos } from './datos';

const MONO = "font-family: 'IBM Plex Mono', ui-monospace, monospace";
const SCATTER = [{ x: 4, y: 6, rot: -12, delay: 0 }, { x: 46, y: 0, rot: 9, delay: 0.4 }, { x: 18, y: 40, rot: 18, delay: 0.8 }, { x: 56, y: 50, rot: -20, delay: 1.2 }, { x: 8, y: 72, rot: 6, delay: 1.6 }];
const CELLS = Array.from({ length: 24 }, (_, i) => (i * 0.09).toFixed(2));
const LESSONS = Array.from({ length: 44 }, (_, i) => (i * 0.05).toFixed(2));
const Q_WORDS = (() => {
  let k = 0;
  const ws = PREGUNTA.split(' ');
  return ws.map((w, wi) => ({ last: wi === ws.length - 1, chars: w.split('').map((ch) => ({ ch, d: (0.15 + k++ * 0.05).toFixed(2) })) }));
})();

const CASOS = [
  { k: '1', kicker: '01 — Agentes de IA', title: 'Red de agentes para un e-commerce', before: 'Una tarde entera para validar un solo producto.', after: 'Un equipo de agentes que trabaja mientras duermo.', big: '2–3 productos validados al día', href: RUTAS.agentes, bg: 'var(--card1)', vis: 'A' },
  { k: '2', kicker: '02 — Apps de formación', title: 'Study Engine', before: 'Formaciones que nadie termina y contenido que envejece.', after: 'Una app de estudio con contenido creado y revisado por agentes.', big: '44 lecciones escritas y revisadas en un día', href: RUTAS.study, bg: 'var(--card2)', vis: 'B' },
  { k: '3', kicker: '03 — Datos en banca', title: 'Automatización ETL y asistente IA', before: 'Configuración a mano, repetitiva y con errores.', after: 'Generación masiva y un asistente experto de la plataforma.', big: '90 % de eficiencia estimada', href: RUTAS.banca, bg: 'var(--card3)', vis: 'C' },
];

function TarjetaCaso({ c }: { c: (typeof CASOS)[number] }) {
  const ref = useRef<HTMLElement>(null);
  const go = useVisto(ref, '0px 0px -30% 0px');
  return (
    <article ref={ref} class={go ? 'card go' : 'card'} style={`padding: 22px 18px; border-radius: 24px; background: ${c.bg}; border: 1px solid var(--line); display: flex; flex-direction: column; gap: 12px`}>
      <p style={`margin: 0; ${MONO}; font-size: 12px; color: var(--accent-text)`}>{c.kicker}</p>
      <h3 style="margin: 0; font-weight: 800; font-size: 30px; line-height: 1; letter-spacing: -0.04em">{c.title}</h3>
      <p style="margin: 0; display: flex; flex-direction: column; gap: 2px; font-size: 15px"><span style={`${MONO}; font-size: 11px; color: var(--muted)`}>antes</span><span><span class="strike" style="color: var(--muted); -webkit-box-decoration-break: clone; box-decoration-break: clone">{c.before}</span></span></p>
      <p class="now" style="margin: 0; display: flex; flex-direction: column; gap: 2px; font-size: 15px"><span style={`${MONO}; font-size: 11px; color: var(--accent-text)`}>ahora</span><span>{c.after}</span></p>
      <p class="big" style="margin: 0; font-weight: 800; font-size: 34px; line-height: 0.98; letter-spacing: -0.045em; color: var(--accent-text)">{c.big}</p>
      {c.vis === 'A' && (
        <svg aria-hidden="true" viewBox="0 0 340 110" style="width: 100%; height: 110px"><g stroke="var(--line)" stroke-width="1.2"><path d="M170 55 L40 25" /><path d="M170 55 L80 92" /><path d="M170 55 L130 15" /><path d="M170 55 L210 15" /><path d="M170 55 L260 92" /><path d="M170 55 L300 25" /><path d="M170 55 L170 100" /></g><g fill="var(--panel)" stroke="var(--muted)" stroke-width="1.2"><circle class="nd" cx="40" cy="25" r="9" /><circle class="nd" cx="80" cy="92" r="9" style="animation-delay: .4s" /><circle class="nd" cx="130" cy="15" r="9" style="animation-delay: .8s" /><circle class="nd" cx="210" cy="15" r="9" style="animation-delay: 1.2s" /><circle class="nd" cx="260" cy="92" r="9" style="animation-delay: 1.6s" /><circle class="nd" cx="300" cy="25" r="9" style="animation-delay: 2s" /><circle class="nd" cx="170" cy="100" r="9" style="animation-delay: 2.4s" /></g><circle cx="170" cy="55" r="20" fill="var(--accent)" /><text x="170" y="59" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" font-weight="800" fill="var(--on-accent)">Tú</text></svg>
      )}
      {c.vis === 'B' && (
        <div aria-hidden="true" style="display: flex; align-items: center; gap: 14px; height: 96px">
          <div style="flex: 0 0 52px; height: 92px; border-radius: 12px; border: 2px solid var(--muted); box-sizing: border-box; padding: 8px 6px; display: flex; flex-direction: column; gap: 5px"><span style="height: 12px; border-radius: 4px; background: var(--accent)" /><span style="height: 7px; border-radius: 3px; background: var(--line)" /><span style="height: 7px; border-radius: 3px; background: var(--line)" /><span style="height: 7px; width: 70%; border-radius: 3px; background: var(--line)" /></div>
          <div style="flex: 1; display: grid; grid-template-columns: repeat(11, minmax(0, 1fr)); gap: 3px">{LESSONS.map((d, k) => <div key={k} class="cell" style={`aspect-ratio: 1; border-radius: 2px; background: var(--accent); animation-delay: ${d}s`} />)}</div>
        </div>
      )}
      {c.vis === 'C' && (
        <div aria-hidden="true" style="display: flex; align-items: center; gap: 10px; height: 96px">
          <div style="flex: 1; position: relative; height: 90px">{SCATTER.map((s, k) => <div key={k} class="jit jit-m" style={`position: absolute; left: ${s.x}%; top: ${s.y}%; width: 28px; height: 18px; border-radius: 4px; border: 1.5px solid var(--muted); --rot: ${s.rot}deg; animation-delay: ${s.delay}s`} />)}</div>
          <span style="color: var(--accent-text); font-weight: 800">→</span>
          <div style="flex: 1; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 4px">{CELLS.map((d, k) => <div key={k} class="cell" style={`aspect-ratio: 1; border-radius: 3px; background: var(--accent); animation-delay: ${d}s`} />)}</div>
        </div>
      )}
      <a href={c.href} style="align-self: flex-start; display: inline-flex; align-items: center; min-height: 44px; font-weight: 600; text-underline-offset: 6px">Ver el caso y la demo →</a>
    </article>
  );
}

export function Mobile({ modo, setModo }: { modo: Modo; setModo: (m: Modo) => void }) {
  const elegido = modo !== 'none';
  const empresa = modo === 'empresa';
  const tx = textos(empresa);
  const [atenuar, setAtenuar] = useState(false);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach((id) => clearTimeout(id)), []);

  const rHero = useRef<HTMLElement>(null);
  const rCinta = useRef<HTMLDivElement>(null);
  const rCasos = useRef<HTMLElement>(null);
  const rMetodo = useRef<HTMLElement>(null);
  const rQ = useRef<HTMLDivElement>(null);
  const pzHero = usePausa(rHero);
  const pzCinta = usePausa(rCinta);
  const pzCasos = usePausa(rCasos);
  const pzMetodo = usePausa(rMetodo);
  const verQ = useVisto(rQ, '0px 0px -15% 0px', !elegido);

  /** Cambio de recorrido en móvil: solo opacidad (0,5 → 1 en 380 ms), sin filtros. */
  const enfocar = (m: Modo) => {
    const aplicar = () => {
      setModo(m);
      setTimeout(() => document.getElementById('puertas')?.scrollIntoView({ block: 'start' }), 60);
    };
    if (reduceMotion()) { aplicar(); return; }
    timers.current.forEach((id) => clearTimeout(id));
    setAtenuar(true);
    timers.current = [window.setTimeout(() => { aplicar(); timers.current.push(window.setTimeout(() => setAtenuar(false), 80)); }, 380)];
  };
  const otro: Modo = empresa ? 'cliente' : 'empresa';

  return (
    <div id="top" class="portada movil-raiz">
      <HeaderPortadaMovil
        pildora={{
          quien: PILDORA.quienMovil(modo), accion: '', aria: PILDORA.ariaMovil(modo),
          onClick: () => {
            if (!elegido) { document.getElementById('puertas')?.scrollIntoView({ block: 'start', behavior: reduceMotion() ? 'auto' : 'smooth' }); return; }
            enfocar(otro);
          },
        }}
        ctaCorto={tx.ctaCorto}
      />

      <div class="pagex" style={{ opacity: atenuar ? 0.5 : 1 }}>
        <main>
          <section ref={rHero} class={pzHero} style="padding: 36px 16px 28px; display: flex; flex-direction: column; gap: 20px">
            <p class="fade" style={`margin: 0; ${MONO}; font-size: 12px; color: var(--muted)`}>AI Engineer · Málaga</p>
            <h1 style="margin: 0; font-weight: 800; font-size: 50px; line-height: 0.96; letter-spacing: -0.05em">
              <span class="ln"><span class="w soft">Las</span> <span class="w soft" style="animation-delay: .08s, 1.2s">ideas</span></span>
              <span class="ln"><span class="w soft" style="animation-delay: .16s, 1.3s">llegan</span> <span class="w soft" style="animation-delay: .24s, 1.4s">borrosas.</span></span>
              <span class="ln"><span class="w" style="animation-delay: .5s">Yo</span> <span class="w" style="animation-delay: .58s">las</span> <span class="w" style="animation-delay: .66s"><span class="sharp">enfoco.<span class="bar" aria-hidden="true" /></span></span></span>
            </h1>
            <p class="fade" style="margin: 0; font-size: 18px; color: var(--muted)">Y las convierto en agentes de IA, automatizaciones, webs y software que funcionan.</p>
            <div class="fade" style="display: flex; flex-direction: column; gap: 10px">
              <a href="#contacto" style="display: flex; align-items: center; justify-content: center; min-height: 54px; border-radius: 999px; background: var(--accent); color: var(--on-accent); text-decoration: none; font-weight: 600">{tx.ctaCorto}</a>
              <a href={tx.ctaSecHref} style="display: flex; align-items: center; justify-content: center; min-height: 54px; border-radius: 999px; border: 1px solid var(--fg); text-decoration: none; font-weight: 600">{tx.ctaSec}</a>
            </div>
            <figure role="img" aria-label="Visor que enfoca ideas vagas y las convierte en soluciones" style="margin: 4px 0 0; position: relative; height: 210px; border-radius: 22px; background: var(--card1); border: 1px solid var(--line); overflow: hidden">
              <div aria-hidden="true" style="position: absolute; inset: 0; background-image: linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px); background-size: 28px 28px" />
              <div class="brk" aria-hidden="true" style="position: absolute; inset: 16% 8%">
                <span style="position: absolute; left: 0; top: 0; width: 22px; height: 22px; border-left: 3px solid var(--accent); border-top: 3px solid var(--accent)" />
                <span style="position: absolute; right: 0; top: 0; width: 22px; height: 22px; border-right: 3px solid var(--accent); border-top: 3px solid var(--accent)" />
                <span style="position: absolute; left: 0; bottom: 0; width: 22px; height: 22px; border-left: 3px solid var(--accent); border-bottom: 3px solid var(--accent)" />
                <span style="position: absolute; right: 0; bottom: 0; width: 22px; height: 22px; border-right: 3px solid var(--accent); border-bottom: 3px solid var(--accent)" />
              </div>
              <span aria-hidden="true" style={`position: absolute; left: 14px; top: 10px; ${MONO}; font-size: 11px; color: var(--muted)`}>idea → solución</span>
              {IDEAS.map((i) => (
                <div key={i.tag} class={i.cls} aria-hidden="true" style="position: absolute; inset: 22% 12%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center">
                  <p class="vg" style={`position: absolute; margin: 0; font-weight: 600; font-size: 20px; line-height: 1.15; color: var(--muted); animation-delay: ${i.delay}s`}>«{i.vague}»</p>
                  <div class="sl" style={`position: absolute; display: flex; flex-direction: column; align-items: center; gap: 8px; animation-delay: ${i.delay}s`}>
                    <span class="tag" style="color: var(--accent-text)">{i.tag}</span>
                    <span style="font-weight: 800; font-size: 24px; line-height: 1.05; letter-spacing: -0.035em">{i.sol}</span>
                  </div>
                </div>
              ))}
            </figure>
          </section>

          <section id="puertas" aria-label="¿Por qué estás aquí?" style="padding: 8px 16px 40px">
            {!elegido && (
              <div ref={rQ} style="padding: 22px 16px; border-radius: 24px; background: var(--card1); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 14px">
                <span aria-hidden="true" style={`${MONO}; font-size: 11px; color: var(--muted)`}><span style="color: var(--accent-text)">●</span> la web se adapta a tu respuesta</span>
                <h2 class={verQ ? 'qh go' : 'qh'} style="margin: 0; font-weight: 800; font-size: 40px; line-height: 0.98; letter-spacing: -0.05em">
                  <span class="sr-only">{PREGUNTA}</span>
                  <span aria-hidden="true">{Q_WORDS.map((wd, wi) => (
                    <Fragment key={wi}><span style="display: inline-block; white-space: nowrap">{wd.chars.map((c, k) => <span key={k} class="ch" style={`animation-delay: ${c.d}s`}>{c.ch}</span>)}{wd.last && <span class="caret" />}</span> </Fragment>
                  ))}</span>
                </h2>
                <p style="margin: 0; color: var(--muted); font-size: 16px">Elige una puerta y la web se enfoca para ti.</p>
                {PUERTAS.map((d) => (
                  <button type="button" key={d.n} class="door-m" onClick={() => enfocar(d.modo)} aria-label={d.aria}>
                    <span class="bk tl" aria-hidden="true" /><span class="bk br" aria-hidden="true" />
                    <span aria-hidden="true" style={`${MONO}; font-size: 11px; color: var(--muted)`}>Puerta {d.n}</span>
                    <span style="font-weight: 800; font-size: 28px; line-height: 1.02; letter-spacing: -0.04em">{d.title}</span>
                    <span style="font-size: 16px; color: var(--muted)">{d.text}</span>
                    <span style="display: inline-flex; align-items: center; gap: 8px; font-weight: 700; color: var(--accent-text)">{d.go} →</span>
                  </button>
                ))}
              </div>
            )}
            {elegido && (
              <div id="respuesta" role="status" style="padding: 22px 18px; border-radius: 24px; border: 2px solid var(--accent); background: var(--card1); display: flex; flex-direction: column; gap: 12px">
                <p style={`margin: 0; ${MONO}; font-size: 12px; color: var(--muted)`}><span class="qstrike">¿Por qué estás aquí?</span></p>
                <h2 key={modo} style="margin: 0; font-weight: 800; font-size: 40px; line-height: 0.98; letter-spacing: -0.05em"><span class="aw">Porque</span> <span class="aw" style="animation-delay: .14s; color: var(--accent-text)">{tx.ansA}</span> <span class="aw" style="animation-delay: .28s; color: var(--accent-text)">{tx.ansB}</span></h2>
                <p key={modo + 'p'} class="aw" style="margin: 0; color: var(--muted); animation-delay: .5s">{empresa ? ANS_TEXT.movil.empresa : ANS_TEXT.movil.cliente}</p>
                <a href={tx.ansHref} style="display: flex; align-items: center; justify-content: center; min-height: 52px; border-radius: 999px; background: var(--accent); color: var(--on-accent); text-decoration: none; font-weight: 600">{tx.ansCta}</a>
                <button type="button" onClick={() => enfocar(otro)} style="min-height: 52px; border-radius: 999px; border: 1px solid var(--fg); background: transparent; color: var(--fg); font: inherit; font-weight: 600; cursor: pointer">Cambiar de enfoque</button>
              </div>
            )}
          </section>

          {empresa && (
            <section id="perfil" style="padding: 0 16px 44px; display: flex; flex-direction: column; gap: 28px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <p style={`margin: 0; ${MONO}; font-size: 12px; color: var(--accent-text)`}>Para empresas · lo que busco</p>
                <h2 style="margin: 0; font-weight: 800; font-size: 32px; line-height: 1.02; letter-spacing: -0.045em">Busco un equipo donde la IA no sea un experimento, <span style="color: var(--accent-text)">sino la forma de trabajar.</span></h2>
                <p style="margin: 0; color: var(--muted)">Ya construyo con IA cada día: dentro de mi equipo, en una de las mayores consultoras tecnológicas del mundo, y en proyectos propios que funcionan a diario.</p>
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <p style={`margin: 0; ${MONO}; font-size: 12px; color: var(--muted)`}>Lo que aporto · tres pruebas</p>
                {PRUEBAS_MOVIL.map((p) => (
                  <a key={p.link} href={p.href} style="text-decoration: none; padding: 18px; border-radius: 20px; border: 1px solid var(--line); display: flex; align-items: center; gap: 14px">
                    <span style="flex: 0 0 auto; font-weight: 800; font-size: 44px; line-height: 0.9; letter-spacing: -0.05em; color: var(--accent-text)">{p.num}<span style="font-size: 0.42em">{p.unit}</span></span>
                    <span style="display: flex; flex-direction: column; min-width: 0"><strong style="font-size: 16px; line-height: 1.2">{p.title}</strong><span style="font-size: 13px; color: var(--muted)">{p.link} →</span></span>
                  </a>
                ))}
              </div>
              <VisorHabilidades datos={HABILIDADES} movil />
              <div style="display: flex; flex-direction: column; gap: 4px">
                <p style={`margin: 0 0 4px; ${MONO}; font-size: 12px; color: var(--muted)`}>Lo que busco</p>
                <dl style="margin: 0; display: flex; flex-direction: column">{BUSCO.map((k) => <div key={k.k} style="display: flex; flex-direction: column; gap: 3px; padding: 10px 0; border-top: 1px solid var(--line)"><dt style={`${MONO}; font-size: 11px; color: var(--muted)`}>{k.k}</dt><dd style="margin: 0; font-weight: 600; font-size: 15px; line-height: 1.35">{k.v}</dd></div>)}</dl>
              </div>
              <div style="display: flex; flex-direction: column; gap: 4px">
                <p style={`margin: 0 0 4px; ${MONO}; font-size: 12px; color: var(--muted)`}>Cómo trabajo</p>
                <ol style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column">{COMO.map((h) => <li key={h.n} style="display: flex; gap: 12px; align-items: baseline; padding: 10px 0; border-top: 1px solid var(--line)"><span style={`${MONO}; font-size: 12px; color: var(--accent-text)`}>{h.n}</span><span style="font-weight: 600; font-size: 15px">{h.t}</span></li>)}</ol>
              </div>
              <p style={`margin: 0; ${MONO}; font-size: 12px; color: var(--muted)`}>Ficha rápida</p>
              <dl style="margin: 0; display: flex; flex-direction: column">
                {FICHA_MOVIL.map((pr) => (
                  <div key={pr.k} style="display: flex; flex-direction: column; gap: 3px; padding: 12px 0; border-top: 1px solid var(--line)">
                    <dt style={`${MONO}; font-size: 11px; color: var(--muted)`}>{pr.k}</dt>
                    <dd style="margin: 0; font-weight: 600; font-size: 15px; line-height: 1.35">{pr.v}</dd>
                  </div>
                ))}
              </dl>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <a href="#contacto" style="display: flex; align-items: center; justify-content: center; min-height: 52px; border-radius: 999px; background: var(--accent); color: var(--on-accent); text-decoration: none; font-weight: 600">Hablemos de un puesto</a>
                <a href={LINKEDIN} class="btn-m-borde">Ver LinkedIn</a>
                <BotonesCV movil />
              </div>
            </section>
          )}

          <div ref={rCinta} style="border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 16px 0; overflow: hidden">
            <p class="sr-only">Servicios: agentes de IA, automatizaciones, diseño y desarrollo web, software a medida y apps de formación.</p>
            <div class={`track track-m ${pzCinta}`} aria-hidden="true" style="font-weight: 800; font-size: 38px; letter-spacing: -0.04em; line-height: 1; white-space: nowrap">
              {[1, 2].map((m) => (
                <span key={m} style="display: flex; gap: 24px; padding-right: 24px; align-items: center"><span>Agentes de IA</span><span style="color: var(--accent)">/</span><span class="hueca hueca-m">Automatizaciones</span><span style="color: var(--accent)">/</span><span>Webs</span><span style="color: var(--accent)">/</span><span class="hueca hueca-m">Software a medida</span><span style="color: var(--accent)">/</span><span>Apps de formación</span><span style="color: var(--accent)">/</span></span>
              ))}
            </div>
          </div>

          <section id="casos" ref={rCasos} class={pzCasos} style="padding: 48px 16px 8px; display: flex; flex-direction: column; gap: 14px">
            <h2 style="margin: 0 0 10px; font-weight: 800; font-size: 36px; line-height: 1; letter-spacing: -0.045em">Tres ideas borrosas. <span style="color: var(--muted)">Tres sistemas que ya funcionan.</span></h2>
            {CASOS.map((c) => <TarjetaCaso key={c.k} c={c} />)}
          </section>

          <section id="metodo" ref={rMetodo} class={pzMetodo} style="padding: 48px 16px 8px">
            <h2 style="margin: 0 0 10px; font-weight: 800; font-size: 36px; line-height: 1; letter-spacing: -0.045em">Cómo trabajo</h2>
            <p style="margin: 0 0 26px; color: var(--muted)">Cada proyecto recorre el mismo camino. En el tercer paso se decide qué hace la IA y qué decides tú.</p>
            <ol style="list-style: none; margin: 0; padding: 0 0 0 40px; position: relative; display: flex; flex-direction: column; gap: 24px">
              <li aria-hidden="true" style="position: absolute; left: 11px; top: 8px; bottom: 8px; width: 2px; background: var(--line)"><span class="rail" style="position: absolute; left: -5px; width: 12px; height: 12px; border-radius: 99px; background: var(--accent)" /></li>
              {PASOS.map((s) => (
                <li key={s.n} style="position: relative; display: flex; flex-direction: column; gap: 4px">
                  <span class="litd" aria-hidden="true" style={`position: absolute; left: -39px; top: 2px; width: 22px; height: 22px; box-sizing: border-box; border-radius: 99px; border: 2px solid var(--accent); background: var(--bg); animation-delay: ${s.vdelay}s`} />
                  <span style={`${MONO}; font-size: 12px; color: var(--accent-text)`}>{s.n}</span>
                  <strong style="font-weight: 800; font-size: 22px; letter-spacing: -0.02em">{s.title}</strong>
                  <span style="color: var(--muted); font-size: 15px">{s.text}</span>
                  {s.split && <span style="display: flex; gap: 8px; margin-top: 4px"><span class="tag" style="color: var(--accent-text)">IA</span><span class="tag">Tú</span></span>}
                </li>
              ))}
            </ol>
          </section>

          <section style="padding: 44px 16px 0">
            <div style="padding: 20px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); display: flex; flex-direction: column; gap: 6px">
              <p style="margin: 0; font-weight: 800; font-size: 22px; letter-spacing: -0.03em">Esta web la he diseñado y construido yo, con IA como copiloto. <span style="color: var(--muted)">Imagina la tuya.</span></p>
              <a href="#contacto" style="align-self: flex-start; display: inline-flex; align-items: center; min-height: 44px; font-weight: 600; text-underline-offset: 6px">Diseño y desarrollo web →</a>
            </div>
          </section>

          <section id="contacto" style="padding: 52px 16px 32px; display: flex; flex-direction: column; gap: 22px">
            {!empresa ? (
              <>
                <h2 style="margin: 0; font-weight: 800; font-size: 44px; line-height: 0.95; letter-spacing: -0.05em">¿Tienes una <span style="color: var(--accent-text)">idea borrosa?</span></h2>
                <p style="margin: 0; color: var(--muted); font-size: 17px">Cuéntamela tal cual, aunque esté a medias. La enfocamos juntos.</p>
              </>
            ) : (
              <>
                <h2 style="margin: 0; font-weight: 800; font-size: 40px; line-height: 0.95; letter-spacing: -0.05em">¿Buscas a alguien así <span style="color: var(--accent-text)">en tu equipo?</span></h2>
                <p style="margin: 0; color: var(--muted); font-size: 17px">Cuéntame el puesto y el reto. Si encaja, hablamos esta semana.</p>
              </>
            )}
            <div id="contacto-form">
              <FormularioContacto empresa={empresa} movil />
            </div>
          </section>
        </main>

        <Footer movil />
      </div>
    </div>
  );
}
