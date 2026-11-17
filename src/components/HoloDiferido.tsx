import { useEffect, useRef, useState } from 'preact/hooks';
import type { ComponentType } from 'preact';

/** Carga el holograma con import() cuando se acerca a la pantalla; mientras, reserva su hueco. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function HoloDiferido(props: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [C, setC] = useState<ComponentType<any> | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (C || !ref.current) return;
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { io.disconnect(); import('./holo/Holo').then((m) => setC(() => m.Holo)); }
    }, { rootMargin: '600px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  if (C) return <C {...props} />;
  const S = Math.max(160, Number(props.size) || 480);
  return <div ref={ref} aria-hidden="true" style={{ width: S + 'px', height: S + 'px' }} />;
}
