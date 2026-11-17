// Generado desde el tablero CasoStudy y revisado a mano: textos y estilos tal cual.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from 'preact';
import { useVals } from './vals';

export function Desktop() {
  const v = useVals(false);
  return (
    <>
<div class="caso v-esc" style="background: var(--bg); color: var(--fg); font-family: Inter, 'Helvetica Neue', Arial, sans-serif; font-size: 18px; line-height: 1.55; min-height: 100vh; overflow-x: clip">

<header style="max-width: 1320px; margin: 0 auto; padding: 22px clamp(20px, 4vw, 48px); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px">
<a href="/#casos" style="display: inline-flex; align-items: center; min-height: 44px; font-weight: 600; text-decoration: none">← Volver</a>
<span style="font-weight: 800; font-size: 18px; letter-spacing: -0.02em">Alberto Cabello<span style="color: var(--accent)">.</span></span>
<button onClick={v.toggle} aria-label={v.modeLabel} style="display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 999px; border: 1px solid var(--line); background: transparent; color: var(--fg); cursor: pointer">
<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"></circle><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"></path></svg>
</button>
</header>

<section style="max-width: 1320px; margin: 0 auto; padding: clamp(40px, 8vw, 110px) clamp(20px, 4vw, 48px) clamp(48px, 8vw, 100px)">
<p class="fade" style="margin: 0 0 24px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 14px; color: var(--accent-text)">Caso 02 · Apps de formación a medida</p>
<h1 style="margin: 0; font-weight: 800; font-size: clamp(44px, 7.4vw, 120px); line-height: 0.95; letter-spacing: -0.05em">
<span class="ln"><span class="w">Apps</span> <span class="w" style="animation-delay: .08s">de</span> <span class="w" style="animation-delay: .16s">formación</span></span>
<span class="ln"><span class="w" style="animation-delay: .24s; color: var(--accent-text)">a</span> <span class="w" style="animation-delay: .32s; color: var(--accent-text)">medida</span></span>
</h1>
<p class="fade" style="margin: 32px 0 0; max-width: 800px; font-size: clamp(19px, 2vw, 26px); line-height: 1.35; text-wrap: pretty">Convierto un temario en una app pensada para que se termine. El primer producto de la línea es el <strong>Study Engine</strong>: un prototipo que hice en 5 días para preparar una certificación, con <strong style="color: var(--accent-text)">44 lecciones escritas y revisadas por agentes en un día</strong>.</p>
<div class="fade" style="display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; margin-top: 28px">
<span class="tag">Línea · Apps de formación a medida</span>
<span aria-hidden="true" style="color: var(--muted)">→</span>
<span class="tag">Producto 01 · Study Engine</span>
<span class="tag mut">No es pública: se enseña lo que hace, no cómo</span>
</div>
<nav class="fade" aria-label="Capítulos" style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 36px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 14px">
<a href="#problema" style="display: inline-flex; align-items: center; min-height: 44px; padding: 0 16px; border-radius: 999px; border: 1px solid var(--line); text-decoration: none">01 El problema</a>
<a href="#vi" style="display: inline-flex; align-items: center; min-height: 44px; padding: 0 16px; border-radius: 999px; border: 1px solid var(--line); text-decoration: none">02 Lo que vi</a>
<a href="#solucion" style="display: inline-flex; align-items: center; min-height: 44px; padding: 0 16px; border-radius: 999px; border: 1px solid var(--line); text-decoration: none">03 La solución</a>
<a href="#cambio" style="display: inline-flex; align-items: center; min-height: 44px; padding: 0 16px; border-radius: 999px; border: 1px solid var(--line); text-decoration: none">04 El cambio</a>
</nav>
</section>

<section id="problema" style="border-top: 1px solid var(--line)">
<div style="max-width: 1320px; margin: 0 auto; padding: clamp(56px, 9vw, 120px) clamp(20px, 4vw, 48px)">
<p style="margin: 0 0 16px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 14px; color: var(--muted)">01 — El problema</p>
<h2 style="margin: 0 0 20px; font-weight: 800; font-size: clamp(34px, 4.6vw, 68px); line-height: 1; letter-spacing: -0.045em"><span class="rvl"><span>Lo que llega: un temario</span></span><span class="rvl"><span style="color: var(--muted)">y una idea a medias.</span></span></h2>
<p class="rv" style="margin: 0 0 36px; max-width: 660px; color: var(--muted)">Así empieza casi cualquier formación, en una academia, en una empresa o para preparar un examen: un manual largo, unos apuntes y una intuición de lo que debería ser.</p>

<div class="desk" role="img" aria-label="Mesa borrosa con lo que suele traer quien quiere montar una formación: un manual en PDF de más de 200 páginas y notas a mano con dudas e ideas a medias" style="position: relative; height: clamp(440px, 42vw, 540px); border-radius: 28px; border: 1px dashed var(--line); background: var(--panel); overflow: hidden">
<span aria-hidden="true" class="tag solid" style="position: absolute; right: 20px; top: 18px; z-index: 6">Pasa el ratón: enfoca cada nota</span>
<div class="it drift" aria-hidden="true" style="left: 5%; top: 14%; width: clamp(170px, 17vw, 220px); transform: rotate(-6deg)">
<div style="position: relative; height: clamp(230px, 22vw, 290px)">
<div style="position: absolute; inset: 0; transform: translate(14px, 10px) rotate(4deg); border-radius: 10px; background: var(--inner); border: 1px solid var(--line)"></div>
<div style="position: absolute; inset: 0; transform: translate(7px, 5px) rotate(2deg); border-radius: 10px; background: var(--inner); border: 1px solid var(--line)"></div>
<div style="position: absolute; inset: 0; border-radius: 10px; background: var(--paper); border: 1px solid var(--line); padding: 18px; box-sizing: border-box; display: flex; flex-direction: column; gap: 9px">
<span style="align-self: flex-start; padding: 2px 8px; background: var(--accent); color: var(--on-accent); font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px">PDF</span>
<span style="font-weight: 800; font-size: 15px; line-height: 1.15; color: var(--paper-fg)">Manual_formacion_v3.pdf</span>
{(v.pdfLines).map((l: any, l_i: number) => (<Fragment key={l_i}><span style={`height: 6px; width: ${l.w}%; border-radius: 4px; background: var(--paper-line)`}></span></Fragment>))}
<span style="margin-top: auto; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--paper-muted)">200+ páginas</span>
</div>
</div>
</div>
{(v.notes).map((n: any, n_i: number) => (<Fragment key={n_i}>
<span class="it hand" aria-hidden="true" style={`left: ${n.x}%; top: ${n.y}%; width: ${n.w}px; padding: 22px 20px 18px; background: ${n.bg}; color: #2A2410; font-size: clamp(22px, 2vw, 28px); line-height: 1.08; box-shadow: 0 6px 12px -8px rgba(0,0,0,.5); transform: rotate(${n.r}deg)`}><span style={`position: absolute; left: 50%; top: -8px; width: 64px; height: 18px; margin-left: -32px; background: rgba(255,255,255,.45); transform: rotate(${n.tr}deg)`}></span>{n.text}</span>
</Fragment>))}
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr)); gap: 14px; margin-top: 16px">
{(v.pains).map((p: any, p_i: number) => (<Fragment key={p_i}>
<div class="rv" style="padding: 26px; border-radius: 24px; border: 1px solid var(--line); display: flex; flex-direction: column; gap: 10px">
<span style="width: 44px; height: 44px; border-radius: 12px; background: var(--inner); display: flex; align-items: center; justify-content: center"><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d={p.icon}></path></svg></span>
<strong style="font-weight: 800; font-size: 21px; line-height: 1.15; letter-spacing: -0.02em">{p.title}</strong>
<span style="color: var(--muted); font-size: 16px">{p.text}</span>
</div>
</Fragment>))}
</div>
<p class="rv" style="margin: 44px 0 0; font-weight: 800; font-size: clamp(30px, 4.2vw, 60px); line-height: 1; letter-spacing: -0.045em">Mucho contenido. <span style="color: var(--accent-text)">Poca formación.</span></p>
</div>
</section>

