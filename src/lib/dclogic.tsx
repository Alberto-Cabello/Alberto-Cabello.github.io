import { Component, type ComponentType } from 'preact';
import { fijarTema, useTema } from './theme';

/**
 * Base para trasladar casi 1:1 los componentes de los tableros (clase con estado,
 * setState, componentDidMount y renderVals). El modo claro u oscuro llega como prop
 * «dark» desde el tema de la web, y setState({ dark }) cambia el tema de toda la web.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class DCLogic extends Component<any, any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setState(u: any, cb?: () => void) {
    if (u && typeof u === 'object' && 'dark' in u) {
      fijarTema(u.dark ? 'dark' : 'light');
      const { dark: _d, ...resto } = u;
      if (!Object.keys(resto).length) return;
      return super.setState(resto, cb);
    }
    return super.setState(u, cb);
  }

  render(): preact.ComponentChildren {
    return null;
  }
}

/** Envuelve el componente para pasarle el tema actual como prop «dark». */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function conTema(C: ComponentType<any>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function ConTema(props: any) {
    const [tema] = useTema();
    return <C {...props} dark={tema === 'dark'} />;
  };
}
