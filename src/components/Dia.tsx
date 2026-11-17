import { useEffect, useRef, useState } from 'preact/hooks';
import { reduceMotion, useEnPantalla } from '../lib/inView';
import { miles } from '../lib/format';
import { DIAS, SECTORES, YO, aleatorio } from '../pages/caso-agentes/datos';
import './dia.css';

const RT = [5.5, 11.5];
const STOPS: [number, string, string][] = [[0, '#3A2A48', '#C8693E'], [1.6, '#22364E', '#4E6F8C'], [7, '#203A55', '#58809E'], [10.3, '#2C2642', '#C0662F'], [11.8, '#161428', '#3A2440'], [14, '#06070C', '#0C0E18']];
const repWindow = (H: number) => { for (let i = 0; i < RT.length; i++) if (H >= RT[i] && H < RT[i] + 1.4) return i; return -1; };
const hx = (x: number) => { const tot = Math.round(x * 60); return String(8 + Math.floor(tot / 60)).padStart(2, '0') + ':' + String(tot % 60).padStart(2, '0'); };
const mix = (a: string, b: string, k: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16)), pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return '#' + pa.map((v, i) => Math.round(v + (pb[i] - v) * k).toString(16).padStart(2, '0')).join('');
};

// Estrellas y edificios fijos (semilla 7): 40 y 16 en escritorio, 14 y 10 en móvil.
const ESC = (() => {
  const rnd = aleatorio(7);
  for (let i = 0; i < 70; i++) { rnd(); rnd(); rnd(); } // el tablero de escritorio consume antes el polvo de la constelación
  const stars = Array.from({ length: 40 }, () => ({ x: (rnd() * 96 + 2).toFixed(1), y: (rnd() * 62 + 2).toFixed(1), s: (1 + rnd() * 2).toFixed(1), ph: rnd() * 6.28 }));
  const sky = Array.from({ length: 16 }, (_, i) => ({ f: (0.6 + rnd() * 1.4).toFixed(2), h: Math.round(28 + rnd() * 62), me: i === 11 }));
  return { stars, sky };
})();
const MOV = (() => {
  const rnd = aleatorio(7);
  const stars = Array.from({ length: 14 }, () => ({ x: (rnd() * 94 + 3).toFixed(1), y: (rnd() * 50 + 3).toFixed(1), s: (1 + rnd() * 1.6).toFixed(1), b: 0.4 + rnd() * 0.5 }));
  const sky = Array.from({ length: 10 }, (_, i) => ({ f: (0.6 + rnd() * 1.4).toFixed(2), h: Math.round(30 + rnd() * 60), me: i === 7 }));
  return { stars, sky };
})();