<section id="vi" style="background: var(--panel)">
<div style="max-width: 1320px; margin: 0 auto; padding: clamp(72px, 11vw, 150px) clamp(20px, 4vw, 48px)">
<p style="margin: 0 0 16px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 14px; color: var(--muted)">02 — Lo que vi</p>
<h2 style="margin: 0 0 20px; font-weight: 800; font-size: clamp(34px, 4.6vw, 68px); line-height: 1; letter-spacing: -0.045em"><span class="rvl"><span>El temario no era el problema.</span></span><span class="rvl"><span style="color: var(--accent-text)">La forma de estudiarlo, sí.</span></span></h2>
<p class="rv" style="margin: 0 0 48px; max-width: 720px; color: var(--muted)">Lo que me funcionó para aprobar mi primera certificación fue entender por qué cada respuesta es correcta o no, y estudiar con un plan. Eso se puede convertir en producto. Estos son los problemas que más se repiten y cómo los resuelve la app:</p>

<div data-seen="Rows" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(520px, 100%), 1fr)); gap: 12px">
{(v.rows).map((r: any, r_i: number) => (<Fragment key={r_i}>
<div class={`pc ${v.rowsCls}`} style="padding: 24px 26px; border-radius: 22px; background: var(--bg); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 12px">
<div style="display: flex; align-items: center; justify-content: space-between; gap: 12px"><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)">{r.n} · lo que pasa</span><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d={r.icon}></path></svg></div>
<span class="was" style={`align-self: flex-start; color: var(--muted); font-size: 17px; line-height: 1.35; animation-delay: ${r.d1}s`}>{r.was}</span>
<span class="arw" aria-hidden="true" style={`width: 48px; height: 2px; background: var(--accent); animation-delay: ${r.d2}s`}></span>
<strong class="now" style={`font-weight: 800; font-size: clamp(20px, 2vw, 27px); line-height: 1.12; letter-spacing: -0.025em; color: var(--fg); animation-delay: ${r.d3}s`}>{r.now}</strong>
</div>
</Fragment>))}
</div>
<p class={`bigf ${v.rowsCls}`} style="margin: clamp(56px, 8vw, 96px) 0 0; max-width: 1100px; font-weight: 800; font-size: clamp(34px, 5vw, 76px); line-height: 1.02; letter-spacing: -0.045em; text-wrap: balance">No hago cursos. <span style="color: var(--accent-text)">Convierto tu temario en una app pensada para que se termine.</span></p>
</div>
</section>

<section id="solucion" style="max-width: 1320px; margin: 0 auto; padding: clamp(56px, 9vw, 120px) clamp(20px, 4vw, 48px)">
<p style="margin: 0 0 16px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 14px; color: var(--muted)">03 — La solución</p>
<div style="display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 32px">
<div style="flex: 999 1 560px; min-width: 0">
<h2 style="margin: 0 0 16px; font-weight: 800; font-size: clamp(34px, 4.6vw, 68px); line-height: 1; letter-spacing: -0.045em"><span class="rvl"><span>De idea a prototipo en 5 días.</span></span><span class="rvl"><span style="color: var(--muted)">Sin jornada completa.</span></span></h2>
<p class="rv" style="margin: 0; max-width: 640px; color: var(--muted)">Así fue con el Study Engine. Cada día la idea se ve un poco más nítida. Toca un día para verlo.</p>
</div>
<a href="/casos/app-de-estudio/demo/" class="cta pulse" style="display: inline-flex; align-items: center; min-height: 60px; padding: 0 32px; border-radius: 999px; background: var(--accent); color: var(--on-accent); text-decoration: none; font-weight: 600; font-size: 18px"><span>Probar la demo →</span></a>
</div>

