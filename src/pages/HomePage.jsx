import { packages, galleryItems } from '../data/siteContent.js'

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <img
          className="hero__image"
          src={galleryItems[0].image}
          alt="Una pareja celebra su boda en un paisaje abierto"
          fetchPriority="high"
        />
        <div className="hero__wash" />
        <div className="hero__content">
          <p className="eyebrow eyebrow--light">FOTOGRAFÍA CON INTENCIÓN · LA PAZ, BOLIVIA</p>
          <h1>Historias reales.<br /><em>Imágenes que perduran.</em></h1>
          <p className="hero__description">Creamos imágenes honestas y atemporales para los momentos que merecen ser recordados.</p>
          <div className="hero__actions">
            <a className="button button--light" href="#/galeria">Explorar galería <span aria-hidden="true">↗</span></a>
            <a className="text-link text-link--light" href="#/paquetes">Conocer los paquetes <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <span className="hero__index">L / 01</span>
      </section>

      <section className="intro section-shell">
        <p className="eyebrow">EL ESTUDIO</p>
        <div>
          <h2>Una mirada cuidadosa para contar lo que importa.</h2>
          <p>Desde celebraciones íntimas hasta proyectos editoriales, acompañamos cada historia con sensibilidad, luz natural y atención al detalle.</p>
          <a className="text-link" href="#/galeria">Conoce nuestro trabajo <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="home-gallery section-shell">
        <div className="section-heading section-heading--split">
          <div><p className="eyebrow">PORTAFOLIO</p><h2>Un vistazo a nuestro universo</h2></div>
          <a className="text-link" href="#/galeria">Ver toda la galería <span aria-hidden="true">↗</span></a>
        </div>
        <div className="preview-grid">
          {galleryItems.slice(0, 3).map((item, index) => (
            <a className={`preview-card preview-card--${index + 1}`} href="#/galeria" key={item.title}>
              <img src={item.image} alt={item.alt} loading="lazy" />
              <span className="preview-card__caption"><span>{item.title}</span><span aria-hidden="true">↗</span></span>
            </a>
          ))}
        </div>
      </section>

      <section className="packages-section section-shell" id="paquetes">
        <div className="section-heading">
          <p className="eyebrow">SERVICIOS</p>
          <h2>Una experiencia a tu medida</h2>
          <p>Elige el punto de partida para tu historia. Cada propuesta se conversa y adapta a los detalles de tu proyecto.</p>
        </div>
        <div className="pricing-grid">
          {packages.map((item) => (
            <article className={`price-card${item.featured ? ' price-card--featured' : ''}`} key={item.slug}>
              <p className="eyebrow">{item.eyebrow}</p>
              <h3>{item.name}</h3>
              <p className="price-card__price">{item.price}<span> / sesión</span></p>
              <p className="price-card__description">{item.description}</p>
              <ul>{item.features.map((feature) => <li key={feature}><span aria-hidden="true">✳</span>{feature}</li>)}</ul>
              <a className={`button ${item.featured ? 'button--dark' : 'button--outline'}`} href={`#/reservar/${item.slug}`}>Consultar paquete <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
        <p className="packages-note">Los precios publicados son referenciales. Confirmaremos disponibilidad y condiciones antes de cualquier pago.</p>
      </section>

      <section className="closing-banner">
        <p className="eyebrow eyebrow--light">CADA HISTORIA MERECE SU PROPIA LUZ</p>
        <h2>¿Creamos algo memorable?</h2>
        <a className="button button--light" href="#/reservar/esencial">Hablemos de tu proyecto <span aria-hidden="true">↗</span></a>
      </section>
    </>
  )
}
