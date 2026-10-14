import { useEffect, useState } from 'react'

export default function Header() {
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
