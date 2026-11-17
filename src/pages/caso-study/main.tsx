import { render } from 'preact';
import '../../styles/fuentes';
import '@fontsource/caveat/latin-500.css';
import '@fontsource/caveat/latin-700.css';
import '../../styles/tokens.css';
import '../../styles/base.css';
import './caso.css';
import { useEsMovil } from '../../lib/vista';
import { pausarSecciones } from '../../lib/pausaSecciones';
import { Desktop } from './Desktop';
import { Mobile } from './Mobile';

function Caso() {
  return useEsMovil() ? <Mobile /> : <Desktop />;
}

render(<Caso />, document.getElementById('app')!);
pausarSecciones('.caso section');
