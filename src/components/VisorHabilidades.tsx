import { useEffect, useRef, useState } from 'preact/hooks';
import { reduceMotion, useEnPantalla } from '../lib/inView';
import './habilidades.css';

/** 10 habilidades con su prueba: rotan cada 3,2 s, se pausan con el botón y se paran 9 s al elegir una. */
export function VisorHabilidades({ datos, movil = false }: { datos: [string, string][]; movil?: boolean }) {
  const [sk, setSk] = useState(0);
  const [pausado, setPausado] = useState(false);
  const espera = useRef(0);
  const caja = useRef<HTMLDivElement>(null);
  const activo = useEnPantalla(caja, '0px');

  useEffect(() => {
    if (pausado || !activo || reduceMotion()) return;
    const id = setInterval(() => {
      if (Date.now() < espera.current) return;
      setSk((n) => (n + 1) % datos.length);
    }, 3200);
    return () => clearInterval(id);
  }, [pausado, activo, datos.length]);

  const n = String(sk + 1).padStart(2, '0');
  const boton = (
    <button type="button" class="sk-pausa" onClick={() => setPausado(!pausado)} aria-pressed={pausado ? 'true' : 'false'}>
      {pausado ? 'Reanudar' : 'Pausar'}
    </button>
  );
  const pila = (
    <div class="sk-pila">
      {datos.map(([nombre, prueba], i) => {
        const on = i === sk;
        return (
          <div class={on ? 'skf on' : 'skf'} aria-hidden={on ? 'false' : 'true'} key={nombre}>
            <strong>{nombre}</strong>
            <span>{prueba}</span>
          </div>
        );
      })}
    </div>
  );
  const grupo = (
    <div role="group" aria-label="Habilidades" class="sk-grupo">
      {datos.map(([nombre], i) => (
        <button
          type="button"
          key={nombre}
          class={i === sk ? 'tag skb' : 'tag skb off'}
          aria-pressed={i === sk ? 'true' : 'false'}
          onClick={() => { setSk(i); espera.current = Date.now() + 9000; }}
        >
          {nombre}
        </button>
      ))}
    </div>
  );

  if (movil) {
    return (
      <div ref={caja} class="sk sk-m">
        <span class="sk-cab">
          <span class="sk-cont">Cómo soy trabajando · {n} / 10</span>
          {boton}
        </span>
        {pila}
        {grupo}
      </div>
    );
  }
  return (
    <div ref={caja} class="sk">
      <div class="sk-izq">
        <span class="sk-cab">
          <span class="sk-cont">● enfocado · {n} / 10</span>
          {boton}
        </span>
        {pila}
      </div>
      {grupo}
    </div>
  );
}
