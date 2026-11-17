import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { fileURLToPath } from 'node:url';

// Multipágina: cada página es una entrada con su propio index.html.
export default defineConfig({
  base: '/',
  plugins: [preact()],
  build: {
    rollupOptions: {
      input: {
        portada: fileURLToPath(new URL('./index.html', import.meta.url)),
        casoAgentes: fileURLToPath(new URL('./casos/red-de-agentes/index.html', import.meta.url)),
        demoAgentes: fileURLToPath(new URL('./casos/red-de-agentes/demo/index.html', import.meta.url)),
        casoStudy: fileURLToPath(new URL('./casos/app-de-estudio/index.html', import.meta.url)),
        demoStudy: fileURLToPath(new URL('./casos/app-de-estudio/demo/index.html', import.meta.url)),
      },
    },
  },
});
