import { useEffect, useState } from 'preact/hooks';
import type { RefObject } from 'preact';

export function reduceMotion(): boolean {
  try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; }
}

/** Se vuelve true una sola vez cuando el elemento entra en la franja indicada. */
export function useVisto(ref: RefObject<Element | null>, rootMargin = '0px', activo = true): boolean {
  const [visto, setVisto] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || visto || !activo) return;
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { setVisto(true); io.disconnect(); }
    }, { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref.current, visto, activo, rootMargin]);
  return visto;
}

/** true mientras el elemento está en pantalla (con 50 px de margen) y la pestaña visible. */
export function useEnPantalla(ref: RefObject<Element | null>, rootMargin = '50px'): boolean {
  const [dentro, setDentro] = useState(true);
  const [visible, setVisible] = useState(() => !document.hidden);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => setDentro(es[0].isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref.current, rootMargin]);
  useEffect(() => {
    const on = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', on);
    return () => document.removeEventListener('visibilitychange', on);
  }, []);
  return dentro && visible;
}

/**
 * Pausa las animaciones de un bloque fuera de pantalla o con la pestaña oculta:
 * clase .paused para CSS y pauseAnimations() para los SVG animados con SMIL.
 * Con movimiento reducido, los SVG se quedan parados.
 */
export function usePausa(ref: RefObject<HTMLElement | null>): string {
  const activo = useEnPantalla(ref);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parar = !activo || reduceMotion();
    el.querySelectorAll('svg').forEach((s) => {
      const svg = s as SVGSVGElement;
      if (typeof svg.pauseAnimations !== 'function') return;
      if (parar) svg.pauseAnimations();
      else svg.unpauseAnimations();
    });
  });
  return activo ? '' : 'paused';
}
