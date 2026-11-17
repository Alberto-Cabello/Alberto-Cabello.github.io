import { useEffect, useRef, useState } from 'preact/hooks';
import { useTema } from '../lib/theme';
import { reduceMotion, useEnPantalla } from '../lib/inView';
import { PALETA, SECTORES, aleatorio, disposicion, flujo } from '../pages/caso-agentes/datos';
import './constelacion.css';

type Sim = { f: number; pi: number; ph: 'work' | 'move' | 'ask' | 'out'; t: number; ok?: boolean };

const rgba = (hex: string, a: number) => { const v = [1, 3, 5].map((k) => parseInt(hex.slice(k, k + 2), 16)); return `rgba(${v.join(',')},${a})`; };

// Polvo de estrellas fijo (semilla 7), solo en escritorio.
const POLVO = (() => {
  const rnd = aleatorio(7);
  const d: [number, number, number][] = [];
  for (let i = 0; i < 70; i++) { const r = 1.3 + rnd() * 0.9, th = rnd() * Math.PI * 2, ph = Math.acos(2 * rnd() - 1); d.push([Math.sin(ph) * Math.cos(th) * r, Math.cos(ph) * r * 0.7, Math.sin(ph) * Math.sin(th) * r]); }
  return d;
})();

/**
 * Constelación 3D de agentes por sector. Tiene su propio bucle (45 ms escritorio, 60 ms móvil),
 * se para fuera de pantalla y con la pestaña oculta, y solo se repinta a sí misma.
 */
