import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import HomePage from './components/HomePage.jsx'
import GalleryPage from './components/GalleryPage.jsx'
import BookingPage from './components/BookingPage.jsx'
import Footer from './components/Footer.jsx'

function readRoute() {
  const route = window.location.hash.replace(/^#/, '') || '/'
  return route.startsWith('/') ? route : `/${route}`
}

export default function App() {
  const [route, setRoute] = useState(readRoute)

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

  const selectedPackage = route.startsWith('/reservar/')
    ? route.slice('/reservar/'.length)
    : null

  return (
    <>
      <Header currentRoute={route} />
      <main id="contenido">
        {route === '/galeria' ? <GalleryPage /> : selectedPackage ? <BookingPage packageSlug={selectedPackage} /> : <HomePage />}
      </main>
      <Footer />
    </>
  )
}
