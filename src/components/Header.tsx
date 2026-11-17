import type { ComponentChildren } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { BotonModo, IconoModo } from './BotonModo';
import { useTema } from '../lib/theme';
import './header.css';

export type Destino = 'casos' | 'metodo' | 'contacto' | 'puertas';

export interface PildoraProps {
  /** visitante, cliente o empresa */
  quien: string;
  /** elegir o cambiar */
  accion: string;
  aria: string;
  onClick?: (e: MouseEvent) => void;
}

interface PortadaProps {
  pildora: PildoraProps;
  /** Texto del botón principal: «Cuéntame tu idea» o «Hablemos de un puesto». */
  ctaCorto: string;
  /** Navegación con transición; si no se da, el enlace hace su salto normal. */
  onIr?: (destino: Destino, e: MouseEvent) => void;
}

const Logo = () => (
  <>
    Alberto Cabello<span class="acento">.</span>
  </>
);

/** Cabecera de la portada en escritorio: nombre, «viendo como», navegación, botón principal y modo. */
export function HeaderPortada({ pildora, ctaCorto, onIr }: PortadaProps) {
  const ir = (d: Destino) => (e: MouseEvent) => onIr?.(d, e);
  return (
    <div class="hdr">
      <header class="hdr-in">
        <div class="hdr-izq">
          <a href="#top" class="logo">
            <Logo />
          </a>
          <button type="button" class="pill" onClick={pildora.onClick} aria-label={pildora.aria}>
            <span class="pdot" aria-hidden="true" />
            <span class="pk">viendo como</span>
            <strong>{pildora.quien}</strong>
            <span class="act">
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 8h13l-3-3 M20 16H7l3 3" />
              </svg>
              {pildora.accion}
            </span>
          </button>
        </div>
        <nav aria-label="Principal" class="hdr-nav">
          <a href="#casos" onClick={ir('casos')} class="navx">Proyectos</a>
          <a href="#metodo" onClick={ir('metodo')} class="navx">Cómo trabajo</a>
          <a href="#contacto" onClick={ir('contacto')} class="hdr-cta">{ctaCorto}</a>
          <BotonModo />
        </nav>
      </header>
    </div>
  );
}

/** Cabecera de la portada en móvil: nombre, píldora corta y menú desplegable. */
export function HeaderPortadaMovil({ pildora, ctaCorto, onIr }: PortadaProps) {
  const [abierto, setAbierto] = useState(false);
  const [tema, alternar] = useTema();
  const boton = useRef<HTMLButtonElement>(null);
  const primero = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (abierto) primero.current?.focus();
  }, [abierto]);

  const cerrar = (devolverFoco = false) => {
    setAbierto(false);
    if (devolverFoco) boton.current?.focus();
  };
  const ir = (d: Destino) => (e: MouseEvent) => {
    cerrar();
    onIr?.(d, e);
  };

  return (
    <div class="hdr">
      <header class="hdr-in-m">
        <a href="#top" class="logo logo-m">
          <Logo />
        </a>
        <div class="hdr-der-m">
          <button type="button" class="pill-m" onClick={pildora.onClick} aria-label={pildora.aria}>
            <span class="pdot" aria-hidden="true" />
            <strong>{pildora.quien}</strong>
          </button>
          <button
            type="button"
            ref={boton}
            class="boton-modo"
            onClick={() => setAbierto(!abierto)}
            aria-expanded={abierto ? 'true' : 'false'}
            aria-controls="menu-movil"
            aria-label="Menú"
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d={abierto ? 'M6 6l12 12 M18 6L6 18' : 'M4 7h16 M4 12h16 M4 17h16'} />
            </svg>
          </button>
        </div>
      </header>
      {abierto && (
        <nav
          id="menu-movil"
          class="sheet"
          aria-label="Principal"
          onKeyDown={(e) => {
            if (e.key === 'Escape') cerrar(true);
          }}
        >
          <a ref={primero} href="#casos" onClick={ir('casos')}>
            Proyectos <span class="acento-t">→</span>
          </a>
          <a href="#metodo" onClick={ir('metodo')}>
            Cómo trabajo <span class="acento-t">→</span>
          </a>
          <a href="#contacto" onClick={ir('contacto')}>
            {ctaCorto} <span class="acento-t">→</span>
          </a>
          <button type="button" onClick={alternar}>
            {tema === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'} <IconoModo />
          </button>
        </nav>
      )}
    </div>
  );
}

interface CasoProps {
  /** Destino de «← Volver» o «← Cerrar». */
  volverHref: string;
  volverTexto?: string;
  /** En móvil, título en lugar del nombre (demos). */
  titulo?: ComponentChildren;
}

/** Cabecera de casos en escritorio: volver, nombre y modo. */
export function HeaderCaso({ volverHref, volverTexto = '← Volver' }: CasoProps) {
  return (
    <header class="hdr-caso">
      <a href={volverHref} class="volver">{volverTexto}</a>
      <span class="logo">
        <Logo />
      </span>
      <BotonModo />
    </header>
  );
}

/** Cabecera fija de casos y demos en móvil: volver o cerrar, nombre o título y modo. */
export function HeaderCasoMovil({ volverHref, volverTexto = '← Volver', titulo }: CasoProps) {
  return (
    <header class="hdr-caso-m">
      <a href={volverHref} class="volver">{volverTexto}</a>
      {titulo ? (
        <strong class="titulo-m">{titulo}</strong>
      ) : (
        <span class="logo logo-cm">
          <Logo />
        </span>
      )}
      <BotonModo />
    </header>
  );
}