/** Jornada de 14 h con los agentes trabajando e informes a las 5,5 h y 11,5 h (ahí el tiempo va más lento). */
export default function Dia({ sector, movil = false }: { sector: number; movil?: boolean }) {
  const sec = SECTORES[sector];
  const caja = useRef<HTMLDivElement>(null);
  const activo = useEnPantalla(caja, '0px');
  const [, setTick] = useState(0);
  const m = useRef({ day: 0, hold: 0, last: performance.now(), lastF: 0, decided: {} as Record<string, boolean> }).current;
  const reduce = reduceMotion();

  useEffect(() => { m.decided = {}; setTick((k) => k + 1); }, [sector]);

  useEffect(() => {
    if (!activo || reduce) return;
    m.last = performance.now();
    let raf = 0;
    const paso = movil ? 60 : 45;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - m.lastF < paso) return;
      m.lastF = now;
      const rawDt = (now - m.last) / 1000; m.last = now;
      if (now > m.hold) {
        const H = Math.min(14, m.day / 60);
        const speed = repWindow(H) >= 0 ? 9 : 36;
        const prev = m.day;
        m.day = (m.day + Math.min(0.5, rawDt) * speed) % 1000;
        if (movil) { if (m.day > 840) { m.day = 0; m.decided = {}; } }
        else if (m.day < prev) m.decided = {};
      }
      setTick((k) => (k + 1) % 100000);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [activo, movil]);

  const D = DIAS[sec.key];
  const dm = Math.min(840, m.day);
  const H = dm / 60;
  const clock = String(8 + Math.floor(H)).padStart(2, '0') + ':' + String(Math.floor(dm % 60)).padStart(2, '0');
  let sky = { top: STOPS[0][1], bot: STOPS[0][2] };
  for (let i = 0; i < STOPS.length - 1; i++) { const a = STOPS[i], b = STOPS[i + 1]; if (H >= a[0] && H <= b[0]) { const k = (H - a[0]) / (b[0] - a[0]); sky = { top: mix(a[1], b[1], k), bot: mix(a[2], b[2], k) }; } }
  const darkness = H < 11 ? 0 : Math.min(1, (H - 11) / 1.6);
  const tmS = performance.now() / 1000;
  const spp = Math.min(1, H / 11.2);
  const sun = movil
    ? { x: 12 + spp * 76, y: 62 - Math.sin(spp * Math.PI) * 46 }
    : { x: 10 + spp * 80, y: 72 - Math.sin(spp * Math.PI) * 56 };
  const sunO = H < 10.6 ? 1 : Math.max(0, 1 - (H - 10.6) * 1.6);
  const moonO = Math.max(0, Math.min(1, (H - 11.6) * 1.5));
  const past = D.ev.filter((e) => e[0] <= H);
  const feed = past.slice(movil ? -3 : -4);
  const nDone = past.reduce((a, e) => a + e[3], 0);
  let meNow = YO[0];
  YO.forEach((x) => { if (x[0] <= H) meNow = x; });
  const ri = repWindow(H);
  const reached = RT.filter((x) => H >= x).length;
  const nDec = Object.keys(m.decided).length;
  const evening = H >= 12.4;
  const winC = evening ? '#FFC98A' : '#141418';
  const tlPct = ((dm / 840) * 100).toFixed(2);

  const onDay = (e: Event) => { m.day = Number((e.currentTarget as HTMLInputElement).value); m.hold = performance.now() + 7000; setTick((k) => k + 1); };
  const decidir = (key: string) => { m.decided = { ...m.decided, [key]: true }; m.hold = performance.now() + 2500; setTick((k) => k + 1); };

  const informe = ri >= 0 && (() => {
    const R = D.rep[ri];
    return (
      <div class={movil ? 'pop dia-rep dia-rep-m' : 'pop dia-rep'}>
        <span class="dia-rep-cab"><span style="color: #FF9A6B">{hx(RT[ri])} · {R[0]}</span><span style={`opacity: ${movil ? 0.75 : 0.7}`}>te llega al móvil</span></span>
        <strong class="dia-rep-sum">{R[1]}</strong>
        {R[2].map((q, qi) => {
          const key = sec.key + ri + '-' + qi; const ok = !!m.decided[key];
          return (
            <div key={key} class="dia-rep-item">
              <span>{q}</span>
              <button type="button" onClick={() => decidir(key)} style={`background: ${ok ? 'rgba(244,239,230,.15)' : '#FF5B2E'}; color: ${ok ? '#F4EFE6' : '#0B0B0C'}`}>{ok ? '✓ Decidido' : 'Aprobar'}</button>
            </div>
          );
        })}
      </div>
    );
  })();

  const ticks = [
    ...D.ev.map((e) => ({ x: (e[0] / 14) * 100, top: 4, s: 10, c: e[0] <= H ? '#FF5B2E' : movil ? 'rgba(244,239,230,.5)' : 'rgba(244,239,230,.45)' })),
    ...YO.map((x) => ({ x: (x[0] / 14) * 100, top: 5, s: 8, c: x[0] <= H ? '#F4EFE6' : movil ? 'rgba(244,239,230,.3)' : 'rgba(244,239,230,.25)' })),
    ...RT.map((x) => ({ x: (x / 14) * 100, top: 0, s: 18, c: x <= H ? '#FFFFFF' : movil ? 'rgba(255,255,255,.45)' : 'rgba(255,255,255,.4)' })),
  ];
  const linea = (
    <div class={movil ? 'tl tl-m' : 'tl'}>
      <div aria-hidden="true" class="tl-base" />
      <div aria-hidden="true" class="tl-hecho" style={`width: ${tlPct}%`} />
      {ticks.map((k, i) => <span key={i} aria-hidden="true" class="tl-tick" style={`left: ${k.x.toFixed(2)}%; top: ${k.top}px; width: ${k.s}px; height: ${k.s}px; margin-left: ${-k.s / 2}px; background: ${k.c}`} />)}
      <span aria-hidden="true" class="knob" style={`left: ${tlPct}%`} />
      <span aria-hidden="true" class="tl-l">08:00</span>
      <span aria-hidden="true" class="tl-c">○ tú · ● agentes · ◉ informe</span>
      <span aria-hidden="true" class="tl-r">22:00</span>
      <input type="range" min="0" max="840" value={Math.round(dm)} onInput={onDay} onChange={onDay} aria-label="Hora del día" aria-valuetext={clock} />
    </div>
  );
  const fondo = movil ? MOV : ESC;

  const feedEl = feed.map((e, i, arr) => {
    const last = i === arr.length - 1;
    return (
      <div key={e[1] + e[0]} class={movil ? 'dia-ev dia-ev-m' : 'evt dia-ev'} style={movil
        ? `background: ${last ? 'rgba(60,24,14,.9)' : 'rgba(11,11,12,.7)'}; border-color: ${last ? 'rgba(255,91,46,.6)' : 'rgba(244,239,230,.12)'}; opacity: ${(0.7 + 0.3 * ((i + 1) / arr.length)).toFixed(2)}`
        : `background: ${last ? 'rgba(60,24,14,.88)' : 'rgba(11,11,12,.66)'}; border-color: ${last ? 'rgba(255,91,46,.6)' : 'rgba(244,239,230,.12)'}; opacity: ${(0.6 + 0.4 * ((i + 1) / arr.length)).toFixed(2)}`}>
        <span class="dia-ev-h">{hx(e[0])}</span>
        <span class="dia-ev-t"><strong style={`color: ${last ? '#FF9A6B' : movil ? 'rgba(244,239,230,.9)' : 'rgba(244,239,230,.85)'}`}>{e[1]}</strong><span>{e[2]}</span></span>
      </div>
    );
  });

  const decor = (
    <>
      {fondo.stars.map((st, i) => {
        const o = movil ? darkness * (st as { b: number }).b : darkness * (0.35 + 0.5 * (0.5 + 0.5 * Math.sin(tmS * 1.7 + (st as { ph: number }).ph)));
        return <span key={i} aria-hidden="true" class="dia-est" style={`left: ${st.x}%; top: ${st.y}%; width: ${st.s}px; height: ${st.s}px; opacity: ${o.toFixed(2)}`} />;
      })}
      <span aria-hidden="true" class={movil ? 'dia-sol dia-sol-m' : 'dia-sol'} style={`left: ${sun.x.toFixed(1)}%; top: ${sun.y.toFixed(1)}%; opacity: ${sunO}`} />
      <span aria-hidden="true" class={movil ? 'dia-luna dia-luna-m' : 'dia-luna'} style={`opacity: ${moonO}`} />
      <div aria-hidden="true" class={movil ? 'dia-ciudad dia-ciudad-m' : 'dia-ciudad'}>
        {fondo.sky.map((b, i) => (
          <span key={i} style={`flex: ${b.f}; height: ${b.h}%`}>
            {b.me && <span class="dia-ventana" style={`background: ${winC}; box-shadow: ${!movil && evening ? '0 0 10px 2px rgba(255,201,138,.6)' : 'none'}`} />}
          </span>
        ))}
      </div>
    </>
  );

  if (movil) {
    return (
      <>
        <div ref={caja} class="dia dia-m" style={`background: linear-gradient(to bottom, ${sky.top}, ${sky.bot})`}>
          {decor}
          <div class="dia-m-in">
            <div class="dia-m-cab">
              <strong class="dia-reloj dia-reloj-m">{clock}</strong>
              <span class="dia-m-cont"><span><strong>{miles(nDone)}</strong> tareas de agentes</span><span><strong style="color: #FF9A6B">{reached * 3 + nDec * 2}</strong> min tuyos</span></span>
            </div>
            <div class="dia-yo dia-yo-m">
              <span class="dia-yo-k">TÚ, AHORA MISMO</span>
              <strong>{meNow[1]}</strong>
              <span class="dia-yo-s">{meNow[2]}</span>
            </div>
            <div role="log" aria-live="off" class="dia-feed dia-feed-m">
              <span class="dia-feed-k">TUS AGENTES, MIENTRAS TANTO · EJEMPLO</span>
              {feedEl}
            </div>
            {linea}
          </div>
        </div>
        {informe && <div aria-live="polite" style="margin-top: 10px">{informe}</div>}
      </>
    );
  }

  return (
    <div ref={caja} class="dia" style={`background: linear-gradient(to bottom, ${sky.top}, ${sky.bot})`}>
      {decor}
      <div class="dia-izq">
        <strong class="dia-reloj">{clock}</strong>
        <div class="dia-yo">
          <span class="dia-yo-k">TÚ, AHORA MISMO</span>
          <strong key={meNow[1]} class="evt">{meNow[1]}</strong>
          <span class="dia-yo-s">{meNow[2]}</span>
        </div>
        <div class="dia-cont"><span><strong>{miles(nDone)}</strong> tareas hechas por agentes</span><span><strong style="color: #FF9A6B">{reached * 3 + nDec * 2}</strong> min tuyos</span></div>
      </div>
      <div role="log" aria-live="off" class="dia-feed">
        <span class="dia-feed-k">TUS AGENTES, MIENTRAS TANTO · EJEMPLO ILUSTRATIVO</span>
        {feedEl}
      </div>
      {informe && <div class="dia-rep-pos">{informe}</div>}
      {linea}
    </div>
  );
}
