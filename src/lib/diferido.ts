import { useEffect, useState } from 'preact/hooks';
import type { ComponentType, RefObject } from 'preact';

/** Carga un componente con import() cuando su sección se acerca a la pantalla. */
export function useDiferido<P>(cargar: () => Promise<{ default: ComponentType<P> }>, ref: RefObject<Element | null>, margen = '800px') {
  const [C, setC] = useState<ComponentType<P> | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || C) return;
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) {
        io.disconnect();
        cargar().then((m) => setC(() => m.default));
      }
    }, { rootMargin: margen });
    io.observe(el);
    return () => io.disconnect();
  }, [ref.current]);
  return C;
}
