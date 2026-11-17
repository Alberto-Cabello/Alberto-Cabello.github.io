import { useEffect, useState } from 'preact/hooks';

/** Corte entre escritorio y móvil (el que ya usa la portada de escritorio). */
export const CONSULTA_MOVIL = '(max-width: 760px)';

export function esMovil(): boolean {
  try { return window.matchMedia(CONSULTA_MOVIL).matches; } catch (e) { return false; }
}

/** true en móvil. Al girar o cambiar el tamaño se cambia de versión. */
export function useEsMovil(): boolean {
  const [m, setM] = useState(esMovil);
  useEffect(() => {
    const mq = window.matchMedia(CONSULTA_MOVIL);
    const on = () => setM(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return m;
}
