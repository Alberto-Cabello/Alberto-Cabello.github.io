import { useEffect, useRef, useState } from 'preact/hooks';

// Plan y textos de la demo, copiados de DemoAgentes (iguales en DemoAgentesMovil).
export interface Paso { agent: string; doing: string; manual: string; min: number; amin: number; life: string; icon: string; decision?: { title: string; text: string }; decision2?: { title: string; text: string }; redo?: string }
export const PLAN: Paso[] = [
  { agent: 'Búsqueda', doing: 'rastreando anuncios', manual: 'Revisar 1.240 anuncios uno a uno', min: 200, amin: 6, life: 'respondiendo a un cliente', icon: 'M4 5h16v11H9l-5 4z' },
  { agent: 'Validación', doing: 'comprobando el candidato', manual: 'Comprobar calidad, demanda y competencia en 4 webs', min: 90, amin: 3, life: 'tomando un café', icon: 'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z', decision: { title: 'Lámpara de mesa recargable', text: 'Supera calidad, demanda, competencia y margen. ¿Pasa a presupuestos?' }, decision2: { title: 'Organizador de escritorio', text: 'Segundo candidato: demanda estable y margen del 38 %. ¿Pasa a presupuestos?' }, redo: 'buscando otro candidato' },
  { agent: 'Presupuestos', doing: 'cerrando precio con el proveedor', manual: 'Escribir al proveedor, esperar y comparar', min: 60, amin: 2, life: 'en una llamada corta', icon: 'M3 12V4h8l10 10-8 8z' },
  { agent: 'Listado', doing: 'montando la ficha', manual: 'Redactar la ficha, preparar fotos y precio', min: 90, amin: 3, life: 'revisando el correo', icon: 'M6 7v10 M18 7v10 M3 10v4 M21 10v4 M6 12h12', decision: { title: 'Ficha lista en borrador', text: 'Título, descripción, fotos y precio preparados. ¿La dejamos lista para publicar?' }, decision2: { title: 'Ficha rehecha', text: 'Nuevo título y fotos con otro enfoque. ¿La dejamos lista para publicar?' }, redo: 'rehaciendo la ficha' },
  { agent: 'Estratega', doing: 'planteando el testeo', manual: 'Definir público, ángulo y plan de creativos', min: 120, amin: 4, life: 'en una reunión rápida', icon: 'M7 3h10l-1 8a4 4 0 0 1-8 0z M12 15v6 M8 21h8' },
  { agent: 'Productor', doing: 'generando 5 creativos', manual: 'Crear 5 creativos de imagen y vídeo', min: 180, amin: 8, life: 'estirando las piernas', icon: 'M12 4V2 M12 22v-2 M4 12H2 M22 12h-2 M5 5l1.5 1.5 M17.5 17.5L19 19 M5 19l1.5-1.5 M17.5 6.5L19 5 M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8z' },
  { agent: 'Crítico', doing: 'revisando con la rúbrica', manual: 'Revisar cada creativo y preparar la campaña', min: 60, amin: 3, life: 'pensando en la siguiente idea', icon: 'M9 18h6 M10 21h4 M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z', decision: { title: 'Campaña de testeo lista', text: '4 creativos aprobados, con copys y configuración. ¿Lanzamos?' }, decision2: { title: 'Creativo rehecho', text: 'El Productor ha rehecho el creativo y ahora pasa la rúbrica. ¿Lanzamos?' }, redo: 'rehaciendo el creativo rechazado' },
];
export const CIUDADES = ['Madrid', 'Sevilla', 'Valencia', 'Bilbao', 'Málaga', 'Zaragoza', 'Murcia', 'Palma', 'Granada', 'Vigo'];
export const MANUAL_OUT = [
  { title: 'Más de 3 tardes para un producto', text: 'Del lunes a las 16:00 al jueves a las 17:20, y la campaña sin salir.' },
  { title: 'Menos productos, menos ventas', text: 'A este ritmo pruebas 1 o 2 productos por semana; las oportunidades se escapan.' },
  { title: 'Sin tiempo para nada más', text: 'Ni clientes, ni estrategia, ni vida: todo se va en ejecutar.' },
  { title: 'Más cansado, más frustrado', text: 'Energía a cero y la sensación de no avanzar.' },
];

export function reloj(min: number) {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const m = Math.round(min);
  const d = Math.floor(m / 240), r = m % 240;
  const hh = 16 + Math.floor(r / 60), mm = r % 60;
  return days[Math.min(d, 5)] + ' ' + hh + ':' + (mm < 10 ? '0' + mm : mm);
}
export function hm(min: number) {
  const m = Math.round(min); const h = Math.floor(m / 60); const r = m % 60;
  return h > 0 ? h + ' h ' + r + ' min' : r + ' min';
}