<div data-seen="Tl" style="border-radius: 28px; background: var(--panel); border: 1px solid var(--line); overflow: hidden">
<div style="overflow-x: auto; border-bottom: 1px solid var(--line)">
<div role="group" aria-label="Elige un día" class="tlrow" style="display: grid; grid-template-columns: repeat(5, minmax(0, 1fr))">
{(v.days).map((d: any, d_i: number) => (<Fragment key={d_i}>
<button type="button" class="dbtn" onClick={d.pick} aria-pressed={d.pressed} style={`position: relative; min-height: 92px; padding: 16px 18px; border: 0; border-right: 1px solid var(--line); background: ${d.bg}; color: ${d.color}; font: inherit; text-align: left; cursor: pointer; display: flex; flex-direction: column; gap: 4px`}>
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; opacity: .8">Día {d.n}</span>
<span style="font-weight: 700; font-size: 15px; line-height: 1.2">{d.short}</span>
<span aria-hidden="true" style={`position: absolute; left: 0; bottom: 0; height: 3px; width: ${d.bar}%; background: var(--accent); transition: width .6s ease`}></span>
</button>
</Fragment>))}
</div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 28px 48px; padding: clamp(22px, 3.4vw, 44px); align-items: center">
<div aria-live={v.dayLive} style="flex: 1 1 380px; min-width: 0; display: flex; flex-direction: column; gap: 14px">
<p style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 13px; color: var(--accent-text)">Día {v.dayN} de 5</p>
<h3 style="margin: 0; font-weight: 800; font-size: clamp(28px, 3.2vw, 46px); line-height: 1.02; letter-spacing: -0.04em">{v.dayTitle}</h3>
<p style="margin: 0; color: var(--muted); font-size: 17px">{v.dayText}</p>
<ul style="list-style: none; margin: 4px 0 0; padding: 0; display: flex; flex-direction: column; gap: 8px">
{(v.dayOut).map((o: any, o_i: number) => (<Fragment key={o_i}><li style="display: flex; align-items: center; gap: 10px; font-size: 16px; font-weight: 600"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="var(--accent)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path></svg>{o.t}</li></Fragment>))}
</ul>
<div style="margin-top: 8px; display: flex; flex-direction: column; gap: 6px">
<div style="display: flex; justify-content: space-between; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)"><span>nitidez de la idea</span><span>{v.focusPct} %</span></div>
<div style="height: 8px; border-radius: 99px; background: var(--inner)"><div class="meter" style={`height: 8px; width: ${v.focusPct}%; border-radius: 99px; background: var(--accent)`}></div></div>
</div>
</div>

<div aria-hidden="true" style="flex: 1 1 420px; min-width: 0; position: relative; height: 440px; border-radius: 22px; background: var(--bg); overflow: hidden">
<div style="position: absolute; inset: 0; background-image: linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px); background-size: 32px 32px"></div>
<div class="lockb" style={`position: absolute; left: ${v.lockInset}px; right: ${v.lockInset}px; top: ${v.lockInset}px; bottom: ${v.lockInset}px; opacity: ${v.lockOp}`}>
<span style="position: absolute; left: 0; top: 0; width: 28px; height: 28px; border-left: 3px solid var(--accent); border-top: 3px solid var(--accent)"></span>
<span style="position: absolute; right: 0; top: 0; width: 28px; height: 28px; border-right: 3px solid var(--accent); border-top: 3px solid var(--accent)"></span>
<span style="position: absolute; left: 0; bottom: 0; width: 28px; height: 28px; border-left: 3px solid var(--accent); border-bottom: 3px solid var(--accent)"></span>
<span style="position: absolute; right: 0; bottom: 0; width: 28px; height: 28px; border-right: 3px solid var(--accent); border-bottom: 3px solid var(--accent)"></span>
</div>
<div class="lay" style={`position: absolute; inset: 0; opacity: ${v.pv.notesOp}; filter: blur(${v.pv.notesBlur}px)`}>
{(v.d1notes).map((n: any, n_i: number) => (<Fragment key={n_i}>
<span class="hand" style={`position: absolute; left: ${n.x}%; top: ${n.y}%; padding: 10px 14px; background: ${n.bg}; color: ${n.fg}; font-size: 22px; line-height: 1; transform: rotate(${n.r}deg); white-space: nowrap`}>{n.text}</span>
</Fragment>))}
</div>
<div class="lay" style={`position: absolute; left: 50%; top: 50%; width: 220px; height: 400px; margin: -200px 0 0 -110px; opacity: ${v.pv.phoneOp}; filter: blur(${v.pv.phoneBlur}px)`}>
<div style="position: absolute; inset: 0; border-radius: 34px; background: var(--phone); padding: 10px; box-sizing: border-box; box-shadow: 0 30px 60px -30px rgba(0,0,0,.7)">
<div style="position: relative; height: 100%; border-radius: 26px; background: #FFFFFF; overflow: hidden; display: flex; flex-direction: column; gap: 10px; padding: 18px 14px; box-sizing: border-box">
<div style="height: 10px; width: 40%; border-radius: 6px; background: #E6E6EA"></div>
<div style={`height: 64px; border-radius: 14px; background: ${v.pv.heroBg}; transition: background .6s`}></div>
<div class="lay" style={`position: relative; display: flex; flex-direction: column; gap: 8px; opacity: ${v.pv.skelOp}`}>
<span class="shim" style="height: 34px; border-radius: 10px; background-color: #EEEEF1"></span>
<span class="shim" style="height: 34px; border-radius: 10px; background-color: #EEEEF1"></span>
<span class="shim" style="height: 34px; border-radius: 10px; background-color: #EEEEF1"></span>
</div>
<div class="lay" style={`position: absolute; left: 14px; right: 14px; top: 110px; display: flex; flex-direction: column; gap: 8px; opacity: ${v.pv.contentOp}`}>
<span style="display: flex; align-items: center; justify-content: space-between; height: 34px; padding: 0 10px; border-radius: 10px; background: #F1F1F4; font-size: 11px; font-weight: 700; color: #111">Plan de hoy · 3 tareas <span style="color: #1F7A4D">✓</span></span>
<span style="display: flex; align-items: center; justify-content: space-between; height: 34px; padding: 0 10px; border-radius: 10px; background: #F1F1F4; font-size: 11px; font-weight: 700; color: #111">Lección 4 <span style="color: #1F7A4D">✓</span></span>
<span style="display: flex; align-items: center; height: 34px; padding: 0 10px; border-radius: 10px; background: var(--accent); font-size: 11px; font-weight: 700; color: var(--on-accent)">Práctica · 6 preguntas</span>
<span style="display: flex; align-items: center; height: 34px; padding: 0 10px; border-radius: 10px; background: #F1F1F4; font-size: 11px; font-weight: 700; color: #111">Repaso · 4 fichas</span>
</div>
<div style="margin-top: auto; display: flex; justify-content: space-around; padding-top: 10px; border-top: 1px solid #EEE">
<span style="width: 22px; height: 22px; border-radius: 6px; background: #E6E6EA"></span><span style="width: 22px; height: 22px; border-radius: 6px; background: #E6E6EA"></span><span style="width: 22px; height: 22px; border-radius: 6px; background: #E6E6EA"></span><span style="width: 22px; height: 22px; border-radius: 6px; background: #E6E6EA"></span>
</div>
</div>
</div>
<div class="lay" style={`position: absolute; left: -102px; top: 120px; opacity: ${v.pv.labelsOp}; display: flex; flex-direction: column; gap: 70px`}>
<span class="tag solid">plan</span>
<span class="tag solid">práctica</span>
</div>
<div class="lay" style={`position: absolute; right: -92px; top: 210px; opacity: ${v.pv.labelsOp}`}>
<span class="tag solid">repaso</span>
</div>
</div>
<div class="lay" style={`position: absolute; left: 20px; bottom: 20px; opacity: ${v.pv.netOp}; display: flex; align-items: center; gap: 8px; padding: 10px 14px; background: var(--panel); border: 1px solid var(--line); font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px`}>
<span class="nd" style="width: 12px; height: 12px; border-radius: 99px; background: var(--accent)"></span>escribe<span style="color: var(--muted)">⇄</span><span class="nd" style="width: 12px; height: 12px; border-radius: 99px; border: 2px solid var(--accent); box-sizing: border-box; animation-delay: .8s"></span>revisa
</div>
<div class="lay" style={`position: absolute; right: 20px; bottom: 20px; opacity: ${v.pv.contentOp}; padding: 10px 16px; background: var(--accent); color: var(--on-accent); font-weight: 800; font-size: 15px`}>44 lecciones listas</div>
<span style={`position: absolute; left: 20px; top: 18px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: ${v.pv.stColor}`}>{v.pv.status}</span>
</div>
</div>
</div>

<div style="display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 16px; margin: clamp(64px, 8vw, 104px) 0 28px">
<div style="flex: 999 1 560px; min-width: 0">
<h3 style="margin: 0 0 12px; font-weight: 800; font-size: clamp(30px, 3.6vw, 52px); line-height: 1; letter-spacing: -0.04em"><span class="rvl"><span>Cada app, a la medida</span></span><span class="rvl"><span style="color: var(--muted)">de quien la va a usar.</span></span></h3>
<p class="rv" style="margin: 0; max-width: 680px; color: var(--muted)">Para la mía quería que estudiar diera ganas, así que diseñé un sistema de recompensas: logros, rachas y un personaje que acompaña. Para la tuya, lo que encaje con tu gente.</p>
</div>
</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr)); gap: 14px">
<div class="rv lift" style="padding: 28px; border-radius: 26px; border: 1px solid var(--line); display: flex; flex-direction: column; gap: 16px">
<div aria-hidden="true" style="display: flex; gap: 12px; height: 92px; align-items: center">
{(v.badges).map((b: any, b_i: number) => (<Fragment key={b_i}>
<span class="badge" style={`width: 60px; height: 70px; animation-delay: ${b.d}s`}><svg width="60" height="70" viewBox="0 0 60 70"><path d="M30 3 L55 17 L55 46 L30 67 L5 46 L5 17 Z" fill={b.c}></path><path d="M30 13 L46 22 L46 42 L30 56 L14 42 L14 22 Z" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="2"></path><path d="M22 35 l6 6 l11 -13" fill="none" stroke="#FFFFFF" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
</Fragment>))}
</div>
<strong style="font-weight: 800; font-size: 23px; letter-spacing: -0.02em">Logros en 4 niveles</strong>
<span style="color: var(--muted); font-size: 16px">28 logros, de Bronce a Leyenda: constancia, temario, simulacros, repaso… Son de cada persona y no se pierden nunca.</span>
</div>
<div class="rv lift" style="padding: 28px; border-radius: 26px; border: 1px solid var(--line); display: flex; flex-direction: column; gap: 16px">
<div aria-hidden="true" style="display: flex; gap: 8px; height: 92px; align-items: center">
{(v.streak).map((s: any, s_i: number) => (<Fragment key={s_i}>
<span style="position: relative; display: flex; flex-direction: column; align-items: center; gap: 6px"><span class={s.cls} style={`width: 32px; height: 32px; border-radius: 10px; background: var(--inner); animation-delay: ${s.d}s`}></span><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--muted)">{s.l}</span>{(s.miss) && (<><svg class="shieldd" style="position: absolute; left: 4px; top: 4px" width="24" height="24" viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" fill="var(--fg)"></path><path d="M8.5 12.5l2.5 2.5 4.5-5" fill="none" stroke="var(--bg)" stroke-width="2.2" stroke-linecap="round"></path></svg></>)}</span>
</Fragment>))}
</div>
<strong style="font-weight: 800; font-size: 23px; letter-spacing: -0.02em">Rachas que perdonan</strong>
<span style="color: var(--muted); font-size: 16px">Un día malo no lo tira todo: un escudo cubre el hueco y la racha sigue viva.</span>
</div>
<div class="rv lift" style="padding: 28px; border-radius: 26px; border: 2px solid var(--accent); display: flex; flex-direction: column; gap: 16px">
<div aria-hidden="true" style="position: relative; height: 92px; display: flex; align-items: center; gap: 14px">
<svg class="bob" width="76" height="76" viewBox="0 0 80 80"><path d="M40 8 C60 8 72 22 72 42 C72 62 58 74 40 74 C22 74 8 62 8 42 C8 22 20 8 40 8 Z" fill="var(--accent)"></path><ellipse class="blinkeye" cx="30" cy="38" rx="5" ry="7" fill="var(--on-accent)"></ellipse><ellipse class="blinkeye" cx="50" cy="38" rx="5" ry="7" fill="var(--on-accent)"></ellipse><path d="M30 54 Q40 62 50 54" fill="none" stroke="var(--on-accent)" stroke-width="3.5" stroke-linecap="round"></path><path d="M40 8 C38 2 44 0 46 4" fill="none" stroke="var(--accent)" stroke-width="4" stroke-linecap="round"></path></svg>
<span style="position: relative; flex: 1; height: 76px">
<span class="say s1" style="position: absolute; inset: 0; display: flex; align-items: center; padding: 10px 14px; border-radius: 14px; background: var(--inner); font-weight: 600; font-size: 15px; line-height: 1.25">Hoy toca repaso: 5 minutos y listo.</span>
<span class="say" style="position: absolute; inset: 0; display: flex; align-items: center; padding: 10px 14px; border-radius: 14px; background: var(--inner); font-weight: 600; font-size: 15px; line-height: 1.25; animation-delay: 3s">Vas por encima de tu objetivo. ¡Sigue así!</span>
<span class="say" style="position: absolute; inset: 0; display: flex; align-items: center; padding: 10px 14px; border-radius: 14px; background: var(--inner); font-weight: 600; font-size: 15px; line-height: 1.25; animation-delay: 6s">Ayer fallaste dos de este tema. ¿Lo repasamos?</span>
</span>
</div>
<strong style="font-weight: 800; font-size: 23px; letter-spacing: -0.02em">Un personaje guía</strong>
<span style="color: var(--muted); font-size: 16px">Saluda con lo que toca hoy, anima cuando avanzas y aconseja cuando algo se atasca.</span>
</div>
</div>
<div class="rv" style="display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; margin-top: 18px">
<span style="font-size: 15px; color: var(--muted)">Para la tuya, por ejemplo:</span>
{(v.ideasForYou).map((u: any, u_i: number) => (<Fragment key={u_i}><span class="tag">{u.t}</span></Fragment>))}
</div>

