import { useTema } from '../lib/theme';

/** Botón redondo de 44 px que alterna modo claro y oscuro. */
export function BotonModo() {
  const [tema, alternar] = useTema();
  return (
    <button
      type="button"
      class="boton-modo"
      onClick={alternar}
      aria-label={tema === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      <IconoModo />
    </button>
  );
}

export function IconoModo() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6" />
      <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
    </svg>
  );
}
