import { render } from 'preact';
import '../../styles/fuentes';
import '../../styles/tokens.css';
import '../../styles/base.css';
import { useEsMovil } from '../../lib/vista';
import { pausarSecciones } from '../../lib/pausaSecciones';
import { Desktop } from './Desktop';
import { Mobile } from './Mobile';

function Pagina() {
  return useEsMovil() ? <Mobile /> : <Desktop />;
}

render(<Pagina />, document.getElementById('app')!);
pausarSecciones('.caso > section');