<div class="rv" style="margin-top: 16px; padding: clamp(22px, 4vw, 48px); border-radius: 28px; background: var(--panel); border: 1px solid var(--line); display: flex; flex-wrap: wrap; gap: 28px 48px; align-items: center">
<div style="flex: 1 1 360px; min-width: 0; display: flex; flex-direction: column; gap: 12px">
<p style="margin: 0; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 13px; color: var(--accent-text)">el contenido · red de agentes</p>
<h3 style="margin: 0; font-weight: 800; font-size: clamp(30px, 3.6vw, 52px); line-height: 1; letter-spacing: -0.04em">Uno escribe. <span style="color: var(--accent-text)">Otro revisa.</span></h3>
<p style="margin: 0; color: var(--muted)">En cada módulo, un agente escribe la lección y otro la revisa. Si algo no cuadra, vuelve con notas. Cada dato se comprueba con la fuente antes de llegar a la app, y lo que no se puede comprobar no entra.</p>
</div>
<div data-seen="Loop" role="img" aria-label="Animación: una lección va del agente que escribe al que revisa, vuelve con notas, se corrige y sale aprobada; el contador de lecciones aprobadas sube hasta 44" style="flex: 1 1 460px; min-width: 0; position: relative; height: 260px; border-radius: 22px; background: var(--bg); overflow: hidden">
<svg aria-hidden="true" viewBox="0 0 460 260" preserveAspectRatio="none" style="position: absolute; inset: 0; width: 100%; height: 100%"><path class="flowl" d="M90 120 C 180 70, 280 70, 370 120" fill="none" stroke="var(--accent)" stroke-width="2"></path><path d="M370 140 C 280 190, 180 190, 90 140" fill="none" stroke="var(--line)" stroke-width="2" stroke-dasharray="4 6"></path></svg>
<div style="position: absolute; left: 6%; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px"><span class="nd" style="width: 64px; height: 64px; border-radius: 99px; background: var(--accent); display: flex; align-items: center; justify-content: center"><svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--on-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l4-1 11-11-3-3L5 16z"></path></svg></span><span style="font-weight: 700; font-size: 14px">Escribe</span></div>
<div style="position: absolute; right: 6%; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px"><span class="nd" style="width: 64px; height: 64px; border-radius: 99px; border: 2px solid var(--accent); box-sizing: border-box; background: var(--bg); display: flex; align-items: center; justify-content: center; animation-delay: .8s"><svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6z"></path></svg></span><span style="font-weight: 700; font-size: 14px">Revisa</span></div>
<div class="ride" style="position: absolute; top: 72px; width: 104px; height: 120px; border-radius: 10px; background: var(--paper); border: 1px solid var(--line); padding: 12px; box-sizing: border-box; display: flex; flex-direction: column; gap: 7px; box-shadow: 0 14px 30px -18px rgba(0,0,0,.7)">
<span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10px; color: var(--paper-muted)">lección</span>
<span style="height: 6px; width: 90%; border-radius: 4px; background: var(--paper-line)"></span><span style="height: 6px; width: 70%; border-radius: 4px; background: var(--paper-line)"></span><span style="height: 6px; width: 84%; border-radius: 4px; background: var(--paper-line)"></span><span style="height: 6px; width: 60%; border-radius: 4px; background: var(--paper-line)"></span>
<span class="notesv hand" style="position: absolute; left: -16px; top: -18px; padding: 4px 10px; background: var(--warn); color: #111; font-size: 18px; white-space: nowrap">vuelve con notas</span>
<span class="stamp" style="position: absolute; right: -14px; bottom: -10px; padding: 4px 10px; border: 2px solid var(--accent); background: var(--bg); color: var(--accent-text); font-size: 12px; font-weight: 800; white-space: nowrap">✓ APROBADA</span>
</div>
<div style="position: absolute; left: 0; right: 0; bottom: 0; padding: 12px 18px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 8px; border-top: 1px solid var(--line); font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; color: var(--muted)">
<span>time-lapse de un día</span>
<span style="display: flex; align-items: center; gap: 10px"><span style="width: 120px; height: 6px; border-radius: 99px; background: var(--inner); overflow: hidden"><span style={`display: block; height: 6px; width: ${v.loopPct}%; background: var(--accent)`}></span></span><strong style="font-family: Inter, sans-serif; font-size: 16px; color: var(--fg)">{v.loopCount} / 44</strong></span>
</div>
</div>
</div>
</section>

