import { useEffect, useRef } from 'preact/hooks';
import { HeaderPortada, type Destino } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { FormularioContacto } from '../../components/FormularioContacto';
import { VisorHabilidades } from '../../components/VisorHabilidades';
import { BotonesCV } from '../../components/BotonesCV';
import { useEnfoque, type ClaveEnfoque } from '../../components/EnfoqueTransicion';
import { reduceMotion, usePausa, useVisto } from '../../lib/inView';
import type { Modo } from '../../lib/audiencia';
import { LINKEDIN } from '../../config';
import {
  ANS_TEXT, BUSCO, COMO, FICHA, HABILIDADES, IDEAS, PASOS, PILDORA, PREGUNTA, PRUEBAS, PUERTAS, RUTAS, textos,
} from './datos';

const MONO = "font-family: 'IBM Plex Mono', ui-monospace, monospace";
const TICKS = Array.from({ length: 40 }, (_, i) => (i % 5 === 0 ? 14 : 7));
const SCATTER = [
  { x: 4, y: 6, rot: -12, delay: 0 }, { x: 46, y: 0, rot: 9, delay: 0.4 }, { x: 18, y: 34, rot: 18, delay: 0.8 },
  { x: 58, y: 38, rot: -20, delay: 1.2 }, { x: 2, y: 66, rot: 6, delay: 1.6 }, { x: 40, y: 72, rot: -8, delay: 2 }, { x: 64, y: 82, rot: 14, delay: 2.4 },
];
const CELLS = Array.from({ length: 36 }, (_, i) => (i * 0.07).toFixed(2));
const Q_CHARS = PREGUNTA.split('').map((ch, i) => ({ ch, d: (0.15 + i * 0.05).toFixed(2) }));

