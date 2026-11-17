// Atributo «path» de <animateMotion>, que los tipos de Preact no incluyen.
import 'preact';

declare module 'preact' {
  interface SVGAttributes<Target extends EventTarget = SVGElement> {
    path?: string;
  }
}