type Fase = 'manual' | 'agents' | 'ask' | 'sales';
interface Estado {
  started: boolean; done: boolean; step: number; ph: Fase; pt: number; manualMin: number; agentMin: number;
  decSec: number; saleCount: number; decN: number; rejN: number; redo: number; alt1: boolean;
}
const INICIAL: Estado = { started: false, done: false, step: 0, ph: 'manual', pt: 0, manualMin: 0, agentMin: 0, decSec: 0, saleCount: 0, decN: 0, rejN: 0, redo: -1, alt1: false };

/** Simulación «a mano frente a con agentes»: avanza un tic por segundo, se para en cada decisión y espera a la persona. */
export function useSimulador() {
  const [s, setS] = useState<Estado>(INICIAL);
  const ref = useRef(s);
  ref.current = s;

  const siguiente = (st: Estado, agentMin: number, extra: Partial<Estado> = {}): Estado => {
    const base = { ...st, agentMin, redo: -1, ...extra };
    if (st.step + 1 >= PLAN.length) return { ...base, ph: 'sales', pt: 0, saleCount: 0, step: PLAN.length - 1 };
    return { ...base, step: st.step + 1, ph: 'manual', pt: 0 };
  };

  useEffect(() => {
    if (!s.started || s.done) return;
    let oculto = document.hidden;
    const vis = () => { oculto = document.hidden; };
    document.addEventListener('visibilitychange', vis);
    const id = setInterval(() => {
      if (oculto) return;
      const st = ref.current;
      const pt = st.pt + 1;
      if (st.ph === 'ask') { setS({ ...st, decSec: st.decSec + 1 }); return; }
      if (st.ph === 'sales') {
        if (pt > 9) { setS({ ...st, done: true }); return; }
        setS({ ...st, pt, saleCount: st.saleCount + 1 }); return;
      }
      const p = PLAN[st.step];
      if (st.ph === 'manual') {
        const manualMin = Math.min(st.manualMin + p.min / 4, 800);
        if (pt >= 4) setS({ ...st, manualMin: Math.round(manualMin), ph: 'agents', pt: 0 });
        else setS({ ...st, manualMin, pt });
        return;
      }
      const agentMin = st.agentMin + p.amin / 4;
      if (pt >= 4) {
        if (p.decision) setS({ ...st, agentMin: Math.round(agentMin), ph: 'ask', pt: 0 });
        else setS(siguiente(st, Math.round(agentMin)));
        return;
      }
      setS({ ...st, agentMin, pt });
    }, 1000);
    return () => { clearInterval(id); document.removeEventListener('visibilitychange', vis); };
  }, [s.started, s.done]);

  const st = s;
  const cur = PLAN[Math.min(st.step, PLAN.length - 1)];
  const isRedo = st.redo === st.step && !!cur.redo;
  const energy = Math.max(0, Math.round(100 - (st.manualMin / 800) * 100));
  return {
    s: st, cur, isRedo, energy,
    dec: isRedo && cur.decision2 ? cur.decision2 : cur.decision,
    prodName: st.alt1 ? 'Organizador de escritorio' : 'Lámpara de mesa recargable',
    mood: energy > 70 ? 'Con energía… de momento.' : energy > 40 ? 'Cansado, y aún queda.' : energy > 0 ? 'Agotado y frustrado.' : 'Sin fuerzas para seguir.',
    empezar: () => setS({ ...INICIAL, started: true }),
    aprobar: () => { const x = ref.current; if (x.ph !== 'ask') return; setS(siguiente(x, x.agentMin, { decSec: x.decSec + 1, decN: x.decN + 1, redo: -1 })); },
    rechazar: () => {
      const x = ref.current; if (x.ph !== 'ask') return;
      setS({ ...x, ph: 'agents', pt: 0, redo: x.step, rejN: x.rejN + 1, decSec: x.decSec + 1, alt1: x.step === 1 ? true : x.alt1 });
    },
    saltar: () => { const x = ref.current; setS({ ...x, done: true, manualMin: 800, agentMin: 29, decSec: x.decSec || 24, saleCount: 9, ph: 'sales' }); },
    agentOut: [
      { title: 'Lanzado el mismo lunes', text: 'Mientras tanto atendiste a un cliente, te tomaste un café y pensaste la siguiente idea.' },
      { title: 'Más productos probados', text: 'De 1–2 productos a la semana a 2–3 validados cada día.' },
      { title: 'Tu tiempo, para lo que importa', text: 'Los agentes ejecutan; tú tomaste ' + (st.decN + st.rejN || 3) + ' decisiones' + (st.rejN ? ', y en ' + st.rejN + (st.rejN === 1 ? ' rechazo' : ' rechazos') + ' el equipo rehízo el trabajo' : '') + '.' },
      { title: 'Más tranquilo, más contento', text: 'El trabajo pesado está hecho y tú sigues con energía.' },
    ],
  };
}
