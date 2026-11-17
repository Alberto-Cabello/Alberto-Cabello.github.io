// Generado desde el tablero CasoStudyMovil y revisado a mano: textos y estilos tal cual.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from 'preact';
import { useVals } from './vals';

export function Mobile() {
  const v = useVals(true);
  return (
    <>
<div class="movil-raiz caso" style=" min-height: 844px; background: var(--bg); color: var(--fg); font-family: Inter, 'Helvetica Neue', Arial, sans-serif; font-size: 16px; line-height: 1.5; overflow-x: clip; position: relative">

<header style="position: sticky; top: 0; z-index: 50; background: var(--bg); border-bottom: 1px solid var(--line); padding: 6px 12px 6px 6px; display: flex; align-items: center; justify-content: space-between; gap: 8px">
<a href="/#casos" style="display: inline-flex; align-items: center; min-height: 44px; padding: 0 10px; font-weight: 600; text-decoration: none">← Volver</a>
<span style="font-weight: 800; font-size: 16px; letter-spacing: -0.02em">Alberto Cabello<span style="color: var(--accent)">.</span></span>
<button type="button" onClick={v.toggle} aria-label={v.modeLabel} style="display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 999px; border: 1px solid var(--line); background: transparent; color: var(--fg); cursor: pointer"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"></circle><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"></path></svg></button>
</header>
<main>

<section style="padding: 36px 16px 32px; display: flex; flex-direction: column; gap: 18px">
<p class="fade" style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--accent-text)">Caso 02 · Apps de formación a medida</p>
<h1 style="margin: 0; font-weight: 800; font-size: 46px; line-height: 0.96; letter-spacing: -0.05em">
<span class="ln"><span class="w">Apps</span> <span class="w" style="animation-delay: .08s">de</span> <span class="w" style="animation-delay: .16s">formación</span></span>
<span class="ln"><span class="w" style="animation-delay: .24s; color: var(--accent-text)">a</span> <span class="w" style="animation-delay: .32s; color: var(--accent-text)">medida</span></span>
</h1>
<p class="fade" style="margin: 0; font-size: 18px; line-height: 1.4">Convierto un temario en una app pensada para que se termine. El primer producto de la línea es el <strong>Study Engine</strong>: un prototipo que hice en 5 días para preparar una certificación, con <strong style="color: var(--accent-text)">44 lecciones escritas y revisadas por agentes en un día</strong>.</p>
<div class="fade" style="display: flex; flex-wrap: wrap; gap: 8px">
<span class="tag">Producto 01 · Study Engine</span>
<span class="tag mut">No es pública: se enseña lo que hace, no cómo</span>
</div>
<a href="/casos/app-de-estudio/demo/" class="fade pulse" style="display: flex; align-items: center; justify-content: center; min-height: 54px; border-radius: 999px; background: var(--accent); color: var(--on-accent); text-decoration: none; font-weight: 600">Probar la demo →</a>
<nav class="fade hsc" aria-label="Capítulos" style="margin: 0 -16px; padding: 0 16px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 13px">
<a href="#problema" style="display: inline-flex; align-items: center; min-height: 44px; padding: 0 14px; border-radius: 999px; border: 1px solid var(--line); text-decoration: none">01 El problema</a>
<a href="#vi" style="display: inline-flex; align-items: center; min-height: 44px; padding: 0 14px; border-radius: 999px; border: 1px solid var(--line); text-decoration: none">02 Lo que vi</a>
<a href="#solucion" style="display: inline-flex; align-items: center; min-height: 44px; padding: 0 14px; border-radius: 999px; border: 1px solid var(--line); text-decoration: none">03 La solución</a>
<a href="#cambio" style="display: inline-flex; align-items: center; min-height: 44px; padding: 0 14px; border-radius: 999px; border: 1px solid var(--line); text-decoration: none">04 El cambio</a>
</nav>
</section>

<section id="problema" style="border-top: 1px solid var(--line); padding: 48px 16px; scroll-margin-top: 60px">
<p style="margin: 0 0 12px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)">01 — El problema</p>
<h2 style="margin: 0 0 14px; font-weight: 800; font-size: 34px; line-height: 1; letter-spacing: -0.045em">Lo que llega: un temario <span style="color: var(--muted)">y una idea a medias.</span></h2>
<p style="margin: 0 0 22px; color: var(--muted)">Así empieza casi cualquier formación, en una academia, en una empresa o para preparar un examen: un manual largo, unos apuntes y una intuición de lo que debería ser.</p>
<div data-seen="Desk" role="img" aria-label="Mesa con lo que suele traer quien quiere montar una formación: un manual en PDF de más de 200 páginas y notas a mano con dudas e ideas a medias" style="position: relative; height: 380px; border-radius: 22px; border: 1px dashed var(--line); background: var(--panel); overflow: hidden">
<div aria-hidden="true" style="position: absolute; left: 5%; top: 8%; width: 132px; height: 186px; transform: rotate(-5deg)">
<div style="position: absolute; inset: 0; transform: translate(8px, 6px) rotate(3deg); border-radius: 8px; background: var(--inner); border: 1px solid var(--line)"></div>
<div style="position: absolute; inset: 0; border-radius: 8px; background: var(--paper); border: 1px solid var(--line); padding: 12px; box-sizing: border-box; display: flex; flex-direction: column; gap: 7px">
<span style="align-self: flex-start; padding: 1px 6px; background: var(--accent); color: var(--on-accent); font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10px">PDF</span>
<span style="font-weight: 800; font-size: 12px; line-height: 1.15; color: var(--paper-fg)">Manual_formacion_v3.pdf</span>
{(v.pdfLines).map((l: any, l_i: number) => (<Fragment key={l_i}><span style={`height: 5px; width: ${l.w}%; border-radius: 4px; background: var(--paper-line)`}></span></Fragment>))}
<span style="margin-top: auto; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10px; color: var(--paper-muted)">200+ páginas</span>
</div>
</div>
{(v.notes).map((n: any, n_i: number) => (<Fragment key={n_i}>
<span aria-hidden="true" class="hand nt" style={`position: absolute; left: ${n.x}%; top: ${n.y}%; width: ${n.w}px; padding: 14px 12px 12px; background: ${n.bg}; color: #2A2410; font-size: 20px; line-height: 1.05; transform: rotate(${n.r}deg); box-shadow: 0 8px 16px -10px rgba(0,0,0,.6); filter: blur(${n.blur}px); opacity: ${n.o}; z-index: ${n.z}`}>{n.text}</span>
</Fragment>))}
</div>
<div style="display: flex; flex-direction: column; gap: 10px; margin-top: 14px">
{(v.pains).map((p: any, p_i: number) => (<Fragment key={p_i}>
<div class="rv" style="padding: 16px; border-radius: 18px; border: 1px solid var(--line); display: grid; grid-template-columns: 40px minmax(0, 1fr); gap: 2px 12px">
<span style="grid-row: span 2; width: 40px; height: 40px; border-radius: 11px; background: var(--inner); display: flex; align-items: center; justify-content: center"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d={p.icon}></path></svg></span>
<strong style="font-weight: 800; font-size: 18px; line-height: 1.15; letter-spacing: -0.02em">{p.title}</strong>
<span style="color: var(--muted); font-size: 15px">{p.text}</span>
</div>
</Fragment>))}
</div>
<p class="rv" style="margin: 28px 0 0; font-weight: 800; font-size: 30px; line-height: 1.02; letter-spacing: -0.045em">Mucho contenido. <span style="color: var(--accent-text)">Poca formación.</span></p>
</section>

<section id="vi" style="background: var(--panel); padding: 52px 16px; scroll-margin-top: 60px">
<p style="margin: 0 0 12px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)">02 — Lo que vi</p>
<h2 style="margin: 0 0 14px; font-weight: 800; font-size: 34px; line-height: 1; letter-spacing: -0.045em">El temario no era el problema. <span style="color: var(--accent-text)">La forma de estudiarlo, sí.</span></h2>
<p style="margin: 0 0 22px; color: var(--muted)">Lo que me funcionó para aprobar mi primera certificación fue entender por qué cada respuesta es correcta o no, y estudiar con un plan. Estos son los problemas que más se repiten y cómo los resuelve la app:</p>
<div data-seen="Rows" style="display: flex; flex-direction: column; gap: 10px">
{(v.rows).map((r: any, r_i: number) => (<Fragment key={r_i}>
<div class={`pc ${v.rowsCls}`} style="padding: 16px; border-radius: 18px; background: var(--bg); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 8px">
<div style="display: flex; align-items: center; justify-content: space-between; gap: 10px"><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)">{r.n} · lo que pasa</span><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d={r.icon}></path></svg></div>
<span class="was" style={`align-self: flex-start; color: var(--muted); font-size: 15px; line-height: 1.35; animation-delay: ${r.d1}s`}>{r.was}</span>
<strong class="now" style={`font-weight: 800; font-size: 19px; line-height: 1.15; letter-spacing: -0.02em; animation-delay: ${r.d3}s`}>{r.now}</strong>
</div>
</Fragment>))}
</div>
<button type="button" onClick={v.toggleRows} aria-expanded={v.rowsStr} style="margin-top: 12px; width: 100%; min-height: 48px; border-radius: 999px; border: 1px solid var(--fg); background: transparent; color: var(--fg); font: inherit; font-weight: 600; cursor: pointer">{v.rowsBtn}</button>
<p class="rv" style="margin: 32px 0 0; font-weight: 800; font-size: 30px; line-height: 1.04; letter-spacing: -0.045em">No hago cursos. <span style="color: var(--accent-text)">Convierto tu temario en una app pensada para que se termine.</span></p>
</section>

