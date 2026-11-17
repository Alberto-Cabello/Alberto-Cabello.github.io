import { render } from 'preact';
import '../../styles/fuentes';
import '../../styles/tokens.css';
import '../../styles/base.css';
import './portada.css';
import { useEsMovil } from '../../lib/vista';
import { Desktop } from './Desktop';
import { Mobile } from './Mobile';

/** Monta solo una de las dos versiones según el ancho. */
function Portada() {
  return useEsMovil() ? <Mobile /> : <Desktop />;
}

render(<Portada />, document.getElementById('app')!);
