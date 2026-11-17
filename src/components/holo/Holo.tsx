// @ts-nocheck
// Generado desde el tablero Holo y revisado a mano: lógica, textos y estilos tal cual.
import { Fragment } from 'preact';
import { DCLogic, conTema } from '../../lib/dclogic';

import './Holo.css';

class Logica extends DCLogic {

  setup() {
    if (this.shapes) { return; }
    let seed = 20261117;
    const rnd = () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const N = 216;
    const cloud = [], grid = [], sphere = [], radar = [], phase = [], ang = [];
    for (let i = 0; i < N; i++) {
      const r = Math.cbrt(rnd()) * 1.02, th = rnd() * Math.PI * 2, ph = Math.acos(2 * rnd() - 1);
      cloud.push([Math.sin(ph) * Math.cos(th) * r * 1.12, Math.cos(ph) * r * 0.86, Math.sin(ph) * Math.sin(th) * r]);
      phase.push(rnd() * Math.PI * 2);
    }
    for (let yi = 0; yi < 6; yi++) { for (let zi = 0; zi < 6; zi++) { for (let xi = 0; xi < 6; xi++) { grid.push([-0.75 + xi * 0.3, -0.75 + yi * 0.3, -0.75 + zi * 0.3]); } } }
    for (let i = 0; i < N; i++) {
      const y = 1 - (2 * (i + 0.5)) / N, rr = Math.sqrt(1 - y * y), th = i * 2.399963;
      sphere.push([Math.cos(th) * rr * 0.95, y * 0.95, Math.sin(th) * rr * 0.95]);
    }
    const rings = [[0.28, 24], [0.52, 40], [0.76, 56], [1.0, 80]];
    rings.forEach((g, gi) => { for (let j = 0; j < g[1]; j++) { const a = (j / g[1]) * Math.PI * 2 + gi * 0.4; radar.push([Math.cos(a) * g[0], 0, Math.sin(a) * g[0]]); ang.push(a); } });
    for (let j = 0; j < 16; j++) { radar.push([0, 0, 0]); ang.push(0); }
    this.N = N; this.shapes = { cloud, grid, sphere, radar }; this.phase = phase; this.ang = ang;
    this.cur = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) { this.cur[i * 3] = cloud[i][0]; this.cur[i * 3 + 1] = cloud[i][1]; this.cur[i * 3 + 2] = cloud[i][2]; }
    this.chaos = 1; this.pitch = 0.38; this.vel = 0; this.spin = 0; this.dragX = 0; this.dragY = 0; this.t0 = (typeof performance !== 'undefined' ? performance.now() : Date.now());
    this.hid = 'holo' + Math.floor(rnd() * 1e9) + '' + Math.floor(Math.random() * 1e6);
  }
  componentDidMount() {
    this.setup();
    let reduce = false;
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    this.reduce = reduce;
    this.lastY = new WeakMap();
    this.onScroll = (e) => {
      const tg = e && e.target;
      const el = !tg || tg === document ? (document.scrollingElement || document.documentElement) : tg;
      const y = el && typeof el.scrollTop === 'number' ? el.scrollTop : 0;
      const prev = this.lastY.has(el) ? this.lastY.get(el) : y;
      this.lastY.set(el, y);
      this.vel += Math.max(-0.12, Math.min(0.12, (y - prev) * 0.0016));
      if (this.reduce) { this.tick(); }
    };
    this.onWheel = (e) => { this.vel += Math.max(-0.08, Math.min(0.08, (e.deltaY || 0) * 0.0009)); };
    window.addEventListener('scroll', this.onScroll, { capture: true, passive: true });
    try {
      const el = document.querySelector('[data-holo="' + this.hid + '"]');
      if (el) { this.io = new IntersectionObserver((es) => { this.vis = es[0].isIntersecting; }, { rootMargin: '40px' }); this.io.observe(el); }
    } catch (e) {}
    window.addEventListener('wheel', this.onWheel, { passive: true });
    if (!reduce) {
      const loop = (now) => {
        this.raf = requestAnimationFrame(loop);
        if (now - (this.lastF || 0) < 45) { return; }
        this.lastF = now;
        this.tick(now);
      };
      this.raf = requestAnimationFrame(loop);
    } else {
      this.snap = true;
      this.tick();
      this.pollT = setInterval(() => { const k = JSON.stringify(this.cfg()); if (k !== this.lastCfg) { this.lastCfg = k; this.snap = true; this.tick(); } }, 400);
    }
  }
  componentDidUpdate(prev) {
    if (this.reduce && prev && (prev.shape !== this.props.shape || prev.level !== this.props.level || prev.alerts !== this.props.alerts || prev.dark !== this.props.dark)) { this.snap = true; this.tick(); }
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.raf);
    if (this.io) { this.io.disconnect(); }
    clearInterval(this.pollT);
    window.removeEventListener('scroll', this.onScroll, true);
    window.removeEventListener('wheel', this.onWheel);
    if (this.offMove) { this.offMove(); }
  }
  visible() {
    if (this.vis !== undefined) { return this.vis && !document.hidden; }
    try {
      const el = document.querySelector('[data-holo="' + this.hid + '"]');
      if (!el) { return true; }
      const r = el.getBoundingClientRect();
      return r.bottom > -40 && r.top < window.innerHeight + 40 && r.right > 0 && r.left < window.innerWidth;
    } catch (e) { return true; }
  }
  tick(nowArg) {
    const now = nowArg || (typeof performance !== 'undefined' ? performance.now() : Date.now());
    if (!this.reduce && !this.visible()) { return; }
    this.frame = this.compute(now);
    this.setState({ f: ((this.state && this.state.f) || 0) + 1 });
  }
  cfg() {
    const P = Object.assign({}, this.props || {});
    try {
      const el = document.querySelector('[data-holo="' + this.hid + '"]');
      const box = null; // en código, las props llegan normales (sin data-holo-cfg)
      if (box) {
        const d = box.dataset || {};
        if (d.shape) { P.shape = d.shape; }
        if (d.level !== undefined && d.level !== '') { P.level = Number(d.level); }
        if (d.alerts !== undefined && d.alerts !== '') { P.alerts = Number(d.alerts); }
        if (d.pulse !== undefined) { P.pulse = d.pulse === 'true'; }
        if (d.dark !== undefined) { P.dark = d.dark !== 'false'; }
        if (d.lite !== undefined) { P.lite = d.lite === 'true'; }
      }
    } catch (e) {}
    return P;
  }
  compute(now) {
    this.setup();
    const P = this.cfg();
    const dark = P.dark !== undefined ? !!P.dark : true;
    const S = Math.max(160, Number(P.size) || 480);
    const kS = S / 480;
    const shape = P.shape || 'cloud';
    const lite = !!P.lite;
    const level = Math.max(0, Math.min(1, P.level === undefined ? 0.6 : Number(P.level)));
    const tm = this.reduce ? 2.2 : (now - this.t0) / 1000;
    const N = this.N, cur = this.cur, sh = this.shapes;
    const snap = this.reduce || this.snap; this.snap = false;
    const built = Math.round(level * N);
    const k = snap ? 1 : shape === 'build' ? 0.2 : 0.085;
    const chaosT = shape === 'cloud' ? 1 : shape === 'build' ? 1 - level : 0;
    this.chaos = snap ? chaosT : this.chaos + (chaosT - this.chaos) * 0.06;
    const pitchT = shape === 'radar' ? 1.02 : (shape === 'grid' || shape === 'build') ? 0.24 : 0.38;
    this.pitch = snap ? pitchT : this.pitch + (pitchT - this.pitch) * 0.06;
    const sweep = tm * 1.3;
    for (let i = 0; i < N; i++) {
      let tg;
      if (shape === 'grid') { tg = sh.grid[i]; }
      else if (shape === 'sphere') { tg = sh.sphere[i]; }
      else if (shape === 'radar') {
        if (i >= 200) { const rr = (i - 199) / 16; tg = [Math.cos(sweep) * rr, 0, Math.sin(sweep) * rr]; } else { tg = sh.radar[i]; }
      }
      else if (shape === 'build') { tg = i < built ? sh.grid[i] : sh.cloud[i]; }
      else { tg = sh.cloud[i]; }
      const kk = shape === 'radar' && i >= 200 ? 0.5 : k;
      cur[i * 3] += (tg[0] - cur[i * 3]) * kk;
      cur[i * 3 + 1] += (tg[1] - cur[i * 3 + 1]) * kk;
      cur[i * 3 + 2] += (tg[2] - cur[i * 3 + 2]) * kk;
    }
    this.vel *= 0.92;
    if (Math.abs(this.vel) < 0.0002) { this.vel = 0; }
    this.spin += this.vel;
    const yaw = tm * 0.32 + this.spin + this.dragX;
    const pitch = this.pitch + this.dragY;
    const twist = Math.max(-0.9, Math.min(0.9, this.vel * 4));
    const amp = 0.012 + Math.min(0.16, Math.abs(this.vel) * 1.2);
    const pul = P.pulse ? 1 + 0.05 * Math.sin(tm * 7) : 1;
    const R = S * 0.3 * pul, cx = S / 2, cy = S * 0.45;
    const night = { accent: '#FF5B2E', hi: '#FFD9CC', dim: '#7A6A64', warn: '#FFC24B', glow: 'rgba(255,91,46,0.55)', cone: 'rgba(255,91,46,0.14)', ring: 'rgba(255,122,85,0.5)', scan: 'rgba(255,255,255,0.045)', bar: 'rgba(255,91,46,0.12)', fg: '#F2F0EB', solo: '#0B0B0C' };
    const light = { accent: '#B8350F', hi: '#7A2208', dim: '#B7AFA6', warn: '#8A5600', glow: 'rgba(184,53,15,0.28)', cone: 'rgba(184,53,15,0.09)', ring: 'rgba(184,53,15,0.42)', scan: 'rgba(0,0,0,0.035)', bar: 'rgba(184,53,15,0.08)', fg: '#111111', solo: '#F3F1EC' };
    const c = dark ? night : light;
    const nA = Math.max(0, Math.min(4, Number(P.alerts) | 0));
    const alertSet = {};
    [23, 97, 150, 188].slice(0, nA).forEach((x) => { alertSet[x] = true; });
    const cp = Math.cos(pitch), sp = Math.sin(pitch);
    const pts = [];
    for (let i = 0; i < N; i++) {
      if (lite && i % 2 === 1 && i < 200 && !alertSet[i] && i !== 75 && i !== 131) { continue; }
      let x = cur[i * 3], y = cur[i * 3 + 1], z = cur[i * 3 + 2];
      if (this.chaos > 0.01 && !(shape === 'build' && i < built)) {
        const ph = this.phase[i], ch = this.chaos * 0.075;
        x += Math.sin(tm * 0.9 + ph) * ch; y += Math.cos(tm * 0.7 + ph * 1.3) * ch; z += Math.sin(tm * 0.8 + ph * 0.7) * ch;
      }
      x += Math.sin(y * 4 + tm * 2.2) * amp;
      const a = yaw + twist * y;
      const ca = Math.cos(a), sa = Math.sin(a);
      const x1 = x * ca - z * sa, z1 = x * sa + z * ca;
      const y1 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
      const per = 3 / (3 - z2);
      const px = cx + x1 * R * per, py = cy - y1 * R * per;
      const d = Math.max(0, Math.min(1, (z2 + 1) / 2));
      let s = (1.3 + d * 3.3) * kS, o = 0.16 + d * 0.84, col = d > 0.72 ? c.hi : c.accent, g = d > 0.6 ? '0 0 ' + (6 * kS).toFixed(1) + 'px ' + c.glow : 'none';
      if (shape === 'build' && i >= built) { o *= 0.4; col = c.dim; g = 'none'; }
      if (shape === 'radar') {
        if (i >= 200) { o = 0.95; col = c.hi; g = '0 0 ' + (8 * kS).toFixed(1) + 'px ' + c.glow; s *= 1.15; }
        else {
          let diff = (sweep - this.ang[i]) % (Math.PI * 2); if (diff < 0) { diff += Math.PI * 2; }
          const boost = diff < 1.3 ? 1 - diff / 1.3 : 0;
          o = 0.34 + boost * 0.66; col = boost > 0.45 ? c.hi : c.accent;
          if (i === 30 || i === 75 || i === 131 || i === 170) { s *= 1 + boost * 1.6; g = boost > 0.2 ? '0 0 ' + (12 * kS).toFixed(1) + 'px ' + c.glow : g; }
        }
      }
      if (alertSet[i]) { s *= 2.2 * (1 + 0.25 * Math.sin(tm * 6)); o = 1; col = c.warn; g = '0 0 ' + (12 * kS).toFixed(1) + 'px ' + c.warn; }
      if (P.pulse && d > 0.5) { o = Math.min(1, o + 0.12); }
      if (lite) { g = 'none'; s *= 1.25; }
      pts.push({ d, x: px.toFixed(1), y: py.toFixed(1), s: s.toFixed(2), m: (-s / 2).toFixed(2), o: o.toFixed(2), c: col, g });
    }
    pts.sort((p, q) => p.d - q.d);
    const ringO = shape === 'radar' ? 0.18 : 0.55;
    const wA = R * 2.55, wB = R * 2.2;
    const rings = [
      { l: (cx - wA / 2).toFixed(1), t: (cy - wA / 2).toFixed(1), w: wA.toFixed(1), a: (tm * 18) % 360, sy: 0.24, o: ringO },
      { l: (cx - wB / 2).toFixed(1), t: (cy - wB / 2).toFixed(1), w: wB.toFixed(1), a: (70 - tm * 12) % 360, sy: 0.17, o: ringO * 0.8 }
    ];
    const bw = S * 0.56, bh = S * 0.1, by = S * 0.86;
    const sweepY = ((tm * 0.42) % 1);
    let flick = 0.95 + 0.05 * Math.sin(tm * 31) * Math.sin(tm * 7.3);
    if (!this.reduce && Math.random() < 0.012) { flick = 0.72; }
    if (lite) { flick = 1; }
    const labels = { cloud: 'Holograma de datos: una nube de puntos desordenada que flota y se mueve sin forma', build: 'Holograma de datos: los puntos sueltos encajan uno a uno en una estructura ordenada, de abajo arriba', grid: 'Holograma de datos: una estructura de puntos ordenada en cubo', sphere: 'Holograma de datos: una esfera de puntos que representa la documentación', radar: 'Holograma de datos: un radar circular con un barrido que ilumina oportunidades' };
    return {
      lite, S, c, pts, rings, flick: this.reduce ? 1 : flick.toFixed(3),
      cone: { l: (cx - S * 0.42).toFixed(1), t: (S * 0.1).toFixed(1), w: (S * 0.84).toFixed(1), h: (by - S * 0.1 + bh / 2).toFixed(1) },
      base: { l: (cx - bw / 2).toFixed(1), t: (by - bh / 2).toFixed(1), w: bw.toFixed(1), h: bh.toFixed(1) },
      base2: { l: (cx - bw * 0.36).toFixed(1), t: (by - bh * 0.36).toFixed(1), w: (bw * 0.72).toFixed(1), h: (bh * 0.72).toFixed(1) },
      bar: { l: (S * 0.12).toFixed(1), w: (S * 0.76).toFixed(1), t: (cy - R * 1.3 + sweepY * R * 2.6).toFixed(1), h: (S * 0.08).toFixed(1) },
      aria: (labels[shape] || labels.cloud) + (nA ? ', con ' + nA + (nA === 1 ? ' alerta' : ' alertas') : '')
    };
  }
  renderVals() {
    this.setup();
    const P = this.props || {};
    const f = this.frame || this.compute(typeof performance !== 'undefined' ? performance.now() : Date.now());
    if (!this.frame) { this.frame = f; }
    const backdrop = P.backdrop === undefined ? true : !!P.backdrop;
    return {
      hid: this.hid, S: f.S, c: f.c, pts: f.pts, rings: f.rings, cone: f.cone, base: f.base, base2: f.base2, bar: f.bar,
      flick: f.flick, aria: f.aria, baseShadow: f.lite ? 'none' : '0 0 26px ' + f.c.glow + ', inset 0 0 18px ' + f.c.glow,
      bg: backdrop ? f.c.solo : 'transparent',
      frame: P.frame === undefined ? true : !!P.frame,
      fi: Math.round(f.S * 0.035),
      cursor: (this.state && this.state.grab) ? 'grabbing' : 'grab',
      down: (e) => {
        if (!e) { return; }
        this.drag = { x: e.clientX, y: e.clientY };
        const mv = (ev) => {
          if (!this.drag) { return; }
          const dx = ev.clientX - this.drag.x, dy = ev.clientY - this.drag.y;
          this.drag = { x: ev.clientX, y: ev.clientY };
          this.dragX += dx * 0.012;
          this.dragY = Math.max(-0.6, Math.min(0.6, this.dragY + dy * 0.008));
          this.vel += dx * 0.0003;
          if (this.reduce) { this.tick(); }
        };
        const up = () => { this.drag = null; if (this.offMove) { this.offMove(); } this.setState({ grab: false }); };
        if (this.offMove) { this.offMove(); }
        window.addEventListener('pointermove', mv);
        window.addEventListener('pointerup', up);
        window.addEventListener('pointercancel', up);
        this.offMove = () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up); this.offMove = null; };
        this.setState({ grab: true });
      }
    };
  }

  render() {
    const v = this.renderVals();
    return (
      <>
<div data-holo={v.hid} role="img" aria-label={v.aria} onPointerDown={v.down} style={`position: relative; width: ${v.S}px; height: ${v.S}px; overflow: hidden; touch-action: pan-y; cursor: ${v.cursor}; user-select: none; -webkit-user-select: none; background: ${v.bg}; font-family: 'IBM Plex Mono', ui-monospace, monospace; color: ${v.c.fg}; opacity: ${v.flick}`}>
<div aria-hidden="true" style={`position: absolute; left: ${v.cone.l}px; top: ${v.cone.t}px; width: ${v.cone.w}px; height: ${v.cone.h}px; clip-path: polygon(21% 100%, 79% 100%, 100% 0, 0 0); background: linear-gradient(to top, ${v.c.cone}, transparent 88%); pointer-events: none`}></div>
<div aria-hidden="true" style={`position: absolute; left: ${v.base.l}px; top: ${v.base.t}px; width: ${v.base.w}px; height: ${v.base.h}px; border-radius: 50%; border: 2px solid ${v.c.accent}; box-shadow: ${v.baseShadow}; box-sizing: border-box`}></div>
<div aria-hidden="true" style={`position: absolute; left: ${v.base2.l}px; top: ${v.base2.t}px; width: ${v.base2.w}px; height: ${v.base2.h}px; border-radius: 50%; background: ${v.c.cone}; border: 1px dashed ${v.c.ring}; box-sizing: border-box`}></div>
{(v.rings).map((r: any, r_i: number) => (<Fragment key={r_i}>
<div aria-hidden="true" style={`position: absolute; left: ${r.l}px; top: ${r.t}px; width: ${r.w}px; height: ${r.w}px; border-radius: 50%; border: 1.5px dashed ${v.c.ring}; box-sizing: border-box; transform: rotate(${r.a}deg) scaleY(${r.sy}); opacity: ${r.o}`}></div>
</Fragment>))}
{(v.pts).map((p: any, p_i: number) => (<Fragment key={p_i}>
<span aria-hidden="true" style={`position: absolute; left: ${p.x}px; top: ${p.y}px; width: ${p.s}px; height: ${p.s}px; margin: ${p.m}px 0 0 ${p.m}px; border-radius: 50%; background: ${p.c}; opacity: ${p.o}; box-shadow: ${p.g}`}></span>
</Fragment>))}
<div aria-hidden="true" style={`position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(0deg, ${v.c.scan} 0 1px, transparent 1px 4px); -webkit-mask-image: radial-gradient(circle at 50% 45%, #000 0 40%, transparent 64%); mask-image: radial-gradient(circle at 50% 45%, #000 0 40%, transparent 64%)`}></div>
<div aria-hidden="true" style={`position: absolute; left: ${v.bar.l}px; width: ${v.bar.w}px; top: ${v.bar.t}px; height: ${v.bar.h}px; pointer-events: none; background: linear-gradient(to bottom, transparent, ${v.c.bar}, transparent)`}></div>
{(v.frame) && (<>
<span aria-hidden="true" style={`position: absolute; left: ${v.fi}px; top: ${v.fi}px; width: 22px; height: 22px; border-left: 2px solid ${v.c.accent}; border-top: 2px solid ${v.c.accent}`}></span>
<span aria-hidden="true" style={`position: absolute; right: ${v.fi}px; top: ${v.fi}px; width: 22px; height: 22px; border-right: 2px solid ${v.c.accent}; border-top: 2px solid ${v.c.accent}`}></span>
<span aria-hidden="true" style={`position: absolute; left: ${v.fi}px; bottom: ${v.fi}px; width: 22px; height: 22px; border-left: 2px solid ${v.c.accent}; border-bottom: 2px solid ${v.c.accent}`}></span>
<span aria-hidden="true" style={`position: absolute; right: ${v.fi}px; bottom: ${v.fi}px; width: 22px; height: 22px; border-right: 2px solid ${v.c.accent}; border-bottom: 2px solid ${v.c.accent}`}></span>
</>)}
</div>

      </>
    );
  }
}

export const Holo = conTema(Logica);
