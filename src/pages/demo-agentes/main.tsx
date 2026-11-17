import { render } from 'preact';
import '../../styles/fuentes';
import '../../styles/tokens.css';
import '../../styles/base.css';
import './demo.css';
import { useEsMovil } from '../../lib/vista';
import { Desktop } from './Desktop';
import { Mobile } from './Mobile';

function Demo() {
  return useEsMovil() ? <Mobile /> : <Desktop />;
}

render(<Demo />, document.getElementById('app')!);
const vis = () => document.documentElement.classList.toggle('paused', document.hidden);
document.addEventListener('visibilitychange', vis);
