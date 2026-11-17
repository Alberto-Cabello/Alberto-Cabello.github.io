import type { ComponentChildren } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { CORREO, WEB3FORMS_KEY } from '../config';
import './formulario.css';

type Estado = 'editando' | 'enviando' | 'enviado' | 'error';

const OPCIONES = {
  cliente: ['Agentes de IA', 'Automatización', 'Web', 'Software', 'Formación', 'No lo sé'],
  empresa: ['Presencial', 'Híbrido', 'Remoto'],
};

const EMAIL_OK = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Formulario de contacto: cambia campos y textos según cliente o empresa y envía con Web3Forms. */
export function FormularioContacto({ empresa, movil = false }: { empresa: boolean; movil?: boolean }) {
  const [estado, setEstado] = useState<Estado>('editando');
  const [faltan, setFaltan] = useState<{ nombre: boolean; email: boolean } | null>(null);
  const [v, setV] = useState({ nombre: '', email: '', empresa: '', puesto: '', mensaje: '' });
  const [sel, setSel] = useState<Record<string, boolean>>({});
  const [selE, setSelE] = useState<Record<string, boolean>>({});

  // Al cambiar de recorrido se vuelve al formulario, como en el tablero.
  useEffect(() => { setEstado('editando'); setFaltan(null); }, [empresa]);

  const marcadas = empresa ? selE : sel;
  const setMarcadas = empresa ? setSelE : setSel;
  const opciones = empresa ? OPCIONES.empresa : OPCIONES.cliente;
  const campo = (k: keyof typeof v) => ({
    value: v[k],
    onInput: (e: Event) => setV({ ...v, [k]: (e.currentTarget as HTMLInputElement).value }),
  });

  const enviar = async (e: Event) => {
    e.preventDefault();
    if (estado === 'enviando') return;
    const mal = { nombre: !v.nombre.trim(), email: !EMAIL_OK.test(v.email.trim()) };
    if (mal.nombre || mal.email) {
      setFaltan(mal);
      return;
    }
    setFaltan(null);
    setEstado('enviando');
    const recorrido = empresa ? 'empresa' : 'cliente';
    const datos: Record<string, string> = {
      access_key: WEB3FORMS_KEY,
      subject: `Portfolio · ${recorrido} · ${v.nombre.trim()}`,
      from_name: v.nombre.trim(),
      nombre: v.nombre.trim(),
      email: v.email.trim(),
      mensaje: v.mensaje.trim(),
      recorrido,
    };
    const elegidas = opciones.filter((o) => marcadas[o]).join(', ');
    if (empresa) {
      datos.empresa = v.empresa.trim();
      datos.puesto = v.puesto.trim();
      datos.modalidad = elegidas;
    } else {
      datos.intereses = elegidas;
    }
    try {
      const r = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(datos),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.success !== false) setEstado('enviado');
      else setEstado('error');
    } catch (er) {
      setEstado('error');
    }
  };

  if (estado === 'enviado') {
    return (
      <div role="status" class={movil ? 'enviado enviado-m' : 'enviado'}>
        <p class="enviado-t">{empresa ? 'Recibido. Gracias por pensar en mí.' : 'Recibido. Ya está un poco más enfocada.'}</p>
        <p class="enviado-s">Te respondo personalmente en cuanto lo lea.</p>
      </div>
    );
  }

  const ctaCorto = empresa ? 'Hablemos de un puesto' : 'Cuéntame tu idea';
  const enviando = estado === 'enviando';
  // Se llama como función (no como componente) para no volver a montar los campos en cada pulsación.
  const fila = (hijos: ComponentChildren) => (movil ? hijos : <div class="f-fila">{hijos}</div>);

  return (
    <form aria-label={ctaCorto} class={movil ? 'form form-m' : 'form'} onSubmit={enviar} noValidate>
      <input type="checkbox" name="botcheck" class="trampa" tabIndex={-1} aria-hidden="true" autoComplete="off" />
      {fila(<>
        <label class="f-label">
          Nombre
          <input id="f-nombre" class="field" type="text" name="nombre" autoComplete="name" required aria-required="true"
            aria-invalid={faltan?.nombre ? 'true' : 'false'} aria-describedby={faltan ? 'f-error' : undefined} {...campo('nombre')} />
        </label>
        <label class="f-label">
          Email
          <input class="field" type="email" name="email" autoComplete="email" required aria-required="true"
            aria-invalid={faltan?.email ? 'true' : 'false'} aria-describedby={faltan ? 'f-error' : undefined} {...campo('email')} />
        </label>
      </>)}
      {empresa && (
        fila(<>
          <label class="f-label">
            Empresa
            <input class="field" type="text" name="empresa" autoComplete="organization" {...campo('empresa')} />
          </label>
          <label class="f-label">
            Puesto
            <input class="field" type="text" name="puesto" autoComplete="organization-title" {...campo('puesto')} />
          </label>
        </>)
      )}
      <label class="f-label">
        {empresa ? 'El puesto y el reto, en pocas líneas' : 'Tu idea, aunque esté a medias'}
        <textarea class="field" name="mensaje" rows={4} {...campo('mensaje')} />
      </label>
      <fieldset class="f-chips">
        <legend>{empresa ? 'Modalidad' : '¿Por dónde va?'}</legend>
        <div class="f-chips-in">
          {opciones.map((o) => (
            <button type="button" key={o} class="chip" aria-pressed={marcadas[o] ? 'true' : 'false'}
              onClick={() => setMarcadas({ ...marcadas, [o]: !marcadas[o] })}>
              {o}
            </button>
          ))}
        </div>
      </fieldset>
      <button type="submit" class="f-enviar" disabled={enviando}>
        {enviando ? 'Enviando…' : empresa ? 'Proponer una conversación →' : 'Enfocar mi idea →'}
      </button>
      <p class="f-nota">Uso tus datos solo para responderte y no los cedo a nadie.</p>
      {faltan && <p id="f-error" role="alert" class="f-error">Falta tu nombre o un email válido para poder responderte.</p>}
      {estado === 'error' && (
        <p role="alert" class="f-error">
          No se ha podido enviar. Escríbeme a <a href={`mailto:${CORREO}`}>{CORREO}</a>
        </p>
      )}
      <p class="f-nota">
        Te respondo personalmente. ¿Prefieres el correo? <a href={`mailto:${CORREO}`}>{CORREO}</a>
      </p>
    </form>
  );
}