export default function Constelacion({ sector, onSector, movil = false }: { sector: number; onSector: (i: number) => void; movil?: boolean }) {
  const [tema] = useTema();
  const dark = tema === 'dark';
  const sec = SECTORES[sector];
  const escena = useRef<HTMLDivElement>(null);
  const activo = useEnPantalla(escena, '0px');
  const [, setTick] = useState(0);
  const [done, setDone] = useState(0);
  const [disc, setDisc] = useState(0);

  const m = useRef({
    t0: performance.now(), last: performance.now(), lastF: 0, lastDt: 0.05,
    yaw: 0.4, spd: 1, dragX: 0, dragY: 0,
    sim: { f: 0, pi: 0, ph: 'work', t: 0 } as Sim,
    cur: null as number[][] | null, curKey: '',
    drag: null as null | { x: number; y: number },
  }).current;
  const reduce = reduceMotion();

  // Cambiar de negocio reinicia el flujo y los contadores.
  useEffect(() => { m.sim = { f: 0, pi: 0, ph: 'work', t: 0 }; setDone(0); setDisc(0); }, [sector]);

  useEffect(() => {
    if (!activo) return;
    m.last = performance.now();
    let raf = 0;
    const paso = movil ? 60 : 45;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - m.lastF < paso) return;
      m.lastF = now;
      const rawDt = (now - m.last) / 1000; const dt = Math.min(0.25, rawDt); m.last = now; m.lastDt = rawDt;
      const sim = m.sim;
      const asking = sim.ph === 'ask';
      m.spd += ((asking ? 0 : 1) - m.spd) * (movil ? 0.08 : 0.06);
      if (!reduce) m.yaw += dt * (movil ? 0.2 : 0.22) * m.spd;
      const fl = flujo(sec, sim.f);
      if (sim.ph !== 'ask') sim.t += dt;
      if (sim.ph === 'work' && sim.t > 0.9) {
        sim.t = 0;
        const isDec = fl.decAt >= 0 && sim.pi === fl.decAt && !sim.ok;
        sim.ph = isDec ? 'ask' : sim.pi >= fl.path.length - 1 ? 'out' : 'move';
      } else if (sim.ph === 'move' && sim.t > 0.75) { sim.t = 0; sim.pi += 1; sim.ph = 'work'; sim.ok = false; }
      else if (sim.ph === 'out' && sim.t > 1.6) { setDone((d) => d + 1); m.sim = { f: sim.f + 1, pi: 0, ph: 'work', t: 0 }; }
      setTick((k) => (k + 1) % 100000);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [activo, sector, movil]);

  // Arrastrar para girar.
  const quitar = useRef<null | (() => void)>(null);
  useEffect(() => () => quitar.current?.(), []);
  const down = (e: PointerEvent) => {
    m.drag = { x: e.clientX, y: e.clientY };
    const mv = (ev: PointerEvent) => {
      if (!m.drag) return;
      const dx = ev.clientX - m.drag.x, dy = ev.clientY - m.drag.y;
      m.drag = { x: ev.clientX, y: ev.clientY };
      m.dragX += dx * (movil ? 0.012 : 0.01);
      m.dragY = Math.max(-0.5, Math.min(0.6, m.dragY + dy * 0.006));
      if (!activo || reduce) setTick((k) => k + 1);
    };
    const up = () => { m.drag = null; quitar.current?.(); };
    quitar.current?.();
    window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
    quitar.current = () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up); quitar.current = null; };
  };

  // ── Cálculo del fotograma ──
  const tm = (performance.now() - m.t0) / 1000;
  const lay = disposicion(sec);
  const N = lay.nodes.length;
  const PAL = dark ? PALETA.dark : PALETA.light;
  if (!m.cur || m.curKey !== sec.key) {
    const prev = m.cur || [];
    m.cur = lay.nodes.map((_, i) => (prev[i] ? prev[i].slice() : [0, 0, 0]));
    m.curKey = sec.key;
  }
  const kL = 1 - Math.exp(-Math.min(0.5, m.lastDt || 0.05) * 4.5);
  lay.nodes.forEach((n, i) => { const c = m.cur![i]; for (let k = 0; k < 3; k++) c[k] += (n.p[k] - c[k]) * kL; });
  const yaw = m.yaw + m.dragX, pitch = 0.5 + m.dragY;
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
  const H0 = movil ? 800 : 720, CY = movil ? 400 : 350, SC = movil ? 330 : 340, YD = movil ? 8 : 7.2;
  const proj = (p: number[]) => {
    const x1 = p[0] * cy - p[2] * sy, z1 = p[0] * sy + p[2] * cy;
    const y1 = p[1] * cp - z1 * sp, z2 = p[1] * sp + z1 * cp;
    const per = 3.2 / (3.2 - z2);
    return { x: 500 + x1 * SC * per, y: CY - y1 * SC * per, d: Math.max(0, Math.min(1, (z2 + 1.2) / 2.4)) };
  };
  const P = m.cur.map(proj);
  const sim = m.sim;
  const fl = flujo(sec, sim.f);
  const asking = sim.ph === 'ask';
  const youI = N - 1;
  const activeI = fl.path[Math.min(sim.pi, fl.path.length - 1)];
  const decI = asking ? activeI : -1;
  const T = dark
    ? { accent: '#FF5B2E', fg: '#F2F0EB', muted: '#A09D96', warn: '#FFC24B', lbl: movil ? 'rgba(11,11,12,.8)' : 'rgba(11,11,12,.72)', lblBd: movil ? 'rgba(255,255,255,.1)' : 'rgba(255,255,255,.08)', node: '#161618' }
    : { accent: '#B8350F', fg: '#111111', muted: '#55524C', warn: '#8A5600', lbl: movil ? 'rgba(255,255,255,.92)' : 'rgba(255,255,255,.9)', lblBd: movil ? 'rgba(0,0,0,.1)' : 'rgba(0,0,0,.08)', node: '#FFFFFF' };
  const order: Record<number, number> = {};
  fl.path.forEach((ni) => { if (!lay.nodes[ni].center && order[ni] === undefined) order[ni] = Object.keys(order).length + 1; });
  const inFlow = (i: number) => order[i] !== undefined || (!!lay.nodes[i].center && fl.lane < 0);
  const gc = (n: (typeof lay.nodes)[number]) => (n.you ? T.accent : n.center ? T.fg : PAL[(n.g || 0) % PAL.length]);
  const pct = (p: { x: number; y: number }) => ({ x: (p.x / 10).toFixed(2), y: (p.y / YD).toFixed(2) });

  const nodos = lay.nodes.map((n, i) => {
    const p = P[i];
    const you = !!n.you;
    const col = gc(n);
    const isAct = i === activeI && !asking && sim.ph === 'work';
    const isDec = i === decI;
    const flow = inFlow(i);
    let size: number, fill: string, ring = col, shadow = 'none', inner = order[i] !== undefined ? String(order[i]) : '', inFg = T.fg, inFs = movil ? 11 : 12;
    if (movil) {
      size = you ? 52 : Math.round(20 + p.d * 10 + (flow ? 3 : 0) + (isAct ? 6 : 0) + (isDec ? 8 : 0));
      fill = T.node;
      if (you) { fill = T.accent; inner = 'Tú'; inFg = dark ? '#0B0B0C' : '#FFFFFF'; inFs = 15; }
      else if (isAct) { fill = col; inFg = '#0B0B0C'; }
      else if (isDec) { fill = T.warn; ring = T.warn; inFg = '#0B0B0C'; }
      if (n.center) { inner = '◎'; inFs = 13; }
    } else {
      size = you ? 76 : 26 + p.d * 16 + (flow ? 4 : 0);
      if (isAct) size += 8;
      if (isDec) size += 10;
      fill = `radial-gradient(circle at 35% 30%, ${rgba(col, dark ? 0.55 : 0.3)}, ${dark ? '#141416' : '#FFFFFF'} 66%)`;
      if (you) { fill = T.accent; inner = 'Tú'; inFg = dark ? '#0B0B0C' : '#FFFFFF'; inFs = 18; shadow = asking ? '0 0 0 10px rgba(255,91,46,.18), 0 0 40px 6px rgba(255,91,46,.45)' : '0 0 24px 2px rgba(255,91,46,.35)'; }
      else if (isAct) { fill = `radial-gradient(circle at 35% 30%, #FFFFFF, ${col} 62%)`; inFg = '#0B0B0C'; shadow = `0 0 30px 8px ${rgba(col, 0.55)}`; }
      else if (isDec) { fill = `radial-gradient(circle at 35% 30%, #FFF1C9, ${T.warn} 60%)`; ring = T.warn; inFg = '#0B0B0C'; shadow = '0 0 26px 6px rgba(255,194,75,.45)'; }
      if (n.center) { inner = '◎'; inFs = 14; }
    }
    const dim = asking && !you && !isDec;
    const faded = !flow && !you && !n.center;
    const o = movil
      ? (dim ? 0.25 : faded ? 0.3 + p.d * 0.3 : 0.65 + p.d * 0.35)
      : (dim ? 0.22 : faded ? 0.35 + p.d * 0.35 : 0.6 + p.d * 0.4);
    const z = Math.round(p.d * 20) + (you ? 25 : 0) + (isDec ? 26 : 0) + (isAct ? 22 : 0);
    const { x, y } = pct(p);
    return (
      <div key={i} class="cn-nodo" style={`left: ${x}%; top: ${y}%; z-index: ${z}; opacity: ${o.toFixed(2)}; gap: ${movil ? 3 : 5}px`}>
        <span class="cn-bola" style={`width: ${Math.round(size)}px; height: ${Math.round(size)}px; border-color: ${ring}; background: ${fill}; box-shadow: ${shadow}; color: ${inFg}; font-size: ${inFs}px`}>{inner}</span>
        {movil ? (
          (you || flow || n.center) && <span class="cn-lbl cn-lbl-m" style={`background: ${T.lbl}; border-color: ${flow && !you ? rgba(col, 0.6) : T.lblBd}; color: ${you ? T.fg : col}`}>{you ? 'Tú decides' : n.name}</span>
        ) : (
          <span class="cn-lbl" style={`background: ${T.lbl}; border-color: ${flow && !you ? rgba(col, 0.6) : T.lblBd}; color: ${flow || you ? (you ? T.fg : col) : T.muted}; font-size: ${you || flow ? 13 : 12}px; font-weight: ${flow || you ? 700 : 500}`}>{you ? 'Tú decides' : n.name}</span>
        )}
        {!movil && isAct && !you && <span class="pop cn-act" style={`background: ${ring}`}>{n.act}</span>}
      </div>
    );
  });

  const aristas = lay.edges.map((e, k) => {
    const a = P[e[0]], b = P[e[1]];
    const spoke = e[2] === 'spoke';
    const src = lay.nodes[e[0]].center ? lay.nodes[e[1]] : lay.nodes[e[0]];
    const live = !spoke && inFlow(e[0]) && inFlow(e[1]);
    let c = spoke ? T.accent : gc(src), o = spoke ? 0.08 : live ? 0.8 : 0.18;
    let w = movil ? (spoke ? 1.2 : live ? 4 : 2) : (spoke ? 1 : live ? 3 : 1.6);
    let dash = spoke ? '3 6' : live ? (movil ? '12 6' : '10 5') : 'none';
    const cls = live && !asking && !reduce ? 'flowe' : '';
    if (spoke && asking && e[0] === decI) { o = 0.95; w = movil ? 4 : 3; c = T.warn; dash = movil ? '8 8' : '6 6'; }
    else if (asking) o *= 0.4;
    return <line key={k} class={cls} x1={a.x.toFixed(1)} y1={a.y.toFixed(1)} x2={b.x.toFixed(1)} y2={b.y.toFixed(1)} stroke={c} stroke-width={w} stroke-opacity={o.toFixed(2)} stroke-dasharray={dash} stroke-linecap="round" />;
  });

  const pulsos: { x: string; y: string; s: number; c: string; col: string; main: boolean }[] = [];
  const lerp = (a: { x: number; y: number }, b: { x: number; y: number }, k: number) => ({ x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k });
  const pulso = (pt: { x: number; y: number }, s: number, col: string, main: boolean) => { const q = pct(pt); pulsos.push({ x: q.x, y: q.y, s, c: main ? '#FFFFFF' : col, col, main }); };
  if (sim.ph === 'move') {
    const k = Math.min(1, sim.t / 0.75); const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    pulso(lerp(P[fl.path[sim.pi]], P[fl.path[sim.pi + 1]], e), movil ? 13 : 15, gc(lay.nodes[fl.path[sim.pi + 1]]), true);
  } else if (sim.ph === 'out') {
    pulso(lerp(P[activeI], P[youI], Math.min(1, sim.t / 1.0)), movil ? 15 : 17, T.accent, true);
  }
  if (sec.mode === 'lanes' && sec.lanes!.length > 1 && !reduce) {
    let base = 0;
    sec.lanes!.forEach((ln, j) => {
      const n = ln.agents.length;
      if (j !== fl.lane && n > 1) {
        const pos = (tm * 0.5 + j * 0.7) % (n - 1);
        const i0 = Math.floor(pos);
        pulso(lerp(P[base + i0], P[base + i0 + 1], pos - i0), movil ? 8 : 9, PAL[j % PAL.length], false);
      }
      base += n;
    });
  }

  const yp = P[youI];
  const bk = asking
    ? (movil ? { l: yp.x / 10 - 9, t: yp.y / 8 - 11, w: 18, h: 22, c: T.accent } : { l: yp.x / 10 - 8, t: yp.y / 7.2 - 11, w: 16, h: 22, c: T.accent })
    : { l: 3, t: 4, w: 94, h: 92, c: dark ? 'rgba(255,91,46,.35)' : 'rgba(184,53,15,.35)' };
  const actNode = lay.nodes[activeI] || ({} as (typeof lay.nodes)[number]);
  const actG = actNode.g;
  const leyenda = sec.gnames.map((g, i) => {
    const on = i === actG; const c = PAL[i % PAL.length];
    return (
      <span key={g} class="cn-ley" style={`background: ${on ? rgba(c, 0.18) : movil ? 'transparent' : T.lbl}; border-color: ${on ? c : T.lblBd}; color: ${on ? T.fg : T.muted}`}>
        <span style={`width: 9px; height: 9px; border-radius: 99px; background: ${c}`} />{g}
      </span>
    );
  });

  // Panel de estado (cambia solo cuando cambia la fase).
  const curCol = gc(actNode);
  let panel: { k: string; kc: string; dot: boolean; title: string; sub: string; bg: string; border: string };
  if (asking) panel = { k: 'el equipo te espera', kc: 'var(--warn)', dot: true, title: fl.q, sub: fl.qs + ' Lo demás sigue trabajando.', bg: 'var(--accent-soft)', border: '2px solid var(--accent)' };
  else if (sim.ph === 'out') panel = { k: 'hecho', kc: 'var(--accent-text)', dot: false, title: '✓ ' + fl.out, sub: 'Llega a ti ya resuelto. Siguiente ' + fl.packet + '.', bg: 'var(--panel)', border: '1px solid var(--line)' };
  else panel = { k: (sec.gnames[actNode.g ?? -1] || 'coordinación') + ' · trabajando', kc: curCol, dot: true, title: (actNode.name || '') + ' · ' + (actNode.act || ''), sub: 'El ' + fl.packet + ' pasa de agente en agente, en el orden numerado, sin que tengas que tocarlo.', bg: 'var(--panel)', border: '1px solid var(--line)' };

  const aprobar = () => { if (m.sim.ph !== 'ask') return; const f2 = flujo(sec, m.sim.f); m.sim.ok = true; m.sim.t = 0; m.sim.ph = m.sim.pi >= f2.path.length - 1 ? 'out' : 'move'; setTick((k) => k + 1); };
  const descartar = () => { if (m.sim.ph !== 'ask') return; m.sim = { f: m.sim.f + 1, pi: 0, ph: 'work', t: 0 }; setDisc((d) => d + 1); };

  const stageTag = asking ? '● esperando tu decisión' : '● ' + sec.l.toLowerCase() + ' · ' + (sec.mode === 'star' ? 'un coordinador reparte' : sec.lanes!.length > 1 ? sec.lanes!.length + ' áreas a la vez' : 'de la búsqueda a la campaña');
  const aria = 'Constelación en 3D de agentes de IA para ' + sec.l + ', con un color por área y el orden del flujo numerado. Cuando hace falta una decisión, el sistema se detiene y espera a la persona.';

  const chips = (
    <div role="group" aria-label="Elige un negocio" class={movil ? 'hsc cn-chips-m' : 'cn-chips'}>
      {SECTORES.map((x, i) => (
        <button type="button" key={x.key} class="chip-s" aria-pressed={i === sector ? 'true' : 'false'} onClick={() => onSector(i)}>{x.l}</button>
      ))}
    </div>
  );
  const panelEl = (
    <div aria-live={asking ? 'polite' : 'off'} class={movil ? 'cn-panel cn-panel-m' : 'cn-panel'} style={`border: ${panel.border}; background: ${panel.bg}`}>
      <span class="cn-k" style={`color: ${panel.kc}`}><span class={panel.dot ? 'waitp' : ''} style={`width: ${movil ? 9 : 10}px; height: ${movil ? 9 : 10}px; border-radius: 99px; background: ${panel.kc}`} />{panel.k}</span>
      <strong class="cn-t">{panel.title}</strong>
      <span class="cn-s">{panel.sub}</span>
      {asking && (
        <div class="pop cn-botones">
          <button type="button" class="ctab cn-aprobar" onClick={aprobar}>Aprobar</button>
          <button type="button" class="cn-descartar" onClick={descartar}>Descartar</button>
        </div>
      )}
    </div>
  );
  const contadores = (
    <div class="cn-cont">
      <span><strong style="color: var(--accent-text)">{done}</strong> {sec.unit}</span>
      <span><strong style="color: var(--fg)">{disc}</strong> {movil ? 'descartados' : 'descartados por ti'}</span>
    </div>
  );
  const brk = (
    <div aria-hidden="true" class={movil ? 'brk brk-m' : 'brk'} style={`left: ${bk.l.toFixed(2)}%; top: ${bk.t.toFixed(2)}%; width: ${bk.w}%; height: ${bk.h}%; --bkc: ${bk.c}`}>
      <span class="bk tl" /><span class="bk tr" /><span class="bk bl" /><span class="bk br" />
    </div>
  );

  if (movil) {
    return (
      <>
        {chips}
        {panelEl}
        <div ref={escena} onPointerDown={down} role="img" aria-label={aria} class="cn-escena cn-escena-m">
          <div aria-hidden="true" class="cn-halo" />
          <svg aria-hidden="true" viewBox={`0 0 1000 ${H0}`} class="cn-svg">{aristas}</svg>
          {pulsos.map((p, k) => <span key={k} aria-hidden="true" class="cn-pulso" style={`left: ${p.x}%; top: ${p.y}%; width: ${p.s}px; height: ${p.s}px; margin: ${-p.s / 2}px 0 0 ${-p.s / 2}px; background: ${p.c}; border: 2px solid ${p.col}`} />)}
          {nodos}
          {brk}
          {sim.ph === 'out' && <span class="cn-out cn-out-m"><span class="pop">✓ {fl.out}</span></span>}
          <span aria-hidden="true" class="cn-arrastra cn-arrastra-m">arrastra para girarla</span>
        </div>
        <div aria-hidden="true" class="cn-leyenda-m">{leyenda}</div>
        {contadores}
      </>
    );
  }

  const ypp = pct(yp);
  return (
    <div class="cn-fila">
      <div class="cn-izq">
        {chips}
        {panelEl}
        {contadores}
      </div>
      <div ref={escena} onPointerDown={down} role="img" aria-label={aria} class="cn-escena">
        <div aria-hidden="true" class="cn-halo" />
        {POLVO.map((q, k) => { const p = proj(q); const c = pct(p); const s = (1.2 + p.d * 2.4).toFixed(1); return <span key={k} aria-hidden="true" class="cn-polvo" style={`left: ${c.x}%; top: ${c.y}%; width: ${s}px; height: ${s}px; opacity: ${(0.16 + p.d * 0.45).toFixed(2)}`} />; })}
        <svg aria-hidden="true" viewBox={`0 0 1000 ${H0}`} class="cn-svg">{aristas}</svg>
        <div aria-hidden="true" class="cn-tu" style={`left: ${ypp.x}%; top: ${ypp.y}%; z-index: ${Math.round(yp.d * 20) + 24}`}>
          <span class="cn-orb1"><span class="orb" style={`border-color: ${asking ? T.accent : dark ? 'rgba(255,91,46,.55)' : 'rgba(184,53,15,.5)'}`} /></span>
          <span class="cn-orb2"><span class="orb2" style={`border-color: ${dark ? 'rgba(255,91,46,.25)' : 'rgba(184,53,15,.25)'}`} /></span>
        </div>
        {pulsos.map((p, k) => <span key={k} aria-hidden="true" class="cn-pulso" style={`left: ${p.x}%; top: ${p.y}%; width: ${p.s}px; height: ${p.s}px; margin: ${-p.s / 2}px 0 0 ${-p.s / 2}px; background: ${p.c}; box-shadow: 0 0 10px 3px ${rgba(p.col, 0.8)}; opacity: ${p.main ? 1 : 0.85}`} />)}
        {nodos}
        {brk}
        {sim.ph === 'out' && <span class="cn-out"><span class="pop">✓ {fl.out}</span></span>}
        <span class="tag solid cn-tag">{stageTag}</span>
        <span aria-hidden="true" class="cn-arrastra">arrástrala para girarla</span>
        <div aria-hidden="true" class="cn-leyenda">{leyenda}</div>
      </div>
    </div>
  );
}

