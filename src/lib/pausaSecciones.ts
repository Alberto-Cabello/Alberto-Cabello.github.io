/**
 * Pausa las animaciones CSS de cada sección cuando sale de pantalla (clase .paused)
 * y de toda la página con la pestaña oculta. Para páginas sin bucles de JS propios en esas secciones.
 */
export function pausarSecciones(selector = 'main > section') {
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => e.target.classList.toggle('paused', !e.isIntersecting));
  }, { rootMargin: '50px' });
  const observar = () => document.querySelectorAll(selector).forEach((s) => io.observe(s));
  observar();
  // Al cambiar de versión (escritorio/móvil) se montan secciones nuevas.
  new MutationObserver(observar).observe(document.getElementById('app')!, { childList: true });
  const vis = () => document.documentElement.classList.toggle('paused', document.hidden);
  document.addEventListener('visibilitychange', vis);
}
