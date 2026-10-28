import { useEffect, useState } from 'react'
import { galleryItems } from '../data/siteContent.js'

export default function GalleryPage() {
  const [activePhoto, setActivePhoto] = useState(null)

  useEffect(() => {
    if (!activePhoto) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setActivePhoto(null)
    }
    document.body.classList.add('has-lightbox')
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.classList.remove('has-lightbox')
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [activePhoto])

  return (
    <>
      <section className="page-intro page-intro--gallery">
        <p className="eyebrow">LUMINA STUDIO · PORTAFOLIO</p>
        <h1>Historias en imágenes.</h1>
        <p>Instantes reales, miradas honestas y paisajes que invitan a quedarse. Selecciona una fotografía para verla con más detalle.</p>
        <span className="page-intro__rule" aria-hidden="true" />
      </section>
      <section className="gallery-page section-shell" aria-label="Galería fotográfica">
        <div className="gallery-grid gallery-grid--page">
          {galleryItems.map((item, index) => (
            <button className={`gallery-card gallery-card--${index + 1}`} type="button" onClick={() => setActivePhoto(item)} key={item.title} aria-label={`Ampliar fotografía: ${item.title}`}>
              <img src={item.image} alt={item.alt} loading="lazy" />
              <span className="gallery-card__number">{String(index + 1).padStart(2, '0')}</span>
              <span className="gallery-card__caption"><span className="eyebrow">{item.category} · LUMINA</span><strong>{item.title}</strong><span className="gallery-card__open" aria-hidden="true">↗</span></span>
            </button>
          ))}
        </div>
        <p className="gallery-note">Cada historia merece una mirada atenta. Fotografías servidas desde Pexels.</p>
      </section>
      {activePhoto && (
        <div className="lightbox" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActivePhoto(null) }}>
          <section className="lightbox__panel" role="dialog" aria-modal="true" aria-label={`Fotografía: ${activePhoto.title}`}>
            <button className="lightbox__close" type="button" onClick={() => setActivePhoto(null)} aria-label="Cerrar fotografía">×</button>
            <img className="lightbox__image" src={activePhoto.image} alt={activePhoto.alt} />
            <div className="lightbox__caption"><div><p className="eyebrow">{activePhoto.category} · LUMINA STUDIO</p><h2>{activePhoto.title}</h2></div><span>FOTOGRAFÍA CON INTENCIÓN</span></div>
          </section>
        </div>
      )}
    </>
  )
}