<section id="cambio" style="border-top: 1px solid var(--line)">
<div style="max-width: 1320px; margin: 0 auto; padding: clamp(56px, 9vw, 120px) clamp(20px, 4vw, 48px)">
<p style="margin: 0 0 16px; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 14px; color: var(--accent-text)">04 — El cambio</p>
<h2 style="margin: 0 0 16px; font-weight: 800; font-size: clamp(44px, 7vw, 112px); line-height: 0.95; letter-spacing: -0.05em"><span class="rvl"><span>De temario</span></span><span class="rvl"><span style="color: var(--accent-text)">a app pensada para terminarse.</span></span></h2>
<p class="rv" style="margin: 0 0 36px; max-width: 620px; color: var(--muted)">Arrastra la línea sobre la imagen: a un lado, cómo se estudia hoy; al otro, cómo se estudia con la app.</p>

<div class="ba" data-ba="1" data-seen="Ba" style="position: relative; height: clamp(440px, 44vw, 560px); border-radius: 28px; overflow: hidden; background: var(--panel); border: 1px solid var(--line)">
<div aria-hidden="true" style="position: absolute; inset: 0; background: var(--panel)">
<div style="position: absolute; inset: 0; filter: blur(1.5px) grayscale(.6); opacity: .9">
<div style="position: absolute; left: 6%; top: 16%; width: 22%; height: 66%; transform: rotate(-5deg); border-radius: 10px; background: var(--paper); border: 1px solid var(--line); padding: 18px; box-sizing: border-box; display: flex; flex-direction: column; gap: 9px">
<span style="font-weight: 800; font-size: 15px; color: var(--paper-fg)">Manual_formacion_v3.pdf</span>
{(v.pdfLines).map((l: any, l_i: number) => (<Fragment key={l_i}><span style={`height: 6px; width: ${l.w}%; border-radius: 4px; background: var(--paper-line)`}></span></Fragment>))}
<span style="margin-top: auto; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 11px; color: var(--paper-muted)">pág. 12 de 214</span>
</div>
{(v.beforeNotes).map((n: any, n_i: number) => (<Fragment key={n_i}>
<span class="hand" style={`position: absolute; left: ${n.x}%; top: ${n.y}%; padding: 16px 18px; background: ${n.bg}; color: #2A2410; font-size: clamp(20px, 2vw, 26px); line-height: 1.05; transform: rotate(${n.r}deg); max-width: 210px`}>{n.text}</span>
</Fragment>))}
<span style="position: absolute; left: 30%; bottom: 8%; font-weight: 800; font-size: clamp(120px, 14vw, 200px); line-height: 1; color: var(--line)">?</span>
</div>
<span class="tag solid" style="position: absolute; left: 22px; top: 20px; z-index: 2">Lo que trae</span>
</div>

