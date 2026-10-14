import { useRef, useState } from 'react'
import Lightbox from './Lightbox.jsx'
import { galleryItems } from '../data/siteContent.js'

export default function Gallery() {
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
