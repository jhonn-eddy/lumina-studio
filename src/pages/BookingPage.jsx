import { useEffect, useState } from 'react'
import { packages } from '../data/siteContent.js'

const apiBase = import.meta.env.VITE_API_URL?.replace(/\/$/, '')
const statusLabels = { pending: 'Pendiente', confirmed: 'Confirmada', cancelled: 'Cancelada' }

async function apiRequest(path, { token, ...options } = {}) {
  if (!apiBase) throw new Error('La gestión de reservas aún no está configurada. Inténtalo más tarde o contáctanos por nuestros canales oficiales.')
  const response = await fetch(`${apiBase}${path}`, {
    ...options,
    headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
  })
  if (!response.ok) {
    const messages = { 401: 'Inicia sesión para acceder a tus solicitudes.', 403: 'Tu cuenta no tiene permiso para realizar esta operación.', 409: 'La solicitud ha cambiado o la fecha ya no está disponible. Actualiza la página.', 429: 'Se han realizado demasiados intentos. Espera un momento e inténtalo de nuevo.' }
    throw new Error(messages[response.status] ?? 'No se pudo completar la solicitud. Inténtalo de nuevo.')
  }
  return response.status === 204 ? null : response.json()
}

function getToken() {
  return window.sessionStorage.getItem('lumina_access_token')?.trim() || ''
}