<section id="solucion" style="padding: 52px 16px; scroll-margin-top: 60px">
<p style="margin: 0 0 12px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)">03 — La solución</p>
<h2 style="margin: 0 0 14px; font-weight: 800; font-size: 34px; line-height: 1; letter-spacing: -0.045em">De idea a prototipo en 5 días. <span style="color: var(--muted)">Sin jornada completa.</span></h2>
<p style="margin: 0 0 18px; color: var(--muted)">Así fue con el Study Engine. Cada día la idea se ve un poco más nítida. Toca un día:</p>
<div data-seen="Tl" role="group" aria-label="Elige un día" class="hsc" style="margin: 0 -16px 14px; padding: 0 16px">
{(v.days).map((d: any, d_i: number) => (<Fragment key={d_i}>
<button type="button" onClick={d.pick} aria-pressed={d.pressed} style={`position: relative; width: 132px; min-height: 72px; padding: 10px 12px; border-radius: 14px; border: 1px solid ${d.border}; background: ${d.bg}; color: ${d.color}; font: inherit; text-align: left; cursor: pointer; display: flex; flex-direction: column; gap: 2px; overflow: hidden`}>
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; opacity: .85">Día {d.n}</span>
<span style="font-weight: 700; font-size: 13.5px; line-height: 1.2">{d.short}</span>
<span aria-hidden="true" style={`position: absolute; left: 0; bottom: 0; height: 3px; width: ${d.bar}%; background: var(--accent)`}></span>
</button>
</Fragment>))}
</div>
<div aria-live={v.dayLive} style="display: flex; flex-direction: column; gap: 10px">
<p style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--accent-text)">Día {v.dayN} de 5</p>
<h3 style="margin: 0; font-weight: 800; font-size: 26px; line-height: 1.04; letter-spacing: -0.035em">{v.dayTitle}</h3>
<p style="margin: 0; color: var(--muted); font-size: 15px">{v.dayText}</p>
<ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px">
{(v.dayOut).map((o: any, o_i: number) => (<Fragment key={o_i}><li style="display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 600"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="var(--accent)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path></svg>{o.t}</li></Fragment>))}
</ul>
<div style="display: flex; flex-direction: column; gap: 4px">
<div style="display: flex; justify-content: space-between; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)"><span>nitidez de la idea</span><span>{v.focusPct} %</span></div>
<div style="height: 7px; border-radius: 99px; background: var(--inner)"><div class="meter" style={`height: 7px; width: ${v.focusPct}%; border-radius: 99px; background: var(--accent)`}></div></div>
</div>
</div>
<div aria-hidden="true" style="margin-top: 14px; position: relative; height: 320px; border-radius: 20px; background: var(--panel); border: 1px solid var(--line); overflow: hidden">
<div style={`position: absolute; inset: ${v.lockInset}px; opacity: ${v.lockOp}`}>
<span style="position: absolute; left: 0; top: 0; width: 22px; height: 22px; border-left: 3px solid var(--accent); border-top: 3px solid var(--accent)"></span>
<span style="position: absolute; right: 0; top: 0; width: 22px; height: 22px; border-right: 3px solid var(--accent); border-top: 3px solid var(--accent)"></span>
<span style="position: absolute; left: 0; bottom: 0; width: 22px; height: 22px; border-left: 3px solid var(--accent); border-bottom: 3px solid var(--accent)"></span>
<span style="position: absolute; right: 0; bottom: 0; width: 22px; height: 22px; border-right: 3px solid var(--accent); border-bottom: 3px solid var(--accent)"></span>
</div>
<div class="lay" style={`position: absolute; inset: 0; opacity: ${v.pv.notesOp}`}>
{(v.d1notes).map((n: any, n_i: number) => (<Fragment key={n_i}><span class="hand" style={`position: absolute; left: ${n.x}%; top: ${n.y}%; padding: 7px 10px; background: ${n.bg}; color: ${n.fg}; font-size: 19px; line-height: 1; transform: rotate(${n.r}deg); white-space: nowrap`}>{n.text}</span></Fragment>))}
</div>
<div class="lay" style={`position: absolute; left: 50%; top: 50%; width: 150px; height: 280px; margin: -140px 0 0 -75px; opacity: ${v.pv.phoneOp}; filter: blur(${v.pv.phoneBlur}px)`}>
<div style="position: absolute; inset: 0; border-radius: 26px; background: var(--phone); padding: 7px; box-sizing: border-box">
<div style="position: relative; height: 100%; border-radius: 20px; background: #FFFFFF; overflow: hidden; display: flex; flex-direction: column; gap: 7px; padding: 14px 10px; box-sizing: border-box">
<div style="height: 8px; width: 40%; border-radius: 5px; background: #E6E6EA"></div>
<div style={`height: 46px; border-radius: 10px; background: ${v.pv.heroBg}`}></div>
<div class="lay" style={`display: flex; flex-direction: column; gap: 6px; opacity: ${v.pv.skelOp}`}><span style="height: 26px; border-radius: 8px; background: #EEEEF1"></span><span style="height: 26px; border-radius: 8px; background: #EEEEF1"></span><span style="height: 26px; border-radius: 8px; background: #EEEEF1"></span></div>
<div class="lay" style={`position: absolute; left: 10px; right: 10px; top: 82px; display: flex; flex-direction: column; gap: 6px; opacity: ${v.pv.contentOp}`}>
<span style="display: flex; align-items: center; justify-content: space-between; height: 26px; padding: 0 8px; border-radius: 8px; background: #F1F1F4; font-size: 9.5px; font-weight: 700; color: #111">Plan de hoy <span style="color: #1F7A4D">✓</span></span>
<span style="display: flex; align-items: center; justify-content: space-between; height: 26px; padding: 0 8px; border-radius: 8px; background: #F1F1F4; font-size: 9.5px; font-weight: 700; color: #111">Lección 4 <span style="color: #1F7A4D">✓</span></span>
<span style="display: flex; align-items: center; height: 26px; padding: 0 8px; border-radius: 8px; background: var(--accent); font-size: 9.5px; font-weight: 700; color: var(--on-accent)">Práctica · 6 preguntas</span>
<span style="display: flex; align-items: center; height: 26px; padding: 0 8px; border-radius: 8px; background: #F1F1F4; font-size: 9.5px; font-weight: 700; color: #111">Repaso · 4 fichas</span>
</div>
</div>
</div>
</div>
<div class="lay" style={`position: absolute; left: 12px; bottom: 12px; opacity: ${v.pv.netOp}; display: flex; align-items: center; gap: 6px; padding: 6px 10px; background: var(--bg); border: 1px solid var(--line); font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px`}>escribe <span style="color: var(--muted)">⇄</span> revisa</div>
<div class="lay" style={`position: absolute; right: 12px; bottom: 12px; opacity: ${v.pv.contentOp}; padding: 6px 10px; background: var(--accent); color: var(--on-accent); font-weight: 800; font-size: 13px`}>44 lecciones listas</div>
<span style={`position: absolute; left: 14px; top: 12px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: ${v.pv.stColor}`}>{v.pv.status}</span>
</div>

<h3 style="margin: 52px 0 10px; font-weight: 800; font-size: 30px; line-height: 1; letter-spacing: -0.04em">Cada app, a la medida <span style="color: var(--muted)">de quien la va a usar.</span></h3>
<p style="margin: 0 0 18px; color: var(--muted)">Para la mía quería que estudiar diera ganas: logros, rachas y un personaje que acompaña. Para la tuya, lo que encaje con tu gente.</p>
<div style="display: flex; flex-direction: column; gap: 10px">
<div class="rv" style="padding: 18px; border-radius: 20px; border: 1px solid var(--line); display: flex; flex-direction: column; gap: 10px">
<div aria-hidden="true" style="display: flex; gap: 10px">{(v.badges).map((b: any, b_i: number) => (<Fragment key={b_i}><svg width="42" height="49" viewBox="0 0 60 70" style={`opacity: ${b.o}`}><path d="M30 3 L55 17 L55 46 L30 67 L5 46 L5 17 Z" fill={b.c}></path><path d="M22 35 l6 6 l11 -13" fill="none" stroke="#FFFFFF" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></Fragment>))}</div>
<strong style="font-weight: 800; font-size: 20px; letter-spacing: -0.02em">Logros en 4 niveles</strong>
<span style="color: var(--muted); font-size: 15px">28 logros, de Bronce a Leyenda: constancia, temario, simulacros, repaso… Son de cada persona y no se pierden nunca.</span>
</div>
<div class="rv" style="padding: 18px; border-radius: 20px; border: 1px solid var(--line); display: flex; flex-direction: column; gap: 10px">
<div aria-hidden="true" style="display: flex; gap: 6px">
{(v.streak).map((s: any, s_i: number) => (<Fragment key={s_i}><span style="position: relative; display: flex; flex-direction: column; align-items: center; gap: 4px"><span style={`width: 30px; height: 30px; border-radius: 9px; background: ${s.bg}`}></span><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px; color: var(--muted)">{s.l}</span>{(s.miss) && (<><svg style="position: absolute; left: 4px; top: 4px" width="22" height="22" viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" fill="var(--fg)"></path><path d="M8.5 12.5l2.5 2.5 4.5-5" fill="none" stroke="var(--bg)" stroke-width="2.2" stroke-linecap="round"></path></svg></>)}</span></Fragment>))}
</div>
<strong style="font-weight: 800; font-size: 20px; letter-spacing: -0.02em">Rachas que perdonan</strong>
<span style="color: var(--muted); font-size: 15px">Un día malo no lo tira todo: un escudo cubre el hueco y la racha sigue viva.</span>
</div>
<div class="rv" style="padding: 18px; border-radius: 20px; border: 2px solid var(--accent); display: flex; flex-direction: column; gap: 10px">
<div aria-hidden="true" style="display: flex; align-items: center; gap: 12px; height: 64px">
<svg width="56" height="56" viewBox="0 0 80 80" style="flex: 0 0 56px"><path d="M40 8 C60 8 72 22 72 42 C72 62 58 74 40 74 C22 74 8 62 8 42 C8 22 20 8 40 8 Z" fill="var(--accent)"></path><ellipse cx="30" cy="38" rx="5" ry="7" fill="var(--on-accent)"></ellipse><ellipse cx="50" cy="38" rx="5" ry="7" fill="var(--on-accent)"></ellipse><path d="M30 54 Q40 62 50 54" fill="none" stroke="var(--on-accent)" stroke-width="3.5" stroke-linecap="round"></path></svg>
<span style="position: relative; flex: 1; height: 60px">
<span class="say s1" style="position: absolute; inset: 0; display: flex; align-items: center; padding: 8px 12px; border-radius: 12px; background: var(--inner); font-weight: 600; font-size: 13.5px; line-height: 1.25">Hoy toca repaso: 5 minutos y listo.</span>
<span class="say" style="position: absolute; inset: 0; display: flex; align-items: center; padding: 8px 12px; border-radius: 12px; background: var(--inner); font-weight: 600; font-size: 13.5px; line-height: 1.25; animation-delay: 3s">Vas por encima de tu objetivo. ¡Sigue así!</span>
<span class="say" style="position: absolute; inset: 0; display: flex; align-items: center; padding: 8px 12px; border-radius: 12px; background: var(--inner); font-weight: 600; font-size: 13.5px; line-height: 1.25; animation-delay: 6s">Ayer fallaste dos de este tema. ¿Lo repasamos?</span>
</span>
</div>
<strong style="font-weight: 800; font-size: 20px; letter-spacing: -0.02em">Un personaje guía</strong>
<span style="color: var(--muted); font-size: 15px">Saluda con lo que toca hoy, anima cuando avanzas y aconseja cuando algo se atasca.</span>
</div>
</div>
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 14px">
<span style="font-size: 14px; color: var(--muted)">Para la tuya, por ejemplo:</span>
{(v.ideasForYou).map((u: any, u_i: number) => (<Fragment key={u_i}><span class="tag">{u.t}</span></Fragment>))}
</div>

<div style="margin-top: 14px; padding: 20px 16px; border-radius: 22px; background: var(--panel); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 12px">
<p style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--accent-text)">el contenido · red de agentes</p>
<h3 style="margin: 0; font-weight: 800; font-size: 30px; line-height: 1; letter-spacing: -0.04em">Uno escribe. <span style="color: var(--accent-text)">Otro revisa.</span></h3>
<p style="margin: 0; color: var(--muted); font-size: 15px">En cada módulo, un agente escribe la lección y otro la revisa. Si algo no cuadra, vuelve con notas. Cada dato se comprueba con la fuente antes de llegar a la app, y lo que no se puede comprobar no entra.</p>
<div data-seen="Loop" role="img" aria-label="Una lección va del agente que escribe al que revisa, vuelve con notas, se corrige y sale aprobada; el contador de lecciones aprobadas sube hasta 44" style="position: relative; height: 210px; border-radius: 18px; background: var(--bg); overflow: hidden">
<div aria-hidden="true" style="position: absolute; left: 14px; top: 62px; display: flex; flex-direction: column; align-items: center; gap: 4px"><span style="width: 48px; height: 48px; border-radius: 99px; background: var(--accent); display: flex; align-items: center; justify-content: center"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--on-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l4-1 11-11-3-3L5 16z"></path></svg></span><span style="font-weight: 700; font-size: 12px">Escribe</span></div>
<div aria-hidden="true" style="position: absolute; right: 14px; top: 62px; display: flex; flex-direction: column; align-items: center; gap: 4px"><span style="width: 48px; height: 48px; border-radius: 99px; border: 2px solid var(--accent); box-sizing: border-box; display: flex; align-items: center; justify-content: center"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6z"></path></svg></span><span style="font-weight: 700; font-size: 12px">Revisa</span></div>
<div aria-hidden="true" style="position: absolute; left: 70px; right: 70px; top: 40px; height: 110px">
<div class="rail"><div style="position: absolute; left: 0; top: 0; width: 50%; display: flex; justify-content: center"><div style="position: relative; width: 74px; height: 96px; border-radius: 8px; background: var(--paper); border: 1px solid var(--line); padding: 9px; box-sizing: border-box; display: flex; flex-direction: column; gap: 6px">
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10px; color: var(--paper-muted)">lección</span>
<span style="height: 5px; width: 90%; border-radius: 4px; background: var(--paper-line)"></span><span style="height: 5px; width: 70%; border-radius: 4px; background: var(--paper-line)"></span><span style="height: 5px; width: 84%; border-radius: 4px; background: var(--paper-line)"></span>
<span class="notesv hand" style="position: absolute; left: -14px; top: -14px; padding: 2px 7px; background: var(--warn); color: #111; font-size: 15px; white-space: nowrap">vuelve con notas</span>
<span class="stamp" style="position: absolute; right: -12px; bottom: -8px; padding: 2px 7px; border: 2px solid var(--accent); background: var(--bg); color: var(--accent-text); font-size: 10px; font-weight: 800; white-space: nowrap">✓ APROBADA</span>
</div></div></div>
</div>
<div style="position: absolute; left: 0; right: 0; bottom: 0; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; gap: 8px; border-top: 1px solid var(--line); font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)">
<span>time-lapse de un día</span>
<span style="display: flex; align-items: center; gap: 8px"><span style="width: 80px; height: 6px; border-radius: 99px; background: var(--inner); overflow: hidden"><span style={`display: block; height: 6px; width: ${v.loopPct}%; background: var(--accent)`}></span></span><strong style="font-family: Inter, sans-serif; font-size: 15px; color: var(--fg)">{v.loopCount} / 44</strong></span>
</div>
</div>
</div>
</section>

