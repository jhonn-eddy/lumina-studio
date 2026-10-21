import { useState } from 'react'
import { packages } from '../data/siteContent.js'

export default function BookingPage({ packageSlug }) {
  const [demoMessage, setDemoMessage] = useState(false)
  const today = new Date()
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const selectedPackage = packages.find((item) => item.slug === packageSlug)

  if (!selectedPackage) {
    return <section className="page-intro"><p className="eyebrow">PAQUETE NO DISPONIBLE</p><h1>Elige una experiencia</h1><p>Vuelve al inicio para consultar los paquetes disponibles.</p><a className="button button--dark" href="#/">Ir al inicio</a></section>
  }

  return (
    <section className="booking-page section-shell">
      <div className="booking-aside">
        <a className="back-link" href="#/">← Volver al inicio</a>
        <p className="eyebrow">SOLICITUD DE INFORMACIÓN</p>
        <h1>Hagamos espacio para tu historia.</h1>
        <p>Cuéntanos un poco de tu proyecto. Revisaremos la fecha y los detalles contigo antes de confirmar una reserva.</p>
        <article className="booking-summary">
          <p className="eyebrow">PAQUETE SELECCIONADO</p>
          <h2>{selectedPackage.name}</h2>
          <p className="booking-summary__price">{selectedPackage.price}<span> / sesión</span></p>
          <ul>{selectedPackage.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        </article>
        <div className="payment-note">
          <span aria-hidden="true">◇</span>
          <p><strong>Pago seguro, paso a paso.</strong><br />No solicitamos datos de tarjeta aquí. El pago se coordina después de confirmar disponibilidad y condiciones.</p>
        </div>
      </div>

      <div className="booking-form-panel">
        <h2>Cuéntanos sobre tu proyecto</h2>
        <p className="form-lead">Los campos marcados con * son necesarios.</p>
        {demoMessage && <div className="demo-notice" role="status"><strong>Formulario de demostración.</strong> No se enviaron ni guardaron tus datos. Escríbenos por nuestros canales oficiales para coordinar una sesión.</div>}
        <form className="booking-form" onSubmit={(event) => { event.preventDefault(); setDemoMessage(true) }}>
          <div className="form-row">
            <div className="form-field"><label htmlFor="client-name">Nombre completo *</label><input autoComplete="name" id="client-name" maxLength="100" name="name" placeholder="Tu nombre" required /></div>
            <div className="form-field"><label htmlFor="client-email">Correo electrónico *</label><input autoComplete="email" id="client-email" maxLength="254" name="email" placeholder="nombre@correo.com" required type="email" /></div>
          </div>
          <div className="form-row">
            <div className="form-field"><label htmlFor="client-phone">Teléfono</label><input autoComplete="tel" id="client-phone" maxLength="30" name="phone" placeholder="+591 ..." type="tel" /></div>
            <div className="form-field"><label htmlFor="project-date">Fecha de interés *</label><input id="project-date" min={minDate} name="date" required type="date" /></div>
          </div>
          <div className="form-field"><label htmlFor="project-type">Tipo de sesión</label><select id="project-type" name="type" defaultValue=""><option value="" disabled>Selecciona una opción</option><option>Boda</option><option>Retrato</option><option>Evento</option><option>Proyecto editorial</option><option>Otro</option></select></div>
          <div className="form-field"><label htmlFor="project-message">¿Qué te gustaría crear? *</label><textarea id="project-message" maxLength="1200" name="message" placeholder="Comparte los detalles que consideres importantes…" required rows="5" /></div>
          <label className="privacy-consent"><input required type="checkbox" /><span>Autorizo el uso de estos datos únicamente para responder a mi consulta. *</span></label>
          <button className="button button--dark booking-form__submit" type="submit">Revisar solicitud <span aria-hidden="true">↗</span></button>
          <p className="form-disclaimer">Demostración sin conexión a un servicio de reservas: los datos permanecen en esta página y no se almacenan.</p>
        </form>
      </div>
    </section>
  )
}
