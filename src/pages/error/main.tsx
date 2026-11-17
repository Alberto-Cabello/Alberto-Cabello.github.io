import { render } from 'preact';
import '../../styles/fuentes';
import '../../styles/tokens.css';
import '../../styles/base.css';
import './error.css';
import { useEsMovil } from '../../lib/vista';
import { HeaderCaso, HeaderCasoMovil } from '../../components/Header';
import { Footer } from '../../components/Footer';

/** Página 404 con el estilo de la portada. */
function Error404() {
  const movil = useEsMovil();
  return (
    <div class={movil ? 'e404 movil-raiz' : 'e404'}>
      {movil ? <HeaderCasoMovil volverHref="/" /> : <HeaderCaso volverHref="/" />}
      <main class="e404-main">
        <p class="e404-k">Error 404</p>
        <h1 class="e404-h">Esta página <span class="sharp">no existe.<span class="bar" aria-hidden="true" /></span></h1>
        <a href="/" class="e404-btn">Volver a la portada</a>
      </main>
      <Footer movil={movil} />
    </div>
  );
}

render(<Error404 />, document.getElementById('app')!);
