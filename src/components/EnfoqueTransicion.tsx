import { useEffect, useRef, useState } from 'preact/hooks';
import { reduceMotion } from '../lib/inView';
import './enfoque.css';

/** Destino, marco y rótulo de cada botón (tabla cfg() de PortadaD2). */
const CFG = {
  casos: { mode: 'lente', scroll: 'casos', frame: 'casos-h', label: '● enfocado · proyectos' },
  perfil: { mode: 'lente', scroll: 'perfil', frame: 'perfil-h', label: '● enfocado · mi perfil' },
  puertas: { mode: 'lente', scroll: 'puertas', frame: 'puertas', label: '● elige tu enfoque' },
  respuesta: { mode: 'lente', frame: 'respuesta', label: '● enfocado' },
  metodo: { mode: 'barrido', scroll: 'metodo', label: '● enfocando · cómo trabajo' },
  contacto: { mode: 'mira', scroll: 'contacto', frame: 'contacto-form', field: 'f-nombre', label: '● enfocado · empieza por tu nombre' },
  rack: { mode: 'rack', label: '● enfocado' },
} as const;

export type ClaveEnfoque = keyof typeof CFG;
type Caja = { l: number; t: number; w: number; h: number };
type Fase = 'out' | 'in' | 'lock' | 'end' | null;
interface Opciones { label?: string; apply?: () => void }

const EASE = 'cubic-bezier(.7,0,.2,1)';
const porId = (id?: string) => (id ? document.getElementById(id) : null);

/**
 * Transiciones de enfoque de la portada: lente, barrido, mira y rack.
 * Devuelve la función para lanzarlas, la capa que las dibuja y la opacidad de la página.
 */
export function useEnfoque() {
  const [tx, setTx] = useState<string | null>(null);
  const [fase, setFase] = useState<Fase>(null);
  const [caja, setCaja] = useState<Caja>({ l: 0, t: 0, w: 0, h: 0 });
  const [rotulo, setRotulo] = useState('');
  const timers = useRef<number[]>([]);

  const limpiar = () => { timers.current.forEach((id) => clearTimeout(id)); timers.current = []; };
  const luego = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)); };
  useEffect(() => limpiar, []);

  const terminar = () => {
    setFase('end');
    luego(() => { setTx(null); setFase(null); }, 480);
  };

  function ir(clave: ClaveEnfoque, el?: Element | null, o: Opciones = {}) {
    const c = CFG[clave] as { mode: string; scroll?: string; frame?: string; field?: string; label: string };
    const aplicar = () => o.apply?.();
    if (reduceMotion()) {
      aplicar();
      setTimeout(() => {
        porId(c.scroll)?.scrollIntoView({ block: 'start' });
        try { porId(c.field)?.focus({ preventScroll: true }); } catch (e) { /* nada */ }
      }, 40);
      return;
    }
    limpiar();
    const W = window.innerWidth, H = window.innerHeight;
    const marco = (r: DOMRect, p: number): Caja => ({ l: Math.round(r.left - p), t: Math.round(r.top - p), w: Math.round(r.width + p * 2), h: Math.round(r.height + p * 2) });
    let inicio: Caja = el ? marco(el.getBoundingClientRect(), 6) : { l: W / 2 - 60, t: H / 2 - 30, w: 120, h: 60 };
    if (c.mode === 'rack') inicio = { l: -40, t: -40, w: W + 80, h: H + 80 };
    setTx(c.mode); setFase('out'); setCaja(inicio); setRotulo(o.label || c.label);

    luego(() => {
      aplicar();
      // Un instante para que se pinte el recorrido nuevo antes de desplazar.
      luego(() => {
        porId(c.scroll)?.scrollIntoView({ block: 'start' });
        luego(() => {
          let fin = inicio;
          if (c.mode === 'rack') fin = { l: 28, t: 96, w: W - 56, h: H - 124 };
          else {
            const fr = porId(c.frame);
            if (fr) {
              const r = fr.getBoundingClientRect();
              const t0 = Math.max(r.top - 14, 92);
              const b0 = Math.min(r.bottom + 14, H - 16);
              const l0 = Math.max(r.left - 14, 8);
              fin = { l: Math.round(l0), t: Math.round(t0), w: Math.round(Math.min(r.right + 14, W - 8) - l0), h: Math.round(Math.max(b0 - t0, 60)) };
            }
          }
          setFase('in'); setCaja(fin);
          if (c.field) {
            luego(() => {
              const f = porId(c.field);
              if (f) {
                setFase('lock'); setCaja(marco(f.getBoundingClientRect(), 8));
                try { f.focus({ preventScroll: true }); } catch (e) { /* nada */ }
              }
              luego(terminar, 1500);
            }, 850);
          } else {
            luego(terminar, c.mode === 'barrido' ? 1150 : 1050);
          }
        }, 60);
      }, 30);
    }, 420);
  }

  const atenuar = fase === 'out' && !!tx && tx !== 'barrido';
  const pagina = {
    opacity: atenuar ? 0.5 : 1,
    transition: fase === 'out' ? 'opacity .4s ease' : 'opacity .9s ease',
  };

  const barrido = tx === 'barrido';
  const capa = (
    <>
      <div
        aria-hidden="true"
        class="velo"
        style={{
          top: barrido && (fase === 'in' || fase === 'end') ? '100%' : '0%',
          opacity: barrido && (fase === 'out' || fase === 'in') ? 1 : 0,
          transition: barrido && fase === 'in' ? `top 1.05s ${EASE}` : 'opacity .3s ease',
        }}
      >
        <span class="velo-linea" />
        <span class="tag solid velo-tag">{rotulo}</span>
      </div>
      <div
        aria-hidden="true"
        class="lente"
        style={{
          left: caja.l + 'px', top: caja.t + 'px', width: caja.w + 'px', height: caja.h + 'px',
          opacity: tx && !barrido && fase !== 'end' ? 1 : 0,
          transition: fase === 'out' ? 'opacity .2s ease'
            : `left .75s ${EASE}, top .75s ${EASE}, width .75s ${EASE}, height .75s ${EASE}, opacity .4s ease`,
        }}
      >
        <span class="lc tl" /><span class="lc tr" /><span class="lc bl" /><span class="lc br" />
        <span class="lente-cruz" style={{ opacity: tx === 'mira' ? 1 : 0 }} />
        <span class="tag solid lente-tag">{rotulo}</span>
      </div>
    </>
  );

  return { ir, capa, pagina };
}
