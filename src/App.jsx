import { useEffect, useState } from 'react'
import './App.css'

const photographs = [
  { title: 'La calma de lo eterno', category: 'Retrato Â· Editorial', image: 'photo-1534528741775-53994a69daeb', shape: 'portrait' },
  { title: 'Luz de verano', category: 'Bodas Â· Destino', image: 'photo-1519741497674-611481863552', shape: 'landscape' },
  { title: 'Entre montaÃ±as', category: 'Naturaleza Â· Viajes', image: 'photo-1464822759023-fed622ff2c3b', shape: 'landscape' },
  { title: 'Un instante nuestro', category: 'Parejas Â· Retrato', image: 'photo-1523438885200-e635ba2c371e', shape: 'portrait' },
  { title: 'Domingo en la costa', category: 'Moda Â· Editorial', image: 'photo-1515886657613-9f3515b0c78f', shape: 'portrait' },
  { title: 'Donde nace el rÃ­o', category: 'Naturaleza Â· Viajes', image: 'photo-1433086966358-54859d0ed716', shape: 'landscape' },
  { title: 'Celebrar contigo', category: 'Bodas Â· Destino', image: 'photo-1532712938310-34cb3982ef74', shape: 'landscape' },
  { title: 'La belleza de ser', category: 'Retrato Â· Editorial', image: 'photo-1531123897727-8f129e1688ce', shape: 'portrait' },
]
const img = (id, width = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
const services = [
  ['01', 'Retrato editorial', 'ImÃ¡genes personales con intenciÃ³n, direcciÃ³n artÃ­stica y una luz que se siente como tÃº.'],
  ['02', 'Bodas Ã­ntimas', 'La emociÃ³n de un dÃ­a irrepetible, narrada con naturalidad y sensibilidad cinematogrÃ¡fica.'],
  ['03', 'Marcas & campaÃ±as', 'FotografÃ­a autÃ©ntica para proyectos que buscan una identidad visual memorable.'],
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  const close = () => setMenuOpen(false)
  return <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
    <a className="brand" href="#inicio" onClick={close}><span className="brand__mark">L</span><span>LUMINA <i>STUDIO</i></span></a>
    <button className="menu-toggle" aria-label={menuOpen ? 'Cerrar menÃº' : 'Abrir menÃº'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Ã—' : 'â˜°'}</button>
    <nav className={menuOpen ? 'site-nav site-nav--open' : 'site-nav'} aria-label="NavegaciÃ³n principal">
      <a href="#galeria" onClick={close}>Portafolio</a><a href="#estudio" onClick={close}>El estudio</a><a href="#servicios" onClick={close}>Servicios</a><a href="#contacto" onClick={close}>Contacto</a>
      <a className="nav-cta" href="#contacto" onClick={close}>Hablemos <span>â†—</span></a>
    </nav>
  </header>
}

function Hero() {
  return <section className="hero" id="inicio">
    <img className="hero__image" src={img('photo-1511988617509-a57c8a288659', 2200)} alt="CelebraciÃ³n Ã­ntima al atardecer" />
    <div className="hero__shade" />
    <div className="hero__content"><p className="eyebrow eyebrow--light">FOTOGRAFÃA CON ALMA Â· LA PAZ, BOLIVIA</p><h1>Lo que sientes,<br /><em>para siempre.</em></h1><p className="hero__copy">Historias reales. Luz natural. Recuerdos que se quedan contigo.</p><a className="button button--light" href="#galeria">Explorar el portafolio <span>â†“</span></a></div>
    <div className="hero__index"><span>01 â€” 08</span><span>Una mirada sensible a lo cotidiano</span></div>
    <a className="hero__scroll" href="#galeria" aria-label="Desplazarse a la galerÃ­a">â†“</a>
  </section>
}

function Gallery() {
  const [active, setActive] = useState(null)
  useEffect(() => {
    if (!active) return undefined
    const close = (e) => { if (e.key === 'Escape') setActive(null) }
    window.addEventListener('keydown', close)
    document.body.classList.add('has-open-dialog')
    return () => { window.removeEventListener('keydown', close); document.body.classList.remove('has-open-dialog') }
  }, [active])
  return <section className="section gallery" id="galeria">
    <div className="section-top"><p className="eyebrow">01 / PORTAFOLIO</p><span>UNA COLECCIÃ“N DE HISTORIAS</span></div>
    <div className="section-heading"><h2>Momentos que<br /><em>hablan por sÃ­ solos.</em></h2><p>Cada historia merece una mirada propia. Esta es una selecciÃ³n de instantes, lugares y personas que nos recuerdan por quÃ© fotografiamos.</p></div>
    <div className="gallery-grid">{photographs.map((item, i) => <button className={`gallery-card gallery-card--${item.shape}`} key={item.title} onClick={() => setActive(item)} aria-label={`Ver fotografÃ­a: ${item.title}`}>
      <span className="gallery-card__image"><img src={img(item.image, 1000)} alt={item.title} loading="lazy" /></span><span className="gallery-card__meta"><span><b>{item.title}</b><small>{item.category}</small></span><span className="gallery-card__number">{String(i + 1).padStart(2, '0')} <i>â†—</i></span></span>
    </button>)}</div>
    {active && <div className="lightbox" role="dialog" aria-modal="true" aria-label={active.title} onClick={() => setActive(null)}><button className="lightbox__close" onClick={() => setActive(null)} aria-label="Cerrar">Ã—</button><img src={img(active.image, 2000)} alt={active.title} onClick={(e) => e.stopPropagation()} /><p>{active.title} <span>â€” {active.category}</span></p></div>}
  </section>
}

function Studio() {
  return <section className="studio" id="estudio"><div className="studio__photo"><img src={img('photo-1516035069371-29a1b244cc32', 1200)} alt="CÃ¡mara analÃ³gica sobre mesa de estudio" loading="lazy" /><span>UNA MIRADA, MUCHAS HISTORIAS</span></div><div className="studio__copy"><p className="eyebrow">02 / NUESTRA MIRADA</p><h2>La belleza estÃ¡<br />en <em>lo verdadero.</em></h2><p>En Lumina creemos que las mejores imÃ¡genes no se fuerzan: se sienten. Creamos un espacio tranquilo para que puedas ser tÃº, mientras cuidamos cada detalle de luz, encuadre y emociÃ³n.</p><p>Trabajamos en La Paz y viajamos donde nos lleve tu historia. Siempre con cercanÃ­a, curiosidad y respeto por lo autÃ©ntico.</p><a className="text-link" href="#servicios">Conoce nuestro proceso <span>â†—</span></a><div className="studio__signature">L<span>Â·</span></div></div></section>
}

function Services() {
  return <section className="section services" id="servicios"><div className="section-top"><p className="eyebrow">03 / LO QUE HACEMOS</p><span>FOTOGRAFÃA PENSADA PARA TI</span></div><div className="services__intro"><h2>Una historia.<br /><em>Tu manera de contarla.</em></h2><p>Un acompaÃ±amiento cercano y un resultado con intenciÃ³n, desde la primera idea hasta la Ãºltima fotografÃ­a.</p></div><div className="service-list">{services.map(([n, title, copy]) => <article className="service-row" key={n}><span className="service-row__number">{n}</span><h3>{title}</h3><p>{copy}</p><a href="#contacto" aria-label={`Consultar por ${title}`}>â†—</a></article>)}</div></section>
}

function Quote() {
  return <section className="quote"><p className="eyebrow eyebrow--light">PALABRAS QUE NOS ACOMPAÃ‘AN</p><blockquote>â€œLas fotos se sienten como volver a ese dÃ­a. Cada detalle nos hizo sentir que nuestra historia importaba.â€</blockquote><span>VALERIA & MATEO Â· BODA EN LA PAZ</span><div className="quote__decoration">â€œ</div></section>
}

function Contact() {
  const [sent, setSent] = useState(false)
  return <section className="section contact" id="contacto"><div className="contact__intro"><p className="eyebrow">04 / EMPECEMOS</p><h2>Tu historia merece<br /><em>ser contada.</em></h2><p>CuÃ©ntanos quÃ© estÃ¡s imaginando. Nos pondremos en contacto para conversar los detalles y encontrar juntos la mejor forma de hacerlo realidad.</p><a className="contact__email" href="mailto:hola@luminastudio.bo">hola@luminastudio.bo â†—</a><span className="contact__location">LA PAZ, BOLIVIA Â· DISPONIBLES PARA VIAJAR</span></div><div className="contact__form-wrap">{sent ? <div className="form-success" role="status"><span>âœ³</span><h3>Gracias por escribirnos.</h3><p>Tu correo ya estÃ¡ listo para enviar. Muy pronto conversaremos sobre tu historia.</p><a href="mailto:hola@luminastudio.bo">Abrir tu correo â†—</a></div> : <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true); window.location.href = `mailto:hola@luminastudio.bo?subject=${encodeURIComponent('Consulta desde Lumina Studio â€” ' + e.currentTarget.name.value)}&body=${encodeURIComponent(e.currentTarget.message.value + '\n\nCorreo: ' + e.currentTarget.email.value)}` }}>
      <label htmlFor="name">Tu nombre</label><input id="name" name="name" placeholder="Â¿CÃ³mo te llamas?" required />
      <label htmlFor="email">Tu correo</label><input id="email" name="email" placeholder="nombre@correo.com" required type="email" />
      <label htmlFor="project">Â¿QuÃ© tienes en mente?</label><select id="project" name="project"><option>Selecciona el tipo de sesiÃ³n</option><option>Retrato editorial</option><option>Boda Ã­ntima</option><option>Marca o campaÃ±a</option><option>Otra historia</option></select>
      <label htmlFor="message">CuÃ©ntanos un poco mÃ¡s</label><textarea id="message" name="message" placeholder="La fecha, el lugar, la idea que tienesâ€¦" required rows="3" />
      <button className="button button--dark" type="submit">Enviar consulta <span>â†—</span></button><small>Al enviar, se abrirÃ¡ tu aplicaciÃ³n de correo para completar el mensaje.</small>
    </form>}</div></section>
}

function Footer() { return <footer className="site-footer"><a className="brand brand--footer" href="#inicio"><span className="brand__mark">L</span><span>LUMINA <i>STUDIO</i></span></a><p>IMÃGENES HONESTAS, RECUERDOS PARA SIEMPRE.</p><div><a href="#galeria">Portafolio</a><a href="#estudio">Estudio</a><a href="mailto:hola@luminastudio.bo">Email â†—</a></div><small>Â© 2026 LUMINA STUDIO Â· LA PAZ, BOLIVIA</small></footer> }

export default function App() { return <><Header /><main><Hero /><Gallery /><Studio /><Services /><Quote /><Contact /></main><Footer /></> }