function humanDate(value) {
  if (!value) return 'Fecha no disponible'
  return new Intl.DateTimeFormat('es-BO', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${value.slice(0, 10)}T12:00:00Z`))
}

function RequestCard({ request, staff, onStatusChange, busyId }) {
  const selectedPackage = packages.find((item) => item.slug === request.packageSlug)
  const status = statusLabels[request.status] ?? request.status
  return (
    <article className="request-card">
      <div className="request-card__heading"><div><p className="eyebrow">SOLICITUD {String(request.id ?? '').slice(0, 8)}</p><h3>{selectedPackage?.name ?? 'Paquete consultado'}</h3></div><span className={`request-status request-status--${request.status}`}>{status}</span></div>
      <p>Fecha solicitada: <strong>{humanDate(request.date)}</strong></p>
      {staff && <p>Cliente: <strong>{request.name}</strong> · {request.email}{request.phone ? ` · ${request.phone}` : ''}</p>}
      {request.type && <p>Tipo: {request.type}</p>}
      {request.message && <p className="request-card__message">{request.message}</p>}
      {request.createdAt && <p className="request-card__meta">Recibida {humanDate(request.createdAt)}</p>}
      {staff && request.status === 'pending' && <div className="request-card__actions"><button className="button button--dark" disabled={busyId === request.id} onClick={() => onStatusChange(request, 'confirmed')} type="button">Confirmar</button><button className="button button--outline" disabled={busyId === request.id} onClick={() => onStatusChange(request, 'cancelled')} type="button">Cancelar</button></div>}
    </article>
  )
}

function RequestsPage({ staff = false }) {
  const [requests, setRequests] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState(null)
  const token = getToken()

  const loadRequests = async () => {
    setLoading(true); setError('')
    try {
      const result = await apiRequest(staff ? '/api/staff/requests' : '/api/me/requests', { token })
      setRequests(Array.isArray(result) ? result : result?.requests ?? [])
    } catch (err) { setError(err.message) } finally { setLoading(false) }
  }

  useEffect(() => { void loadRequests() }, [staff])

  const changeStatus = async (request, status) => {
    setBusyId(request.id); setError('')
    try {
      await apiRequest(`/api/staff/requests/${encodeURIComponent(request.id)}/status`, { token, method: 'PATCH', body: JSON.stringify({ status }) })
      await loadRequests()
    } catch (err) { setError(err.message) } finally { setBusyId(null) }
  }

  return (
    <section className="requests-page section-shell">
      <p className="eyebrow">{staff ? 'AGENDA DEL ESTUDIO' : 'TU ESPACIO EN LUMINA'}</p>
      <h1>{staff ? 'Gestiona la agenda.' : 'Tus solicitudes.'}</h1>
      <p>{staff ? 'Revisa las consultas recibidas y actualiza su estado.' : 'Consulta el estado y el historial de tus solicitudes de sesión.'}</p>
      {!token && <p className="demo-notice" role="status">Para ver solicitudes, inicia sesión en la cuenta asociada con la variable de sesión <code>lumina_access_token</code>.</p>}
      {error && <p className="demo-notice" role="alert">{error}</p>}
      <button className="button button--outline requests-page__refresh" onClick={() => void loadRequests()} type="button">Actualizar historial</button>
      {loading ? <p className="requests-page__empty" role="status">Cargando solicitudes…</p> : requests.length ? <div className="requests-list">{requests.map((request) => <RequestCard busyId={busyId} key={request.id} onStatusChange={changeStatus} request={request} staff={staff} />)}</div> : <p className="requests-page__empty">{token && !error ? 'Todavía no tienes solicitudes guardadas.' : 'El historial aparecerá aquí cuando el servicio esté conectado.'}</p>}
      <a className="back-link" href="#/">Volver al inicio</a>
    </section>
  )
}

export function ClientRequestsPage() { return <RequestsPage /> }
export function StaffRequestsPage() { return <RequestsPage staff /> }

export default function BookingPage({ packageSlug }) {
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const today = new Date()
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const selectedPackage = packages.find((item) => item.slug === packageSlug)

  if (!selectedPackage) return <section className="page-intro"><p className="eyebrow">PAQUETE NO DISPONIBLE</p><h1>Elige una experiencia</h1><p>Vuelve al inicio para consultar los paquetes disponibles.</p><a className="button button--dark" href="#/">Ir al inicio</a></section>

  const submitRequest = async (event) => {
    event.preventDefault(); setError(''); setSaved(false); setSaving(true)
    const form = new FormData(event.currentTarget)
    try {
      await apiRequest('/api/requests', { method: 'POST', token: getToken(), body: JSON.stringify({ packageSlug, name: String(form.get('name') ?? '').trim(), email: String(form.get('email') ?? '').trim(), phone: String(form.get('phone') ?? '').trim(), date: form.get('date'), type: form.get('type'), message: String(form.get('message') ?? '').trim(), consent: form.get('consent') === 'on' }) })
      setSaved(true); event.currentTarget.reset()
    } catch (err) { setError(err.message) } finally { setSaving(false) }
  }

  return (
    <section className="booking-page section-shell">
      <div className="booking-aside">
        <a className="back-link" href="#/">← Volver al inicio</a>
        <p className="eyebrow">SOLICITUD DE SESIÓN</p>
        <h1>Hagamos espacio para tu historia.</h1>
        <p>Elige la fecha que te interesa. Tu solicitud quedará pendiente hasta que confirmemos su disponibilidad.</p>
        <article className="booking-summary"><p className="eyebrow">PAQUETE SELECCIONADO</p><h2>{selectedPackage.name}</h2><p className="booking-summary__price">{selectedPackage.price}<span> / sesión</span></p><ul>{selectedPackage.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></article>
        <div className="payment-note"><span aria-hidden="true">◇</span><p><strong>Pago seguro, paso a paso.</strong><br />No solicitamos datos de tarjeta aquí. El pago se coordina después de confirmar disponibilidad y condiciones.</p></div>
      </div>
      <div className="booking-form-panel">
        <h2>Solicita tu sesión</h2><p className="form-lead">Los campos marcados con * son necesarios.</p>
        {saved && <div className="demo-notice" role="status"><strong>Solicitud enviada.</strong> Recibimos tu solicitud y está pendiente de confirmación. <a href="#/mis-solicitudes">Consulta tu historial</a>.</div>}
        {error && <div className="demo-notice" role="alert">{error}</div>}
        <form className="booking-form" onSubmit={submitRequest}>
          <div className="form-field"><label htmlFor="booking-package">Paquete seleccionado *</label><select id="booking-package" onChange={(event) => { window.location.hash = `#/reservar/${event.target.value}` }} value={selectedPackage.slug}>{packages.map((item) => <option key={item.slug} value={item.slug}>{item.name} — {item.price}</option>)}</select></div>
          <div className="form-row"><div className="form-field"><label htmlFor="client-name">Nombre completo *</label><input autoComplete="name" id="client-name" maxLength="100" name="name" placeholder="Tu nombre" required /></div><div className="form-field"><label htmlFor="client-email">Correo electrónico *</label><input autoComplete="email" id="client-email" maxLength="254" name="email" placeholder="nombre@correo.com" required type="email" /></div></div>
          <div className="form-row"><div className="form-field"><label htmlFor="client-phone">Teléfono</label><input autoComplete="tel" id="client-phone" maxLength="30" name="phone" placeholder="+591 ..." type="tel" /></div><div className="form-field"><label htmlFor="project-date">Fecha de interés *</label><input id="project-date" min={minDate} name="date" required type="date" /></div></div>
          <div className="form-field"><label htmlFor="project-type">Tipo de sesión</label><select id="project-type" name="type" defaultValue=""><option value="">Selecciona una opción</option><option>Boda</option><option>Retrato</option><option>Evento</option><option>Proyecto editorial</option><option>Otro</option></select></div>
          <div className="form-field"><label htmlFor="project-message">¿Qué te gustaría crear? *</label><textarea id="project-message" maxLength="1200" name="message" placeholder="Comparte únicamente los detalles necesarios para planificar tu sesión…" required rows="5" /></div>
          <label className="privacy-consent"><input name="consent" required type="checkbox" /><span>He leído el aviso de privacidad y autorizo el uso de estos datos para gestionar y responder a mi solicitud de sesión. *</span></label>
          <button className="button button--dark booking-form__submit" disabled={saving} type="submit">{saving ? 'Enviando…' : 'Enviar solicitud'} <span aria-hidden="true">↗</span></button>
          <p className="form-disclaimer">Al enviar, solicitamos el paquete, la fecha y tus datos de contacto al servicio de reservas; todavía no confirmamos la disponibilidad.</p>
        </form>
      </div>
    </section>
  )
}
