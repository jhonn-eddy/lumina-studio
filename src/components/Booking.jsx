import { useState } from 'react'
import { packages } from '../data/siteContent.js'

export default function Booking({ sectionRef, selectedPackage, onPackageChange }) {
  const [reservationId, setReservationId] = useState('')
  const today = new Date()
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const submitBooking = (event) => {
    event.preventDefault()
    setReservationId(`LUM-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`)
  }

  return (
    <section className="section booking" id="contacto" ref={sectionRef}>
      <div className="booking__intro">
        <h2>Aparta tu Fecha</h2>
        <p>Inicia la conversación. Cuéntanos sobre tu visión y trabajaremos juntos para crear imágenes que trasciendan el tiempo.</p>
        {reservationId && (
          <div aria-live="polite" className="booking-confirmation">
            <h3>¡Confirmación de Simulación!</h3>
            <p>ID de Reserva: <strong>{reservationId}</strong></p>
            <p>Gracias por tu interés. Nos pondremos en contacto contigo pronto para confirmar los detalles.</p>
          </div>
        )}
      </div>
      <div className="booking__form-wrap">
        {!reservationId && (
          <form className="booking-form" onSubmit={submitBooking}>
            <div className="form-field">
              <label htmlFor="name">Nombre</label>
              <input autoComplete="name" id="name" name="name" required type="text" />
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input autoComplete="email" id="email" name="email" required type="email" />
              </div>
              <div className="form-field">
                <label htmlFor="phone">Teléfono</label>
                <input autoComplete="tel" id="phone" name="phone" type="tel" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="package">Paquete de interés</label>
                <select id="package" name="package" value={selectedPackage} onChange={(event) => onPackageChange(event.target.value)}>
                  <option value="">Selecciona un paquete</option>
                  {packages.map((item) => <option key={item.name} value={item.name}>{item.name} ({item.price})</option>)}
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="date">Fecha Deseada</label>
                <input id="date" min={minDate} name="date" required type="date" />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="message">Mensaje / Detalles del Proyecto</label>
              <textarea id="message" name="message" required rows="3" />
            </div>
            <button className="button button--dark booking-form__submit" type="submit">Reservar Ahora</button>
          </form>
        )}
      </div>
    </section>
  )
}
