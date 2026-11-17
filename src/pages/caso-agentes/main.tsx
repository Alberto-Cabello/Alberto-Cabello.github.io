import { render } from 'preact';
import '../../styles/fuentes';
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
pausarSecciones();