<section id="cambio" style="border-top: 1px solid var(--line); padding: 52px 16px; scroll-margin-top: 60px">
<p style="margin: 0 0 12px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--accent-text)">04 — El cambio</p>
<h2 style="margin: 0 0 14px; font-weight: 800; font-size: 44px; line-height: 0.95; letter-spacing: -0.05em">De temario <span style="color: var(--accent-text)">a app pensada para terminarse.</span></h2>
<p style="margin: 0 0 18px; color: var(--muted)">Arrastra la línea: a un lado, cómo se estudia hoy; al otro, cómo se estudia con la app.</p>
<div data-seen="Ba" class="ba" style="position: relative; height: 440px; border-radius: 22px; overflow: hidden; background: var(--panel); border: 1px solid var(--line)">
<div aria-hidden="true" style="position: absolute; inset: 0">
<div style="position: absolute; inset: 0; filter: grayscale(.6); opacity: .9">
<div style="position: absolute; left: 6%; top: 18%; width: 40%; height: 54%; transform: rotate(-5deg); border-radius: 8px; background: var(--paper); border: 1px solid var(--line); padding: 12px; box-sizing: border-box; display: flex; flex-direction: column; gap: 7px">
<span style="font-weight: 800; font-size: 11px; color: var(--paper-fg)">Manual_formacion_v3.pdf</span>
{(v.pdfLines).map((l: any, l_i: number) => (<Fragment key={l_i}><span style={`height: 5px; width: ${l.w}%; border-radius: 4px; background: var(--paper-line)`}></span></Fragment>))}
<span style="margin-top: auto; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10px; color: var(--paper-muted)">pág. 12 de 214</span>
</div>
{(v.beforeNotes).map((n: any, n_i: number) => (<Fragment key={n_i}><span class="hand" style={`position: absolute; left: ${n.x}%; top: ${n.y}%; padding: 10px 12px; background: ${n.bg}; color: #2A2410; font-size: 18px; line-height: 1.05; transform: rotate(${n.r}deg); max-width: 130px`}>{n.text}</span></Fragment>))}
<span style="position: absolute; left: 12%; bottom: 4%; font-weight: 800; font-size: 110px; line-height: 1; color: var(--line)">?</span>
</div>
<span class="tag solid" style="position: absolute; left: 14px; top: 14px; z-index: 2">Lo que trae</span>
</div>
<div aria-hidden="true" style={`position: absolute; inset: 0; clip-path: inset(0 0 0 ${v.baPos}%); background: var(--after)`}>
<div style="position: absolute; left: 50%; top: 50%; width: 136px; height: 262px; transform: translate(-50%, -50%); border-radius: 24px; background: var(--phone); padding: 7px; box-sizing: border-box">
<div style="height: 100%; border-radius: 20px; background: #FFFFFF; color: #121214; padding: 12px 9px; box-sizing: border-box; display: flex; flex-direction: column; gap: 6px">
<span style="font-size: 9.5px; font-weight: 700; line-height: 1.2">Hoy toca lección y repaso. ¡Vamos!</span>
<span style="padding: 7px; border-radius: 9px; background: var(--accent); color: var(--on-accent); display: flex; flex-direction: column; gap: 4px"><span style="font-size: 9.5px; font-family: 'IBM Plex Mono', ui-monospace, monospace">PLAN DE HOY · 25 MIN</span><span style="font-size: 10px; font-weight: 800">2 de 3 tareas hechas</span><span style="height: 4px; border-radius: 9px; background: rgba(255,255,255,.35)"><span style="display: block; width: 66%; height: 4px; border-radius: 9px; background: #FFF"></span></span></span>
<span style="display: flex; justify-content: space-between; padding: 6px 7px; border-radius: 8px; background: #F2F2F5; font-size: 10px; font-weight: 700">Lección 4 <span style="color: #1F7A4D">✓</span></span>
<span style="display: flex; justify-content: space-between; padding: 6px 7px; border-radius: 8px; background: #F2F2F5; font-size: 10px; font-weight: 700">Práctica <span style="color: #1F7A4D">✓</span></span>
<span style="display: flex; justify-content: space-between; padding: 6px 7px; border-radius: 8px; border: 1.5px solid var(--accent); font-size: 10px; font-weight: 700">Repaso · 4 fichas <span>→</span></span>
<span style="font-size: 9.5px; font-family: 'IBM Plex Mono', ui-monospace, monospace; color: #55555C; margin-top: 2px">MAPA DEL TEMARIO</span>
<span style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 3px">{(v.mapCells).map((m: any, m_i: number) => (<Fragment key={m_i}><span style={`height: 12px; border-radius: 3px; background: ${m.bg}`}></span></Fragment>))}</span>
</div>
</div>
<div style="position: absolute; left: 4%; top: 12px; width: 150px; padding: 8px 10px; border-radius: 14px; background: var(--bg); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 4px; transform: rotate(-2deg)">
<span style="font-weight: 800; font-size: 12.5px; line-height: 1.15">Quiere volver mañana</span>
<span style="display: flex; align-items: center; gap: 6px"><svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-9z" fill="#E8590C"></path></svg><strong style="font-size: 16px">12 días</strong></span>
<span style="font-size: 10.5px; color: var(--muted)">de racha · el escudo cubrió un fallo</span>
</div>
<div style="position: absolute; right: 4%; bottom: 12px; width: 150px; padding: 8px 10px; border-radius: 14px; background: var(--bg); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 4px; transform: rotate(2deg)">
<span style="font-weight: 800; font-size: 12.5px; line-height: 1.15">Ve cuánto le falta</span>
<strong style="font-size: 22px; color: var(--accent-text)">68 %</strong>
<span style="font-size: 10.5px; color: var(--muted)">objetivo: 75 % · 3 temas por reforzar</span>
</div>
<span class="tag solid" style="position: absolute; right: 14px; top: 14px">Lo que se lleva</span>
</div>
<div aria-hidden="true" style={`position: absolute; top: 0; bottom: 0; left: ${v.baPos}%; width: 3px; margin-left: -1.5px; background: var(--accent); z-index: 4; pointer-events: none`}>
<span class="knob" style="position: absolute; top: 50%; left: 50%; width: 46px; height: 46px; margin: -23px 0 0 -23px; border-radius: 99px; background: var(--accent); color: var(--on-accent); display: flex; align-items: center; justify-content: center"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l-6 6 6 6 M15 6l6 6-6 6"></path></svg></span>
{(v.hintBa) && (<><span class="hand" style="position: absolute; top: calc(50% + 30px); left: 50%; transform: translateX(-50%); white-space: nowrap; color: var(--accent-text); font-size: 22px">¡arrástrame!</span></>)}
</div>
<input type="range" min="0" max="100" value={v.baPos} onInput={v.onBa} onChange={v.onBa} onPointerDown={v.touchBa} aria-label="Comparar cómo se estudia hoy y cómo se estudia con la app" aria-valuetext={v.baLabel} />
</div>