/** Cifra que cuenta de 0 a su valor al entrar el perfil en pantalla (escribe en el DOM, no en el estado). */
function Cifra({ num, empezar }: { num: number; empezar: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduceMotion()) { el.textContent = String(num); return; }
    if (!empezar) { el.textContent = '0'; return; }
    let k = 0;
    const id = setInterval(() => {
      k += 1;
      const v = Math.min(1, k / 32);
      el.textContent = String(Math.round(num * (1 - Math.pow(1 - v, 3))));
      if (v >= 1) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [empezar, num]);
  return <span ref={ref}>0</span>;
}

export function Desktop({ modo, setModo }: { modo: Modo; setModo: (m: Modo) => void }) {
  const elegido = modo !== 'none';
  const empresa = modo === 'empresa';
  const tx = textos(empresa);
  const { ir, capa, pagina } = useEnfoque();

  const rHero = useRef<HTMLElement>(null);
  const rCinta = useRef<HTMLDivElement>(null);
  const rCasos = useRef<HTMLElement>(null);
  const rMetodo = useRef<HTMLElement>(null);
  const rQ = useRef<HTMLHeadingElement>(null);
  const rPerfil = useRef<HTMLElement>(null);
  const rC1 = useRef<HTMLElement>(null);
  const rC2 = useRef<HTMLElement>(null);
  const rC3 = useRef<HTMLElement>(null);

  const pzHero = usePausa(rHero);
  const pzCinta = usePausa(rCinta);
  const pzCasos = usePausa(rCasos);
  const pzMetodo = usePausa(rMetodo);
  const banda = '-40% 0px -55% 0px';
  const c1 = useVisto(rC1, banda);
  const c2 = useVisto(rC2, banda);
  const c3 = useVisto(rC3, banda);
  const verQ = useVisto(rQ, '0px 0px -12% 0px', !elegido);
  const pfEmpieza = useVisto(rPerfil, '0px 0px -20% 0px', empresa);

  const mk = (clave: ClaveEnfoque) => (e: MouseEvent) => { e.preventDefault(); ir(clave, e.currentTarget as Element); };
  const elegir = (m: Modo, el: Element) =>
    ir('respuesta', el, { label: m === 'empresa' ? '● enfocado para empresas' : '● enfocado para clientes', apply: () => setModo(m) });
  const cambiar = (el: Element) => {
    const sig: Modo = empresa ? 'cliente' : 'empresa';
    ir('rack', el, { label: sig === 'empresa' ? '● enfocado para empresas' : '● enfocado para clientes', apply: () => setModo(sig) });
  };
  const irDesdeCabecera = (d: Destino, e: MouseEvent) => mk(d)(e);

  return (
    <div id="top" class="portada">
      <HeaderPortada
        pildora={{
          quien: PILDORA.quien(modo), accion: PILDORA.accion(modo), aria: PILDORA.aria(modo),
          onClick: (e) => (elegido ? cambiar(e.currentTarget as Element) : mk('puertas')(e)),
        }}
        ctaCorto={tx.ctaCorto}
        onIr={irDesdeCabecera}
      />

      <div id="page" style={pagina}>
        <main>
        <section ref={rHero} class={pzHero} style="max-width: 1320px; margin: 0 auto; padding: clamp(36px, 6vw, 80px) clamp(20px, 4vw, 48px) clamp(40px, 6vw, 72px); display: flex; flex-wrap: wrap; align-items: center; gap: 24px">
          <div style="flex: 999 1 620px; min-width: 0; position: relative; z-index: 1">
            <p class="fade" style={`margin: 0 0 26px; ${MONO}; font-size: 14px; color: var(--muted)`}>Alberto Cabello · AI Engineer · Málaga</p>
            <h1 style="margin: 0; font-weight: 800; font-size: clamp(48px, 6.6vw, 108px); line-height: 0.96; letter-spacing: -0.05em">
              <span class="ln"><span class="w soft">Las</span> <span class="w soft" style="animation-delay: .08s, 1.2s">ideas</span> <span class="w soft" style="animation-delay: .16s, 1.3s">llegan</span> <span class="w soft" style="animation-delay: .24s, 1.4s">borrosas.</span></span>
              <span class="ln"><span class="w" style="animation-delay: .5s">Yo</span> <span class="w" style="animation-delay: .58s">las</span> <span class="w" style="animation-delay: .66s"><span class="sharp">enfoco.<span class="bar" aria-hidden="true" /></span></span></span>
            </h1>
            <p class="fade" style="margin: 36px 0 0; max-width: 560px; font-size: 20px; color: var(--muted); text-wrap: pretty">Y las convierto en agentes de IA, automatizaciones, webs y software que funcionan.</p>
            <div class="fade" style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px">
              <a href="#contacto" onClick={mk('contacto')} style="display: inline-flex; align-items: center; min-height: 54px; padding: 0 28px; border-radius: 999px; background: var(--accent); color: var(--on-accent); text-decoration: none; font-weight: 600">{tx.ctaCorto}</a>
              <a href={tx.ctaSecHref} onClick={mk(empresa ? 'perfil' : 'casos')} class="sweep" style="display: inline-flex; align-items: center; min-height: 54px; padding: 0 28px; border-radius: 999px; border: 1px solid var(--fg); text-decoration: none; font-weight: 600">{tx.ctaSec}</a>
            </div>
          </div>
          <figure role="img" aria-label="Visor que enfoca ideas vagas y las convierte en soluciones: horas perdidas en Excel en automatización de informes; una web que traiga clientes en web a medida con captación; correos repetidos en un agente que responde; una formación que nadie termina en una app de estudio" class="visor" style="flex: 1 1 400px; min-width: 0; margin: 0; position: relative; border-radius: 28px; background: var(--card1); border: 1px solid var(--line); overflow: hidden">
            <div aria-hidden="true" style="position: absolute; inset: 0; background-image: linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px); background-size: 40px 40px" />
            <div class="brk" aria-hidden="true" style="position: absolute; inset: 14% 10%">
              <span style="position: absolute; left: 0; top: 0; width: 34px; height: 34px; border-left: 3px solid var(--accent); border-top: 3px solid var(--accent)" />
              <span style="position: absolute; right: 0; top: 0; width: 34px; height: 34px; border-right: 3px solid var(--accent); border-top: 3px solid var(--accent)" />
              <span style="position: absolute; left: 0; bottom: 0; width: 34px; height: 34px; border-left: 3px solid var(--accent); border-bottom: 3px solid var(--accent)" />
              <span style="position: absolute; right: 0; bottom: 0; width: 34px; height: 34px; border-right: 3px solid var(--accent); border-bottom: 3px solid var(--accent)" />
              <span class="cross" style="position: absolute; left: 50%; top: 50%; width: 14px; height: 14px; margin: -7px 0 0 -7px; border-radius: 99px; border: 2px solid var(--accent)" />
            </div>
            <div aria-hidden="true" style={`position: absolute; left: 0; right: 0; top: 18px; display: flex; justify-content: space-between; padding: 0 22px; ${MONO}; font-size: 12px; color: var(--muted)`}>
              <span style="position: relative"><span class="st1">● enfocando…</span><span class="st2" style="position: absolute; left: 0; top: 0; white-space: nowrap; color: var(--accent-text)">● enfocado</span></span>
              <span>idea → solución</span>
            </div>
            {IDEAS.map((i) => (
              <div class={i.cls} aria-hidden="true" key={i.tag} style="position: absolute; inset: 22% 14%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center">
                <p class="vg" style={`position: absolute; margin: 0; font-weight: 600; font-size: clamp(22px, 2.4vw, 32px); line-height: 1.15; color: var(--muted); animation-delay: ${i.delay}s`}>«{i.vague}»</p>
                <div class="sl" style={`position: absolute; display: flex; flex-direction: column; align-items: center; gap: 10px; animation-delay: ${i.delay}s`}>
                  <span class="tag" style="color: var(--accent-text)">{i.tag}</span>
                  <span style="font-weight: 800; font-size: clamp(26px, 2.8vw, 40px); line-height: 1.05; letter-spacing: -0.035em">{i.sol}</span>
                </div>
              </div>
            ))}
            <div aria-hidden="true" style="position: absolute; left: 22px; right: 22px; bottom: 18px; height: 16px; display: flex; align-items: flex-end; gap: 6px; overflow: hidden">
              {TICKS.map((h, k) => <span key={k} style={`flex: 0 0 2px; height: ${h}px; background: var(--line)`} />)}
              <span class="needle" style="position: absolute; bottom: 0; width: 2px; height: 16px; background: var(--accent)" />
            </div>
          </figure>
        </section>

        <section id="puertas" aria-label="¿Por qué estás aquí?" style="max-width: 1320px; margin: 0 auto; padding: 0 clamp(20px, 4vw, 48px) clamp(56px, 8vw, 96px)">
          {!elegido && (
            <div style="position: relative; padding: clamp(24px, 4vw, 48px); border-radius: 32px; background: var(--card1); border: 1px solid var(--line); overflow: hidden">
              <div aria-hidden="true" style="position: absolute; inset: 0; background-image: linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px); background-size: 40px 40px; pointer-events: none" />
              <div style="position: relative">
                <div aria-hidden="true" style={`display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; ${MONO}; font-size: 12px; color: var(--muted)`}><span><span style="color: var(--accent-text)">●</span> visor · 2 enfoques posibles</span><span>la web se adapta a tu respuesta</span></div>
                <h2 ref={rQ} class={verQ ? 'qh go' : 'qh'} style="margin: 22px 0 0; font-weight: 800; font-size: clamp(42px, 6vw, 96px); line-height: 0.98; letter-spacing: -0.05em">
                  <span class="sr-only">{PREGUNTA}</span>
                  <span aria-hidden="true">{Q_CHARS.map((c, k) => <span key={k} class="ch" style={`animation-delay: ${c.d}s`}>{c.ch}</span>)}<span class="caret" /></span>
                </h2>
                <p style="margin: 18px 0 0; max-width: 620px; color: var(--muted); font-size: 18px">Elige una puerta y la web se enfoca para ti: cambia lo que te enseño primero, lo que te cuento y cómo me escribes.</p>
                <div class="doors" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(420px, 100%), 1fr)); gap: 16px; margin-top: 32px">
                  {PUERTAS.map((d) => (
                    <button type="button" class="door" key={d.n} onClick={(e) => elegir(d.modo, e.currentTarget)} aria-label={d.aria}>
                      <span class="bk tl" aria-hidden="true" /><span class="bk tr" aria-hidden="true" /><span class="bk bl" aria-hidden="true" /><span class="bk br" aria-hidden="true" />
                      <span class="ghost" aria-hidden="true" data-n={d.n} />
                      <span aria-hidden="true" style={`position: relative; display: flex; width: 100%; justify-content: space-between; align-items: center; ${MONO}; font-size: 12px; color: var(--muted)`}><span>Puerta {d.n}</span><span style="position: relative"><span class="ds1" style="transition: opacity .3s">○ sin enfocar</span><span class="ds2" style="position: absolute; right: 0; top: 0; white-space: nowrap; color: var(--accent-text); transition: opacity .3s">● enfocando</span></span></span>
                      <span aria-hidden="true" style="width: 52px; height: 52px; border-radius: 14px; background: var(--inner); display: flex; align-items: center; justify-content: center"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d={d.icon} /></svg></span>
                      <span style="position: relative; font-weight: 800; font-size: clamp(30px, 3.2vw, 46px); line-height: 1; letter-spacing: -0.04em">{d.title}</span>
                      <span style="position: relative; font-size: 19px; color: var(--muted)">{d.text}</span>
                      <span aria-hidden="true" style="position: relative; display: flex; flex-wrap: wrap; gap: 6px; margin-top: 2px">
                        {d.chips.map((c) => <span key={c} class="tag" style="font-size: 11px">{c}</span>)}
                      </span>
                      <span style="position: relative; margin-top: auto; display: inline-flex; align-items: center; gap: 8px; font-weight: 700; color: var(--accent-text)">{d.go} <span class="arr" aria-hidden="true">→</span></span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {elegido && (
            <div id="respuesta" role="status" style="padding: clamp(24px, 4vw, 48px); border-radius: 32px; border: 2px solid var(--accent); background: var(--card1); display: flex; flex-wrap: wrap; gap: 24px 48px; align-items: flex-end; justify-content: space-between">
              <div style="flex: 999 1 560px; min-width: 0; display: flex; flex-direction: column; gap: 14px">
                <p style={`margin: 0; ${MONO}; font-size: 14px; color: var(--muted)`}><span class="qstrike">¿Por qué estás aquí?</span></p>
                <h2 key={modo} style="margin: 0; font-weight: 800; font-size: clamp(42px, 6vw, 96px); line-height: 0.98; letter-spacing: -0.05em"><span class="aw">Porque</span> <span class="aw" style="animation-delay: .14s; color: var(--accent-text)">{tx.ansA}</span> <span class="aw" style="animation-delay: .28s; color: var(--accent-text)">{tx.ansB}</span></h2>
                <p key={modo + 'p'} class="aw" style="margin: 0; max-width: 660px; color: var(--muted); font-size: 18px; animation-delay: .5s">{empresa ? ANS_TEXT.escritorio.empresa : ANS_TEXT.escritorio.cliente}</p>
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 12px">
                <a href={tx.ansHref} onClick={mk(empresa ? 'perfil' : 'casos')} style="display: inline-flex; align-items: center; min-height: 54px; padding: 0 26px; border-radius: 999px; background: var(--accent); color: var(--on-accent); text-decoration: none; font-weight: 600">{tx.ansCta}</a>
                <button type="button" onClick={(e) => cambiar(e.currentTarget)} class="sweep" style="min-height: 54px; padding: 0 24px; border-radius: 999px; border: 1px solid var(--fg); background-color: transparent; font: inherit; font-weight: 600; cursor: pointer">Cambiar de enfoque</button>
              </div>
            </div>
          )}
        </section>

        {empresa && (
          <section id="perfil" ref={rPerfil} aria-labelledby="perfil-h" style="max-width: 1320px; margin: 0 auto; padding: 0 clamp(20px, 4vw, 48px) clamp(56px, 8vw, 96px)">
            <div style="padding: clamp(24px, 4vw, 56px); border-radius: 32px; background: var(--card1); border: 1px solid var(--line); display: flex; flex-direction: column; gap: clamp(36px, 5vw, 64px)">
              <div style="display: flex; flex-direction: column; gap: 18px; max-width: 1080px">
                <p style={`margin: 0; ${MONO}; font-size: 13px; color: var(--accent-text)`}>Para empresas · lo que busco</p>
                <h2 id="perfil-h" style="margin: 0; font-weight: 800; font-size: clamp(36px, 4.6vw, 72px); line-height: 1; letter-spacing: -0.045em; text-wrap: balance"><span class="pfin">Busco un equipo donde la IA no sea un experimento,</span> <span class="pfin" style="animation-delay: .25s; color: var(--accent-text)">sino la forma de trabajar.</span></h2>
                <p class="pfin" style="margin: 0; max-width: 740px; color: var(--muted); font-size: 19px; animation-delay: .5s">Ya construyo con IA cada día: dentro de mi equipo, en una de las mayores consultoras tecnológicas del mundo, y en proyectos propios que funcionan a diario. Ahora busco una oportunidad donde exprimir ese potencial a tiempo completo: detectar dónde aporta la IA, construir el sistema y medir si funciona.</p>
              </div>

              <div style="display: flex; flex-direction: column; gap: 16px">
                <p style={`margin: 0; ${MONO}; font-size: 13px; color: var(--muted)`}>Lo que aporto · tres pruebas</p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr)); gap: 14px">
                  {PRUEBAS.map((p) => (
                    <a key={p.k} href={p.href} class="proof lift" style="text-decoration: none; padding: 28px; border-radius: 24px; border: 1px solid var(--line); background: var(--bg); display: flex; flex-direction: column; gap: 10px">
                      <span style={`${MONO}; font-size: 12px; color: var(--muted)`}>{p.k}</span>
                      <span style="font-weight: 800; font-size: clamp(60px, 6.4vw, 104px); line-height: 0.9; letter-spacing: -0.055em; color: var(--accent-text)"><Cifra num={p.num} empezar={pfEmpieza} /><span style="font-size: 0.4em; letter-spacing: -0.03em">{p.unit}</span></span>
                      <strong style="font-weight: 800; font-size: 21px; line-height: 1.15; letter-spacing: -0.02em">{p.title}</strong>
                      <span style="color: var(--muted); font-size: 15px">{p.text}</span>
                      <span style="margin-top: auto; padding-top: 8px; font-weight: 600; font-size: 15px">{p.link} →</span>
                    </a>
                  ))}
                </div>
              </div>

              <div style="display: flex; flex-wrap: wrap; gap: 32px 48px">
                <div style="flex: 1 1 420px; min-width: 0; display: flex; flex-direction: column; gap: 14px">
                  <p style={`margin: 0; ${MONO}; font-size: 13px; color: var(--muted)`}>Lo que busco</p>
                  <dl style="margin: 0; display: flex; flex-direction: column">
                    {BUSCO.map((k) => (
                      <div key={k.k} style="display: flex; flex-wrap: wrap; gap: 4px 20px; padding: 14px 0; border-top: 1px solid var(--line)">
                        <dt style={`flex: 0 0 150px; ${MONO}; font-size: 13px; color: var(--muted); padding-top: 3px`}>{k.k}</dt>
                        <dd style="flex: 1 1 240px; min-width: 0; margin: 0; font-weight: 600; font-size: 17px; line-height: 1.35">{k.v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div style="flex: 1 1 380px; min-width: 0; display: flex; flex-direction: column; gap: 14px">
                  <p style={`margin: 0; ${MONO}; font-size: 13px; color: var(--muted)`}>Cómo trabajo</p>
                  <ol style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column">
                    {COMO.map((h) => (
                      <li key={h.n} style="display: flex; gap: 16px; align-items: baseline; padding: 14px 0; border-top: 1px solid var(--line)"><span style={`${MONO}; font-size: 13px; color: var(--accent-text)`}>{h.n}</span><span style="font-weight: 600; font-size: 17px">{h.t}</span></li>
                    ))}
                  </ol>
                  <a href="#metodo" onClick={mk('metodo')} style="align-self: flex-start; display: inline-flex; align-items: center; min-height: 44px; font-weight: 600; text-underline-offset: 6px">Ver el método completo →</a>
                </div>
              </div>

              <div style="display: flex; flex-direction: column; gap: 16px">
                <p style={`margin: 0; ${MONO}; font-size: 13px; color: var(--muted)`}>Cómo soy trabajando · toca una para enfocarla</p>
                <VisorHabilidades datos={HABILIDADES} />
              </div>

              <div style="display: flex; flex-direction: column; gap: 16px">
                <p style={`margin: 0; ${MONO}; font-size: 13px; color: var(--muted)`}>Ficha rápida</p>
                <dl style="margin: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr)); gap: 20px 28px">
                  {FICHA.map((pr) => (
                    <div key={pr.k} style="display: flex; flex-direction: column; gap: 6px; padding-top: 14px; border-top: 1px solid var(--line)">
                      <dt style={`${MONO}; font-size: 12px; color: var(--muted)`}>{pr.k}</dt>
                      <dd style="margin: 0; display: flex; align-items: baseline; gap: 8px; font-weight: 600; font-size: 16px; line-height: 1.35">{pr.dot && <span class="pdot" aria-hidden="true" style="flex: 0 0 8px; position: relative; top: -1px" />}<span>{pr.v}</span></dd>
                    </div>
                  ))}
                </dl>
                <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px">
                  <a href="#contacto" onClick={mk('contacto')} style="display: inline-flex; align-items: center; min-height: 52px; padding: 0 26px; border-radius: 999px; background: var(--accent); color: var(--on-accent); text-decoration: none; font-weight: 600">Hablemos de un puesto</a>
                  <a href={LINKEDIN} style="display: inline-flex; align-items: center; min-height: 52px; padding: 0 22px; border-radius: 999px; background: var(--fg); color: var(--bg); text-decoration: none; font-weight: 600">Ver LinkedIn</a>
                  <BotonesCV />
                </div>
              </div>
            </div>
          </section>
        )}

        <div ref={rCinta} style="border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 22px 0; overflow: hidden">
          <p class="sr-only">Servicios: agentes de IA, automatizaciones, diseño y desarrollo web, software a medida y apps de formación.</p>
          <div class={`track ${pzCinta}`} aria-hidden="true" style="font-weight: 800; font-size: clamp(40px, 6vw, 86px); letter-spacing: -0.04em; line-height: 1; white-space: nowrap">
            {[1, 2].map((m) => (
              <span key={m} style="display: flex; gap: 40px; padding-right: 40px; align-items: center">
                <span>Agentes de IA</span><span style="color: var(--accent)">/</span><span class="hueca">Automatizaciones</span><span style="color: var(--accent)">/</span><span>Diseño y desarrollo web</span><span style="color: var(--accent)">/</span><span class="hueca">Software a medida</span><span style="color: var(--accent)">/</span><span>Apps de formación</span><span style="color: var(--accent)">/</span>
              </span>
            ))}
          </div>
        </div>

        <section id="casos" ref={rCasos} class={pzCasos} style="max-width: 1320px; margin: 0 auto; padding: clamp(64px, 9vw, 120px) clamp(20px, 4vw, 48px) 40px">
          <h2 id="casos-h" style="margin: 0 0 44px; font-weight: 800; font-size: clamp(40px, 5.4vw, 80px); line-height: 1; letter-spacing: -0.045em"><span class="rvl"><span>Tres ideas borrosas.</span></span><span class="rvl"><span style="color: var(--muted)">Tres sistemas que ya funcionan.</span></span></h2>

          <article ref={rC1} class={`stk card lift ${c1 ? 'go' : ''}`} style="top: 96px; min-height: 560px; box-sizing: border-box; margin-bottom: 440px; padding: clamp(28px, 4vw, 52px); border-radius: 32px; background: var(--card1); border: 1px solid var(--line); display: flex; flex-wrap: wrap; gap: 32px 48px; align-items: center">
            <CasoTexto kicker="01 — Agentes de IA" titulo={['Red de agentes para', 'un e-commerce']} antes="Una tarde entera para validar un solo producto." ahora="Un equipo de agentes que trabaja mientras duermo." big="2–3 productos validados al día" href={RUTAS.agentes} />
            <div style="flex: 1 1 360px; min-width: 0">
              <svg role="img" aria-label="Esquema animado: nueve agentes alrededor de un nodo central, Tú decides, intercambiando señales" viewBox="0 0 440 400" style="width: 100%; height: auto; overflow: visible">
                <g fill="none" stroke="var(--line)" stroke-width="1.4">
                  <path d="M220 190 L220 40" /><path d="M220 190 L316 75" /><path d="M220 190 L368 164" /><path d="M220 190 L350 265" /><path d="M220 190 L271 331" /><path d="M220 190 L169 331" /><path d="M220 190 L90 265" /><path d="M220 190 L72 164" /><path d="M220 190 L124 75" />
                </g>
                <g class="flow" fill="none" stroke="var(--accent)" stroke-width="1.8">
                  <path d="M220 190 L220 40" /><path d="M220 190 L316 75" /><path d="M220 190 L368 164" /><path d="M220 190 L350 265" /><path d="M220 190 L271 331" /><path d="M220 190 L169 331" /><path d="M220 190 L90 265" /><path d="M220 190 L72 164" /><path d="M220 190 L124 75" />
                </g>
                <g fill="var(--accent)">
                  <circle r="4"><animateMotion dur="2.4s" begin="0s" repeatCount="indefinite" path="M220 40 L220 190" /></circle>
                  <circle r="4"><animateMotion dur="2.4s" begin="0.6s" repeatCount="indefinite" path="M220 190 L368 164" /></circle>
                  <circle r="4"><animateMotion dur="2.4s" begin="1.2s" repeatCount="indefinite" path="M271 331 L220 190" /></circle>
                  <circle r="4"><animateMotion dur="2.4s" begin="1.8s" repeatCount="indefinite" path="M220 190 L90 265" /></circle>
                  <circle r="4"><animateMotion dur="2.4s" begin="0.3s" repeatCount="indefinite" path="M124 75 L220 190" /></circle>
                  <circle r="4"><animateMotion dur="2.4s" begin="1.5s" repeatCount="indefinite" path="M220 190 L350 265" /></circle>
                </g>
                <g fill="var(--panel)" stroke="var(--muted)" stroke-width="1.4">
                  <circle class="nd" cx="220" cy="40" r="15" /><circle class="nd" style="animation-delay: .3s" cx="316" cy="75" r="15" /><circle class="nd" style="animation-delay: .6s" cx="368" cy="164" r="15" /><circle class="nd" style="animation-delay: .9s" cx="350" cy="265" r="15" /><circle class="nd" style="animation-delay: 1.2s" cx="271" cy="331" r="15" /><circle class="nd" style="animation-delay: 1.5s" cx="169" cy="331" r="15" /><circle class="nd" style="animation-delay: 1.8s" cx="90" cy="265" r="15" /><circle class="nd" style="animation-delay: 2.1s" cx="72" cy="164" r="15" /><circle class="nd" style="animation-delay: 2.4s" cx="124" cy="75" r="15" />
                </g>
                <g font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="var(--fg)" text-anchor="middle">
                  <text x="220" y="14">Búsqueda</text><text x="352" y="52">Validación</text><text x="368" y="198">Presupuestos</text><text x="350" y="299">Listado</text><text x="271" y="365">Estratega</text><text x="169" y="365">Productor</text><text x="90" y="299">Crítico</text><text x="72" y="198">Analista</text><text x="92" y="52">Auditor</text>
                </g>
                <circle class="halo" cx="220" cy="190" r="34" fill="none" stroke="var(--accent)" stroke-width="2" />
                <circle cx="220" cy="190" r="34" fill="var(--accent)" />
                <text x="220" y="186" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="800" fill="var(--on-accent)">Tú</text>
                <text x="220" y="201" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="800" fill="var(--on-accent)">decides</text>
              </svg>
            </div>
          </article>

          <article ref={rC2} class={`stk card lift ${c2 ? 'go' : ''}`} style="top: 124px; min-height: 560px; box-sizing: border-box; margin-bottom: 440px; padding: clamp(28px, 4vw, 52px); border-radius: 32px; background: var(--card2); border: 1px solid var(--line); display: flex; flex-wrap: wrap; gap: 32px 48px; align-items: center">
            <CasoTexto kicker="02 — Apps de formación" titulo={['Study Engine']} antes="Formaciones que nadie termina y contenido que envejece." ahora="Una app de estudio con contenido creado y revisado por agentes." big="44 lecciones escritas y revisadas en un día" href={RUTAS.study} />
            <div style="flex: 1 1 360px; min-width: 0">
              <svg role="img" aria-label="Esquema animado: un temario y una idea entran en una red de agentes que escribe y revisa, y salen tarjetas de estudio en una app" viewBox="0 0 440 400" style="width: 100%; height: auto; overflow: visible">
                <g fill="none" stroke="var(--line)" stroke-width="1.4">
                  <path d="M100 150 C150 150 150 130 196 130" /><path d="M100 275 C150 275 150 270 196 270" /><path d="M244 130 C290 130 290 200 322 200" /><path d="M244 270 C290 270 290 200 322 200" />
                </g>
                <g class="flow" fill="none" stroke="var(--accent)" stroke-width="1.8"><path d="M100 150 C150 150 150 130 196 130" /><path d="M100 275 C150 275 150 270 196 270" /><path d="M244 130 C290 130 290 200 322 200" /><path d="M244 270 C290 270 290 200 322 200" /></g>
                <rect x="28" y="104" width="72" height="92" rx="8" fill="var(--panel)" stroke="var(--muted)" stroke-width="1.4" />
                <g stroke="var(--muted)" stroke-width="2" stroke-linecap="round"><path d="M40 124 H88" /><path d="M40 138 H82" /><path d="M40 152 H88" /><path d="M40 166 H74" /><path d="M40 180 H84" /></g>
                <text x="64" y="220" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="var(--fg)">Temario</text>
                <rect x="28" y="250" width="72" height="50" rx="16" fill="none" stroke="var(--muted)" stroke-width="1.4" stroke-dasharray="4 4" />
                <text x="64" y="280" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="var(--muted)">Idea</text>
                <path d="M220 154 C238 190 238 210 220 246" fill="none" stroke="var(--line)" stroke-width="1.4" />
                <path d="M220 246 C202 210 202 190 220 154" fill="none" stroke="var(--line)" stroke-width="1.4" />
                <circle r="4" fill="var(--accent)"><animateMotion dur="1.8s" repeatCount="indefinite" path="M220 154 C238 190 238 210 220 246 C202 210 202 190 220 154" /></circle>
                <circle class="nd" cx="220" cy="130" r="24" fill="var(--accent)" />
                <text x="220" y="134" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" font-weight="800" fill="var(--on-accent)">Escribe</text>
                <circle class="nd" style="animation-delay: 1.5s" cx="220" cy="270" r="24" fill="var(--panel)" stroke="var(--accent)" stroke-width="2" />
                <text x="220" y="274" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" font-weight="800" fill="var(--fg)">Revisa</text>
                <text x="220" y="330" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="11" fill="var(--muted)">red de agentes</text>
                <rect x="322" y="96" width="96" height="208" rx="18" fill="var(--panel)" stroke="var(--fg)" stroke-width="1.6" />
                <rect class="pop" x="334" y="122" width="72" height="44" rx="8" fill="var(--inner)" />
                <rect class="pop" style="animation-delay: .7s" x="334" y="174" width="72" height="44" rx="8" fill="var(--inner)" />
                <rect class="pop" style="animation-delay: 1.4s" x="334" y="226" width="72" height="44" rx="8" fill="var(--accent)" />
                <text x="370" y="326" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="var(--fg)">App de estudio</text>
              </svg>
            </div>
          </article>

          <article ref={rC3} class={`stk card lift ${c3 ? 'go' : ''}`} style="top: 152px; min-height: 560px; box-sizing: border-box; margin-bottom: 0; padding: clamp(28px, 4vw, 52px); border-radius: 32px; background: var(--card3); border: 1px solid var(--line); display: flex; flex-wrap: wrap; gap: 32px 48px; align-items: center">
            <CasoTexto kicker="03 — Datos en banca" titulo={['Automatización ETL', 'y asistente IA']} antes="Configuración a mano, repetitiva y con errores." ahora="Generación masiva y un asistente experto de la plataforma." big="90 % de eficiencia estimada" href={RUTAS.banca} />
            <div aria-hidden="true" style="flex: 1 1 360px; min-width: 0; display: flex; align-items: center; gap: 14px">
              <div style="flex: 1 1 0; position: relative; height: 240px">
                {SCATTER.map((s, k) => (
                  <div key={k} class="jit" style={`position: absolute; left: ${s.x}%; top: ${s.y}%; width: 46px; height: 30px; border-radius: 6px; border: 1.5px solid var(--muted); --rot: ${s.rot}deg; animation-delay: ${s.delay}s`} />
                ))}
                <p style={`position: absolute; left: 0; bottom: -28px; margin: 0; ${MONO}; font-size: 12px; color: var(--muted)`}>a mano</p>
              </div>
              <div class="dash" style="flex: 0 0 28px; height: 2px" />
              <div class="gen" style={`flex: 0 0 auto; width: 78px; height: 96px; border-radius: 16px; border: 2px solid var(--accent); display: flex; align-items: center; justify-content: center; ${MONO}; font-size: 11px; color: var(--accent-text); text-align: center`}>gene-<br />rador</div>
              <div class="dash" style="flex: 0 0 28px; height: 2px" />
              <div style="flex: 1 1 0; position: relative">
                <div style="display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 6px">
                  {CELLS.map((d, k) => <div key={k} class="cell" style={`aspect-ratio: 1; border-radius: 4px; background: var(--accent); animation-delay: ${d}s`} />)}
                </div>
                <p style={`position: absolute; left: 0; bottom: -28px; margin: 0; ${MONO}; font-size: 12px; color: var(--accent-text)`}>en segundos</p>
              </div>
            </div>
          </article>
        </section>

        <section id="metodo" ref={rMetodo} class={pzMetodo} style="max-width: 1320px; margin: 0 auto; padding: clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px) 0">
          <h2 style="margin: 0 0 16px; font-weight: 800; font-size: clamp(40px, 5.4vw, 80px); line-height: 1; letter-spacing: -0.045em"><span class="rvl"><span>Cómo trabajo</span></span></h2>
          <p class="rv" style="margin: 0 0 40px; max-width: 560px; color: var(--muted)">Cada proyecto recorre el mismo camino. En el tercer paso se decide qué hace la IA y qué decides tú.</p>
          <svg role="img" aria-label="Recorrido animado de cinco pasos; en el tercero el camino se divide en dos ramas, IA y tú, que se vuelven a unir" viewBox="0 0 1000 200" style="display: block; width: 100%; height: auto; overflow: visible">
            <path d="M80 100 L500 100 C560 100 560 40 610 40 C660 40 660 100 720 100 L920 100" fill="none" stroke="var(--line)" stroke-width="2" />
            <path d="M500 100 C560 100 560 160 610 160 C660 160 660 100 720 100" fill="none" stroke="var(--line)" stroke-width="2" />
            <circle r="6" fill="var(--accent)"><animateMotion dur="6s" repeatCount="indefinite" path="M80 100 L500 100 C560 100 560 40 610 40 C660 40 660 100 720 100 L920 100" /></circle>
            <circle r="6" fill="var(--fg)"><animateMotion dur="6s" repeatCount="indefinite" path="M80 100 L500 100 C560 100 560 160 610 160 C660 160 660 100 720 100 L920 100" /></circle>
            <g stroke="var(--accent)" stroke-width="2">
              <circle class="lit" cx="80" cy="100" r="16" />
              <circle class="lit" style="animation-delay: 1.2s" cx="280" cy="100" r="16" />
              <circle class="lit" style="animation-delay: 2.4s" cx="500" cy="100" r="16" />
              <circle class="lit" style="animation-delay: 4s" cx="720" cy="100" r="16" />
              <circle class="lit" style="animation-delay: 5.2s" cx="920" cy="100" r="16" />
            </g>
            <text x="610" y="22" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="14" fill="var(--accent-text)">IA</text>
            <text x="610" y="190" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="14" fill="var(--fg)">Tú</text>
          </svg>
          <ol style="list-style: none; margin: 28px 0 0; padding: 0; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 24px">
            {PASOS.map((s) => (
              <li key={s.n} class="rv" style="display: flex; flex-direction: column; gap: 6px">
                <span style={`${MONO}; font-size: 13px; color: var(--accent-text)`}>{s.n}</span>
                <strong style="font-weight: 800; font-size: 24px; letter-spacing: -0.02em">{s.title}</strong>
                <span style="color: var(--muted); font-size: 15px">{s.text}</span>
              </li>
            ))}
          </ol>
        </section>

        <section style="max-width: 1320px; margin: clamp(72px, 9vw, 120px) auto 0; padding: 0 clamp(20px, 4vw, 48px)">
          <div class="rv" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; padding: 28px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line)">
            <p style="margin: 0; font-weight: 800; font-size: clamp(22px, 2.4vw, 32px); letter-spacing: -0.03em">Esta web la he diseñado y construido yo, con IA como copiloto. <span style="color: var(--muted)">Imagina la tuya.</span></p>
            <a href="#contacto" onClick={mk('contacto')} style="display: inline-flex; align-items: center; min-height: 44px; font-weight: 600; text-underline-offset: 6px">Diseño y desarrollo web →</a>
          </div>
        </section>

        <section id="contacto" style="max-width: 1320px; margin: 0 auto; padding: clamp(72px, 10vw, 140px) clamp(20px, 4vw, 48px) clamp(48px, 7vw, 88px); display: flex; flex-wrap: wrap; gap: 48px">
          <div style="flex: 1 1 420px; min-width: 0">
            {!empresa ? (
              <>
                <h2 style="margin: 0 0 24px; font-weight: 800; font-size: clamp(46px, 6.4vw, 104px); line-height: 0.95; letter-spacing: -0.05em">¿Tienes una <span style="color: var(--accent-text)">idea borrosa?</span></h2>
                <p style="margin: 0; max-width: 420px; color: var(--muted); font-size: 19px">Cuéntamela tal cual, aunque esté a medias. La enfocamos juntos y te digo si la IA tiene algo que aportar.</p>
              </>
            ) : (
              <>
                <h2 style="margin: 0 0 24px; font-weight: 800; font-size: clamp(46px, 6.4vw, 104px); line-height: 0.95; letter-spacing: -0.05em">¿Buscas a alguien así <span style="color: var(--accent-text)">en tu equipo?</span></h2>
                <p style="margin: 0; max-width: 440px; color: var(--muted); font-size: 19px">Cuéntame el puesto y el reto. Si encaja, hablamos esta misma semana.</p>
              </>
            )}
          </div>
          <div id="contacto-form" style="flex: 1 1 460px; min-width: 0">
            <FormularioContacto empresa={empresa} />
          </div>
        </section>
        </main>

        <Footer />
      </div>
      {capa}
    </div>
  );
}

function CasoTexto(p: { kicker: string; titulo: string[]; antes: string; ahora: string; big: string; href: string }) {
  return (
    <div style="flex: 999 1 440px; min-width: 0; display: flex; flex-direction: column; gap: 18px">
      <p style={`margin: 0; ${MONO}; font-size: 14px; color: var(--accent-text)`}>{p.kicker}</p>
      <h3 style="margin: 0; font-weight: 800; font-size: clamp(34px, 3.8vw, 54px); line-height: 1; letter-spacing: -0.04em">
        {p.titulo.map((t) => <span key={t} class="rvl"><span>{t}</span></span>)}
      </h3>
      <div style="display: flex; flex-direction: column; gap: 12px; font-size: 17px">
        <p style="margin: 0; display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 12px"><span style={`${MONO}; font-size: 12px; color: var(--muted)`}>antes</span><span class="strike" style="color: var(--muted)">{p.antes}</span></p>
        <p class="now" style="margin: 0; display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 12px"><span style={`${MONO}; font-size: 12px; color: var(--accent-text)`}>ahora</span><span>{p.ahora}</span></p>
        <p class="big" style="margin: 8px 0 0; text-wrap: balance; font-weight: 800; font-size: clamp(36px, 4.2vw, 62px); line-height: 0.98; letter-spacing: -0.045em; color: var(--accent-text)">{p.big}</p>
      </div>
      <a href={p.href} style="align-self: flex-start; display: inline-flex; align-items: center; min-height: 44px; font-weight: 600; text-underline-offset: 6px">Ver el caso y la demo →</a>
    </div>
  );
}
