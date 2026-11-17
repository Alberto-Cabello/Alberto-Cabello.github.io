import { defineConfig, type Plugin } from 'vite';
import preact from '@preact/preset-vite';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

/**
 * Política de seguridad de contenido (solo en la compilación, para no romper el servidor de desarrollo):
 * el navegador solo carga recursos de la propia web y solo envía datos a Web3Forms.
 * El script en línea que aplica el modo antes de pintar se autoriza por su huella.
 */
function politicaSeguridad(): Plugin {
  return {
    name: 'politica-seguridad',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const huellas = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)]
          .map((m) => `'sha256-${createHash('sha256').update(m[1], 'utf8').digest('base64')}'`);
        const politica = [
          "default-src 'self'",
          `script-src 'self' ${huellas.join(' ')}`.trim(),
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data:",
          "font-src 'self' data:",
          "connect-src 'self' https://api.web3forms.com",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          'upgrade-insecure-requests',
        ].join('; ');
        return html.replace('<meta charset="utf-8">', `<meta charset="utf-8">\n<meta http-equiv="Content-Security-Policy" content="${politica}">`);
      },
    },
  };
}

// Multipágina: cada página es una entrada con su propio index.html.
export default defineConfig({
  base: '/',
  plugins: [preact(), politicaSeguridad()],
  build: {
    rollupOptions: {
      input: {
        portada: fileURLToPath(new URL('./index.html', import.meta.url)),
        error: fileURLToPath(new URL('./404.html', import.meta.url)),
        casoAgentes: fileURLToPath(new URL('./casos/red-de-agentes/index.html', import.meta.url)),
        demoAgentes: fileURLToPath(new URL('./casos/red-de-agentes/demo/index.html', import.meta.url)),
        casoStudy: fileURLToPath(new URL('./casos/app-de-estudio/index.html', import.meta.url)),
        demoStudy: fileURLToPath(new URL('./casos/app-de-estudio/demo/index.html', import.meta.url)),
        casoBanca: fileURLToPath(new URL('./casos/automatizacion-y-asistente-ia/index.html', import.meta.url)),
        demoBanca: fileURLToPath(new URL('./casos/automatizacion-y-asistente-ia/demo/index.html', import.meta.url)),
      },
    },
  },
});