<h3 style="margin: 52px 0 16px; font-weight: 800; font-size: 28px; line-height: 1; letter-spacing: -0.04em">Lo que demostró el prototipo</h3>
<div data-seen="Nums" class={`nums ${v.numsCls}`} style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px">
{(v.nums).map((n: any, n_i: number) => (<Fragment key={n_i}>
<div style="padding: 16px 14px; border-radius: 18px; border: 1px solid var(--line); display: flex; flex-direction: column; gap: 4px">
<span class="num" style={`font-weight: 800; font-size: 40px; line-height: 0.9; letter-spacing: -0.055em; color: var(--accent-text); white-space: nowrap; animation-delay: ${n.d}s`}>{n.v}<span style="font-size: 0.4em; letter-spacing: -0.02em">{n.u}</span></span>
<strong style="font-weight: 800; font-size: 15px; line-height: 1.2">{n.title}</strong>
<span style="color: var(--muted); font-size: 13px; line-height: 1.35">{n.text}</span>
</div>
</Fragment>))}
</div>

<div class="rv" style="margin-top: 14px; padding: 20px 16px; border-radius: 22px; background: var(--panel); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 14px">
<h3 style="margin: 0; font-weight: 800; font-size: 28px; line-height: 1.02; letter-spacing: -0.045em">Un prototipo en días. <span style="color: var(--accent-text)">Un producto cuando lo necesites.</span></h3>
<p style="margin: 0; color: var(--muted); font-size: 15px">El Study Engine lo hice para mí y para mi equipo: un prototipo privado que se comparte con un enlace. Para una academia o una empresa, el siguiente paso es llevarlo a producción, con el mismo método.</p>
<div style="padding: 18px 16px; border-radius: 18px; border: 1px dashed var(--muted); display: flex; flex-direction: column; gap: 10px">
<span class="tag mut" style="align-self: flex-start">Prototipo · lo que hice</span>
<ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px">
{(v.proto).map((p: any, p_i: number) => (<Fragment key={p_i}><li style="display: flex; gap: 8px; align-items: baseline; font-size: 15px"><span aria-hidden="true" style="color: var(--muted)">—</span><span>{p.t}</span></li></Fragment>))}
</ul>
</div>
<div style="padding: 18px 16px; border-radius: 18px; border: 2px solid var(--accent); background: var(--bg); display: flex; flex-direction: column; gap: 10px">
<span class="tag" style="align-self: flex-start">Producto · lo que haríamos para ti</span>
<ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px">
{(v.prod).map((p: any, p_i: number) => (<Fragment key={p_i}><li style="display: flex; gap: 8px; align-items: baseline; font-size: 15px"><svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" style="flex: 0 0 14px; position: relative; top: 2px"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="var(--accent)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>{p.t}</span></li></Fragment>))}
</ul>
</div>
</div>

