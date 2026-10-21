import { galleryItems } from '../data/siteContent.js'

export default function GalleryPage() {
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">LUMINA STUDIO · PORTAFOLIO</p>
        <h1>Historias en imágenes.</h1>
        <p>Una selección de bodas, naturaleza y paisajes. Cada fotografía abre su versión de mayor resolución.</p>
      </section>
      <section className="gallery-page section-shell" aria-label="Galería fotográfica">
        <div className="gallery-grid gallery-grid--page">
          {galleryItems.map((item, index) => (
            <a className={`gallery-card gallery-card--${index + 1}`} href={item.image} key={item.title} target="_blank" rel="noreferrer" aria-label={`Abrir fotografía en alta resolución: ${item.title}`}>
              <img src={item.image} alt={item.alt} loading="lazy" />
              <span className="gallery-card__caption"><span className="eyebrow">{String(index + 1).padStart(2, '0')} / PORTAFOLIO</span><strong>{item.title}</strong><span aria-hidden="true">↗</span></span>
            </a>
          ))}
        </div>
        <p className="gallery-note">Las fotografías se cargan desde Pexels y requieren conexión a Internet. La disponibilidad y resolución final dependen de la fuente externa.</p>
      </section>
    </>
  )
}
