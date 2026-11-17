import { GITHUB, LINKEDIN } from '../config';
import './footer.css';

/** Pie: escritorio con «· Málaga»; móvil más compacto, como en los tableros. */
export function Footer({ movil = false }: { movil?: boolean }) {
  return (
    <footer class={movil ? 'pie pie-m' : 'pie'}>
      <span>{movil ? '© 2026 Alberto Cabello' : '© 2026 Alberto Cabello · Málaga'}</span>
      <span class="pie-enl">
        <a href={LINKEDIN}>LinkedIn</a>
        <a href={GITHUB}>GitHub</a>
      </span>
    </footer>
  );
}
