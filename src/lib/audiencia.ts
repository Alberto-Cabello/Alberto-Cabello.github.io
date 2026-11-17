import { useEffect, useState } from 'preact/hooks';

/** Recorrido de la portada: sin elegir, cliente o empresa. */
export type Modo = 'none' | 'cliente' | 'empresa';
const CLAVE = 'para';

const deParam = (v: string | null): Modo | null =>
  v === 'empresas' ? 'empresa' : v === 'clientes' ? 'cliente' : null;
const aParam = (m: Modo) => (m === 'empresa' ? 'empresas' : 'clientes');

/** Prioridad: ?para= en la URL (y se guarda) > sessionStorage > sin elegir. */
export function modoInicial(): Modo {
  let url: Modo | null = null;
  try { url = deParam(new URLSearchParams(window.location.search).get(CLAVE)); } catch (e) { /* nada */ }
  if (url) {
    try { sessionStorage.setItem(CLAVE, url); } catch (e) { /* nada */ }
    return url;
  }
  try {
    const s = sessionStorage.getItem(CLAVE);
    if (s === 'cliente' || s === 'empresa') return s;
  } catch (e) { /* nada */ }
  return 'none';
}

/** Guarda el recorrido y actualiza la URL para que se pueda compartir. */
export function guardarModo(m: Modo) {
  if (m === 'none') return;
  try { sessionStorage.setItem(CLAVE, m); } catch (e) { /* nada */ }
  try {
    const u = new URL(window.location.href);
    u.searchParams.set(CLAVE, aParam(m));
    history.replaceState(history.state, '', u.pathname + u.search + u.hash);
  } catch (e) { /* nada */ }
}

/** Modo compartido entre la versión de escritorio y la móvil (sobrevive al cambio de versión). */
let actual: Modo | null = null;
const oyentes = new Set<(m: Modo) => void>();

export function useModo(): [Modo, (m: Modo) => void] {
  if (actual === null) actual = modoInicial();
  const [m, setM] = useState<Modo>(actual);
  useEffect(() => {
    oyentes.add(setM);
    return () => { oyentes.delete(setM); };
  }, []);
  const fijar = (n: Modo) => {
    actual = n;
    guardarModo(n);
    oyentes.forEach((f) => f(n));
  };
  return [m, fijar];
}
