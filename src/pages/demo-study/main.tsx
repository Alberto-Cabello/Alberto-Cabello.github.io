import { render } from 'preact';
import '../../styles/fuentes';
import '../../styles/tokens.css';
import '../../styles/base.css';
import { useEsMovil } from '../../lib/vista';
import { Desktop } from './Desktop';
import { Mobile } from './Mobile';

function Demo() {
  return useEsMovil() ? <Mobile /> : <Desktop />;
}

render(<Demo />, document.getElementById('app')!);
document.addEventListener('visibilitychange', () => document.documentElement.classList.toggle('paused', document.hidden));
