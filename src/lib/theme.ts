import { useEffect, useState } from 'preact/hooks';

export type Tema = 'dark' | 'light';
const CLAVE = 'tema';

export function temaActual(): Tema {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

export function fijarTema(t: Tema) {
  document.documentElement.setAttribute('data-theme', t);
  try { localStorage.setItem(CLAVE, t); } catch (e) { /* sin almacenamiento: solo esta visita */ }
  window.dispatchEvent(new CustomEvent('tema', { detail: t }));
}

/** Modo actual y función para alternarlo. El modo vive en <html data-theme>. */
export function useTema(): [Tema, () => void] {
  const [tema, setTema] = useState<Tema>(temaActual);
  useEffect(() => {
    const on = () => setTema(temaActual());
    window.addEventListener('tema', on);
    // Otra pestaña cambió el modo.
    const onStorage = (e: StorageEvent) => {
      if (e.key === CLAVE && (e.newValue === 'light' || e.newValue === 'dark')) {
        document.documentElement.setAttribute('data-theme', e.newValue);
        on();
      }
    };
    window.addEventListener('storage', onStorage);
    return () => { window.removeEventListener('tema', on); window.removeEventListener('storage', onStorage); };
  }, []);
  return [tema, () => fijarTema(tema === 'dark' ? 'light' : 'dark')];
}