<div aria-hidden="true" style={`position: absolute; inset: 0; clip-path: inset(0 0 0 ${v.baPos}%); background: var(--after)`}>
<div style="position: absolute; inset: 0; background-image: linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px); background-size: 32px 32px"></div>
<div style="position: absolute; left: 50%; top: 54%; width: clamp(200px, 17vw, 236px); aspect-ratio: 9 / 18.5; transform: translate(-50%, -50%); border-radius: 34px; background: var(--phone); padding: 9px; box-sizing: border-box">
<div style="height: 100%; border-radius: 26px; background: #FFFFFF; color: #121214; padding: 16px 13px; box-sizing: border-box; display: flex; flex-direction: column; gap: 8px">
<span style="display: flex; align-items: center; gap: 8px"><svg width="26" height="26" viewBox="0 0 80 80"><path d="M40 8 C60 8 72 22 72 42 C72 62 58 74 40 74 C22 74 8 62 8 42 C8 22 20 8 40 8 Z" fill="var(--accent)"></path><ellipse cx="30" cy="38" rx="5" ry="7" fill="#FFF"></ellipse><ellipse cx="50" cy="38" rx="5" ry="7" fill="#FFF"></ellipse><path d="M30 54 Q40 62 50 54" fill="none" stroke="#FFF" stroke-width="4" stroke-linecap="round"></path></svg><span style="font-size: 11px; font-weight: 700; line-height: 1.2">Hoy toca lección y repaso. ¡Vamos!</span></span>
<span style="padding: 10px; border-radius: 12px; background: var(--accent); color: var(--on-accent); display: flex; flex-direction: column; gap: 6px"><span style="font-size: 9px; font-family: 'IBM Plex Mono', ui-monospace, monospace">PLAN DE HOY · 25 MIN</span><span style="font-size: 12px; font-weight: 800">2 de 3 tareas hechas</span><span style="height: 5px; border-radius: 9px; background: rgba(255,255,255,.35)"><span style="display: block; width: 66%; height: 5px; border-radius: 9px; background: #FFF"></span></span></span>
<span style="display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; border-radius: 10px; background: #F2F2F5; font-size: 10px; font-weight: 700">Lección 4 · 6 min <span style="color: #1F7A4D">✓</span></span>
<span style="display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; border-radius: 10px; background: #F2F2F5; font-size: 10px; font-weight: 700">Práctica · 5 preguntas <span style="color: #1F7A4D">✓</span></span>
<span style="display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; border-radius: 10px; border: 1.5px solid var(--accent); font-size: 10px; font-weight: 700">Repaso · 4 fichas <span>→</span></span>
<span style="font-size: 9px; font-family: 'IBM Plex Mono', ui-monospace, monospace; color: #55555C; margin-top: 4px">MAPA DEL TEMARIO</span>
<span style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 4px">{(v.mapCells).map((m: any, m_i: number) => (<Fragment key={m_i}><span style={`height: 16px; border-radius: 4px; background: ${m.bg}`}></span></Fragment>))}</span>
</div>
</div>
<span class="tag solid" style="position: absolute; left: 50%; top: 5%; transform: translateX(-50%); white-space: nowrap; z-index: 2">Sabe qué toca hoy ↓</span>
<div style="position: absolute; width: clamp(220px, 19vw, 270px); padding: 16px; border-radius: 18px; background: var(--bg); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 12px; box-sizing: border-box; left: 5%; top: 10%; transform: rotate(-2deg)">
<span style="display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 17px; line-height: 1.15; letter-spacing: -0.01em"><span style="flex: 0 0 32px; width: 32px; height: 32px; border-radius: 9px; background: var(--accent); display: flex; align-items: center; justify-content: center"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--on-accent)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-9z"></path></svg></span>Quiere volver mañana</span>
<span style="display: flex; align-items: center; gap: 10px"><svg width="30" height="30" viewBox="0 0 24 24"><path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-9z" fill="#E8590C"></path></svg><span style="display: flex; flex-direction: column; line-height: 1.15"><strong style="font-size: 22px; letter-spacing: -0.02em">12 días</strong><span style="font-size: 12px; color: var(--muted)">de racha · el escudo cubrió un fallo</span></span></span>
<span style="display: flex; gap: 5px"><span style="flex: 1; height: 8px; border-radius: 4px; background: var(--accent)"></span><span style="flex: 1; height: 8px; border-radius: 4px; background: var(--accent)"></span><span style="flex: 1; height: 8px; border-radius: 4px; background: var(--fg); opacity: .5"></span><span style="flex: 1; height: 8px; border-radius: 4px; background: var(--accent)"></span><span style="flex: 1; height: 8px; border-radius: 4px; background: var(--accent)"></span><span style="flex: 1; height: 8px; border-radius: 4px; background: var(--accent)"></span><span style="flex: 1; height: 8px; border-radius: 4px; background: var(--inner)"></span></span>
</div>
<div style="position: absolute; width: clamp(220px, 19vw, 270px); padding: 16px; border-radius: 18px; background: var(--bg); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 12px; box-sizing: border-box; left: 7%; top: 55%; transform: rotate(1.5deg)">
<span style="display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 17px; line-height: 1.15; letter-spacing: -0.01em"><span style="flex: 0 0 32px; width: 32px; height: 32px; border-radius: 9px; background: var(--accent); display: flex; align-items: center; justify-content: center"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--on-accent)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8z"></path></svg></span>Ve cuánto le falta</span>
<span style="display: flex; align-items: center; gap: 12px"><svg width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="25" fill="none" stroke="var(--inner)" stroke-width="8"></circle><circle cx="32" cy="32" r="25" fill="none" stroke="var(--accent)" stroke-width="8" stroke-linecap="round" stroke-dasharray="157" stroke-dashoffset="50" transform="rotate(-90 32 32)"></circle><text x="32" y="37" text-anchor="middle" font-family="Inter, sans-serif" font-size="14" font-weight="800" fill="var(--fg)">68%</text></svg><span style="display: flex; flex-direction: column; gap: 6px; flex: 1; font-size: 12px; color: var(--muted)"><span>Objetivo: 75 %</span><span style="display: flex; flex-direction: column; gap: 4px"><span style="height: 6px; border-radius: 4px; background: var(--accent); width: 90%"></span><span style="height: 6px; border-radius: 4px; background: var(--accent); opacity: .6; width: 62%"></span><span style="height: 6px; border-radius: 4px; background: var(--accent); opacity: .3; width: 34%"></span></span><span>Faltan 3 temas por reforzar</span></span></span>
</div>
<div style="position: absolute; width: clamp(220px, 19vw, 270px); padding: 16px; border-radius: 18px; background: var(--bg); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 12px; box-sizing: border-box; right: 5%; top: 11%; transform: rotate(2deg)">
<span style="display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 17px; line-height: 1.15; letter-spacing: -0.01em"><span style="flex: 0 0 32px; width: 32px; height: 32px; border-radius: 9px; background: var(--accent); display: flex; align-items: center; justify-content: center"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--on-accent)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6 M10 21h4 M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"></path></svg></span>Aprende de cada fallo</span>
<span style="display: flex; flex-direction: column; gap: 6px; font-size: 12.5px"><span style="padding: 7px 10px; border-radius: 9px; border: 1.5px solid #2F9E64; background: rgba(47,158,100,.12); font-weight: 700">✓ Opción B · por qué es la correcta</span><span style="padding: 7px 10px; border-radius: 9px; border: 1.5px solid #D9483B; background: rgba(217,72,59,.10); font-weight: 700">✗ Opción A · por qué falla</span><span style="padding: 0 4px; color: var(--muted)">Cómo acertarla: la trampa típica y cómo verla.</span></span>
</div>
<div style="position: absolute; width: clamp(220px, 19vw, 270px); padding: 16px; border-radius: 18px; background: var(--bg); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 12px; box-sizing: border-box; right: 7%; top: 56%; transform: rotate(-1.5deg)">
<span style="display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 17px; line-height: 1.15; letter-spacing: -0.01em"><span style="flex: 0 0 32px; width: 32px; height: 32px; border-radius: 9px; background: var(--accent); display: flex; align-items: center; justify-content: center"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--on-accent)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"></path></svg></span>Se siente avanzar</span>
<span style="display: flex; align-items: center; gap: 12px"><svg width="46" height="54" viewBox="0 0 60 70"><path d="M30 3 L55 17 L55 46 L30 67 L5 46 L5 17 Z" fill="#9DA3AE"></path><path d="M22 35 l6 6 l11 -13" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg><span style="display: flex; flex-direction: column; line-height: 1.2"><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 10.5px; color: var(--accent-text)">LOGRO DESBLOQUEADO</span><strong style="font-size: 15px">Constancia · Plata</strong></span></span>
<span style="display: flex; align-items: center; gap: 8px"><svg width="30" height="30" viewBox="0 0 80 80"><path d="M40 8 C60 8 72 22 72 42 C72 62 58 74 40 74 C22 74 8 62 8 42 C8 22 20 8 40 8 Z" fill="var(--accent)"></path><ellipse cx="30" cy="38" rx="5" ry="7" fill="#FFF"></ellipse><ellipse cx="50" cy="38" rx="5" ry="7" fill="#FFF"></ellipse><path d="M30 54 Q40 62 50 54" fill="none" stroke="#FFF" stroke-width="4" stroke-linecap="round"></path></svg><span style="padding: 7px 10px; border-radius: 10px 10px 10px 3px; background: var(--inner); font-size: 12px; font-weight: 600">¡12 días! Mañana, a por el Oro.</span></span>
</div>
<span class="tag solid" style="position: absolute; right: 22px; top: 20px">Lo que se lleva</span>
</div>

