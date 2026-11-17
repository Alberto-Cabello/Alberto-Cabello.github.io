import { CV } from '../pages/portada/datos';

/** «Descargar CV» en español y «English version» en inglés. */
export function BotonesCV({ movil = false }: { movil?: boolean }) {
  if (movil) {
    return (
      <>
        <a href={CV.es} download class="btn-m-borde">Descargar CV</a>
        <a href={CV.en} download lang="en" class="btn-m-borde">English version</a>
      </>
    );
  }
  return (
    <>
      <a href={CV.es} download style="display: inline-flex; align-items: center; min-height: 52px; padding: 0 22px; border-radius: 999px; border: 1px solid var(--line); text-decoration: none; font-weight: 600">Descargar CV</a>
      <a href={CV.en} download lang="en" style="display: inline-flex; align-items: center; min-height: 52px; padding: 0 6px; font-weight: 600; text-underline-offset: 6px">English version</a>
    </>
  );
}
