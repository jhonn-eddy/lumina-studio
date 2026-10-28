export default function Footer() {
  return (
    <footer className="site-footer">
      <a className="brand" href="#/" aria-label="Volver al inicio de Lumina Studio"><span className="brand__mark" aria-hidden="true">L</span><span className="brand__wordmark">LUMINA <span>STUDIO</span></span></a>
      <p>Fotografía con intención.<br />La Paz, Bolivia.</p>
      <nav className="footer-links" aria-label="Enlaces del pie de página"><a href="#/galeria">Galería</a><a href="#/paquetes">Paquetes</a><a href="#/">Inicio</a></nav>
      <span className="copyright">© {new Date().getFullYear()} LUMINA STUDIO</span>
    </footer>
  )
}