<div aria-hidden="true" style={`position: absolute; top: 0; bottom: 0; left: ${v.baPos}%; width: 3px; margin-left: -1.5px; background: var(--accent); z-index: 4; pointer-events: none`}>
<span class="knob" style="position: absolute; top: 50%; left: 50%; width: 52px; height: 52px; margin: -26px 0 0 -26px; border-radius: 99px; background: var(--accent); color: var(--on-accent); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 0 6px rgba(0,0,0,.18)"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l-6 6 6 6 M15 6l6 6-6 6"></path></svg></span>
{(v.hintBa) && (<><span class="hand" style="position: absolute; top: calc(50% + 36px); left: 50%; transform: translateX(-50%); white-space: nowrap; color: var(--accent-text); font-size: 24px">¡arrástrame!</span></>)}
</div>
<input type="range" min="0" max="100" value={v.baPos} onInput={v.onBa} onChange={v.onBa} onPointerDown={v.touchBa} aria-label="Comparar cómo se estudia hoy y cómo se estudia con la app" aria-valuetext={v.baLabel} />
</div>

<h3 style="margin: clamp(64px, 8vw, 104px) 0 20px; font-weight: 800; font-size: clamp(28px, 3.4vw, 48px); line-height: 1; letter-spacing: -0.04em"><span class="rvl"><span>Lo que demostró el prototipo</span></span></h3>
<div data-seen="Nums" class={`nums ${v.numsCls}`} style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr)); gap: 12px">
{(v.nums).map((n: any, n_i: number) => (<Fragment key={n_i}>
<div class="lift" style="padding: 28px; border-radius: 24px; border: 1px solid var(--line); display: flex; flex-direction: column; gap: 8px">
<span class="num" style={`font-weight: 800; font-size: clamp(56px, 6vw, 92px); line-height: 0.9; letter-spacing: -0.055em; color: var(--accent-text); animation-delay: ${n.d}s`}>{n.v}<span style="font-size: 0.42em; letter-spacing: -0.03em">{n.u}</span></span>
<strong style="font-weight: 800; font-size: 19px; line-height: 1.2">{n.title}</strong>
<span style="color: var(--muted); font-size: 15px">{n.text}</span>
</div>
</Fragment>))}
</div>