<h3 style="margin: 52px 0 10px; font-weight: 800; font-size: 30px; line-height: 1; letter-spacing: -0.045em">Una plantilla, <span style="color: var(--muted)">para cualquier temario.</span></h3>
<p style="margin: 0 0 18px; color: var(--muted)">El mismo camino sirve para la formación de tu empresa, tu academia o tu certificación.</p>
<div style="display: flex; flex-direction: column; gap: 10px">
{(v.line3).map((l: any, l_i: number) => (<Fragment key={l_i}>
<div class="rv" style={`padding: 20px 18px; border-radius: 22px; background: ${l.bg}; color: ${l.fg}; border: 1px solid ${l.border}; display: flex; flex-direction: column; gap: 8px`}>
<span style={`font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: ${l.numColor}`}>{l.n}</span>
<strong style="font-weight: 800; font-size: 26px; line-height: 1; letter-spacing: -0.035em">{l.title}</strong>
<span style="font-size: 15px; opacity: .88">{l.text}</span>
</div>
</Fragment>))}
</div>
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 14px">
<span style="font-size: 14px; color: var(--muted)">Sirve para:</span>
{(v.uses).map((u: any, u_i: number) => (<Fragment key={u_i}><span class="tag">{u.t}</span></Fragment>))}
</div>
</section>

<section style="padding: 0 16px 40px">
<div class="rv" style="padding: 28px 20px; border-radius: 26px; background: var(--fg); color: var(--bg); display: flex; flex-direction: column; gap: 18px">
<h2 style="margin: 0; font-weight: 800; font-size: 34px; line-height: 1; letter-spacing: -0.05em">¿Qué formación convertirías en una app?</h2>
<a href="/?para=clientes#contacto" style="display: flex; align-items: center; justify-content: center; min-height: 54px; border-radius: 999px; background: var(--accent); color: var(--on-accent); text-decoration: none; font-weight: 600">Cuéntame tu idea</a>
<a href="/casos/app-de-estudio/demo/" style="display: flex; align-items: center; justify-content: center; min-height: 54px; border-radius: 999px; border: 1px solid var(--bg); text-decoration: none; font-weight: 600">Probar la demo</a>
<a href="/casos/automatizacion-y-asistente-ia/" style="display: flex; align-items: center; justify-content: center; min-height: 48px; text-decoration: none; font-weight: 600">Siguiente caso: banca →</a>
</div>
</section>

</main>
</div>

    </>
  );
}
