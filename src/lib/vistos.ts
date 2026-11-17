import { useEffect, useRef, useState } from 'preact/hooks';

/**
 * Observa los elementos con [data-seen] (como en los tableros) y devuelve:
 * - vistos: claves que ya han entrado en la franja (se quedan en true)
 * - enPantalla: ref con las claves visibles ahora mismo (para pausar los temporizadores)
 */
export function useVistos(rootMargin: string) {
  const [vistos, setVistos] = useState<Record<string, boolean>>({});
  const enPantalla = useRef<Record<string, boolean>>({});
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-seen]'));
    const io = new IntersectionObserver((es) => {
      const nuevos: Record<string, boolean> = {};
      es.forEach((e) => { if (e.isIntersecting) nuevos[(e.target as HTMLElement).dataset.seen!] = true; });
      if (Object.keys(nuevos).length) setVistos((v) => ({ ...v, ...nuevos }));
    }, { rootMargin });
    const io2 = new IntersectionObserver((es) => {
      es.forEach((e) => { enPantalla.current[(e.target as HTMLElement).dataset.seen!] = e.isIntersecting; });
    });
    els.forEach((el) => { io.observe(el); io2.observe(el); });
    return () => { io.disconnect(); io2.disconnect(); };
  }, []);
  return { vistos, enPantalla };
}

/** Intervalo que no corre con la pestaña oculta. */
export function useIntervalo(fn: () => void, ms: number, activo = true) {
  const f = useRef(fn);
  f.current = fn;
  useEffect(() => {
    if (!activo) return;
    const id = setInterval(() => { if (!document.hidden) f.current(); }, ms);
    return () => clearInterval(id);
  }, [ms, activo]);
}
