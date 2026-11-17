import { HeaderPortadaMovil } from '../../components/Header';
import { Footer } from '../../components/Footer';

const pildora = {
  quien: 'visitante',
  accion: 'elegir',
  aria: 'Viendo como: elegir. Elige cómo quieres ver la web',
};

/** Portada móvil · fase 1: cabecera con menú, titular del hero y pie. */
export function Mobile() {
  return (
    <div id="top" class="portada movil-raiz">
      <HeaderPortadaMovil pildora={pildora} ctaCorto="Cuéntame tu idea" />
      <main>
        <section class="hero-m">
          <p class="fade eyebrow-m">AI Engineer · Málaga</p>
          <h1 class="h1-m">
            <span class="ln">
              <span class="w soft">Las</span> <span class="w soft" style="animation-delay: .08s, 1.2s">ideas</span>
            </span>
            <span class="ln">
              <span class="w soft" style="animation-delay: .16s, 1.3s">llegan</span>{' '}
              <span class="w soft" style="animation-delay: .24s, 1.4s">borrosas.</span>
            </span>
            <span class="ln">
              <span class="w" style="animation-delay: .5s">Yo</span> <span class="w" style="animation-delay: .58s">las</span>{' '}
              <span class="w" style="animation-delay: .66s">
                <span class="sharp">
                  enfoco.<span class="bar" aria-hidden="true" />
                </span>
              </span>
            </span>
          </h1>
          <p class="fade sub-m">Y las convierto en agentes de IA, automatizaciones, webs y software que funcionan.</p>
          <div class="fade ctas-m">
            <a href="#contacto" class="btn-acento">Cuéntame tu idea</a>
            <a href="#casos" class="btn-borde">Ver proyectos</a>
          </div>
        </section>
      </main>
      <Footer movil />
    </div>
  );
}
