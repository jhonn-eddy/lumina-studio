import { useState } from 'react'

export default function Header({ currentRoute, theme, onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <a className="brand" href="#/" onClick={closeMenu} aria-label="Lumina Studio, página de inicio">
        <span className="brand__mark" aria-hidden="true">L</span>
        <span className="brand__wordmark">LUMINA <span>STUDIO</span></span>
      </a>
      <button
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        className="menu-toggle"
        onClick={() => setMenuOpen((open) => !open)}
        type="button"
      >{menuOpen ? '×' : '☰'}</button>
      <nav id="site-navigation" className={`site-nav${menuOpen ? ' site-nav--open' : ''}`} aria-label="Navegación principal">
        <a className={currentRoute === '/' ? 'is-active' : ''} href="#/" onClick={closeMenu}>Inicio</a>
        <a className={currentRoute === '/galeria' ? 'is-active' : ''} href="#/galeria" onClick={closeMenu}>Galería</a>
        <a className="button button--dark nav-cta" href="#/paquetes" onClick={closeMenu}>Ver paquetes <span aria-hidden="true">↗</span></a>
        <button className="theme-toggle" type="button" onClick={onThemeToggle} aria-label={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`} title={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}>
          <span className="theme-toggle__icon" aria-hidden="true">{theme === 'light' ? '☾' : '☼'}</span>
          <span>{theme === 'light' ? 'Oscuro' : 'Claro'}</span>
        </button>
      </nav>
    </header>
  )
}
