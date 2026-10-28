import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import BookingPage from './pages/BookingPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import HomePage from './pages/HomePage.jsx'

function LensCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const moveLens = (event) => setPosition({ x: event.clientX, y: event.clientY })
    window.addEventListener('pointermove', moveLens, { passive: true })
    return () => window.removeEventListener('pointermove', moveLens)
  }, [])

  return (
    <span className="lens-cursor" style={{ '--lens-x': `${position.x}px`, '--lens-y': `${position.y}px` }} aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none"><circle cx="21" cy="21" r="13.5"/><circle cx="21" cy="21" r="8"/><path d="m31 31 10 10M21 4v4M4 21h4"/><circle className="lens-cursor__glint" cx="17" cy="17" r="2"/></svg>
    </span>
  )
}

function readRoute() {
  const route = window.location.hash.replace(/^#/, '') || '/'
  return route.startsWith('/') ? route : `/${route}`
}

export default function App() {
  const [route, setRoute] = useState(readRoute)
  const [theme, setTheme] = useState(() => window.localStorage.getItem('lumina-theme') === 'dark' ? 'dark' : 'light')

  useEffect(() => {
    document.body.dataset.theme = theme
    window.localStorage.setItem('lumina-theme', theme)
  }, [theme])

  useEffect(() => {
    const syncRoute = () => {
      setRoute(readRoute())
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  useEffect(() => {
    if (route === '/paquetes') {
      window.requestAnimationFrame(() => document.getElementById('paquetes')?.scrollIntoView({ behavior: 'smooth' }))
    }
  }, [route])

  const isPackageRoute = route.startsWith('/reservar/')
  const selectedPackage = isPackageRoute
    ? route.slice('/reservar/'.length)
    : null
  let page = <HomePage />

  if (route === '/galeria') {
    page = <GalleryPage />
  } else if (isPackageRoute) {
    page = <BookingPage packageSlug={selectedPackage} />
  }

  return (
    <>
      <LensCursor />
      <Header currentRoute={route} theme={theme} onThemeToggle={() => setTheme((current) => current === 'light' ? 'dark' : 'light')} />
      <main id="contenido">{page}</main>
      <Footer />
    </>
  )
}
