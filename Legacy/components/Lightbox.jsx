import { useEffect, useRef } from 'react'

export default function Lightbox({ item, onClose }) {
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
