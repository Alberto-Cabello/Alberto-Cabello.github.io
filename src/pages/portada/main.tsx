import { render } from 'preact';
import { useEffect } from 'preact/hooks';
import '../../styles/fuentes';
import '../../styles/tokens.css';
import '../../styles/base.css';
import './portada.css';
import { useEsMovil } from '../../lib/vista';
import { useModo } from '../../lib/audiencia';
import { Desktop } from './Desktop';
import { Mobile } from './Mobile';

/** Llegar con un ancla desde otra página: desplaza sin transición y, en #contacto, foco en Nombre. */
function useAnclaInicial() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ block: 'start' });
      if (id === 'contacto' || id === 'contacto-form') {
        try { document.getElementById('f-nombre')?.focus({ preventScroll: true }); } catch (e) { /* nada */ }
      }
    }, 60);
    return () => clearTimeout(t);
  }, []);
}

/** Monta solo una de las dos versiones; el recorrido elegido se conserva al cambiar. */
function Portada() {
  const movil = useEsMovil();
  const [modo, setModo] = useModo();
  useAnclaInicial();
  return movil ? <Mobile modo={modo} setModo={setModo} /> : <Desktop modo={modo} setModo={setModo} />;
}

render(<Portada />, document.getElementById('app')!);
