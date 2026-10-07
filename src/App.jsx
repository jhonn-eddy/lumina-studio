import { useEffect, useRef, useState } from 'react'
import './App.css'

const galleryItems = [
  {
    title: 'Bodas',
    image: 'https://images.pexels.com/photos/15552025/pexels-photo-15552025.jpeg',
    layout: 'gallery-item--wide',
    imageSize: 'gallery-image--tall',
  },
  {
    title: 'Fauna',
    image: 'https://images.pexels.com/photos/37741206/pexels-photo-37741206.jpeg',
    layout: 'gallery-item--portrait',
    imageSize: 'gallery-image--portrait',
  },
  {
    title: 'Montañas',
    image: 'https://images.pexels.com/photos/11795858/pexels-photo-11795858.jpeg',
    layout: 'gallery-item--half',
    imageSize: 'gallery-image--medium',
  },
  {
    title: 'Ríos',
    image: 'https://images.pexels.com/photos/38464281/pexels-photo-38464281.jpeg',
    layout: 'gallery-item--half',
    imageSize: 'gallery-image--medium',
  },
]

const packages = [
  {
    name: 'Esencial',
    price: '$150',
    features: ['1 hora de sesión', '15 fotos editadas', 'Cambios de look (No incluido)'],
  },
  {
    name: 'Premium',
    price: '$300',
    features: ['2 horas de sesión', '30 fotos editadas', '2 cambios de look'],
    featured: true,
  },
  {
    name: 'Eventos',
    price: '$600',
    features: ['4 horas de cobertura', 'Todas las fotos editadas', 'Entrega rápida (48 hrs)'],
  },
]

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <a className="brand" href="#hero" onClick={closeMenu}>LUMINA STUDIO</a>
      <nav className={`site-nav${menuOpen ? ' site-nav--open' : ''}`} aria-label="Navegación principal" id="mobile-navigation">
        <a href="#galeria" onClick={closeMenu}>Galería</a>
        <a href="#paquetes" onClick={closeMenu}>Paquetes</a>
        <a href="#contacto" onClick={closeMenu}>Contacto</a>
        <a className="button button--dark nav-booking" href="#contacto" onClick={closeMenu}>Reservar</a>
      </nav>
      <a className="button button--dark header-booking" href="#contacto">Reservar</a>
      <button
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        className="menu-toggle"
        onClick={() => setMenuOpen((open) => !open)}
        type="button"
      >
        <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
      </button>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__image" role="img" aria-label="Pareja en un espacio arquitectónico luminoso" />
      <div className="hero__wash" />
      <div className="hero__content">
        <h1>Capturando momentos que duran para siempre</h1>
        <a className="button button--dark" href="#galeria">Ver Galería</a>
      </div>
    </section>
  )
}

function Lightbox({ item, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined

    dialog.showModal()
    document.body.classList.add('has-open-dialog')
    return () => {
      if (dialog.open) dialog.close()
      document.body.classList.remove('has-open-dialog')
    }
  }, [])

  return (
    <dialog
      aria-label="Visor de imagen"
      className="lightbox"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      onClose={onClose}
      ref={dialogRef}
    >
      <div className="lightbox__content">
        <div className="lightbox__toolbar">
          <button aria-label="Cerrar visor" className="lightbox__close" onClick={onClose} type="button">×</button>
        </div>
        <div className="lightbox__image-wrap">
          <img alt={item.title} className="lightbox__image" src={item.image} />
        </div>
        <p className="lightbox__caption">{item.title}</p>
      </div>
    </dialog>
  )
}

function Gallery() {
  const [activeImage, setActiveImage] = useState(null)
  const triggerRef = useRef(null)

  const closeLightbox = () => {
    setActiveImage(null)
    window.requestAnimationFrame(() => triggerRef.current?.focus())
  }

  return (
    <section className="section gallery" id="galeria">
      <div className="section-heading">
        <h2>Galería Curada</h2>
        <p>Una selección de nuestro trabajo editorial, capturando la esencia cruda y la belleza refinada en cada encuadre.</p>
      </div>
      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <button
            aria-label={`Abrir imagen: ${item.title}`}
            className={`gallery-item ${item.layout}`}
            key={item.title}
            onClick={(event) => {
              triggerRef.current = event.currentTarget
              setActiveImage(item)
            }}
            type="button"
          >
            <span
              aria-hidden="true"
              className={`gallery-item__image ${item.imageSize}`}
              style={{ backgroundImage: `url("${item.image}")` }}
            />
            <span className="gallery-item__caption">
              <span>{item.title}</span>
              <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span>
            </span>
          </button>
        ))}
      </div>
      {activeImage && <Lightbox item={activeImage} onClose={closeLightbox} />}
    </section>
  )
}

function Pricing({ onSelectPackage }) {
  return (
    <section className="section pricing" id="paquetes">
      <div className="section-heading">
        <h2>Paquetes</h2>
      </div>
      <div className="pricing-grid">
        {packages.map((item) => (
          <article className={`price-card${item.featured ? ' price-card--featured' : ''}`} key={item.name}>
            <h3>{item.name}</h3>
            <p className="price-card__price">{item.price}</p>
            <ul>
              {item.features.map((feature, index) => (
                <li className={item.name === 'Esencial' && index === 2 ? 'muted' : ''} key={feature}>{feature}</li>
              ))}
            </ul>
            <button
              aria-label={`Seleccionar paquete ${item.name}`}
              className={`button ${item.featured ? 'button--dark' : 'button--outline'}`}
              onClick={() => onSelectPackage(item.name)}
              type="button"
            >Seleccionar</button>
          </article>
        ))}
      </div>
    </section>
  )
}

function Booking({ sectionRef, selectedPackage, onPackageChange }) {
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

function Footer() {
  return (
    <footer className="site-footer">
      <a className="brand" href="#hero">LUMINA STUDIO</a>
      <nav aria-label="Redes y contacto" className="footer-links">
        <a href="#">Instagram</a>
        <a href="#">LinkedIn</a>
        <a href="#">Email</a>
      </nav>
      <p>© 2026 LUMINA STUDIO. TODOS LOS DERECHOS RESERVADOS.</p>
    </footer>
  )
}

function App() {
  const bookingRef = useRef(null)
  const [selectedPackage, setSelectedPackage] = useState('')

  const choosePackage = (name) => {
    setSelectedPackage(name)
    bookingRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Gallery />
        <Pricing onSelectPackage={choosePackage} />
        <Booking sectionRef={bookingRef} selectedPackage={selectedPackage} onPackageChange={setSelectedPackage} />
      </main>
      <Footer />
    </>
  )
}

export default App