<div class="rv" style="margin-top: 16px; padding: clamp(24px, 4vw, 52px); border-radius: 28px; background: var(--panel); border: 1px solid var(--line); display: flex; flex-direction: column; gap: 28px">
<div style="max-width: 860px; display: flex; flex-direction: column; gap: 12px">
<h3 style="margin: 0; font-weight: 800; font-size: clamp(30px, 3.8vw, 56px); line-height: 1; letter-spacing: -0.045em">Un prototipo en días. <span style="color: var(--accent-text)">Un producto cuando lo necesites.</span></h3>
<p style="margin: 0; color: var(--muted)">El Study Engine lo hice para mí y para mi equipo: un prototipo privado que se comparte con un enlace. Para una academia o una empresa, el siguiente paso es llevarlo a producción, con el mismo método.</p>
</div>
<div style="display: flex; flex-wrap: wrap; align-items: stretch; gap: 14px">
<div style="flex: 1 1 340px; min-width: 0; padding: 28px; border-radius: 22px; border: 1px dashed var(--muted); display: flex; flex-direction: column; gap: 14px">
<span class="tag mut" style="align-self: flex-start">Prototipo · lo que hice</span>
<strong style="font-weight: 800; font-size: 24px; letter-spacing: -0.02em">Para validar la idea, en días</strong>
<ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px">
{(v.proto).map((p: any, p_i: number) => (<Fragment key={p_i}><li style="display: flex; gap: 10px; align-items: baseline; font-size: 16px"><span aria-hidden="true" style="color: var(--muted)">—</span><span>{p.t}</span></li></Fragment>))}
</ul>
</div>
<div class="honly" aria-hidden="true" style="flex: 0 0 auto; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: var(--accent-text)"><span style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 12px; writing-mode: vertical-rl; transform: rotate(180deg)">mismo método</span><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14 M13 6l6 6-6 6"></path></svg></div>
<div style="flex: 1 1 340px; min-width: 0; padding: 28px; border-radius: 22px; border: 2px solid var(--accent); background: var(--bg); display: flex; flex-direction: column; gap: 14px">
<span class="tag" style="align-self: flex-start">Producto · lo que haríamos para ti</span>
<strong style="font-weight: 800; font-size: 24px; letter-spacing: -0.02em">Para tus alumnos, en producción</strong>
<ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px">
{(v.prod).map((p: any, p_i: number) => (<Fragment key={p_i}><li style="display: flex; gap: 10px; align-items: baseline; font-size: 16px"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" style="flex: 0 0 16px; position: relative; top: 2px"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="var(--accent)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>{p.t}</span></li></Fragment>))}
</ul>
</div>
</div>
</div>

<h3 style="margin: clamp(72px, 9vw, 120px) 0 12px; font-weight: 800; font-size: clamp(32px, 4vw, 60px); line-height: 1; letter-spacing: -0.045em"><span class="rvl"><span>Una plantilla,</span></span><span class="rvl"><span style="color: var(--muted)">para cualquier temario.</span></span></h3>
<p class="rv" style="margin: 0 0 32px; max-width: 640px; color: var(--muted)">El mismo camino sirve para la formación de tu empresa, tu academia o tu certificación.</p>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr)); gap: 14px">
{(v.line3).map((l: any, l_i: number) => (<Fragment key={l_i}>
<div class="rv lift" style={`padding: 32px; border-radius: 28px; background: ${l.bg}; color: ${l.fg}; border: 1px solid ${l.border}; display: flex; flex-direction: column; gap: 12px; min-height: 220px; box-sizing: border-box`}>
<span style={`font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 13px; color: ${l.numColor}`}>{l.n}</span>
<strong style="font-weight: 800; font-size: clamp(28px, 3vw, 40px); line-height: 1; letter-spacing: -0.035em">{l.title}</strong>
<span style="font-size: 16px; opacity: .85">{l.text}</span>
</div>
</Fragment>))}
</div>
<div class="rv" style="display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; margin-top: 18px">
<span style="font-size: 15px; color: var(--muted)">Sirve para:</span>
{(v.uses).map((u: any, u_i: number) => (<Fragment key={u_i}><span class="tag">{u.t}</span></Fragment>))}
</div>
</div>
</section>

<section style="max-width: 1320px; margin: 0 auto; padding: 0 clamp(20px, 4vw, 48px) clamp(56px, 8vw, 96px)">
<div class="rv" style="padding: clamp(32px, 6vw, 72px); border-radius: 32px; background: var(--fg); color: var(--bg); display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 28px">
<h2 style="flex: 999 1 520px; min-width: 0; margin: 0; font-weight: 800; font-size: clamp(34px, 5vw, 76px); line-height: 0.98; letter-spacing: -0.05em">¿Qué formación convertirías en una app?</h2>
<div style="display: flex; flex-wrap: wrap; gap: 12px">
<a href="/?para=clientes#contacto" style="display: inline-flex; align-items: center; min-height: 56px; padding: 0 28px; border-radius: 999px; background: var(--accent); color: var(--on-accent); text-decoration: none; font-weight: 600">Cuéntame tu idea</a>
<a href="/casos/app-de-estudio/demo/" style="display: inline-flex; align-items: center; min-height: 56px; padding: 0 28px; border-radius: 999px; border: 1px solid var(--bg); text-decoration: none; font-weight: 600">Probar la demo</a>
<a href="/casos/automatizacion-y-asistente-ia/" style="display: inline-flex; align-items: center; min-height: 56px; padding: 0 20px; text-decoration: none; font-weight: 600">Siguiente caso: banca →</a>
</div>
</div>
</section>

</div>

    </>
  );
}
